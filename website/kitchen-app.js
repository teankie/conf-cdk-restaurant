import {LitElement, html, css} from 'lit';

class KitchenApp extends LitElement {
    static get properties() {
        return {
            orders: {type: Array},
        };
    }

    constructor() {
        super();

        this.orders = [];
    }

    connectedCallback() {
        super.connectedCallback();

        this.orders = [];

        this.getEvents();
    }

    async getEvents() {
        const events = await fetch('/api/restaurant').then(response => response.json());

        this.orders = events.filter(event => event.eventType === 'CreatedOrder').map(orderCreatedEvent => {
            const order = {
                id: orderCreatedEvent.data.id,
                items: orderCreatedEvent.data.products,
                status: orderCreatedEvent.data.status,
                orderPlacedTimestamp: orderCreatedEvent.timestamp
            };
            return order;
        });
    }

    getStatusIcon(status) {
        switch (status) {
            case 'preparing':
                return html`<span class="material-symbols-outlined white">skillet</span>`;
            case 'ready':
                return html`<span class="material-symbols-outlined darkgreen">done</span>`;
            case 'served':
                return html`
                    <div class="countdown-container">
                        <svg class="countdown">
                            <circle cx="50%" cy="50%" r="15" /> <!-- updated radius -->
                        </svg>
                        <span class="material-symbols-outlined green">done</span>
                    </div>
                    `;
            case 'cancelled':
                return html`<span class="material-symbols-outlined orange">cancel</span>`;
            default:
                return html`<span class="material-symbols-outlined orange">help</span>`;
        }
    }

    setOrderReady(order) {
        this.orders = this.orders.map(o => o === order ? {...o, status: 'ready'} : o);
    }

    setOrderServed(order) {
        const newStatusOrder = {...order, status: 'served'};
        this.orders = this.orders.map(o => o === order ? newStatusOrder : o);

        setTimeout(() => this.orders = this.orders.filter(o => o !== newStatusOrder), 1000);
    }

    render() {
        return html`
            <h1 class="title">
                Kitchen application <span class="material-symbols-outlined">skillet</span>
            </h1>
            ${this.orders?.map((order, i) => html`
                <section class="table-selection">
                    <h1>
                        ${this.getStatusIcon(order.status)}
                        ${order.id}
                    </h1>
                    <ul>
                        ${order.items.map(item => html`
                            <li>${item.name} <span style="float:right;">${item.quantity} x</span></li>
                        `)}
                    </ul>
                    ${order.status === 'preparing'
                        ? html`<button @click="${() => this.setOrderReady(order)}">Ready</button>`
                        : order.status !== 'served'
                            ? html`<button @click="${() => this.setOrderServed(order)}">Served</button>`
                            : html`<button disabled>Served</button>`
                    }
                </section>
            `)}
        `;
    }

    static styles = [css`
      @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
      
      :host {
        font-family: Arial;
        display: block;
        max-height: 100%;
        overflow: auto;
        background-color: #1c2e40;
        color: white;
      }

      .material-symbols-outlined {
        font-family: 'Material Symbols Outlined';
        font-size: 34px;
        vertical-align: bottom;
        font-weight: normal;
      }

      .title {
        text-align: center;
        font-size: 24px;
        margin: 0;
      }

      section {
        min-height: 200px;
        padding: 0 5px;
        background-color: #2c3e50;
        border-top: 1px solid gray;
        border-bottom: 1px solid gray;
        font-size: 24px;
      }

      section button {
        font-size: 20px;
        border: 2px solid #457;
        border-radius: 5px;
        padding: 8px;
        margin: 4px;
        background-color: #34495e;
        color: white;
      }

      section button:hover {
        background-color: #457;
        border: 2px solid transparent;
      }

      ul {
        padding: 0;
      }

      li {
        border-bottom: 1px dotted #aaa;
        list-style: none;
      }

      .white {
        color: white;
      }

      .darkgreen {
        color: limegreen;
      }

      .green {
        color: lightgreen;
      }

      .orange {
        color: gold;
      }

      @keyframes countdown {
        from {
          stroke-dashoffset: 0;
        }
        to {
          stroke-dashoffset: 106.8; /* new circumference of the circle */
        }
      }

      .countdown-container {
        display: inline-block;
        position: relative;
        width: 34px;
        height: 34px;
      }

      .countdown {
        position: absolute;
        top: 0;
        left: 0;
        width: 34px;
        height: 34px;
      }

      .countdown circle {
        fill: none;
        stroke: limegreen;
        stroke-width: 3;
        stroke-dasharray: 106.8; /* new circumference of the circle */
        stroke-dashoffset: 0;
        animation: countdown 1s linear forwards;
      }

      .countdown-container span {
        z-index: 2;
        color: limegreen;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    `];
}
customElements.define('kitchen-app', KitchenApp);