import {LitElement, html, css} from 'lit-element';
import '../agave-bottom-sheet/agave-bottom-sheet';
import { repeat } from 'lit-html/directives/repeat';
import './single-menu-item';

class MenuBottomSheet extends LitElement {
    static get styles() {
        return [
            css`
                .menu-container {
                    display: flex;
                    flex-wrap: wrap;
                    margin-top: 16px;
                }

                h2 {
                    font-size: 16px;
                    font-weight: 500;
                    margin: 0;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                }

                single-menu-item:hover {
                    background-color: var(--app-light-transparent-primary-color);
                    cursor: pointer;
                }
            `
        ]
    }

    static get properties() {
        return {
            entries: {
                type: Array
            },
            open: {
                type: Boolean
            }
        }
    }

    render() {
        return html`
            <agave-bottom-sheet @open-changed="${this._syncOpenedProp}" .open="${this.open}">
                <h2>Menu</h2>
                <div class="menu-container">
                    ${repeat(this.entries, (entry) => html`
                        <single-menu-item @click="${_ => this._menuItemClick(entry)}" .entry="${entry}"></single-menu-item>
                    `)}
                </div>
            </agave-bottom-sheet>
        `;
    }

    /**
      * Instance of the element is created/upgraded. Useful for initializing
      * state, set up event listeners, create shadow dom.
      * @constructor
      */
    constructor() {
        super();
    
        this.entries = [
            {
                name: "Rocker Burguers",
                price: 100,
                id: 1,
                image: "https://firebasestorage.googleapis.com/v0/b/zipcater.appspot.com/o/menuPictures%2FHnraUz1YbIMN4lOJrfz4%2Fo%20(1).jpg?alt=media&token=ec4cf54c-560a-4015-ab41-fd7519f65300",
                category: "entrees"
            },
            {
                name: "Western Bacon",
                price: 95,
                id: 2,
                image: "https://firebasestorage.googleapis.com/v0/b/zipcater.appspot.com/o/menuPictures%2FHnraUz1YbIMN4lOJrfz4%2Fo%20(1).jpg?alt=media&token=ec4cf54c-560a-4015-ab41-fd7519f65300",
                category: "entrees"
            },
            {
                name: "Big Mac",
                price: 90,
                id: 3,
                image: "https://firebasestorage.googleapis.com/v0/b/zipcater.appspot.com/o/menuPictures%2FHnraUz1YbIMN4lOJrfz4%2Fo%20(1).jpg?alt=media&token=ec4cf54c-560a-4015-ab41-fd7519f65300",
                category: "entrees"
            },
            {
                name: "Ice Cream",
                price: 60,
                id: 4,
                image: "https://firebasestorage.googleapis.com/v0/b/zipcater.appspot.com/o/menuPictures%2FHnraUz1YbIMN4lOJrfz4%2Fo%20(1).jpg?alt=media&token=ec4cf54c-560a-4015-ab41-fd7519f65300",
                category: "desserts"
            },
            {
                name: "Cake",
                price: 30,
                id: 5,
                image: "https://firebasestorage.googleapis.com/v0/b/zipcater.appspot.com/o/menuPictures%2FHnraUz1YbIMN4lOJrfz4%2Fo%20(1).jpg?alt=media&token=ec4cf54c-560a-4015-ab41-fd7519f65300",
                category: "desserts"
            }
        ]
    }

    _syncOpenedProp(e) {
        console.log('sycning opened prop:', this.selected, e.detail)
        if (this.open !== e.detail) this.open = e.detail
    }

    _menuItemClick(menuItem) {
        console.log('menu item click:', menuItem)
        this.dispatchEvent(new CustomEvent('add-to-cart', {detail: menuItem}))
    }
}
customElements.define('menu-bottom-sheet', MenuBottomSheet);