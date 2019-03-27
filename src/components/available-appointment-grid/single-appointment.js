import {LitElement, html, css} from 'lit-element';

class SingleAppointment extends LitElement {
    static get styles() {
        return [
            css`
                #header {
                    font-size: 14px;
                    text-align: center;
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
            <div id="header">${this.entry ? this.entry.venue : ''}</div>
        `;
    }
}
customElements.define('single-appointment', SingleAppointment);