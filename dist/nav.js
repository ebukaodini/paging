'use strict';

var nav = {
  __routes: [],
  routing: false,
  start: function start() {
    window.addEventListener('DOMContentLoaded', function () {
      window.onpopstate = function (event) {
        nav.route(document.location.pathname, event.state, false);
      };

      ctx.init();
      nav.replace(window.location.pathname, window.history.state);
    });
  },
  setRoute: function setRoute() {
    var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Home';

    for (var _len = arguments.length, callbacks = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      callbacks[_key - 2] = arguments[_key];
    }

    nav.__routes.push({
      route: route,
      title: title,
      callbacks: callbacks
    });
  },
  route: function route(_route, params) {
    var addToHistory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    // routing
    nav.routing = true; // find the route

    for (var key in nav.__routes) {
      if (nav.__routes.hasOwnProperty(key)) {
        var item = nav.__routes[key];

        if (item.route == _route) {
          // set the document title
          document.title = item.title; // add to windows history

          if (addToHistory) window.history.pushState(params, item.title, item.route); // handle route callbacks

          item.callbacks.forEach(function (callback) {
            if (nav.routing) callback(params);
          });
          break;
        }
      }
    }
  },
  replace: function replace(route, params) {
    for (var key in nav.__routes) {
      if (nav.__routes.hasOwnProperty(key)) {
        var item = nav.__routes[key];

        if (item.route == route) {
          // set the document title
          document.title = item.title; // replace windows history

          window.history.replaceState(params, item.title, item.route); // handle route callbacks

          item.callbacks.forEach(function (callback) {
            callback(params);
          });
          break;
        }
      }
    }
  },
  forward: function forward() {
    window.history.forward();
  },
  back: function back() {
    window.history.back();
  }
}; // module.exports = nav;