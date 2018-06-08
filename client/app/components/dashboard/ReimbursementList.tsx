import React, { SFC } from 'react'

// export const ReimbursementList: SFC<{
//   reimbursements: any
// }> = props => {
//   // console.log('props, ', props.reimbursements)
//   return <div />
// }
export const ReimbursementList: SFC<{
  reimbursements: any
}> = props => {
  const { reimbursements } = props
  return reimbursements.length === 0 ? (
    <div>You have not created any reimbursements yet</div>
  ) : (
    reimbursements.map(record => <p>{record}</p>)
  )
}

export default ReimbursementList
