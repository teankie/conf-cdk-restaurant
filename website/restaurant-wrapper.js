// Import the LitElement base class and html helper function
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

// Extend the LitElement base class
class RestaurantWrapper extends LitElement {

    static styles = css`
    :host {
      display: block;
      padding: 16px;
    }
  `;

    // Define a property
    static properties = {
        message: { type: String }
    };

    constructor() {
        super();
        // Initialize the message property
        this.message = 'Hello from restaurant-wrapper!';
    }

    // Render the element's DOM
    render() {
        return html`
      <p>${this.message}</p>
    `;
    }
}

// Register the element with the browser
customElements.define('restaurant-wrapper', RestaurantWrapper);