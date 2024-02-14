import * as Yup from 'yup'
import Product from '../models/Product'

// para  validar los campos de un formulario, se utiliza la libreria yup.js
class ProductController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category: Yup.string().required(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false }) // valida todos os erros ao mesmo tempo
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { filename: path } = request.file // pegando o nome do arquivo na variavel "path"
    const { name, price, category } = request.body // pegando os dados que vem no corpo da requisição e atribuindo

    const product = await Product.create({
      name,
      price,
      category,
      path,
    }) // criando  um produto com os dados da requisição

    await schema.validate(request.body) // valida todos os campos do schema

    return response.json(product) // retorna o produto criado
  }

  async index(request, response) {
    const products = await Product.findAll()

    return response.json(products)
  }
}

export default new ProductController()
