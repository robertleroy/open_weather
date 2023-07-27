<script>
	import { icons, getIcon } from './weatherIcons';

	export let fontsize = "1.5em";
	export let icon = {
    id: 800,
    main: "Clear",
    description: "clear sky",
    icon: "01d"
  };
  export let style = "";
	
	const obj = icons.find(el => el.name === getIcon(icon));
	
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
	class={obj?.name} style:font-size="{fontsize}" {style}>
	{@html obj?.innerHtml}
</svg>
<style>
  svg {
    display: inline-grid;
    place-items: center center;
    font-size: 1rem;
    user-select: none;
    vertical-align: top;

		height: 2em;
		width: 2em;
	}
</style>