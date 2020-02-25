(window.webpackJsonp = window.webpackJsonp || []).push([
  [2],
  {
    50(t, e, o) {
      o.r(e),
        o.d(e, "EditableTableSort", function() {
          return s;
        });
      const n = o(7);
      o(43), o(47), o(48);
      /**
       * Copyright 2018 The Pennsylvania State University
       * @license Apache-2.0, see License.md for full text.
       */

      class s extends n.a {
        static get template() {
          return n.b`
      <style is="custom-style">
        :host paper-button {
          padding: var(--editable-table-cell-padding, 0);
          margin: 0;
          width: auto;
          min-width: unset;
          display: flex;
          justify-content: space-between;
          align-items: center;
          align-content: stretch;
          text-transform: unset;
          font-family: var(--editable-table-font-family);
        }
        :host paper-button > div {
          flex-grow: 1;
        }
        :host .sr-only {
          position: absolute;
          left: -9999px;
          font-size: 0;
          height: 0;
          width: 0;
          overflow: hidden;
        }
        :host(:not([sort-mode="asc"])) .asc,
        :host(:not([sort-mode="desc"])) .desc,
        :host(:not([sort-mode="none"])) .none,
        :host #asc,
        :host #desc,
        :host([sorting]:not([sort-mode="none"])) #none {
          display: none;
        }
        :host([sorting][sort-mode="asc"]) #asc,
        :host([sorting][sort-mode="desc"]) #desc {
          display: flex;
        }
      </style>
      <paper-button id="button" class="container" on-click="_onSortClicked">
        [[text]] <span class="sr-only asc">(ascending)</span>
        <span class="sr-only desc">(descending)</span>
        <span class="sr-only"> Toggle sort mode.</span>
        <iron-icon id="asc" icon="arrow-drop-up"></iron-icon>
        <iron-icon id="desc" icon="arrow-drop-down"></iron-icon>
        <iron-icon id="none" icon="editable-table:sortable"></iron-icon>
      </paper-button>
    `;
        }

        static get tag() {
          return "editable-table-sort";
        }

        static get properties() {
          return {
            columnIndex: { type: Number, value: null, reflectToAttribute: !0 },
            sortMode: { type: String, value: "none", reflectToAttribute: !0 },
            sortColumn: { type: Number, value: -1, reflectToAttribute: !0 },
            sorting: {
              type: Boolean,
              computed: "_isSorting(columnIndex,sortColumn)",
              reflectToAttribute: !0
            },
            text: { type: String, value: "" }
          };
        }

        _onSortClicked() {
          this.dispatchEvent(
            new CustomEvent("change-sort-mode", {
              bubbles: !0,
              cancelable: !0,
              composed: !0,
              detail: this
            })
          );
        }

        setSortMode(t) {
          (this.sortMode = t),
            (this.__checked = t === "asc" || (t === "desc" && t));
        }

        _isSorting(t, e) {
          return t === e;
        }
      }
      window.customElements.define(s.tag, s);
    }
  }
]);
