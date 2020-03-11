import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import {
	Alert,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Image,
	AsyncStorage
} from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List() {
	const [techs, setTechs] = useState([]);

	// pegando o usuario logado
	useEffect(() => {
		AsyncStorage.getItem('user').then(user_id => {
			const socket = socketio('http://192.168.0.31:3333', {
				query: { user_id }
			});
			// quando receber uma conexao de novo booking
			socket.on('booking_response', booking => {
				Alert.alert(
					`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${
						booking.approved ? 'APROVADA' : 'REJEITADA'
					}`
				);
			});
		});
	}, []);

	useEffect(() => {
		AsyncStorage.getItem('techs').then(storagedTechs => {
			const techsArray = storagedTechs.split(',').map(tech => tech.trim());

			setTechs(techsArray);
		});
	}, []);

	return (
		// safeareaview nao deixa o conteudo ficar atrás do statusbar
		<SafeAreaView style={styles.container}>
			<Image style={styles.logo} source={logo} />

			{/* scrollview coloca scroll vertical na lista, no Android nao funciona se nao tiver elementos suficientes */}
			<ScrollView>
				{techs.map(tech => (
					<SpotList key={tech} tech={tech} />
				))}
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},

	logo: {
		height: 32,
		// esta propriedade faz a imagem ficar dentro da area sem cortar
		resizeMode: 'contain',
		alignSelf: 'center',
		marginTop: 10
	}
});
