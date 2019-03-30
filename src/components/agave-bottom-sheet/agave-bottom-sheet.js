import {LitElement, html, css} from 'lit-element';

class AgaveBottomSheet extends LitElement {
    static get styles() {
        return [
            css`
                :host {
                    z-index: 1;
                    position: fixed;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    pointer-events: none;

                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    
                    background-color: rgba(0,0,0,0);
                    will-change: background-color;
                    transition: background-color 0.3s cubic-bezier(0,0,0.3,1);
                }

                .container {
                    box-sizing: border-box;
                    padding: var(--bottom-sheet-padding, 16px);
                    z-index: 2;
                    background-color: var(--theme-background-color, #fafafa);
                    color: var(--app-dark-text-color);
                    box-shadow: var(--app-dialog-shadow);
                    align-self: center;
                    width: 100%;
                    max-width: 600px;
                    min-height: 40%;
                    max-height: calc(100% - 48px);

                    scrolling-behavior: auto;
                    overflow-y: auto;

                    -webkit-transform: translateY(100%);
                    transform: translateY(100%);
                    transition: transform 300ms cubic-bezier(.62,.28,.23,.99);
                    will-change: transform;
                }

                :host([open]) {
                    background-color: rgba(0,0,0,0.55);
                    pointer-events: auto;
                }

                :host([open]) .container {
                    -webkit-transform: none;
                    transform: none;
                    transition: transform 300ms cubic-bezier(.62,.28,.23,.99);
                }

                @media(max-width: 600px) {
                    .container {
                        width: auto;
                        align-self: stretch;
                    }
                }
            `
        ]
    }

    static get properties() {
        return {
            open: {
                type: Boolean,
                reflect: true
            }
        }
    }

    render() {
        return html`
            <div class="container">
                <slot></slot>
            </div>

        `;
    }

    constructor() {
        super();
        this.addEventListener('click', this._onClick)
    }

    updated(changedProps) {
        const openChanged = changedProps.has('open')

        if (openChanged) {
            console.log('open changed:', this.open)
            this.dispatchEvent(new CustomEvent('open-changed', {detail: this.open}))
        }
    }

    _onClick(e) {
        if (e.target != this) return;
        this.open = false;
    }

}

customElements.define('agave-bottom-sheet', AgaveBottomSheet);