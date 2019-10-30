'use strict';

import Visu from './chartData';

import React from 'react';
import { connect } from 'react-redux';
import { store } from '../logic/rStore';

@connect(store =>
  ({
    mainList: store.db.mainList,
  })
)
export default class ChartData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      divID: 'chart_data_div',
      visuObj: null // local cache hold initialized visualization object
    }
  }

  // Initialize visualization container
  visuInit() {
    const visu = new Visu({
      dom: this.state.divID,
      data:this.props.mainList
    });
    this.setState({ visuObj: visu });
  }

  // Update visualization
  visuUpdate() {

  }

  componentDidMount() {
    // console.log('sensor data get mounted.');
    // console.log(this.props);
    this.visuInit();
  }

  componentDidUpdate(prevProps, prevState) {
    this.visuUpdate();
  }

  render() {
    // console.log("chartData_react.js update");
    return (
      <div id={this.state.divID} className="" >chartData_react.js</div>
    );
  }

}