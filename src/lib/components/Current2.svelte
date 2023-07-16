<script>
  import WobbleChart from "$lib/components/WobbleChart.svelte";
  import WeatherIcon from "$lib/components/WeatherIcon.svelte";
  import { weatherData } from "$lib/store";
  import { titlecase, round, mmToInches } from "$lib/store/filters.js";
  import dateObj from "$lib/store/dateObj.js";
  // import { slide } from 'svelte/transition';

  // export let current;
  export let day;
  export let minutes;

  // console.log("day", day);
  // console.log("current",current);
  let minutes_of_precip = minutes
    .map((el) => el?.precipitation)
    .filter((el) => el > 0);
</script>

<div class="current">
  <div class="current_time" >
    <span>{dateObj($weatherData.current?.dt * 1000, "dddd")}</span>
    <span>{dateObj($weatherData.current?.dt * 1000, "MMMM do")}</span>
    <span>{dateObj($weatherData.current?.dt * 1000, "h:mm aa")}</span>
  </div>
  <!-- current_time -->

  <div class="current_conditions" >
    <div class="snapshot">
      <WeatherIcon icon={$weatherData?.current.weather[0].icon} fontsize="3.5rem" style="margin-left: -1rem;"/>
      <div class="temp">{round($weatherData?.current.temp)}</div>
    </div>
    <div class="conditions">
      <div class="icon">{titlecase($weatherData?.current.weather[0].description)}</div>
    </div>
  </div> 
  <!-- current_conditions -->
</div>
<!-- current -->

<!-- #region WobbleChart -->
{#if minutes_of_precip.length > 5}
  <div class="precipChart">
    <div class="summary">
      {#if $weatherData?.current.snow}
      Snow this hour: <var>{round(mmToInches($weatherData?.current.snow['1h']), 2) + '"'}</var>
      {:else if $weatherData?.current.rain}
      Rain this hour: <var>{round(mmToInches($weatherData?.current.rain['1h']), 2) + '"'}</var>
      {:else}
      This hour..  {titlecase($weatherData?.current.weather[0].description)}
      {/if}
    </div>

    <WobbleChart {minutes} />
  </div>
  {/if}
<!-- #endregion WobbleChart -->

<div class="day_stats">
  <div class="hilo">
    <div class="label">High:</div>
    <div class="high temp">{round(day?.temp.max)}</div>
    <div class="label">Low:</div>
    <div class="low temp">{round(day?.temp.min)}</div>
  </div>
  <div class="sun_times">
    <div class="label">Sunrise:</div>
    <div class="sunrise">{dateObj(day?.sunrise * 1000, "h:mm aa")}</div>
    <div class="label">Sunset:</div>
    <div class="sunset">{dateObj(day?.sunset * 1000, "h:mm aa")}</div>
  </div>
</div>

<!-- day_stats -->

<style lang="postcss">
  .current {
    margin-top: 0.3rem;
  }
  .current_time {
    display: flex;
    justify-content: center;
    gap: 0 1rem;
    font-size: 0.8em;
    /* font-family: Montserrat; */
  }
  .current_conditions {
    margin: 2rem 0 3rem;

    .snapshot {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0;

      .temp {
        font-size: 2.5rem;
      }
    }
    .conditions {
      text-align: center;
      margin-top: -1rem;
      /* font-size: 1.25rem; */
      font-size: 1.375rem;
    }
  }
  .day_stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0 1rem;
    max-width: 320px;
    max-width: 18em;
    margin: 2rem auto 2.5rem;
    font-size: 0.9375rem;

    .hilo,
    .sun_times {
      display: grid;
      grid-template-columns: max-content max-content;
      align-items: center;
      gap: 0 1ch;
    }
  }
  .precipChart {
    /* max-width: 640px; */
    max-width: 500px;
    margin: 0 auto;

    .summary {
      text-align: center;
      margin-bottom: -1rem;

      var {
        font-style: unset;
        margin: 0 1ch;
      }

      @media (min-width: 480px) {
        margin-bottom: -1.5rem;
      }
    }
  }
</style>
