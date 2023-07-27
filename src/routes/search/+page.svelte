<script>
  import Sortable from "sortablejs";
  import { onMount, tick } from "svelte";
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { enhance } from "$app/forms";
  import { fade, slide } from "svelte/transition";
  import { currentLocation, store, duration } from "$lib/store";
  import Search from "$lib/components/Search.svelte";
  import Gps from "$lib/components/Gps.svelte";
  import Delete from "$lib/components/Delete.svelte";

  export let form;
  
  let sortable, draglist;
  let showError = false;
  let empty_list = "empty list";

  // $: console.log("store", $store?.list.findIndex(el => el.city === "Avon"))

  $: form?.newLocation && additem();

  async function additem() {
    /* test for duplicate locations */
    // const test = $store?.list.findIndex(el => {
    //   el.lat === form?.newLocation.lat && el.lon === form?.newLocation.lon;
    // });


    $currentLocation = form?.newLocation;

    /* prevent saving duplicate locations */
    // if (test) {
    //   if (browser) { goto("/"); }
    //   return;
    // }

    reorderList();
    await tick();
    $store = {
      list: [...$store.list, form?.newLocation],
      sortOrder: [...$store.sortOrder, form?.newLocation.id],
    };
    if (browser) { goto("/"); }
  }

  async function deleteItem(obj) {
    $store.list = $store.list.filter((el) => el !== obj);
    $store.sortOrder = $store.sortOrder.filter((id) => id !== obj.id); 

    await tick();
    reorderList();
  }

  async function sort_order() {
    if (!$store.sortOrder?.length) return;
    await tick();
    $store.sortOrder = sortable.toArray();
  }

  async function reorderList() {
    let arr = [];
    await tick();
    for (let i = 0; i < $store.sortOrder?.length; i++) {
      const obj = $store.list.find((el) => el.id === $store.sortOrder[i]);
      arr.push(obj);
    }
    $store.list = [...arr];
  }

  onMount(() => {
    sortable = Sortable.create(draglist, {
      animation: 300,
      touchStartThreshold: 3,
      filter: "input:focus",
      preventOnFilter: false,
      ghostClass: "ghostClass",
      direction: "vertical",
      store: {
        get: function () { return $store.sortOrder; },
        set: function () { sort_order(); },
      },
    });
  });
</script>

<div class="searchPage">
  <header>
    <div class="flex">
      <div class="searchFlex">
        <a href="/" data-sveltekit-reload>
          <Gps />
        </a>
        <form method="POST" action="?/search" use:enhance>
          <!-- svelte-ignore a11y-autofocus -->
          <input type="text" name="searchTerm" autofocus autocomplete="off" />

          <button class="submit" type="submit">
            <Search />
          </button>
        </form>

        {#if showError}
          <div class="showError" transition:fade={{ duration: $duration }}>
            {form?.message ?? ""}
          </div>
        {/if}
      </div>
      <!-- searchFlex -->

    </div>
    <!-- flex -->
  </header>

  <div class="page">
    <div class="dragzone">
      <div id="draglist" bind:this={draglist}>
        {#each $store.list ?? [] as item (item.id)}
          <div class="item" data-id={item.id}
               on:click={() => {
                $currentLocation = item;
                if (browser) { goto("/"); }
              }}
               on:keypress role="button" tabindex="0"
               transition:slide>
               
               <!-- transition:slide|global -->
            <div class="handle" on:click|stopPropagation on:keypress role="button" tabindex="0">&vellip;&vellip;</div>
            <div class="title">
              {item.title}
            </div>
            <Delete on:delete={deleteItem(item)} />
          </div>
        {/each}
      </div>

      {#if !$store.list?.length}
      <div class="empty_list">{empty_list}</div>
      {/if}

    </div>
    <!-- dragzone -->
  </div>
  <!-- page -->
  <!-- {360-210} -->
</div>
<!-- searchPage -->

<style lang="postcss">
  .searchFlex,
  form {
    display: flex;
    align-items: center;
    gap: 0 1ch;
  }
  .searchFlex {
    width: 100%;
    max-width: 500px;
  }
  form { 
    flex: 1; 
    
    input {
      text-align: center;
      flex: 1;
      transition: 200ms;
    }
    input:focus {
      outline: none;
      /* box-shadow: 1px 3px 2px #eee; */
      filter: drop-shadow(1px 2px 2px hsl(210,10%,90%));
      background: var(--background-color);
    }
    button.submit {
      font-size: 1em;
      border: none;
      padding: 0;
      height: fit-content;
      vertical-align: middle;
    }
  }

  .dragzone {
    min-height: 2.5rem;
    max-width: 500px;
    margin: 1rem auto 0;
    background: hsl(210,20%,95%);
    border-radius: 0.5rem;
  }
  .item { /* global ?? */
    display: flex;
    gap: 0 1ch;

    padding: 0.75rem 0;
    background: var(--background-color);
    border-bottom: 1px solid hsl(210,20%,92%);

    .handle {
      cursor: grab;
      width: 1.5rem;
      text-align: center;
    }
    .title { 
      flex: 1; 
      cursor: default;
    }
  }
  
  .empty_list {
    color: hsl(210,20%,45%);
    font-size:0.9em;
    text-align: center;
    line-height: 2.5rem;
    font-family: var(--monospace);
  }
</style>
