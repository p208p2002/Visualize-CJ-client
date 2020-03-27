import React, { Component } from 'react';
import { connect } from 'react-redux'
import { parseCJ } from '../../reducers/mainReducer'
import axios from 'axios'

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            context: '',
            foucsPositions:[]
        };
    }

    componentDidMount(){
        axios.get(require('../../assets/position_list.txt'))
        .then((res)=>{
            let foucsPositions = res.data.split("\n")
            this.setState({
                foucsPositions
            })
        })
    }

    loadExample = (fileName)=>{
        axios.get(require('../../assets/examples/'+fileName))
        .then((res)=>{
            console.log(res)
            this.setState({
                context:res.data
            })
        })
    }

    submit = (e) => {
        e.preventDefault()
        let { dispatch } = this.props
        let { context,foucsPositions } = this.state
        // let foucsPositions = ["校長", "負責人"]
        console.log(context,foucsPositions)
        dispatch(parseCJ(context, foucsPositions))
        // console.log('onClick')
    }

    render() {
        return (
            <div>
                <form>
                    <div className="form-group">
                        <div
                            className="btn btn-sm btn-success"
                            onClick={() => {
                                this.loadExample('1.txt')
                                
                            }}
                        >輸入範例1</div>
                        &nbsp;
                        <div 
                        className="btn btn-sm btn-success"
                        onClick={() => {
                            this.loadExample('2.txt')
                            
                        }}
                        >輸入範例2</div>
                        &nbsp;
                        <div 
                        className="btn btn-sm btn-success"
                        onClick={() => {
                            this.loadExample('3.txt')
                            
                        }}
                        >輸入範例3</div>
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
                            style={{ height: '300px' }}></textarea>
                    </div>
                    <button
                        onClick={this.submit}
                        className="btn btn-primary">
                        Submit
                    </button>
                </form>
                <br/>
            </div>
        );
    }
}

export default connect()(index);