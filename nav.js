const nav = {

   __routes: [],

   start: function() {
      window.addEventListener('DOMContentLoaded', function() {
         window.onpopstate = function(event) {
            nav.push(document.location.pathname, event.state);
         }
   
         nav.push(window.location.pathname, window.history.state);
      });
   },
   
   route: function(route = '/', title = 'Document', ...callbacks) {
      nav.__routes.push({
         route: route,
         title: title,
         callbacks: callbacks
      });
   },

   push: function(route, params) {
      console.log(window.history.state)
      for (const key in nav.__routes) {
         if (nav.__routes.hasOwnProperty(key)) {
            const item = nav.__routes[key];
            if (item.route == route) {
               document.title = item.title;
               window.history.state = Object.assign(window.history.state ?? {}, params ?? {});
               window.history.pushState(window.history.state, item.title, item.route);
               item.callbacks.forEach(callback => {
                  callback(window.history.state);
               });
               break;
            }
         }
      }
   },

   replace: function(route, params) {
      console.log(window.history.state)
      for (const key in nav.__routes) {
         if (nav.__routes.hasOwnProperty(key)) {
            const item = nav.__routes[key];
            if (item.route == route) {
               document.title = item.title;
               window.history.state = Object.assign(window.history.state ?? {}, params ?? {});
               window.history.replaceState(window.history.state, item.title, item.route);
               item.callbacks.forEach(callback => {
                  callback(params);
               });
               break;
            }
         }
      }
   },

   forward: function() {
      console.log(window.history.state)
      window.history.forward();
   },

   back: function() {
      console.log(window.history.state)
      window.history.back();
   },
   
   pop: function() {
      console.log(window.history.state)
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