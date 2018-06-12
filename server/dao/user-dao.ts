import aws from 'aws-sdk'
import { ConfigurationOptions } from 'aws-sdk/lib/config' // type
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

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

// base parameters
const base = {
  TableName: 'users'
}

// search user (by partition key)
export const findOne = username => {
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

// sign up user
export const signup = (credentials): Promise<any> => {
  const { password } = credentials

  // hash password
  const hash = bcrypt.hashSync(password, 10)

  // create user object
  const user = {
    ...credentials,
    password: hash,
    role: 'employee'
  }

  const params = {
    ...base,
    Item: user
  }
  return docClient.put(params).promise()
}

/* 
  Table: 'table name',
  Item: your data
*/

// dynamodb table
// { username, password }

// userData = { username: 'bino', password: 'philip' }
export const signUp = (userData): Promise<any> => {
  // convert to dynamodb readable
  const data = {
    TableName: 'users',
    Item: userData
  }

  // return object { table, item }
  return docClient.put(data).promise()
}

// export const saveMovie = (movie): Promise<any> =>
//   // put creates new item or replaces old item with new item
//   docClient
//     .put({
//       TableName: 'movies',
//       Item: movie
//     })
//     .promise()

// export const findAllByYear = (year: number): Promise<any> =>
//   docClient
//     .query({
//       TableName: 'movies',
//       // sanitize sql query; sets key
//       KeyConditionExpression: '#yr = :yyyy',
//       // alias field names of reserved words
//       ExpressionAttributeNames: {
//         '#yr': 'year'
//       },
//       // sanitize sql query; sets value
//       // alias field values of reserved words
//       ExpressionAttributeValues: {
//         ':yyyy': year
//       }
//     })
//     .promise()

// export const findByYearAndTitle = (year: number, title: string): Promise<any> =>
//   docClient
//     .get({
//       TableName: 'movies',
//       Key: {
//         year: year,
//         title: title
//       }
//     })
//     .promise()

// export const update = (movie): Promise<any> =>
//   docClient
//     .update({
//       TableName: 'movies',
//       Key: {
//         year: movie.year,
//         title: movie.title
//       },
//       // alias rating and description
//       UpdateExpression: 'set #rat = :r, #desc = :desc',
//       ExpressionAttributeNames: {
//         '#desc': 'description',
//         '#rat': 'rating'
//       },
//       ExpressionAttributeValues: {
//         ':r': movie.rating,
//         ':desc': movie.description
//       },
//       ReturnValues: 'UPDATED_NEW'
//     })
//     .promise()

// export const saveMovie = movie => {
//   console.log('beginning...')
//   console.log(awsConfig)
//   // put creates new item or replaces old item with new item
//   docClient.put(
//     {
//       TableName: 'movies',
//       Item: movie
//     },
//     (err, data) => {
//       if (err) {
//         console.log(
//           `Unable to create item: \n ${JSON.stringify(err, undefined, 2)}`
//         )
//       } else {
//         console.log(`Created item: \n ${JSON.stringify(data, undefined, 2)}`)
//       }
//     }
//   )
// }
