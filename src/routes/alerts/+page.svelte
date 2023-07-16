<script>
  import Accordion from "$lib/components/Accordion.svelte";
  import alertsList from "./alerts";
  import { weatherData } from "$lib/store";
  
  const alerts = $weatherData?.alerts ?? [];
  // const alerts = [...alertsList];

  let isOpen = alerts.length === 1 ? true : false;

  function updateSelected(item) {
    selected === item ? (selected = {}) : (selected = item);
  }

  function humanize(str) {
    const res = str
      .replace(/(\* WHAT)/, "\nWHAT ")
      .replace(/(\* WHERE)/, "WHERE ")
      .replace(/(\* WHEN)/, "WHEN ")
      .replace(/(\* IMPACTS)/, "\nIMPACTS&nbsp;")
      .replace(/(HAZARD)/, "\nHAZARD&nbsp;")
      .replace(/(SOURCE)/, "SOURCE&nbsp;")
      // .replace(/(\* IMPACT)/, "IMPACT&nbsp;")
      .replace(/(HAIL)/, "\nHAIL&nbsp;")
      .replace(/(WIND)/, "WIND&nbsp;")
      .replace(
        /(\* Locations impacted|Locations impacted)/,
        "\nLocations impacted"
      )
      .replace(/(\* Severe)/, "Severe")
      .replace(/(Forecast)/, "\nForecast&nbsp;")
      .replace(/(Flood History)/, "\nFlood History&nbsp;")
      .replace(/(ADDITIONAL DETAILS)/, "\nADDITIONAL DETAILS&nbsp;")
      .replace(/(PRECAUTIONARY)/, "\nPRECAUTIONARY")
      .replace(/(NEXT UPDATE)/, "\nNEXT UPDATE")
      .replace(/(SITUATION OVERVIEW)/, "\nSITUATION OVERVIEW")
      .replace(/(POTENTIAL IMPACTS)/, "\nPOTENTIAL IMPACTS")
      .replace(/(THREAT TO LIFE)/, "\nTHREAT TO LIFE")
      .replace(/(PLAN:)/, "\nPLAN:")
      .replace(/(PREPARE:)/, "\nPREPARE:")
      .replace(/(\n\* Until)/, "\n\nUntil:")
      .replace(/(\n\* At)/, "\nAt")
      .replace(/(FOLLOWING AREAS)/, "FOLLOWING AREAS\n")
      .replace(/(FOLLOWING LOCATIONS)/, "FOLLOWING LOCATIONS\n")
      .replace(/\n/g, "\n")
      // .replace(/(\* )/, "")
      .trim();
    return res;
  }
</script>

<div class="page">
  <div class="list">
    {#each alerts as item, i}
      <div class="alert_event">
        <Accordion {isOpen} >
          <!-- 
      on:click={() => updateSelected(item)}
      isOpen={selected === item} 
    -->
          <svelte:fragment slot="header">
            <div class="event_head">
              <h4>{item.event}</h4>
              <div class="start">
                <div class="label">Start:</div>
                <div class="date_time">
                  {new Intl.DateTimeFormat("en-US", {
                    weekday: "short",
                    // day: "numeric",
                    // month: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  }).format(item.start * 1000)}
                </div>
              </div>
              <div class="end">
                <div class="label">End:</div>
                <div class="date_time">
                  {new Intl.DateTimeFormat("en-US", {
                    weekday: "short",
                    // day: "numeric",
                    // month: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  }).format(item.end * 1000)}
                </div>
              </div>
            </div>
          </svelte:fragment>

          <svelte:fragment slot="body">
            <pre class="event_body" class:border_bottom={i !== alerts.length-1}>{@html humanize(item.description)}</pre>
          </svelte:fragment>
        </Accordion>
      </div>
    {/each}
  </div>
  <!-- list -->
</div>

<!-- page -->

<style lang="postcss">
  .page {
    font-family: var(--serif);
    padding: var(--header-height) 1rem var(--footer-height);
  }
  .list {
    margin-top: 1.5rem;
  }
  .event_head {
    padding: 0 0 1rem 0;
  }
  .event_body {
    padding: 0 0 1.5rem 0;
    margin-bottom: 1.5rem;
  }
  .border_bottom {
    border-bottom: 1px solid #ddd; 
  }
  pre {
    font-family: var(--serif);
  }
  pre {
    margin: 0;
  }
  h4 {
    font-size: calc(var(--font-size) + 2px);
    margin-bottom: 0.3rem;
    /* font-weight: 600; */
    /* font-size: 1.1rem; */
  }
  .start,
  .end {
    display: grid;
    grid-template-columns: 3rem 1fr;
    align-items: baseline;
    gap: 0 1ch;
  }
  .label {
    font-size: 0.85rem;
    font-variant: small-caps;
    /* font-weight: bolder; */
  }
  .date_time {
    font-size: 0.95rem;
  }
  /* .serif {

  } */
</style>
