import React, { Component } from 'react';
import { connect } from 'react-redux'
import { parseCJ } from '../../reducers/mainReducer'

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    submit = (e)=>{
        e.preventDefault()
        let { dispatch } = this.props
        dispatch(parseCJ())
        // console.log('onClick')
    }

    render() {
        return (
            <div>
                <form>
                    <div className="form-group">
                        <label>Example textarea</label>
                        <textarea
                            placeholder="請將判決書貼於此" 
                            className="form-control" 
                            id="exampleFormControlTextarea1"
                            style={{height:'300px'}}></textarea>
                    </div>
                    <button 
                        onClick={this.submit}
                        className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

export default connect()(index);