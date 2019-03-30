import {LitElement, html, css} from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import './single-course-summary';

class SummaryStep extends LitElement {
    static get styles() {
        return [
            css`
                :host {
                    display: block;
                }

                .title-container {
                    margin: 32px 0;
                }

                .header {
                    margin: 0;
                    font-size: 18px;
                }

                .subtitle {
                    font-size: 12px;
                    font-weight: 500;
                    margin: 0;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                }

                .header, .subtitle {
                    text-align: center;
                }

                single-course-summary {
                    position: relative;
                    padding: 16px 0;
                }

                .cost-container {
                    font-size: 14px;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                }

                .cost-container > * {
                    padding-top: 4px;
                }

                .total {
                    font-weight: 700;
                }
            `
        ]
    }

    static get properties() {
        return {
            date: {
                type: String
            },
            quantity: {
                type: Number
            },
            venue: {
                type: Object
            },
            cart: {
                type: Object
            },
            courseOutline: {
                type: Object
            },
            menu: {
                type: Object
            },
            subtotal: {
                type: Number
            },
            tax: {
                type: Number
            },
            total: {
                type: Number
            }
        }
    }

    render() {
        return html`
            <div class="title-container">
                <h3 class="header">La Trattoria: ${this.venue ? this.venue.name : ""}</h3>
                <div class="subtitle">${this.menu ? this.menu.displayName: ""}</div>
                <div class="subtitle">${this.date ? this.date: ""}</div>
            </div>

            ${repeat(this._computeCartArr(this.cart), (item) => html`
                <single-course-summary .item="${item}"></single-course-summary>
            ` )}

            <div class="cost-container">
                <div class="customers">${this.courseOutline ? `$${this.courseOutline.price}` : ""} x ${this.quantity} invitados</div>
                <div class="subtotal">subtotal: $${this.subtotal}</div>
                <div class="tax">tax: $${this.tax}</div>
                <div class="total">total: $${this.total}</div>
            </div>
        `;
    }

    updated(changedProps) {
        const quantityChanged = changedProps.has('quantity')
        const courseOutlineChanged = changedProps.has('courseOutline')
        const subtotalChanged = changedProps.has('subtotal')
        const taxChanged = changedProps.has('tax')

        console.log('summary step updated:', changedProps)

        if (quantityChanged || courseOutlineChanged) {
            this._computeSubtotal(this.quantity, this.courseOutline)
        }

        if (subtotalChanged) {
            this._computeTax(this.subtotal)
        }

        if (taxChanged || subtotalChanged) {
            this._computeTotal(this.tax, this.subtotal)
        }
    }

    _computeTotal(subtotal, tax) {
        if (!subtotal || !tax) return 0
        let parsedSubtotal = parseFloat(subtotal)
        let parsedTax = parseFloat(tax)

        let total =  parsedTax + parsedSubtotal
        console.log('total:', total)

        this.total = total.toFixed(2)
    }
 
    _computeSubtotal(qty, courseOutline) {
        console.log('computing subtotal:', qty, courseOutline)
        if (!qty || !courseOutline) return 0

        const parsedQty = parseInt(qty)
        const price = parseFloat(courseOutline.price)

        const subtotal = parsedQty * price

        console.log('computed cart total:', subtotal)

        this.subtotal = subtotal;
    }

    _computeTax(subtotal) {
        console.log('computing tax:', subtotal)
        this.tax = (parseFloat(subtotal) * 0.08).toFixed(2);
    }

    _computeCartArr(cart) {
        console.log('computing cart:', cart)
        if (!cart) return []

        return Object.keys(cart).map(key => {
            var curItem = cart[key]
            curItem['course'] = key
            return curItem
        })
    }
}
customElements.define('summary-step', SummaryStep);