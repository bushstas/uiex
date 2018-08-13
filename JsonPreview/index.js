import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Icon} from '../Icon';
import {JsonPreviewPropTypes} from './proptypes';

import '../style.scss';
import './style.scss';

const TAB = {
	1: "\t",
	2: "\t\t",
	3: "\t\t\t",
	4: "\t\t\t\t",
	5: "\t\t\t\t\t",
	6: "\t\t\t\t\t\t",
	7: "\t\t\t\t\t\t\t",
	8: "\t\t\t\t\t\t\t\t",
	9: "\t\t\t\t\t\t\t\t\t",
	10: "\t\t\t\t\t\t\t\t\t\t"
};

export class JsonPreview extends UIEXComponent {
	static propTypes = JsonPreviewPropTypes;
	static className = 'json-preview';

	initRendering() {
		this.tab = 0;
		this.content = '';
		this.info = null;
	}

	getCustomProps() {
		return {
			onClick: this.handleClick
		}
	}

	renderInternal() {
		const {data} = this.props;
		this.renderData(data);
		return (
			<div {...this.getProps()}>
				<pre dangerouslySetInnerHTML={{__html: this.content}}/>
				{this.renderInfo()}
			</div>
		)
	}

	renderInfo() {
		if (this.info) {
			return (
				<div className={this.getClassName('info')}>
					{this.info}
				</div>
			)
		}
	}

	renderData(data) {
		const isObject = data instanceof Object;
		const isArray = data instanceof Array;		
		const isElement = data instanceof Element;
		const isRegExp = data instanceof RegExp;
		const isFunction = data instanceof Function;
		const isPromise = data instanceof Promise;

		if (isObject && !isElement && !isRegExp && !isFunction && !isPromise) {
			if (isArray) {
				return this.renderArray(data);
			} else {
				if (data.jsonPreviewInfo) {
					this.info = data.jsonPreviewInfo;
					data = data.value;
					return this.renderData(data);
				}
				return this.renderObject(data);
			}
		}
		const item = this.getItem(data);
		this.renderLine(item);
	}

	renderArray(arr, isComma = false) {
		this.renderLine('[');
		this.addTab();
		for (let i = 0; i < arr.length; i++) {
			const isComma = i < arr.length - 1;
			const item = this.getItem(arr[i], isComma);			
			if (item) {
				this.renderLine(item, isComma);
			}
		}
		this.addTab(-1);
		this.renderLine(']' + (isComma ? ',' : ''));
	}

	renderObject(obj, isComma = false) {
		this.renderLine('{');
		this.addTab();
		const keys = Object.keys(obj);
		const lastKey = keys[keys.length - 1];
		for (let k in obj) {
			const key = this.getKey(k);
			const isComma = k != lastKey;
			this.renderLineStart(key + ': ');
			const item = this.getItem(obj[k], isComma);
			if (item) {
				this.renderLineEnd(item, isComma);
			}
		}
		this.addTab(-1);
		this.renderLine('}' + (isComma ? ',' : ''));
	}

	getItem(item, isComma) {
		switch (typeof item) {
			case 'symbol':
				return this.wrapWithTag(item.toString(), 'symbol');

			case 'string':
				return this.wrapWithTag('"' + item + '"', 'string');

			case 'number':
				return this.wrapWithTag(item, 'number');

			case 'boolean':
				return this.wrapWithTag(item.toString(), 'boolean');

			case 'undefined':
				return this.wrapWithTag('undefined', 'undefined');

			case 'function':
				return this.wrapWithTag('Function', 'function');

			case 'object':
				if (item === null) {
					return this.wrapWithTag('null', 'null');
				}
				if (item instanceof Element) {
					return this.wrapWithTag('Element', 'element');
				}
				if (item instanceof RegExp) {
					return this.wrapWithTag(item.toString(), 'regexp');
				}
				if (item instanceof Array) {
					return this.renderArray(item, isComma);
				}
				if (item instanceof Promise) {
					return this.wrapWithTag('Promise', 'promise');
				}
				return this.renderObject(item, isComma);
			
		}
	}

	renderLine(line, addComma = false) {
		this.content += this.getTab() + line + this.getComma(addComma) + "\n";
	}

	renderLineStart(start) {
		this.content += this.getTab() + start;
	}

	renderLineEnd(end, addComma = false) {
		this.content += end + this.getComma(addComma) + "\n";
	}

	addTab(add = 1) {
		this.tab += add;
	}

	getTab() {
		const quantity = this.tab;
		if (!quantity) {
			return '';
		}
		if (TAB[quantity]) {
			return TAB[quantity];
		}
		let tab = '';
		for (let i = 0; i < quantity; i++) {
			tab += "\t";
		}
		return tab;
	}

	getComma(isComma) {
		return isComma ? this.wrapWithTag(',', 'comma') : ''
	}

	wrapWithTag(item, className, tagName = 'span') {
		return '<' + tagName + ' class="' + this.getClassName(className) + '">' + item + '</' + tagName + '>';
	}

	getKey(key) {
		return this.wrapWithTag(key, 'key');
	}

	handleClick = () => {
		let {data, onClick} = this.props;
		if (data instanceof Object && data.jsonPreviewInfo) {
			data = data.value;
		}
		if (typeof onClick == 'function') {
			onClick(data);
		}
	}
}