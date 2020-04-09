import React, { Component } from 'react';
import './index.css'
import MarkDocument from './markDocument'
import { connect } from 'react-redux'
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        console.log(this.props.state)
        let { CJDefendants, CJTokens, CJMarks, isLoading } = this.props.state
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
        state
    }
}

export default connect(mapStateToProps)(index);