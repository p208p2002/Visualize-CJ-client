import React, { Component } from 'react';
import CJInput from './modules/InputModule'
import VisualizeCJ from './modules/VisualizeModule'
import LoadingMask from './modules/loadingModule'
import Footer from './modules/FooterModule'
import LoginForm from './modules/UserModule/loginForm'
import './App.css'

let { REACT_APP_USER_AUTH } = process.env

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
          {REACT_APP_USER_AUTH === 'TRUE' ?
            <span className="float-right"><span>UDIC LAB</span> | <span onClick={() => {
              window.localStorage.setItem('appToken', '')
              window.location.href = '/'
            }}
              style={{ cursor: 'pointer' }}
            >登出</span></span> :
            <span className="float-right"><span>UDIC LAB</span></span>}
        </div>
        <div className="container">
          {REACT_APP_USER_AUTH === 'TRUE' ? <LoginForm /> : <></>}
          <LoadingMask />
          <CJInput />
          <VisualizeCJ />
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;