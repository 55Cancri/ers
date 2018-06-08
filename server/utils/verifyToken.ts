import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  const token = req.headers.token

  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' })

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' })

    next()
    // User.findOne({ email: decoded.email }).then(async user => {
    //   if (user) next()
    //   else
    //     return res
    //       .status(403)
    //       .send({ auth: false, message: 'Failed to authenticate token.' })
    // })
  })
}
