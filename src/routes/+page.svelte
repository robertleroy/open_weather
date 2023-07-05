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

  $: {
    current = $weatherData?.current;
    minutes = $weatherData?.minutely;
    temphours = $weatherData?.hourly.map(el => formatHour(el));
    fiveDayHours = $weatherData?.fiveDay.map(el => formatHour(el));
    days = $weatherData?.daily;
    alerts = $weatherData?.alerts ?? [];
  }
  $: hours = temphours?.slice(23).filter((el,i) => i % 2);



  function getDaySummary(arr) {
    const n = arr.length;
    // console.log('Alerts', n );
    let str = 'day_summary';
    if (n > 0) {
      str = `<div style="color:tomato">${alerts[0]?.event}`;
      n > 1 ? str += `<sup> +${n-1}</sup>` : '';
      str += `</div>`;
    } 
    return str;
  }

  function formatHour(obj) {
    return {
      dt: obj.dt,
      temp: obj.temp || obj.main.temp,
      feels_like: obj.feels_like || obj.main.feels_like,
      pressure: obj.pressure || obj.main.pressure,
      humidity: obj.humidity || obj.main.humidity,
      clouds: obj.clouds.all || obj.clouds,
      visibility: obj.visibility,
      wind_speed: obj.wind_speed || obj.wind.speed,
      wind_deg: obj.wind_deg || obj.wind.deg,
      wind_gust: obj.wind_gust || obj.wind.gust,
      weather_id: obj.weather.id || obj.weather[0].id,
      weather_main: obj.weather.main || obj.weather[0].main,
      weather_description: obj.weather.description || obj.weather[0].description,
      weather_icon: obj.weather.icon || obj.weather[0].icon,
      pop: obj.pop,
      rain: obj.rain ? obj.rain["1h"] || obj.rain["3h"] : 0
    }
  }
</script>

<div class='page'>

  <noscript>
    <div class="nojs">JavaScript not available</div>
  </noscript>


  {#if $weatherData}

  <Current
    {current}
    day={days[0]}
    {minutes}
  />  

  <div class="wrapper" style:max-width="640px">
    <div class="day_summary">{@html day_summary}</div>
    <Hours {hours} />

    <div class="week_summary">week_summary</div>
    <Days {days} {fiveDayHours}/>
  </div>


  {/if}

  
</div>




<style lang='postcss'>
  .nojs {
    /* font-size: 1.3125rem; */
    font-family: var(--serif);
    text-align: center;
  }
</style>