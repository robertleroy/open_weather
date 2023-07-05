<script>
  let title = 'Map';
</script>

<div class='map'>
  <h3>{title}</h3>
  
</div>

<style lang='postcss'>
  .map {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: var(--footer-height);
    
    display: grid;
    place-items: center;

    /* background-color: wheat; */

    /* padding: 0; */
    z-index: 15;
  }
  
</style>