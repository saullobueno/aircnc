import React, { useState, useEffect } from 'react';
import {
	View,
	AsyncStorage,
	KeyboardAvoidingView,
	Platform,
	Image,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet
} from 'react-native';

import api from '../services/api';

// as logos maiores servem pro react pegar automaticamente de acordo com a densidade de pixel do dipositivo
import logo from '../assets/logo.png';

// a propriedade navigation substitui o history
export default function Login({ navigation }) {
	const [email, setEmail] = useState('');
	const [techs, setTechs] = useState('');

	useEffect(() => {
		// abaixo põe a condição se o usuario estiver logado, se estiver, envia ele para a page List
		AsyncStorage.getItem('user').then(user => {
			if (user) {
				navigation.navigate('List');
			}
		});
	}, []);

	async function handleSubmit() {
		const response = await api.post('/sessions', {
			email
		});

		const { _id } = response.data;

		// este é o localstorage do reactnative
		await AsyncStorage.setItem('user', _id);
		await AsyncStorage.setItem('techs', techs);
		// substituindo o history para fazer a navegação do usuario posteriormente
		navigation.navigate('List');
	}

	return (
		// trocando view por esta tag pra jogar o conteudo para cima quando o teclado aparecer
		<KeyboardAvoidingView
			// aplicar esta config se for ios
			enabled={Platform.OS === 'ios'}
			// config
			behavior="padding"
			style={styles.container}
		>
			<Image source={logo} />

			<View style={styles.form}>
				<Text style={styles.label}>SEU E-MAIL *</Text>
				<TextInput
					style={styles.input}
					placeholder="Seu e-mail"
					placeholderTextColor="#999"
					// tipo de entrada
					keyboardType="email-address"
					// tirando o auto capitalize automatico
					autoCapitalize="none"
					// tirando auto correção
					autoCorrect={false}
					value={email}
					// diferente do onchange, o onchangetext recebe diretamente o texto e podemos passar a função diretamente text => setmail(text) ou como abaixo
					onChangeText={setEmail}
				/>

				<Text style={styles.label}>TECNOLOGIAS *</Text>
				<TextInput
					style={styles.input}
					placeholder="Tecnologias de interesse"
					placeholderTextColor="#999"
					autoCapitalize="words"
					autoCorrect={false}
					value={techs}
					// diferente do onchange, o onchangetext recebe diretamente o texto e podemos passar a função diretamente text => setmail(text) ou como abaixo
					onChangeText={setTechs}
				/>
				{/* Botão estilizado do mobile, 
						onpress substitui o onclick,
						como nao temos form, chamamos o submit aqui
				*/}
				<TouchableOpacity onPress={handleSubmit} style={styles.button}>
					<Text style={styles.buttonText}>Encontrar spots</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},

	form: {
		alignSelf: 'stretch',
		paddingHorizontal: 30,
		marginTop: 30
	},

	label: {
		fontWeight: 'bold',
		color: '#444',
		marginBottom: 8
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

	buttonText: {
		color: '#FFF',
		fontWeight: 'bold',
		fontSize: 16
	}
});
