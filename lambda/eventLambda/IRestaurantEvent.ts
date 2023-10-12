// This interface defines the event structure we should use in our application
interface IRestaurantEvent {
    eventType: string,
    eventId: string,
    timestamp: string,
    data: any
}