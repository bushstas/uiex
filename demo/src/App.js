import React from 'react';
import {Button} from '../src';

export default class App extends React.PureComponent {
	render() {
		return (
			<Button
				href="https://mail.ru"
				target="_blank"
				title="Press me if you can"
				disabled
				onDisabledClick={this.handleDisabledClick}
				classes="fucked"
				color="orange"
				size="huge"
				border={4}
			>
				Press me if you can
			</Button>
		)
	}

	handleDisabledClick = (value) => {
		alert('disabled click value = '+ value)
	}
}