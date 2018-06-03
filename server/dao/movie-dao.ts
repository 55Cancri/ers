import aws from 'aws-sdk'
import { ConfigurationOptions } from 'aws-sdk/lib/config' // type
import dotenv from 'dotenv'
// import 'dotenv/config'

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

// create a table (one time function)
export const createMovieTable = () => {
  dynamodb.createTable(
    {
      // table name
      TableName: 'movies',
      // keys and their types
      KeySchema: [
        { AttributeName: 'year', KeyType: 'HASH' }, // partition key
        { AttributeName: 'title', KeyType: 'RANGE' } // sort key
      ],
      AttributeDefinitions: [
        { AttributeName: 'year', AttributeType: 'N' }, // partition key
        { AttributeName: 'title', AttributeType: 'S' } // sort key
      ],
      // specifies wc's and rc's
      ProvisionedThroughput: {
        ReadCapacityUnits: 2,
        WriteCapacityUnits: 2
      }
    },
    (err, data) => {
      if (err) {
        console.log(
          `Unable to create table: \n ${JSON.stringify(err, undefined, 2)}`
        )
      } else {
        console.log(`Created table: \n ${JSON.stringify(data, undefined, 2)}`)
      }
    }
  )
}

// createMovieTable()

export const saveMovie = (movie): Promise<any> =>
  // put creates new item or replaces old item with new item
  docClient
    .put({
      TableName: 'movies',
      Item: movie
    })
    .promise()

export const findAllByYear = (year: number): Promise<any> =>
  docClient
    .query({
      TableName: 'movies',
      // sanitize sql query; sets key
      KeyConditionExpression: '#yr = :yyyy',
      // alias field names of reserved words
      ExpressionAttributeNames: {
        '#yr': 'year'
      },
      // sanitize sql query; sets value
      // alias field values of reserved words
      ExpressionAttributeValues: {
        ':yyyy': year
      }
    })
    .promise()

export const findByYearAndTitle = (year: number, title: string): Promise<any> =>
  docClient
    .get({
      TableName: 'movies',
      Key: {
        year: year,
        title: title
      }
    })
    .promise()

export const update = (movie): Promise<any> =>
  docClient
    .update({
      TableName: 'movies',
      Key: {
        year: movie.year,
        title: movie.title
      },
      // alias rating and description
      UpdateExpression: 'set #rat = :r, #desc = :desc',
      ExpressionAttributeNames: {
        '#desc': 'description',
        '#rat': 'rating'
      },
      ExpressionAttributeValues: {
        ':r': movie.rating,
        ':desc': movie.description
      },
      ReturnValues: 'UPDATED_NEW'
    })
    .promise()

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
