'use strict'

/**
 * @author Ebuka Odini <ebukaodini@gmail.com>
 */

/**
 * @description the context object responsible for handling state management; it uses windows localStorage to hold state
 */
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

const nav = {

  __routes: [],

  routing: false,

  start: function () {
    window.addEventListener('DOMContentLoaded', function () {
      window.onpopstate = function (event) {
        nav.route(document.location.pathname, event.state, false);
      }

      ctx.init();
      nav.replace(window.location.pathname, window.history.state);
    });
  },

  setRoute: function (route = '/', title = 'Home', ...callbacks) {
    nav.__routes.push({
      route: route,
      title: title,
      callbacks: callbacks
    });
  },

  route: function (route, params, addToHistory = true) {
    // routing
    nav.routing = true;
    // find the route
    for (const key in nav.__routes) {
      if (nav.__routes.hasOwnProperty(key)) {
        const item = nav.__routes[key];
        if (item.route == route) {
          // set the document title
          document.title = item.title;
          // add to windows history
          if (addToHistory) window.history.pushState(params, item.title, item.route);
          // handle route callbacks
          item.callbacks.forEach(callback => {
            if (nav.routing) callback(params);
          });
          break;
        }
      }
    }
  },

  replace: function (route, params) {
    for (const key in nav.__routes) {
      if (nav.__routes.hasOwnProperty(key)) {
        const item = nav.__routes[key];
        if (item.route == route) {
          // set the document title
          document.title = item.title;
          // replace windows history
          window.history.replaceState(params, item.title, item.route);
          // handle route callbacks
          item.callbacks.forEach(callback => {
            callback(params);
          });
          break;
        }
      }
    }
  },

  forward: function () {
    window.history.forward();
  },

  back: function () {
    window.history.back();
  }

}

  // the base app element
  const app = document.getElementsByTagName("app")[0] ?? null;

  // the template renderer
  const render = (template) => {
    let content = $(`template#${template}`)[0].innerHTML;
    let rendered = content;
    eval(`rendered = \`${content}\`;`);
    return rendered;
  }

  // query selector
  const $ = (selector) => {
    return document.querySelectorAll(selector)
  };

// extracted from umd
if (typeof module === 'object' && module.exports) {
  // Node. Does not work with strict CommonJS, but
  // only CommonJS-like environments that support module.exports,
  // like Node.
  module.exports = {
    ctx,
    nav,
    app,
    $,
    render
  };
}