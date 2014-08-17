---
title: Book Review - JavaScript Patterns
author: David
tags: [review]
date: 2010-10-10
excerpt: A book review of "JavaScript Patterns" by Stoyan Stefanov
type: post
---

Back in April, Yahoo's JavaScript guru [Stoyan Stefanov](http://www.phpied.com/) set a very ambitious goal for himself; to [publish 5 books](http://www.phpied.com/publishing-5-books-this-year/) before the end of the year. An amazing feat, even when accounting for his generous definition of the task.

So, how did he fare? Well:

*    His "High Performance WebSites for dummies designers" book titled [Speed Matters](http://www.pearsoned.co.uk/bookshop/detail.asp?item=100000000397964) has been postponed to January 2011&hellip;
*    &hellip;and there's no sign of the promised 2nd edition to 2008's [Object Oriented JavaScript](https://www.packtpub.com/object-oriented-javascript-applications-libraries/book)&hellip;
*    &hellip;nor the "CSS for web devs" project.
*    But - his participation in [Nicholas Zakas](http://nczonline.net/)' [High Performance JavaScript](http://oreilly.com/catalog/9780596802806) worked out beautifully, as [previously extolled](../book-review-high-performance-javascript/) on this blog&hellip;
*    &hellip;and now, O'Reilly has released [JavaScript Patterns](http://oreilly.com/catalog/9780596806767) (JSP), a solitary book project from Stoyan on design and coding patterns in JavaScript development.

![JS Patterns](../../img/jspatterns.jpg)

Does this book deserve a place on the bookshelf of a JavaScript ninja, in spite of having a partridge on the cover? Read on to find out!

###Assumed knowledge

First question, is it at all meant for the ninjas? The book claims to be "targeted at professional developers and programmers who want to take their JavaScript skills to the next level". That's all well and good, but we've been let down by such phrases before, when the authors didn't want to lock out the much bigger and therefore more profitable beginner / intermediate audience, and so diluted the advanced concepts with lots of basic cruft. 

This, however, does not happen in JSP. Stoyan states in the preface that the basics not tying in directly to the ongoing discussion will not be covered at all, and refers instead to a list of suggested reading for those not feeling prepared enough. And throughout the book he stays true to this mission statement, consistently assuming that the reader is well versed in both JavaScript and general programming paradigms. 

This makes for a very rewarding read, where focus is kept on the matters at hand. That's not to say that it will all be new-found revelations - the first chapter presents JavaScript the language, and the second chapter (titled "Essentials") goes through the established canon of best practices. However, the former is but a few pages, and the latter is so succinct and well-written that I still felt rewarded after reading it, even though I've heard (almost) all of it before.  

###The "Pattern" concept

Now, I've been looking forward to JavaScript Patterns (JSP) ever since Stoyan's initial announcement, but the title also gave me some concern - books that are forced into an artificial mold rarely sit right with me. Take the similar cookbook approach, with the jQuery Cookbook as a somewhat recent example - while the recipe structure has its merits, that book and most of its likes would be better off organized as a "normal" book on the subject.

There's no major difference between the jQuery Cookbook and, for example, jQuery in Action. They both strive to be an all-covering go-to resource for jQuery development. But while the latter is cleanly organized and easy to use, the former is marred by the recipe concept, which sometimes seems to mean "very specific task", and then in the next chapter it is suddenly synonymous with "this broad subject". 

As given away by the title, Stoyan's book is organised in a similar fashion. Here, however, the mold fits the text like a glove. In no small part thanks to the fact that the author takes great care to define exactly what he means by "pattern", what different flavours he considers the word to encompass, and how this applies to the structure of the book. In the case of JSP, the mold is not a populistic way to make it seem more accessible, but an honest and successful attempt to organise the information.

Also, Stoyan isn't a slave to the structure, and doesn't feel forced to include the word "Pattern" in every headline. When he sees the need to break the mold he does so.

###How VS why

Also, a proper pattern collection / cookbook would probably be more like a phrasebook - serving finished solutions without explaining the nuts and bolts, and thus be of little interest to people actually wanting to learn the language. I've always shunned such books, finding that I have shorter journey if I take the time to equip myself first with an understanding of the basics.

Stoyan has had a recurring column in JSMag titled "JavaScript Patterns", in which we've been served snack-sized previews of this book. In the magazine, however, there isn't much room to elaborate on the context, so the articles in question has mostly consisted of inventorying the different ways to accomplish something (how to define an object literal, how to define a function, etc). Recipes, you could say, or phrases, if you're in a worse mood. While interesting on an academic level, I rarely looked up from one of those articles thinking "hey, I can use this". They justified their own existence, they explained for the sake of explanation, but without much connecting discussion about real-world application. 

And that was my fear - that the book, like the articles (and OOJS, to a degree), would list the different ways to create an object / emulate class inheritance / bind a function to a context / etc, without providing discussion or meaning. But, as previously stated, JSP is very different from the articles. Stoyan gives ample room to discussing the why, and all (well, most) patterns are defined with a clear goal and a problem space. We're not simply being told "42", but also what the question in question actually is.

A prime example is his chapter on inheritance - he opens it by stating that code reuse is the objective, and that the dynamic nature of JavaScript provides other and easier means to achieve that end than the classical inheritance of strongly typed languages. In fact, the chapter isn't even called inheritance, but code reuse. He of course covers emulating classes, but in a context of discussing the (lack of) merits of that approach compared to other available solutions.

###Comparisons

Here's a few comparisons between JSP and some other tomes you might already have:

*    *Pro JavaScript Design Patterns*: PJSDP is an excellent book, in which Ross Harmes and Dustin Diaz sets out to convert the design patterns popularized in the game-changing Design Patterns: Elements of Reusable Object-Oriented Software into JavaScript. This, however, means focusing on a classical approach borrowed from languages with strong types and interfaces. We might be feeling at home with that, but we would be better off embracing JavaScript's dynamic, loosely typed nature, and find solutions that work best in this environment. This is what JSP provides. And, JSP discusses "patterns" in a broader sense - where PJSDP is only concerned with design patterns, JSP hovers higher and also talks about coding patterns, meaning paradigms in a wider sense; best practices, work flows, approaches, etc. I will continue to enjoy PJSDP, but JSP is where I'll go for real-world help.

*    *High Performance JavaScript*: There is some overlap here, as JSP adresses some patterns regarding performance. These are all also found in HPJS, covered in greater detail. But mostly the books live in different problem spaces, and there's no reason not to have both in your shelf. 

*    *Object Oriented JavaScript*: OOJS has already been unfavorably compared to JSP several times in this review. There is a lot of overlap between the two, but where OOJS sets out to verbosely explain everything about object-oriented JavaScript (and everything you need to understand that explanation), JPS adresses only the bits relevant to the discussion at hand. JPS is way more succinct, and because it assumes you already have a good foundation, it can afford the luxury of high-level discussion. So: they are very similar, but JSP is the more mature of the two, speaking to a more experienced audience.

###The bottom line

I enjoyed JSP even more than I thought I would. Through being one of the few JavaScript books that dares exclude the beginner crowd completely, I would buy it no matter what. But it is definitely worth reading also from its own merits, as it is full of thoughtful discussion that is bound to expand your horizons even if you are a very seasoned JS developer. So - go get! 