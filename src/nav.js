'use strict'

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

// module.exports = nav;