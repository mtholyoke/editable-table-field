(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{51:function(t,e,i){"use strict";i.r(e),i.d(e,"EditableTableFilter",(function(){return o}));var n=i(17);i(43),i(40),i(47),i(48);
/**
 * Copyright 2018 The Pennsylvania State University
 * @license Apache-2.0, see License.md for full text.
 */
class o extends n.a{static get styles(){return[n.b`
        paper-button {
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
        paper-button > div {
          flex-grow: 1;
        }
        iron-icon {
          min-width: 24px;
        }
        .sr-only {
          position: absolute;
          left: -9999px;
          font-size: 0;
          height: 0;
          width: 0;
          overflow: hidden;
        }
        #filter-off {
          opacity: 0.25;
        }
        :host(:not([filtered])) .filtered,
        :host(:not([filtered]):not(:focus):not(:hover)) #filter,
        :host(:not([filtered]):focus) #filter-off,
        :host(:not([filtered]):hover) #filter-off,
        :host([filtered]:not(:focus):not(:hover)) #filter-off,
        :host([filtered]:focus) #filter,
        :host([filtered]:hover) #filter {
          display: none;
        }
      `]}render(){return n.c`
      <paper-button
        id="button"
        class="container"
        @click="${this._onFilterClicked}"
      >
        <span>${this.text}</span>
        <span class="sr-only" .hidden="${!this.filtered}"> (filtered)</span>
        <span class="sr-only"> Toggle filter.</span>
        <iron-icon id="filter" icon="editable-table:filter"></iron-icon>
        <iron-icon id="filter-off" icon="editable-table:filter-off"></iron-icon>
      </paper-button>
      <simple-tooltip for="button"
        >Toggle Column ${this.columnIndex} filter for
        "${this.text}"</simple-tooltip
      >
    `}static get tag(){return"editable-table-filter"}constructor(){super(),this.columnIndex=null,this.filtered=!1,this.text=""}static get properties(){return{columnIndex:{type:Number,attribute:"column-index"},filtered:{type:Boolean,reflect:!0},text:{type:String}}}_getPressed(t){return t?"true":"false"}_onFilterClicked(){this.dispatchEvent(new CustomEvent("toggle-filter",{bubbles:!0,cancelable:!0,composed:!0,detail:this}))}}window.customElements.define(o.tag,o)}}]);