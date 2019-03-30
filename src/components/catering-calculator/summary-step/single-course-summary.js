import {LitElement, html, css} from 'lit-element';

class SingleCourseSummary extends LitElement {
    static get styles() {
        return [
            css`
                :host {
                    display: flex;
                    align-items: center;
                }

                .image-container {
                    display: flex;
                    height: 48px;
                    width: 48px;

                    border-radius: 4px;
                    overflow: hidden;
                    margin-right: 16px;
                }

                .image-container img {
                    height: 100%;
                    width: 100%;
                    object-fit: cover;
                }

                .name {
                    font-size: 14px;
                    font-weight: 700;
                }

                .subtitle {
                    font-size: 12px;
                    font-weight: 500;
                    color: rgba(0, 0, 0, 0.38);
                    margin: 0;
                }
            `
        ]
    }

    static get properties() {
        return {
            item: {
                type: Object
            }
        }
    }

    render() {
        return html`
            <div class="image-container">
                <img src="${this._computeImage(this.item)}" alt="">
            </div>
            <div>
                <div class="name">${this.item ? this.item.name : ""}</div>
                <div class="subtitle">${this.item ? this.item.course : ""}</div>
            </div>
        `;
    }

    _computeImage(item) {
        return item && item.image ? item.image : ""
    }
}
customElements.define('single-course-summary', SingleCourseSummary);