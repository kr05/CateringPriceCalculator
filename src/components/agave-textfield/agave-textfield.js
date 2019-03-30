import { LitElement, html, css } from 'lit-element';

class AgaveTextfield extends LitElement {
    static get styles() {
        return [
            css `
                :host {
                    font-family: 'Open Sans', sans-serif;
                    display: block;
                }

                .input-container {
                    position: relative;
                    display: flex;
                    height: var(--input-height, 56px);
                    background-color: var(--theme-background-color, #f5f5f5);
                    border-radius: 4px 4px 0 0;

                }

                :host([textarea]) .input-container {
                    height: auto;
                    border-radius: 0;
                    background-color: transparent;
                }

                :host(:not([readonly]):not([textarea])) .input-container:hover {
                    background-color: var(--theme-focus-background-color, #ededed);
                }

                :host(:not([readonly]):not([textarea])) .input-container:focus-within {
                    background-color: var(--theme-focus-background-color, #ededed);
                }

                :host(:not([readonly])) .input-container:focus-within label {
                    opacity: 0.87;
                }

                :host(:not([readonly]):not([textarea])) .input-container:focus-within .line-ripple {
                    transform: scaleX(1);
                    opacity: 1;
                }

                input {
                    border: none;
                    width: 100%;
                    background-color: transparent;
                    padding: 20px 12px 6px;
                    font-family: inherit;

                    box-sizing: border-box;
                    border-bottom: 1px solid;
                    border-bottom-color: var(--app-text-color, #9d9d9d);

                    font-size: var(--theme-font-size, 1rem);;
                    line-height: var(--theme-line-height, 1.75rem);
                    font-weight: var(--app-font-weight, 400);
                    letter-spacing: 0.009375em;
                    text-align: var(--theme-text-align, left);

                    color: var(--app-text-color, black);

                }

                input::placeholder {
                    color: var(--app-text-color);
                    opacity: 0.8;
                }

                textarea {
                    border: none;
                    width: 100%;
                    background-color: transparent;
                    padding: 8px 12px;
                    font-family: inherit;

                    box-sizing: border-box;
                    border: 1px solid;
                    border-radius: 4px;
                    border-color: #9d9d9d;

                    font-size: var(--theme-font-size, 1rem);;
                    line-height: 1rem;
                    font-weight: var(--theme-font-weight, 400);
                    letter-spacing: 0.009375em;
                    text-align: var(--theme-text-align, left);
                }

                :host([textarea]) .input-container:hover textarea {
                    border-color: var(--app-text-color, rgba(0,0,0,0.87));
                   
                }

                :host([textarea]) .input-container:focus-within .mdc-notched-outline {
                    opacity: 1;
                }

                input:focus, textarea:focus {
                    outline: none;
                }

                label {
                    position: absolute;
                    left: 12px;
                    top: 6px;

                    font-family: inherit;

                    font-size: 12px;
                    color: var(--primary-theme, rgb(0, 0, 0));
                    opacity: 0.6;
                }

                .line-ripple {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 2px;

                    transform: scaleX(0);
                    transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1), opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);
                    opacity: 0;
                    
                    z-index: 2;
                    background-color: var(--primary-theme, rgb(0,0,0));
                }

                .mdc-notched-outline {
                    position: absolute;
                    bottom: 0;
                    top: 0;
                    left: 0;
                    right: 0;
                    pointer-events: none;

                    transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1), opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);
                    opacity: 0;
                    border: 2px solid var(--primary-theme, rgb(0,0,0));
                    border-radius: 4px;
                }

                :host([invalid]) input {
                    border-color: #d50000;
                }

                :host([invalid]) label {
                    color: #d50000;
                }

                :host([invalid]) .line-ripple {
                    background-color: #d50000;
                }

                .error-message {
                    color: #d50000;
                    font-size: 12px;
                    position: absolute;
                    font-weight: 400;
                    bottom: -20px;
                    left: 4px;
                }

                .icon {
                    position: absolute;
                    align-self: center;
                    display: flex;
                    margin: 0 12px;
                }

                .icon[name="suffix"] {
                    right: 0;
                }

                .icon[name="prefix"] {
                    left: 0;
                }

                :host([leadingIcon]) input {
                    padding-left: 44px;
                }

                :host([noLabel]) input {
                    padding-top: 0;
                    padding-bottom: 0;
                }

            `
        ]
    }

    static get properties() {
        return {
            name: { type: String },
            label: { type: String },
            type: { type: String },
            value: { type: String },
            placeholder: { type: String },
            invalid: {
                type: Boolean,
                reflect: true
            },
            leadingIcon: {
                type: Boolean,
                reflect: true
            },
            noLabel: {
                type: Boolean,
                reflect: true
            },
            required: {
                type: Boolean,
                reflect: true
            },
            readonly: {
                type: Boolean,
                reflect: true
            },
            textarea: {
                type: Boolean,
                reflect: true
            },
            errorMessage: { type: String },
            autocomplete: { type: String },
            maxlength: { type: Number }
        }
    }

    render() {
        return html `
            <div class="input-container">
                <slot class="icon" name="prefix"></slot>
                <slot class="icon" name="suffix"></slot>
                <label ?hidden="${!this.label || this.noLabel || this.textarea}" for="${this.name}">${this.label}</label>
                ${this._renderInput(this.required, this.name, this.autocomplete, this.type, this.invalid, this.placeholder, this.textarea, this.maxlength, this.readonly)}
                <div class="line-ripple"></div>
                <div class="mdc-notched-outline"></div>
                <div class="error-message" ?hidden="${!this.invalid || !this.errorMessage}">${this.errorMessage}</div> 
            </div>
        `;
    }

    _renderInput(required, name, autocomplete, type, invalid, placeholder, textarea, maxlength, readonly) {
        if (textarea) 
            return html `<textarea rows="5" ?required="${required}" id="${name}" name="${name}" autocomplete="${autocomplete}" placeholder="${placeholder}" maxlength="${maxlength}" ?readonly="${readonly}" @input="${this._onInput}" ?invalid="${invalid}" id="input" type="${type}">`
        else
            return html `<input ?required="${required}" id="${name}" name="${name}" autocomplete="${autocomplete}" placeholder="${placeholder}" maxlength="${maxlength}" ?readonly="${readonly}" @input="${this._onInput}" ?invalid="${invalid}" id="input" type="${type}">`
    }

    constructor() {
        super();

        this.label = "";
        this.maxlength = "";
        this.type = "";
        this.invalid = false;
        this.noLabel = false;
        this.required = false;
        this.leadingIcon = false;
        this.placeholder = "";
        this.name = "input";
        this.autocomplete = "";
        this.readonly = false;
        this.textarea = false;
    }

    get value() {
        let input = this.shadowRoot.querySelector('input');
        if (input) return input.value;
    }

    set value(val) {
        this.updateComplete.then(() => {
            let input = this.shadowRoot.querySelector('input');
            if (input) input.value = val;
            if (this.invalid) {
                this.invalid = false
                this.requestUpdate('invalid', true);
            }
        })
    }

    _onInput(e) {
        this.dispatchEvent(new CustomEvent('input-change', { detail: e.target.value }));
        if (e.target.value && this.invalid) this.invalid = false;
    }
}
customElements.define('agave-textfield', AgaveTextfield);