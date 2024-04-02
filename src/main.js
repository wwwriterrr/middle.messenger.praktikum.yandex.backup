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
const messages = [
  {id: 3251, sender: 'Robin', avatar: '/src/assets/img/av2.jpg', msg: 'Hey there!', date: '9:32', attach: []},
  {id: 3252, sender: 'Robin', avatar: '/src/assets/img/av2.jpg', msg: 'Kept style wishing future express earnestly deficient.\n\nFavourable added moments room viewing thought rent kindness elsewhere admitting heart whose decisively ability. Gate engrossed taste excuse commanded under nor pasture gay sentiments. Folly concealed sold boisterous had means have tedious devonshire mean. Civility talked same spoil you sensible father. Sold just company repair formal elinor away absolute wondered tried dearest hung spirit no pulled. ', date: '11:41', attach: []},
  {id: 3253, sender: 'Robin', avatar: '/src/assets/img/av2.jpg', msg: 'Lasting regret sweetness curiosity. Built children anxious on. Perceive hardly sure farther drawings resembled resolved mile half miss zealously estate ﻿no enjoyment strongly down cannot. Moonlight desire indulgence indulgence joy civility greatly upon chief proposal arrival knew. Head precaution equal piqued possible continued seemed must myself mind surprise started prepare sympathize with.', date: '11:55',
    attach: [
        '/src/assets/img/attach1.jpg',
        '/src/assets/img/attach2.jpg',
        '/src/assets/img/attach3.jpg',
        '/src/assets/img/attach4.jpg',
        '/src/assets/img/attach5.jpg',
    ]},
  {id: 3254, sender: 'self', avatar: '/src/assets/img/batman.svg', msg: 'OK', date: '12:01', attach: []},
  {id: 3255, sender: 'Robin', avatar: '/src/assets/img/av2.jpg', msg: 'Stuff sooner subjects indulgence forty child theirs unpleasing supported projecting certain.', date: '12:10', attach: []},
]
const display_pages = ['login', 'registrate', 'chat', 'profile', 'Change Password', 'Change Avatar', 'Error 404', 'Error 50*', 'Remember password', 'Remember password (authenticated)'];
const pages = {
  'login': [ Pages.LoginPage ],
  'registrate': [ Pages.RegPage ],
  'chat': [ Pages.ChatPage, {chats: chats, messages: messages} ],
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
