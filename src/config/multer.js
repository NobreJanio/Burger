import multer from 'multer'
import { v4 } from 'uuid'
import { extname, resolve } from 'path'

export default {
  storage: multer.diskStorage({
    // Cria uma pasta temporária para armazenar os arquivos enviados pelo usuário
    destination: resolve(__dirname, '..', '..', 'uploads'),

    // Define como o nome do arquivo será salvo
    filename: (request, file, cb) => {
      return cb(null, v4() + extname(file.originalname))
    },
  }),
}
