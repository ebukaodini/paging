const app = document.getElementsByTagName("app")[0];
const $ = (query) => { return document.querySelectorAll(query) };

let home = function() {
   app.innerHTML = `
   <div>
      <h1>Home</h1>
   </div>
   <div>
      <button id='home'>Home</button>
      <button id='contact'>Contact Us</button>
      <button id='about'>About Us</button>
      <button id='register'>Register</button>
      <button id='login'>Login</button>
   </div>
   <button id='back'>back</button>
   <button id='forward'>forward</button>
`;
   document.getElementById('contact').addEventListener('click', alert('Contact'));
   // $('#contact')[0].addEventListener('click', alert('Contact Us!'));
   // funcs();
}

let about = function(ctx) {
   app.innerHTML = template("About Us");
   funcs();
}

let contact = function(ctx) {
   app.innerHTML = template("Contact Us");
   funcs();
}

let register = function(ctx) {
   app.innerHTML = template("Register");
   funcs();
}

let login = function(ctx) {
   app.innerHTML = template("Login");
   funcs();
}

let template = function(page) {
   return `
      <div>
         <h1>${page}</h1>
      </div>
      <div>
         <button id='home'>Home</button>
         <button id='contact'>Contact Us</button>
         <button id='about'>About Us</button>
         <button id='register'>Register</button>
         <button id='login'>Login</button>
      </div>
      <button id='back'>back</button>
      <button id='forward'>forward</button>
   `;
}

let funcs = function() {
   // $('#back')[0].addEventListener('click', nav.pop());
   // $('#forward')[0].addEventListener('click', nav.forward());
   // $('#home')[0].addEventListener('click', nav.push('/'));
   // $('#contact')[0].addEventListener('click', nav.push('/contact'));
   // $('#about')[0].addEventListener('click', nav.push('/about'));
   // $('#register')[0].addEventListener('click', nav.push('/register'));
   // $('#login')[0].addEventListener('click', nav.push('/login'));
}