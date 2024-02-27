import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'

export default (request, response, next) => {
  const authToken = request.headers.authorization

  if (!authToken) {
    return response.status(401).json({ error: 'No token provided.' })
  }

  const token = authToken.split(' ')[1] // xxx.xxx.xxx

  try {
    jwt.verify(token, authConfig.secret, function (err, decoded) {
      if (err) {
        throw new Error()
      }

      console.log(decoded)
      request.userId = decoded.id

      return next()
    })
  } catch (err) {
    return response.status(401).json({ error: 'Invalid Token.' })
  }
}
