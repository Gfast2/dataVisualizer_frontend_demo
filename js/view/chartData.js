'use strict';

import ra from 'raphael';

export default parent => {
  const { dom, data } = parent;
  const color_open = "#FF9900";
  const color_closed = "#BBDD99";
  const color_offline = "#AAA";
  const color_red = '#FD0511';
  const canvas = document.getElementById(dom);
  const visuH = 350; // Height of the visualization
  const visuW = canvas.offsetWidth; // Width of the visulization
  console.log("chartData.js");
  console.log(data);

  const paper = ra(dom, 5000, visuH);
  const xyOffSet = 10; // margin between chart and the border of the chart
  const startPoint = {
    x:0 + xyOffSet,
    y:visuH - xyOffSet
  }; // The left-down corner

  const initChart = () => {

    const chart = [
      ['M', startPoint.x, startPoint.y],      // Start / End Point
      ['L', startPoint.x + 100, startPoint.y - 100],
      ['L', startPoint.x + 100, startPoint.y],
    ];

    const c = paper
      .path("M0,0")
      .attr({
        path: chart,
        stroke: '#AAA',
        fill: "#eee",
        'fill-opacity': 0.3,
        "stroke-width": 2,
        "stroke-linecap": "round"
      });
  };

  initChart();
  
};