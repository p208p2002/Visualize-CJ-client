import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip'
class markDocument extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        // console.log(this.props.children)
    }

    assignDefendantsColor = (defendants) => {
        // [name, color]
        let availableColors = ['red', 'yellow', 'blue']
        return defendants.map((defendant, index) => {
            if (index < availableColors.length) {
                return { name: defendant.name, candicate_positions: defendant.candicate_positions, color: availableColors[index] }
            }
            else {
                return { name: defendant.name, candicate_positions: defendant.candicate_positions, color: availableColors[availableColors.length - 1] }
            }
        })
    }

    highlight = (defendants, tokens, marks) => {
        defendants = this.assignDefendantsColor(defendants)
        console.log(defendants)
        tokens = tokens.map((token, index) => {
            let mark = marks[index]
            if (mark !== '') {
                mark = mark.split(",")
                let name = mark[0]
                let color = defendants.filter((defendant) => {
                    return name === defendant.name
                })[0].color
                let level = mark[1]
                return (
                    <mark key={index} className={`tag-${color}-${level}`} data-tip={name}>{token}</mark>
                )
            }
            var re = new RegExp('[：。]$');
            // console.log(token.match(re))
            if (token.match(re) !== null)
                return <React.Fragment key={index}>{token}<br /></React.Fragment>
            else
                return <React.Fragment key={index}>{token}</React.Fragment>
        })
        return {
            context: tokens,
            defendantsWithColor: defendants
        }
    }

    render() {
        let { defendants, tokens, marks } = this.props
        let { context, defendantsWithColor } = this.highlight(defendants, tokens, marks)
        return (
            <div>
                <div className="row">
                    {defendantsWithColor.map((defendant, index) => {
                        return (
                            <div key={index}className="col-4">
                                <div className={`card border-${defendant.color}`}>
                                    <div className="card-header">被告</div>
                                    <div className="card-body">
                                        <h5 className="card-title">{defendant.name}</h5>
                                        <h6>候選身份</h6>
                                        <ul>
                                            {defendant.candicate_positions.map((positions,p_index)=>{
                                                return(
                                                <li key={p_index} style={{listStyle:'decimal'}}>
                                                    {positions[0].substring(0, 15)}
                                                </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div>
                    {context}
                </div>
                <ReactTooltip
                    key={JSON.stringify(this.props)}
                    html={true} />
            </div>
        );
    }
}

export default markDocument;