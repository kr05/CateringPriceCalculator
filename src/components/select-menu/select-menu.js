import {LitElement, html, css} from 'lit-element';
import '@material/mwc-button';

class SelectMenu extends LitElement {
    static get styles() {
        return [
            css`
                :host {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

                .container {
                    display: flex;
                    flex-wrap: wrap;
                }

                .single-venue {
                    text-align: center;
                    height: 100px;
                    width: 125px;
                    padding: 8px;
                    margin: 4px;

                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;

                    border: 1px solid var(--app-border-color);
                    border-radius: 4px;
                    cursor: pointer;
                }

                .single-venue:hover {
                    background-color: var(--app-light-transparent-primary-blue);
                }

                .name {
                    font-size: 14px;
                }

                .icon {
                    font-size: 20px;
                }

                .subtitle {
                    color: var(--app-subtitle-text-color);
                    font-size: 12px;
                    text-align: center;
                    font-style: italic;
                }
            `
        ]
    }

    render() {
        return html`
            <div class="container">
                <div @click="${_ => this._click('valentines', 'Menu de San Valentin')}" class="single-venue">
                    <div class="icon">💖</div>
                    <div class="name">Menu de San Valentin</div>
                    <div class="subtitle">3 tiempos &#183 $1000/persona</div>
                </div>
                
                <div @click="${_ => this._click('christmas', 'Menu Navideño')}" class="single-venue">
                    <div class="icon">🎄</div>
                    <div class="name">Menu Navideño</div>
                    <div class="subtitle">3 tiempos &#183 $1200/persona</div>
                </div>
                
                <div @click="${_ => this._click('threeCourse', '3 tiempos')}" class="single-venue">
                    <div class="icon">3️⃣</div>
                    <div class="name">3 tiempos</div>
                    <div class="subtitle">3 tiempos &#183 $800/persona</div>
                </div>
                
                <div @click="${_ => this._click('fiveCourse', '5 tiempos')}" class="single-venue">
                    <div class="icon">5️⃣</div>
                    <div class="name">5 tiempos</div>
                    <div class="subtitle">5 tiempos &#183 $1200/persona</div>
                </div>
            </div>

        `;
    }

    _click(type, displayName) {
        const courses = this._computeCourses(type) 
        this.dispatchEvent(new CustomEvent('menu-selected', {detail: {selectedMenu: {type: type, displayName: displayName}, courses: courses }}))
    }

    _computeCourses(type) {
        switch (type) {
            case "valentines":
                return {id: 1, displayName: 'Menu de San Valentin', price: 1000, entries: [{name: 'entrada', filter: ['entree', 'valentines']}, {name: 'entrada principal', filter: ['main course', 'valentines']}, {name: 'postre', filter: ['dessert', 'valentines']}]}
            case "christmas":
                return {id: 2, displayName: 'Menu de Navidad', price: 1200, entries: [{name: 'entrada', filter: ['entree', 'christmas']}, {name: 'entrada principal', filter: ['main course', 'christmas']}, {name: 'postre', filter: ['dessert', 'christmas']}]}
            case "threeCourse":
                return {id: 3, displayName: '3 tiempos', price: 800, entries: [{name: 'entrada', filter: 'entree'}, {name: 'entrada principal', filter: 'main course'}, {name: 'postre', filter: 'dessert'}]} 
            case "fiveCourse":
                return {id: 4, displayName: '5 tiempos', price: 1100, entries: [{name: 'ensalada', filter: 'salad'}, {name: 'aperitivo', filter: 'appetizer'}, {name: 'entrada', filter: 'entree'}, {name: 'entrada principal', filter: 'main course'}, {name: 'postre', filter: 'dessert'}]}
            default:
                return {id: 5, price: 500, entries: [{name: 'Tiempo 1', filter: false}]}
        }
    }
}
customElements.define('select-menu', SelectMenu);