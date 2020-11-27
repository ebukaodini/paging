'use strict'

const ctx = {

   state: {},

   init: function () {
      // initiates state from local storage
      if (localStorage.length == 0) localStorage.setItem(window.location.origin, "{}");
      else ctx.state = JSON.parse(localStorage.getItem(window.location.origin) ?? "{}");
   },

   setState: function (params) {
      // add/update a property in state
      ctx.state = Object.assign(ctx.state ?? {}, params ?? {});
      // update the states in the local storage
      localStorage.setItem(window.location.origin, JSON.stringify(ctx.state));
   },

   removeState: function (key) {
      // remove the property from the state
      if (ctx.state[key]) ctx.state[key] = undefined;
      // update the states in the local storage
      localStorage.setItem(window.location.origin, JSON.stringify(ctx.state));
   }

}

// module.exports = ctx;