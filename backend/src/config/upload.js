const multer = require('multer');
const path = require('path');

module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve( __dirname, '..', '..', 'uploads'),

        // Requisição, arquivo e callback (função chamada quando o nome do arquivo estiver pronto)
        filename: (req, file, cb) => {
            //Retorna a extensão do arquivo
            const ext = path.extname(file.originalname);

            //Nome do arquivo sem a extensão
            const name = path.basename(file.originalname, ext);

            // parametros do callback: erro, nome-timestampatual.extensãodoarquivo
            cb(null, `${name}-${Date.now()}${ext}`);
        },
    }),
}