import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { APIGatewayEvent } from 'aws-lambda';

class RestaurantEventHandler {
    private readonly tableName = process.env.EVENT_SOURCE_TABLE_NAME || '';
    private readonly dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({}), { marshallOptions: { removeUndefinedValues: true } });

    constructor() {
        if (!this.tableName) {
            throw new Error('No event source table name found in the environment variables');
        }
    }

    async handler(request: APIGatewayEvent) {
        const headers = { 'Content-Type': 'application/json' };

        try {
            if (request.httpMethod === "POST") {
                if (!request.body) throw new Error('Expected a restaurantEvent, but no data received');
                const restaurantEvent = JSON.parse(request.body).command;

                await this.dynamo.send(new PutCommand({
                    TableName: this.tableName,
                    Item: restaurantEvent
                }));

                return {
                    statusCode: 200,
                    body: `{ "result": "Executed ${restaurantEvent.event.eventType} with id ${restaurantEvent.eventId}"}`,
                    headers
                };
            } else if (request.httpMethod === "GET") {
                const result = await this.dynamo.send(new ScanCommand({ TableName: this.tableName }));
                return {
                    statusCode: 200,
                    body: JSON.stringify(result.Items),
                    headers
                };
            }

            throw new Error('Unsupported HTTP method');
        } catch (err: any) {
            return {
                statusCode: 400,
                body: JSON.stringify(err),
                headers
            };
        }
    }
}

export const handler = (request: APIGatewayEvent) => new RestaurantEventHandler().handler(request);
