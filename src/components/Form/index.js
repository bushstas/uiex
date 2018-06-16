import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {FormControl} from '../FormControl';
import {FormControlGroup} from '../FormControlGroup';
import {ButtonGroup} from '../ButtonGroup';
import {Button} from '../Button';
import {FormPropTypes} from './proptypes';
import {getNumber} from '../utils';

import './style.scss';

let DEFAULT_STYLE;
const DEFAULT_LINE_MARGIN = 15;

export class Form extends UIEXComponent {
	static propTypes = FormPropTypes;

	static setDefaultStyle(style) {
		DEFAULT_STYLE = style;
	}

	static setDefaultProps(props) {
		Form.defaultProps = props;
	}

	getDefaultStyle() {
		return DEFAULT_STYLE;
	}

	getNativeClassName() {
		return 'form';
	}

	isProperChild(child) {
		return child == FormControl ||
			   child == FormControlGroup;
	}

	addChildProps(child, props) {
		switch (child.type) {
			case FormControl:
				if (typeof child.props.onChange != 'function') {
					props.onChange = this.handleChange;
				}
			break;

			case FormControlGroup:
				let {lineMargin = DEFAULT_LINE_MARGIN, columns, controlSize} = this.props;
				lineMargin = getNumber(lineMargin);
				if (lineMargin) {
					props.bottomMargin = lineMargin;
				}
				if (columns && !child.props.columns) {
					props.columns = columns;
				}
				if (controlSize && !child.props.controlSize) {
					props.controlSize = controlSize;
				}
				if (typeof child.props.onChange != 'function') {
					props.onChange = this.handleChange;
				}
			break;
		}
	}

	renderInternal() {
		const {caption} = this.props;
		
		return (
			<div {...this.getProps()}>
				{caption &&
					<div className="uiex-form-caption">
						{caption}
					</div>
				}
				{this.renderChildren()}
				{this.renderButtons()}
			</div>
		)
	}

	renderButtons() {
		const {submit, clear} = this.props;
		if (submit || clear) {
			return (
				<ButtonGroup className="uiex-form-buttons">
					{submit && 
						<Button>
							{submit}
						</Button>
					}
					{clear && 
						<Button>
							{clear}
						</Button>
					}
				</ButtonGroup>
			)
		}
		return null;
	}

	handleChange = (name, value, checked) => {
		const {onChange} = this.props;
		if (typeof onChange == 'function') {
			onChange(name, value, checked);
		}
	}
}