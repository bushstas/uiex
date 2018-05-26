import React from 'react';
import {MaterialIcon} from './MaterialIcon';
import {AwesomeIcon} from './AwesomeIcon';

export const Icon = (props) => {	
	const {type, name, fontSize} = props;
	if (type == 'awesome') {
		return (
			<AwesomeIcon name={name} fontSize={fontSize}/>
		)
	}
	return (
		<MaterialIcon name={name} fontSize={fontSize}/>
	)
}