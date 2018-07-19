import React from 'react';
import {UIEXForm} from '../UIEXComponent';
import {Icon} from '../Icon';
import {Button} from '../Button';
import {ButtonGroup} from '../ButtonGroup';
import {getNumberOrNull} from '../utils';
import {RateFormPropTypes} from './proptypes';

import '../style.scss';
import './style.scss';

const DEFAULT_SCALE = 5;
const DEFAULT_MIN_SCALE = 3;
const DEFAULT_MAX_SCALE = 10;
const DEFAULT_ICON = 'star_border';
const DEFAULT_ACTIVE_ICON = 'star';

export class RateForm extends UIEXForm {
	static propTypes = RateFormPropTypes;
	static className = 'rate-form';

	constructor(props) {
		super(props);
		const value = getNumberOrNull(props.value);
		this.state = {
			hovered: null,
			active: value && value > 0 ? value - 1 : null
		}
		this.initScale(props);
	}

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps);
		const {scale, normalColor, activeColor, icon, activeIcon, iconType, value} = this.props;
		if (scale != nextProps.scale) {
			this.initScale(nextProps);
		}
		if (value != nextProps.value) {
			const properValue = getNumberOrNull(nextProps.value) || 0;
			this.stars = null;
			this.setState({active: properValue - 1});
		}
		if (
			normalColor != nextProps.normalColor || 
			activeColor != nextProps.activeColor || 
			icon != nextProps.icon || 
			activeIcon != nextProps.activeIcon || 
			iconType != nextProps.iconType
		) {
			this.stars = null;
		}
	}

	addClassNames(add) {
		super.addClassNames(add);
		const {submit, reset} = this.props;
		add('with-buttons', submit || reset);
	}

	initScale = (props = this.props) => {
		let {scale} = props;
		scale = getNumberOrNull(scale) || DEFAULT_SCALE;
		scale = Math.max(DEFAULT_MIN_SCALE, scale);
		scale = Math.min(DEFAULT_MAX_SCALE, scale);
		this.scale = scale;
		this.stars = null;
	}

	initStars = () => {
		const {hovered, active} = this.state;
		let {iconType, normalColor, activeColor, hoverColor} = this.props;
		if (typeof iconType != 'string') {
			iconType = null;
		}
		this.stars = [];
		let normalStyle, activeStyle, hoverStyle;
		if (normalColor && typeof normalColor == 'string') {
			normalStyle = {color: normalColor};
		}
		if (activeColor && typeof activeColor == 'string') {
			activeStyle = {color: activeColor};
		}
		if (hoverColor && typeof hoverColor == 'string') {
			hoverStyle = {color: hoverColor};
		}
		for (let i = 0; i < this.scale; i++) {
			const isHovered = typeof hovered == 'number' && hovered >= i;
			const isActive = typeof active == 'number' && active >= i;
			const style = isHovered ? hoverStyle : (isActive ? activeStyle : normalStyle);
			this.stars.push(
				<span 
					key={i}
					onClick={this.handleClick.bind(null, i)}
					onMouseEnter={this.handleMouseOver.bind(null, i)}
					onMouseLeave={this.handleMouseOut.bind(null, i)}
				>
					<Icon 
						className={isHovered ? 'uiex-hovered' : null}
						active={isActive}
						style={style}
						type={iconType}
						name={this.getIcon(isActive)}
					/>
				</span>
			);
		}
	}

	getCustomStyle() {
		return this.customStyle;
	}

	getIcon(isActive) {
		let {icon, activeIcon} = this.props;
		if (!icon || typeof icon != 'string') {
			icon = DEFAULT_ICON;
		}
		if (!activeIcon || typeof activeIcon != 'string') {
			activeIcon = DEFAULT_ACTIVE_ICON;
		}
		return isActive ? activeIcon : icon;
	}

	initRendering() {
		if (!this.stars) {
			this.initStars();
		}
	}

	renderContent() {
		const {
			submit,
			reset,
			buttonDisplay,
			buttonColor,
			buttonWidth,
			buttonHeight,
			disabled,
			onDisabledClick
		} = this.props;
		return (
			<div className="uiex-rate-form-stars">
				{this.stars}
				{(submit || reset) && 
					<ButtonGroup view={buttonDisplay == 'united' ? 'united' : null}>
						{submit && 
							<Button 
								color={buttonColor}
								disabled={disabled}
								width={buttonWidth}
								height={buttonHeight}
								onClick={this.handleSubmitClick}
								onDisabledClick={onDisabledClick}
							>
								{submit}
							</Button>
						}
						{reset && 
							<Button 
								color={buttonColor}
								disabled={disabled}
								width={buttonWidth}
								height={buttonHeight}
								onClick={this.handleResetClick}
								onDisabledClick={onDisabledClick}
							>
								{reset}
							</Button>
						}
					</ButtonGroup>
				}
			</div>
		)
	}

	handleSubmitClick = () => {
		const {onSubmit} = this.props;
		if (typeof onSubmit == 'function') {
			onSubmit();
		}
	}

	handleResetClick = () => {
		this.stars = null;
		this.setState({active: -1});
		const {onReset} = this.props;
		if (typeof onReset == 'function') {
			onReset();
		}	
	}

	handleClick = (active, e) => {
		const {resettable, onChange, onReset, disabled, onDisabledClick} = this.props;
		if (disabled) {
			if (typeof onDisabledClick == 'function') {
				onDisabledClick();
			}
			return;
		}
		if (resettable && active == this.state.active) {
			active = -1;
			if (typeof onReset == 'function') {
				onReset();
			}
		}
		e.stopPropagation();
		if (active != this.state.active) {
			this.stars = null;
			this.setState({active});
			if (typeof onChange == 'function') {
				onChange(active + 1);
			}
		}
	}

	handleMouseOver = (hovered) => {
		if (!this.props.disabled) {
			this.stars = null;
			this.setState({hovered});
		}
	}

	handleMouseOut = (index) => {
		if (!this.props.disabled) {
			this.stars = null;
			this.setState({hovered: null});
		}
	}
}