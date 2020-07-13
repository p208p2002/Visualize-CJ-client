import React, { Component } from 'react';
import { connect } from 'react-redux'
import { parseCJ } from '../../reducers/MainReducer'
import { setVisualizeView } from '../../reducers/VisualizeReducer'
import axios from 'axios'
import './index.css'
import { IoIosPaper } from "react-icons/io";

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            context: '',
            foucsPositions: [],
            tab: 'PARSE_POSITION'
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

    submit = (type) => {
        let { dispatch } = this.props
        let { context, foucsPositions } = this.state

        let searchParagraph = undefined
        let question_A = undefined
        let question_B = undefined
        if (type === 'PARSE_POSITION') {
            searchParagraph = '事實'
            question_A = '[NAME]擔任什麼職位'
            question_B = '誰擔任[TARGET]'
        }
        else if (type === 'PARSE_UNIT') {
            searchParagraph = '單位'
            question_A = '[NAME]在什麼單位工作'
            question_B = '誰在[TARGET]工作'
        }
        else if (type === 'PARSE_BREAK_LAW') {
            searchParagraph = '論罪科刑'
            question_A = '[NAME]觸犯什麼法條'
            question_B = '誰觸犯[TARGET]'
        }
        dispatch(parseCJ(context, type, foucsPositions, searchParagraph, question_A, question_B))
    }

    render() {
        let { tab } = this.state
        let { dispatch } = this.props
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

                    {/*  */}
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <span
                                onClick={() => {
                                    dispatch(setVisualizeView('PARSE_UNIT'))
                                    this.setState({
                                        tab: 'PARSE_UNIT'
                                    })
                                }}
                                className={`nav-link ${tab === 'PARSE_UNIT' ? 'active' : ''}`} >分析單位</span>
                        </li>
                        <li className="nav-item">
                            <span
                                onClick={() => {
                                    dispatch(setVisualizeView('PARSE_POSITION'))
                                    this.setState({
                                        tab: 'PARSE_POSITION'
                                    })
                                }}
                                className={`nav-link ${tab === 'PARSE_POSITION' ? 'active' : ''}`} >分析職稱</span>
                        </li>
                        <li className="nav-item">
                            <span
                                onClick={() => {
                                    dispatch(setVisualizeView('PARSE_BREAK_LAW'))
                                    this.setState({
                                        tab: 'PARSE_BREAK_LAW'
                                    })
                                }}
                                className={`nav-link ${tab === 'PARSE_BREAK_LAW' ? 'active' : ''}`} >分析觸犯法條</span>
                        </li>
                    </ul>
                    <br />
                    {tab === 'PARSE_UNIT' ? <>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                this.submit('PARSE_UNIT')
                            }}
                            className="btn btn-primary">
                            分析單位
                                </button>
                    </> : <></>}
                    {tab === 'PARSE_POSITION' ? <>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                this.submit('PARSE_POSITION')
                            }}
                            className="btn btn-primary">
                            分析職稱
                                </button>
                    </> : <></>}
                    {tab === 'PARSE_BREAK_LAW' ? <>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                this.submit('PARSE_BREAK_LAW')
                            }}
                            className="btn btn-primary"
                        >
                            分析觸犯法條
                                </button>
                    </> : <></>}
                </form>
                <br />
            </div>
        );
    }
}

export default connect()(index);