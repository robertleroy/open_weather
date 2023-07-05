<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { fade, scale } from "svelte/transition";
  import { titlecase, sentencecase, round } from '$lib/store/filters'; 
  import { currentLocation, duration, weatherData } from "$lib/store";
  import Search from "$lib/components/Search.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import "./app.css";

  export let data;
  const routes = [
    { name: "Home", path: "/" },
    { name: "Map", path: "/map" },
    // { name: "About", path: "/about" },
    { name: "Search", path: "/search" }
  ]
	let innerWidth, outerWidth, innerHeight, outerHeight;
  let alerts = true;
  
  // $: console.log("$weatherData",$weatherData);

  $: currentRoute = $page.url.pathname.slice(1) || "home";
  // $: currentRoute = data.pathname.slice(1) || "home";

  $: {
    if ($currentLocation) {
      getWeather($currentLocation?.lat, $currentLocation?.lon).then((result) => {
        $weatherData = result;

        // console.log("result", result)
      });
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
          console.log("Browser Geolocation not available");
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
    
    $currentLocation = data?.ipData;
  } /* init */

  onMount(async () => {    
    // await new Promise(resolve => {
    //   setTimeout(resolve, 2000)
    // })
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
  <!-- 
    <div class="route" class:active={data?.pathname === "/"}>
      <a href="/">Home</a>
    </div>

    <div class="spacer">|</div>
    
    <div class="route" class:active={data?.pathname === "/map"}>
      <a href="/map">Map</a>
    </div>
    
    <div class="spacer">|</div>
    
    <div class="route" class:active={data?.pathname === "/about"}>
      <a href="/about">About</a>
    </div>
    
    <div class="spacer">|</div>
    
    <div class="route" class:active={data?.pathname === "/search"}>
      <a href="/search">Search</a>
    </div> 
  -->
    
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
  .route {
    transition: color 300ms;
  }
  .loader { width: 250px; }
</style>
