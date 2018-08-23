import React, { Component } from 'react';
import InputRange from "../../common/inputRange/index";
import InputColor from "../../common/inputColor/index";

export default class ShapAttrs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attrs: props.attrs
        }
        this.changeRange = this.changeRange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.attrs != nextProps.attrs) {
            this.setState({
                attrs: nextProps.attrs
            })
        }
    }

    changeRange(item, val) {
        let { attrs } = this.state;
        attrs.map((itm, index) => {
            if (itm.text == item.text) {
                itm.value = val;
            }
        })
        this.setState({
            attrs: attrs
        })
    }

    render() {
        
        // const {  } = this.props;
        let { attrs } = this.state;
        let self = this;
        return (
            <div>
                {
                    attrs.map((item, index) => {
                        const types = {
                            "InputRange": <InputRange key={index} item={JSON.parse(JSON.stringify(item))} changeRange={self.changeRange} />,
                            "InputColor": <InputColor key={index} item={JSON.parse(JSON.stringify(item))} changeColor={self.changeColor} />
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