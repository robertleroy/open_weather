<script>
  export let high, low, domain;
  let hi, lo;
  $: {
    hi = scale(high);
    lo = scale(low);
  }

  function scale(n) {
    return (n - domain[0]) / (domain[1] - domain[0])*100;
  }
</script>

<section class='RangeBar'>
  <div class="range">
    <div class="shell"
      style="left: {lo}%; width: {hi-lo}%;">
         
      <div class="bar">
        <div class="low">{low}</div>
        <div class="high">{high}</div>
      </div>

    </div>
  </div>    
</section>

<style lang='postcss'>
  .range {
    height: 100%;
    position: relative;
    padding: 0 1.5rem 0 1rem;   
    display: grid;
    justify-content: stretch;
    
    @media (min-width: 500px) { 
      padding: 0 1.5rem 0 2rem;
    }
  }
  .shell {
    position: relative;
  }
  .bar {
    position: relative;
    background: gainsboro;
    border: 1px solid #808080;
    height: 0.75rem;
    border-radius: 0.375rem;
    box-shadow: 0 -2px 4px inset rgba(0,0,0,0.1);
    
    @media (min-width: 500px) {  
      height: 1rem;
      border-radius: 0.5rem;    
    }
  }
  .low, .high {
    position: absolute;
    top: -0.5rem;

    &:after {
      content: "°";
    }
    @media (min-width: 500px) { 
      font-size: inherit;
      top: -0.3rem;
    }
  }
  .low { left: -2.1rem; }
  .high { right: -2.3rem; }
</style>