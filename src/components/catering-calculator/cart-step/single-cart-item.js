import {LitElement, html, css} from 'lit-element';

class SingleCartItem extends LitElement {
    static get styles() {
        return [
            css`
                :host {
                    padding: 16px 0;
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                :host::after {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    left: 64px;
                    right: -16px;
                    border-bottom: 1px solid var(--app-border-color);
                }

                #imageContainer {
                    display: flex;
                    height: 48px;
                    width: 48px;
                    border-radius: 4px;
                    overflow: hidden;
                    margin-right: 16px;
                }

                #imageContainer img {
                    height: 100%;
                    width: 100%;
                    object-fit: cover;
                }

                #name {
                    font-size: 16px;
                }

                #price {
                    font-size: 14px;
                    color: var(--app-subtitle-text-color);
                }
            `
        ]
    }

    static get properties() {
        return {
            item: {
                type: Object
            }
        }
    }

    render() {
        return html`
            <div id="imageContainer">
                <img src="${this._computeImage(this.item)}" alt="menu item picture">
            </div>

            <div>
                <div id="name">${this.item ? this.item.name : ""}</div>
                <div id="price">$${this.item ? this.item.price : ""}</div>
            </div>
        `;
    }

    _computeImage(item) {
        return item && item.image ? item.image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    }
}
customElements.define('single-cart-item', SingleCartItem);