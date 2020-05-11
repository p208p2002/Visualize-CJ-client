import React, { Component } from 'react';
import './index.css'
import MarkDocument from './markDocument'
import { connect } from 'react-redux'
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_view:undefined
        };
    }


    render() {
        console.log(this.props.state)
        // let { CJDefendants, CJTokens, CJMarks, isLoading } = this.props.MainReducer
        let { current_view='', results } = this.props.VisualizeReducer
        let data = results[current_view] || {}
        let { CJDefendants=[], CJTokens=[], CJMarks=[], isLoading } = data
        return (
            <div id="VisualizeModule">
                {isLoading ? <React.Fragment></React.Fragment>:
                    <MarkDocument
                        defendants={CJDefendants}
                        tokens={CJTokens}
                        marks={CJMarks}
                    />}
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        MainReducer:state.MainReducer,
        VisualizeReducer:state.VisualizeReducer
    }
}

export default connect(mapStateToProps)(index);