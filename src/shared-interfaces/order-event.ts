interface OrderEvent {
    eventType: string;
    eventId: string;
    timestamp: string;
    data: OrderEventOrder;
}

interface OrderEventOrder extends Order {
    tableName: string
}