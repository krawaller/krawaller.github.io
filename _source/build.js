var Metalsmith = require('metalsmith'),
	markdown = require('metalsmith-markdown'),
	templates = require('metalsmith-templates'),
	permalinks = require('metalsmith-permalinks'),
	metallic = require('metalsmith-metallic'),
  collections = require('metalsmith-collections'),
  Handlebars = require('handlebars'),
  path = require('path'),
  _ = require('lodash'),
	exec = require('child_process').exec;


Handlebars.registerHelper('list', function(items, options) {
  return _.reduce(items,function(memo,item){
    return memo+"<li>"+options.fn(item)+"</li>";
  },"<ul>")+"</ul>";
});

Handlebars.registerHelper('authorPosts', function(authorname, options) {
  list = _.reduce(this.articles,function(memo,a){
    return a.author === authorname ? memo + "<li>" + options.fn(a)+ "</li>" : memo;
  },"");
  return list ? "<ul>"+list+"</ul>" : options.inverse(this);
});

Handlebars.registerHelper('tagPosts', function(tagname, options) {
  console.log(tagname,this.tags["tags/"+tagname+"/index.html"]);
  return _.reduce(this.tags["tags/"+tagname+"/index.html"].posts,function(memo,f){
    return memo+"<li>"+options.fn(f)+ "</li>";
  },"<ul>")+"</ul>";
});

addtagfiles = function(opts){
  return function(files, metalsmith, done){
    var tags = _.reduce(files,function(memo,file,path){
      file.taglist = [];
      _.each(file.tags ? file.tags.split(",") : [],function(tag){
        tag = tag.replace(/\W*$/,"").replace(/^\W*/,"").toLowerCase();
        key = "tags/"+tag+"/index.html";
        memo[key] = memo[key] || {tag:tag,template:"tag.html",posts:[],contents:""};
        memo[key].posts.push(file);
        file.taglist.push("<a href='../../tags/"+tag+"'>"+tag+"</a>");
      });
      file.taglist = file.taglist.join(", ");
      console.log("TAGLIST",file.taglist);
      return memo;
    },{});
    _.extend(files,tags);
    metalsmith.metadata().tags = tags;
    done();
  };
};

Metalsmith(__dirname)
  .use(addtagfiles())
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





