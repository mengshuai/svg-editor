import React, { Component } from 'react';
import CreateBtns from "./createbtns";
import ShapAttrs from "./shapattrs";
import LookAndTransform from "./lookandtransform";
const createBtns = [
    { value: "rect", text: "Rect", type: "btnItem" },
    { value: "circle", text: "Circle", type: "btnItem" },
    { value: "ellipse", text: "Ellipse", type: "btnItem" },
    { value: "line", text: "Line", type: "btnItem" }
]
const shapsAttrs = {
    rect: [
        { text: "x", type: "InputRange", value: "100", min: "0", max: "800" },
        { text: "y", type: "InputRange", value: "10", min: "0", max: "800" },
        { text: "width", type: "InputRange", value: "300", min: "0", max: "800" },
        { text: "height", type: "InputRange", value: "200", min: "0", max: "800" },
        { text: "rx", type: "InputRange", value: "0", min: "0", max: "800" },
        { text: "ry", type: "InputRange", value: "0", min: "0", max: "800" }
    ],
    circle: [
        { text: "cx", type: "InputRange", value: "200", min: "0", max: "800" },
        { text: "cy", type: "InputRange", value: "200", min: "0", max: "800" },
        { text: "r", type: "InputRange", value: "50", min: "0", max: "800" }
    ],
    ellipse: [
        { text: "cx", type: "InputRange", value: "200", min: "0", max: "800" },
        { text: "cy", type: "InputRange", value: "200", min: "0", max: "800" },
        { text: "rx", type: "InputRange", value: "80", min: "0", max: "800" },
        { text: "ry", type: "InputRange", value: "30", min: "0", max: "800" }
    ],
    line: [
        { text: "x1", type: "InputRange", value: "10", min: "0", max: "800" },
        { text: "y1", type: "InputRange", value: "10", min: "0", max: "800" },
        { text: "x2", type: "InputRange", value: '100', min: "0", max: "800" },
        { text: "y2", type: "InputRange", value: "100", min: "0", max: "800" }
    ]
}
const lookandTransform = [
    { text: "填充", type: "InputColor", value: "#ffffff" },
    { text: "描边", type: "InputColor", value: "#ff0000" },
    { text: "描边", type: "InputRange", value: "1"},
    { text: "translateX", type: "InputRange", value: "0", min: "-400", max: "400" },
    { text: "translateY", type: "InputRange", value: "0", min: "-400", max: "400" },
    { text: "rotate", type: "InputRange", value: "0", min: "-180", max: "180" },
    { text: "scale", type: "InputRange", value: "0.1", min: "-1", max: "2" }
    
]
export default class Toolbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createBtns: createBtns,
            selectShap: "",
            createShaps: []
        }

        this.createShap = this.createShap.bind(this);
        
    }

    createShap(data) {
        let { createShaps } = this.state;
        let createShap = {
            shapAttrs: JSON.parse(JSON.stringify(shapsAttrs[data.type])),
            lookandTransform: JSON.parse(JSON.stringify(lookandTransform))
        }
        createShaps.map((item, index) => {
            item.isSelect = false;
        })
        createShap.guid = new Date().getTime();
        createShap.isSelect = true;
        createShaps.push(createShap);
        this.setState({
            createShaps: createShaps
        })
        this.props.changeShapAttr();
    }


    render() {
        // const { } = this.props;
        let { createBtns, createShaps } = this.state;
        let selectShap = createShaps.filter((item, index) => {
            return item.isSelect
        })

        return (
            <div>
                <h2>创建</h2>
                <CreateBtns btns={createBtns} createShap={this.createShap} />
                <h2>形状</h2>
                {
                    selectShap.length > 0 ? <ShapAttrs attrs={selectShap[0].shapAttrs} guid={selectShap[0].guid} /> : "请选择图形"
                }
                <h2>外观和变换</h2>
                {
                    selectShap.length > 0 ? <LookAndTransform attrs={selectShap[0].lookandTransform} guid={selectShap[0].guid} /> : "请选择图形"
                }
                
            </div>
        );
    }
}