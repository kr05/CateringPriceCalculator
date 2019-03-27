import {LitElement, html, css} from 'lit-element';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js';
import '../quantity-selector/quantity-selector';
import '../venue-selector/venue-selector';
import '../agave-stepper/agave-stepper';
import '../available-appointment-grid/available-appointment-grid';
import '../select-venue-step/select-venue-step';
import '../cart-step/cart-step';

class CateringCalculator extends LitElement {
    static get styles() {
        return [
            css`
                :host {
                    display: block;
                    padding: 16px;
                    box-shadow: var(--app-card-shadow);
                    background-color: #FFF;
                    color: var(--app-dark-text-color);
                }

                quantity-selector {
                    --theme-padding: 32px 0;
                }

                .date-container, .venue-selector-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                h2 {
                    font-size: 12px;
                    font-weight: 500;
                    margin: 0;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                }

                .intro {
                    font-size: 12px;
                    font-weight: 500;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    margin-bottom: 16px;
                    margin-left: 16px;
                }
            `
        ]
    }

    static get properties() {
        return {
            venues: {
                type: Array
            },
            selected: {
                type: Number
            },
            selectedVenue: {
                type: String
            },
            selectedMenuType: {
                type: String
            }
        }
    }

    render() {
        return html`

            <agave-stepper @selected-changed="${this._selectedChangedEvent}">
                <div>
                    <div class="date-container">
                        <h2>Fecha</h2>
                        <vaadin-date-picker></vaadin-date-picker>
                    </div>
        
                    <quantity-selector label="# de invitados"></quantity-selector>
        
                    <div class="venue-selector-container">
                        <h2>Local</h2>
                        <venue-selector .entries="${this.venues}"></venue-selector>
                    </div>
                </div>   
                <div>
                    <div class="intro">Selecciona el local y fecha disponible:</div>

                    <available-appointment-grid @appointment-selected="${this._appointmentSlotSelected}"></available-appointment-grid>
                </div>
                <select-venue-step @menu-selected="${this._menuSelectedEvent}"></select-venue-step>
                <cart-step .appointmentSlot="${this.selectedAppointment}" .menuType="${this.selectedMenuType}"></cart-step>
            </agave-stepper>
        `;
    }

    /**
      * Instance of the element is created/upgraded. Useful for initializing
      * state, set up event listeners, create shadow dom.
      * @constructor
      */
    constructor() {
        super();
    
        this.venues = [
            {
                name: "McDonalds"
            },
            {
                name: "Carl's Jr."
            }
        ]
    }

    _selectedChangedEvent(e) {
        if (this.selected !== e.detail) this.selected = e.detail
    }

    addItem(item) {
        this.shadowRoot.querySelector('cart-step').addItem(item)
    }

    _menuSelectedEvent(e) {
        console.log('menu selected event:', e.detail)
        this.selectedMenuType = e.detail

        this.shadowRoot.querySelector('agave-stepper').selectNext()
    }

    _appointmentSlotSelected(e) {
        console.log('appointment slot selected event:', e.detail)
        this.selectedAppointment = e.detail

        this.shadowRoot.querySelector('agave-stepper').selectNext()
    }
}
customElements.define('catering-calculator', CateringCalculator);