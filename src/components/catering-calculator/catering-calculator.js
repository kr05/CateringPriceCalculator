import {LitElement, html, css} from 'lit-element';

class CateringCalculator extends LitElement {
    static get styles() {
        return [
            css`
            `
        ]
    }

    static get properties() {
        return {
        }
    }

    render() {
        return html`
            <div>hello</div>
        `;
    }
}
customElements.define('catering-calculator', CateringCalculator);