---
title: Book Review - High Performance JavaScript
author: David
tags: [review]
date: 2010-04-16
excerpt: A book review of "High Performance JavaScript" by Nicholas Zakas
type: post
---

Is the town of JavaScript performance big enough for both Souders & Zakas? Can the newly released book High Performance JavaScript hold its own against the established bible Even Faster Websites? Catch the captivating conclusion here!

![zakas vs souders](../../img/zakasvssouders.jpg)

Nicholas Zakas, of [Professional JavaScript for Web Developers](http://www.amazon.com/Professional-JavaScript-Developers-Wrox-Programmer/dp/047022780X/) authoring fame, recently had his latest book released, titled [High Performance JavaScript](http://oreilly.com/catalog/9780596802806/) (HPJS). Having found [his blog](http://www.nczonline.net/) to be an excellent resource on JavaScript insights, I was very much looking forward to this book. The fact that he'd also enlisted frontend rock stars such as&hellip;

*    [Stoyan Stefanov](http://www.phpied.com/), performance guru, writer of [Object Oriented JavaScript](https://www.packtpub.com/object-oriented-javascript-applications-libraries/book)
*    [Ross Harmes](http://techfoolery.com/), co-author of the very excellent [Pro JavaScript Design Patterns](http://jsdesignpatterns.com/)
*    Matt Sweeney, YUI architect
*    Steven Levithan, regexp wizard extraordinaire
*    Julien Lecomte, Yahoo! frontend engineer

&hellip;to contribute chapters didn't do much to damper my excitement, so I was childishly happy when the book finally knocked on my door last week!

The title of the book is of course a throwback to [Steve Souders](http://stevesouders.com/)' epitomous High Perfomance Web Sites, released a few years back by the same publisher. In much the same way it covers all aspects of performance in its chosen realm. That book gained Souders much appraise for making the web developer community at large aware of the various performance issues connected to the frontend, and how & why optimizing time was better spent there than on the backend which had previously been the prime target for such efforts. Last year Souders piggybacked on that appraise by releasing a sequel titled [Even Faster Websites](http://stevesouders.com/efws/) (EFWS), where he - along with a group of co-authors, including Zakas - delved even deeper into frontend performance.

Souders' first book touched on JavaScript here and there but in EFWS it plays a much more dominant role, being the focus of half of the chapters. Even though the context is still websites, the insights it offers can easily be applied to any realm in which JavaScript performance is a concern. This is why we used it as course literature for our university course on developing JavaScript RIA applications where it was much appreciated by the students, even though we weren't making websites as such. I myself love the book, and it is one of the most thumb-through tomes on my shelf.

My being a part of EFWS fandom was also the reason behind my prime fear regarding HPJS - just how big would the overlap between the two turn out to be? After all, the ideas behind them seem almost identical (minus the website bits); have a team of JavaScript performance ninjas each write a piece on their individual expertise. Would it really be justified to have these two books in the same shelf? Is this town big enough for the two of them?

Definitely yes. While a Venn diagram would show quite a bit of overlap;

*    HPJS chapter 1 (Loading and Execution) is largely made up of the same content as EFWS chapter 4 (Loading Scripts without blocking)
*    EFWS chapter 7 (Writing Efficient JavaScript) contains the gist of HPJS chapters 4 (Algorithms and Flow Control), 6 (Responsive Interfaces) and 8 (Programming Practices)
*    Most of HPJS chapter 9 (Building and Deploying High-Performance JavaScript Applications) can be found sprinkled across various EFWS chapters

&hellip;the books have enough diverse content, difference in tone of voice and primary focus, to make for two quite different reads.

The question of unique content, I feel, is largely moot anyway, as it is very rare to find a book containing knowledge that cannot be found elsewhere. That's not a bad thing, it's just the way of the web. When buying a programming book, you're paying for the convenience of having lots of related material collected in one place. The research behind HPJS chapter 2 (Data Access), for instance, has been detailed on Zakas' blog, just as Stoyan has already blogged a lot of what ended up in chapter 3 (DOM Scripting).

So downrating the book for being a "compilation", as one of the few not-so-positive amazon reviewers does, is rather unfair and beside the point. HPJS should be judged, instead, by how well it weaves it all together, and of course by the quality of the individual chapters. In my book, it receives top scores in both of these categories.

Some co-authored books while inevitably feel rather fragmented. There are moments in EFWS when the (very) different writing styles of contributing authors gets in the way of seeing the whole picture. Similar moments arose for me while reading the semi-recent [jQuery CookBook](http://oreilly.com/catalog/9780596159788/), which - while excellent - at times feels very schizophrenic. Of course co-authors need to be given some artistic leeway as to how they express themselves, but when they seem to have different takes on the main ideas behind the book, it becomes a problem.

This never happens in HPJS, which obviously has been the target of some very loving editing. Even though the different performance aspects have quite a different flavour, as does the writing of the contributing authors, you never lose the sense of context. The fact that the book stays true to its gospel - performance - is one of its biggest strengths.

There must have been innumerable temptations to mention non-performance related things that could be made to sort under a chapter's domain, but not fit inside the book as a whole. I'm sure, for example, that Steven Levithan bit his tongue while writing the (brilliant!) chapter on regexes, forcing himself not to share parts of his vast regexp knowledge that doesn't relate directly to performance. Because he and his peers withstood that temptation, HPJS is a better book.

Also worth mentioning is how succinct the book is. It is not very thick, but the information density is very high. While maybe not everyone's cup of tea, this is something I very much appreciate. Much like how [Crockford](http://crockford.com/)'s renowned [JavaScript - The Good Parts](http://oreilly.com/catalog/9780596517748/) delivers the message in few but well-chosen words without much air between them, HPJS is very clear and efficient in its teachings, with no filler content to increase page count.

Another merit is the "general knowledge level" of the content. Mostly, the teachings in the book are applicable to whatever JavaScript coding you're doing, today and in five years from now. We recently sang the praise of [Jonathan Stark](http://jonathanstark.com/)'s new [book on iPhone web apps](http://oreilly.com/catalog/9780596805791/), making that same point - it gives you ideas, which won't be made obsolete when the involved API:s inevitably change a few steps down the path.

So, to finally bottom-line this; the promised showdown never happened. EFWS and HPJS are partly speaking about the same things, but in different voices under different headlines to different people. Also, HPJS is a bloody brilliant book, and not owning it should be reason enough for ostracication from the frontend community.
