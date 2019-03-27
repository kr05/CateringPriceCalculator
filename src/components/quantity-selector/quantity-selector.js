import {LitElement, html, css} from 'lit-element';
import '../agave-icon/agave-icon';

const arrowDropDownIcon = html`<svg height="24" viewBox="0 0 24 24" width="24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M8.71 11.71l2.59 2.59c.39.39 1.02.39 1.41 0l2.59-2.59c.63-.63.18-1.71-.71-1.71H9.41c-.89 0-1.33 1.08-.7 1.71z"/></svg>`;
const arrowDropUpIcon = html`<svg height="24" viewBox="0 0 24 24" width="24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M8.71 12.29L11.3 9.7c.39-.39 1.02-.39 1.41 0l2.59 2.59c.63.63.18 1.71-.71 1.71H9.41c-.89 0-1.33-1.08-.7-1.71z"/></svg>`;

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

                span {
                    margin: 0 16px;
                }

                agave-icon {
                    cursor: pointer;
                    --icon-fill-color: var(--app-primary-color);
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
                <span>${this.quantity}</span>
                <agave-icon @click="${_ => this._addQty(this.quantity)}">${arrowDropUpIcon}</agave-icon>
            </div>
        `;
    }

    constructor() {
        super();    
        this.quantity = 1;
    }

    _addQty(qty) {
        this.quantity = qty + 1;
        this.dispatchEvent(new CustomEvent('on-change', { detail: this.quantity }));

    }

    _subtractQty(qty) {
        if (qty <= 1) return;
        this.quantity = qty - 1;
        this.dispatchEvent(new CustomEvent('on-change', { detail: this.quantity }));

    }
}

customElements.define('quantity-selector', QuantitySelector);