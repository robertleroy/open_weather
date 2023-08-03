### [Open_Weather - Darksky](https://open-weather-robertleroy.vercel.app/)

- WobbleChart
  - D3 dosen't play nice with svelte transitions
  - .page transition `on weatherData`
    - `drawChart()` called on load
    - following transition on parent element 'undraws' chart

  - workaround to call `drawChart()` after parent transition ends
    - `on:introend`
    - all other transition seem to work fine
    - chart rendering is abrupt... 
    - is it better to ditch this transition ??

  - Alternative: eliminate `on weatherData` .page transition
    - page transitions still happen
    - weatherdata appears abruptly, but consistantly

#### Initial Deployment

- No `on weatherData` transition
- everything works fine.. 
- get her up and running, address this later


#### TODO
- PWA
  - manifest

- rename local storage name 'testStore'

