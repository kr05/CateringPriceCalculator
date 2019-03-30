import {LitElement, html, css} from 'lit-element';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js';
import '../quantity-selector/quantity-selector';
import '../venue-selector/venue-selector';
import '../agave-stepper/agave-stepper';
import './cart-step/cart-step';
import './summary-step/summary-step';
import '@material/mwc-button';

class CateringCalculator extends LitElement {
    static get styles() {
        return [
            css`
                :host {
                    display: block;
                    padding: 16px;
                    border: 1px solid var(--app-border-color);
                    border-radius: 4px;
                    background-color: #FFF;
                    color: var(--app-dark-text-color);
                }

                quantity-selector {
                    --theme-padding: 32px 0;
                    --theme-fill-color: var(--app-primary-color);
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

                .buttons {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    margin-top: 48px;
                }

                .buttons mwc-button {
                    --mdc-theme-primary: var(--app-primary-color);
                }

                .buttons mwc-button.primary-btn {
                    margin-left: 8px;
                }

                .image-container {
                    width: 200px;
                    padding: 0 16px;
                    height: auto;
                    margin: 0 auto 16px;
                    display: flex;
                    border-radius: 4px;
                }

                .image-container img {
                    width: 100%;
                    height: 100%;
                }

                .description-container {
                    font-size: 14px;
                    margin-bottom: 16px;
                }

                .description {
                    padding: 16px 0;
                    text-align: center;
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
            selectedMenu: {
                type: Object
            },
            selectedVenue: {
                type: Object
            },
            selectedDate: {
                type: String
            },
            quantity: {
                type: Number
            },
            cart: {
                type: Object
            },
            courseOutline: {
                type: Object
            },
        }
    }

    render() {
        return html`
            <div class="description-container">
                <div class="image-container">
                    <img src="https://firebasestorage.googleapis.com/v0/b/catering-calculator.appspot.com/o/logo_trattoria_dark.png?alt=media&token=6eba17ea-4212-452c-9286-e2d0071c1314" alt="logo">
                </div>                
                <div class="description">Bienvenidos a Trattoria! Para poder brindarle un mejor servicio, tenemos disponible una calculadora que podra usar para construir su menu y ver una cotizacion.</div>
            </div>
            <agave-stepper @selected-changed="${this._selectedChangedEvent}">
                <div>
                    <div class="date-container">
                        <h2>Fecha</h2>
                        <vaadin-date-picker @change="${this._dateSelected}"></vaadin-date-picker>
                    </div>
        
                    <quantity-selector @change="${this._quantitySelected}" label="# de invitados"></quantity-selector>
        
                    <div class="venue-selector-container">
                        <h2>Local</h2>
                        <venue-selector @selected-change="${this._venueSelected}"></venue-selector>
                    </div>

                    <div class="buttons">
                        <mwc-button @click="${_ => this._reset('info')}">Reset</mwc-button>
                        <mwc-button @click="${this._continueClick}" raised class="primary-btn">Continuar</mwc-button>
                    </div>
                </div>   
                <div>
                    <cart-step @course-outline-changed="${this._courseOutlineChangedEvent}" @selected-menu-changed="${this._selectedMenuChangedEvent}" @cart-changed="${this._cartChangedEvent}"></cart-step>
                    <div class="buttons">
                        <mwc-button @click="${_ => this._reset('menu')}">Reset</mwc-button>
                        <mwc-button @click="${this._continueClick}" raised class="primary-btn">Continuar</mwc-button>
                    </div>
                </div>
                <div>
                    <summary-step .courseOutline="${this.courseOutline}" .menu="${this.selectedMenu}" .date="${this.selectedDate}" .quantity="${this.quantity}" .venue="${this.selectedVenue}" .cart="${this.cart}"></summary-step>
                    <div class="buttons">
                        <mwc-button @click="${this._onFinishClick}" raised class="primary-btn">Enviar detalles</mwc-button>
                    </div>
                </div>
            </agave-stepper>
        `;
    }

    _cartChangedEvent(e) {
        console.log('on cart changed event:', e.detail)
        this.cart = e.detail

        this.shadowRoot.querySelector('summary-step').requestUpdate('cart')
    }

    _selectedMenuChangedEvent(e) {
        console.log('on selected menu changed event:', e.detail)
        this.selectedMenu = e.detail
    }

    _courseOutlineChangedEvent(e) {
        console.log('on selected course outline changed event:', e.detail)
        this.courseOutline = e.detail
    }

    _selectedChangedEvent(e) {
        if (this.selected !== e.detail) this.selected = e.detail
    }

    _dateSelected(e) {
        console.log('date selected:', e.target.value)
        this.selectedDate = e.target.value
    }

    _quantitySelected(e) {
        console.log('quantity selected:', e.detail)
        this.quantity = e.detail
    }

    _venueSelected(e) {
        console.log('venue selected:', e.detail)
        this.selectedVenue = e.detail.entry
        this.selectedVenueIndex = e.detail.selected
    }

    _continueClick(e) {
        this.shadowRoot.querySelector('agave-stepper').selectNext()
    }

    _reset(step) {
        switch (step) {
            case 'info':
                this.shadowRoot.querySelector('vaadin-date-picker').value = null
                this.shadowRoot.querySelector('quantity-selector').quantity = 0
                this.shadowRoot.querySelector('venue-selector').selected = 0
                break;
            case 'menu':
                this.shadowRoot.querySelector('cart-step').reset()    
                break;
        }
    }

    _onFinishClick(e) {
        this.dispatchEvent(new CustomEvent('finish'))
    }
}
customElements.define('catering-calculator', CateringCalculator);