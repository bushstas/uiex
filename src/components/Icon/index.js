import React from 'react';
import {MaterialIcon} from './MaterialIcon';
import {AwesomeIcon} from './AwesomeIcon';

export class Icon extends React.Component {
	
	static setDefaultStyle(style) {
		MaterialIcon.setDefaultStyle(style);
		AwesomeIcon.setDefaultStyle(style);
	}

	render() {
		const {type, name, fontSize} = this.props;
		if (type == 'awesome') {
			return (
				<AwesomeIcon {...this.props}/>
			)
		}
		return (
			<MaterialIcon {...this.props}/>
		)
	}
}