import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {MaterialIcon} from './MaterialIcon';
import {FontAwesomeIcon} from './FontAwesomeIcon';
import {LineAwesomeIcon} from './LineAwesomeIcon';
import {FoundationIcon} from './FoundationIcon';
import {LigatureSymbolsIcon} from './LigatureSymbolsIcon';
import {GenericonsIcon} from './GenericonsIcon';
import {GlyphiconsIcon} from './GlyphiconsIcon';
import {IoniconsIcon} from './IoniconsIcon';
import {IcomoonIcon} from './IcomoonIcon';

import './style.scss';

export class Icon extends UIEXComponent {

	constructor(props) {
		super(props);
		this.initStyle(props);
	}

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps);
		const {style} = this.props;
		if (style != nextProps.style) {
			this.initStyle(nextProps);
		}
	}

	initStyle(props) {
		if (this.constructor.defaultStyles instanceof Object) {
			this.style = {
				...this.constructor.defaultStyles.main,
				...props.style
			}
		} else {
			this.style = props.style;
		}		
	}
	
	render() {
		let TypedIcon = MaterialIcon;
		switch (this.props.type) {
			case 'FontAwesome':
				TypedIcon = FontAwesomeIcon;
			break;

			case 'LineAwesome':
				TypedIcon = LineAwesomeIcon;
			break;

			case 'Foundation':
				TypedIcon = FoundationIcon;
			break;

			case 'LigatureSymbols':
				TypedIcon = LigatureSymbolsIcon;
			break;

			case 'Genericons':
				TypedIcon = GenericonsIcon;
			break;

			case 'Glyphicons':
				TypedIcon = GlyphiconsIcon;
			break;

			case 'Ionicons':
				TypedIcon = IoniconsIcon;
			break;

			case 'IcoMoon':
				TypedIcon = IcomoonIcon;
			break;
		}
		const {disabled} = this.props;
		const onClick = disabled ? null : this.props.onClick;
		return (
			<TypedIcon 
				{...this.props} 
				onClick={onClick} 
				style={this.style}
			/>
		)
	}
}