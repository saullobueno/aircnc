import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Paginas
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import New from './pages/New';

export default function Routes() {
	return (
		// tag para abrir rotas
		<BrowserRouter>
			{/* Switch não deixa abrir mais de uma rota */}
			<Switch>
				{/* Rotas */}
				<Route path="/" exact component={Login} />
				<Route path="/dashboard" component={Dashboard} />
				<Route path="/new" component={New} />
			</Switch>
		</BrowserRouter>
	);
}
