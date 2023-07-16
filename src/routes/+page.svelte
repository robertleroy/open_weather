<script>
  import { titlecase, sentencecase, round } from '$lib/store/filters'; 
  import { currentLocation, duration, weatherData } from "$lib/store";
  import Current from "$lib/components/Current.svelte";
  import Hours from "$lib/components/Hours.svelte";
  import Days from "$lib/components/Days.svelte";

  let days = {},
    temphours = [],
    hours = [],
    minutes = [],
    current = {},
    alerts = [],
    fiveDayHours = [],
    minutes_of_precip_this_hour;
  
  $: day_summary = getDaySummary(alerts);

  // $: {
  //   current = $weatherData?.current;
  //   minutes = $weatherData?.minutely;
  //   temphours = $weatherData?.hourly.map(el => formatHour(el));
  //   fiveDayHours = $weatherData?.fiveDay.map(el => formatHour(el));
  //   days = $weatherData?.daily;
  //   alerts = $weatherData?.alerts ?? [];
  // }
  $: {
    current = $weatherData?.current;
    minutes = $weatherData?.minutely;
    temphours = $weatherData?.hourly;
    fiveDayHours = $weatherData?.fiveDay;
    days = $weatherData?.daily;
    alerts = $weatherData?.alerts ?? [];
  }
  $: hours = temphours?.slice(0,23).filter((el,i) => i % 2);



  function getDaySummary(arr) {
    const n = arr.length;
    // console.log('Alerts', n );
    let str = 'day_summary';
    if (n > 0) {
      str = `<a href="/alerts" style="color:tomato">${alerts[0]?.event}`;
      n > 1 ? str += `<sup> +${n-1}</sup>` : '';
      str += `</a>`;
    } 
    return str;
  }
</script>

<div class='page'>
  <noscript>
    <div class="nojs">JavaScript not available</div>
  </noscript>


  {#if $weatherData}

  {#key $weatherData?.current.dt}
  <Current />  
  {/key}

  <div class="wrapper" >
    <div class="day_summary">{@html day_summary}</div>
    <Hours {hours} />

    <div class="week_summary">week_summary</div>
    <Days />
  </div>


  {/if}

  
</div>




<style lang='postcss'>
  .wrapper {
    /* width: 100%; */
  }
  .day_summary {
    margin: 0.5rem 0;
  }
  .week_summary {
    margin: 3rem 0 0;
  }
  .nojs {
    /* font-size: 1.3125rem; */
    font-family: var(--serif);
    text-align: center;
  }
</style>