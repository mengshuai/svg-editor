import React, { Component } from 'react';
import InputRange from "../../common/inputRange/index";
import InputColor from "../../common/inputColor/index";

export default class LookAndTransform extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.changeRange = this.changeRange.bind(this);
        this.changeColor = this.changeColor.bind(this);
    }

    changeColor(item, val) {
        
    }

    changeRange(item, val) {

    }

    render() {
        const { attrs } = this.props;
        let self = this;

        return (
            <div>
                {
                    attrs.map((item, index) => {
                        const types = {
                            "InputRange": <InputRange key={index} item={item} changeRange={self.changeRange} />,
                            "InputColor": <InputColor key={index} item={item} changeColor={self.changeColor} />
                        }
                        return (
                            types[item.type]
                        )
                    })
                }
            </div>
        );
    }
}