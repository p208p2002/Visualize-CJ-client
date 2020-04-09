import React, { Component } from 'react'
import ReactLoading from 'react-loading';
import './index.css'
import { connect } from 'react-redux'
export class index extends Component {
    render() {
        let { isLoading = false } = this.props.state
        return (
            <React.Fragment>
                {isLoading ? (
                    <div className="loading-mask" >
                        <div className="loading-component">
                            <ReactLoading type={'cylon'} color={'black'} height={100} width={100} />
                            <div className="text-center">讀取中</div>
                        </div>
                    </div>
                ) : (
                        null
                    )}
            </React.Fragment>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        state
    }
}

export default connect(mapStateToProps)(index)
