/*
store  => Cadastras / Adicionar
index  => Listar várias
show   => Listar apenas UM
update => Atualizar
delete => Deletar
*/
import { v4 } from 'uuid'
import * as Yup from 'yup'

import User from '../models/User'

// para  criar um novo usuário, precisamos passar o corpo da requisição (body) e a resposta do servidor (response).
class UserController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required().min(3, 'Nome muito curto!').max(256),
      email: Yup.string().email('Email inválido!').required(),
      password: Yup.string().required().min(6, 'Senha muito curta!'),
      admin: Yup.boolean(),
    })

    // if (!(await schema.isValid(request.body))) {
    //   return response
    //     .status(400)
    //     .json({ error: 'Make sure your data is correct' })
    // }

    // para passar o(s) erro(s) e continuar a execução do código
    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { name, email, password, admin } = request.body

    // para verificar se o email já existe no banco de dados
    const userExists = await User.findOne({
      where: { email },
    })

    if (userExists) {
      return response
        .status(400)
        .json({ error: 'Usuário com este e-mail já cadastrado!' })
    }

    // para criptografar a senha antes de salvar no banco de dados
    const user = await User.create({
      id: v4(),
      name,
      email,
      password,
      admin,
    })
    return response.status(201).json({ id: user.id, name, email, admin })
  }
}
export default new UserController()
