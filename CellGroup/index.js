import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Icon} from '../Icon';
import {getNumber} from '../utils';
import {CellGroupPropTypes, CellPropTypes} from './proptypes';

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

	addClassNames(add) {
		add('nowrap', this.props.nowrap);
	}

	initRendering() {
		this.totalCellSize = 0;
		this.isNextRow = false;
	}

	getCustomStyle() {
		let {sidePadding, bottomMargin} = this.props;
		sidePadding = getNumber(sidePadding);
		bottomMargin = getNumber(bottomMargin);
		let style;
		if (sidePadding) {
			style = {paddingLeft: sidePadding, paddingRight: sidePadding};
		}
		if (bottomMargin) {
			style = style || {};
			style.marginBottom = bottomMargin;
		}
		return style;	
	}
	
	addChildProps(child, props, idx) {
		let {columns, cellMargin, cellSize, rowMargin, nowrap, sideShrink} = this.props;
		columns = getNumber(columns, this.constructor.defaultColumns);
		let {size, shift} = child.props;
		if (typeof size == 'undefined') {
			size = cellSize || this.constructor.defaultCellSize;
		}
		if (size == 'all') {
			size = columns;
		} else {
			size = getNumber(size);
		}
		shift = getNumber(shift);
		if (size) {
			props.width = (size * 100 / columns).toFixed(4) + '%';
			this.totalCellSize += size;
		}
		const isFirst = !nowrap && this.totalCellSize > columns;
		if (isFirst) {
			this.isNextRow = true;
			this.totalCellSize = size;
		}
		
		if (typeof cellMargin == 'undefined') {
			cellMargin = getNumber(cellMargin, this.constructor.defaultCellMargin);
		} else {
			cellMargin = getNumber(cellMargin);
		}
		let halfOfcellMargin = cellMargin / 2;
		const isLast = this.totalCellSize === columns;
		if (sideShrink) {
			if (idx == 0 || isFirst) {
				props.leftPadding = halfOfcellMargin;
			}
			if (isLast) {
				props.rightPadding = halfOfcellMargin;
			}
		}
		if (cellMargin) {
			if (idx > 0 && !isFirst) {
				props.leftPadding = halfOfcellMargin;
			}
			if (!isLast || nowrap) {
				props.rightPadding = halfOfcellMargin;
			}
		}
		if (this.isNextRow) {
			props.topMargin = getNumber(rowMargin);
		}
		if (shift) {
			props.leftMargin = shift * 100 / columns + '%';
		}
	}
}

export class Cell extends UIEXComponent {
	static propTypes = CellPropTypes;

	getCustomStyle() {
		let {leftPadding: l, rightPadding: r, leftMargin: m, topMargin: t} = this.props;
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
		if (t) {
			style = style || {};
			style.marginTop = t;
		}
		return style;
	}
}