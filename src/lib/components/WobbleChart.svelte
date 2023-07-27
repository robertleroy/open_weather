<script>
  import * as d3 from "d3";
  import { onMount } from "svelte";
  // import { transitionEnded } from "$lib/store";

  export let minutes = [];
  let clientWidth;

  let var_values = minutes
    .map((el) => {
      return { time: el.dt * 1000, value: el.precipitation };
    })
    .filter((el, i) => {
      return i % 3 === 0;
    });
  let var_height = 150;
  let var_width = 350;
  let var_margin = { top: 12, right: 3, bottom: 24, left: 3 };

  // $: if ($transitionEnded) {
  //   drawChart();
  //   $transitionEnded = false;
  //   /* ensure single call to drawChart() */
  // };

  function drawChart() {
    const height = var_height,
      width = var_width,
      margin = var_margin,
      values = var_values;

    const yMax = d3.max(values, (d) => d.value * 1.2),
      dynamicY =
        yMax < 2.5
          ? [0, 2.5]
          : yMax < 7.6
          ? [0, 7.6]
          : yMax < 10
          ? [0, 10]
          : yMax < 50
          ? [0, 50]
          : [0, yMax];

    const yAxisLabels =
      yMax < 2.5
        ? ["drizzle", "", "light"]
        : yMax < 7.6
        ? ["light", "", "moderate"]
        : yMax < 10
        ? ["light", "moderate", "heavy"]
        : ["light", "moderate", "heavy", "very heavy"];

    /* intensity: mm to in conversion
    2.5 = 0.1
    7.6 = 0.3
    10 = 0.4
    15 = 0.6
    25 = 1
    50 = 2
    */

    const x = d3
      .scaleTime() /* timeline x */
      .domain(d3.extent(values, (d) => d.time))
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear() /* dynamic y */
      .domain(dynamicY)
      .range([height - margin.bottom, margin.top]);

    const xAxis = (g) =>
      g
        .attr("transform", `translate(0,${height - margin.bottom + 6})`)
        .call(d3.axisBottom(x).ticks(4).tickSize(0))
        .call((g) => g.select(".domain").remove());

    const yScale = d3
      .scaleBand() /* y labels */
      .domain(yAxisLabels)
      .range([height - margin.bottom, margin.top]);

    const yAxis = (g) =>
      g /* y labels */
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisRight(yScale).tickSize(width - margin.left - margin.right))
        .call((g) => g.select(".domain").remove())
        .attr("stroke-dasharray", "2,2")
        .attr("stroke-opacity", 0.5)
        .call((g) => g.selectAll(".tick text").attr("x", 8).attr("dy", 12));
    // .attr("dy", -5))

    var area = d3
      .area()
      .curve(d3.curveNatural)
      .x((d) => x(d.time))
      .y0(y(0))
      .y1((d) => y(d.value));

    const svg = d3
      .select("#chart")
      .append("svg")
      .attr("viewBox", [0, 0, width, height]);
    svg
      .append("path")
      .datum(updatedValues())
      .attr("fill", "#64B5F6")
      .attr("d", area)

      .transition()
      .duration(2000)
      .attr("d", area)

      .on("start", function repeat() {
        d3.active(this)
          .transition()
          .duration(2000)
          .attr("d", area(updatedValues()))
          .on("start", repeat);
      });

    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);
  } // drawChart //

  function updatedValues() {
    if (var_values !== undefined) {
      return var_values.map((el) => {
        return { ...el, value: randomize(el.value) };
      });
    }
  }

  function randomize(x) {
    const abs = Math.random() * 2 - 1;
    const multiplier = x > 0.5 ? 0.3 : 0.2;
    return x * multiplier * abs + x;
  }

  onMount(() => {
    // await new Promise(resolve => {
    //   setTimeout(resolve, 1000)
    // })
    drawChart();
  });
</script>


<div id="chart" bind:clientWidth/>


<style>
  #chart {
    min-width: 300px;
  }
</style>
