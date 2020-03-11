import axios from 'axios';

const api = axios.create({
	// com o expo tem q ver o ip da maquina local
	baseURL: 'http://192.168.0.31:3333'
});

export default api;
