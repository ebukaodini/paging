'use strict';

var ctx = {
  state: {},
  init: function init() {
    var _localStorage$getItem;

    // initiates state from local storage
    if (localStorage.length == 0) localStorage.setItem(window.location.origin, "{}");else ctx.state = JSON.parse((_localStorage$getItem = localStorage.getItem(window.location.origin)) !== null && _localStorage$getItem !== void 0 ? _localStorage$getItem : "{}");
  },
  setState: function setState(params) {
    var _ctx$state;

    // add/update a property in state
    ctx.state = Object.assign((_ctx$state = ctx.state) !== null && _ctx$state !== void 0 ? _ctx$state : {}, params !== null && params !== void 0 ? params : {}); // update the states in the local storage

    localStorage.setItem(window.location.origin, JSON.stringify(ctx.state));
  },
  removeState: function removeState(key) {
    // remove the property from the state
    if (ctx.state[key]) ctx.state[key] = undefined; // update the states in the local storage

    localStorage.setItem(window.location.origin, JSON.stringify(ctx.state));
  }
}; // module.exports = ctx;