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
    // if user does not, add to db, then verify by finding them
    if (data.Items.length === 0) {
      const createThenVerify = userDao.signup(dossier).then(() =>
        userDao.findOne(dossier.username).then(data => {
          const user = data.Items[0]

          // create and add token to user object
          const token = jwt.sign(
            { username: user.username },
            process.env.TOKEN_KEY
          )
          user['token'] = token
          console.log('user: ', user)
          return user
        })
      )
      console.log('var: ', createThenVerify)
      // return recovered user object to parent scope (clearance)
      return createThenVerify
    }
  })
  // return user object object to function scope for promise chain (signup)
  return clearance
}

export const login = credentials => {
  const { username, password } = credentials

  const clearance = userDao.findOne(username).then(data => {
    let proceed = false
    const user = data.Items[0]

    // create and add token to user object
    const token = jwt.sign({ username: user.username }, process.env.TOKEN_KEY)
    user['token'] = token

    if (data.Items.length === 1) {
      if (bcrypt.compareSync(password, user.password)) proceed = true
    }
    return proceed
      ? user
      : Promise.reject({ errors: { global: 'Invalid credentials' } })
  })
  return clearance
}

// export const findAllByYear = (year: number) => movieDao.findAllByYear(year)

// export const findByYearAndTitle = (year: number, title: string) =>
//   movieDao.findByYearAndTitle(year, title)

// export const update = (movie: any) => movieDao.update(movie)
