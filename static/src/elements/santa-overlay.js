/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {html, LitElement} from 'lit-element';
import {until} from 'lit-html/directives/until.js';
import styles from './santa-overlay.scss?inline';
import {_msg} from '../magic.js';
import './santa-button.js';
import { getSetting, setSetting, settings } from '../mod/settings';
import { sendEvent } from '../mod/events';

export class SantaOverlayElement extends LitElement {
  static get properties() {
    return {
      isPaused: {type: Boolean},
      shareUrl: {type: String},
      _shortUrl: {type: Promise},
    };
  }

  constructor() {
    super();
	const sheet = new CSSStyleSheet();
	sheet.replaceSync(styles);
    this.shadowRoot.adoptedStyleSheets = [sheet];
  }

  _dispatchRestart() {
    this.dispatchEvent(new CustomEvent('restart'));
  }

  _dispatchResume() {
    this.dispatchEvent(new CustomEvent('resume'));
  }

  _toggleSetting(e) {
	setSetting(e.target.id, e.target.checked);
  }

  _dispatchLevel(level) {
	// Note, this will break when on the end screen
	// The music will not update, the timer will not restart
	sendEvent('skipTo', level, true);
  }

  update(changedProperties) {
    if (changedProperties.has('shareUrl')) {
      this._shortUrl = this.shareUrl;
    }

    return super.update(changedProperties);
  }

  _copyUrl(ev) {
    const input = ev.target;

    input.select();
    document.execCommand('copy');
    input.setSelectionRange(0, 0);

    input.classList.add('copy');
    window.requestAnimationFrame(() => {
      input.classList.remove('copy');
    });
  }

  render() {
    const hasUrl = Boolean(this.shareUrl);
    const heroClass = hasUrl ? 'share' : (this.isPaused ? 'pause' : 'gameover');

    return html`
<div class="backdrop">
  <main>
    <div class="hero ${heroClass}">
      <h1>${_msg`gameover`}</h1>
    </div>
    <nav>
      <div class="url" ?hidden=${!hasUrl}>
        <h4>${_msg`copy-me-short`}</h4>
        <input aria-label=${_msg`copy-me-short`} type="text" value=${until(this._shortUrl, this.shareUrl)} readonly @click=${this._copyUrl} />
      </div>
      <div class="buttons">
        <santa-button aria-label=${_msg`play`} color="purple" @click="${this._dispatchResume}" ?hidden=${!this.isPaused} id="playButton">
          <svg class="icon"><path d="M8 5v14l11-7z"/></svg>
        </santa-button>
        <santa-button aria-label=${_msg`playagain`} color="purple" @click="${this._dispatchRestart}" id="playagainButton">
          <svg class="icon"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
        </santa-button>
      </div>
    </nav>
	<div class="container">
		<h3>Skip To Level</h3>
		<div class="buttons">
			<button @click="${() => this._dispatchLevel(1)}">1</button>
			<button @click="${() => this._dispatchLevel(2)}">2</button>
			<button @click="${() => this._dispatchLevel(3)}">3</button>
			<button @click="${() => this._dispatchLevel(4)}">4</button>
			<button @click="${() => this._dispatchLevel(5)}">5</button>
		</div>
		<div class="buttons">
			<button @click="${() => this._dispatchLevel(6)}">6</button>
			<button @click="${() => this._dispatchLevel(7)}">7</button>
			<button @click="${() => this._dispatchLevel(8)}">8</button>
			<button @click="${() => this._dispatchLevel(9)}">9</button>
			<button @click="${() => this._dispatchLevel(10)}">10</button>
		</div>
	</div>
	<div class="container">
		<h3>Settings</h3>
		${settings.map(setting => html`<label>
			${setting.type === 'boolean' && html`<input type="checkbox" @change="${this._toggleSetting}" id="${setting.key}" .checked=${getSetting(setting.key)}></input>`}
			<a>${setting.name}</a>
		</label>`)}
	</div>
  </main>
</div>
`;
  }

  focus() {
    if (this.isPaused) {
      this.shadowRoot.querySelector('#playButton').focus();
    } else {
      this.shadowRoot.querySelector('#playagainButton').focus();
    }
  }
}


customElements.define('santa-overlay', SantaOverlayElement);