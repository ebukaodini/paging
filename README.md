# Paging (or a collection required Frontend Components)

## nav - Navigator

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

## index.html

```html
<html>
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>App</title>
      <script src="dist/nav.js"></script>
      <script src="dist/dom.js"></script>
      <script src="dist/ctx.js"></script>
   </head>
   <body>
      <app></app>
      <script>
         nav.setRoute('/', function() {
            ctx.setState({developer: 'Frontend'})
            app.innerHTML = render('sample');
         });
         nav.start();
      </script>
      <template id='sample'>
         Hello ${ctx.state.developer} Developers!
      </template>
   </body>
</html>
```