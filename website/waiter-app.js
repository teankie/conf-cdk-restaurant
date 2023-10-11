import {LitElement, html, css} from 'lit';

class WaiterApp extends LitElement {
    static get properties() {
        return {
            tables: {type: Object},
            products: {type: Object},
            selectedTable: {type: String},
        };
    }

    constructor() {
        super();

        this.tables = {};
        this.products = {};
        this.selectedTable = null;
        this.selectedTableName = null;
    }

    connectedCallback() {
        super.connectedCallback()

        // replace this with api call
        this.tables = [];
        this.products = [];
    }

    selectTable(id) {
        this.selectedTable = id;
        this.selectedTableName = this.tables[this.selectedTable].name;
    }

    updateOrder(productId, isAdding = true) {
        const currentOrder = this.tables[this.selectedTable].currentOrder;
        let orderItem = currentOrder.items.find(item => item.id === productId);

        if (orderItem) {
            orderItem.quantity += isAdding ? 1 : -1;
            // Remove the item from the order if quantity is 0 or less
            if (orderItem.quantity <= 0) {
                currentOrder.items = currentOrder.items.filter(item => item.id !== productId);
            }
        } else if (isAdding) {
            // If the item is not found and isAdding is true, add a new item with quantity 1
            currentOrder.items.push({id: productId, quantity: 1});
        }

        // Re-render lit-html
        this.requestUpdate();
    }

    confirmOrder() {
        const currentOrder = {...this.tables[this.selectedTable].currentOrder};
        this.tables[this.selectedTable].currentOrder = {items: [], status: 'open'};
        this.tables[this.selectedTable].previousOrders.push({...currentOrder, status: 'pending'});

        // Re-render lit-html
        this.requestUpdate();
    }

    renderTables() {
        return html`
            <div class="tables">
                ${Object.values(this.tables || {}).map(table => html`
                    <button class="table-button" @click="${e => this.selectTable(table.id)}">
                        <span class="material-symbols-outlined">table_restaurant</span>
                        ${table.name}
                    </button>`)}
            </div>`;
    }

    renderProducts() {
        return html`
            <div class="products">
                ${Object.values(this.products || {}).map(product => html`
                    <button class="product-button" @click="${e => this.updateOrder(product.id)}">
                        ${product.name}
                        <span class="material-symbols-outlined">${product.icon}</span>
                    </button>`)}
            </div>`;
    }

    renderOrder() {
        return !this.tables[this.selectedTable]?.currentOrder?.items?.length
            ? html`<p>No products ordered for ${this.selectedTableName}</p>`
            : this.tables[this.selectedTable]?.currentOrder?.items?.map(orderItem => html`
                <p>
                    <span class="material-symbols-outlined delete" @click="${e => this.updateOrder(orderItem.id, false)}">delete</span>
                    ${this.products[orderItem.id]?.name || 'Unknown product'}
                    <span style="float:right">${orderItem.quantity} x</span>
                </p>`);
    }

    render() {
        return html`
            <h1 class="title">
                Waiter application <span class="material-symbols-outlined">liquor</span>
            </h1>
            <section id="table-selection">
                ${this.renderTables()}
            </section>
            <section id="product-selection">
                <h2>${this.selectedTable ? `Add product for table ${this.selectedTableName}` : 'Select a table'}</h2>
                ${this.selectedTable ? this.renderProducts() : ''}
            </section>
            <section id="table-order">
                <h2>
                    ${this.selectedTable ? `Orders for table ${this.selectedTableName}` : 'Select a table'}
                </h2>
                <div class="order">
                    ${this.selectedTable ? this.renderOrder() : ''}
                    ${!!this.tables[this.selectedTable]?.currentOrder?.items?.length
                        ? html`<button @click="${e => this.confirmOrder()}">Confirm order</button>`
                        : ''}
                </div>
            </section>`;
    }

    static styles = [css`
      :host {
        border: 1px solid black;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        background-color: #1c2e40;
        padding-bottom: 3px;
        font-family: Arial;
      }

      @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

      .material-symbols-outlined {
        font-family: 'Material Symbols Outlined';
        font-size: 25px;
        vertical-align: bottom;
        font-weight: normal;
      }

      .title {
        text-align: center;
        color: white;
        font-size: 20px;
        margin: 0;
      }
      
      h2 {
        color: white;
      }

      section {
        height: 31%;
        width: 96%;
        padding: 0 5px;
        background-color: #2c3e50;
        overflow-y: auto;
        overflow-x: hidden;
      }

      section p {
        font-size: 20px;
        color: white;
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

      div.tables, div.products {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
      }

      .table-button {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        margin: 8px;
        border: 2px solid #457;
        background-color: #34495e;
        color: white;
        border-radius: 50%;
        cursor: pointer;
        text-transform: uppercase;
        width: 20%;
        aspect-ratio: 1 / 1;
      }

      .table-button:hover {
        background-color: #457;
        border: 2px solid #333;
      }

      .product-button {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        padding: 4px;
        margin-bottom: 15px;
        background-color: #34495e;
        color: white;
        border: 2px solid #457;
        border-radius: 5px;
        cursor: pointer;
        text-transform: uppercase;
        width: 90%;
        font-size: 20px;
      }

      .product-button:hover {
        background-color: #457;
        border: 2px solid #333;
      }

      .material-symbols-outlined.delete:hover {
        cursor: pointer;
        color: red;
      }
    `];
}

customElements.define('waiter-app', WaiterApp);
