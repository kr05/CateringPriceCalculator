import {LitElement, html, css} from 'lit-element';
import '@material/mwc-button';
import { repeat } from 'lit-html/directives/repeat';
import './single-cart-item.js';
import '../../mwc-stepper/mwc-stepper';
import '../../mwc-stepper/mwc-step';
import './single-menu-item-step';
import '../../select-menu/select-menu';

class CartStep extends LitElement {
    static get styles() {
        return [
            css`
                :host {
                    display: flex;
                    flex-direction: column;
                }

                mwc-stepper {
                    padding: 0;
                    overflow-y: auto;
                }
                
                .empty {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 16px;
                }

                mwc-button {
                    --mdc-theme-primary: var(--app-dark-text-color);
                    align-self: flex-start;
                }

                mwc-step {
                    --step-circle-background-color: var(--app-primary-color);
                    --submit-button-background-color: var(--app-primary-color);
                }

                .intro-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin: 16px 0 32px 16px;
                }

                .order-summary-container {
                    text-align: end;
                    margin-top: 16px;
                    font-size: 14px;
                }

                .intro {
                    font-size: 16px;
                    font-weight: 700;
                    margin: 0;
                }

                .menu-type {
                    font-size: 12px;
                    font-weight: 500;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    margin: 0;
                    color: var(--app-subtitle-text-color);
                }

                [hidden] {
                    display: none;
                }
            `
        ]
    }

    static get properties() {
        return {
            cart: {
                type: Object
            },
            venue: {
                type: String
            },
            entries: {
                type: Array
            },
            courses: {
                type: Array
            },
            selectedMenu: {
                type: Object
            }
        }
    }

    render() {
        return html`
            <mwc-stepper id="stepper">
                <mwc-step @click="${e => this._onStepClickEvent(e, 0)}" hideButtons ?laststep="${this.courses && this.courses.length === 0 }"  label="Selecciona opcion" subtitle="${this.selectedMenu ? this.selectedMenu.displayName : ""}" editable>
                    <select-menu @menu-selected="${this._menuSelectedEvent}"></select-menu>
                </mwc-step>
                ${repeat(this._computeArr(this.courses), (i) => i.id, (singleCourse, index) => html`
                    <mwc-step @click="${e => this._onStepClickEvent(e, index + 1)}" hideButtons subtitle="${this._computeSubtitle(singleCourse, this.cart)}" label="${singleCourse.name}" editable ?laststep="${index === this.courses.length - 1}">
                        <single-menu-item-step .selectedMenuItem="${this._computeSelectedMenuItem(singleCourse, this.cart)}" @menu-item-selected="${e => this._menuItemSelectedEvent(e, singleCourse)}" .course="${singleCourse}" .menu="${this._computeMenu(this.entries, singleCourse.filter)}"></single-menu-item-step>
                    </mwc-step>
                `)}
            </mwc-stepper>

            <!-- <mwc-button @click="${_ => this._agregarTiempo(this.courses)}" dense>➕ agregar tiempo</mwc-button> -->
        `;
    }

    constructor() {
        super();
        this.cart = {}
        this.courses = []

        this.entries = [
            {
                name: "Tartar de atun",
                subtitle: "con aguacate y salpicon de mango",
                id: 1,
                image: "https://firebasestorage.googleapis.com/v0/b/zipcater.appspot.com/o/menuPictures%2FHnraUz1YbIMN4lOJrfz4%2Fo%20(1).jpg?alt=media&token=ec4cf54c-560a-4015-ab41-fd7519f65300",
                category: "entree",
                labels: ['entree', 'seafood', 'valentines']
            },
            {
                name: "Ensalada de pera",
                subtitle: "riquisima combinacion de lechugas mixtas con tropiezos de nuez, cebolla morada, jitomate, zanahoria, aderezo de miel, y mostaza y lluvia de queso roquefort",
                id: 2,
                image: "https://firebasestorage.googleapis.com/v0/b/zipcater.appspot.com/o/menuPictures%2FHnraUz1YbIMN4lOJrfz4%2Fo%20(1).jpg?alt=media&token=ec4cf54c-560a-4015-ab41-fd7519f65300",
                category: "entree",
                labels: ['entree', 'salad', 'valentines']
            },
            {
                name: "Salmon",
                id: 3,
                image: "https://firebasestorage.googleapis.com/v0/b/zipcater.appspot.com/o/menuPictures%2FHnraUz1YbIMN4lOJrfz4%2Fo%20(1).jpg?alt=media&token=ec4cf54c-560a-4015-ab41-fd7519f65300",
                category: "main course",
                labels: ['main course', 'seafood', 'valentines']
            },
            {
                name: "Medallones de filete al gusto",
                id: 4,
                image: "https://firebasestorage.googleapis.com/v0/b/zipcater.appspot.com/o/menuPictures%2FHnraUz1YbIMN4lOJrfz4%2Fo%20(1).jpg?alt=media&token=ec4cf54c-560a-4015-ab41-fd7519f65300",
                category: "main course",
                labels: ['main course', 'beef', 'valentines'], 
            },
            {
                name: "Mousse de frambuesa",
                id: 5,
                image: "https://firebasestorage.googleapis.com/v0/b/zipcater.appspot.com/o/menuPictures%2FHnraUz1YbIMN4lOJrfz4%2Fo%20(1).jpg?alt=media&token=ec4cf54c-560a-4015-ab41-fd7519f65300",
                category: "dessert",
                labels: ['dessert', 'valentines']
            },
            //Christmas
            {
                name: "Crema de pistache",
                subtitle: "con perlas de pera y croton artesanal de mantequilla",
                id: 6,
                image: "https://firebasestorage.googleapis.com/v0/b/zipcater.appspot.com/o/menuPictures%2FHnraUz1YbIMN4lOJrfz4%2Fo%20(1).jpg?alt=media&token=ec4cf54c-560a-4015-ab41-fd7519f65300",
                category: "entree",
                labels: ['entree', 'christmas']
            },
            {
                name: "Crema de jitomate",
                subtitle: "con piñones rostizados, queso provologne ahumado, pesto de albabaca y tomate cherry relleno de queso de cabra",
                id: 7,
                image: "https://firebasestorage.googleapis.com/v0/b/zipcater.appspot.com/o/menuPictures%2FHnraUz1YbIMN4lOJrfz4%2Fo%20(1).jpg?alt=media&token=ec4cf54c-560a-4015-ab41-fd7519f65300",
                category: "entree",
                labels: ['entree', 'christmas']
            },
            {
                name: "Salmon relleno al horno",
                subtitle: "salmon horneado y relleno de queso crema y cabra con jamon serrano y salsa de vino blanco y eneldo, con suprema de papa y verduras salteadas a la mantequilla",
                id: 8,
                image: "https://firebasestorage.googleapis.com/v0/b/zipcater.appspot.com/o/menuPictures%2FHnraUz1YbIMN4lOJrfz4%2Fo%20(1).jpg?alt=media&token=ec4cf54c-560a-4015-ab41-fd7519f65300",
                category: "main course",
                labels: ['main course', 'christmas', 'seafood']
            },
            {
                name: "Filete a la leña",
                subtitle: "con salsa de aceitunas verdes, suprema de papa y verduras salteadas a la mantequilla",
                id: 9,
                image: "https://firebasestorage.googleapis.com/v0/b/zipcater.appspot.com/o/menuPictures%2FHnraUz1YbIMN4lOJrfz4%2Fo%20(1).jpg?alt=media&token=ec4cf54c-560a-4015-ab41-fd7519f65300",
                category: "main course",
                labels: ['main course', 'christmas']
            },
            {
                name: "Tiramisu de frutos rojos",
                subtitle: "soletas importadas y cafe expreso",
                id: 10,
                image: "https://firebasestorage.googleapis.com/v0/b/zipcater.appspot.com/o/menuPictures%2FHnraUz1YbIMN4lOJrfz4%2Fo%20(1).jpg?alt=media&token=ec4cf54c-560a-4015-ab41-fd7519f65300",
                category: "dessert",
                labels: ['dessert', 'christmas']
            },
            {
                name: "Pastel de queso",
                subtitle: "con calabaza de castilla y ate de membrillo al horno",
                id: 11,
                image: "https://firebasestorage.googleapis.com/v0/b/zipcater.appspot.com/o/menuPictures%2FHnraUz1YbIMN4lOJrfz4%2Fo%20(1).jpg?alt=media&token=ec4cf54c-560a-4015-ab41-fd7519f65300",
                category: "dessert",
                labels: ['dessert', 'christmas']
            },
        ]
    }

    updated(changedProps) {
        const cartChanged = changedProps.has('cart')
        const selectedMenuChanged = changedProps.has('selectedMenu')

        if (cartChanged) {
            this.dispatchEvent(new CustomEvent('cart-changed', {detail: this.cart}))
        }

        if (selectedMenuChanged) {
            this.dispatchEvent(new CustomEvent('selected-menu-changed', {detail: this.selectedMenu}))
        }
    }

    _computeArr(arr) {
        return arr ? arr : []
    }

    _computeMenu(menu, type) {
        console.log('computing menu:', menu, type)
        return menu && menu.length ? menu.filter(entry => {
            if (typeof type === 'string') return entry.labels.includes(type)
            if (type === undefined) return

            return type.every(singleFilter => entry.labels.includes(singleFilter))
        }) : []
    }

    _computeTotal(subtotal, tax) {
        let parsedSubtotal = parseFloat(subtotal)
        let parsedTax = parseFloat(tax)

        let total =  parsedTax + parsedSubtotal
        console.log('total:', total)

        this.total = total
    }
 
    _computeSubtotal(cart) {
        if (!cart) return 0

        var subtotal = 0
        Object.values(cart).forEach(cartItem => {
            subtotal += parseInt(cartItem.price)
        });

        console.log('computed cart total:', subtotal)

        this.subtotal = subtotal;
    }

    _computeTax(subtotal) {
        console.log('computing tax:', subtotal)
        this.tax = (parseFloat(subtotal) * 0.0875).toFixed(2);
    }

    _computeCart(cart) {
        console.log('computing cart:', cart)
        return cart && cart.length ? cart : []
    }

    _onAddMenuItemClick(e) {
        this.dispatchEvent(new CustomEvent('add-menu-item', {bubbles: true, composed: true}))
    }

    addItem(item) {
        const prevArray = [...this.cart]

        this.cart.push(item);
        this.requestUpdate('cart', prevArray);
    }

    _invalidStepEvent(type) {
        console.log('invalid step event:', type)
    }

    _onFinishedClickEvent(e) {
        console.log('on stepper finished event', e)
    }

    _onResetStep(stepID) {
        console.log('on reset step:', stepID)
    }

    _agregarTiempo(courses) {
        let prevArray = courses ? [...courses] : []
        this.courses.push({price: 500, entries: [{name: `Tiempo ${prevArray.length + 1}`, filter: []}]})
        this.requestUpdate('courses', prevArray)
    }

    _menuItemSelectedEvent(e, course) {
        console.log('menu item selected event:', e, course)        
        console.log('target:', e.target)

        let stepper = this.shadowRoot.querySelector('#stepper')
        if (stepper.isFinalStep()) {
            stepper._finishStep()
        } else {
            stepper.nextStep()
        }   
        
        const menuItem = e.detail
        const prevCart = Object.assign({}, this.cart)

        // if (this.cart[course.name] && this.cart[course.name].id === menuItem.id) return 
        this.cart[course.name] = menuItem

        this.dispatchEvent(new CustomEvent('cart-changed', {detail: this.cart}))
        this.requestUpdate('cart', prevCart)  
    }

    _computeSelectedMenuItem(course, cart) {
        console.log('computing selected menu item:', course, cart)

        if (!course || !cart) return {}

        const filter = course.name
        const selectedMenuItem = cart[filter]

        return selectedMenuItem ? selectedMenuItem : {}
    }

    _computeSubtitle(course, cart) {
        console.log('computing subtitle:', course, cart)

        if (!course || !cart) return ""

        const filter = course.name
        const selectedMenuItem = cart[filter]

        return selectedMenuItem ? selectedMenuItem.name : ""
    }

    async _menuSelectedEvent(e) {
        console.log('menu selected event:', e.detail)
        await this.reset();
        this.selectedMenu = e.detail.selectedMenu
        this.courses = e.detail.courses.entries

        this.dispatchEvent(new CustomEvent('course-outline-changed', {detail: e.detail.courses}))

        await this.updateComplete;
        this.shadowRoot.querySelector('#stepper').nextStep()
    }

    async reset() { 
        this.courses = []
        this.cart = {}
        this.selectedMenu = null
        this.shadowRoot.querySelector('#stepper').reset()
        await this.shadowRoot.querySelector('#stepper').clearSteps()
        await this.updateComplete
        this.requestUpdate()
    }

    _onStepClickEvent(e, idx) {
        console.log('on step click event:', idx)
        console.log('active:', e.target.active)
        if (e.target.active === false) this.shadowRoot.querySelector('#stepper').setActiveByIndex(idx);
    }
}
customElements.define('cart-step', CartStep);