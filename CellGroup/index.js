import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Icon} from '../Icon';
import {getNumber, addToClassName} from '../utils';
import {CellGroupPropTypes, CellGroupRowPropTypes, CellPropTypes} from './proptypes';

import '../style.scss';
import './style.scss';

export class CellGroup extends UIEXComponent {
	static className = 'cell-group';
	static propTypes = CellGroupPropTypes;
	static properChildren = 'Cell';
	static onlyProperChildren = true;
	static defaultColumns = 5;
	static defaultCellMargin = 0;
	static defaultCellSize = 1;

	constructor(props) {
		super(props);
		this.initRowMarginStyle(props.rowMargin);
	}

	addClassNames(add) {
		const {cellAlign} = this.props;
		add('align-' + cellAlign, cellAlign);
	}

	initRowMarginStyle(rowMargin) {
		rowMargin = getNumber(rowMargin);
		if (rowMargin) {
			this.rowStyle = {
				marginTop: rowMargin
			};
		}
	}

	initRendering() {
		this.totalCellSize = 0;
		this.children = [];
		this.currentRowIndex = -1;
	}

	doRenderChildren(children) {
		if (children) {
			if (children instanceof Array) {
				for (let i = 0; i < children.length; i++) {
					const child = this.renderChild(children[i], i);
					if (React.isValidElement(child) && !(child instanceof Array)) {
						if (this.isNewRow) {
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
		if (this.children.length == 0) {
			return null;
		}
		const {cellAlign} = this.props;
		return this.children.map((row, idx) => {
			if (cellAlign == 'right') {
				console.log(row[0])
			}
			return (
				<CellGroupRow
					key={idx} 
					style={idx > 0 ? this.rowStyle : null}
				>
					{row}
				</CellGroupRow>
			)
		});
	}
	
	addChildProps(child, props, idx) {
		this.isNewRow = false;
		let {columns, cellMargin, cellSize, rowMargin, sideShrink, cellAlign} = this.props;
		sideShrink = sideShrink || cellAlign == 'center';
		columns = getNumber(columns, this.constructor.defaultColumns);
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
		if (size) {
			props.width = (size * 100 / columns).toFixed(4) + '%';
			this.totalCellSize += size;
		}
		const isFirst = firstInRow || idx == 0 || this.totalCellSize > columns;
		if (isFirst) {
			this.isNewRow = true;
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
		const halfOfcellMargin = cellMargin / 2;
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
			props.leftPadding = halfOfcellMargin;
			props.rightPadding = halfOfcellMargin;
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
	}

	isAlignable() {
		return false;
	}
}

export class Cell extends UIEXComponent {
	static propTypes = CellPropTypes;

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
}

class CellGroupRow extends UIEXComponent {
	static propTypes = CellGroupRowPropTypes;
	static className = 'cell-group-row';
}