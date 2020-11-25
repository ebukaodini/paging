const nav = {

   __routes: [],
   __key: null,
   global: {},
   state: {},

   start: function() {
      window.addEventListener('DOMContentLoaded', function() {
         window.onpopstate = function(event) {
            nav.push(document.location.pathname, event.state, false);
         }

         window.onreadystatechange = function(event) {
            alert('Ready state');
         }
   
         nav.push(window.location.pathname, window.history.state);
      });
   },
   
   setState: function(params) {
      // add/update a property in state
      nav.state = Object.assign(nav.state ?? {}, params ?? {});
      // update the states in the local storage
      localStorage.setItem(nav.__key.toString(), JSON.stringify(nav.state));
      console.log(localStorage);
   },

   setGlobal: function(params) {
      // add/update a property in the global state
      nav.global = Object.assign(nav.global, params ?? {});
      // update the states in the local storage
      localStorage.setItem('global', JSON.stringify(nav.global));
      console.log(localStorage);
   },

   route: function(route = '/', title = 'Document', ...callbacks) {
      nav.__routes.push({
         route: route,
         title: title,
         callbacks: callbacks
      });
   },

   push: function(route, params, addToHistory = true) {
      // find the route
      for (const key in nav.__routes) {
         if (nav.__routes.hasOwnProperty(key)) {
            const item = nav.__routes[key];
            if (item.route == route) {
               // add to windows history
               if (addToHistory) window.history.pushState(params, item.title, item.route);
               // set the document title
               document.title = item.title;
               // set the route key
               nav.__key = key;
               // set the state from localStorage
               nav.state = JSON.parse(localStorage.getItem(key.toString()));
               Object.assign(nav.state ?? {}, params ?? {});
               // console.log(nav.state);
               // handle route callbacks
               item.callbacks.forEach(callback => {
                  callback(params);
               });
               break;
            }
         }
      }
   },

   replace: function(route, params) {
      for (const key in nav.__routes) {
         if (nav.__routes.hasOwnProperty(key)) {
            const item = nav.__routes[key];
            if (item.route == route) {
               document.title = item.title;
               window.history.replaceState(params, item.title, item.route);
               item.callbacks.forEach(callback => {
                  callback(params);
               });
               break;
            }
         }
      }
   },

   forward: function() {
      // console.log(nav.state)
      window.history.forward();
   },

   back: function() {
      // console.log(nav.state)
      window.history.back();
   },
   
   pop: function() {
      // console.log(nav.state)
      window.history.back();
   },

   popUntil: function(route) {
      for (const key in nav.__routes) {
         if (nav.__routes.hasOwnProperty(key)) {
            const item = nav.__routes[key];
            while (item.route != route) {
               window.history.back();
               continue;
            }
         }
      }
   }

}