import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';
import api from '../../services/api';

import './styles.css';

export default function Dashboard() {
	const [spots, setSpots] = useState([]);
	const [requests, setRequests] = useState([]);
	// pegando id do usuario logado
	const user_id = localStorage.getItem('user');

	// socketio restringido pelo usememo quando o id de usuario mudar
	const socket = useMemo(
		() =>
			socketio('http://localhost:3333', {
				query: { user_id }
			}),
		[user_id]
	);

	//Método do React que executa assim q o componente é chamado
	useEffect(
		() => {
			// socket.on faz contato em realtime com a outra ponta
			socket.on('booking_request', data => {
				setRequests([...requests, data]);
			});
		} /* array de dependencias */,
		[requests, socket]
	);
	// carregando spots
	useEffect(() => {
		async function loadSpots() {
			const user_id = localStorage.getItem('user');
			const response = await api.get('/dashboard', {
				headers: { user_id }
			});
			setSpots(response.data);
		}
		loadSpots();
	}, []);

	// função para aceitar o booking
	async function handleAccept(id) {
		await api.post(`/bookings/${id}/approvals`);
		// setando as request q sao diferentes da q aacabou de ser aprovada
		setRequests(requests.filter(request => request._id !== id));
	}

	// função para rejeitar o booking
	async function handleReject(id) {
		await api.post(`/bookings/${id}/rejections`);

		// setando as request q sao diferentes da q aacabou de ser aprovada
		setRequests(requests.filter(request => request._id !== id));
	}

	return (
		<>
			<ul className="notifications">
				{requests.map(request => (
					<li key={request._id}>
						<p>
							<strong>{request.user.email}</strong> está solicitando uma reserva
							em <strong>{request.spot.company}</strong> para a data:{' '}
							<strong>{request.date}</strong>
						</p>
						<button
							className="accept"
							onClick={() => handleAccept(request._id)}
						>
							ACEITAR
						</button>
						<button
							className="reject"
							onClick={() => handleReject(request._id)}
						>
							REJEITAR
						</button>
					</li>
				))}
			</ul>

			<ul className="spot-list">
				{spots.map(spot => (
					<li key={spot._id}>
						<header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
						<strong>{spot.company}</strong>
						<span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
					</li>
				))}
			</ul>

			<Link to="/new">
				<button className="btn">Cadastrar novo spot</button>
			</Link>
		</>
	);
}
