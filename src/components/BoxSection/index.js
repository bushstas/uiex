import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Box} from '../Box';
import {Icon} from '../Icon';
import {BoxSectionPropTypes} from './proptypes';

import './style.scss';

let DEFAULT_STYLE;

const PROP_KEYS = Object.keys(BoxSectionPropTypes);
const STATE_KEYS = ['isOpen'];

export class BoxSection extends UIEXComponent {
	static propTypes = BoxSectionPropTypes;

	constructor(props) {
		super(props);
		
		this.state = {
			isOpen: props.isOpen
		}
	}
	
	static setDefaultStyle(style) {
		DEFAULT_STYLE = style;
	}

	static setDefaultProps(props) {
		BoxSection.defaultProps = props;
	}

	getDefaultStyle() {
		return DEFAULT_STYLE;
	}

	getPropKeys() {
		return PROP_KEYS;
	}

	getStateKeys() {
		return STATE_KEYS;
	}

	getNativeClassName() {
		return 'box-section';
	}

	getClassNames() {
		const {iconAtRight} = this.props;
		let className = '';
		if (iconAtRight) {
			className += ' uiex-icon-at-right';
		}
		return className;
	}

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps);
		if (nextProps.isOpen != this.props.isOpen) {
			this.setState({isOpen: nextProps.isOpen});
		}
	}

	renderInternal() {
		const {caption, children, iconAtRight, ...boxProps} = this.props;
		const {isOpen} = this.state;
		
		return (
			<div {...this.getProps()}>
				<div className="uiex-box-section-caption" onClick={this.handleClick}>
					<Icon name={isOpen ? 'expand_less' : 'expand_more'}/>
					<span>
						{caption}
					</span>
				</div>
				<Box {...boxProps} isOpen={isOpen}>
					{children}
				</Box>
			</div>
		)
	}

	handleClick = () => {
		const {disabled} = this.props;
		if (!disabled) {
			const {isOpen} = this.state;
			this.setState({isOpen: !isOpen});
		}
	}
}