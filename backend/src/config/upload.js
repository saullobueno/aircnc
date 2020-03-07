// biblioteca para uploads de arquivos
const multer = require('multer');
// biblioteca do Node para trabalhar com pastas
const path = require('path');

module.exports = {
	// setando onde armazenará o arquivo
	storage: multer.diskStorage({
		// destino da pasta
		destination: path.resolve(__dirname, '..', '..', 'uploads'),
		// configurando o nome do arquivo
		filename: (req, file, cb) => {
			// extensão original do arquivo
			const ext = path.extname(file.originalname);
			// nome original do arquivo, sem a extensao
			const name = path.basename(file.originalname, ext);
			// função de callback formando o nome do arquivo, colocando a data em milisegundos para ele ser unico. Sem espaços tambem.
			cb(null, `${name.replace(/ /g, '')}-${Date.now()}${ext}`);
		}
	})
};
