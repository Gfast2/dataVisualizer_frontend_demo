'use strict';

import Visu from './chartSignal';

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
      divID: 'chart_signal_div',
      visuObj: null // local cache hold initialized visualization object
    }
  }

  // Initialize visualization container
  visuInit() {
    const visu = new Visu({
      dom: this.state.divID,
      mainL: this.props.mainList
    });
    this.setState({ visuObj: visu });
  }

  // Update visualization
  visuUpdate() {
    const { visuObj } = this.state;
    const { mainList } = this.props;
    if (visuObj === null) {
      console.log("call visuObj before initialization");
      return;
    }
    visuObj.updateChart(mainList);
  }

  componentDidMount() {
    this.visuInit();
  }

  componentDidUpdate(prevProps, prevState) {
    this.visuUpdate();
  }

  render() {
    return (
      <div id={this.state.divID} className="" />
    );
  }

}