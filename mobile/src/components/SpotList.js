import React, { useState, useEffect } from 'react';
// adiciona navegação em qualquer componente q nao seja uma pagina
import { withNavigation } from 'react-navigation';
import {
	View,
	StyleSheet,
	Text,
	FlatList,
	Image,
	TouchableOpacity
} from 'react-native';

import api from '../services/api';

// com o withNavigation, temos q colocar o export default la embaixo com ele
function SpotList({ tech, navigation }) {
	// estados
	const [spots, setSpots] = useState([]);

	useEffect(() => {
		async function loadSpots() {
			const response = await api.get('/spots', {
				// abaixo filtramos a listagem pela tech
				params: { tech }
			});
			// apos buscar a listagem, setamos no estado
			setSpots(response.data);
		}
		// carregando a função
		loadSpots();
	}, []);

	// navegação para a pagina Book com o id como parametro
	function handleNavigate(id) {
		navigation.navigate('Book', { id });
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				Empresas que usam <Text style={styles.bold}>{tech}</Text>
			</Text>
			{/* componente de listagem do reactnative  */}
			<FlatList
				style={styles.list}
				// indicando os dados da lista
				data={spots}
				// setando a id
				keyExtractor={spot => spot._id}
				// setando se é vertical ou horizontal
				horizontal
				// setando se quer scroll
				showsHorizontalScrollIndicator={false}
				// setando os dados da lista. Aqui podemos chamar o index do item, os itens pares, impares, etc
				renderItem={({ item }) => (
					<View style={styles.listItem}>
						<Image
							style={styles.thumbnail}
							// aqui se colocarmos diretamente o nome, ele busca um arquivo do projeto, mas a imagem é um arquivo externo, por isso utilizamos uri e somos obrigados a colocar altura e largura nos estilos dela
							source={{ uri: item.thumbnail_url }}
						/>
						<Text style={styles.company}>{item.company}</Text>
						<Text style={styles.price}>
							{item.price ? `R$${item.price}/dia` : 'GRATUITO'}
						</Text>
						<TouchableOpacity
							// aqui temos q criar uma função antes de chamar o handleNavigate, caso contrário a função handleNavigate executa ao abrir este componente
							onPress={() => handleNavigate(item._id)}
							style={styles.button}
						>
							<Text style={styles.buttonText}>Solicitar reserva</Text>
						</TouchableOpacity>
					</View>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 30
	},

	title: {
		fontSize: 20,
		color: '#444',
		paddingHorizontal: 20,
		marginBottom: 15
	},

	bold: {
		fontWeight: 'bold'
	},

	list: {
		paddingHorizontal: 20
	},

	listItem: {
		marginRight: 15
	},

	thumbnail: {
		width: 200,
		height: 120,
		resizeMode: 'cover',
		borderRadius: 2
	},

	company: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#333',
		marginTop: 10
	},

	price: {
		fontSize: 15,
		color: '#999',
		marginTop: 5
	},

	button: {
		height: 32,
		backgroundColor: '#f05a5b',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 2,
		marginTop: 15
	},

	buttonText: {
		color: '#FFF',
		fontWeight: 'bold',
		fontSize: 15
	}
});
// fazermos a exportação default aqui com o withNavigation
export default withNavigation(SpotList);
