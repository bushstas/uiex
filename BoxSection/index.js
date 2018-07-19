import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Box} from '../Box';
import {Icon} from '../Icon';
import {BoxSectionPropTypes} from './proptypes';

import '../style.scss';
import './style.scss';

export class BoxSection extends UIEXComponent {
	static propTypes = BoxSectionPropTypes;
	static className = 'box-section';

	constructor(props) {
		super(props);
		
		this.state = {
			isOpen: props.isOpen
		}
	}
	
	addClassNames(add) {
		add('icon-at-right', this.props.iconAtRight);
	}

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps);
		if (nextProps.isOpen != this.props.isOpen) {
			this.setState({isOpen: nextProps.isOpen});
		}
	}

	renderInternal() {
		const {caption, children, iconAtRight, className, note, ...boxProps} = this.props;
		const {isOpen} = this.state;
		
		return (
			<div {...this.getProps()}>
				<div className="uiex-box-section-caption" onClick={this.handleClick}>
					<Icon name={isOpen ? 'expand_less' : 'expand_more'}/>
					<span>
						{caption}
					</span>
				</div>
				{note && 
					<div className="uiex-box-section-note" onClick={this.handleClick}>
						{note}
					</div>
				}
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