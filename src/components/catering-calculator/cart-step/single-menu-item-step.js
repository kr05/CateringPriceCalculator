import {LitElement, html, css} from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';

class SingleMenuItemStep extends LitElement {
    static get styles() {
        return [
            css`
                :host {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    flex-grow: 0;
                }

                .single-item {
                    padding: 0 16px;
                    border-radius: 4px;
                    height: 56px;

                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;

                    border: 1px solid var(--app-border-color);

                    margin: 8px;

                    cursor: pointer;
                }

                .single-item:hover {
                    background-color: var(--app-light-transparent-primary-color);
                    box-shadow: var(--app-card-shadow);
                }

                .single-item[selected] {
                    background-color: var(--app-transparent-primary-color);
                }
            `
        ]
    }

    static get properties() {
        return {
            menu: {
                type: Array
            },
            course: {
                type: Object
            },
            selectedMenuItem: {
                type: Object
            }
        }
    }

    render() {
        return html`
            ${repeat(this.menu, (menuItem) => html`
                <div ?selected="${this.selectedMenuItem ? menuItem.id === this.selectedMenuItem.id : false}" @click="${_ => this._menuItemClick(menuItem)}" class="single-item">${menuItem.name}</div> 
            `)}
        `; 
    }

    constructor() {
        super();
        this.menu = []
    }

    _menuItemClick(menuItem) {
        this.dispatchEvent(new CustomEvent('menu-item-selected', {detail: menuItem}))
    }
}
customElements.define('single-menu-item-step', SingleMenuItemStep);