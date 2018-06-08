import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as userDao from '../dao/user-dao'
import { userInfo } from 'os'

export const signup = dossier => {
  const clearance = userDao.findOne(dossier.username).then(data => {
    // if user exists, return duplicate error
    if (data.Items.length > 0) {
      // reject promise and send to clearance variable
      return Promise.reject({ errors: { global: 'user already exists!' } })
    }
    // if user does not exist, add to db, then verify by finding them
    if (data.Items.length === 0) {
      // create variable that will store promise result of signup -> findOne(user + token)
      const createThenVerify = userDao.signup(dossier).then(() =>
        userDao.findOne(dossier.username).then(data => {
          // normalize nested result from db query
          const user = data.Items[0]

          // create and add token to user object
          const token = jwt.sign(
            { username: user.username },
            process.env.JWT_SECRET
          )
          user['token'] = token

          // return user object in promise chain to createThenVerify variable
          return user
        })
      )
      // return user object (now in createThenVerify) to parent scope
      return createThenVerify
    }
  })
  // return user object (now in clearance) to function scope to pass along promise chain
  return clearance
}

export const login = credentials => {
  const { username, password } = credentials

  const clearance = userDao.findOne(username).then(data => {
    let proceed = false
    const user = data.Items[0]

    // create and add token to user object
    const token = user
      ? jwt.sign({ username: user.username }, process.env.JWT_SECRET)
      : null
    user ? (user['token'] = token) : null

    if (data.Items.length === 1) {
      if (bcrypt.compareSync(password, user.password)) proceed = true
    }
    return proceed
      ? user
      : Promise.reject({ errors: { global: 'Invalid credentials' } })
  })
  return clearance
}

export const getUser = username =>
  userDao.findOne(username).then(dossier => dossier)

// export const findAllByYear = (year: number) => movieDao.findAllByYear(year)

// export const findByYearAndTitle = (year: number, title: string) =>
//   movieDao.findByYearAndTitle(year, title)

// export const update = (movie: any) => movieDao.update(movie)
