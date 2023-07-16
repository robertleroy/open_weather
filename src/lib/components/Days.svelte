<script>
  import Hours from "$lib/components/Hours.svelte";
  import WeatherIcon from '$lib/components/WeatherIcon.svelte';
  import Accordion from '$lib/components/Accordion.svelte';
  import RangeBar from '$lib/components/RangeBar.svelte';
  import { round } from '$lib/store/filters.js';
  import dateObj from '$lib/store/dateObj.js';
  import { weatherData } from "$lib/store";
  
  let day_hours = splitHours();
  let weekrange = getRange($weatherData?.daily);
  
  function splitHours() {
    let todaysDate = new Date($weatherData.fiveDay[0].dt * 1000).getDate();    
    let arr = [ [], [], [], [], [], [], [] ];

    for (let i = 0; i < $weatherData.hourly?.length; ++i) {
      let dayDate = new Date($weatherData.hourly[i].dt * 1000).getDate();
      
      if (dayDate === todaysDate && i % 2) {
        arr[0].push($weatherData.hourly[i])
      } 
      if (dayDate === todaysDate + 1 && i % 2) {
        arr[1].push($weatherData.hourly[i])
      } 
    }

    for (let i = 0; i < $weatherData.fiveDay?.length; ++i) {
      let dayDate = new Date($weatherData.fiveDay[i].dt * 1000).getDate();
      
      if (dayDate === todaysDate + 2) {
        arr[2].push($weatherData.fiveDay[i])
      } 
      if (dayDate === todaysDate + 3) {
        arr[3].push($weatherData.fiveDay[i])
      } 
      if (dayDate === todaysDate + 4) {
        arr[4].push($weatherData.fiveDay[i])
      } 
    }
    return arr;
  }

  function precipSymbol(code) {
      let symbol = '';
      if(code === 781) {
        symbol = `🌪️`;
      } else if(code === 511 || code > 610 && code < 617) {
        symbol = `🧊`;
      } else if (code >= 600 && code < 700) {
        symbol = `❄️`;
      } else if (code >= 200 && code < 600) {
        symbol = `💧`;
      }
      return symbol;
    }

  function getRange(days) {
    let highs = days.map(el => round(el.temp.max));
    let lows = days.map(el => round(el.temp.min));
    return [Math.min.apply(null, lows), Math.max.apply(null, highs)];
  }
</script>

<div class='days'>
  {#each $weatherData.daily as day, i}

  <Accordion >
    <svelte:fragment slot="header">

  <div class="day">
    <WeatherIcon icon={day.weather[0].icon} fontsize="1.75em"/>

    <div class="weekday">
      <div class="date">{i === 0 ? 'Today' : dateObj(day.dt*1000, 'ddd')}</div>
      <div class="precip">
        <div>
          <span>{precipSymbol(day.weather[0].id)}</span>
          <span>{round(day.pop*100) + '%'}</span>
        </div>
      </div>
    </div>

    <RangeBar
      domain={weekrange}
      high="{round(day.temp.max)}"
      low="{round(day.temp.min)}" />
  </div>
</svelte:fragment> 

<svelte:fragment slot="body">
  <div class="body" >
    <div class="summary">{day.summary}</div>
    {#if i < 5}
    <div class="">
      <Hours hours={day_hours[i]} />
    </div>  
    {/if}
  </div>
</svelte:fragment>
</Accordion>
  {/each}
</div>

<style lang='postcss'>
  .day {
    width: 100%;
    display: grid;
    grid-template-columns: 4.5rem 5rem 1fr;
    align-items: center;
    padding: 0.5rem 1.1rem 0.5rem 0;

    @media (min-width: 500px) {      
      grid-template-columns: 5rem 5rem 1fr;
    }
  }
  /* .precip {
    width: 2.5rem;

    .pop {
      display: inline-block;
      font-size: 0.75rem;
    }
    .symbol {
    display: inline-block;
      font-size: 0.65rem;
    }
  } */
  .weekday {
      .precip {
        color: rgba( 51, 51, 51, 0.7);
        font-size: 0.75rem;
        line-height: 1.3;
        div {
          padding-right: 0.5rem;
        }
        span:first-child {
          font-size: 0.55rem;
          margin-right: 0.2rem;
          vertical-align: 2px;
          -webkit-filter: grayscale(60%);
          filter: grayscale(60%);
        }
      }
    }
    .body {
      padding: 0 0 1em;
    }
    .summary {
      margin: 0 0 0.5rem ;
    }
</style>