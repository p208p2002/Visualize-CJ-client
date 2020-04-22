import React, { Component } from 'react';
import { connect } from 'react-redux'
import { parseCJ } from '../../reducers/mainReducer'
import axios from 'axios'
import './index.css'
import { IoIosPaper } from "react-icons/io";

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            context: '',
            foucsPositions: []
        };
    }

    componentDidMount() {
        axios.get(require('../../assets/position_list.txt'))
            .then((res) => {
                let foucsPositions = res.data.split("\n")
                this.setState({
                    foucsPositions
                })
            })
    }

    loadExample = (fileName) => {
        axios.get(require('../../assets/examples/' + fileName))
            .then((res) => {
                console.log(res)
                this.setState({
                    context: res.data
                })
            })
    }

    submit = (e) => {
        e.preventDefault()
        let { dispatch } = this.props
        let { context, foucsPositions } = this.state
        // let foucsPositions = ["校長", "負責人"]
        console.log(context, foucsPositions)
        dispatch(parseCJ(context, foucsPositions))
        // console.log('onClick')
    }

    render() {
        return (
            <div id="InputModule">
                <form style={{ marginTop: 5, marginBottom: 5 }}>
                    <div className="form-group">
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://law.judicial.gov.tw/default.aspx" className="btn btn-danger"><IoIosPaper size={20} />&nbsp;法學判決書檢索系統</a>
                        <br />
                        <div
                            className="btn btn-success"
                            onClick={() => {
                                this.loadExample('1.txt')

                            }}
                        >輸入範例1</div>
                        &nbsp;
                        <div
                            className="btn btn-success"
                            onClick={() => {
                                this.loadExample('2.txt')

                            }}
                        >輸入範例2</div>
                        &nbsp;
                        <div
                            className="btn btn-success"
                            onClick={() => {
                                this.loadExample('3.txt')

                            }}
                        >輸入範例3</div>
                        &nbsp;
                        <div
                            className="btn btn-success"
                            onClick={() => {
                                this.loadExample('4.txt')

                            }}
                        >輸入範例4</div>
                         &nbsp;
                        <div
                            className="btn btn-success"
                            onClick={() => {
                                this.loadExample('5.txt')

                            }}
                        >輸入範例5</div>
                        <textarea
                            onChange={(e) => {
                                this.setState({
                                    context: e.target.value
                                })
                            }}
                            value={this.state.context}
                            placeholder="請將判決書貼於此"
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            style={{ height: '300px', marginTop: 5 }}></textarea>
                    </div>
                    <button
                        onClick={this.submit}
                        className="btn btn-primary">
                        Submit
                    </button>
                </form>
                <br />
            </div>
        );
    }
}

export default connect()(index);