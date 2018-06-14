import aws from 'aws-sdk'
import { ConfigurationOptions } from 'aws-sdk/lib/config' // type
import dotenv from 'dotenv'

// enable environment variables
dotenv.config()

const awsConfig: ConfigurationOptions = {
  region: 'us-east-2',
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY
}

// set configuration options
aws.config.update(awsConfig)

// create instance of database
const dynamodb = new aws.DynamoDB()

// subset of functionality such as updates and deletes
const docClient = new aws.DynamoDB.DocumentClient()

const base = {
  TableName: 'reimbursements'
}

export const submit = (request): Promise<any> => {
  const reimbursement = {
    ...request,
    approver: 'n/a',
    status: 'pending',
    timeSubmitted: new Date().getTime().toString()
  }

  const params = {
    ...base,
    Item: reimbursement
  }
  return docClient.put(params).promise()
}

// search reimbursements by user and most recent submission
export const getData = username => {
  const params = {
    ...base,
    KeyConditionExpression: '#title = :username',
    ExpressionAttributeNames: {
      '#title': 'username'
    },
    ExpressionAttributeValues: {
      ':username': username
    }
  }
  return docClient.query(params).promise()
}

// search reimbursements by user and most recent submission
export const getDataByIndex = index => {
  const params = {
    ...base,
    IndexName: 'status-index',
    KeyConditionExpression: '#statusTitle = :statusValue',
    ExpressionAttributeNames: {
      '#statusTitle': 'status'
    },
    ExpressionAttributeValues: {
      ':statusValue': index
    }
  }
  return docClient.query(params).promise()
}
