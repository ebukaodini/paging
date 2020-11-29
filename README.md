# Paging (or a collection of required Frontend Components)

## nav - Navigator
The component that handle navigation in the application.
### start()

### setRoute()

### route()

### replace()

### back()

### forward()

### routing

## ctx - Context

### setState()

### removeState()

### state

## dom - DOM Manipulator

### $()

### render()

### app

## Sample
> create an `index.html` file and enter the code below
```html
<html>
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>App</title>
   </head>
   <body>
      <app></app>
      <script src="index.js"></script>
      <script>
         nav.setRoute('/', 'Home', function() {
            ctx.setState({developer: 'Frontend'})
            app.innerHTML = render('sample');
         });
         nav.setRoute('/developers', 'Developers', function() {
            ctx.setState({developer: 'All'})
            app.innerHTML = render('sample');
         });
         nav.start();
      </script>
      <template id='sample'>
         Hello ${ctx.state.developer} <a href="/developers">Developers!</a>
      </template>
   </body>
</html>
```