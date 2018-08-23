import React, { Component } from 'react';

export default class CreateBtns extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
        this.clickBtn = this.clickBtn.bind(this);
    }

    clickBtn(event) {

        let clickBtn = {
            type: event.target.getAttribute('data-create'),
            text: event.target.innerText
        }
        this.props.createShap(clickBtn);
    }

    render() {
        const { btns } = this.props;
        return (
            <div onClick={this.clickBtn} className="clearfix">
                {
                    btns.map((item, index) => {
                        return <button key={index} className="btn btn_default btn_item" type="button" data-create={item.value} >{item.text}</button>
                    })
                }
            </div>
        );
    }
}