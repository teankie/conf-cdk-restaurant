// Import the LitElement base class and html helper function
import { LitElement, html, css } from 'lit';
import './kitchen-app';
import './waiter-app';
import './login-app';

// Extend the LitElement base class
class RestaurantWrapper extends LitElement {
    render() {
        return html`
            <div class="phone">
                <div class="screen">
                    <login-app></login-app>
                </div>
            </div>
            <div class="phone">
                <div class="screen">
                    <waiter-app></waiter-app>
                </div>
            </div>
            <div class="phone">
                <div class="screen">
                    <kitchen-app></kitchen-app>
                </div>
            </div>
        `;
    }

    static styles = css`
      :host {
        height: 99vh;
        width: 99vw;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }

      counter-app, kitchen-app, waiter-app {
        height: 100%;
      }.phone {
         width: 29vw;
         height: 90vh;
         border-radius: 36px;
         padding: 30px 20px 20px 20px;
         box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
         margin: 20px auto;
         background: black;
         display: flex;
         flex-direction: column;
         align-items: center;
         justify-content: center;
         position: relative;
       }

      .screen {
        width: 100%;
        height: 100%;
        background: #fff;
        border-radius: 10px;
        overflow: hidden;
      }
    `;
}
customElements.define('restaurant-wrapper', RestaurantWrapper);