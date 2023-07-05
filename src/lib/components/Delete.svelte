<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  let showPopup = false;
  const event_name = "delete";

  function clickOutside(node) {
    const handleClick = (event) => {
      if (!node.contains(event.target)) {
        node.dispatchEvent(new CustomEvent("outclick"));
      }
    };
    document.addEventListener("click", handleClick, true);
    return {
      destroy() {
        document.removeEventListener("click", handleClick, true);
      },
    };
  }
</script>

<div
  class="vellip"
  on:click|stopPropagation={() => (showPopup = !showPopup)}
  on:keypress role="button" tabindex="0" >

  <span>&vellip;</span>
  
  <div class="popup" class:showPopup
    use:clickOutside
    on:click|stopPropagation={() => {
      dispatch(event_name);
      showPopup = false;
    }}
    on:keypress role="button" tabindex="0"
    on:outclick={() => (showPopup = false)}
  >
    <svg class="btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path fill="none" d="M0 0h24v24H0V0z"/>
      <path fill="currentColor" d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
    </svg>
  
  </div>
</div>

<style>
  .vellip {
    --popup_top: 0.1em;
    --popup_right: 0;
    --popup_bg: #fff;
    position: relative;
    display: inline-block;
    width: 1.5rem;
    text-align: center;
    padding: 0 var(--popup_right);
    cursor: pointer;
    user-select: none;
    z-index: 1000;
  }
  .vellip:active { color: transparent; }
  .popup {
    display: none;
    position: absolute;
    top: calc(var(--popup_top) * -0.9);
    right: 0;
    font-size: 0.9em;
    
    width: 1.75rem;
    text-align: center;
    padding: var(--popup_top) 0;
    background: var(--popup_bg);
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 0.3rem;
  }
  .showPopup { display: initial; }
  .showPopup:active { color: #ccc; }
  svg {
    width: 1em;
    height: 1.5em;
    font-size: 1em;
    vertical-align: top;
    padding-top: 1px;
  }
</style>
