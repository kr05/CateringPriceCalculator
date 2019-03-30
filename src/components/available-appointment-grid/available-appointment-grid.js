import {LitElement, html, css} from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import './single-appointment';

class AvailableAppointmentGrid extends LitElement {
    static get styles() {
        return [
            css`
                :host {
                    display: flex;
                    border: 1px solid var(--app-border-color);
                    border-radius: 4px;
                }

                .single-column {
                    flex: 1;

                    display: flex;
                    flex-direction: column;
                    border-right: 1px solid var(--app-border-color);
                }

                .single-column:last-of-type {
                    border-right: none;
                }

                .date {
                    text-align: center;
                    font-size: 14px;
                    font-weight: 500;
                }

                single-appointment, .date {
                    padding: 8px;
                }

                single-appointment {
                    border-top: 1px solid var(--app-border-color);
                    cursor: pointer;
                }

                single-appointment:hover {
                    background-color: var(--app-light-transparent-primary-color);
                }

                single-appointment[selected] {
                    background-color: var(--app-transparent-primary-color);
                }
            `
        ]
    }

    static get properties() {
        return {
            firstDaySlots: {
                type: Array
            },
            secondDaySlots: {
                type: Array
            },
            thirdDaySlots: {
                type: Array
            },
            selectedSlot: {
                type: Object
            },
        }
    }

    render() {
        return html`
            <div class="single-column">
                <div class="date">26/3/19</div>
                ${repeat(this.firstDaySlots, (singleSlot => html`
                    <single-appointment 
                        ?selected="${this._computeSelected(singleSlot, this.selectedSlot)}"
                        @click="${_ => this._selectAppointmentSlot(singleSlot)}" .entry="${singleSlot}">
                    </single-appointment>
                `))}
            </div>
            <div class="single-column">
                <div class="date">27/3/19</div>
                ${repeat(this.secondDaySlots, (singleSlot => html`
                    <single-appointment 
                        ?selected="${this._computeSelected(singleSlot, this.selectedSlot)}"
                        @click="${_ => this._selectAppointmentSlot(singleSlot)}" .entry="${singleSlot}">
                    </single-appointment>
                `))}
            </div>
            <div class="single-column">
                <div class="date">28/3/19</div>
                ${repeat(this.thirdDaySlots, (singleSlot => html`
                    <single-appointment
                        ?selected="${this._computeSelected(singleSlot, this.selectedSlot)}"
                        @click="${_ => this._selectAppointmentSlot(singleSlot)}" .entry="${singleSlot}">
                    </single-appointment>
                `))}
            </div>
        `;
    }

    /**
      * Instance of the element is created/upgraded. Useful for initializing
      * state, set up event listeners, create shadow dom.
      * @constructor
      */
    constructor() {
        super();
    
        this.firstDaySlots = [
            {
                venue: "Centro",
                date: "26/3/19",
                id: 1
            },
            {
                venue: "Zona Sur",
                date: "26/3/19",
                id: 2
            },
            {
                venue: "Centro",
                date: "26/3/19",
                id: 3
            }
        ]
    
        this.secondDaySlots = [
            {
                venue: "Zona Sur",
                date: "27/3/19",
                id: 4
            },
            {
                venue: "Centro",
                date: "27/3/19",
                id: 5
            },
            {
                venue: "Zona Sur",
                date: "27/3/19",
                id: 6
            }
        ]
    
        this.thirdDaySlots = [
            {
                venue: "Centro",
                date: "28/3/19",
                id: 7
            },
            {
                venue: "Zona Sur",
                date: "28/3/19",
                id: 8
            },
            {
                venue: "Centro",
                date: "28/3/19",
                id: 9
            }
        ]
    }

    _selectAppointmentSlot(slot) {
        this.selectedSlot = slot
        this.dispatchEvent(new CustomEvent('appointment-selected', {detail: slot}))
    }

    _computeSelected(slot, selectedSlot) {
        return selectedSlot ? (slot.id === selectedSlot.id) : false
    }


}
customElements.define('available-appointment-grid', AvailableAppointmentGrid);
