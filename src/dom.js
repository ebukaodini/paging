// the base app element
const app = document.getElementsByTagName("app")[0];

// query selector
const $ = (selector) => { return document.querySelectorAll(selector) };

const render = (template) => {
   let content = $(`template#${template}`)[0].innerHTML;
   let rendered = content;
   eval(`rendered = \`${content}\`;`);
   return rendered;
}

// module.exports = {app, $, render};