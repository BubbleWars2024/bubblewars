import AWS from 'aws-sdk';
export const dynamoDb = new AWS.DynamoDB.DocumentClient();
import { createResponse } from './utils.mjs';


export const getEnsName = async (address) => {
    console.log('GETENSNAMERUNNING', address);
    // Get ENS name.
    try {
        const params = {
            TableName: process.env.USERS_TABLE_NAME,
            IndexName: 'walletAddress-index',
            KeyConditionExpression: 'walletAddress = :walletAddress',
            ExpressionAttributeValues: {
                ':walletAddress': address.toString()
            }
        };
        const result = await dynamoDb.query(params).promise();
        console.log('GETENSNAMERUNNING', result);

        if (result?.Items?.length > 0) {
            const ensName = result.Items[0].username + '.eth';
            return createResponse(200, 'OK', 'getEnsName', 'Referral created', { ensName });
        }
    } catch (error) {
        return createResponse(500, 'Internal Server Error', 'getEnsName', `Failed to read user data: ${error.message}`);
    }
}
