import React, { Component } from 'react';

export default class InputRange extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.changeRange = this.changeRange.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.item !== nextProps.item;
    }

    changeRange(event) {
        const { item } = this.props;
        let val = event.target.value;

        this.props.changeRange(item, val);
    }

    render() {
        debugger
        const { item } = this.props;
        return (
            <div>
                <label>{item.text}：</label>
                <div className="range_wrap">
                    <input type="range" min={item.min} max={item.max} value={item.value} onChange={this.changeRange} />
                </div>
            </div>
        );
    }
}