import React, { Component } from 'react';
import CJInput from './modules/InputModules'
import VisualizeCJ from './modules/VisualizeModules'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container">
        <h1>Visualize CJ</h1>
        <a href="https://law.judicial.gov.tw/default.aspx">法學判決書檢索系統</a>
        <CJInput/>
        <VisualizeCJ/>
      </div>
    );
  }
}

export default App;