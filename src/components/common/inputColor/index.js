import React, { Component } from 'react';

export default class InputColor extends Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, props);
        this.changeColor = this.changeColor.bind(this);
    }

    changeColor(event) {
        const { item } = this.props;
        let val = event.target.value;
        
        this.props.changeColor(item, val);
    }

    render() {
        const { item } = this.props;
        return (
            <div className="input-color_wrap">
                <label>{item.text}：</label>
                <div className="color-input">
                    <input type="color" value={item.value} onChange={this.changeColor} />

                </div>
            </div>
        );
    }
}
