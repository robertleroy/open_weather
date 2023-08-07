<script>
  import { onMount } from 'svelte';
  import { currentLocation } from "$lib/store";
  const { lat, lon } = $currentLocation ?? { lat: 40.0426, lon: -106.398 };
  let mapUrl = `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}&width=650&height=450&zoom=6&level=surface&overlay=radar&product=radar&menu=&message=true&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=mph&metricTemp=%C2%B0F&radarRange=-1`;
  let map;

  onMount(() => {
    console.log('the component has mounted');
		map.focus();
	});
</script>

<div class="map">
  <div>loading..</div>
  <iframe title="windy" width="100%" height="100%" 
          src={mapUrl} frameborder="0"  
          bind:this={map}> Map </iframe>
</div>

<style lang="postcss">
  .map {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: var(--footer-height);

    display: grid;
    place-items: center;
    z-index: 15;
  }
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
