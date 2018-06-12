import * as reimburseDao from '../dao/reimburse-dao'
import * as userDao from '../dao/user-dao'

export const submit = ticket => {
  // ticket = {items[], username, role}
  const { username } = ticket
  const reimbursements = reimburseDao.submit(ticket).then(data => {
    reimburseDao.getData(username).then(data => {
      console.log('reimbursement data: ', data)
      // normalize nested result from db query
      const reimbursement = data.Items[0]

      // return reimbursement to promise chain
      return reimbursement
    })
  })
  // return reimbursements variable to function scope and continue promise chain
  return reimbursements
}

export const retrieve = username => reimburseDao.getData(username)

// export const createTable = () => reimburseDao.createReimburseTable()
// export const findAllByYear = (year: number) => movieDao.findAllByYear(year)

// export const findByYearAndTitle = (year: number, title: string) =>
//   movieDao.findByYearAndTitle(year, title)

// export const update = (movie: any) => movieDao.update(movie)
