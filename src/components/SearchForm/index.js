import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Input} from '../Input';
import {Button} from '../Button';
import {SearchFormPropTypes} from './proptypes';

import './style.scss';

let DEFAULT_STYLE;

export class SearchForm extends UIEXComponent {
	static propTypes = SearchFormPropTypes;
	static isControl = true;

	static setDefaultStyle(style) {
		DEFAULT_STYLE = style;
	}

	static setDefaultProps(props) {
		SearchForm.defaultProps = props;
	}

	constructor(props) {
		super(props);
		this.state = {
			value: props.value
		}
	}

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps);
		const {value} = this.props;
		if (value != nextProps.value) {
			this.setState({value: nextProps.value});
		}
	}

	getDefaultStyle() {
		return DEFAULT_STYLE;
	}

	getNativeClassName() {
		return 'search-form';
	}

	getClassNames() {
		let {checked, multiline, value} = this.props;
		let className = 'uiex-control';
		if (multiline) {
			className += ' uiex-multilined';
		}
		if (checked) {
			className += ' uiex-checked';
		}
		return className;
	}

	renderInternal() {
		let {children, caption, contentBefore} = this.props;

		return (
			<div {...this.getProps()}>
				{caption &&
					<div className="uiex-search-form-caption">						
						{caption}
					</div>
				}
				{contentBefore && 
					<div className="uiex-search-form-content uiex-content-before">
						{contentBefore}
					</div>
				}
				<div className="uiex-search-form-controls">
					<Input
						value={this.state.value}
						onChange={this.handleChange}
						onEnter={this.handleSubmit}
					/>
					<Button onClick={this.handleSubmit}>
						Найти
					</Button>
				</div>
				{children &&  
					<div className="uiex-search-form-content">
						{children}
					</div>
				}
			</div>
		)
	}

	handleChange = (value) => {
		const {onChange} = this.props;

		if (typeof onChange == 'function') {
			onChange(value);
		}
		this.setState({value});
	}

	handleSubmit = (value) => {
		const {onSubmit} = this.props;
		if (typeof onSubmit == 'function') {
			onSubmit(this.state.value);
		}
	}
}