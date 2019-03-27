import {LitElement, html, css} from 'lit-element';
import '@material/mwc-button';

class AgaveStepper extends LitElement {
    static get styles() {
        return [
            css`
                :host > ::slotted(:not(slot):not([selected])) {
                    display: none !important;
                }

                nav {
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    margin-bottom: 16px;
                }
                
                nav > * {
                    flex: 1;
                }

                mwc-button {
                    border-bottom: 4px solid transparent;
                    --mdc-theme-primary: var(--app-primary-color);
                }

                mwc-button[selected] {
                    border-color: var(--app-primary-color);
                }
            `
        ]
    }

    static get properties() {
        return {
            selected: {
                type: Number
            }
        }
    }

    render() {
        return html`
            <nav>
                <mwc-button @click="${_ => this.selectIndex(0)}" ?selected="${this.selected === 0}">Paso 1</mwc-button>
                <mwc-button @click="${_ => this.selectIndex(1)}" ?selected="${this.selected === 1}">Paso 2</mwc-button>
                <mwc-button @click="${_ => this.selectIndex(2)}" ?selected="${this.selected === 2}">Paso 3</mwc-button>
                <mwc-button @click="${_ => this.selectIndex(3)}" ?selected="${this.selected === 3}">Paso 4</mwc-button>
            </nav>
            
            <slot></slot>
        `;
    }

    constructor() {
        super();
        this.selected = 0
        this._setUpStepper();
    }

    updated(changedProps) {
        const selectedUpdated = changedProps.has('selected');

        if (selectedUpdated && this.selected !== null && this.selected !== undefined) {
            this.dispatchEvent(new CustomEvent('selected-changed', {detail: this.selected}))
        }
    }

    async _setUpStepper() {
        await this.updateComplete

        if (this.selected < 0 || this.selected > this.children.length - 1) return this.selectIndex(0);
        this.selectIndex(this.selected)
    }

    _clearSelected() {
        this.children.forEach((slot, idx) => {
            slot.removeAttribute('selected')
        })
    }

    selectIndex(idx) {
        if (!this.children || !this.children[idx]) return
        this.children[this.selected].removeAttribute('selected');
        this.children[idx].setAttribute('selected', "");
        this.selected = idx
    }
    
    deselectIndex(idx) {
        if (!this.children || !this.children[idx]) return
        this.children[idx].removeAttribute('selected')
        this.selected = idx
    }

    selectNext() {
        if (this.selected + 1 > this.children.length - 1) return this.selectIndex(this.children.length - 1)
        this.deselectIndex(this.selected)
        this.selectIndex(this.selected + 1)
    }

    selectPrevious() {
        if (this.selected - 1 < 0) return this.selectIndex(0)
        this.deselectIndex(this.selected)
        this.selectIndex(this.selected - 1)
    }
}
customElements.define('agave-stepper', AgaveStepper);