import * as Yup from 'yup'
import Category from '../models/Category'

// para  validar los campos de un formulario, se utiliza la libreria yup.js
class CategoryController {
  async store(request, response) {
    // para  criar um esquema de validação dos dados que vem do body, usa-se o Yup.object()... Yup.shape para agrupar vários campos em um único objeto
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false }) // valida todos os erros ao mesmo tempo
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { name } = request.body

    // para verificar se a categoria já existe no banco de dados
    const categoryExists = await Category.findOne({
      where: {
        name,
      },
    })

    if (categoryExists) {
      return response.status(400).json({ error: 'Category already exists!' })
    }
    const { id } = await Category.create({ name })

    return response.json({ name, id })
  }

  // para  atualizar uma categoria, precisamos  toda buscar essa categoria primeiro, por isso temos o findAll do params
  async index(request, response) {
    const category = await Category.findAll()

    return response.json(category)
  }
}

export default new CategoryController()
