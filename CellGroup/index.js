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
		this.totalCellSize = 0;
		this.previosTotalSize = null;
		this.children = [];
		this.rowSizes = [];
		this.currentRowIndex = -1;
	}

	doRenderChildren(children) {
		if (children) {
			if (children instanceof Array) {
				for (let i = 0; i < children.length; i++) {
					const child = this.renderChild(children[i], i);
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
		const columns = getNumber(this.props.columns, this.constructor.defaultColumns);
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
					className={this.rowSizes[idx] == columns ? 'uiex-complete-row' : 'uiex-incomplete-row'}
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
		this.isNewRow = false;
		let {columns, cellMargin, cellSize, rowMargin, sideShrink, cellAlign, cellHeight} = this.props;
		sideShrink = sideShrink || cellAlign == 'center';
		columns = getNumber(columns, this.constructor.defaultColumns);
		if (!columns) {
			columns = 1;
		}
		let {size, shift, firstInRow, lastInRow, stretched, maxSize, fullWidth, className} = child.props;
		let isLast;
		if (size === undefined) {
			size = cellSize || this.constructor.defaultCellSize;
		}
		size = getNumber(size);
		if (fullWidth) {
			size = columns;
		} else if (stretched) {
			size = columns - this.totalCellSize;
			if (size <= 0) {
				size = columns;
			}
			maxSize = getNumber(maxSize);
			if (maxSize) {
				size = Math.min(maxSize, size);
			}
		}
		shift = getNumber(shift);
		const previosTotalSize = this.totalCellSize;
		if (size) {
			props.width = (size * 100 / columns).toFixed(4) + '%';
			this.totalCellSize += size;
		}
		const isFirst = firstInRow || idx == 0 || this.totalCellSize > columns;
		if (isFirst) {
			this.isNewRow = true;
			this.previosTotalSize = previosTotalSize;
			this.totalCellSize = size;
		}
		if (shift) {
			if (this.totalCellSize + shift > columns) {
				isLast = true;
				if (isFirst) {
					shift = columns - size;
				}
			}
			this.totalCellSize += shift;
		}
		if (cellMargin === undefined) {
			cellMargin = getNumber(cellMargin, this.constructor.defaultCellMargin);
		} else {
			cellMargin = getNumber(cellMargin);
		}
		let halfOfcellMargin = cellMargin / 2;
		let addToCellMargin = 0;
		let addToSideCellMargin = 0;
		if (!sideShrink && cellMargin) {
			const extra = cellMargin;
			const cells = columns - 1;
			const add = extra / cells / 2;
			addToSideCellMargin = add;
			addToCellMargin = (add / 2).toFixed(1);
		}
		if (!isLast) {
			isLast = this.totalCellSize === columns;
		}
		if (sideShrink) {
			if (isFirst) {
				props.leftPadding = halfOfcellMargin;
			}
			if (isLast) {
				props.rightPadding = halfOfcellMargin;
			}
		}
		if (cellMargin) {
			const toAdd = halfOfcellMargin// + (isFirst || isLast ? addToSideCellMargin : -addToCellMargin);
			props.leftPadding = toAdd;
			props.rightPadding = toAdd;
		}
		if (shift) {
			props.leftMargin = shift * 100 / columns + '%';
		}
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
	}

	isAlignable() {
		return false;
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
}

class CellGroupRow extends UIEXComponent {
	static propTypes = CellGroupRowPropTypes;
	static className = 'cell-group-row';
}

class CellContent extends UIEXComponent {
	static className = 'cell-content';
}