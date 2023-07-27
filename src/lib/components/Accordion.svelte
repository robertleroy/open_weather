<!-- $lib/components/Accordion.svelte -->
<script>
	import { slide } from "svelte/transition";
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
		border-bottom: 1px solid #cccccc55;
  }	
	.header {
		font-size: var(--header-font-size);
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		cursor: pointer; 
	}
</style>
