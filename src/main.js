import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';


const pages = {
  'login': [ Pages.LoginPage, {} ],
  'registrate': [ Pages.RegPage ],
  'nav': [ Pages.NavigatePage ]
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
