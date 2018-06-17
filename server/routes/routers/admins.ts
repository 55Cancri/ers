import express from 'express'
import { Request, Response, NextFunction } from 'express'

import * as adminService from '../../services/admin-service'
import * as reimburseDao from '../../dao/reimburse-dao'
import { verifyToken } from '../../utils/verifyToken'

module.exports = app => {
  app.post('/verdicts', (req, res, next) => {
    const { verdict } = req.body
    adminService.verdicts(verdict)
    reimburseDao
      .getDataByIndex('pending')
      .then(allTickets => {
        console.log('all: ', allTickets)
        return allTickets.Items.slice(0, -1)
        // return [allTickets.Items.pop()]
      })
      .then(data => res.json(data))
      .catch(err => {
        console.log('what kind of error should even be here? ', err)
      })
  })
}
