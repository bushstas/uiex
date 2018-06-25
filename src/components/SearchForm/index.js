import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Input} from '../Input';
import {Button} from '../Button';
import {SearchFormPropTypes} from './proptypes';
import {FORM_BUTTON_DISPLAY} from '../consts';
import {getNumberInPxOrPercent} from '../utils';

import './style.scss';

const DEFAULT_ICON = 'search';

export class SearchForm extends UIEXComponent {
	static propTypes = SearchFormPropTypes;
	static className = 'search-form';

	constructor(props) {
		super(props);
		this.state = {
			value: props.value,
			focused: false
		}
	}

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps);
		const {value} = this.props;
		if (value != nextProps.value) {
			this.setState({value: nextProps.value});
		}
	}

	getClassNames() {
		const {buttonDisplay, width, focusedWidth, hiddenButton} = this.props;
		const {focused} = this.state;
		let className = '';
		if (buttonDisplay && FORM_BUTTON_DISPLAY.indexOf(buttonDisplay) > -1) {
			className += ' uiex-form-button-' + buttonDisplay;
		} else {
			className += ' uiex-form-button-standart';
		}
		if (width) {
			className += ' uiex-form-with-given-width';
		}
		if (focusedWidth) {
			className += ' uiex-form-with-focused-width';
		}
		if (focused) {
			className += ' uiex-form-focused';
		}
		if (hiddenButton) {
			className += ' uiex-form-width-hidden-button';
		}
		return className;
	}

	renderInternal() {
		let {
			children,
			caption,
			contentBefore,
			buttonColor,
			buttonWidth,
			buttonHeight,
			placeholder,
			icon,
			iconType,
			buttonTitle,
			disabled,
			hiddenButton,
			onDisabledClick
		} = this.props;

		if (!buttonTitle && !icon) {
			iconType = null
			icon = DEFAULT_ICON;
		}

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
						className="uiex-search-form-input"
						placeholder={placeholder}
						disabled={disabled}
						onChange={this.handleChange}
						onEnter={this.handleSubmit}
						onFocus={this.handleFocus}
						onBlur={this.handleBlur}
						onDisabledClick={onDisabledClick}
					/>
					{(!hiddenButton || this.state.focused) &&
						<Button 
							icon={icon}
							iconType={iconType}
							className="uiex-search-form-submit"
							width={buttonWidth}
							height={buttonHeight}
							color={buttonColor}
							disabled={disabled}
							onClick={this.handleSubmit}
							onDisabledClick={onDisabledClick}
						>
							{buttonTitle}
						</Button>
					}
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

	handleFocus = () => {
		this.setState({focused: true});
		const {focusedWidth, onFocus} = this.props;
		if (focusedWidth) {
			this.refs.main.style.width = getNumberInPxOrPercent(focusedWidth);
		}
		if (typeof onFocus == 'function') {
			onFocus();
		}
	}

	handleBlur = () => {
		setTimeout(() => this.setState({focused: false}), 100);
		const {focusedWidth, width, onBlur} = this.props;
		if (focusedWidth) {
			this.refs.main.style.width = getNumberInPxOrPercent(width);	
		}
		if (typeof onBlur == 'function') {
			onBlur();
		}
	}
}