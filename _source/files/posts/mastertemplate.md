---
title: Using master templates with Metalsmith
author: David
tags: [metalsmith,handlebars]
date: 2014-08-21
excerpt: How we used our hack of the metalsmith templates plugin to allow master templates
type: post
---

### Master template

Recently I [hacked the metalsmith-templates plugin](https://github.com/segmentio/metalsmith-templates/pull/21/files) to support master templates. The idea is that you pass in a `master` option, naming a master template file in the templates directory. This template will be applied to all files *after* an eventual file-specific template and/or a default template.

Here's what our call to the templates plugin looks like:

```javascript
.use(templates({
  engine: 'handlebars',
  directory: './templates',
  master:'master.hbt',
  pattern: ["*/*/*html","*html"]
}))
```

The `contents` variable in the master template file will contain the full result of the previous template, or the raw file contents if no previous template has been run. This enabled us to really clean up our page-specific templates (index, post, author, tag, etc), as they no longer needed to deal with headers and footers and the like.


### The power of partials

We have a subdirectory in the `templates` directory named `partials`. Any file put here will automatically be added as a Handlebars partial through the following loop:

```javascript
_.each(fs.readdirSync('templates/partials'),function(file){
  var name = file.split(".")[0],
      contents = fs.readFileSync(__dirname+"/templates/partials/"+file).toString();
  Handlebars.registerPartial(name,contents);
});
```

Combined with using a master template, this makes for really skinny page templates! Here's the full code for the index page template:

```html
{{#posts}}

{{> listedpost root=true}}

{{/posts}}
```

It loops through the `posts` array, and prints each post using the `listedpost` partial. Note that we're also passing a hash with extra variables which will extend the context, a syntax available since Handlebars 2.

Here's what `listedpost` looks like:

```html
<article>
  {{> posthead root=root}}
  <section class="post-excerpt">
    <p>{{excerpt}}</p>
  </section>
</article>
```

Each markdown post file on our blog contains an `excerpt` in the YAML front matter, which is what we use when we show a post in a list.

Here's the `posthead` partial, where we finally have use for the `root` variable.:

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

This partial is also used in the `post.hbt` template, hence the need for the `root` flag as a post-specific file is two levels deeper. Here's the `post.hbt` code, with some boring Disqus stuff removed:

```html

<article>
  
  {{> posthead}}

  <section class='post-content'>
  {{{contents}}}
  </section>

  <!-- Disqus code redacted --->

</article>  
```


### Page types

To centralize control over template usage, and allow for some further shortcuts in the templates, we invented the notion of page types. In all markdown files to be processed, instead of naming templates, we have a `type` variable in the YAML front matter. So far, type can be `post`, `author`, `index`, `tag` or `taglist`. For example, here's the YAML for this very post:

```yaml
title: Using master templates with Metalsmith
author: David
tags: [metalsmith,handlebars]
date: 2014-08-21
excerpt: How we used our hack of the metalsmith templates plugin to allow master templates
type: post
```

We use the `type` variable through a mini Metalsmith plugin running all files through the following `map`:

```javascript
.use(function(files,metalsmith,done){
  _.map(files,function(file){
    return file.type ? _.extend(file,{template:file.type+".hbt"},_.object(["is"+file.type],[true])) : file;
  });
  done();
})
```

Now a file with `type` set to `post` will have a `template` and `ispost` variable added like thus:

```yaml
type: post
template: post.hbt
ispost: true
```

This means that should we change templating tactics, we don't need to update all individual files, instead we can simply add some logic to our mini plugin loop.

The last thing added in the example above, `ispost: true`, allows us to simplify doing post-specific stuff in the Handlebars templates. Testing for equality in Handlebars is [complicated](http://stackoverflow.com/questions/8853396/logical-operator-in-a-handlebars-js-if-conditional), but testing truthiness is easy, which is why the `ispost` type variables are useful. As an example, here's a snippet from the master template:

```html
{{#if isindex}}
  <link rel="stylesheet" href="css/theme.css"/>
{{else}}
  <link rel="stylesheet" href="../../css/highlight.css">
  <link rel="stylesheet" href="../../css/theme.css"/>
{{/if}}
```

