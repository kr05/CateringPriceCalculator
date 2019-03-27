import {LitElement, html, css} from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';

class VenueSelector extends LitElement {
    static get styles() {
        return [
            css`
                :host {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .single-option {
                    height: 56px;
                    width: 112px;
                    border-radius: 4px;

                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }

                .single-option:hover {
                    background-color: var(--app-light-transparent-primary-color);
                }

                .single-option[selected] {
                    background-color: var(--app-transparent-primary-color);
                    color: var(--app-primary-color);
                }

                .option-name {
                    font-size: 14px;
                    text-transform: capitalize;
                }

                .option-subtitle {
                    font-size: 12px;
                    color: var(--app-subtitle-color);
                }
            `
        ]
    }

    static get properties() {
        return {
            entries: {
                type: Array
            },
            selected: {
                type: Number
            }
        }
    }

    render() {
        return html`
            ${repeat(this.entries, (singleVariant, index) => html`
                <div 
                    @click="${_ => this._select(index, singleVariant)}" 
                    ?selected="${index === this.selected}" 
                    class="single-option">
                        <span class="option-name">${singleVariant.name}</span> 
                        <span class="option-subtitle">${singleVariant.subtitle}</span> 
                </div>
            `)}
        `;
    }

    constructor() {
        super()
        this.entries = []
        this.selected = 0
    }

    _select(idx, entry) {
        this.selected = idx
        this.dispatchEvent(new CustomEvent('selected-change', {detail: {selected: idx, entry: entry}, bubbles: true, composed: true}))
    }
}

customElements.define('venue-selector', VenueSelector);