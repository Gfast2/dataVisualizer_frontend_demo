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

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("Hi");
    return <div>Hi there</div>
  }
}