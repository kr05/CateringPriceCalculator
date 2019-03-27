import {LitElement, html, css} from 'lit-element';
import '@material/mwc-button';
import { repeat } from 'lit-html/directives/repeat';
import './single-cart-item.js';

class CartStep extends LitElement {
    static get styles() {
        return [
            css`
                :host {
                    display: flex;
                    flex-direction: column;
                }
                
                .empty {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 16px;
                }

                mwc-button {
                    --mdc-theme-primary: var(--app-primary-color);
                }

                mwc-button#primaryAddBtn {
                    margin-top: 16px;
                }

                .intro-container {
                    margin: 16px 0 32px 16px;
                }

                .order-summary-container {
                    text-align: end;
                    margin-top: 16px;
                    font-size: 14px;
                }

                .intro {
                    font-size: 16px;
                    font-weight: 700;
                    margin: 0;
                }

                .menu-type {
                    font-size: 12px;
                    font-weight: 500;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    margin: 0;
                    color: var(--app-subtitle-text-color);
                }

                [hidden] {
                    display: none;
                }
            `
        ]
    }

    static get properties() {
        return {
            cart: {
                type: Array
            },
            subtotal: {
                type: Number
            },
            tax: {
                type: Number
            },
            venue: {
                type: String
            },
            menuType: {
                type: String
            },
            appointmentSlot: {
                type: String
            }
        }
    }

    render() {
        return html`
            <div class="intro-container">
                <h2 class="intro">La Trattoria: ${this.appointmentSlot ? this.appointmentSlot.venue : ""}</h2>
                <h2 class="menu-type">menu ${this.menuType}</h2>
                <h2 class="menu-type">${this.appointmentSlot ? this.appointmentSlot.date : ""}</h2>
            </div>
            ${repeat(this._computeCart(this.cart), (singleItem) => html`
                <single-cart-item .item="${singleItem}"></single-cart-item>
            `)}

            <div ?hidden="${this.cart && this.cart.length}" class="empty">
                <div>Agregue un tiempo para empezar</div>
                <mwc-button id="primaryAddBtn" @click="${this._onAddMenuItemClick}" raised>Agregar 1er tiempo</mwc-button>
            </div>

            <div class="order-summary-container">
                <div id="subtotal">Subtotal: $${this.subtotal}</div>
                <div id="tax">Tax: $${this.tax}</div>
                <div id="total">Total: $${this.total}</div>
            </div>
        `;
    }

    constructor() {
        super();
        this.cart = []
        this.counter = 0
        this.tax = 0
        this.subtotal = 0
    }

    updated(changedProps) {
        const cartChanged = changedProps.has('cart')
        const subtotalChanged = changedProps.has('subtotal')
        const taxChanged = changedProps.has('tax')

        if (cartChanged) {
            this._computeSubtotal(this.cart)
        }

        if (subtotalChanged && this.subtotal) {
            this._computeTax(this.subtotal)
        }

        if (subtotalChanged || taxChanged) {
            this._computeTotal(this.subtotal, this.tax)
        }
    }

    _computeTotal(subtotal, tax) {
        let parsedSubtotal = parseFloat(subtotal)
        let parsedTax = parseFloat(tax)

        let total =  parsedTax + subtotal
        console.log('total:', total)

        this.total = total
    }
 
    _computeSubtotal(cart) {
        if (!cart || !cart.length) return 0

        var subtotal = 0
        cart.forEach(cartItem => {
            subtotal += parseInt(cartItem.price)
        });

        console.log('computed cart total:', subtotal)

        this.subtotal = subtotal;
    }

    _computeTax(subtotal) {
        console.log('computing tax:', subtotal)
        this.tax = (parseFloat(subtotal) * 0.0875).toFixed(2);
    }

    _computeCart(cart) {
        console.log('computing cart:', cart)
        return cart && cart.length ? cart : []
    }

    _onAddMenuItemClick(e) {
        this.dispatchEvent(new CustomEvent('add-menu-item', {bubbles: true, composed: true}))
    }

    addItem(item) {
        const prevArray = [...this.cart]

        this.cart.push(item);
        this.requestUpdate('cart', prevArray);
    }
}
customElements.define('cart-step', CartStep);