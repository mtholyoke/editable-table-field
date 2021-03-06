(window.webpackJsonp = window.webpackJsonp || []).push([
  [3],
  {
    52(e, t, i) {
      i.r(t),
        i.d(t, "SimplePickerOption", function() {
          return s;
        });
      const n = i(17);
      i(33), i(47);
      /**
       * Copyright 2018 The Pennsylvania State University
       * @license Apache-2.0, see License.md for full text.
       */
      class s extends n.a {
        static get styles() {
          return n.b`
      :host {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: var(--simple-picker-color);
      }
      :host([hidden]) {
        display: none;
      }
      div {
        margin: unset;
        padding: unset;
      }
      #label {
        padding: var(
          --simple-picker-option-label-padding,
          var(--simple-picker-option-padding, 2px 10px)
        );
        line-height: 100%;
        width: max-content;
      }

      :host([hide-option-labels]) #label {
        position: absolute;
        left: -999999px;
        width: 0;
        height: 0;
        overflow: hidden;
      }

      iron-icon {
        width: var(--simple-picker-option-size, 24px);
        min-height: var(--simple-picker-option-size, 24px);
        min-width: var(--simple-picker-option-size, 24px);
        line-height: var(--simple-picker-option-size, 24px);
      }
    `;
        }

        render() {
          return n.c`
      <iron-icon
        ?hidden="${!this.icon}"
        .icon="${this.icon}"
        aria-hidden="true"
      ></iron-icon>
      <div id="label">
        ${
          this.titleAsHtml
            ? n.c`
              ${this.label}
            `
            : this.label
        }
      </div>
    `;
        }

        constructor() {
          super(),
            (this.active = null),
            (this.data = null),
            (this.hidden = !1),
            (this.hideOptionLabels = !1),
            (this.icon = null),
            (this.id = null),
            (this.label = null),
            (this.selected = !1),
            (this.titleAsHtml = !1),
            (this.value = null),
            setTimeout(() => {
              this.addEventListener("focus", this._handleFocus.bind(this)),
                this.addEventListener(
                  "mouseover",
                  this._handleHover.bind(this)
                );
            }, 0);
        }

        static get properties() {
          return {
            active: { type: Boolean, reflect: !0 },
            data: { type: Object },
            hidden: { type: Boolean, reflect: !0 },
            hideOptionLabels: {
              type: Boolean,
              reflect: !0,
              attribute: "hide-option-labels"
            },
            icon: { type: String },
            id: { type: String, reflect: !0 },
            label: { type: String, reflect: !0 },
            selected: { type: Boolean, reflect: !0 },
            styles: { type: Object },
            titleAsHtml: {
              type: Boolean,
              reflect: !0,
              attribute: "title-as-html"
            },
            value: { type: String, reflect: !0 }
          };
        }

        static get tag() {
          return "simple-picker-option";
        }

        _handleFocus() {
          this.dispatchEvent(new CustomEvent("option-focus", { detail: this }));
        }

        _handleHover() {
          this.dispatchEvent(new CustomEvent("option-focus", { detail: this }));
        }

        _getColor() {
          return n.b`red`;
        }
      }
      window.customElements.define(s.tag, s);
    }
  }
]);
