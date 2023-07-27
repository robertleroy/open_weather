<script>
  import { fade } from "svelte/transition";
  import { weatherData, sentencecase, dateObj, transitionEnded,
  } from "$lib/store";
  import Current from "$lib/components/Current.svelte";
  import Hours from "$lib/components/Hours.svelte";
  import Days from "$lib/components/Days.svelte";
  
  // import WobbleChart from "$lib/components/WobbleChart.svelte";

  let minutes_of_precip = [];
  $: if ($weatherData?.minutely) {
    minutes_of_precip = $weatherData?.minutely
    .map((el) => el?.precipitation)
    .filter((el) => el > 0)
    .length > 5;
  }

  let days = {},
    temphours = [],
    hours = [],
    minutes = [],
    current = {},
    alerts = [],
    fiveDayHours = [];

  $: day_summary = getDaySummary(alerts);
  $: {
    current = $weatherData?.current;
    minutes = $weatherData?.minutely;
    temphours = $weatherData?.hourly;
    fiveDayHours = $weatherData?.fiveDay;
    days = $weatherData?.daily;
    alerts = $weatherData?.alerts ?? [];
  }
  $: hours = temphours?.slice(0, 23).filter((el, i) => i % 2);


  function getDaySummary(arr) {
    const n = arr.length;

    let str = sentencecase(
      $weatherData?.daily[0].summary.replace(
        /(Expect a day of )|(There will be )|(The day will start with )|()/g,
        ""
      )
    );
    if (n > 0) {
      str = `<a href="/alerts" style="color:tomato">${alerts[0]?.event}`;
      n > 1 ? (str += `<sup> +${n - 1}</sup>`) : "";
      str += `</a>`;
    }
    return str;
  }
</script>

<div class="page">
  <noscript>
    <div class="nojs">JavaScript not available</div>
  </noscript>

  <div class="relative">
    {#key $weatherData}
      <div class="fade_panel"
        on:introend={() => ($transitionEnded = true)}
        on:outrostart={() => ($transitionEnded = false)}
      >
        {#if $weatherData}
          <div> <!-- transition:fade -->

            <Current />

            <div class="wrapper">
              <div class="day summary italic">{@html day_summary}</div>
              <Hours {hours} />

              <div class="week summary">
                <div>This Week's Forecast:</div>
                <div class="italic" style="font-size: 0.8em;">
                  {dateObj(days[0].dt * 1000, "MMMM Do")} -
                  {dateObj(days[days.length - 1].dt * 1000, "MMMM Do")}
                </div>
              </div>
              <Days />
            </div>
          </div>
        {/if}
      </div>
    {/key}
  </div>
  <!-- relative -->
</div>
<!-- page -->


<style lang="postcss">
  .relative {
    position: relative;
  }
  .fade_panel {
    position: absolute;
    left: 0;
    right: 0;

    padding-bottom: var(--footer-height);
  }
  .wrapper {
    /* width: 100%; */
  }
  .day.summary {
    margin: 0.5rem 0;
  }
  .week.summary {
    margin: 3rem 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0 1ch;
  }
  .nojs {
    margin-top: 10dvh;
    font-family: var(--serif);
    text-align: center;
  }
</style>
