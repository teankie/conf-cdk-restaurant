interface OrderEvent {
    eventType: string;
    eventId: string;
    timestamp: string;
    data: TableOrder;
}

interface TableOrder extends Order {
    tableName: string
}