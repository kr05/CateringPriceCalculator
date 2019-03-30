import {LitElement, html, css} from 'lit-element';

class AgaveIcon extends LitElement {
    static get styles() {
        return [
            css`
                span {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    fill: var(--icon-fill-color, #fafafa);
                }

                ::slotted(svg) {
                    width: var(--icon-size, 24px);
                    height: var(--icon-size, 24px);
                }

                img {
                    height: var(--icon-size, 24px);
                    width: auto;
                }
            `
        ]
    }

    static get properties() {
        return {
            src: {
                type: String
            }
        }
    }

    render() {
        return html`
            <span>${this._renderSlot(this.src)}</span>
        `;
    }

    _renderSlot(src) {
        return !src ? html `<slot></slot>` : html`<img src="${src}">`
    }
}
customElements.define('agave-icon', AgaveIcon);