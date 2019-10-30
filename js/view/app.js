'use strict';

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import '../../css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUndo, faCaretSquareRight, faHatWizard } from '@fortawesome/free-solid-svg-icons'
library.add(faUndo, faCaretSquareRight, faHatWizard);
import '@babel/polyfill'; // For IE11, 'Promise'
import ChartData from './chartData_react';
import ChartSignal from './chartSignal_react';
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
      <h1 className='main-title'>Su's Data Visualizer</h1>
      <ChartData />
      <ChartSignal />
      <div className='flex-con'>
        <div className='flex-con-btn'>
          <button title='Aquiring next data' onClick={nextData}
            className='btn btn-lg btn-primary flex-it-btn'>
            <FontAwesomeIcon icon={faCaretSquareRight} /> Next
          </button>
          <br></br>
          <button title='Restart from beginning' onClick={resetData}
            className='btn btn-lg btn-danger flex-it-btn'
          ><FontAwesomeIcon icon={faUndo} /> Reset</button>
        </div>
        <table className='table shadow bg-white rounded table-margin'>
          <tbody>
          <tr>
            <th colSpan='2' className='text-center'>Current Data</th>
          </tr>
          <tr>
            <th className=''>Index</th>
            <td className=''>{latestObj['index']}</td>
          </tr>
          <tr>
            <th className=''>Content</th>
            <td className=''>{latestObj['data']}</td>
          </tr>
          <tr>
            <th className=''>Signal</th>
            <td className=''>{latestObj['signal']}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  }
}