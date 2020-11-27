"use strict";

// the base app element
var app = document.getElementsByTagName("app")[0]; // query selector

var $ = function $(selector) {
  return document.querySelectorAll(selector);
};

var render = function render(template) {
  var content = $("template#".concat(template))[0].innerHTML;
  var rendered = content;
  eval("rendered = `".concat(content, "`;"));
  return rendered;
}; // module.exports = {app, $, render};