
console.log('loading app');

var $ = require('jquery');
var Template = require('template');
var handlebars = require('engine-handlebars');

// create a new instance of Template
var template = new Template();

// add `engine-handlebars` as the default handlebars engine
template.engine('.hbs', handlebars);

// simple helper function for loading templates from the DOM
var addTemplate = function (id) {
  var content = $('#' + id).html();
  template.page(id, { path: id, content: content, ext: '.hbs' });
};

// example of wrapping up the render function and adding the
// content to the output html
var render = function (output, locals) {
  locals = locals || {};
  var data = { label: 'Clicks' };
  data.value = locals.value || 0;
  template.render('component', data, function (err, content) {
    if (err) return output.html(err);
    output.html(content);
  });
};

// when the DOM is ready
$(function () {

  // add the component template to the cache
  addTemplate('component');

  // render out an initial state
  var clicks = 0;
  var output = $('#content');
  render(output, { value: clicks });

  // when the button is clicked, increment `clicks` and rerender
  $('#inc').on('click', function (ele) {
    render(output, { value: ++clicks });
  });
});
