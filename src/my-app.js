/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html, css } from 'lit-element';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

// These are the elements needed by this element.
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import { menuIcon } from './my-icons.js';
import './components/snack-bar.js';
import './components/menu-bottom-sheet/menu-bottom-sheet';

class MyApp extends LitElement {
  static get properties() {
    return {
      appTitle: { type: String },
      _page: { type: String },
      _snackbarOpened: { type: Boolean },
      _offline: { type: Boolean }
    };
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;

          --trattoria-blue: #1d242c;
          --trattoria-light-blue: #2a3d4b;
          --trattoria-light-blue-transparent: rgba(42, 61, 75, 0.24);
          --trattoria-light-blue-light-transparent: rgba(42, 61, 75, 0.06);
          --trattoria-beige: #e1dbcf;

          --app-primary-blue: #0d47a1;
          --app-transparent-primary-blue: rgba(0,33,113, 0.24);
          --app-light-transparent-primary-blue: rgba(0,33,113, 0.06);
          --app-primary-red: #e94242;
          --app-transparent-primary-red: rgba(233,66,66, 0.24);
          --app-light-transparent-primary-red: rgba(233,66,66, 0.06);
          
          --app-primary-white: #FAFAFA;
          --app-primary-black: #293237;

          --app-primary-color: var(--trattoria-light-blue);
          --app-transparent-primary-color: var(--trattoria-light-blue-transparent);
          --app-light-transparent-primary-color: var(--trattoria-light-blue-light-transparent);
          --app-secondary-color: var(--app-primary-black);
          --app-dark-text-color: var(--trattoria-blue);
          --app-light-text-color: var(--app-primary-white);

          /* --app-border-color: rgba(219,219,219,1); */
          --app-border-color: #b8997b;
          --app-subtitle-text-color: rgba(0,0,0,0.6);

          --app-header-background-color: var(--app-primary-color);
          --app-header-text-color: var(--trattoria-beige);
          
          --app-card-shadow: 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.2);
        }

        app-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          text-align: center;
          background-color: var(--app-header-background-color);
          color: var(--app-header-text-color);
          box-shadow: var(--app-card-shadow);
        }

        .toolbar-top {
          background-color: var(--app-header-background-color);
        }

        [main-title] {
          font-family: 'Pacifico';
          text-transform: lowercase;
          font-size: 28px;
          letter-spacing: 1px;
        }

        /* Workaround for IE11 displaying <main> as inline */
        main {
          display: block;
        }

        .main-content {
          padding-top: 72px;
        }

        .page {
          display: none;
        }

        .page[active] {
          display: block;
        }

        catering-calculator {
          margin: 0 8px;
        }

        footer {
          padding: 16px;
          font-size: 12px;
          text-align: center;
        }
        
        footer a {
          text-decoration: none;
          color: #b8997b;
        }

        footer a:hover {
          color: var(--app-primary-color);
        }

        /* Wide layout: when the viewport width is bigger than 460px, layout
        changes to a wide layout */
        @media (min-width: 460px) {
          /* The drawer button isn't shown in the wide layout, so we don't
          need to offset the title */
          [main-title] {
            padding-right: 0px;
          }
        }
      `
    ];
  }

  render() {
    // Anything that's related to rendering should be done in here.
    return html`
      <!-- Header -->
      <app-header condenses reveals effects="waterfall">
        <app-toolbar class="toolbar-top">
          <div main-title>Catering Calculator</div>
        </app-toolbar>
      </app-header>

      <!-- Main content -->
      <main role="main" class="main-content">
        <catering-calculator @finish="${_ => this._sendMessage('Gracias por completar el formulario, nos pondremos en contacto pronto.')}" @add-menu-item="${this._addMenuItemEvent}"></catering-calculator>
      </main>

      <snack-bar ?active="${this._snackbarOpened}">${this._snackbarMessage}</snack-bar>

      <footer><a target="_blank" href="https://agavemedia.io">made with 🌵 by agave media</a></footer>

      <menu-bottom-sheet @add-to-cart="${this._addToCart}"></menu-bottom-sheet>
    `;
  }

  constructor() {
    super();
    this._drawerOpened = false;
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/3.0/docs/devguide/settings#setting-passive-touch-gestures
    setPassiveTouchGestures(true);
  }

  firstUpdated() {
    installRouter((location) => this._locationChanged(location));
    installOfflineWatcher((offline) => this._offlineChanged(offline));
    installMediaQueryWatcher(`(min-width: 460px)`,
        (matches) => this._layoutChanged(matches));
  }

  updated(changedProps) {
    if (changedProps.has('_page')) {
      const pageTitle = this.appTitle + ' - ' + this._page;
      updateMetadata({
        title: pageTitle,
        description: pageTitle
        // This object also takes an image property, that points to an img src.
      });
    }
  }

  _layoutChanged(isWideLayout) {
    // The drawer doesn't make sense in a wide layout, so if it's opened, close it.
    this._updateDrawerState(false);
  }

  _offlineChanged(offline) {
    const previousOffline = this._offline;
    this._offline = offline;

    // Don't show the snackbar on the first load of the page.
    if (previousOffline === undefined) {
      return;
    }
  }

  _locationChanged(location) {
    const path = window.decodeURIComponent(location.pathname);
    const page = path === '/' ? 'home' : path.slice(1);
    this._loadPage(page);
    // Any other info you might want to extract from the path (like page type),
    // you can do here.

    // Close the drawer - in case the *path* change came from a link in the drawer.
    this._updateDrawerState(false);
  }

  _updateDrawerState(opened) {
    if (opened !== this._drawerOpened) {
      this._drawerOpened = opened;
    }
  }

  _loadPage(page) {
    switch(page) {
      case 'home':
        import('./components/catering-calculator/catering-calculator.js').then((module) => {
          // Put code in here that you want to run every time when
          // navigating to view1 after my-view1.js is loaded.
        });
        break;
      default:
        page = 'view404';
        import('./views/my-view404.js');
    }

    this._page = page;
  }

  _menuButtonClicked() {
    this._updateDrawerState(true);
  }

  _drawerOpenedChanged(e) {
    this._updateDrawerState(e.target.opened);
  }

  _addMenuItemEvent(e) {
    console.log('adding menu item...')
    this.shadowRoot.querySelector('menu-bottom-sheet').open = true
  }

  _addToCart(e) {
    console.log('add to cart:', e.detail)
    this.shadowRoot.querySelector('menu-bottom-sheet').open = false
    this.shadowRoot.querySelector('catering-calculator').addItem(e.detail)
  }

  _sendMessage(msg) {
    clearTimeout(this.__snackbarTimer);
    this._snackbarMessage = msg;
    this._snackbarOpened = true;
    this.__snackbarTimer = setTimeout(() => { this._snackbarOpened = false }, 3000);
  }
}

window.customElements.define('my-app', MyApp);
