<script>
  import { titlecase } from "$lib/store";
  import WeatherIcon from "$lib/components/WeatherIcon.svelte";
  import Darkcloud from "$lib/components/Darkcloud.svelte";
  
  const icons = [
    {
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01d",
    },
    {
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01n",
    },
    {
      id: 801,
      main: "Clouds",
      description: "few clouds: 11-25%",
      icon: "02d",
    },
    {
      id: 802,
      main: "Clouds",
      description: "scattered clouds: 25-50%",
      icon: "03n",
    },
    {
      id: 803,
      main: "Clouds",
      description: "broken clouds: 51-84%",
      icon: "04d",
    },
    {
      id: 803,
      main: "Clouds",
      description: "broken clouds: 51-84%",
      icon: "04n",
    },
    {
      id: 804,
      main: "Clouds",
      description: "overcast clouds: 85-100%",
      icon: "04d",
    },
    {
      id: 301,
      main: "Drizzle",
      description: "drizzle",
      icon: "09d",
    },
    {
      id: 501,
      main: "Rain",
      description: "moderate rain",
      icon: "10d",
    },
    {
      id: 600,
      main: "Snow",
      description: "light snow",
      icon: "13d",
    },
    {
      id: 601,
      main: "Snow",
      description: "snow",
      icon: "13d",
    },
    {
      id: 611,
      main: "Snow",
      description: "sleet",
      icon: "13d",
    },
    {
      id: 211,
      main: "Thunderstorm",
      description: "thunderstorm",
      icon: "11d",
    },
    {
      id: 741,
      main: "Fog",
      description: "fog",
      icon: "50d",
    },
    {
      id: 781,
      main: "Tornado",
      description: "tornado",
      icon: "50d",
    },
    {
      id: 799,
      main: "Windy",
      description: "wind",
      icon: "99n",
    },
  ];

  const max = 15;
  let title = "Darkcloud";
  let fontsize = 3.25;
</script>

<div class="page">
  <div class="header">
    <h3>{title}</h3>
    <span>
      Icon Size: 
      <input type="number" bind:value={fontsize} min=1 {max} step=0.25> 
      em
    </span>
  </div>


  <div class="icons">
    {#each icons as icon}
      <span title={titlecase(icon.description)}
        ><WeatherIcon {icon} fontsize="{fontsize}em" /></span
      >
    {/each}

    <span title="Darkcloud"
        ><Darkcloud fontsize="{fontsize}em" /></span
      >
  </div>


  <div class="tagline">Inspired by the <em>Darksky</em> app</div>
  
  <div class="grid">

    <div class="dt">Web Hosting:</div>
    <div class="dd">
      <a href="https://vercel.com/" 
      target="_blank" rel="noopener noreferrer">
        Vercel
      </a>
    </div>
    
    <div class="dt">Location Search:</div>
    <div class="dd">
      <a href="https://developer.tomtom.com" 
      target="_blank" rel="noopener noreferrer">
        Tomtom
      </a>
    </div>
    
    <div class="dt">Weather Data:</div>
    <div class="dd">
      <a href="https://home.openweathermap.org/" 
      target="_blank" rel="noopener noreferrer">
        Open Weather Map
      </a>
    </div>
  </div>
</div>

<style lang="postcss">   
   .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0 1rem;
    margin: 1.5rem 0 1rem;
  }
  [type="number"] {
    border-top-style: none;
    border-right-style: none;
    border-left-style: none;
    border-radius: 0;
    max-width: 4.5rem;
  }
  .icons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0 1ch;
  }
  
  .tagline {
    margin: 3rem 0 0.5rem;
    /* grid-column: span 2;; */
  }
  .grid {
    display: grid;
    grid-template-columns: max-content max-content;
    /* justify-content: center; */
    gap: 0 1rem;
    margin: 0 2ch 3rem;
  }
  a {
    text-decoration: 1px underline #999;
  }
</style>
