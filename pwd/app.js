import page from 'page';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

(async () => {
  const app = document.querySelector('#app .outlet');
  const skeleton = document.querySelector('#app .skeleton');

  firebase.initializeApp(window.config);
  const database = firebase.database();
  const auth = firebase.auth();

  auth.onAuthStateChanged(user => {
    if (!user) {
      window.localStorage.setItem('logged', 'false');
      return console.log('Logged out');
    }
    window.localStorage.setItem('logged', 'true');
    window.localStorage.setItem('userId', user.uid);
    document.dispatchEvent(new CustomEvent('user-logged', { detail: { user } }));
  });

  page('/login', async () => {
    const loggingState = window.localStorage.getItem('logged');
    if (loggingState !== 'false') page('/');
    const module = await import('./views/signIn.js');
    const SignIn = module.default;

    const ctn = app.querySelector('[page=signin]');
    const SignInView = new SignIn(ctn);

    document.addEventListener('sing-in', ({ detail: { email, password } }) => {
      auth.createUserWithEmailAndPassword(email, password)
        .then(user => {
          console.log('Login successful', user);
          page('/');
        }).catch(console.log);
    });

    displayPage('signin');
  });


  page('/', async () => {
    const loggingState = window.localStorage.getItem('logged');
    if (loggingState === 'false') page('/login');

    const module = await import('./views/home.js');
    const Home = module.default;
  
    const messages = [];

    const ctn = app.querySelector('[page=home]');
    const HomeView = new Home(ctn);
  
    document.addEventListener('send-message', ({ detail: message }) => {
      if (!message) return;
    
      database.ref().child('/messages').push({
        content: message,
        date: Date.now(),
      });
    });

    database.ref().child('/messages').on('child_added', data => {
      if (data.val()) messages.push(data.val());
      HomeView.messages = messages;

      HomeView.renderView();
      scrollDown();
    });


    displayPage('home');
  });

  page();
})();

function scrollDown() {
  setTimeout(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, 0);
}

function displayPage(name) {
  const skeleton = document.querySelector('#app .skeleton');
  skeleton.removeAttribute('hidden');
  const pages = app.querySelectorAll('[page]');
  pages.forEach(page => page.removeAttribute('active'));
  skeleton.setAttribute('hidden', 'true');
  const p = app.querySelector(`[page="${name}"]`);
  p.setAttribute('active', true);
}