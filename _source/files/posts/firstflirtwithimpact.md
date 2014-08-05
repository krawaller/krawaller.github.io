---
title: First flirt with impact
author: David
tags: [impactjs,box2d]
date: 2014-03-17
excerpt: A quick experiment with ImpactJS and Box2D
template: post.html
---

A few weekends ago, I got to shut myself in with my two brothers and a few friends in the Spotify Gothenburg office. Counterstrike, Nerf gun wars, FIFA tournaments and male bonding ensued! Most importantly, we had a night-long hack trying out Impact for the first time. So much fun!! It felt like I got a taste of LDG life, hacking away with my brothers, dividing tasks and thinking up new ideas.

As weekends have an unfortunate habit of ending we didn't get too far (also the constant temptation of another CS round didn't help), but leaving the office we did have a working prototype of a classic (same-computer) multiplayer tank game. We built with Impact and Box2D, a very nice although woefully undocumented marriage.

![iThoughts](../../img/kratank.png)

Live link [here](http://krawaller.github.io/kratankpubl/live), repo [here](https://github.com/krawaller/kratankpubl) (although with minified impact source, as per the license). Only the green tank can actually fire, which gives him a slight advantage...

###Code

The files that make up the non-impact parts of the game (i.e, what we wrote) is all in the `live/lib/game` folder. In there you'll find 5 files in an `entities` folder, who fit together like thus:

![iThoughts](../../img/kratankentities.jpg)

These files do pretty much what you'd think:

*    The `_baseclass.js` file contains the basic stuff needed for an entity to exist in the world, setting up collision etc.
*    `_playercontrolled.js` sets up controls and ties the entity to a `player`. It also contains health bar code, which should probably be abstracted out to a `_destructible.js` baseclass.
*    `tank.js` are of course the actual tanks. They mostly contain shooting code.
*    `projectile.js` destroys itself if off screen, and catches collision notification from box2D. If target is a tank (or in the future a `_destructible`), it deals damage and destroys itself.
*    `crate.js` just sets some initiation stuff such as weight and mass, and then does nothing else.
