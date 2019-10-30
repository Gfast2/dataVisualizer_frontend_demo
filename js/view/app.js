'use strict';

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import '../../css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPhoneAlt, faArrowCircleDown, faPlusCircle, faArrowCircleUp, faHatWizard } from '@fortawesome/free-solid-svg-icons'
library.add(faPhoneAlt, faArrowCircleDown, faPlusCircle, faArrowCircleUp, faHatWizard);
import '@babel/polyfill'; // For IE11, 'Promise'
import {
  store,
  initMainList,
  nextData
} from '../logic/rStore';

@connect(store =>
  ({
    mainList: store.db.mainList,
  })
)
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.nextData = this.nextData.bind(this);
  }

  componentDidMount() {
    store.dispatch(initMainList());
  }

  // Aquiring next data
  nextData() {
    const { mainList } = this.props;
    const mlLen = mainList.length;
    if (mlLen !== 0 && mainList[mlLen-1]['final'] !== '1') {
      store.dispatch(nextData());
    } else {
      store.dispatch(initMainList());
    }
  }

  // Reset all catched data
  resetData() {
    store.dispatch(initMainList());
  }

  render() {
    const { mainList } = this.props;
    const { nextData, resetData } = this;
    const mlLen = mainList.length;
    let latestObj = {
      'index': '-',
      'data': '-',
      'signal':'-'
    };
    if(mlLen !== 0) {
      latestObj = mainList[mlLen-1];
    }
    return <div>
      <h1>Su's Data Visualizer</h1>
      <div id='chart_data'></div>
      <div id='chart_signal'></div>
      <button title='Aquiring next data' onClick={nextData}>Next</button>
      <button title='Restart from beginning' onClick={resetData}>Reset</button>
      <div>Current Data Index</div>
      <div>{latestObj['index']}</div>
      <div>Current Data Content</div>
      <div>{latestObj['data']}</div>
      <div>Current Data Signal</div>
      <div>{latestObj['signal']}</div>
    </div>
  }
}