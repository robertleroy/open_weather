<!-- $lib/components/Accordion.svelte -->
<script>
	import { slide } from "svelte/transition";
	// import { cubicInOut } from 'svelte/easing';
	
	export let isOpen = false;
	let duration = 500;
</script>


<div class="shell" style="--duration: {duration}ms">
	<div class="header" on:click={() => (isOpen = !isOpen)} 
		on:keypress role="button" tabindex="0">
		<slot name="header">
			<div style:opacity="0.4">
				add an element with attribute slot="header"
			</div>
		</slot>
		
		<!-- <svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 20 20" class:rotate={isOpen}>
			<path d="m0 0 10 10L0 20" />
		</svg> -->
	</div>
	
	{#if isOpen}
	<div class="body" transition:slide={{ duration }}>
		<slot name="body"></slot>
	</div>
	{/if}
</div>


<style>
	.shell { 
    --radius: 0.2rem;
    --header-font-size: inherit;
    --body-font-size: inherit;
    --seperator: none;
  }	
	.header {
		font-size: var(--header-font-size);
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		cursor: pointer; 
	}
	/* .header svg {
		width: 0.6rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 2px;
		transition: transform var(--duration) ;
		transform-origin: 20% 50%;
	}
	.rotate { transform: rotate(90deg); } */
	/* .body { */
		/* font-size: var(--body-font-size); */
		/* padding: 0 1rem 1rem; */
		/* box-shadow: var(--seperator); */
	/* } */
</style>
