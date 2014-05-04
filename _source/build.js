var Metalsmith = require('metalsmith'),
	markdown = require('metalsmith-markdown'),
	templates = require('metalsmith-templates'),
	permalinks = require('metalsmith-permalinks'),
	metallic = require('metalsmith-metallic'),
  collections = require('metalsmith-collections'),
  Handlebars = require('handlebars'),
	exec = require('child_process').exec;


Handlebars.registerHelper('list', function(items, options) {
  var out = "<ul>";
  for(var i=0, l=items.length; i<l; i++) {
    out = out + "<li>" + options.fn(items[i]) + "</li>";
  }
  return out + "</ul>";
});

Metalsmith(__dirname)
  .use(collections({
    articles: 'posts/*.md'
  }))
  .use(metallic({classPrefix:''}))
  .use(markdown())
  .use(permalinks({
    pattern: 'posts/:title'
  }))
  .use(templates({
    engine: 'handlebars',
    directory: './templates'
  }))
  .source('./files')
  .destination('../.')
  .build(function(e){console.log(e);});




