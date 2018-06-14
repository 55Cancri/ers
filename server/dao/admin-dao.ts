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

export const updateStatus = (request): Promise<any> => {
  const { item, approver, verdict } = request

  const withVerdict = {
    ...base,
    Key: {
      username: item.username,
      timeSubmitted: item.timeSubmitted
    },
    UpdateExpression: 'SET #title1 = :val1, #title2 = :val2',
    ExpressionAttributeNames: {
      '#title1': 'status',
      '#title2': 'approver'
    },
    ExpressionAttributeValues: {
      ':val1': verdict,
      ':val2': approver
    },
    ReturnValues: 'ALL_NEW'
  }

  return docClient.update(withVerdict).promise()
}
