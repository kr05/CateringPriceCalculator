import {LitElement, html, css} from 'lit-element';
import '@material/mwc-button';

class SelectVenueStep extends LitElement {
    static get styles() {
        return [
            css`
                :host {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

                mwc-button {
                    --mdc-theme-primary: var(--app-primary-color);
                    margin-top: 16px;
                }

                h2 {
                    font-size: 12px;
                    font-weight: 500;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    margin: 0 0 16px 16px;
                    align-self: flex-start;
                }
            `
        ]
    }

    static get properties() {
        return {
        }
    }

    render() {
        return html`
            <h2>Selecciona una opcion:</h2>

            
            <mwc-button @click="${_ => this._click('italiano')}" raised>Italiano</mwc-button>
            <mwc-button @click="${_ => this._click('mexicano')}" id="centroBtn" raised>Mexicano</mwc-button>
        `;
    }

    _click(venue) {
        this.dispatchEvent(new CustomEvent('menu-selected', {detail: venue}))
    }
}
customElements.define('select-venue-step', SelectVenueStep);