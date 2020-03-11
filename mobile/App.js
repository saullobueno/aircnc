import React from 'react';
// desabilitando warmings do websocket
import { YellowBox } from 'react-native';
import Routes from './src/routes';

YellowBox.ignoreWarnings(['Unrecognized WebSocket']);

export default function App() {
	return <Routes />;
}
