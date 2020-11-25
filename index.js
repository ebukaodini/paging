const app = document.getElementsByTagName("app")[0];
const $ = (query) => { return document.querySelectorAll(query) };

let home = function(param) {
   nav.setState({page: 'Home'});
   app.innerHTML = template();
   funcs();
}

let setted = false;
let about = function(param) {
   if (setted == false) {
      nav.setState({page: 'About Us'});
      setted = true;
   }
   app.innerHTML = template();
   funcs();
}

let beforeContact = function(param) {
   console.log('Before going to Contact Us');
}

let contact = function(param) {
   nav.setState({page: 'Contact Us'});
   app.innerHTML = template();
   funcs();
}

let register = function(param) {
   nav.setState({page: 'Register'});
   app.innerHTML = template();
   funcs();
}

let login = function(param) {
   nav.setState({page: 'Login'});
   app.innerHTML = template() + `
   <hr>
   <input type='text' id='name' placeholder='Enter your name'>
   <button id='submit'>Login</button>
   `;
   funcs();
   $('#submit')[0].addEventListener('click', function() {
      let name = $('#name')[0].value;
      nav.setState({auth: true});
      nav.push('/dashboard', {
         name: name
      });
   })
}

let dashboard = function (param) {
   nav.setState({page: 'Login'});
   app.innerHTML = template() + `
      <button id='logout'>logout</button>
   `;
   funcs();

   $('#logout')[0].addEventListener('click', () => { nav.setState({auth: false}); nav.push('/login');});
}

let template = function() {
   return `
      <div>
         <h1>${nav.state.page}</h1>
         <span>${nav.state.auth == true ? 'User is Logged In' : 'User is not Logged In'}</span>
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
   $('#back')[0].addEventListener('click', () => nav.pop());
   $('#forward')[0].addEventListener('click', () => nav.forward());
   $('#home')[0].addEventListener('click', () => nav.push('/'));
   $('#contact')[0].addEventListener('click', () => nav.push('/contact'));
   $('#about')[0].addEventListener('click', () => nav.push('/about'));
   $('#register')[0].addEventListener('click', () => nav.push('/register'));
   $('#login')[0].addEventListener('click', () => nav.push('/login'));
}