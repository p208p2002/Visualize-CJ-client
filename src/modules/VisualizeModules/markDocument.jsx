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
                return { name: defendant, color: availableColors[index] }
            }
            else {
                return { name: defendant, color: availableColors[availableColors.length - 1] }
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
                    console.log(defendant)
                    return name === defendant.name
                })[0].color
                let level = mark[1]
                return (
                    <mark className={`tag-${color}-${level}`} data-tip={name}>{token}</mark>
                )
            }
            return <React.Fragment>{token}</React.Fragment>
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
                <div>
                    {defendantsWithColor.map((defendant) => {
                        return (
                            <p className={`tag-${defendant.color}-1`}>{defendant.name}</p>
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