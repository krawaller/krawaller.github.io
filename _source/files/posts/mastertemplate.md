---
title: Using master templates with Metalsmith
author: David
tags: [metalsmith,handlebars]
date: 2014-08-18
excerpt: How we used our hack of the metalsmith templates plugin to allow master templates
type: post
draft: true
---

### Master stuff

moo we [hacked metalsmith-templates](https://github.com/segmentio/metalsmith-templates/pull/21/files) to allow master templates.


### Partials

we have a subdirectory in the `templates` directory named `partials`. Any file put here will automatically be added as a Handlebars partial through the following loop:

```javascript
_.each(fs.readdirSync('templates/partials'),function(file){
  var name = file.split(".")[0],
      contents = fs.readFileSync(__dirname+"/templates/partials/"+file).toString();
  Handlebars.registerPartial(name,contents);
});
```

Having a master template to house the head, container stuff, google analytics, etc, means the type-specific templates become really clean. Especially when partials too woo! Here's the full code for the template for the index file:

```html
{{#posts}}

{{> listedpost root=true}}

{{/posts}}
```

It loops through the `posts` array, and prints each using the `listedpost` partial. Note that we're also passing a root variable to the partial set to true.

Here's what `listedpost` looks like:

```html
<article>
  {{> posthead root=root}}
  <section class="post-excerpt">
    <p>{{excerpt}}</p>
  </section>
</article>
```

And here's `posthead`, where we finally have use for the `root` variable.:

```html
<header class="post-header">
  <h2 class="post-title">
    <a href="{{#unless root}}../../{{/unless}}{{path}}">{{{title}}}</a>
    <span class="post-meta">
      <time datetime="{{date}}">{{moment date 'MMM Do YYYY'}}</time> 
    </span>
  </h2>
    <div class='tags'>
      By: <span><a href='{{#unless root}}../../{{/unless}}about/{{toLowerCase author}}'>{{author}}</a></span>
    </div>
    <div class="tags">
      Tags:
      {{#tags}}
        <span><a href='{{#unless ../root}}../../{{/unless}}tags/{{this}}/'>{{this}}</a></span>
      {{/tags}}
    </div>
</header>
```

The `posthead` partial is also used in the `post.hbt` template, hence the need for the `root` flag. Here's the `post.hbt` code, with some boring Disqus stuff removed:

```html

<article>
  
  {{> posthead}}

  <section class='post-content'>
  {{{contents}}}
  </section>

  <!-- Disqus code redacted --->

</article>  
```


### More stuff

looping through all files bla bla:

```javascript
.use(function(files,metalsmith,done){
  _.map(files,function(file){
    return file.type ? _.extend(file,{template:file.type+".hbt"},_.object(["is"+file.type],[true])) : file;
  });
  done();
})
```

Now a file with `type` set to `post` will look like this:

```yaml
type: post
template: post.hbt
ispost: true
```

That last thing is added to simplify doing post-specific stuff in the Handlebars templates. Testing for equality in Handlebars is [complicated](http://stackoverflow.com/questions/8853396/logical-operator-in-a-handlebars-js-if-conditional), but testing truthiness is easy. For example, here's a snippet from the master template:

```html
{{#if isindex}}
  <link rel="stylesheet" href="css/theme.css"/>
{{else}}
  <link rel="stylesheet" href="../../css/highlight.css">
  <link rel="stylesheet" href="../../css/theme.css"/>
{{/if}}
```

