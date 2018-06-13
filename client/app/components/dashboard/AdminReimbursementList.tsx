import React from 'react'

export const AdminReimbursementList = props => (
  <div>
    <div>
      <button>Approve</button>
      <button>Deny</button>
    </div>
    <table cellSpacing="0" className="reimburse-table">
      <tbody>
        <tr className="reimburse-headers">
          <th />
          <th>Username</th>
          <th>Total</th>
          <th>Status</th>
          <th>Time Submitted</th>
        </tr>
        {props.everyReimbursement.map(reim => {
          const dayOf = new Date(parseInt(reim.timeSubmitted))
          return (
            <tr key={reim.timeSubmitted} className="reimburse-row">
              <td>
                <input type="checkbox" />
              </td>
              <td>{reim.username}</td>
              <td>
                {reim.items
                  .map(item => parseInt(item.amount))
                  .reduce((total, item) => total + item)}
              </td>
              <td>{reim.status}</td>
              <td>
                {dayOf.getMonth() +
                  1 +
                  '/' +
                  dayOf.getDate() +
                  '/' +
                  dayOf.getFullYear()}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
)

export default AdminReimbursementList
