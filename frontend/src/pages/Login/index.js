import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history }) {
	const [email, setEmail] = useState('');

	// cadastrando usuario e mandando para o sessions
	async function handleSubmit(event) {
		event.preventDefault();

		const response = await api.post('/sessions', { email });
		// pegando o id
		const { _id } = response.data;
		// setando o id no localStorage para usar como usuario logado depois
		localStorage.setItem('user', _id);

		history.push('/dashboard');
	}

	return (
		<>
			<p>
				Ofereça <strong>spots</strong> para programadores e encontre{' '}
				<strong>talentos</strong> para sua empresa
			</p>
			{/* form para usuario se cadastrar */}
			<form onSubmit={handleSubmit}>
				<label htmlFor="email">E-MAIL *</label>
				<input
					id="email"
					type="email"
					placeholder="Seu melhor e-mail"
					value={email}
					onChange={event => setEmail(event.target.value)}
				/>

				<button className="btn" type="submit">
					Entrar
				</button>
			</form>
		</>
	);
}
