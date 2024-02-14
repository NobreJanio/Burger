import * as Yup from 'yup'
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'
import User from '../models/User'

// para fazer  o login, precisamos de um usuário e uma senha.
class SessionController {
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email('Insira um e-mail válido')
        .required('O e-mail é obrigatório'),
      password: Yup.string()
        .min(6, 'No mínimo 6 dígitos')
        .required('A senha é obrigatória'),
    })

    const userEmailOrPasswordIncorrect = () => {
      return response
        .status(401)
        .json({ error: 'Make sure your password or e-mail are correct' })
    }
    // se algum erro no yup for encontrado, retorna os erros.
    if (!(await schema.isValid(request.body))) userEmailOrPasswordIncorrect()

    // busca pelo usuario que tem esse e-mail na base de dados
    const { email, password } = request.body

    const user = await User.findOne({
      where: { email },
    })

    //  Se não achar nenhum usuário com este e-mail, retorna erro.
    if (!user) userEmailOrPasswordIncorrect()

    //  Verificar se a senha está correta
    if (!(await user.checkPassword(password))) userEmailOrPasswordIncorrect()

    return response.json({
      id: user.id,
      name: user.name,
      email,
      admin: user.admin,
      token: jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    })
  }
}

export default new SessionController()
