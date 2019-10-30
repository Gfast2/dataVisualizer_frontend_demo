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
} from '../logic/rStore';

@connect(store =>
  ({
    mainList: store.db.mainList,
  })
)
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    store.dispatch(initMainList());
  }

  render() {
    const { mainList } = this.props;
    return <div>
      <h1>Su's Data Visualizer</h1>
      <div id='chart_data'></div>
      <div id='chart_signal'></div>
      <button title='Aquiring next data'>Next</button>
      <button title='Restart from beginning'>Reset</button>
      <div>Current Data Index</div>
      <div>{mainList.length === 0 ? '-' : mainList[mainList.length-1]['index']}</div>
      <div>Current Data Content</div>
      <div>{mainList.length === 0 ? '-' : mainList[mainList.length - 1]['data']}</div>
      <div>Current Data Signal</div>
      <div>{mainList.length === 0 ? '-' : mainList[mainList.length - 1]['signal']}</div>
    </div>
  }
}