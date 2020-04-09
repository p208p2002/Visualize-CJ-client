import React, { Component } from 'react';
import CJInput from './modules/InputModule'
import VisualizeCJ from './modules/VisualizeModule'
import LoadingMask from './modules/loadingModule'
import Footer from './modules/FooterModule'
import './App.css'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div className="vj-title">
          <h1>Visualize CJ</h1>
          <span className="float-right">UDIC LAB</span>
        </div>
        <div className="container">
          <LoadingMask />
          <CJInput />
          <VisualizeCJ />
          <Footer/>
        </div>
      </div>
    );
  }
}

export default App;