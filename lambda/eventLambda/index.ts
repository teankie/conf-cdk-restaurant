import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { APIGatewayEvent } from 'aws-lambda';

interface IDatabaseOperations {
    putItem(item: any): Promise<void>;
    scanItems(): Promise<any[]>;
}

// This class is introduced for testability and prevents the need to mock the entire DynamoDB client.
class DynamoDBOperations implements IDatabaseOperations {
    private readonly tableName = process.env.EVENT_SOURCE_TABLE_NAME || '';
    private readonly dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({}), { marshallOptions: { removeUndefinedValues: true } });

    async putItem(item: any): Promise<void> {
        await this.dynamo.send(new PutCommand({
            TableName: this.tableName,
            Item: item
        }));
    }

    async scanItems(): Promise<any[]> {
        const result = await this.dynamo.send(new ScanCommand({ TableName: this.tableName }));
        return result.Items || [];
    }
}

export class RestaurantEventHandler {
    private readonly database: IDatabaseOperations;

    constructor(database: IDatabaseOperations) {
        this.database = database;
    }

    async handler(request: APIGatewayEvent) {
        const headers = { 'Content-Type': 'application/json' };

        try {
            if (request.httpMethod === "POST") {
                if (!request.body) throw new Error('Expected a restaurantEvent, but no data received');
                const restaurantEvent = JSON.parse(request.body).event;

                await this.database.putItem(restaurantEvent);

                return {
                    statusCode: 200,
                    body: `{ "result": "Executed ${restaurantEvent?.event?.eventType} with id ${restaurantEvent?.eventId}"}`,
                    headers
                };
            } else if (request.httpMethod === "GET") {
                const items = await this.database.scanItems();
                return {
                    statusCode: 200,
                    body: JSON.stringify(items),
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

export const handler = (request: APIGatewayEvent) => {
    const database = new DynamoDBOperations();
    const eventHandler = new RestaurantEventHandler(database);
    return eventHandler.handler(request);
};