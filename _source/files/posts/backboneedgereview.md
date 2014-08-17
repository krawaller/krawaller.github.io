---
title: Book Review - Developing a Backbone.js Edge
author: David
tags: [review,Backbone]
date: 2013-04-26
excerpt: A book review of "Developing a Backbone.js Edge" by Casey Foster et al
type: post
---

In the interest of full disclosure; I was given access to a free copy to conduct this review.

![iThoughts](../../img/backbonejsedge.jpg)

First off, Developing a Backbone.js Edge (DBE) is a thorough, well-written book. Commonly a book with 5 different authors will have tone and pace vary all over the place, but DBE keeps things consistent, which I appreciate.

It is very evident that the pre-production planning has been done with love; I especially like how they cover different aspects of Backbone, and then dive into that particular aspect with regards to the example application.

I'm also impressed with how DBE combines API details with high-level explanations of the "whys". You come away not only with knowledge of how to use Backbone, but also why the different design choices were made.

The example application deserves a special mention; not merely a simple Todo implementation, the Hubbub app that the book builds as you read along really has some meat to it, without being overly complex.

That said, there were some things that rubbed me the wrong way.

First off, the chapter on testing. Testing Backbone applications isn't easy, so kudos to the authors for devoting a chapter to the subject. However, one of the traps in testing Backbone code is to fail to differentiate between testing your own code and testing Backbone itself. This book does nothing to remedy that, as their testing examples fall into this exact trap. I'd go as far as to say that in this regard, this book is teaching antipatterns.

It is also needlessly confusing when describing the relationship between the properties of the options object sent when you instantiate views/models/collections and the resulting instance. Some facts are absent, some are confusingly explained, and at least one is outright wrong.

And perhaps the introduction is needlessly religious. It argues that Backbone is to prefer over framework X because of its opinionlessness, but that is definitely a matter of taste.

There are also some minor publishing quibbles; since there is no syntax highlighting at all in the code examples, they're rather difficult to read as they're very well commented (which of course should be a good thing). Also, the tables scattered throughout the book look horrible, and are unnecessarily difficult to read.

I'm also missing a chapter devoted to the Hubbub example app. As it stands, you'll only catch a glimpse of it here and there, but in order to understand what the app actually does, you have to fire up the code. A short chapter explaining its functionality would remedy that, and probably be a very interesting read, too.

But that's the complete list of quibbles I have, and as DBE as a whole is a very solid book, I definitely do recommend it.
