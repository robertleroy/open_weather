<script>
  import { fade } from 'svelte/transition';
  let loading = false;
  let timed_out = 6000;
  // time before timed out message appears

  setTimeout(() => {
    loading = true
  }, timed_out);
</script>

<div class="loader">
  {#if loading}
  <kbd class="err" transition:fade>timed out</kbd>
  {:else}
  <div class="stripe" transition:fade/>
  {/if}
</div>

<style lang="postcss">
  .loader { 
    position: relative; 
    height: 1.5em;
  }
  .stripe {
    --color: hsl(206, 20%, 75%);
    --size-bar: 0.3rem;
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .stripe::before {
    content: "";
    position: absolute;
    height: var(--size-bar);
    width: 100%;
    top: 50%;
    background-color: var(--color);
    animation: sliding 3s cubic-bezier(0, 0, 0.03, 0.9) infinite;
    border-radius: var(--size-bar);
  }

  @keyframes sliding {
    0%,
    44%,
    88.1%,
    100% {
      transform-origin: left;
    }

    0%,
    100%,
    88% {
      transform: scaleX(0);
    }

    44.1%,
    88% {
      transform-origin: right;
    }

    33%,
    44% {
      transform: scaleX(1);
    }
  }

  kbd {
    display: inline-block;
    width: 100%;
    text-align: center;
    font-size: 0.9em;
  }
</style>
