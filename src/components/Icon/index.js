import React from 'react';
import {MaterialIcon} from './MaterialIcon';
import {FontAwesomeIcon} from './FontAwesomeIcon';
import {LineAwesomeIcon} from './LineAwesomeIcon';
import {FoundationIcon} from './FoundationIcon';
import {LigatureSymbolsIcon} from './LigatureSymbolsIcon';
import {OpenWebIcon} from './OpenWebIcon';
import {GenericonsIcon} from './GenericonsIcon';
import {GlyphiconsIcon} from './GlyphiconsIcon';
import {IoniconsIcon} from './IoniconsIcon';
import {IcomoonIcon} from './IcomoonIcon';

import './style.scss';

export class Icon extends React.PureComponent {
	
	static setDefaultStyle(style) {
		MaterialIcon.setDefaultStyle(style);
		FontAwesomeIcon.setDefaultStyle(style);
		LineAwesomeIcon.setDefaultStyle(style);
		FoundationIcon.setDefaultStyle(style);
		LigatureSymbolsIcon.setDefaultStyle(style);
		OpenWebIcon.setDefaultStyle(style);
		GenericonsIcon.setDefaultStyle(style);
		GlyphiconsIcon.setDefaultStyle(style);
		IoniconsIcon.setDefaultStyle(style);
		IcomoonIcon.setDefaultStyle(style);
	}

	static setDefaultProps(props) {
		Icon.defaultProps = props;
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

			case 'OpenWeb':
				TypedIcon = OpenWebIcon;
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

		return (
			<TypedIcon {...this.props}/>
		)
	}
}