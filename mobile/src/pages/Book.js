import React, { useState } from 'react';
import {
	SafeAreaView,
	Alert,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	AsyncStorage,
	Text
} from 'react-native';

import api from '../services/api';

export default function Book({ navigation }) {
	const [date, setDate] = useState('');
	// buscando o id do spot enviado por parametro
	const id = navigation.getParam('id');

	async function handleSubmit() {
		// pegando a id do usuario
		const user_id = await AsyncStorage.getItem('user');
		// postando a confirmação da reserva
		await api.post(
			`/spots/${id}/bookings`,
			// passando a data da reserva
			{
				date
			},
			// passando o id do usuario
			{
				headers: { user_id }
			}
		);
		// alert de confirmação
		Alert.alert('Solicitação de reserva enviada.');
		// navegando de volta para a lista
		navigation.navigate('List');
	}
	// função de cancelamento apenas envia de volta para a lista
	function handleCancel() {
		navigation.navigate('List');
	}

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.label}>DATA DE INTERESSE *</Text>
			<TextInput
				style={styles.input}
				placeholder="Qual data você quer reservar?"
				placeholderTextColor="#999"
				autoCapitalize="words"
				autoCorrect={false}
				value={date}
				onChangeText={setDate}
			/>

			<TouchableOpacity onPress={handleSubmit} style={styles.button}>
				<Text style={styles.buttonText}>Solicitar reserva</Text>
			</TouchableOpacity>

			{/* no styles colocamos dois styles juntos como array */}
			<TouchableOpacity
				onPress={handleCancel}
				style={[styles.button, styles.cancelButton]}
			>
				<Text style={styles.buttonText}>Cancelar</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		margin: 30
	},

	label: {
		fontWeight: 'bold',
		color: '#444',
		marginBottom: 8,
		marginTop: 30
	},

	input: {
		borderWidth: 1,
		borderColor: '#ddd',
		paddingHorizontal: 20,
		fontSize: 16,
		color: '#444',
		height: 44,
		marginBottom: 20,
		borderRadius: 2
	},

	button: {
		height: 42,
		backgroundColor: '#f05a5b',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 2
	},

	cancelButton: {
		backgroundColor: '#ccc',
		marginTop: 10
	},

	buttonText: {
		color: '#FFF',
		fontWeight: 'bold',
		fontSize: 16
	}
});
