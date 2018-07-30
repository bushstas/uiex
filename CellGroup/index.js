import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Icon} from '../Icon';
import {getNumber, addToClassName, removeClass} from '../utils';
import {CellGroupPropTypes, CellGroupRowPropTypes, CellPropTypes} from './proptypes';

import '../style.scss';
import './style.scss';

export class CellGroup extends UIEXComponent {
	static className = 'cell-group';
	static propTypes = CellGroupPropTypes;
	static properChildren = 'Cell';
	static onlyProperChildren = true;
	static defaultColumns = 3;
	static defaultCellMargin = 0;
	static defaultCellSize = 1;

	constructor(props) {
		super(props);
		this.initRowMarginStyle(props.rowMargin);
	}

	componentDidMount() {
		window.addEventListener('resize', this.handleWindowResize, false);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleWindowResize, false);
	}

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps);
		const {rowMargin} = this.props;
		if (rowMargin != nextProps.rowMargin) {
			this.initRowMarginStyle(nextProps.rowMargin);
		}
	}

	addClassNames(add) {
		const {cellAlign, sideShrink} = this.props;
		add('align-' + cellAlign, cellAlign);
		add('side-shrinked', sideShrink);
	}

	initRowMarginStyle(rowMargin) {
		rowMargin = getNumber(rowMargin);
		if (rowMargin) {
			this.rowStyle = {
				marginTop: rowMargin
			};
		} else {
			this.rowStyle = null;
		}
	}

	initRendering() {
		const {props, constructor: {defaultColumns, defaultCellSize}} = this;
		const {cellSize, maxCellSize, columns} = props;
		this.windowSize = this.getWindowSize();
		this.totalCellSize = 0;
		this.previosTotalSize = null;
		this.children = [];
		this.rowSizes = [];
		this.currentRowIndex = -1;
		this.columns = this.getSize(props, 'columns', columns) || defaultColumns;
		this.cellSize = this.getSize(props, 'cellSize', cellSize) || defaultCellSize;
		this.maxCellSize = this.getSize(props, 'maxCellSize', maxCellSize);		
	}

	doRenderChildren(children) {
		if (children) {
			if (children instanceof Array) {
				for (let i = 0; i < children.length; i++) {
					const child = this.renderChild(children[i], i);
					this.nextChild = children[i + 1];
					if (React.isValidElement(child) && !(child instanceof Array)) {
						if (this.isNewRow) {
							if (this.previosTotalSize) {
								this.rowSizes.push(this.previosTotalSize)
							}
							this.currentRowIndex++;
							this.children.push([]);
						}
						this.children[this.currentRowIndex].push(child);
					}
				}
			} else {
				const child = this.renderChild(children, 0);
				if (React.isValidElement(child)) {
					this.children.push(child);
				}
			}
		}
	}

	prepareChildren() {
		const rows = this.children.length;
		if (rows == 0) {
			return null;
		}
		if (this.rowSizes.length != rows) {
			this.rowSizes.push(this.totalCellSize);
		}
		return this.children.map((row, idx) => {
			return (
				<CellGroupRow
					className={this.rowSizes[idx] == this.columns ? 'uiex-complete-row' : 'uiex-incomplete-row'}
					key={idx} 
					style={idx > 0 ? this.rowStyle : null}
					height={100 / rows + '%'}
				>
					{row}
				</CellGroupRow>
			)
		});
		return null;
	}
	
	addChildProps(child, props, idx) {
		let {cellMargin, sideShrink, cellHeight} = this.props;		
		const {isNewRow, totalCellSize, previosTotalSize, width, shift, isFirst, isLast} = this.getChildSize(child, idx, true);
		props.width = width;
		this.totalCellSize = totalCellSize;
		this.previosTotalSize = previosTotalSize;
		this.isNewRow = isNewRow;

		if (cellMargin === undefined) {
			cellMargin = getNumber(cellMargin, this.constructor.defaultCellMargin);
		} else {
			cellMargin = getNumber(cellMargin);
		}
		
		let halfOfcellMargin = cellMargin / 2;
		if (sideShrink) {
			if (isFirst) {
				props.leftPadding = halfOfcellMargin;
			}
			if (isLast) {
				props.rightPadding = halfOfcellMargin;
			}
		}
		if (cellMargin) {
			props.leftPadding = halfOfcellMargin;
			props.rightPadding = halfOfcellMargin;
		}
		if (shift) {
			props.leftMargin = shift * 100 / this.columns + '%';
		}

		let {className} = child.props;
		props.className = addToClassName(className);
		if (!sideShrink) {
			if (isFirst && !shift) {
				props.className = addToClassName('uiex-first-cell-in-row', props.className);
			}
			if (isLast) {
				props.className = addToClassName('uiex-last-cell-in-row', props.className);				
			}
		}
		cellHeight = getNumber(cellHeight);
		if (cellHeight && !child.props.height) {
			props.height = cellHeight;
		}
		props.cellKey = child.key;
	}

	getChildSize(child, idx, isReal = false) {
		let isNewRow = false;
		let {totalCellSize, columns, cellSize} = this;
		let {shift, firstInRow, stretched, fullWidth, floatSide, lastInRow} = child.props;
		const {cellAlign} = this.props;

		// if (isReal && !stretched && cellAlign == 'justify') {
		// 	if (this.nextChild) {
		// 		const {isNewRow: isNew} = this.getChildSize(this.nextChild, 1);
		// 		stretched = isNew;
		// 	}
		// }
		
		let size = this.getSize(child.props, 'size', child.props.size) || cellSize;
		let maxSize = this.getSize(child.props, 'maxSize', child.props.maxSize);
		maxSize = maxSize || this.maxCellSize;
		let isLast;
		if (maxSize) {
			size = Math.min(maxSize, size);
		}
		if (size > columns) {
			size = columns;
		}
		if (fullWidth) {
			if (maxSize) {
				size = Math.min(maxSize, columns);
			} else {
				size = columns;
			}
		} else if (stretched) {
			size = columns - totalCellSize;
			if (size <= 0) {
				size = columns;
			}
			maxSize = getNumber(maxSize);
			if (maxSize) {
				size = Math.min(maxSize, size);
			}
		}
		if (floatSide) {
			shift = 9999;
		} else {
			shift = getNumber(shift);
		}
		const previosTotalSize = totalCellSize;
		const width = (size * 100 / columns).toFixed(4) + '%';
		totalCellSize += size;

		const isFirst = firstInRow || idx == 0 || totalCellSize > columns;
		if (isFirst) {
			isNewRow = true;
			totalCellSize = size;
		}
		if (shift) {
			if (totalCellSize + shift > columns) {
				isLast = true;
				if (isFirst) {
					shift = columns - size;
				} else {
					shift = columns - previosTotalSize - size;
				}
			}
			totalCellSize += shift;
		}
		if (!isLast) {
			isLast = totalCellSize === columns;
		}
		if (lastInRow) {
			totalCellSize = columns;
		}
		return {
			isNewRow,
			totalCellSize,
			previosTotalSize,
			width,
			size,
			shift,
			isFirst,
			isLast
		}
	}

	isAlignable() {
		return false;
	}

	getWindowSize() {
		const {innerWidth: w} = window;
		let ws;
		if (w <= 800) {
			ws = 0;
		} else if (w <= 1000) {
			ws = 1;
		} else if (w <= 1300) {
			ws = 2;
		} else if (w <= 1500) {
			ws = 3;
		} else if (w <= 2000) {
			ws = 4;
		} else if (w <= 2500) {
			ws = 5;
		} else if (w > 2500) {
			ws = 6;
		}
		return ws;
	}

	getSize(props, key, defaultSize) {
		const {innerWidth: w} = window;
		const ws = this.windowSize;
		let value;
		if (ws == 0) {
			key = key + 'Tiny';
			value = props[key];
		} else if (ws == 1) {
			key = key + 'Small';
			value = props[key];
		} else if (ws == 2) {
			key = key + 'Middle';
			value = props[key];
		} else if (ws == 3) {
			key = key + 'Larger';
			value = props[key];
		} else if (ws == 4) {
			key = key + 'Large';
			value = props[key];
		} else if (ws == 5) {
			key = key + 'Huge';
			value = props[key];
		} else if (ws == 6) {
			key = key + 'Gigantic';
			value = props[key];
		}
		value = getNumber(value);
		return value || getNumber(defaultSize);
	}

	handleWindowResize = () => {
		clearTimeout(this.timeout);
		this.timeout = setTimeout(() => {
			if (this.windowSize != this.getWindowSize()) {
				this.forceUpdate();
			}
		}, 40);
	}
}

export class Cell extends UIEXComponent {
	static propTypes = CellPropTypes;

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps);
		const {leftPadding: l, rightPadding: r, leftMargin: m} = this.props;
		if (l != nextProps.leftPadding || r != nextProps.rightPadding || m != nextProps.leftMargin) {
			this.setStyleChanged(true);
		}
	}

	getCustomStyle() {
		let {leftPadding: l, rightPadding: r, leftMargin: m} = this.props;
		let style;
		if (l) {
			style = {paddingLeft: l};
		}
		if (r) {
			style = style || {};
			style.paddingRight = r;
		}
		if (m) {
			style = style || {};
			style.marginLeft = m;
		}
		return style;
	}

	getCustomProps() {
		return {
			onClick: this.handleClick
		}
	}

	getMainStyle() {
		return super.getMainStyle(true);
	}

	renderInternal() {
		return (
			<div {...this.getProps()}>
				<CellContent style={this.props.style}>
					{this.renderChildren()}
				</CellContent>
			</div>
		)
	}

	handleClick = () => {
		const {onClick, cellKey} = this.props;
		if (typeof onClick == 'function') {
			onClick(cellKey);
		}
	}
}

class CellGroupRow extends UIEXComponent {
	static propTypes = CellGroupRowPropTypes;
	static className = 'cell-group-row';
}

class CellContent extends UIEXComponent {
	static className = 'cell-content';
}