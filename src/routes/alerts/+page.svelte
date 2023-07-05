<script>
  import Accordion from "$lib/components/Accordion.svelte";
  import alertsList from "./alerts";
  const alerts = [...alertsList];
  // const alerts = [alertsList[0]];
  
  // let selected = alerts.length > 1 ? {} : alerts[0] ;

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
      .replace(/(\* Locations impacted|Locations impacted)/, "\nLocations impacted")
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

  {#each alerts as item,i}
    <div class="alert_event" >
      <Accordion> 
    <!-- 
      on:click={() => updateSelected(item)}
      isOpen={selected === item} 
    -->
        <svelte:fragment slot="header">
          <div>
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
          <pre>{@html humanize(item.description)}</pre>
        </svelte:fragment>
      </Accordion>
    </div>
  {/each}
</div>

<style lang="postcss">
  .page { 
    font-family: var(--serif);
    padding: var(--header-height) 1rem
    var(--footer-height);
  }
  pre {
    font-family: var(--serif);
  }
  pre {
    margin: 0;
  }
  h4 {
    font-size: calc( var(--font-size) + 2px);
    margin-bottom: 0.5rem;
    /* font-weight: 600; */
    /* font-size: 1.1rem; */
  }
  .start,.end {
    display: grid;
    grid-template-columns: 3rem 1fr;
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
