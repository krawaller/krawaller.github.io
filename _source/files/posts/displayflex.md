---
title: Exploring a CSS3 tournament bracket
author: David
tags: [css3]
date: 2014-11-01
excerpt: "Dissecting a tournament bracket built with the CSS3 flex tech"
type: post
---

###Sports! Go team!

Since I spend my days on the bottom of the JavaScript rabbit hole my CSS fu has seriously waned. It was therefore just the other day I was made aware of the existence of the [CSS3 flexbox tech](https://developer.mozilla.org/en-US/docs/Web/CSS/flex) - holy crap, why didn't anyone tell me about this? This is seriously awesome!

While reading the [excellent guide on CSSTricks](http://css-tricks.com/snippets/css/a-guide-to-flexbox/) I stumbled upon a [really neat Codepen](http://codepen.io/aronduby/pen/qliuj) by developer [Aron Duby](http://aronduby.com/), where he used flex to build a tournament bracket without having to resort to any other positioning. Here's what it looks like:

<div class='panel tournament1'>
<main>
<ul>
<li>&nbsp;</li><li class="game game-top winner">Lousville <span>79</span></li><li>&nbsp;</li><li class="game game-bottom ">NC A&T <span>48</span></li><li>&nbsp;</li><li class="game game-top winner">Colo St <span>84</span></li><li>&nbsp;</li><li class="game game-bottom ">Missouri <span>72</span></li><li>&nbsp;</li><li class="game game-top ">Oklahoma St <span>55</span></li><li>&nbsp;</li><li class="game game-bottom winner">Oregon <span>68</span></li><li>&nbsp;</li><li class="game game-top winner">Saint Louis <span>64</span></li><li>&nbsp;</li><li class="game game-bottom ">New Mexico St <span>44</span></li><li>&nbsp;</li><li class="game game-top winner">Memphis <span>54</span></li><li>&nbsp;</li><li class="game game-bottom ">St Mary's <span>52</span></li><li>&nbsp;</li><li class="game game-top winner">Mich St <span>65</span></li><li>&nbsp;</li><li class="game game-bottom ">Valparaiso <span>54</span></li><li>&nbsp;</li><li class="game game-top winner">Creighton <span>67</span></li><li>&nbsp;</li><li class="game game-bottom ">Cincinnati <span>63</span></li><li>&nbsp;</li><li class="game game-top winner">Duke <span>73</span></li><li>&nbsp;</li><li class="game game-bottom ">Albany <span>61</span></li><li>&nbsp;</li></ul><ul><li>&nbsp;</li><li class="game game-top winner">Lousville <span>82</span></li><li>&nbsp;</li><li class="game game-bottom ">Colo St <span>56</span></li><li>&nbsp;</li><li class="game game-top winner">Oregon <span>74</span></li><li>&nbsp;</li><li class="game game-bottom ">Saint Louis <span>57</span></li><li>&nbsp;</li><li class="game game-top ">Memphis <span>48</span></li><li>&nbsp;</li><li class="game game-bottom winner">Mich St <span>70</span></li><li>&nbsp;</li><li class="game game-top ">Creighton <span>50</span></li><li>&nbsp;</li><li class="game game-bottom winner">Duke <span>66</span></li><li>&nbsp;</li></ul><ul><li>&nbsp;</li><li class="game game-top winner">Lousville <span>77</span></li><li>&nbsp;</li><li class="game game-bottom ">Oregon <span>69</span></li><li>&nbsp;</li><li class="game game-top ">Mich St <span>61</span></li><li>&nbsp;</li><li class="game game-bottom winner">Duke <span>71</span></li><li>&nbsp;</li></ul><ul><li>&nbsp;</li><li class="game game-top winner">Lousville <span>85</span></li><li>&nbsp;</li><li class="game game-bottom ">Duke <span>63</span></li><li>&nbsp;</li></ul></main>
</div>

I was intrigued - there are several tough positional problems involved here, solved effortlessly with flex. What is this magic?

###The code

I took the liberty of distilling the HTML down to its bare minimum:

```html
<main>
	<ul>
		<li>&nbsp;</li>

		<li class="game game-top winner">Lousville <span>79</span></li>
		<li>&nbsp;</li>
		<li class="game game-bottom ">NC A&T <span>48</span></li>

		<li>&nbsp;</li>
		
		<li class="game game-top winner">Colo St <span>84</span></li>
		<li>&nbsp;</li>
		<li class="game game-bottom ">Missouri <span>72</span></li>

		<li>&nbsp;</li>

		<!-- REDACTED SOME GAMES --->
		
		<li class="game game-top winner">Duke <span>73</span></li>
		<li>&nbsp;</li>
		<li class="game game-bottom ">Albany <span>61</span></li>

		<li>&nbsp;</li>
	</ul>
	<ul>
		<!-- redacted, same structure as round 1 -->
	</ul>
	<ul>
		<!-- redacted -->	
	</ul>
	<ul>
		<li>&nbsp;</li>
		
		<li class="game game-top winner">Lousville <span>85</span></li>
		<li>&nbsp;</li>
		<li class="game game-bottom ">Duke <span>63</span></li>
		
		<li>&nbsp;</li>
	</ul>		
</main>
```

And here's the magical CSS (adapted to the simpler HTML):

```css
main, ul {
  display:flex;
}

ul {
  flex-direction:column;
  width: 200px;
  list-style:none;
  padding:0;
}

.game + li {
  flex-grow:1;
}

li:first-child,li:last-child {
  flex-grow:.5;
}

.game {
  padding-left:20px;
}

.winner {
  font-weight:bold;
}

.game span {
  float:right;
  margin-right:5px;
}

.game-top {
  border-bottom:1px solid #aaa;
}

.game-top + li {
  border-right:1px solid #aaa; min-height:40px;
}

.game-bottom {
  border-top:1px solid #aaa;
}

```

###The magic

All `flex` boxes have a `flex-direction` which is `row` (default) or `column`. The `main` element is a flex row, and contains 4 `ul` elements. The flex property `align-items` defaults to `stretch`, which means that they will all get the same height.

```html
<main> <!-- flex row with align-items stretch -->
  <ul> <!-- width 200px column. this first round has most markup and will dictate height of the others -->
  <ul> <!-- width 200px column. will grow in height to match the first column -->
  <!-- ...and so on... -->
</main>
```

Now for the interesting stuff - what's actually going on inside the columns? Here's how the rules will be applied:

```html
<ul> <!-- flex column -->
  <li> <!-- first and last li will be given flex-grow .5 -->
  <li class='game-top'> <!-- home team gets a border-bottom -->
  <li> <!-- li between teams gets min-height 40, a border-right and flex-grow 1 -->
  <li class='game-bottom'> <!-- away team gets border-top -->
  <li> <!-- li between games just gets flex-grow 1 -->
  <!-- ...and so on... -->
</ul>
```

The elements with `flex-grow` will be resized to give the container its expected height, which due to `align-items` being set to `stretch` should result in columns with equal height.

The value of flex-grow dictates how much the elements should grow in proportion to each other. This means the team spacers and the game spacer `li` will all be the same height, with a minimum of 40. The first and last `li` will be half that, which is Aron's brilliant way of ensuring vertical centering inside the column without actually having to even use the (otherwise very powerful) `justify-content` flex property.

If we had not put `min-height:40px` on the spacers the first round would be totally squashed, since it due to having the tallest content is the one dictating the height of the other columns, and thus doesn't need to grow.

###Retrospective

So what did we actually do? In essence we used flex for two different things:

*    By making the outer main element a flex row we used the default `stretch` value of `align-items` to make sure the columns would get equal height. This would otherwise be difficult to do.
*    By then making each column a flex column, we used `flex-grow` to make sure the elements filled out the column height in the way we wanted. This would be really difficult by other means!

###Pseudofying

Although already seriously neat, it still felt somewhat icky having to have the spacer `li` elements in the markup. I tried to add them as pseudo elements using `:before` and `:after`, but couldn't get it to work. The reason is simple - despite their names, the pseudoclasses don't actually create the pseudo element **before** or **after** the target element, but inside them (at the top or bottom). That means the spacers wouldn't be siblings but cousins, and they wouldn't be children of the flex column. Thus the flex growth won't happen.

If there had been some css pseudo class equivalents of `:before` and `:after` that actually did create siblings to the target element, then it would have worked! But without that I don't see that it is possible to do the bracket without vilifying the markup.

The exception is the first and last spacer in the round - them we can create using pseudo classes on the columns! So we replace this rule...

```css
li:first-child,li:last-child {
  flex-grow:.5;
}
```

...with this rule...


```css
ul:before, ul:after {
  content: " ";
  display: inline-block;
  flex-grow:.5;
}
```

...and rip out the first and last spacer in each round...

```html
<main>
	<ul>
		<li class="game game-top winner">Lousville <span>79</span></li>
		<li>&nbsp;</li>
		<li class="game game-bottom ">NC A&T <span>48</span></li>

		<li>&nbsp;</li>
		
		<li class="game game-top winner">Colo St <span>84</span></li>
		<li>&nbsp;</li>
		<li class="game game-bottom ">Missouri <span>72</span></li>

		<li>&nbsp;</li>

		<!-- REDACTED SOME GAMES --->
		
		<li class="game game-top winner">Duke <span>73</span></li>
		<li>&nbsp;</li>
		<li class="game game-bottom ">Albany <span>61</span></li>
	</ul>
	<ul>
		<!-- redacted, same structure as round 1 -->
	</ul>
	<ul>
		<!-- redacted -->	
	</ul>
	<ul>
		<li class="game game-top winner">Lousville <span>85</span></li>
		<li>&nbsp;</li>
		<li class="game game-bottom ">Duke <span>63</span></li>
	</ul>		
</main>
```

...and we still get the same result as before:

<div class='panel tournament2'>
<main>
<ul>
<li class="game game-top winner">Lousville <span>79</span></li><li>&nbsp;</li><li class="game game-bottom ">NC A&T <span>48</span></li><li>&nbsp;</li><li class="game game-top winner">Colo St <span>84</span></li><li>&nbsp;</li><li class="game game-bottom ">Missouri <span>72</span></li><li>&nbsp;</li><li class="game game-top ">Oklahoma St <span>55</span></li><li>&nbsp;</li><li class="game game-bottom winner">Oregon <span>68</span></li><li>&nbsp;</li><li class="game game-top winner">Saint Louis <span>64</span></li><li>&nbsp;</li><li class="game game-bottom ">New Mexico St <span>44</span></li><li>&nbsp;</li><li class="game game-top winner">Memphis <span>54</span></li><li>&nbsp;</li><li class="game game-bottom ">St Mary's <span>52</span></li><li>&nbsp;</li><li class="game game-top winner">Mich St <span>65</span></li><li>&nbsp;</li><li class="game game-bottom ">Valparaiso <span>54</span></li><li>&nbsp;</li><li class="game game-top winner">Creighton <span>67</span></li><li>&nbsp;</li><li class="game game-bottom ">Cincinnati <span>63</span></li><li>&nbsp;</li><li class="game game-top winner">Duke <span>73</span></li><li>&nbsp;</li><li class="game game-bottom ">Albany <span>61</span></li></ul><ul><li class="game game-top winner">Lousville <span>82</span></li><li>&nbsp;</li><li class="game game-bottom ">Colo St <span>56</span></li><li>&nbsp;</li><li class="game game-top winner">Oregon <span>74</span></li><li>&nbsp;</li><li class="game game-bottom ">Saint Louis <span>57</span></li><li>&nbsp;</li><li class="game game-top ">Memphis <span>48</span></li><li>&nbsp;</li><li class="game game-bottom winner">Mich St <span>70</span></li><li>&nbsp;</li><li class="game game-top ">Creighton <span>50</span></li><li>&nbsp;</li><li class="game game-bottom winner">Duke <span>66</span></li></ul><ul><li class="game game-top winner">Lousville <span>77</span></li><li>&nbsp;</li><li class="game game-bottom ">Oregon <span>69</span></li><li>&nbsp;</li><li class="game game-top ">Mich St <span>61</span></li><li>&nbsp;</li><li class="game game-bottom winner">Duke <span>71</span></li></ul><ul><li class="game game-top winner">Lousville <span>85</span></li><li>&nbsp;</li><li class="game game-bottom ">Duke <span>63</span></li></ul></main>
</div>


###Wrapping up

I thoroughly enjoyed picking apart Aron's neat codepen, and adding flex to my toolbelt felt like it levelled up my CSS fu several times over. The already mentioned [CSSTricks guide](http://css-tricks.com/snippets/css/a-guide-to-flexbox/) really is very good, so if you've been underground for as long as me and want to catch up, go check it out!

Still, I wonder if there really is no way to create the tournament bracket without having to resort to markup spacers. This really feels like the girl who got away! If YOU are sitting on the secret, do get in touch!