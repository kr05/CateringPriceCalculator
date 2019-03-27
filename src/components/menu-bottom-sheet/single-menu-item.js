import {LitElement, html, css} from 'lit-element';

class SingleMenuItem extends LitElement {
    static get styles() {
        return [
            css`
                :host {
                    width: 100px;
                    height: 100px;

                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;

                    text-align: center;

                    padding: 16px;
                    box-sizing: border-box;
                }

                #name {
                    font-size: 14px;
                }

                #price {
                    font-size: 12px;
                    color: var(--app-subtitle-text-color);
                }
            `
        ]
    }

    static get properties() {
        return {
            entry: {
                type: Object
            }
        }
    }

    render() {
        return html`
            <div id="name">${this.entry ? this.entry.name : ""}</div>
            <div id="price">$${this.entry ? this.entry.price : ""}</div>
        `;
    }
}
customElements.define('single-menu-item', SingleMenuItem);