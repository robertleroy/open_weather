<script>
  import Hours from "$lib/components/Hours.svelte";
  import WeatherIcon from '$lib/components/WeatherIcon.svelte';
  import Accordion from '$lib/components/Accordion.svelte';
  import RangeBar from '$lib/components/RangeBar.svelte';
  import { titlecase, round, mmToInches } from '$lib/store/filters.js';
  import dateObj from '$lib/store/dateObj.js';
  export let days = [];
  export let fiveDayHours = [];
  let day_hours = splitHours();
  

  // console.log("days",fiveDayHours);
  function splitHours() {
    let todaysDate = new Date(fiveDayHours[0].dt * 1000).getDate();    
    let arr = [ [], [], [], [], [], [], [] ];

    for (let i = 0; i < fiveDayHours?.length; ++i) {
      let dayDate = new Date(fiveDayHours[i].dt * 1000).getDate();
      
      if (dayDate === todaysDate) {
        arr[0].push(fiveDayHours[i])
      } 
      if (dayDate === todaysDate + 1) {
        arr[1].push(fiveDayHours[i])
      } 
      if (dayDate === todaysDate + 2) {
        arr[2].push(fiveDayHours[i])
      } 
      if (dayDate === todaysDate + 3) {
        arr[3].push(fiveDayHours[i])
      } 
      if (dayDate === todaysDate + 4) {
        arr[4].push(fiveDayHours[i])
      } 
      
    }
    return arr;
  }

  // let hours = [...fiveDayHours];
  // console.log(hours);
  let weekrange = getRange(days);

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
  // function getHours() {
    // const hrs = fiveDayHours.map(el => {
    //   dt: el.dt,
    //   temp: el.temp,
    //   pop: el.main.pop,
    //   rain: el.weather.temp,
    //   humidity: el.main.humidity,
    //   wind_speed: el.wind.speed,
    //   wind_gust: el.wind.gust,
    //   wind_deg: el.wind.deg,
    //   clouds: el.clouds.all,
    //   pressure: el.main.pressure,
    //   weather: el.weather,
      
    // })
    // rain['1h']: el?.rain['3h'],
    // return  hrs;
    /*
    {
      "dt": 1680868800,
      "main": {
        "temp": 39.04,
        "feels_like": 33.69,
        "temp_min": 39.04,
        "temp_max": 39.31,
        "pressure": 1037,
        "sea_level": 1037,
        "grnd_level": 983,
        "humidity": 68,
        "temp_kf": -0.15
      },
      "weather": [
        {
          "id": 801,
          "main": "Clouds",
          "description": "few clouds",
          "icon": "02n"
        }
      ],
      "clouds": {
        "all": 20
      },
      "wind": {
        "speed": 7.49,
        "deg": 59,
        "gust": 9.44
      },
      "visibility": 10000,
      "pop": 0,
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2023-04-07 12:00:00"
    },
    */
  // }
</script>

<div class='days'>
  {#each days as day, i}

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
    
<svelte:fragment >
  {#if i < 5}
  <Hours hours={day_hours[i]} />
  {/if}
</svelte:fragment>
</Accordion>
  {/each}
</div>

<style lang='postcss'>
  .day {
    /* display: flex; */
    /* justify-content: space-between; */
    /* align-items: center; */
    /* gap: 0 1ch; */
    display: grid;
    grid-template-columns: 4.5rem 5rem 1fr;
    align-items: center;
    padding-right: 1.1rem;

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
</style>