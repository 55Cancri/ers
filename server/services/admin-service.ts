import * as adminDao from '../dao/admin-dao'
import * as reimburseDao from '../dao/reimburse-dao'

export const verdicts = groupVerdict => {
  const { approver, selected, verdict } = groupVerdict

  // selected.forEach(item => {
  //   adminDao.updateStatus({ item, approver, verdict }).then(dynamo => '')
  // })

  return new Promise(resolve =>
    resolve(
      selected.forEach(item => {
        adminDao.updateStatus({ item, approver, verdict })
      })
    )
  )
}
