interface OrderEvent {
    eventType: string;
    eventId: string;
    timestamp: string;
    data: TableOrder;
}