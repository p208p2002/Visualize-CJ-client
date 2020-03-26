import React, { Component } from 'react';
import CJInput from './modules/InputModules'
import VisualizeCJ from './modules/VisualizeModules'
import LoadingMask from './modules/loadingModules'
import './App.css'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container">
        <LoadingMask/>
        <h1>Visualize CJ</h1>
        <a href="https://law.judicial.gov.tw/default.aspx">法學判決書檢索系統</a>
        <CJInput />
        <VisualizeCJ />
        <footer className="text-center" style={{
          height:'300px'
        }}>
          {/* UDIC LAB */}
        </footer>
      </div>
    );
  }
}

export default App;