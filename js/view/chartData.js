'use strict';

import ra from 'raphael';

export default parent => {
  const { dom, mainL } = parent;
  const canvas = document.getElementById(dom);
  const visuH = 350; // Height of the visualization
  const visuW = canvas.offsetWidth; // Width of the visulization
  const midY = visuH / 2;
  console.log("chartData.js");
  console.log(mainL);

  const paper = ra(dom, 5000, visuH);
  const xyOffSet = 20; // margin between chart and the border of the chart
  const startPoint = {
    x:0 + xyOffSet,
    y:visuH - xyOffSet
  }; // The left-down corner

  // Draw three line
  const drawThreeLine = () => {
    const axisDown = [
      ['M', startPoint.x, startPoint.y],
      ['L', visuW - xyOffSet, startPoint.y],
    ];
    const ad = paper
      .path("M0,0")
      .attr({
        path: axisDown,
        stroke: '#777',
        "stroke-width": 2,
        "stroke-linecap": "round"
      });
    const axisMidUp = [
      ['M', startPoint.x, midY],
      ['L', visuW - xyOffSet, midY],
      ['M', startPoint.x, xyOffSet],
      ['L', visuW - xyOffSet, xyOffSet]
    ];
    const b = paper
      .path("M0,0")
      .attr({
        path: axisMidUp,
        stroke: '#aaa',
        "stroke-width": 1,
        "stroke-linecap": "round"
      });
  };

  // Draw the actual chart
  const chartGen = arr => {
    const listLen = arr.length;
    let maxData = 0;
    arr.map(e => {
      const bigD = parseInt(e.data);
      if(bigD > maxData) {
        maxData = bigD;
      }
    });
    let stepSize = listLen === 1 // distance between each data step
      ? 0
      : (visuW - 2 * xyOffSet) / (listLen - 1);
    let chartArr = [['M', startPoint.x, startPoint.y]];
    arr.map((e,i) => {
      const curData = parseInt(e.data);
      chartArr = [
        ...chartArr,
        [
          'L',
          startPoint.x + stepSize * i,
          xyOffSet + (visuH - 2 * xyOffSet) * (1-(curData / maxData))
        ]
      ];
    });
    if(listLen > 1) {
      chartArr = [ ...chartArr, [ 'L', visuW - xyOffSet, visuH - xyOffSet ] ];
    }
    paper
      .path("M0,0")
      .attr({
        path: chartArr,
        stroke: '#AAA',
        fill: "#eee",
        'fill-opacity': 0.3,
        "stroke-width": 2,
        "stroke-linecap": "round"
      });
    // TODO: Draw other marks on axises
  };

  const initChart = arr => {
    paper.clear();
    if(arr.length === 0) {
      return;
    }
    drawThreeLine();
    chartGen(arr);
  };
  initChart(mainL);
  return {
    "updateChart": d => {
      initChart(d);
    }
  };
};

