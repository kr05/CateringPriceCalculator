import {LitElement, html, css} from 'lit-element';
import '../agave-icon/agave-icon';
import '../agave-textfield/agave-textfield';

const arrowDropDownIcon = html`<svg height="24" viewBox="0 0 24 24" width="24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/><path fill="none" d="M0 0h24v24H0V0z"/></svg>`;
const arrowDropUpIcon = html`<svg height="24" viewBox="0 0 24 24" width="24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`;

class QuantitySelector extends LitElement {
    static get styles() {
        return [
            css`
                :host {
                    padding: var(--theme-padding, 16px);
                }

                .selector-container {
                    margin-left: auto;
                }

                :host, .selector-container {
                    display: flex;
                    align-items: center;
                }

                h2 {
                    font-size: 12px;
                    font-weight: 500;
                    margin: 0;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                }

                agave-textfield {
                    margin: 0 16px;
                    width: 72px;
                    --theme-text-align: center;
                }

                agave-icon {
                    cursor: pointer;
                    --icon-fill-color: var(--theme-fill-color, var(--app-primary-color));
                }
            `
        ]
    }

    static get properties() {
        return {
            quantity: {
                type: Number
            },
            noLabel: {
                type: Boolean
            },
            label: {
                type: String
            }
        }
    }

    render() {
        return html`
            <h2 ?hidden="${this.noLabel}">${this.label ? this.label : "CANTIDAD"}</h2>
            <div class="selector-container">
                <agave-icon @click="${_ => this._subtractQty(this.quantity)}">${arrowDropDownIcon}</agave-icon>
                <agave-textfield @input-change="${this._onInputChange}" noLabel type="number" value="${this.quantity}"></agave-textfield>
                <agave-icon @click="${_ => this._addQty(this.quantity)}">${arrowDropUpIcon}</agave-icon>
            </div>
        `;
    }

    constructor() {
        super();    
        this.quantity = 1;
    }

    updated(changedProps) {
        const quantityChanged = changedProps.has('quantity')

        if (quantityChanged) {
            this.dispatchEvent(new CustomEvent('change', { detail: this.quantity }));
        }
    }

    _addQty(qty) {
        this.quantity = qty + 1;
    }

    _subtractQty(qty) {
        if (qty <= 1) return;
        this.quantity = qty - 1;
    }

    _onInputChange(e) {
        this.quantity = !isNaN(e.detail) ? parseInt(e.detail) : 0
    }
}

customElements.define('quantity-selector', QuantitySelector);