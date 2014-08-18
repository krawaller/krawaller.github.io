var Metalsmith = require('metalsmith'),
	markdown = require('metalsmith-markdown'),
	templates = require('./metalsmith-templates-davidhack'), //require('metalsmith-templates'), // 
	permalinks = require('metalsmith-permalinks'),
	metallic = require('metalsmith-metallic'),
  collections = require('metalsmith-collections'),
  sass = require('metalsmith-sass'),
  drafts = require('metalsmith-drafts'),
  Handlebars = require('handlebars'),
  path = require('path'),
  _ = require('lodash'),
  moment = require('moment'),
	exec = require('child_process').exec,
  fs = require('fs');

Handlebars.registerHelper('list', function(items, options) {
  return _.reduce(items,function(memo,item){
    return memo+"<li>"+options.fn(item)+"</li>";
  },"<ul>")+"</ul>";
});

Handlebars.registerHelper('authorPosts', function(authorname, options) {
  return _.reduce(this.posts,function(memo,a){
    return a.author === authorname ? memo + options.fn(a) : memo;
  },"") || options.inverse(this);
});

Handlebars.registerHelper('tagPosts', function(tagname, options) {
  return _.reduce(this.tags[tagname].posts,function(memo,f){
    return memo+options.fn(f);
  },"");
});

Handlebars.registerHelper('toLowerCase', function(str,options) {
  return str.toLowerCase();
});

Handlebars.registerHelper('moment', function(time,format){
  return moment(time).format(format);
});

Handlebars.registerHelper('snooper', function(options){
  console.log("ME:",Object.keys(this),this.path);
  return "snooped";
});

_.each(fs.readdirSync('templates/partials'),function(file){
  Handlebars.registerPartial(file.split(".")[0],fs.readFileSync(__dirname+"/templates/partials/"+file).toString());
});

tags= function(opts){
  opts = _.defaults(opts||{},{path:"tags/",yaml:{type:"tag"}});
  return function(files, metalsmith, done){
    meta = metalsmith.metadata();
    var tags = _.reduce(meta[opts.collection]||files,function(memo,file,path){
      file.tags = file.tags ? _.map(file.tags,function(t){return t.toLowerCase();}) : [];
      _.each(file.tags,function(tag){
        key = opts.path+tag+"/index.html";
        memo[key] = _.defaults({},memo[key],{tag:tag,posts:[],contents:"",title:tag},opts.yaml);
        memo[key].posts = _.sortBy(memo[key].posts.concat(file),"date").reverse();
      });
      return memo;
    },{});
    _.extend(files,tags);
    (meta[opts.collection]||meta).taglist = _.sortBy(_.reduce(tags,function(memo,tag){
      return memo.concat({tag:tag.tag,count:tag.posts.length,posts:tag.posts});
    },[]),"count").reverse();
    (meta[opts.collection]||meta).tags = _.reduce(tags,function(memo,tag){
      memo[tag.tag] = {tag:tag.tag,count:tag.posts.length,posts:tag.posts};
      return memo;
    },{});
    done();
  };
};

Metalsmith(__dirname)
  .use(drafts())
  .use(collections({posts: {pattern:'posts/*.md',sortBy:"date",reverse:true}}))
  .use(tags({path:"tags/"}))
  .use(function(files,metalsmith,done){
    _.map(files,function(file){
      return file.type ? _.extend(file,{template:file.type+".hbt"},_.object(["is"+file.type],[true])) : file;
    });
    done();
  })
  .use(metallic({classPrefix:''}))
  .use(markdown())
  .use(sass({outputStyle:"expanded"}))
  .use(permalinks({pattern: ':collection/:title'}))
  .use(templates({engine: 'handlebars',directory: './templates', master:'master.hbt', pattern: ["*/*/*html","*html"]}))
  .source('./files')
  .destination('../.')
  .build(function(e,h){if (e){throw e;}});





