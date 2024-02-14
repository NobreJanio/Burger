import jwt from 'jsonwebtoken'

export default (request, response, next) => {
  const token = request.headers['x-auth']
  if (!token) return response.status(401).json({ msg: 'No Token Provided' })
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    //add user data to the request object
    request.user = decoded
    console.log('User is Authenticated')
    next()
  } catch (err) {
    console.error(err.message)
    response.status(401).send({ msg: 'Invalid Token' })
  }
}
