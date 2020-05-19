import React, { Component } from 'react';
import './loginForm.css'
import { connect } from 'react-redux'
import { getToken } from '../../reducers/MainReducer'

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            pwd: ''
        }
        this.getToken = this.getToken.bind(this)
        this.pressEnter = this.pressEnter.bind(this)
    }

    pressEnter(e) {
        let self = this
        if (e.key === 'Enter') {
            self.getToken()
        }
    }

    componentDidMount() {
        window.addEventListener('keypress', this.pressEnter);
    }

    componentWillUnmount() {
        window.removeEventListener('keypress', this.pressEnter);
    }


    getToken() {
        let { dispatch } = this.props
        let { account, pwd } = this.state
        dispatch(getToken(account,pwd))
    }

    render() {
        let { appState } = this.props,
            { isLoging } = appState

        return (
            <div id="Login">
                <div className="login-form container">
                    <h3 className="text-center"><b>{'Login'}</b></h3>
                    <hr />
                    <div className="text-center" style={{ paddingBottom: 8 }}>
                        <br />
                        <br />
                        <input
                            disabled={isLoging}
                            value={this.state.account}
                            onChange={(e) => {
                                this.setState({
                                    account: e.target.value
                                })
                            }}
                            className="form-control"
                            placeholder={'E-mail or Username'}
                            type="text" />
                        <br />
                        <input
                            disabled={isLoging}
                            value={this.state.pwd}
                            onChange={(e) => {
                                this.setState({
                                    pwd: e.target.value
                                })
                            }}
                            className="form-control"
                            type="password"
                            placeholder={'Password'} />
                        <br />
                        <button
                            disabled={isLoging}
                            onClick={this.getToken}
                            className="btn btn-block btn-primary">{'Login'}</button>
                        <br />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        appState: state
    }
}

export default connect(mapStateToProps)(LoginForm);