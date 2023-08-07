<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { currentLocation, duration, weatherData, store } from "$lib/store";
  import Search from "$lib/components/Search.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import "./app.css";

  export let data;

  let timestamp = $weatherData?.timestamp ?? 0; 

  const routes = [
    { name: "Home", path: "/" },
    { name: "Map", path: "/map" },
  ]
	let innerWidth, outerWidth, innerHeight, outerHeight;
  $: alerts = $weatherData?.alerts;
  
  $: { /* update key for weather change fade */
    if ($weatherData?.timestamp !== timestamp) {
      timestamp = $weatherData?.timestamp;
      
      console.log("currentLocation:",$currentLocation, "weatherData:", $weatherData);
    }
  }
  
  $: {
    if ($currentLocation) {
      getWeather($currentLocation?.lat, $currentLocation?.lon).then((result) => {
        if (!result.hourly) return;
        result.hourly = result?.hourly.map(el => formatHour(el))
        result.fiveDay = result?.fiveDay.map(el => formatHour(el))
        $weatherData = result;
      });
    }
  }

  function formatHour(obj) {
    return {
      clouds: obj.clouds.all || obj.clouds,
      dt: obj.dt,
      temp: obj.temp || obj.main.temp,
      feels_like: obj.feels_like || obj.main.feels_like,
      pressure: obj.pressure || obj.main.pressure,
      humidity: obj.humidity || obj.main.humidity,
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

  async function getWeather(lat, lon) {
    const res = await fetch(`api/weather`, {
      method: "POST",
      body: JSON.stringify({ lat, lon }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data;
  }

  
  function init() {
    let lat, lon;
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {          
          lat = position.coords.latitude;
          lon = position.coords.longitude;

          const res = await fetch(`api/reverseTomtom`, {
            method: "POST",
            body: JSON.stringify({ lat, lon }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();

          $currentLocation = await data.location;
        },
        (err) => {
          console.log("Browser Geolocation not available", err);
          $currentLocation = data?.ipData;
        },
        { // geolocation options
          timeout: 5000,
          maximumAge: 300000,
        }
      );
    } else {
      console.log("Geolocation is not supported by your browser");
      $currentLocation = data?.ipData;
    }
  } /* init */

  onMount(() => {    
    init();
  });
</script>

<svelte:window bind:innerWidth bind:outerWidth bind:innerHeight bind:outerHeight/>


{#if data?.pathname !== "/map" && data?.pathname !== "/search"}
<header class="" transition:fade="{{duration: $duration}}">
  <div class="flex" >
    {#if $currentLocation}
    <div class="title" transition:fade={{ duration: $duration }}>
      <a href="/search">
        <span>
          {$currentLocation?.title || "Hello World!"} 
        </span>
        <!-- {innerWidth} -->
        <Search />
      </a>
    </div>
    {:else}
      <div class="loader" transition:fade={{ duration: $duration }}>
        <Loader />
      </div>
    {/if}
  </div> 
  <!-- flex -->
</header>
{/if}

<main>
  {#key data.pathname}
    <div class="router" transition:fade="{{duration: $duration}}"><slot /></div>
  {/key}
</main>

<footer>
  <nav>    
    {#each routes as route, i}
      <div class="route" class:active={data?.pathname === route.path}>
        <a href={route.path}>{route.name}</a>
      </div>
      <div class="spacer" class:hidden={i === routes.length - 1 && !alerts}>|</div>
    {/each}
    {#if alerts}    
    <div class="route alert" class:active={data?.pathname === "/alerts"}>
      <a href="/alerts">Alerts</a>
    </div>
    {/if}
  </nav>
</footer>

<style lang="postcss">
  .title {
    margin-top: 0.2rem;
    display: flex;
    align-items: center;
    font-size: 1.3125rem;
    line-height: 1;

    a {
      display: flex;
      align-items: center;
      gap: 0 1ch;
      text-decoration: underline;
    }
  }
  :global(.title a svg) {
    font-size: 1.0625rem;
    margin-top: 0.1em;
  }
  nav { /* footer */
    display: flex;
    align-items: baseline;
    gap: 0 1rem;
  }
  .route { transition: color 300ms; }
  .loader { width: 250px; }
</style>
