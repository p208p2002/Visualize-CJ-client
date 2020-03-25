import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip'

class markDocument extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    assignDefendantsColor = (defendants) => {
        // 分配顏色給每一個被告
        // [name, color]
        let availableColors = ['0, 155, 119', '42, 75, 124', '225, 93, 68', '239, 192, 80', '85, 180, 176', '224, 129, 25', '130, 46, 214', '214, 156, 47']
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
        // 轉換level到對應的顏色深淺(alpha)
        let levelMapAlpha = []
        for (var i = 100; i > 0; i -= 10) {
            levelMapAlpha.push((i) / 100)
        }
        let convertLevelToAlpha = (level) => {
            level = level < levelMapAlpha.length ? level : levelMapAlpha.length
            return levelMapAlpha[parseInt(level) - 1]
        }

        // 分配顏色給每一個被告
        defendants = this.assignDefendantsColor(defendants)
        console.log(defendants)

        //
        tokens = tokens.map((token, index) => {
            let mark = marks[index]
            if (mark !== '') {
                mark = mark.split(",")
                let name = mark[0]
                let color = defendants.filter((defendant) => {
                    return name === defendant.name
                })[0].color
                let level = mark[1]
                // 反回帶有高亮的token
                return (
                    <mark
                        id={`${name}-${token}`}
                        style={{
                            backgroundColor: `rgba(${color},${convertLevelToAlpha(level)})`
                        }}
                        key={index}
                        data-tip={name}>{token}</mark>
                )
            }
            var re = new RegExp('[：。]$');
            // 返回一般的token
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
                            <div key={index} className="col-4">
                                <div
                                    className="card"
                                    style={{
                                        borderColor: `rgb(${defendant.color})`
                                    }}
                                >
                                    <div className="card-header">被告</div>
                                    <div className="card-body">
                                        <h5 className="card-title">{defendant.name}</h5>
                                        <h6>候選身份</h6>
                                        <ul>
                                            {defendant.candicate_positions.map((positions, p_index) => {
                                                return (
                                                    <li key={p_index} style={{ listStyle: 'decimal' }}>
                                                        <a href={`#${defendant.name}-${positions[0].substring(0, 1)}`}>{positions[0].substring(0, 15)}</a>
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