---
template: post.html
title: "Underscore mixins"
date: 2014-05-07
tags: [Underscore]
author: David
excerpt: Some methods I usually mix into Underscore
---

Here are some methods I usually mix into Underscore:

### `ensureArray(val,emptyel)`

This method always gives you back an array. There are four different scenarios:

```javascript
// when passed an array, we get that array back:
_.ensureArray([1,2,3]); // => [1,2,3]

// when passed a truthy value that isn't an array,
// you get that value wrapped in an array:
_.ensureArray(1); // => [1]

// when passed a falsy value, we get an empty array:
_.ensureArray(undefvar); // => []

// when passed a falsy value and the optional `emptyel` parameter,
// we get that parameter in an array:
_.ensureArray(undefvar,x); // => [x]
```


The point of the method is of course to safely use an API that expects an array when you're not sure exactly what you've got. Here's the source code:

```
function(o,e){ return o ? [].concat(o) : e ? [e] : [];}

```

A [pull request](https://github.com/jashkenas/underscore/pull/816) to add this into Underscore proper was shot down by Ashkenas for being too special case and because there are other object types too with the same problem. I agree with the first sentiment but not the second; We can easily ensure booleans (`!!x`), strings (`""+x`) and numbers (`+x`), but arrays alone require logic! Converting to objects will always be domain-specific so they don't really play into this discussion.

### `mapObj(obj,iterator,context)`

The `mapObj` follows the filosophy of `map`, but returns an object instead of an array. Here's a silly example:

```
var obj = {a:1,b:2}, fn = function(i){return i*3;};

mapObj(obj,fn); // => {a:3,b:6}
```

There's been lots of pull requests and issues asking for this feature, but as it can be nicely composed and is considered to be a 
rare use case it has been denied. I however find myself very frequently needing to map objects, so being able to do that in a simple
function call cleans up the codebase nicely. Here's the source:

```javascript
function(obj,iterator,context){
	var keys = _.keys(obj);
	return _.reduce(_.map(obj,iterator,context),function(memo,val,i){
		return _.extend(_.object([keys[i]],[val]),memo);
	},{});
}
```

If you're using Lo-Dash then there is already a function called [`mapValues`](http://lodash.com/docs#mapValues) that does all of the above and more!

### `extendProp(obj,propname,src)`

This is a utility method for exending an object which is the property of another object, which works even if 
the property doesn't exist. Doing this:

```javascript
_.extend(obj[propname],src);
```

...would fail if the `propname` property is undefined.Here's the source:

```javascript
function(obj,propname,src){
	obj[propname] = _.extend(obj[propname]||{},source);
	return obj;
}
```

As the parent object is returned we can chain more operations on the target object.


### `combine(array,array,...)`

This method creates an array with all possible combinations from the given arrays, taking one element from each per combination. Here's an example:

```javascript
_.combine([1,2,3],["a","b"],[”foo","bar","baz"]);
// => [ [1,"a","foo"],[1,"a","bar"],[1,"a","baz"],[1,"b","foo"],[1,"b","bar"],[1,"b","baz"],[2,"a","foo"],[2,"a","bar"],[2,"a","baz"],[2,"b","foo"],[2,"b","bar"],[2,"b","baz"]]
```

The number of combination will equal the product of the lengths of the given arrays, and each combination will contain as many elements as the number of arrays you fed into `combine`.

This isn't something you'll need every day (which is why it was [shot down from Underscore](https://github.com/jashkenas/underscore/pull/1788)), but when you do need it, doing it manually is very verbose so a helper really cleans up the code (which is why I [tried to sell it to Underscore-contrib](https://github.com/documentcloud/underscore-contrib/pull/168) instead).

Here's the source code:

```javascript
function(){
	return _.reduce(Array.prototype.slice.call(arguments, 1),function(ret,newarr){
		return _.reduce(ret,function(memo,oldi){
			return memo.concat(_.reduce(newarr,function(m,newi){
				m.push(oldi.concat(newi));
				return m;
			},[]));
		},[]);
	},_.map(arguments[0],function(i){return [i];}));
}
```

### Mixing it in

The methods are added to underscore through the `mixin` method:

```
_.mixin({
	ensureArray: function(o,e){ return o ? [].concat(o) : e ? [e] : [];},
	mapObj: function(obj,iterator,context){
		var keys = _.keys(obj);
		return _.reduce(_.map(obj,iterator,context),function(memo,val,i){
			return _.extend(_.object([keys[i]],[val]),memo);
		},{});
	},
	extendProp: function(obj,propname,src){ obj[propname] = _.extend(obj[propname]||{},src) },
	combine: function(){
		return _.reduce(Array.prototype.slice.call(arguments, 1),function(ret,newarr){
			return _.reduce(ret,function(memo,oldi){
				return memo.concat(_.reduce(newarr,function(m,newi){
					m.push(oldi.concat(newi));
					return m;
				},[]));
			},[]);
		},_.map(arguments[0],function(i){return [i];}));
	}
});
```
