import React, {Component} from 'react';
import './index.scss';
import Toolbox from '../../components/svgeditor/toolbox/index';
import SvgPanel from '../../components/svgeditor/showsvg/index';

export default class SvgEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		}

		this.changeShapAttr = this.changeShapAttr.bind(this);

	}

	changeShapAttr() {

	}

	render() {
		return (
			<div className="svg-editor" >
				<div id="toolbox">
					<Toolbox changeShapAttr={this.changeShapAttr} />
				</div>
				<div id="canvas">
					<SvgPanel />
				</div>
			</div>
		);
  	}
}