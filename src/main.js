import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';


Handlebars.registerHelper('if_eq', function(a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});

const user_data = {
  nickname: 'Rocky',
  login: 'rocky',
  email: 'test@mail.com',
  first_name: 'John',
  last_name: 'Doe',
  phone: '+1 (321) 223-223',
}
const chats = [
  {id: 1, avatar: '/src/assets/img/av1.jpg', name: 'Batman', msg: 'Stuff sooner subjects indulgence forty child theirs unpleasing supported projecting certain.', date: '12:10', count: 4},
  {id: 2, avatar: '/src/assets/img/av2.jpg', name: 'Robin', msg: 'Up above afford furniture worse. Them dine position warrant expense he.', date: 'yda'},
  {id: 3, avatar: '/src/assets/img/av3.jpg', name: 'Pacman', msg: 'Welcomed result continued remainder endeavor tastes rank quit. ', date: 'md', count: '99+'},
  {id: 4, avatar: '/src/assets/img/av4.jpg', name: 'Rastaman', msg: 'Ready attention inquietude must differed.', date: '10.01 2021'},
  {id: 5, avatar: '/src/assets/img/av5.jpg', name: 'Gosling', msg: 'Remark impossible indeed quitting plan appearance.', date: '21.03.2019'},
]
const display_pages = ['login', 'registrate', 'chat', 'profile', 'Change Password', 'Change Avatar', 'Error 404', 'Error 50*', 'Remember password', 'Remember password (authenticated)'];
const pages = {
  'login': [ Pages.LoginPage ],
  'registrate': [ Pages.RegPage ],
  'chat': [ Pages.ChatPage, {chats: chats} ],
  'profile': [ Pages.ProfilePage, user_data ],
  'nav': [ Pages.NavigatePage, {pages: display_pages} ],

  'Change Password': [ Components.Modal, {title: 'Change password', content: Handlebars.compile(Pages.ModalChangePasswd)} ],
  'Change Avatar': [ Components.Modal, {title: 'Set avatar', content: Handlebars.compile(Pages.ModalChangeAvatar)} ],
  'Remember password': [ Pages.RememberPassword ],
  'Remember password (authenticated)': [Pages.RememberPassword, {is_authenticated: true} ],

  'Error 404': [Pages.ErrorPage, {code: 404}],
  'Error 50*': [Pages.ErrorPage, {code: 500}],
};

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});

const input_blur = (input) => {
  if(input.value.length === 0) input.classList.remove('input__element_filled');
  else input.classList.add('input__element_filled');
}

const page_init = () => {
  const inputs = document.querySelectorAll('.input__element');
  if(inputs.length !== 0){
    inputs.forEach(input => {
      if(input.type === 'password') setTimeout(()=>input_blur(input), 100);
      else input_blur(input);
      input.addEventListener('blur', () => input_blur(input));
    })
  }

  const chats = document.querySelectorAll('[chat]');
  if(chats.length !== 0){
    chats.forEach(item => {
      item.addEventListener('click', e => {
        e.preventDefault();
        e.stopImmediatePropagation();
      })
    })
  }
}

function navigate(page) {
  const [ source, context ] = pages[page];
  const container = document.getElementById('app');
  container.innerHTML = Handlebars.compile(source)(context);

  page_init();
}

document.addEventListener('DOMContentLoaded', () => {
  navigate('nav');
});

document.addEventListener('click', e => {
  //@ts-ignore
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});

document.addEventListener('submit', e => {
  e.preventDefault();
  e.stopImmediatePropagation();
})
