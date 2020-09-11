/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _confirm = __webpack_require__(/*! ./components/confirm */ 1);
	
	var _confirm2 = _interopRequireDefault(_confirm);
	
	var _nameform_ = __webpack_require__(/*! ./components/nameform_01 */ 104);
	
	var _nameform_2 = _interopRequireDefault(_nameform_);
	
	var _nameform_3 = __webpack_require__(/*! ./components/nameform_02 */ 106);
	
	var _nameform_4 = _interopRequireDefault(_nameform_3);
	
	var _nameform_5 = __webpack_require__(/*! ./components/nameform_03 */ 113);
	
	var _nameform_6 = _interopRequireDefault(_nameform_5);
	
	var _nameform_7 = __webpack_require__(/*! ./components/nameform_04 */ 120);
	
	var _nameform_8 = _interopRequireDefault(_nameform_7);
	
	var _textentry_ = __webpack_require__(/*! ./components/textentry_01 */ 105);
	
	var _textentry_2 = _interopRequireDefault(_textentry_);
	
	var _textentry_3 = __webpack_require__(/*! ./components/textentry_02 */ 107);
	
	var _textentry_4 = _interopRequireDefault(_textentry_3);
	
	var _textentry_5 = __webpack_require__(/*! ./components/textentry_03 */ 119);
	
	var _textentry_6 = _interopRequireDefault(_textentry_5);
	
	var _textentry_7 = __webpack_require__(/*! ./components/textentry_04 */ 121);
	
	var _textentry_8 = _interopRequireDefault(_textentry_7);
	
	var _dom = __webpack_require__(/*! @motorcycle/dom */ 2);
	
	var _mostRun = __webpack_require__(/*! @cycle/most-run */ 122);
	
	var _mostRun2 = _interopRequireDefault(_mostRun);
	
	var _storedriver = __webpack_require__(/*! ./storedriver */ 124);
	
	var _storedriver2 = _interopRequireDefault(_storedriver);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var apps = { confirm: _confirm2.default, nameform_01: _nameform_2.default, nameform_02: _nameform_4.default, nameform_03: _nameform_6.default, nameform_04: _nameform_8.default, textentry_01: _textentry_2.default, textentry_02: _textentry_4.default, textentry_03: _textentry_6.default, textentry_04: _textentry_8.default };
	
	window.attachApps = function () {
		Object.keys(apps).forEach(function (appname) {
			var container = document.querySelector('#app_' + appname);
			if (container) {
				var sources = { DOM: (0, _dom.makeDOMDriver)(container) };
				if (true) {
					sources.store = (0, _storedriver2.default)(appname);
				}
				_mostRun2.default.run(apps[appname], sources);
				container.classList.add("app");
				container.classList.add("showkids");
			}
		});
	};
	
	console.log("Created attach apps func");

/***/ },
/* 1 */
/*!*******************************!*\
  !*** ./components/confirm.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _dom = __webpack_require__(/*! @motorcycle/dom */ 2);
	
	var _isolate = __webpack_require__(/*! @cycle/isolate */ 103);
	
	var _isolate2 = _interopRequireDefault(_isolate);
	
	var _most = __webpack_require__(/*! most */ 4);
	
	var _most2 = _interopRequireDefault(_most);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function intent(sources) {
	  return _most2.default.mergeArray([(sources.disabled$ || _most2.default.never()).map(function (i) {
	    return i ? 'DISABLE' : 'ENABLE';
	  }), sources.DOM.select('.maybe').events('click').map(function (i) {
	    return 'MAYBE';
	  }), sources.DOM.select('.cancel').events('click').map(function (i) {
	    return 'CANCEL';
	  }), sources.DOM.select('.confirm').events('click').map(function (i) {
	    return 'CONFIRM';
	  })]);
	}
	
	function model(action$) {
	  return action$.scan(function (s, action) {
	    switch (action) {
	      case 'DISABLE':
	        return 'disabled';
	      case 'MAYBE':
	        return 'areyousure';
	      case 'ENABLE':
	        return s === 'disabled' ? 'waiting' : s;
	      default:
	        return 'waiting';
	    }
	  });
	}
	
	function view(state$) {
	  return state$.map(function (state) {
	    return (0, _dom.span)('.child', [state === 'areyousure' ? (0, _dom.span)('.confirmapp', [(0, _dom.button)('.confirm', 'Confirm'), (0, _dom.button)('.cancel', 'Cancel')]) : (0, _dom.span)('.confirmapp', ['', '', // prevents bug
	    (0, _dom.button)('.maybe', { attrs: { disabled: state === 'disabled' } }, 'Submit')])]);
	  });
	}
	
	exports.default = (0, _isolate2.default)(function (sources) {
	
	  var action$ = intent(sources);
	  var state$ = model(action$);
	  var vtree$ = view(state$);
	
	  return {
	    DOM: vtree$,
	    submit$: action$.filter(function (i) {
	      return i === 'CONFIRM';
	    })
	  };
	});

/***/ },
/* 2 */
/*!****************************************!*\
  !*** ./~/@motorcycle/dom/lib/index.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mockDOMSource = exports.makeDOMDriver = exports.video = exports.ul = exports.u = exports.tr = exports.title = exports.thead = exports.th = exports.tfoot = exports.textarea = exports.td = exports.tbody = exports.table = exports.sup = exports.sub = exports.style = exports.strong = exports.span = exports.source = exports.small = exports.select = exports.section = exports.script = exports.samp = exports.s = exports.ruby = exports.rt = exports.rp = exports.q = exports.pre = exports.param = exports.p = exports.option = exports.optgroup = exports.ol = exports.object = exports.noscript = exports.nav = exports.meta = exports.menu = exports.mark = exports.map = exports.main = exports.link = exports.li = exports.legend = exports.label = exports.keygen = exports.kbd = exports.ins = exports.input = exports.img = exports.iframe = exports.i = exports.html = exports.hr = exports.hgroup = exports.header = exports.head = exports.h6 = exports.h5 = exports.h4 = exports.h3 = exports.h2 = exports.h1 = exports.form = exports.footer = exports.figure = exports.figcaption = exports.fieldset = exports.embed = exports.em = exports.dt = exports.dl = exports.div = exports.dir = exports.dfn = exports.del = exports.dd = exports.colgroup = exports.col = exports.code = exports.cite = exports.caption = exports.canvas = exports.button = exports.br = exports.body = exports.blockquote = exports.bdo = exports.bdi = exports.base = exports.b = exports.audio = exports.aside = exports.article = exports.area = exports.address = exports.abbr = exports.a = exports.h = exports.thunk = exports.modules = undefined;
	
	var _makeDOMDriver = __webpack_require__(/*! ./makeDOMDriver */ 3);
	
	Object.defineProperty(exports, 'makeDOMDriver', {
	  enumerable: true,
	  get: function get() {
	    return _makeDOMDriver.makeDOMDriver;
	  }
	});
	
	var _mockDOMSource = __webpack_require__(/*! ./mockDOMSource */ 99);
	
	Object.defineProperty(exports, 'mockDOMSource', {
	  enumerable: true,
	  get: function get() {
	    return _mockDOMSource.mockDOMSource;
	  }
	});
	
	var _modules = __webpack_require__(/*! ./modules */ 85);
	
	var modules = _interopRequireWildcard(_modules);
	
	var _thunk = __webpack_require__(/*! snabbdom/thunk */ 100);
	
	var _thunk2 = _interopRequireDefault(_thunk);
	
	var _hyperscript = __webpack_require__(/*! ./hyperscript */ 101);
	
	var _hyperscript2 = _interopRequireDefault(_hyperscript);
	
	var _hyperscriptHelpers = __webpack_require__(/*! hyperscript-helpers */ 102);
	
	var _hyperscriptHelpers2 = _interopRequireDefault(_hyperscriptHelpers);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }newObj.default = obj;return newObj;
	  }
	}
	
	exports.modules = modules;
	exports.thunk = _thunk2.default;
	exports.h = _hyperscript2.default;
	
	var _hh = (0, _hyperscriptHelpers2.default)(_hyperscript2.default);
	
	var a = _hh.a;
	var abbr = _hh.abbr;
	var address = _hh.address;
	var area = _hh.area;
	var article = _hh.article;
	var aside = _hh.aside;
	var audio = _hh.audio;
	var b = _hh.b;
	var base = _hh.base;
	var bdi = _hh.bdi;
	var bdo = _hh.bdo;
	var blockquote = _hh.blockquote;
	var body = _hh.body;
	var br = _hh.br;
	var button = _hh.button;
	var canvas = _hh.canvas;
	var caption = _hh.caption;
	var cite = _hh.cite;
	var code = _hh.code;
	var col = _hh.col;
	var colgroup = _hh.colgroup;
	var dd = _hh.dd;
	var del = _hh.del;
	var dfn = _hh.dfn;
	var dir = _hh.dir;
	var div = _hh.div;
	var dl = _hh.dl;
	var dt = _hh.dt;
	var em = _hh.em;
	var embed = _hh.embed;
	var fieldset = _hh.fieldset;
	var figcaption = _hh.figcaption;
	var figure = _hh.figure;
	var footer = _hh.footer;
	var form = _hh.form;
	var h1 = _hh.h1;
	var h2 = _hh.h2;
	var h3 = _hh.h3;
	var h4 = _hh.h4;
	var h5 = _hh.h5;
	var h6 = _hh.h6;
	var head = _hh.head;
	var header = _hh.header;
	var hgroup = _hh.hgroup;
	var hr = _hh.hr;
	var html = _hh.html;
	var i = _hh.i;
	var iframe = _hh.iframe;
	var img = _hh.img;
	var input = _hh.input;
	var ins = _hh.ins;
	var kbd = _hh.kbd;
	var keygen = _hh.keygen;
	var label = _hh.label;
	var legend = _hh.legend;
	var li = _hh.li;
	var link = _hh.link;
	var main = _hh.main;
	var map = _hh.map;
	var mark = _hh.mark;
	var menu = _hh.menu;
	var meta = _hh.meta;
	var nav = _hh.nav;
	var noscript = _hh.noscript;
	var object = _hh.object;
	var ol = _hh.ol;
	var optgroup = _hh.optgroup;
	var option = _hh.option;
	var p = _hh.p;
	var param = _hh.param;
	var pre = _hh.pre;
	var q = _hh.q;
	var rp = _hh.rp;
	var rt = _hh.rt;
	var ruby = _hh.ruby;
	var s = _hh.s;
	var samp = _hh.samp;
	var script = _hh.script;
	var section = _hh.section;
	var select = _hh.select;
	var small = _hh.small;
	var source = _hh.source;
	var span = _hh.span;
	var strong = _hh.strong;
	var style = _hh.style;
	var sub = _hh.sub;
	var sup = _hh.sup;
	var table = _hh.table;
	var tbody = _hh.tbody;
	var td = _hh.td;
	var textarea = _hh.textarea;
	var tfoot = _hh.tfoot;
	var th = _hh.th;
	var thead = _hh.thead;
	var title = _hh.title;
	var tr = _hh.tr;
	var u = _hh.u;
	var ul = _hh.ul;
	var video = _hh.video;
	exports.a = a;
	exports.abbr = abbr;
	exports.address = address;
	exports.area = area;
	exports.article = article;
	exports.aside = aside;
	exports.audio = audio;
	exports.b = b;
	exports.base = base;
	exports.bdi = bdi;
	exports.bdo = bdo;
	exports.blockquote = blockquote;
	exports.body = body;
	exports.br = br;
	exports.button = button;
	exports.canvas = canvas;
	exports.caption = caption;
	exports.cite = cite;
	exports.code = code;
	exports.col = col;
	exports.colgroup = colgroup;
	exports.dd = dd;
	exports.del = del;
	exports.dfn = dfn;
	exports.dir = dir;
	exports.div = div;
	exports.dl = dl;
	exports.dt = dt;
	exports.em = em;
	exports.embed = embed;
	exports.fieldset = fieldset;
	exports.figcaption = figcaption;
	exports.figure = figure;
	exports.footer = footer;
	exports.form = form;
	exports.h1 = h1;
	exports.h2 = h2;
	exports.h3 = h3;
	exports.h4 = h4;
	exports.h5 = h5;
	exports.h6 = h6;
	exports.head = head;
	exports.header = header;
	exports.hgroup = hgroup;
	exports.hr = hr;
	exports.html = html;
	exports.i = i;
	exports.iframe = iframe;
	exports.img = img;
	exports.input = input;
	exports.ins = ins;
	exports.kbd = kbd;
	exports.keygen = keygen;
	exports.label = label;
	exports.legend = legend;
	exports.li = li;
	exports.link = link;
	exports.main = main;
	exports.map = map;
	exports.mark = mark;
	exports.menu = menu;
	exports.meta = meta;
	exports.nav = nav;
	exports.noscript = noscript;
	exports.object = object;
	exports.ol = ol;
	exports.optgroup = optgroup;
	exports.option = option;
	exports.p = p;
	exports.param = param;
	exports.pre = pre;
	exports.q = q;
	exports.rp = rp;
	exports.rt = rt;
	exports.ruby = ruby;
	exports.s = s;
	exports.samp = samp;
	exports.script = script;
	exports.section = section;
	exports.select = select;
	exports.small = small;
	exports.source = source;
	exports.span = span;
	exports.strong = strong;
	exports.style = style;
	exports.sub = sub;
	exports.sup = sup;
	exports.table = table;
	exports.tbody = tbody;
	exports.td = td;
	exports.textarea = textarea;
	exports.tfoot = tfoot;
	exports.th = th;
	exports.thead = thead;
	exports.title = title;
	exports.tr = tr;
	exports.u = u;
	exports.ul = ul;
	exports.video = video;

/***/ },
/* 3 */
/*!************************************************!*\
  !*** ./~/@motorcycle/dom/lib/makeDOMDriver.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.makeDOMDriver = undefined;
	
	var _most = __webpack_require__(/*! most */ 4);
	
	var _hold = __webpack_require__(/*! @most/hold */ 75);
	
	var _hold2 = _interopRequireDefault(_hold);
	
	var _snabbdom = __webpack_require__(/*! snabbdom */ 76);
	
	var _h = __webpack_require__(/*! snabbdom/h */ 80);
	
	var _h2 = _interopRequireDefault(_h);
	
	var _classNameFromVNode = __webpack_require__(/*! snabbdom-selector/lib/classNameFromVNode */ 81);
	
	var _classNameFromVNode2 = _interopRequireDefault(_classNameFromVNode);
	
	var _selectorParser2 = __webpack_require__(/*! snabbdom-selector/lib/selectorParser */ 82);
	
	var _selectorParser3 = _interopRequireDefault(_selectorParser2);
	
	var _utils = __webpack_require__(/*! ./utils */ 84);
	
	var _modules = __webpack_require__(/*! ./modules */ 85);
	
	var _modules2 = _interopRequireDefault(_modules);
	
	var _transposition = __webpack_require__(/*! ./transposition */ 92);
	
	var _isolate = __webpack_require__(/*! ./isolate */ 93);
	
	var _select = __webpack_require__(/*! ./select */ 94);
	
	var _events = __webpack_require__(/*! ./events */ 96);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	function makeVNodeWrapper(rootElement) {
	  return function vNodeWrapper(vNode) {
	    var _selectorParser = (0, _selectorParser3.default)(vNode.sel);
	
	    var selectorTagName = _selectorParser.tagName;
	    var selectorId = _selectorParser.id;
	
	    var vNodeClassName = (0, _classNameFromVNode2.default)(vNode);
	    var _vNode$data = vNode.data;
	    var vNodeData = _vNode$data === undefined ? {} : _vNode$data;
	    var _vNodeData$props = vNodeData.props;
	    var vNodeDataProps = _vNodeData$props === undefined ? {} : _vNodeData$props;
	    var _vNodeDataProps$id = vNodeDataProps.id;
	    var vNodeId = _vNodeDataProps$id === undefined ? selectorId : _vNodeDataProps$id;
	
	    var isVNodeAndRootElementIdentical = vNodeId.toUpperCase() === rootElement.id.toUpperCase() && selectorTagName.toUpperCase() === rootElement.tagName.toUpperCase() && vNodeClassName.toUpperCase() === rootElement.className.toUpperCase();
	
	    if (isVNodeAndRootElementIdentical) {
	      return vNode;
	    }
	
	    var tagName = rootElement.tagName;
	    var id = rootElement.id;
	    var className = rootElement.className;
	
	    var elementId = id ? '#' + id : '';
	    var elementClassName = className ? '.' + className.split(' ').join('.') : '';
	    return (0, _h2.default)('' + tagName + elementId + elementClassName, {}, [vNode]);
	  };
	}
	
	function DOMDriverInputGuard(view$) {
	  if (!view$ || typeof view$.observe !== 'function') {
	    throw new Error('The DOM driver function expects as input an ' + 'Observable of virtual DOM elements');
	  }
	}
	
	function defaultOnErrorFn(msg) {
	  if (console && console.error) {
	    console.error(msg);
	  } else {
	    console.log(msg);
	  }
	}
	
	var defaults = {
	  modules: _modules2.default,
	  onError: defaultOnErrorFn
	};
	
	function makeDOMDriver(container) {
	  var _ref = arguments.length <= 1 || arguments[1] === undefined ? defaults : arguments[1];
	
	  var _ref$modules = _ref.modules;
	  var modules = _ref$modules === undefined ? _modules2.default : _ref$modules;
	  var _ref$onError = _ref.onError;
	  var onError = _ref$onError === undefined ? defaultOnErrorFn : _ref$onError;
	
	  var patch = (0, _snabbdom.init)(modules);
	  var rootElement = (0, _utils.domSelectorParser)(container);
	
	  if (!Array.isArray(modules)) {
	    throw new Error('Optional modules option must be ' + 'an array for snabbdom modules');
	  }
	
	  if (typeof onError !== 'function') {
	    throw new Error('Optional onError opition must be ' + 'a function to approriately handle your errors');
	  }
	
	  function DOMDriver(view$) {
	    DOMDriverInputGuard(view$);
	
	    var rootElement$ = (0, _hold2.default)(view$.map(_transposition.transposeVTree).switch().map(makeVNodeWrapper(rootElement)).scan(patch, rootElement).skip(1).recoverWith(function (err) {
	      onError(err);
	      return (0, _most.throwError)(err);
	    }).map(function (_ref2) {
	      var elm = _ref2.elm;
	      return elm;
	    }));
	
	    rootElement$.drain();
	
	    return {
	      observable: rootElement$,
	      namespace: [],
	      select: (0, _select.makeElementSelector)(rootElement$),
	      events: (0, _events.makeEventsSelector)(rootElement$),
	      isolateSink: _isolate.isolateSink,
	      isolateSource: _isolate.isolateSource
	    };
	  }
	
	  return DOMDriver;
	}
	
	exports.makeDOMDriver = makeDOMDriver;

/***/ },
/* 4 */
/*!************************!*\
  !*** ./~/most/most.js ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Stream = __webpack_require__(/*! ./lib/Stream */ 5);
	var base = __webpack_require__(/*! @most/prelude */ 6);
	var core = __webpack_require__(/*! ./lib/source/core */ 7);
	var from = __webpack_require__(/*! ./lib/source/from */ 14).from;
	var periodic = __webpack_require__(/*! ./lib/source/periodic */ 22).periodic;
	var symbolObservable = __webpack_require__(/*! symbol-observable */ 19);
	
	/**
	 * Core stream type
	 * @type {Stream}
	 */
	exports.Stream = Stream;
	
	// Add of and empty to constructor for fantasy-land compat
	exports.of = Stream.of = core.of;
	exports.just = core.of; // easier ES6 import alias
	exports.empty = Stream.empty = core.empty;
	exports.never = core.never;
	exports.from = from;
	exports.periodic = periodic;
	
	//-----------------------------------------------------------------------
	// Draft ES Observable proposal interop
	// https://github.com/zenparsing/es-observable
	
	var subscribe = __webpack_require__(/*! ./lib/observable/subscribe */ 24).subscribe;
	
	Stream.prototype.subscribe = function (subscriber) {
	  return subscribe(subscriber, this);
	};
	
	Stream.prototype[symbolObservable] = function () {
	  return this;
	};
	
	//-----------------------------------------------------------------------
	// Fluent adapter
	
	var thru = __webpack_require__(/*! ./lib/combinator/thru */ 31).thru;
	
	/**
	 * Adapt a functional stream transform to fluent style.
	 * It applies f to the this stream object
	 * @param  {function(s: Stream): Stream} f function that
	 * receives the stream itself and must return a new stream
	 * @return {Stream}
	 */
	Stream.prototype.thru = function (f) {
	  return thru(f, this);
	};
	
	//-----------------------------------------------------------------------
	// Creating
	
	var create = __webpack_require__(/*! ./lib/source/create */ 32);
	
	/**
	 * @deprecated
	 * Create a stream by imperatively pushing events.
	 * @param {function(add:function(x), end:function(e)):function} run function
	 *  that will receive 2 functions as arguments, the first to add new values to the
	 *  stream and the second to end the stream. It may *return* a function that
	 *  will be called once all consumers have stopped observing the stream.
	 * @returns {Stream} stream containing all events added by run before end
	 */
	exports.create = create.create;
	
	//-----------------------------------------------------------------------
	// Adapting other sources
	
	var events = __webpack_require__(/*! ./lib/source/fromEvent */ 35);
	
	/**
	 * Create a stream of events from the supplied EventTarget or EventEmitter
	 * @param {String} event event name
	 * @param {EventTarget|EventEmitter} source EventTarget or EventEmitter. The source
	 *  must support either addEventListener/removeEventListener (w3c EventTarget:
	 *  http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget),
	 *  or addListener/removeListener (node EventEmitter: http://nodejs.org/api/events.html)
	 * @returns {Stream} stream of events of the specified type from the source
	 */
	exports.fromEvent = events.fromEvent;
	
	//-----------------------------------------------------------------------
	// Observing
	
	var observe = __webpack_require__(/*! ./lib/combinator/observe */ 38);
	
	exports.observe = observe.observe;
	exports.forEach = observe.observe;
	exports.drain = observe.drain;
	
	/**
	 * Process all the events in the stream
	 * @returns {Promise} promise that fulfills when the stream ends, or rejects
	 *  if the stream fails with an unhandled error.
	 */
	Stream.prototype.observe = Stream.prototype.forEach = function (f) {
	  return observe.observe(f, this);
	};
	
	/**
	 * Consume all events in the stream, without providing a function to process each.
	 * This causes a stream to become active and begin emitting events, and is useful
	 * in cases where all processing has been setup upstream via other combinators, and
	 * there is no need to process the terminal events.
	 * @returns {Promise} promise that fulfills when the stream ends, or rejects
	 *  if the stream fails with an unhandled error.
	 */
	Stream.prototype.drain = function () {
	  return observe.drain(this);
	};
	
	//-------------------------------------------------------
	
	var loop = __webpack_require__(/*! ./lib/combinator/loop */ 45).loop;
	
	exports.loop = loop;
	
	/**
	 * Generalized feedback loop. Call a stepper function for each event. The stepper
	 * will be called with 2 params: the current seed and the an event value.  It must
	 * return a new { seed, value } pair. The `seed` will be fed back into the next
	 * invocation of stepper, and the `value` will be propagated as the event value.
	 * @param {function(seed:*, value:*):{seed:*, value:*}} stepper loop step function
	 * @param {*} seed initial seed value passed to first stepper call
	 * @returns {Stream} new stream whose values are the `value` field of the objects
	 * returned by the stepper
	 */
	Stream.prototype.loop = function (stepper, seed) {
	  return loop(stepper, seed, this);
	};
	
	//-------------------------------------------------------
	
	var accumulate = __webpack_require__(/*! ./lib/combinator/accumulate */ 46);
	
	exports.scan = accumulate.scan;
	exports.reduce = accumulate.reduce;
	
	/**
	 * Create a stream containing successive reduce results of applying f to
	 * the previous reduce result and the current stream item.
	 * @param {function(result:*, x:*):*} f reducer function
	 * @param {*} initial initial value
	 * @returns {Stream} new stream containing successive reduce results
	 */
	Stream.prototype.scan = function (f, initial) {
	  return accumulate.scan(f, initial, this);
	};
	
	/**
	 * Reduce the stream to produce a single result.  Note that reducing an infinite
	 * stream will return a Promise that never fulfills, but that may reject if an error
	 * occurs.
	 * @param {function(result:*, x:*):*} f reducer function
	 * @param {*} initial optional initial value
	 * @returns {Promise} promise for the file result of the reduce
	 */
	Stream.prototype.reduce = function (f, initial) {
	  return accumulate.reduce(f, initial, this);
	};
	
	//-----------------------------------------------------------------------
	// Building and extending
	
	var unfold = __webpack_require__(/*! ./lib/source/unfold */ 47);
	var iterate = __webpack_require__(/*! ./lib/source/iterate */ 48);
	var generate = __webpack_require__(/*! ./lib/source/generate */ 49);
	var build = __webpack_require__(/*! ./lib/combinator/build */ 50);
	
	exports.unfold = unfold.unfold;
	exports.iterate = iterate.iterate;
	exports.generate = generate.generate;
	exports.cycle = build.cycle;
	exports.concat = build.concat;
	exports.startWith = build.cons;
	
	/**
	 * @deprecated
	 * Tie this stream into a circle, thus creating an infinite stream
	 * @returns {Stream} new infinite stream
	 */
	Stream.prototype.cycle = function () {
	  return build.cycle(this);
	};
	
	/**
	 * @param {Stream} tail
	 * @returns {Stream} new stream containing all items in this followed by
	 *  all items in tail
	 */
	Stream.prototype.concat = function (tail) {
	  return build.concat(this, tail);
	};
	
	/**
	 * @param {*} x value to prepend
	 * @returns {Stream} a new stream with x prepended
	 */
	Stream.prototype.startWith = function (x) {
	  return build.cons(x, this);
	};
	
	//-----------------------------------------------------------------------
	// Transforming
	
	var transform = __webpack_require__(/*! ./lib/combinator/transform */ 40);
	var applicative = __webpack_require__(/*! ./lib/combinator/applicative */ 52);
	
	exports.map = transform.map;
	exports.constant = transform.constant;
	exports.tap = transform.tap;
	exports.ap = applicative.ap;
	
	/**
	 * Transform each value in the stream by applying f to each
	 * @param {function(*):*} f mapping function
	 * @returns {Stream} stream containing items transformed by f
	 */
	Stream.prototype.map = function (f) {
	  return transform.map(f, this);
	};
	
	/**
	 * Assume this stream contains functions, and apply each function to each item
	 * in the provided stream.  This generates, in effect, a cross product.
	 * @param {Stream} xs stream of items to which
	 * @returns {Stream} stream containing the cross product of items
	 */
	Stream.prototype.ap = function (xs) {
	  return applicative.ap(this, xs);
	};
	
	/**
	 * Replace each value in the stream with x
	 * @param {*} x
	 * @returns {Stream} stream containing items replaced with x
	 */
	Stream.prototype.constant = function (x) {
	  return transform.constant(x, this);
	};
	
	/**
	 * Perform a side effect for each item in the stream
	 * @param {function(x:*):*} f side effect to execute for each item. The
	 *  return value will be discarded.
	 * @returns {Stream} new stream containing the same items as this stream
	 */
	Stream.prototype.tap = function (f) {
	  return transform.tap(f, this);
	};
	
	//-----------------------------------------------------------------------
	// Transducer support
	
	var transduce = __webpack_require__(/*! ./lib/combinator/transduce */ 56);
	
	exports.transduce = transduce.transduce;
	
	/**
	 * Transform this stream by passing its events through a transducer.
	 * @param  {function} transducer transducer function
	 * @return {Stream} stream of events transformed by the transducer
	 */
	Stream.prototype.transduce = function (transducer) {
	  return transduce.transduce(transducer, this);
	};
	
	//-----------------------------------------------------------------------
	// FlatMapping
	
	var flatMap = __webpack_require__(/*! ./lib/combinator/flatMap */ 57);
	
	exports.flatMap = exports.chain = flatMap.flatMap;
	exports.join = flatMap.join;
	
	/**
	 * Map each value in the stream to a new stream, and merge it into the
	 * returned outer stream. Event arrival times are preserved.
	 * @param {function(x:*):Stream} f chaining function, must return a Stream
	 * @returns {Stream} new stream containing all events from each stream returned by f
	 */
	Stream.prototype.flatMap = Stream.prototype.chain = function (f) {
	  return flatMap.flatMap(f, this);
	};
	
	/**
	 * Monadic join. Flatten a Stream<Stream<X>> to Stream<X> by merging inner
	 * streams to the outer. Event arrival times are preserved.
	 * @returns {Stream<X>} new stream containing all events of all inner streams
	 */
	Stream.prototype.join = function () {
	  return flatMap.join(this);
	};
	
	var continueWith = __webpack_require__(/*! ./lib/combinator/continueWith */ 51).continueWith;
	
	exports.continueWith = continueWith;
	exports.flatMapEnd = continueWith;
	
	/**
	 * Map the end event to a new stream, and begin emitting its values.
	 * @param {function(x:*):Stream} f function that receives the end event value,
	 * and *must* return a new Stream to continue with.
	 * @returns {Stream} new stream that emits all events from the original stream,
	 * followed by all events from the stream returned by f.
	 */
	Stream.prototype.continueWith = Stream.prototype.flatMapEnd = function (f) {
	  return continueWith(f, this);
	};
	
	var concatMap = __webpack_require__(/*! ./lib/combinator/concatMap */ 60).concatMap;
	
	exports.concatMap = concatMap;
	
	Stream.prototype.concatMap = function (f) {
	  return concatMap(f, this);
	};
	
	//-----------------------------------------------------------------------
	// Concurrent merging
	
	var mergeConcurrently = __webpack_require__(/*! ./lib/combinator/mergeConcurrently */ 58);
	
	exports.mergeConcurrently = mergeConcurrently.mergeConcurrently;
	
	/**
	 * Flatten a Stream<Stream<X>> to Stream<X> by merging inner
	 * streams to the outer, limiting the number of inner streams that may
	 * be active concurrently.
	 * @param {number} concurrency at most this many inner streams will be
	 *  allowed to be active concurrently.
	 * @return {Stream<X>} new stream containing all events of all inner
	 *  streams, with limited concurrency.
	 */
	Stream.prototype.mergeConcurrently = function (concurrency) {
	  return mergeConcurrently.mergeConcurrently(concurrency, this);
	};
	
	//-----------------------------------------------------------------------
	// Merging
	
	var merge = __webpack_require__(/*! ./lib/combinator/merge */ 61);
	
	exports.merge = merge.merge;
	exports.mergeArray = merge.mergeArray;
	
	/**
	 * Merge this stream and all the provided streams
	 * @returns {Stream} stream containing items from this stream and s in time
	 * order.  If two events are simultaneous they will be merged in
	 * arbitrary order.
	 */
	Stream.prototype.merge = function () /*...streams*/{
	  return merge.mergeArray(base.cons(this, arguments));
	};
	
	//-----------------------------------------------------------------------
	// Combining
	
	var combine = __webpack_require__(/*! ./lib/combinator/combine */ 53);
	
	exports.combine = combine.combine;
	exports.combineArray = combine.combineArray;
	
	/**
	 * Combine latest events from all input streams
	 * @param {function(...events):*} f function to combine most recent events
	 * @returns {Stream} stream containing the result of applying f to the most recent
	 *  event of each input stream, whenever a new event arrives on any stream.
	 */
	Stream.prototype.combine = function (f /*, ...streams*/) {
	  return combine.combineArray(f, base.replace(this, 0, arguments));
	};
	
	//-----------------------------------------------------------------------
	// Sampling
	
	var sample = __webpack_require__(/*! ./lib/combinator/sample */ 62);
	
	exports.sample = sample.sample;
	exports.sampleWith = sample.sampleWith;
	
	/**
	 * When an event arrives on sampler, emit the latest event value from stream.
	 * @param {Stream} sampler stream of events at whose arrival time
	 *  signal's latest value will be propagated
	 * @returns {Stream} sampled stream of values
	 */
	Stream.prototype.sampleWith = function (sampler) {
	  return sample.sampleWith(sampler, this);
	};
	
	/**
	 * When an event arrives on this stream, emit the result of calling f with the latest
	 * values of all streams being sampled
	 * @param {function(...values):*} f function to apply to each set of sampled values
	 * @returns {Stream} stream of sampled and transformed values
	 */
	Stream.prototype.sample = function (f /* ...streams */) {
	  return sample.sampleArray(f, this, base.tail(arguments));
	};
	
	//-----------------------------------------------------------------------
	// Zipping
	
	var zip = __webpack_require__(/*! ./lib/combinator/zip */ 63);
	
	exports.zip = zip.zip;
	
	/**
	 * Pair-wise combine items with those in s. Given 2 streams:
	 * [1,2,3] zipWith f [4,5,6] -> [f(1,4),f(2,5),f(3,6)]
	 * Note: zip causes fast streams to buffer and wait for slow streams.
	 * @param {function(a:Stream, b:Stream, ...):*} f function to combine items
	 * @returns {Stream} new stream containing pairs
	 */
	Stream.prototype.zip = function (f /*, ...streams*/) {
	  return zip.zipArray(f, base.replace(this, 0, arguments));
	};
	
	//-----------------------------------------------------------------------
	// Switching
	
	var switchLatest = __webpack_require__(/*! ./lib/combinator/switch */ 65).switch;
	
	exports.switch = switchLatest;
	exports.switchLatest = switchLatest;
	
	/**
	 * Given a stream of streams, return a new stream that adopts the behavior
	 * of the most recent inner stream.
	 * @returns {Stream} switching stream
	 */
	Stream.prototype.switch = Stream.prototype.switchLatest = function () {
	  return switchLatest(this);
	};
	
	//-----------------------------------------------------------------------
	// Filtering
	
	var filter = __webpack_require__(/*! ./lib/combinator/filter */ 66);
	
	exports.filter = filter.filter;
	exports.skipRepeats = exports.distinct = filter.skipRepeats;
	exports.skipRepeatsWith = exports.distinctBy = filter.skipRepeatsWith;
	
	/**
	 * Retain only items matching a predicate
	 * stream:                           -12345678-
	 * filter(x => x % 2 === 0, stream): --2-4-6-8-
	 * @param {function(x:*):boolean} p filtering predicate called for each item
	 * @returns {Stream} stream containing only items for which predicate returns truthy
	 */
	Stream.prototype.filter = function (p) {
	  return filter.filter(p, this);
	};
	
	/**
	 * Skip repeated events, using === to compare items
	 * stream:           -abbcd-
	 * distinct(stream): -ab-cd-
	 * @returns {Stream} stream with no repeated events
	 */
	Stream.prototype.skipRepeats = function () {
	  return filter.skipRepeats(this);
	};
	
	/**
	 * Skip repeated events, using supplied equals function to compare items
	 * @param {function(a:*, b:*):boolean} equals function to compare items
	 * @returns {Stream} stream with no repeated events
	 */
	Stream.prototype.skipRepeatsWith = function (equals) {
	  return filter.skipRepeatsWith(equals, this);
	};
	
	//-----------------------------------------------------------------------
	// Slicing
	
	var slice = __webpack_require__(/*! ./lib/combinator/slice */ 67);
	
	exports.take = slice.take;
	exports.skip = slice.skip;
	exports.slice = slice.slice;
	exports.takeWhile = slice.takeWhile;
	exports.skipWhile = slice.skipWhile;
	
	/**
	 * stream:          -abcd-
	 * take(2, stream): -ab|
	 * @param {Number} n take up to this many events
	 * @returns {Stream} stream containing at most the first n items from this stream
	 */
	Stream.prototype.take = function (n) {
	  return slice.take(n, this);
	};
	
	/**
	 * stream:          -abcd->
	 * skip(2, stream): ---cd->
	 * @param {Number} n skip this many events
	 * @returns {Stream} stream not containing the first n events
	 */
	Stream.prototype.skip = function (n) {
	  return slice.skip(n, this);
	};
	
	/**
	 * Slice a stream by event index. Equivalent to, but more efficient than
	 * stream.take(end).skip(start);
	 * NOTE: Negative start and end are not supported
	 * @param {Number} start skip all events before the start index
	 * @param {Number} end allow all events from the start index to the end index
	 * @returns {Stream} stream containing items where start <= index < end
	 */
	Stream.prototype.slice = function (start, end) {
	  return slice.slice(start, end, this);
	};
	
	/**
	 * stream:                        -123451234->
	 * takeWhile(x => x < 5, stream): -1234|
	 * @param {function(x:*):boolean} p predicate
	 * @returns {Stream} stream containing items up to, but not including, the
	 * first item for which p returns falsy.
	 */
	Stream.prototype.takeWhile = function (p) {
	  return slice.takeWhile(p, this);
	};
	
	/**
	 * stream:                        -123451234->
	 * skipWhile(x => x < 5, stream): -----51234->
	 * @param {function(x:*):boolean} p predicate
	 * @returns {Stream} stream containing items following *and including* the
	 * first item for which p returns falsy.
	 */
	Stream.prototype.skipWhile = function (p) {
	  return slice.skipWhile(p, this);
	};
	
	//-----------------------------------------------------------------------
	// Time slicing
	
	var timeslice = __webpack_require__(/*! ./lib/combinator/timeslice */ 68);
	
	exports.until = exports.takeUntil = timeslice.takeUntil;
	exports.since = exports.skipUntil = timeslice.skipUntil;
	exports.during = timeslice.during;
	
	/**
	 * stream:                    -a-b-c-d-e-f-g->
	 * signal:                    -------x
	 * takeUntil(signal, stream): -a-b-c-|
	 * @param {Stream} signal retain only events in stream before the first
	 * event in signal
	 * @returns {Stream} new stream containing only events that occur before
	 * the first event in signal.
	 */
	Stream.prototype.until = Stream.prototype.takeUntil = function (signal) {
	  return timeslice.takeUntil(signal, this);
	};
	
	/**
	 * stream:                    -a-b-c-d-e-f-g->
	 * signal:                    -------x
	 * takeUntil(signal, stream): -------d-e-f-g->
	 * @param {Stream} signal retain only events in stream at or after the first
	 * event in signal
	 * @returns {Stream} new stream containing only events that occur after
	 * the first event in signal.
	 */
	Stream.prototype.since = Stream.prototype.skipUntil = function (signal) {
	  return timeslice.skipUntil(signal, this);
	};
	
	/**
	 * stream:                    -a-b-c-d-e-f-g->
	 * timeWindow:                -----s
	 * s:                               -----t
	 * stream.during(timeWindow): -----c-d-e-|
	 * @param {Stream<Stream>} timeWindow a stream whose first event (s) represents
	 *  the window start time.  That event (s) is itself a stream whose first event (t)
	 *  represents the window end time
	 * @returns {Stream} new stream containing only events within the provided timespan
	 */
	Stream.prototype.during = function (timeWindow) {
	  return timeslice.during(timeWindow, this);
	};
	
	//-----------------------------------------------------------------------
	// Delaying
	
	var delay = __webpack_require__(/*! ./lib/combinator/delay */ 69).delay;
	
	exports.delay = delay;
	
	/**
	 * @param {Number} delayTime milliseconds to delay each item
	 * @returns {Stream} new stream containing the same items, but delayed by ms
	 */
	Stream.prototype.delay = function (delayTime) {
	  return delay(delayTime, this);
	};
	
	//-----------------------------------------------------------------------
	// Getting event timestamp
	
	var timestamp = __webpack_require__(/*! ./lib/combinator/timestamp */ 70).timestamp;
	
	exports.timestamp = timestamp;
	
	/**
	 * Expose event timestamps into the stream. Turns a Stream<X> into
	 * Stream<{time:t, value:X}>
	 * @returns {Stream<{time:number, value:*}>}
	 */
	Stream.prototype.timestamp = function () {
	  return timestamp(this);
	};
	
	//-----------------------------------------------------------------------
	// Rate limiting
	
	var limit = __webpack_require__(/*! ./lib/combinator/limit */ 71);
	
	exports.throttle = limit.throttle;
	exports.debounce = limit.debounce;
	
	/**
	 * Limit the rate of events
	 * stream:              abcd----abcd----
	 * throttle(2, stream): a-c-----a-c-----
	 * @param {Number} period time to suppress events
	 * @returns {Stream} new stream that skips events for throttle period
	 */
	Stream.prototype.throttle = function (period) {
	  return limit.throttle(period, this);
	};
	
	/**
	 * Wait for a burst of events to subside and emit only the last event in the burst
	 * stream:              abcd----abcd----
	 * debounce(2, stream): -----d-------d--
	 * @param {Number} period events occuring more frequently than this
	 *  on the provided scheduler will be suppressed
	 * @returns {Stream} new debounced stream
	 */
	Stream.prototype.debounce = function (period) {
	  return limit.debounce(period, this);
	};
	
	//-----------------------------------------------------------------------
	// Awaiting Promises
	
	var promises = __webpack_require__(/*! ./lib/combinator/promises */ 72);
	
	exports.fromPromise = promises.fromPromise;
	exports.await = promises.awaitPromises;
	
	/**
	 * Await promises, turning a Stream<Promise<X>> into Stream<X>.  Preserves
	 * event order, but timeshifts events based on promise resolution time.
	 * @returns {Stream<X>} stream containing non-promise values
	 */
	Stream.prototype.await = function () {
	  return promises.awaitPromises(this);
	};
	
	//-----------------------------------------------------------------------
	// Error handling
	
	var errors = __webpack_require__(/*! ./lib/combinator/errors */ 73);
	
	exports.recoverWith = errors.flatMapError;
	exports.flatMapError = errors.flatMapError;
	exports.throwError = errors.throwError;
	
	/**
	 * If this stream encounters an error, recover and continue with items from stream
	 * returned by f.
	 * stream:                  -a-b-c-X-
	 * f(X):                           d-e-f-g-
	 * flatMapError(f, stream): -a-b-c-d-e-f-g-
	 * @param {function(error:*):Stream} f function which returns a new stream
	 * @returns {Stream} new stream which will recover from an error by calling f
	 */
	Stream.prototype.recoverWith = Stream.prototype.flatMapError = function (f) {
	  return errors.flatMapError(f, this);
	};
	
	//-----------------------------------------------------------------------
	// Multicasting
	
	var multicast = __webpack_require__(/*! @most/multicast */ 23).default;
	
	exports.multicast = multicast;
	
	/**
	 * Transform the stream into multicast stream.  That means that many subscribers
	 * to the stream will not cause multiple invocations of the internal machinery.
	 * @returns {Stream} new stream which will multicast events to all observers.
	 */
	Stream.prototype.multicast = function () {
	  return multicast(this);
	};

/***/ },
/* 5 */
/*!******************************!*\
  !*** ./~/most/lib/Stream.js ***!
  \******************************/
/***/ function(module, exports) {

	"use strict";
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	module.exports = Stream;
	
	function Stream(source) {
		this.source = source;
	}

/***/ },
/* 6 */
/*!*****************************************!*\
  !*** ./~/@most/prelude/dist/prelude.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports);
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports);
	    global.mostPrelude = mod.exports;
	  }
	})(undefined, function (exports) {
	  'use strict';
	
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  /** @license MIT License (c) copyright 2010-2016 original author or authors */
	
	  // Non-mutating array operations
	
	  // cons :: a -> [a] -> [a]
	  // a with x prepended
	  function cons(x, a) {
	    var l = a.length;
	    var b = new Array(l + 1);
	    b[0] = x;
	    for (var i = 0; i < l; ++i) {
	      b[i + 1] = a[i];
	    }
	    return b;
	  }
	
	  // append :: a -> [a] -> [a]
	  // a with x appended
	  function append(x, a) {
	    var l = a.length;
	    var b = new Array(l + 1);
	    for (var i = 0; i < l; ++i) {
	      b[i] = a[i];
	    }
	
	    b[l] = x;
	    return b;
	  }
	
	  // drop :: Int -> [a] -> [a]
	  // drop first n elements
	  function drop(n, a) {
	    // eslint-disable-line complexity
	    if (n < 0) {
	      throw new TypeError('n must be >= 0');
	    }
	
	    var l = a.length;
	    if (n === 0 || l === 0) {
	      return a;
	    }
	
	    if (n >= l) {
	      return [];
	    }
	
	    return unsafeDrop(n, a, l - n);
	  }
	
	  // unsafeDrop :: Int -> [a] -> Int -> [a]
	  // Internal helper for drop
	  function unsafeDrop(n, a, l) {
	    var b = new Array(l);
	    for (var i = 0; i < l; ++i) {
	      b[i] = a[n + i];
	    }
	    return b;
	  }
	
	  // tail :: [a] -> [a]
	  // drop head element
	  function tail(a) {
	    return drop(1, a);
	  }
	
	  // copy :: [a] -> [a]
	  // duplicate a (shallow duplication)
	  function copy(a) {
	    var l = a.length;
	    var b = new Array(l);
	    for (var i = 0; i < l; ++i) {
	      b[i] = a[i];
	    }
	    return b;
	  }
	
	  // map :: (a -> b) -> [a] -> [b]
	  // transform each element with f
	  function map(f, a) {
	    var l = a.length;
	    var b = new Array(l);
	    for (var i = 0; i < l; ++i) {
	      b[i] = f(a[i]);
	    }
	    return b;
	  }
	
	  // reduce :: (a -> b -> a) -> a -> [b] -> a
	  // accumulate via left-fold
	  function reduce(f, z, a) {
	    var r = z;
	    for (var i = 0, l = a.length; i < l; ++i) {
	      r = f(r, a[i], i);
	    }
	    return r;
	  }
	
	  // replace :: a -> Int -> [a]
	  // replace element at index
	  function replace(x, i, a) {
	    // eslint-disable-line complexity
	    if (i < 0) {
	      throw new TypeError('i must be >= 0');
	    }
	
	    var l = a.length;
	    var b = new Array(l);
	    for (var j = 0; j < l; ++j) {
	      b[j] = i === j ? x : a[j];
	    }
	    return b;
	  }
	
	  // remove :: Int -> [a] -> [a]
	  // remove element at index
	  function remove(i, a) {
	    // eslint-disable-line complexity
	    if (i < 0) {
	      throw new TypeError('i must be >= 0');
	    }
	
	    var l = a.length;
	    if (l === 0 || i >= l) {
	      // exit early if index beyond end of array
	      return a;
	    }
	
	    if (l === 1) {
	      // exit early if index in bounds and length === 1
	      return [];
	    }
	
	    return unsafeRemove(i, a, l - 1);
	  }
	
	  // unsafeRemove :: Int -> [a] -> Int -> [a]
	  // Internal helper to remove element at index
	  function unsafeRemove(i, a, l) {
	    var b = new Array(l);
	    var j = void 0;
	    for (j = 0; j < i; ++j) {
	      b[j] = a[j];
	    }
	    for (j = i; j < l; ++j) {
	      b[j] = a[j + 1];
	    }
	
	    return b;
	  }
	
	  // removeAll :: (a -> boolean) -> [a] -> [a]
	  // remove all elements matching a predicate
	  function removeAll(f, a) {
	    var l = a.length;
	    var b = new Array(l);
	    var j = 0;
	    for (var x, i = 0; i < l; ++i) {
	      x = a[i];
	      if (!f(x)) {
	        b[j] = x;
	        ++j;
	      }
	    }
	
	    b.length = j;
	    return b;
	  }
	
	  // findIndex :: a -> [a] -> Int
	  // find index of x in a, from the left
	  function findIndex(x, a) {
	    for (var i = 0, l = a.length; i < l; ++i) {
	      if (x === a[i]) {
	        return i;
	      }
	    }
	    return -1;
	  }
	
	  // isArrayLike :: * -> boolean
	  // Return true iff x is array-like
	  function isArrayLike(x) {
	    return x != null && typeof x.length === 'number' && typeof x !== 'function';
	  }
	
	  /** @license MIT License (c) copyright 2010-2016 original author or authors */
	
	  // id :: a -> a
	  var id = function id(x) {
	    return x;
	  };
	
	  // compose :: (b -> c) -> (a -> b) -> (a -> c)
	  var compose = function compose(f, g) {
	    return function (x) {
	      return f(g(x));
	    };
	  };
	
	  // apply :: (a -> b) -> a -> b
	  var apply = function apply(f, x) {
	    return f(x);
	  };
	
	  // curry2 :: ((a, b) -> c) -> (a -> b -> c)
	  function curry2(f) {
	    function curried(a, b) {
	      switch (arguments.length) {
	        case 0:
	          return curried;
	        case 1:
	          return function (b) {
	            return f(a, b);
	          };
	        default:
	          return f(a, b);
	      }
	    }
	    return curried;
	  }
	
	  // curry3 :: ((a, b, c) -> d) -> (a -> b -> c -> d)
	  function curry3(f) {
	    function curried(a, b, c) {
	      // eslint-disable-line complexity
	      switch (arguments.length) {
	        case 0:
	          return curried;
	        case 1:
	          return curry2(function (b, c) {
	            return f(a, b, c);
	          });
	        case 2:
	          return function (c) {
	            return f(a, b, c);
	          };
	        default:
	          return f(a, b, c);
	      }
	    }
	    return curried;
	  }
	
	  exports.cons = cons;
	  exports.append = append;
	  exports.drop = drop;
	  exports.tail = tail;
	  exports.copy = copy;
	  exports.map = map;
	  exports.reduce = reduce;
	  exports.replace = replace;
	  exports.remove = remove;
	  exports.removeAll = removeAll;
	  exports.findIndex = findIndex;
	  exports.isArrayLike = isArrayLike;
	  exports.id = id;
	  exports.compose = compose;
	  exports.apply = apply;
	  exports.curry2 = curry2;
	  exports.curry3 = curry3;
	});

/***/ },
/* 7 */
/*!***********************************!*\
  !*** ./~/most/lib/source/core.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Stream = __webpack_require__(/*! ../Stream */ 5);
	var dispose = __webpack_require__(/*! ../disposable/dispose */ 8);
	var PropagateTask = __webpack_require__(/*! ../scheduler/PropagateTask */ 12);
	
	exports.of = streamOf;
	exports.empty = empty;
	exports.never = never;
	
	/**
	 * Stream containing only x
	 * @param {*} x
	 * @returns {Stream}
	 */
	function streamOf(x) {
	  return new Stream(new Just(x));
	}
	
	function Just(x) {
	  this.value = x;
	}
	
	Just.prototype.run = function (sink, scheduler) {
	  return scheduler.asap(new PropagateTask(runJust, this.value, sink));
	};
	
	function runJust(t, x, sink) {
	  sink.event(t, x);
	  sink.end(t, void 0);
	}
	
	/**
	 * Stream containing no events and ends immediately
	 * @returns {Stream}
	 */
	function empty() {
	  return EMPTY;
	}
	
	function EmptySource() {}
	
	EmptySource.prototype.run = function (sink, scheduler) {
	  var task = PropagateTask.end(void 0, sink);
	  scheduler.asap(task);
	
	  return dispose.create(disposeEmpty, task);
	};
	
	function disposeEmpty(task) {
	  return task.dispose();
	}
	
	var EMPTY = new Stream(new EmptySource());
	
	/**
	 * Stream containing no events and never ends
	 * @returns {Stream}
	 */
	function never() {
	  return NEVER;
	}
	
	function NeverSource() {}
	
	NeverSource.prototype.run = function () {
	  return dispose.empty();
	};
	
	var NEVER = new Stream(new NeverSource());

/***/ },
/* 8 */
/*!******************************************!*\
  !*** ./~/most/lib/disposable/dispose.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Disposable = __webpack_require__(/*! ./Disposable */ 9);
	var SettableDisposable = __webpack_require__(/*! ./SettableDisposable */ 10);
	var isPromise = __webpack_require__(/*! ../Promise */ 11).isPromise;
	var base = __webpack_require__(/*! @most/prelude */ 6);
	
	var map = base.map;
	var identity = base.id;
	
	exports.tryDispose = tryDispose;
	exports.create = create;
	exports.once = once;
	exports.empty = empty;
	exports.all = all;
	exports.settable = settable;
	exports.promised = promised;
	
	/**
	 * Call disposable.dispose.  If it returns a promise, catch promise
	 * error and forward it through the provided sink.
	 * @param {number} t time
	 * @param {{dispose: function}} disposable
	 * @param {{error: function}} sink
	 * @return {*} result of disposable.dispose
	 */
	function tryDispose(t, disposable, sink) {
	  var result = disposeSafely(disposable);
	  return isPromise(result) ? result.catch(function (e) {
	    sink.error(t, e);
	  }) : result;
	}
	
	/**
	 * Create a new Disposable which will dispose its underlying resource
	 * at most once.
	 * @param {function} dispose function
	 * @param {*?} data any data to be passed to disposer function
	 * @return {Disposable}
	 */
	function create(dispose, data) {
	  return once(new Disposable(dispose, data));
	}
	
	/**
	 * Create a noop disposable. Can be used to satisfy a Disposable
	 * requirement when no actual resource needs to be disposed.
	 * @return {Disposable|exports|module.exports}
	 */
	function empty() {
	  return new Disposable(identity, void 0);
	}
	
	/**
	 * Create a disposable that will dispose all input disposables in parallel.
	 * @param {Array<Disposable>} disposables
	 * @return {Disposable}
	 */
	function all(disposables) {
	  return create(disposeAll, disposables);
	}
	
	function disposeAll(disposables) {
	  return Promise.all(map(disposeSafely, disposables));
	}
	
	function disposeSafely(disposable) {
	  try {
	    return disposable.dispose();
	  } catch (e) {
	    return Promise.reject(e);
	  }
	}
	
	/**
	 * Create a disposable from a promise for another disposable
	 * @param {Promise<Disposable>} disposablePromise
	 * @return {Disposable}
	 */
	function promised(disposablePromise) {
	  return create(disposePromise, disposablePromise);
	}
	
	function disposePromise(disposablePromise) {
	  return disposablePromise.then(disposeOne);
	}
	
	function disposeOne(disposable) {
	  return disposable.dispose();
	}
	
	/**
	 * Create a disposable proxy that allows its underlying disposable to
	 * be set later.
	 * @return {SettableDisposable}
	 */
	function settable() {
	  return new SettableDisposable();
	}
	
	/**
	 * Wrap an existing disposable (which may not already have been once()d)
	 * so that it will only dispose its underlying resource at most once.
	 * @param {{ dispose: function() }} disposable
	 * @return {Disposable} wrapped disposable
	 */
	function once(disposable) {
	  return new Disposable(disposeMemoized, memoized(disposable));
	}
	
	function disposeMemoized(memoized) {
	  if (!memoized.disposed) {
	    memoized.disposed = true;
	    memoized.value = disposeSafely(memoized.disposable);
	    memoized.disposable = void 0;
	  }
	
	  return memoized.value;
	}
	
	function memoized(disposable) {
	  return { disposed: false, disposable: disposable, value: void 0 };
	}

/***/ },
/* 9 */
/*!*********************************************!*\
  !*** ./~/most/lib/disposable/Disposable.js ***!
  \*********************************************/
/***/ function(module, exports) {

	"use strict";
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	module.exports = Disposable;
	
	/**
	 * Create a new Disposable which will dispose its underlying resource.
	 * @param {function} dispose function
	 * @param {*?} data any data to be passed to disposer function
	 * @constructor
	 */
	function Disposable(dispose, data) {
	  this._dispose = dispose;
	  this._data = data;
	}
	
	Disposable.prototype.dispose = function () {
	  return this._dispose(this._data);
	};

/***/ },
/* 10 */
/*!*****************************************************!*\
  !*** ./~/most/lib/disposable/SettableDisposable.js ***!
  \*****************************************************/
/***/ function(module, exports) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	module.exports = SettableDisposable;
	
	function SettableDisposable() {
		this.disposable = void 0;
		this.disposed = false;
		this._resolve = void 0;
	
		var self = this;
		this.result = new Promise(function (resolve) {
			self._resolve = resolve;
		});
	}
	
	SettableDisposable.prototype.setDisposable = function (disposable) {
		if (this.disposable !== void 0) {
			throw new Error('setDisposable called more than once');
		}
	
		this.disposable = disposable;
	
		if (this.disposed) {
			this._resolve(disposable.dispose());
		}
	};
	
	SettableDisposable.prototype.dispose = function () {
		if (this.disposed) {
			return this.result;
		}
	
		this.disposed = true;
	
		if (this.disposable !== void 0) {
			this.result = this.disposable.dispose();
		}
	
		return this.result;
	};

/***/ },
/* 11 */
/*!*******************************!*\
  !*** ./~/most/lib/Promise.js ***!
  \*******************************/
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	exports.isPromise = isPromise;
	
	function isPromise(p) {
		return p !== null && (typeof p === 'undefined' ? 'undefined' : _typeof(p)) === 'object' && typeof p.then === 'function';
	}

/***/ },
/* 12 */
/*!***********************************************!*\
  !*** ./~/most/lib/scheduler/PropagateTask.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var fatal = __webpack_require__(/*! ../fatalError */ 13);
	
	module.exports = PropagateTask;
	
	function PropagateTask(run, value, sink) {
		this._run = run;
		this.value = value;
		this.sink = sink;
		this.active = true;
	}
	
	PropagateTask.event = function (value, sink) {
		return new PropagateTask(emit, value, sink);
	};
	
	PropagateTask.end = function (value, sink) {
		return new PropagateTask(end, value, sink);
	};
	
	PropagateTask.error = function (value, sink) {
		return new PropagateTask(error, value, sink);
	};
	
	PropagateTask.prototype.dispose = function () {
		this.active = false;
	};
	
	PropagateTask.prototype.run = function (t) {
		if (!this.active) {
			return;
		}
		this._run(t, this.value, this.sink);
	};
	
	PropagateTask.prototype.error = function (t, e) {
		if (!this.active) {
			return fatal(e);
		}
		this.sink.error(t, e);
	};
	
	function error(t, e, sink) {
		sink.error(t, e);
	}
	
	function emit(t, x, sink) {
		sink.event(t, x);
	}
	
	function end(t, x, sink) {
		sink.end(t, x);
	}

/***/ },
/* 13 */
/*!**********************************!*\
  !*** ./~/most/lib/fatalError.js ***!
  \**********************************/
/***/ function(module, exports) {

	"use strict";
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	module.exports = fatalError;
	
	function fatalError(e) {
		setTimeout(function () {
			throw e;
		}, 0);
	}

/***/ },
/* 14 */
/*!***********************************!*\
  !*** ./~/most/lib/source/from.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Stream = __webpack_require__(/*! ../Stream */ 5);
	var fromArray = __webpack_require__(/*! ./fromArray */ 15).fromArray;
	var isIterable = __webpack_require__(/*! ../iterable */ 16).isIterable;
	var fromIterable = __webpack_require__(/*! ./fromIterable */ 17).fromIterable;
	var getObservable = __webpack_require__(/*! ../observable/getObservable */ 18);
	var fromObservable = __webpack_require__(/*! ../observable/fromObservable */ 21).fromObservable;
	var isArrayLike = __webpack_require__(/*! @most/prelude */ 6).isArrayLike;
	
	exports.from = from;
	
	function from(a) {
		// eslint-disable-line complexity
		if (a instanceof Stream) {
			return a;
		}
	
		var observable = getObservable(a);
		if (observable != null) {
			return fromObservable(observable);
		}
	
		if (Array.isArray(a) || isArrayLike(a)) {
			return fromArray(a);
		}
	
		if (isIterable(a)) {
			return fromIterable(a);
		}
	
		throw new TypeError('from(x) must be observable, iterable, or array-like: ' + a);
	}

/***/ },
/* 15 */
/*!****************************************!*\
  !*** ./~/most/lib/source/fromArray.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Stream = __webpack_require__(/*! ../Stream */ 5);
	var PropagateTask = __webpack_require__(/*! ../scheduler/PropagateTask */ 12);
	
	exports.fromArray = fromArray;
	
	function fromArray(a) {
		return new Stream(new ArraySource(a));
	}
	
	function ArraySource(a) {
		this.array = a;
	}
	
	ArraySource.prototype.run = function (sink, scheduler) {
		return scheduler.asap(new PropagateTask(runProducer, this.array, sink));
	};
	
	function runProducer(t, array, sink) {
		for (var i = 0, l = array.length; i < l && this.active; ++i) {
			sink.event(t, array[i]);
		}
	
		this.active && end(t);
	
		function end(t) {
			sink.end(t);
		}
	}

/***/ },
/* 16 */
/*!********************************!*\
  !*** ./~/most/lib/iterable.js ***!
  \********************************/
/***/ function(module, exports) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	exports.isIterable = isIterable;
	exports.getIterator = getIterator;
	exports.makeIterable = makeIterable;
	
	/*global Set, Symbol*/
	var iteratorSymbol;
	// Firefox ships a partial implementation using the name @@iterator.
	// https://bugzilla.mozilla.org/show_bug.cgi?id=907077#c14
	if (typeof Set === 'function' && typeof new Set()['@@iterator'] === 'function') {
		iteratorSymbol = '@@iterator';
	} else {
		iteratorSymbol = typeof Symbol === 'function' && Symbol.iterator || '_es6shim_iterator_';
	}
	
	function isIterable(o) {
		return typeof o[iteratorSymbol] === 'function';
	}
	
	function getIterator(o) {
		return o[iteratorSymbol]();
	}
	
	function makeIterable(f, o) {
		o[iteratorSymbol] = f;
		return o;
	}

/***/ },
/* 17 */
/*!*******************************************!*\
  !*** ./~/most/lib/source/fromIterable.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Stream = __webpack_require__(/*! ../Stream */ 5);
	var getIterator = __webpack_require__(/*! ../iterable */ 16).getIterator;
	var PropagateTask = __webpack_require__(/*! ../scheduler/PropagateTask */ 12);
	
	exports.fromIterable = fromIterable;
	
	function fromIterable(iterable) {
		return new Stream(new IterableSource(iterable));
	}
	
	function IterableSource(iterable) {
		this.iterable = iterable;
	}
	
	IterableSource.prototype.run = function (sink, scheduler) {
		return new IteratorProducer(getIterator(this.iterable), sink, scheduler);
	};
	
	function IteratorProducer(iterator, sink, scheduler) {
		this.scheduler = scheduler;
		this.iterator = iterator;
		this.task = new PropagateTask(runProducer, this, sink);
		scheduler.asap(this.task);
	}
	
	IteratorProducer.prototype.dispose = function () {
		return this.task.dispose();
	};
	
	function runProducer(t, producer, sink) {
		var x = producer.iterator.next();
		if (x.done) {
			sink.end(t, x.value);
		} else {
			sink.event(t, x.value);
		}
	
		producer.scheduler.asap(producer.task);
	}

/***/ },
/* 18 */
/*!************************************************!*\
  !*** ./~/most/lib/observable/getObservable.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var symbolObservable = __webpack_require__(/*! symbol-observable */ 19);
	
	module.exports = getObservable;
	
	function getObservable(o) {
		var obs = null;
		if (o != null && (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object') {
			var method = o[symbolObservable];
			if (typeof method === 'function') {
				obs = method.call(o);
				if (obs == null || (typeof obs === 'undefined' ? 'undefined' : _typeof(obs)) !== 'object') {
					throw new TypeError('invalid observable ' + obs);
				}
			}
		}
	
		return obs;
	}

/***/ },
/* 19 */
/*!**************************************!*\
  !*** ./~/symbol-observable/index.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/* global window */
	'use strict';
	
	module.exports = __webpack_require__(/*! ./ponyfill */ 20)(global || window || undefined);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 20 */
/*!*****************************************!*\
  !*** ./~/symbol-observable/ponyfill.js ***!
  \*****************************************/
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function symbolObservablePonyfill(root) {
		var result;
		var _Symbol = root.Symbol;
	
		if (typeof _Symbol === 'function') {
			if (_Symbol.observable) {
				result = _Symbol.observable;
			} else {
				result = _Symbol('observable');
				_Symbol.observable = result;
			}
		} else {
			result = '@@observable';
		}
	
		return result;
	};

/***/ },
/* 21 */
/*!*************************************************!*\
  !*** ./~/most/lib/observable/fromObservable.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Stream = __webpack_require__(/*! ../Stream */ 5);
	var dispose = __webpack_require__(/*! ../disposable/dispose */ 8);
	
	exports.fromObservable = fromObservable;
	exports.ObservableSource = ObservableSource;
	exports.SubscriberSink = SubscriberSink;
	
	function fromObservable(observable) {
		return new Stream(new ObservableSource(observable));
	}
	
	function ObservableSource(observable) {
		this.observable = observable;
	}
	
	ObservableSource.prototype.run = function (sink, scheduler) {
		var sub = this.observable.subscribe(new SubscriberSink(sink, scheduler));
		if (typeof sub === 'function') {
			return dispose.create(sub);
		} else if (sub && typeof sub.unsubscribe === 'function') {
			return dispose.create(unsubscribe, sub);
		}
	
		throw new TypeError('Observable returned invalid subscription ' + String(sub));
	};
	
	function SubscriberSink(sink, scheduler) {
		this.sink = sink;
		this.scheduler = scheduler;
	}
	
	SubscriberSink.prototype.next = function (x) {
		this.sink.event(this.scheduler.now(), x);
	};
	
	SubscriberSink.prototype.complete = function (x) {
		this.sink.end(this.scheduler.now(), x);
	};
	
	SubscriberSink.prototype.error = function (e) {
		this.sink.error(this.scheduler.now(), e);
	};
	
	function unsubscribe(subscription) {
		return subscription.unsubscribe();
	}

/***/ },
/* 22 */
/*!***************************************!*\
  !*** ./~/most/lib/source/periodic.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Stream = __webpack_require__(/*! ../Stream */ 5);
	var dispose = __webpack_require__(/*! ../disposable/dispose */ 8);
	var MulticastSource = __webpack_require__(/*! @most/multicast */ 23).MulticastSource;
	var PropagateTask = __webpack_require__(/*! ../scheduler/PropagateTask */ 12);
	
	exports.periodic = periodic;
	
	/**
	 * Create a stream that emits the current time periodically
	 * @param {Number} period periodicity of events in millis
	 * @param {*) value value to emit each period
	 * @returns {Stream} new stream that emits the current time every period
	 */
	function periodic(period, value) {
	  return new Stream(new MulticastSource(new Periodic(period, value)));
	}
	
	function Periodic(period, value) {
	  this.period = period;
	  this.value = value;
	}
	
	Periodic.prototype.run = function (sink, scheduler) {
	  return scheduler.periodic(this.period, new PropagateTask(emit, this.value, sink));
	};
	
	function emit(t, x, sink) {
	  sink.event(t, x);
	}

/***/ },
/* 23 */
/*!*********************************************!*\
  !*** ./~/@most/multicast/dist/multicast.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! @most/prelude */ 6)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('@most/prelude'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.prelude);
	    global.mostMulticast = mod.exports;
	  }
	})(undefined, function (exports, _prelude) {
	  'use strict';
	
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.MulticastSource = undefined;
	
	  function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	      throw new TypeError("Cannot call a class as a function");
	    }
	  }
	
	  var _createClass = function () {
	    function defineProperties(target, props) {
	      for (var i = 0; i < props.length; i++) {
	        var descriptor = props[i];
	        descriptor.enumerable = descriptor.enumerable || false;
	        descriptor.configurable = true;
	        if ("value" in descriptor) descriptor.writable = true;
	        Object.defineProperty(target, descriptor.key, descriptor);
	      }
	    }
	
	    return function (Constructor, protoProps, staticProps) {
	      if (protoProps) defineProperties(Constructor.prototype, protoProps);
	      if (staticProps) defineProperties(Constructor, staticProps);
	      return Constructor;
	    };
	  }();
	
	  var MulticastDisposable = function () {
	    function MulticastDisposable(source, sink) {
	      _classCallCheck(this, MulticastDisposable);
	
	      this.source = source;
	      this.sink = sink;
	      this.disposed = false;
	    }
	
	    _createClass(MulticastDisposable, [{
	      key: 'dispose',
	      value: function dispose() {
	        if (this.disposed) {
	          return;
	        }
	        this.disposed = true;
	        var remaining = this.source.remove(this.sink);
	        return remaining === 0 && this.source._dispose();
	      }
	    }]);
	
	    return MulticastDisposable;
	  }();
	
	  function tryEvent(t, x, sink) {
	    try {
	      sink.event(t, x);
	    } catch (e) {
	      sink.error(t, e);
	    }
	  }
	
	  function tryEnd(t, x, sink) {
	    try {
	      sink.end(t, x);
	    } catch (e) {
	      sink.error(t, e);
	    }
	  }
	
	  var dispose = function dispose(disposable) {
	    return disposable.dispose();
	  };
	
	  var emptyDisposable = {
	    dispose: function dispose() {}
	  };
	
	  var MulticastSource = function () {
	    function MulticastSource(source) {
	      _classCallCheck(this, MulticastSource);
	
	      this.source = source;
	      this.sinks = [];
	      this._disposable = emptyDisposable;
	    }
	
	    _createClass(MulticastSource, [{
	      key: 'run',
	      value: function run(sink, scheduler) {
	        var n = this.add(sink);
	        if (n === 1) {
	          this._disposable = this.source.run(this, scheduler);
	        }
	        return new MulticastDisposable(this, sink);
	      }
	    }, {
	      key: '_dispose',
	      value: function _dispose() {
	        var disposable = this._disposable;
	        this._disposable = emptyDisposable;
	        return Promise.resolve(disposable).then(dispose);
	      }
	    }, {
	      key: 'add',
	      value: function add(sink) {
	        this.sinks = (0, _prelude.append)(sink, this.sinks);
	        return this.sinks.length;
	      }
	    }, {
	      key: 'remove',
	      value: function remove(sink) {
	        var i = (0, _prelude.findIndex)(sink, this.sinks);
	        // istanbul ignore next
	        if (i >= 0) {
	          this.sinks = (0, _prelude.remove)(i, this.sinks);
	        }
	
	        return this.sinks.length;
	      }
	    }, {
	      key: 'event',
	      value: function event(time, value) {
	        var s = this.sinks;
	        if (s.length === 1) {
	          return s[0].event(time, value);
	        }
	        for (var i = 0; i < s.length; ++i) {
	          tryEvent(time, value, s[i]);
	        }
	      }
	    }, {
	      key: 'end',
	      value: function end(time, value) {
	        var s = this.sinks;
	        for (var i = 0; i < s.length; ++i) {
	          tryEnd(time, value, s[i]);
	        }
	      }
	    }, {
	      key: 'error',
	      value: function error(time, err) {
	        var s = this.sinks;
	        for (var i = 0; i < s.length; ++i) {
	          s[i].error(time, err);
	        }
	      }
	    }]);
	
	    return MulticastSource;
	  }();
	
	  function multicast(stream) {
	    var source = stream.source;
	    return source instanceof MulticastSource ? stream : new stream.constructor(new MulticastSource(source));
	  }
	
	  exports.MulticastSource = MulticastSource;
	  exports.default = multicast;
	});

/***/ },
/* 24 */
/*!********************************************!*\
  !*** ./~/most/lib/observable/subscribe.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var defaultScheduler = __webpack_require__(/*! ../scheduler/defaultScheduler */ 25);
	var dispose = __webpack_require__(/*! ../disposable/dispose */ 8);
	var fatalError = __webpack_require__(/*! ../fatalError */ 13);
	
	exports.subscribe = subscribe;
	exports.SubscribeObserver = SubscribeObserver;
	exports.Subscription = Subscription;
	
	function subscribe(subscriber, stream) {
		if (subscriber == null || (typeof subscriber === 'undefined' ? 'undefined' : _typeof(subscriber)) !== 'object') {
			throw new TypeError('subscriber must be an object');
		}
	
		var disposable = dispose.settable();
		var observer = new SubscribeObserver(fatalError, subscriber, disposable);
	
		disposable.setDisposable(stream.source.run(observer, defaultScheduler));
	
		return new Subscription(disposable);
	}
	
	function SubscribeObserver(fatalError, subscriber, disposable) {
		this.fatalError = fatalError;
		this.subscriber = subscriber;
		this.disposable = disposable;
	}
	
	SubscribeObserver.prototype.event = function (t, x) {
		if (typeof this.subscriber.next === 'function') {
			this.subscriber.next(x);
		}
	};
	
	SubscribeObserver.prototype.end = function (t, x) {
		var s = this.subscriber;
		doDispose(this.fatalError, s, s.complete, s.error, this.disposable, x);
	};
	
	SubscribeObserver.prototype.error = function (t, e) {
		var s = this.subscriber;
		doDispose(this.fatalError, s, s.error, s.error, this.disposable, e);
	};
	
	function Subscription(disposable) {
		this.disposable = disposable;
	}
	
	Subscription.prototype.unsubscribe = function () {
		this.disposable.dispose();
	};
	
	function doDispose(fatal, subscriber, complete, error, disposable, x) {
		Promise.resolve(disposable.dispose()).then(function () {
			if (typeof complete === 'function') {
				complete.call(subscriber, x);
			}
		}).catch(function (e) {
			if (typeof error === 'function') {
				error.call(subscriber, e);
			}
		}).catch(fatal);
	}

/***/ },
/* 25 */
/*!**************************************************!*\
  !*** ./~/most/lib/scheduler/defaultScheduler.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Scheduler = __webpack_require__(/*! ./Scheduler */ 27);
	var setTimeoutTimer = __webpack_require__(/*! ./timeoutTimer */ 28);
	var nodeTimer = __webpack_require__(/*! ./nodeTimer */ 29);
	
	var isNode = (typeof process === 'undefined' ? 'undefined' : _typeof(process)) === 'object' && typeof process.nextTick === 'function';
	
	module.exports = new Scheduler(isNode ? nodeTimer : setTimeoutTimer);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./~/process/browser.js */ 26)))

/***/ },
/* 26 */
/*!******************************!*\
  !*** ./~/process/browser.js ***!
  \******************************/
/***/ function(module, exports) {

	'use strict';
	
	// shim for using process in browser
	
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	(function () {
	    try {
	        cachedSetTimeout = setTimeout;
	    } catch (e) {
	        cachedSetTimeout = function cachedSetTimeout() {
	            throw new Error('setTimeout is not defined');
	        };
	    }
	    try {
	        cachedClearTimeout = clearTimeout;
	    } catch (e) {
	        cachedClearTimeout = function cachedClearTimeout() {
	            throw new Error('clearTimeout is not defined');
	        };
	    }
	})();
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = cachedSetTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    cachedClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        cachedSetTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 27 */
/*!*******************************************!*\
  !*** ./~/most/lib/scheduler/Scheduler.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var base = __webpack_require__(/*! @most/prelude */ 6);
	
	module.exports = Scheduler;
	
	function ScheduledTask(delay, period, task, scheduler) {
		this.time = delay;
		this.period = period;
		this.task = task;
		this.scheduler = scheduler;
		this.active = true;
	}
	
	ScheduledTask.prototype.run = function () {
		return this.task.run(this.time);
	};
	
	ScheduledTask.prototype.error = function (e) {
		return this.task.error(this.time, e);
	};
	
	ScheduledTask.prototype.dispose = function () {
		this.scheduler.cancel(this);
		return this.task.dispose();
	};
	
	function runTask(task) {
		try {
			return task.run();
		} catch (e) {
			return task.error(e);
		}
	}
	
	function Scheduler(timer) {
		this.timer = timer;
	
		this._timer = null;
		this._nextArrival = 0;
		this._tasks = [];
	
		var self = this;
		this._runReadyTasksBound = function () {
			self._runReadyTasks(self.now());
		};
	}
	
	Scheduler.prototype.now = function () {
		return this.timer.now();
	};
	
	Scheduler.prototype.asap = function (task) {
		return this.schedule(0, -1, task);
	};
	
	Scheduler.prototype.delay = function (delay, task) {
		return this.schedule(delay, -1, task);
	};
	
	Scheduler.prototype.periodic = function (period, task) {
		return this.schedule(0, period, task);
	};
	
	Scheduler.prototype.schedule = function (delay, period, task) {
		var now = this.now();
		var st = new ScheduledTask(now + Math.max(0, delay), period, task, this);
	
		insertByTime(st, this._tasks);
		this._scheduleNextRun(now);
		return st;
	};
	
	Scheduler.prototype.cancel = function (task) {
		task.active = false;
		var i = binarySearch(task.time, this._tasks);
	
		if (i >= 0 && i < this._tasks.length) {
			var at = base.findIndex(task, this._tasks[i].events);
			if (at >= 0) {
				this._tasks[i].events.splice(at, 1);
				this._reschedule();
			}
		}
	};
	
	Scheduler.prototype.cancelAll = function (f) {
		for (var i = 0; i < this._tasks.length; ++i) {
			removeAllFrom(f, this._tasks[i]);
		}
		this._reschedule();
	};
	
	function removeAllFrom(f, timeslot) {
		timeslot.events = base.removeAll(f, timeslot.events);
	}
	
	Scheduler.prototype._reschedule = function () {
		if (this._tasks.length === 0) {
			this._unschedule();
		} else {
			this._scheduleNextRun(this.now());
		}
	};
	
	Scheduler.prototype._unschedule = function () {
		this.timer.clearTimer(this._timer);
		this._timer = null;
	};
	
	Scheduler.prototype._scheduleNextRun = function (now) {
		if (this._tasks.length === 0) {
			return;
		}
	
		var nextArrival = this._tasks[0].time;
	
		if (this._timer === null) {
			this._scheduleNextArrival(nextArrival, now);
		} else if (nextArrival < this._nextArrival) {
			this._unschedule();
			this._scheduleNextArrival(nextArrival, now);
		}
	};
	
	Scheduler.prototype._scheduleNextArrival = function (nextArrival, now) {
		this._nextArrival = nextArrival;
		var delay = Math.max(0, nextArrival - now);
		this._timer = this.timer.setTimer(this._runReadyTasksBound, delay);
	};
	
	Scheduler.prototype._runReadyTasks = function (now) {
		this._timer = null;
	
		this._tasks = this._findAndRunTasks(now);
	
		this._scheduleNextRun(this.now());
	};
	
	Scheduler.prototype._findAndRunTasks = function (now) {
		var tasks = this._tasks;
		var l = tasks.length;
		var i = 0;
	
		while (i < l && tasks[i].time <= now) {
			++i;
		}
	
		this._tasks = tasks.slice(i);
	
		// Run all ready tasks
		for (var j = 0; j < i; ++j) {
			this._tasks = runTasks(tasks[j], this._tasks);
		}
		return this._tasks;
	};
	
	function runTasks(timeslot, tasks) {
		var events = timeslot.events;
		for (var i = 0; i < events.length; ++i) {
			var task = events[i];
	
			if (task.active) {
				runTask(task);
	
				// Reschedule periodic repeating tasks
				// Check active again, since a task may have canceled itself
				if (task.period >= 0) {
					task.time = task.time + task.period;
					insertByTime(task, tasks);
				}
			}
		}
	
		return tasks;
	}
	
	function insertByTime(task, timeslots) {
		var l = timeslots.length;
	
		if (l === 0) {
			timeslots.push(newTimeslot(task.time, [task]));
			return;
		}
	
		var i = binarySearch(task.time, timeslots);
	
		if (i >= l) {
			timeslots.push(newTimeslot(task.time, [task]));
		} else if (task.time === timeslots[i].time) {
			timeslots[i].events.push(task);
		} else {
			timeslots.splice(i, 0, newTimeslot(task.time, [task]));
		}
	}
	
	function binarySearch(t, sortedArray) {
		var lo = 0;
		var hi = sortedArray.length;
		var mid, y;
	
		while (lo < hi) {
			mid = Math.floor((lo + hi) / 2);
			y = sortedArray[mid];
	
			if (t === y.time) {
				return mid;
			} else if (t < y.time) {
				hi = mid;
			} else {
				lo = mid + 1;
			}
		}
		return hi;
	}
	
	function newTimeslot(t, events) {
		return { time: t, events: events };
	}

/***/ },
/* 28 */
/*!**********************************************!*\
  !*** ./~/most/lib/scheduler/timeoutTimer.js ***!
  \**********************************************/
/***/ function(module, exports) {

	"use strict";
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	/*global setTimeout, clearTimeout*/
	
	module.exports = {
		now: Date.now,
		setTimer: function setTimer(f, dt) {
			return setTimeout(f, dt);
		},
		clearTimer: function clearTimer(t) {
			return clearTimeout(t);
		}
	};

/***/ },
/* 29 */
/*!*******************************************!*\
  !*** ./~/most/lib/scheduler/nodeTimer.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var defer = __webpack_require__(/*! ../defer */ 30);
	
	/*global setTimeout, clearTimeout*/
	
	function Task(f) {
		this.f = f;
		this.active = true;
	}
	
	Task.prototype.run = function () {
		if (!this.active) {
			return;
		}
		var f = this.f;
		return f();
	};
	
	Task.prototype.error = function (e) {
		throw e;
	};
	
	Task.prototype.cancel = function () {
		this.active = false;
	};
	
	function runAsTask(f) {
		var task = new Task(f);
		defer(task);
		return task;
	}
	
	module.exports = {
		now: Date.now,
		setTimer: function setTimer(f, dt) {
			return dt <= 0 ? runAsTask(f) : setTimeout(f, dt);
		},
		clearTimer: function clearTimer(t) {
			return t instanceof Task ? t.cancel() : clearTimeout(t);
		}
	};

/***/ },
/* 30 */
/*!*****************************!*\
  !*** ./~/most/lib/defer.js ***!
  \*****************************/
/***/ function(module, exports) {

	"use strict";
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	module.exports = defer;
	
	function defer(task) {
		return Promise.resolve(task).then(runTask);
	}
	
	function runTask(task) {
		try {
			return task.run();
		} catch (e) {
			return task.error(e);
		}
	}

/***/ },
/* 31 */
/*!***************************************!*\
  !*** ./~/most/lib/combinator/thru.js ***!
  \***************************************/
/***/ function(module, exports) {

	"use strict";
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	exports.thru = function thru(f, stream) {
		return f(stream);
	};

/***/ },
/* 32 */
/*!*************************************!*\
  !*** ./~/most/lib/source/create.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Stream = __webpack_require__(/*! ../Stream */ 5);
	var MulticastSource = __webpack_require__(/*! @most/multicast */ 23).MulticastSource;
	var DeferredSink = __webpack_require__(/*! ../sink/DeferredSink */ 33);
	var tryEvent = __webpack_require__(/*! ./tryEvent */ 34);
	
	exports.create = create;
	
	/**
	 * @deprecated
	 */
	function create(run) {
		return new Stream(new MulticastSource(new SubscriberSource(run)));
	}
	
	function SubscriberSource(subscribe) {
		this._subscribe = subscribe;
	}
	
	SubscriberSource.prototype.run = function (sink, scheduler) {
		return new Subscription(new DeferredSink(sink), scheduler, this._subscribe);
	};
	
	function Subscription(sink, scheduler, subscribe) {
		this.sink = sink;
		this.scheduler = scheduler;
		this.active = true;
		this._unsubscribe = this._init(subscribe);
	}
	
	Subscription.prototype._init = function (subscribe) {
		var s = this;
	
		try {
			return subscribe(add, end, error);
		} catch (e) {
			error(e);
		}
	
		function add(x) {
			s._add(x);
		}
		function end(x) {
			s._end(x);
		}
		function error(e) {
			s._error(e);
		}
	};
	
	Subscription.prototype._add = function (x) {
		if (!this.active) {
			return;
		}
		tryEvent.tryEvent(this.scheduler.now(), x, this.sink);
	};
	
	Subscription.prototype._end = function (x) {
		if (!this.active) {
			return;
		}
		this.active = false;
		tryEvent.tryEnd(this.scheduler.now(), x, this.sink);
	};
	
	Subscription.prototype._error = function (x) {
		this.active = false;
		this.sink.error(this.scheduler.now(), x);
	};
	
	Subscription.prototype.dispose = function () {
		this.active = false;
		if (typeof this._unsubscribe === 'function') {
			return this._unsubscribe.call(void 0);
		}
	};

/***/ },
/* 33 */
/*!*****************************************!*\
  !*** ./~/most/lib/sink/DeferredSink.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var defer = __webpack_require__(/*! ../defer */ 30);
	
	module.exports = DeferredSink;
	
	function DeferredSink(sink) {
		this.sink = sink;
		this.events = [];
		this.active = true;
	}
	
	DeferredSink.prototype.event = function (t, x) {
		if (!this.active) {
			return;
		}
	
		if (this.events.length === 0) {
			defer(new PropagateAllTask(this.sink, this.events));
		}
	
		this.events.push({ time: t, value: x });
	};
	
	DeferredSink.prototype.error = function (t, e) {
		this._end(new ErrorTask(t, e, this.sink));
	};
	
	DeferredSink.prototype.end = function (t, x) {
		this._end(new EndTask(t, x, this.sink));
	};
	
	DeferredSink.prototype._end = function (task) {
		this.active = false;
		this.events = void 0;
		defer(task);
	};
	
	function PropagateAllTask(sink, events) {
		this.sink = sink;
		this.events = events;
	}
	
	PropagateAllTask.prototype.run = function () {
		var events = this.events;
		var sink = this.sink;
		var event;
	
		for (var i = 0, l = events.length; i < l; ++i) {
			event = events[i];
			sink.event(event.time, event.value);
		}
	
		events.length = 0;
	};
	
	PropagateAllTask.prototype.error = function (e) {
		this.sink.error(0, e);
	};
	
	function EndTask(t, x, sink) {
		this.time = t;
		this.value = x;
		this.sink = sink;
	}
	
	EndTask.prototype.run = function () {
		this.sink.end(this.time, this.value);
	};
	
	EndTask.prototype.error = function (e) {
		this.sink.error(this.time, e);
	};
	
	function ErrorTask(t, e, sink) {
		this.time = t;
		this.value = e;
		this.sink = sink;
	}
	
	ErrorTask.prototype.run = function () {
		this.sink.error(this.time, this.value);
	};
	
	ErrorTask.prototype.error = function (e) {
		throw e;
	};

/***/ },
/* 34 */
/*!***************************************!*\
  !*** ./~/most/lib/source/tryEvent.js ***!
  \***************************************/
/***/ function(module, exports) {

	"use strict";
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	exports.tryEvent = tryEvent;
	exports.tryEnd = tryEnd;
	
	function tryEvent(t, x, sink) {
		try {
			sink.event(t, x);
		} catch (e) {
			sink.error(t, e);
		}
	}
	
	function tryEnd(t, x, sink) {
		try {
			sink.end(t, x);
		} catch (e) {
			sink.error(t, e);
		}
	}

/***/ },
/* 35 */
/*!****************************************!*\
  !*** ./~/most/lib/source/fromEvent.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Stream = __webpack_require__(/*! ../Stream */ 5);
	var MulticastSource = __webpack_require__(/*! @most/multicast */ 23).MulticastSource;
	var EventTargetSource = __webpack_require__(/*! ./EventTargetSource */ 36);
	var EventEmitterSource = __webpack_require__(/*! ./EventEmitterSource */ 37);
	
	exports.fromEvent = fromEvent;
	
	/**
	 * Create a stream from an EventTarget, such as a DOM Node, or EventEmitter.
	 * @param {String} event event type name, e.g. 'click'
	 * @param {EventTarget|EventEmitter} source EventTarget or EventEmitter
	 * @param {boolean?} useCapture for DOM events, whether to use
	 *  capturing--passed as 3rd parameter to addEventListener.
	 * @returns {Stream} stream containing all events of the specified type
	 * from the source.
	 */
	function fromEvent(event, source /*, useCapture = false */) {
		var s;
	
		if (typeof source.addEventListener === 'function' && typeof source.removeEventListener === 'function') {
			var capture = arguments.length > 2 && !!arguments[2];
			s = new MulticastSource(new EventTargetSource(event, source, capture));
		} else if (typeof source.addListener === 'function' && typeof source.removeListener === 'function') {
			s = new EventEmitterSource(event, source);
		} else {
			throw new Error('source must support addEventListener/removeEventListener or addListener/removeListener');
		}
	
		return new Stream(s);
	}

/***/ },
/* 36 */
/*!************************************************!*\
  !*** ./~/most/lib/source/EventTargetSource.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var dispose = __webpack_require__(/*! ../disposable/dispose */ 8);
	var tryEvent = __webpack_require__(/*! ./tryEvent */ 34);
	
	module.exports = EventTargetSource;
	
	function EventTargetSource(event, source, capture) {
		this.event = event;
		this.source = source;
		this.capture = capture;
	}
	
	EventTargetSource.prototype.run = function (sink, scheduler) {
		function addEvent(e) {
			tryEvent.tryEvent(scheduler.now(), e, sink);
		}
	
		this.source.addEventListener(this.event, addEvent, this.capture);
	
		return dispose.create(disposeEventTarget, { target: this, addEvent: addEvent });
	};
	
	function disposeEventTarget(info) {
		var target = info.target;
		target.source.removeEventListener(target.event, info.addEvent, target.capture);
	}

/***/ },
/* 37 */
/*!*************************************************!*\
  !*** ./~/most/lib/source/EventEmitterSource.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var DeferredSink = __webpack_require__(/*! ../sink/DeferredSink */ 33);
	var dispose = __webpack_require__(/*! ../disposable/dispose */ 8);
	var tryEvent = __webpack_require__(/*! ./tryEvent */ 34);
	
	module.exports = EventEmitterSource;
	
	function EventEmitterSource(event, source) {
		this.event = event;
		this.source = source;
	}
	
	EventEmitterSource.prototype.run = function (sink, scheduler) {
		// NOTE: Because EventEmitter allows events in the same call stack as
		// a listener is added, use a DeferredSink to buffer events
		// until the stack clears, then propagate.  This maintains most.js's
		// invariant that no event will be delivered in the same call stack
		// as an observer begins observing.
		var dsink = new DeferredSink(sink);
	
		function addEventVariadic(a) {
			var l = arguments.length;
			if (l > 1) {
				var arr = new Array(l);
				for (var i = 0; i < l; ++i) {
					arr[i] = arguments[i];
				}
				tryEvent.tryEvent(scheduler.now(), arr, dsink);
			} else {
				tryEvent.tryEvent(scheduler.now(), a, dsink);
			}
		}
	
		this.source.addListener(this.event, addEventVariadic);
	
		return dispose.create(disposeEventEmitter, { target: this, addEvent: addEventVariadic });
	};
	
	function disposeEventEmitter(info) {
		var target = info.target;
		target.source.removeListener(target.event, info.addEvent);
	}

/***/ },
/* 38 */
/*!******************************************!*\
  !*** ./~/most/lib/combinator/observe.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var run = __webpack_require__(/*! ../runSource */ 39).withDefaultScheduler;
	var tap = __webpack_require__(/*! ./transform */ 40).tap;
	
	exports.observe = observe;
	exports.drain = drain;
	
	/**
	 * Observe all the event values in the stream in time order. The
	 * provided function `f` will be called for each event value
	 * @param {function(x:T):*} f function to call with each event value
	 * @param {Stream<T>} stream stream to observe
	 * @return {Promise} promise that fulfills after the stream ends without
	 *  an error, or rejects if the stream ends with an error.
	 */
	function observe(f, stream) {
	  return drain(tap(f, stream));
	}
	
	var defaultScheduler = __webpack_require__(/*! ../scheduler/defaultScheduler */ 25);
	var dispose = __webpack_require__(/*! ../disposable/dispose */ 8);
	
	/**
	 * "Run" a stream by creating demand and consuming all events
	 * @param {Stream<T>} stream stream to drain
	 * @return {Promise} promise that fulfills after the stream ends without
	 *  an error, or rejects if the stream ends with an error.
	 */
	function drain(stream) {
	  return run(stream.source);
	}

/***/ },
/* 39 */
/*!*********************************!*\
  !*** ./~/most/lib/runSource.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var dispose = __webpack_require__(/*! ./disposable/dispose */ 8);
	var defaultScheduler = __webpack_require__(/*! ./scheduler/defaultScheduler */ 25);
	
	exports.withDefaultScheduler = withDefaultScheduler;
	exports.withScheduler = withScheduler;
	
	function withDefaultScheduler(source) {
		return withScheduler(source, defaultScheduler);
	}
	
	function withScheduler(source, scheduler) {
		return new Promise(function (resolve, reject) {
			runSource(source, scheduler, resolve, reject);
		});
	}
	
	function runSource(source, scheduler, resolve, reject) {
		var disposable = dispose.settable();
		var observer = new Drain(resolve, reject, disposable);
	
		disposable.setDisposable(source.run(observer, scheduler));
	}
	
	function Drain(end, error, disposable) {
		this._end = end;
		this._error = error;
		this._disposable = disposable;
		this.active = true;
	}
	
	Drain.prototype.event = function (t, x) {};
	
	Drain.prototype.end = function (t, x) {
		if (!this.active) {
			return;
		}
		this.active = false;
		disposeThen(this._end, this._error, this._disposable, x);
	};
	
	Drain.prototype.error = function (t, e) {
		this.active = false;
		disposeThen(this._error, this._error, this._disposable, e);
	};
	
	function disposeThen(end, error, disposable, x) {
		Promise.resolve(disposable.dispose()).then(function () {
			end(x);
		}, error);
	}

/***/ },
/* 40 */
/*!********************************************!*\
  !*** ./~/most/lib/combinator/transform.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Stream = __webpack_require__(/*! ../Stream */ 5);
	var Map = __webpack_require__(/*! ../fusion/Map */ 41);
	var Pipe = __webpack_require__(/*! ../sink/Pipe */ 42);
	
	exports.map = map;
	exports.constant = constant;
	exports.tap = tap;
	
	/**
	 * Transform each value in the stream by applying f to each
	 * @param {function(*):*} f mapping function
	 * @param {Stream} stream stream to map
	 * @returns {Stream} stream containing items transformed by f
	 */
	function map(f, stream) {
	  return new Stream(Map.create(f, stream.source));
	}
	
	/**
	 * Replace each value in the stream with x
	 * @param {*} x
	 * @param {Stream} stream
	 * @returns {Stream} stream containing items replaced with x
	 */
	function constant(x, stream) {
	  return map(function () {
	    return x;
	  }, stream);
	}
	
	/**
	 * Perform a side effect for each item in the stream
	 * @param {function(x:*):*} f side effect to execute for each item. The
	 *  return value will be discarded.
	 * @param {Stream} stream stream to tap
	 * @returns {Stream} new stream containing the same items as this stream
	 */
	function tap(f, stream) {
	  return new Stream(new Tap(f, stream.source));
	}
	
	function Tap(f, source) {
	  this.source = source;
	  this.f = f;
	}
	
	Tap.prototype.run = function (sink, scheduler) {
	  return this.source.run(new TapSink(this.f, sink), scheduler);
	};
	
	function TapSink(f, sink) {
	  this.sink = sink;
	  this.f = f;
	}
	
	TapSink.prototype.end = Pipe.prototype.end;
	TapSink.prototype.error = Pipe.prototype.error;
	
	TapSink.prototype.event = function (t, x) {
	  var f = this.f;
	  f(x);
	  this.sink.event(t, x);
	};

/***/ },
/* 41 */
/*!**********************************!*\
  !*** ./~/most/lib/fusion/Map.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Pipe = __webpack_require__(/*! ../sink/Pipe */ 42);
	var Filter = __webpack_require__(/*! ./Filter */ 43);
	var FilterMap = __webpack_require__(/*! ./FilterMap */ 44);
	var base = __webpack_require__(/*! @most/prelude */ 6);
	
	module.exports = Map;
	
	function Map(f, source) {
		this.f = f;
		this.source = source;
	}
	
	/**
	 * Create a mapped source, fusing adjacent map.map, filter.map,
	 * and filter.map.map if possible
	 * @param {function(*):*} f mapping function
	 * @param {{run:function}} source source to map
	 * @returns {Map|FilterMap} mapped source, possibly fused
	 */
	Map.create = function createMap(f, source) {
		if (source instanceof Map) {
			return new Map(base.compose(f, source.f), source.source);
		}
	
		if (source instanceof Filter) {
			return new FilterMap(source.p, f, source.source);
		}
	
		return new Map(f, source);
	};
	
	Map.prototype.run = function (sink, scheduler) {
		return this.source.run(new MapSink(this.f, sink), scheduler);
	};
	
	function MapSink(f, sink) {
		this.f = f;
		this.sink = sink;
	}
	
	MapSink.prototype.end = Pipe.prototype.end;
	MapSink.prototype.error = Pipe.prototype.error;
	
	MapSink.prototype.event = function (t, x) {
		var f = this.f;
		this.sink.event(t, f(x));
	};

/***/ },
/* 42 */
/*!*********************************!*\
  !*** ./~/most/lib/sink/Pipe.js ***!
  \*********************************/
/***/ function(module, exports) {

	"use strict";
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	module.exports = Pipe;
	
	/**
	 * A sink mixin that simply forwards event, end, and error to
	 * another sink.
	 * @param sink
	 * @constructor
	 */
	function Pipe(sink) {
	  this.sink = sink;
	}
	
	Pipe.prototype.event = function (t, x) {
	  return this.sink.event(t, x);
	};
	
	Pipe.prototype.end = function (t, x) {
	  return this.sink.end(t, x);
	};
	
	Pipe.prototype.error = function (t, e) {
	  return this.sink.error(t, e);
	};

/***/ },
/* 43 */
/*!*************************************!*\
  !*** ./~/most/lib/fusion/Filter.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Pipe = __webpack_require__(/*! ../sink/Pipe */ 42);
	
	module.exports = Filter;
	
	function Filter(p, source) {
		this.p = p;
		this.source = source;
	}
	
	/**
	 * Create a filtered source, fusing adjacent filter.filter if possible
	 * @param {function(x:*):boolean} p filtering predicate
	 * @param {{run:function}} source source to filter
	 * @returns {Filter} filtered source
	 */
	Filter.create = function createFilter(p, source) {
		if (source instanceof Filter) {
			return new Filter(and(source.p, p), source.source);
		}
	
		return new Filter(p, source);
	};
	
	Filter.prototype.run = function (sink, scheduler) {
		return this.source.run(new FilterSink(this.p, sink), scheduler);
	};
	
	function FilterSink(p, sink) {
		this.p = p;
		this.sink = sink;
	}
	
	FilterSink.prototype.end = Pipe.prototype.end;
	FilterSink.prototype.error = Pipe.prototype.error;
	
	FilterSink.prototype.event = function (t, x) {
		var p = this.p;
		p(x) && this.sink.event(t, x);
	};
	
	function and(p, q) {
		return function (x) {
			return p(x) && q(x);
		};
	}

/***/ },
/* 44 */
/*!****************************************!*\
  !*** ./~/most/lib/fusion/FilterMap.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Pipe = __webpack_require__(/*! ../sink/Pipe */ 42);
	
	module.exports = FilterMap;
	
	function FilterMap(p, f, source) {
		this.p = p;
		this.f = f;
		this.source = source;
	}
	
	FilterMap.prototype.run = function (sink, scheduler) {
		return this.source.run(new FilterMapSink(this.p, this.f, sink), scheduler);
	};
	
	function FilterMapSink(p, f, sink) {
		this.p = p;
		this.f = f;
		this.sink = sink;
	}
	
	FilterMapSink.prototype.event = function (t, x) {
		var f = this.f;
		var p = this.p;
		p(x) && this.sink.event(t, f(x));
	};
	
	FilterMapSink.prototype.end = Pipe.prototype.end;
	FilterMapSink.prototype.error = Pipe.prototype.error;

/***/ },
/* 45 */
/*!***************************************!*\
  !*** ./~/most/lib/combinator/loop.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Stream = __webpack_require__(/*! ../Stream */ 5);
	var Pipe = __webpack_require__(/*! ../sink/Pipe */ 42);
	
	exports.loop = loop;
	
	/**
	 * Generalized feedback loop. Call a stepper function for each event. The stepper
	 * will be called with 2 params: the current seed and the an event value.  It must
	 * return a new { seed, value } pair. The `seed` will be fed back into the next
	 * invocation of stepper, and the `value` will be propagated as the event value.
	 * @param {function(seed:*, value:*):{seed:*, value:*}} stepper loop step function
	 * @param {*} seed initial seed value passed to first stepper call
	 * @param {Stream} stream event stream
	 * @returns {Stream} new stream whose values are the `value` field of the objects
	 * returned by the stepper
	 */
	function loop(stepper, seed, stream) {
		return new Stream(new Loop(stepper, seed, stream.source));
	}
	
	function Loop(stepper, seed, source) {
		this.step = stepper;
		this.seed = seed;
		this.source = source;
	}
	
	Loop.prototype.run = function (sink, scheduler) {
		return this.source.run(new LoopSink(this.step, this.seed, sink), scheduler);
	};
	
	function LoopSink(stepper, seed, sink) {
		this.step = stepper;
		this.seed = seed;
		this.sink = sink;
	}
	
	LoopSink.prototype.error = Pipe.prototype.error;
	
	LoopSink.prototype.event = function (t, x) {
		var result = this.step(this.seed, x);
		this.seed = result.seed;
		this.sink.event(t, result.value);
	};
	
	LoopSink.prototype.end = function (t) {
		this.sink.end(t, this.seed);
	};

/***/ },
/* 46 */
/*!*********************************************!*\
  !*** ./~/most/lib/combinator/accumulate.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Stream = __webpack_require__(/*! ../Stream */ 5);
	var Pipe = __webpack_require__(/*! ../sink/Pipe */ 42);
	var runSource = __webpack_require__(/*! ../runSource */ 39).withDefaultScheduler;
	var dispose = __webpack_require__(/*! ../disposable/dispose */ 8);
	var PropagateTask = __webpack_require__(/*! ../scheduler/PropagateTask */ 12);
	
	exports.scan = scan;
	exports.reduce = reduce;
	
	/**
	 * Create a stream containing successive reduce results of applying f to
	 * the previous reduce result and the current stream item.
	 * @param {function(result:*, x:*):*} f reducer function
	 * @param {*} initial initial value
	 * @param {Stream} stream stream to scan
	 * @returns {Stream} new stream containing successive reduce results
	 */
	function scan(f, initial, stream) {
		return new Stream(new Scan(f, initial, stream.source));
	}
	
	function Scan(f, z, source) {
		this.source = source;
		this.f = f;
		this.value = z;
	}
	
	Scan.prototype.run = function (sink, scheduler) {
		var d1 = scheduler.asap(PropagateTask.event(this.value, sink));
		var d2 = this.source.run(new ScanSink(this.f, this.value, sink), scheduler);
		return dispose.all([d1, d2]);
	};
	
	function ScanSink(f, z, sink) {
		this.f = f;
		this.value = z;
		this.sink = sink;
	}
	
	ScanSink.prototype.event = function (t, x) {
		var f = this.f;
		this.value = f(this.value, x);
		this.sink.event(t, this.value);
	};
	
	ScanSink.prototype.error = Pipe.prototype.error;
	ScanSink.prototype.end = Pipe.prototype.end;
	
	/**
	 * Reduce a stream to produce a single result.  Note that reducing an infinite
	 * stream will return a Promise that never fulfills, but that may reject if an error
	 * occurs.
	 * @param {function(result:*, x:*):*} f reducer function
	 * @param {*} initial initial value
	 * @param {Stream} stream to reduce
	 * @returns {Promise} promise for the file result of the reduce
	 */
	function reduce(f, initial, stream) {
		return runSource(new Reduce(f, initial, stream.source));
	}
	
	function Reduce(f, z, source) {
		this.source = source;
		this.f = f;
		this.value = z;
	}
	
	Reduce.prototype.run = function (sink, scheduler) {
		return this.source.run(new ReduceSink(this.f, this.value, sink), scheduler);
	};
	
	function ReduceSink(f, z, sink) {
		this.f = f;
		this.value = z;
		this.sink = sink;
	}
	
	ReduceSink.prototype.event = function (t, x) {
		var f = this.f;
		this.value = f(this.value, x);
		this.sink.event(t, this.value);
	};
	
	ReduceSink.prototype.error = Pipe.prototype.error;
	
	ReduceSink.prototype.end = function (t) {
		this.sink.end(t, this.value);
	};
	
	function noop() {}

/***/ },
/* 47 */
/*!*************************************!*\
  !*** ./~/most/lib/source/unfold.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Stream = __webpack_require__(/*! ../Stream */ 5);
	
	exports.unfold = unfold;
	
	/**
	 * Compute a stream by unfolding tuples of future values from a seed value
	 * Event times may be controlled by returning a Promise from f
	 * @param {function(seed:*):{value:*, seed:*, done:boolean}|Promise<{value:*, seed:*, done:boolean}>} f unfolding function accepts
	 *  a seed and returns a new tuple with a value, new seed, and boolean done flag.
	 *  If tuple.done is true, the stream will end.
	 * @param {*} seed seed value
	 * @returns {Stream} stream containing all value of all tuples produced by the
	 *  unfolding function.
	 */
	function unfold(f, seed) {
		return new Stream(new UnfoldSource(f, seed));
	}
	
	function UnfoldSource(f, seed) {
		this.f = f;
		this.value = seed;
	}
	
	UnfoldSource.prototype.run = function (sink, scheduler) {
		return new Unfold(this.f, this.value, sink, scheduler);
	};
	
	function Unfold(f, x, sink, scheduler) {
		this.f = f;
		this.sink = sink;
		this.scheduler = scheduler;
		this.active = true;
	
		var self = this;
		function err(e) {
			self.sink.error(self.scheduler.now(), e);
		}
	
		function start(unfold) {
			return stepUnfold(unfold, x);
		}
	
		Promise.resolve(this).then(start).catch(err);
	}
	
	Unfold.prototype.dispose = function () {
		this.active = false;
	};
	
	function stepUnfold(unfold, x) {
		var f = unfold.f;
		return Promise.resolve(f(x)).then(function (tuple) {
			return continueUnfold(unfold, tuple);
		});
	}
	
	function continueUnfold(unfold, tuple) {
		if (tuple.done) {
			unfold.sink.end(unfold.scheduler.now(), tuple.value);
			return tuple.value;
		}
	
		unfold.sink.event(unfold.scheduler.now(), tuple.value);
	
		if (!unfold.active) {
			return tuple.value;
		}
		return stepUnfold(unfold, tuple.seed);
	}

/***/ },
/* 48 */
/*!**************************************!*\
  !*** ./~/most/lib/source/iterate.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Stream = __webpack_require__(/*! ../Stream */ 5);
	
	exports.iterate = iterate;
	
	/**
	 * Compute a stream by iteratively calling f to produce values
	 * Event times may be controlled by returning a Promise from f
	 * @param {function(x:*):*|Promise<*>} f
	 * @param {*} x initial value
	 * @returns {Stream}
	 */
	function iterate(f, x) {
		return new Stream(new IterateSource(f, x));
	}
	
	function IterateSource(f, x) {
		this.f = f;
		this.value = x;
	}
	
	IterateSource.prototype.run = function (sink, scheduler) {
		return new Iterate(this.f, this.value, sink, scheduler);
	};
	
	function Iterate(f, initial, sink, scheduler) {
		this.f = f;
		this.sink = sink;
		this.scheduler = scheduler;
		this.active = true;
	
		var x = initial;
	
		var self = this;
		function err(e) {
			self.sink.error(self.scheduler.now(), e);
		}
	
		function start(iterate) {
			return stepIterate(iterate, x);
		}
	
		Promise.resolve(this).then(start).catch(err);
	}
	
	Iterate.prototype.dispose = function () {
		this.active = false;
	};
	
	function stepIterate(iterate, x) {
		iterate.sink.event(iterate.scheduler.now(), x);
	
		if (!iterate.active) {
			return x;
		}
	
		var f = iterate.f;
		return Promise.resolve(f(x)).then(function (y) {
			return continueIterate(iterate, y);
		});
	}
	
	function continueIterate(iterate, x) {
		return !iterate.active ? iterate.value : stepIterate(iterate, x);
	}

/***/ },
/* 49 */
/*!***************************************!*\
  !*** ./~/most/lib/source/generate.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Stream = __webpack_require__(/*! ../Stream */ 5);
	var base = __webpack_require__(/*! @most/prelude */ 6);
	
	exports.generate = generate;
	
	/**
	 * Compute a stream using an *async* generator, which yields promises
	 * to control event times.
	 * @param f
	 * @returns {Stream}
	 */
	function generate(f /*, ...args */) {
		return new Stream(new GenerateSource(f, base.tail(arguments)));
	}
	
	function GenerateSource(f, args) {
		this.f = f;
		this.args = args;
	}
	
	GenerateSource.prototype.run = function (sink, scheduler) {
		return new Generate(this.f.apply(void 0, this.args), sink, scheduler);
	};
	
	function Generate(iterator, sink, scheduler) {
		this.iterator = iterator;
		this.sink = sink;
		this.scheduler = scheduler;
		this.active = true;
	
		var self = this;
		function err(e) {
			self.sink.error(self.scheduler.now(), e);
		}
	
		Promise.resolve(this).then(next).catch(err);
	}
	
	function next(generate, x) {
		return generate.active ? handle(generate, generate.iterator.next(x)) : x;
	}
	
	function handle(generate, result) {
		if (result.done) {
			return generate.sink.end(generate.scheduler.now(), result.value);
		}
	
		return Promise.resolve(result.value).then(function (x) {
			return emit(generate, x);
		}, function (e) {
			return error(generate, e);
		});
	}
	
	function emit(generate, x) {
		generate.sink.event(generate.scheduler.now(), x);
		return next(generate, x);
	}
	
	function error(generate, e) {
		return handle(generate, generate.iterator.throw(e));
	}
	
	Generate.prototype.dispose = function () {
		this.active = false;
	};

/***/ },
/* 50 */
/*!****************************************!*\
  !*** ./~/most/lib/combinator/build.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var streamOf = __webpack_require__(/*! ../source/core */ 7).of;
	var continueWith = __webpack_require__(/*! ./continueWith */ 51).continueWith;
	
	exports.concat = concat;
	exports.cycle = cycle;
	exports.cons = cons;
	
	/**
	 * @param {*} x value to prepend
	 * @param {Stream} stream
	 * @returns {Stream} new stream with x prepended
	 */
	function cons(x, stream) {
	  return concat(streamOf(x), stream);
	}
	
	/**
	 * @param {Stream} left
	 * @param {Stream} right
	 * @returns {Stream} new stream containing all events in left followed by all
	 *  events in right.  This *timeshifts* right to the end of left.
	 */
	function concat(left, right) {
	  return continueWith(function () {
	    return right;
	  }, left);
	}
	
	/**
	 * @deprecated
	 * Tie stream into a circle, creating an infinite stream
	 * @param {Stream} stream
	 * @returns {Stream} new infinite stream
	 */
	function cycle(stream) {
	  return continueWith(function cycleNext() {
	    return cycle(stream);
	  }, stream);
	}

/***/ },
/* 51 */
/*!***********************************************!*\
  !*** ./~/most/lib/combinator/continueWith.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Stream = __webpack_require__(/*! ../Stream */ 5);
	var Sink = __webpack_require__(/*! ../sink/Pipe */ 42);
	var dispose = __webpack_require__(/*! ../disposable/dispose */ 8);
	var isPromise = __webpack_require__(/*! ../Promise */ 11).isPromise;
	
	exports.continueWith = continueWith;
	
	function continueWith(f, stream) {
		return new Stream(new ContinueWith(f, stream.source));
	}
	
	function ContinueWith(f, source) {
		this.f = f;
		this.source = source;
	}
	
	ContinueWith.prototype.run = function (sink, scheduler) {
		return new ContinueWithSink(this.f, this.source, sink, scheduler);
	};
	
	function ContinueWithSink(f, source, sink, scheduler) {
		this.f = f;
		this.sink = sink;
		this.scheduler = scheduler;
		this.active = true;
		this.disposable = dispose.once(source.run(this, scheduler));
	}
	
	ContinueWithSink.prototype.error = Sink.prototype.error;
	
	ContinueWithSink.prototype.event = function (t, x) {
		if (!this.active) {
			return;
		}
		this.sink.event(t, x);
	};
	
	ContinueWithSink.prototype.end = function (t, x) {
		if (!this.active) {
			return;
		}
	
		dispose.tryDispose(t, this.disposable, this.sink);
		this._startNext(t, x, this.sink);
	};
	
	ContinueWithSink.prototype._startNext = function (t, x, sink) {
		try {
			this.disposable = this._continue(this.f, x, sink);
		} catch (e) {
			sink.error(t, e);
		}
	};
	
	ContinueWithSink.prototype._continue = function (f, x, sink) {
		return f(x).source.run(sink, this.scheduler);
	};
	
	ContinueWithSink.prototype.dispose = function () {
		this.active = false;
		return this.disposable.dispose();
	};

/***/ },
/* 52 */
/*!**********************************************!*\
  !*** ./~/most/lib/combinator/applicative.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var combine = __webpack_require__(/*! ./combine */ 53).combine;
	var apply = __webpack_require__(/*! @most/prelude */ 6).apply;
	
	exports.ap = ap;
	
	/**
	 * Assume fs is a stream containing functions, and apply the latest function
	 * in fs to the latest value in xs.
	 * fs:         --f---------g--------h------>
	 * xs:         -a-------b-------c-------d-->
	 * ap(fs, xs): --fa-----fb-gb---gc--hc--hd->
	 * @param {Stream} fs stream of functions to apply to the latest x
	 * @param {Stream} xs stream of values to which to apply all the latest f
	 * @returns {Stream} stream containing all the applications of fs to xs
	 */
	function ap(fs, xs) {
	  return combine(apply, fs, xs);
	}

/***/ },
/* 53 */
/*!******************************************!*\
  !*** ./~/most/lib/combinator/combine.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Stream = __webpack_require__(/*! ../Stream */ 5);
	var transform = __webpack_require__(/*! ./transform */ 40);
	var core = __webpack_require__(/*! ../source/core */ 7);
	var Pipe = __webpack_require__(/*! ../sink/Pipe */ 42);
	var IndexSink = __webpack_require__(/*! ../sink/IndexSink */ 54);
	var dispose = __webpack_require__(/*! ../disposable/dispose */ 8);
	var base = __webpack_require__(/*! @most/prelude */ 6);
	var invoke = __webpack_require__(/*! ../invoke */ 55);
	
	var map = base.map;
	var tail = base.tail;
	
	exports.combineArray = combineArray;
	exports.combine = combine;
	
	/**
	 * Combine latest events from all input streams
	 * @param {function(...events):*} f function to combine most recent events
	 * @returns {Stream} stream containing the result of applying f to the most recent
	 *  event of each input stream, whenever a new event arrives on any stream.
	 */
	function combine(f /*, ...streams */) {
		return combineArray(f, tail(arguments));
	}
	
	/**
	 * Combine latest events from all input streams
	 * @param {function(...events):*} f function to combine most recent events
	 * @param {[Stream]} streams most recent events
	 * @returns {Stream} stream containing the result of applying f to the most recent
	 *  event of each input stream, whenever a new event arrives on any stream.
	 */
	function combineArray(f, streams) {
		var l = streams.length;
		return l === 0 ? core.empty() : l === 1 ? transform.map(f, streams[0]) : new Stream(combineSources(f, streams));
	}
	
	function combineSources(f, streams) {
		return new Combine(f, map(getSource, streams));
	}
	
	function getSource(stream) {
		return stream.source;
	}
	
	function Combine(f, sources) {
		this.f = f;
		this.sources = sources;
	}
	
	Combine.prototype.run = function (sink, scheduler) {
		var l = this.sources.length;
		var disposables = new Array(l);
		var sinks = new Array(l);
	
		var mergeSink = new CombineSink(disposables, sinks, sink, this.f);
	
		for (var indexSink, i = 0; i < l; ++i) {
			indexSink = sinks[i] = new IndexSink(i, mergeSink);
			disposables[i] = this.sources[i].run(indexSink, scheduler);
		}
	
		return dispose.all(disposables);
	};
	
	function CombineSink(disposables, sinks, sink, f) {
		this.sink = sink;
		this.disposables = disposables;
		this.sinks = sinks;
		this.f = f;
	
		var l = sinks.length;
		this.awaiting = l;
		this.values = new Array(l);
		this.hasValue = new Array(l);
		for (var i = 0; i < l; ++i) {
			this.hasValue[i] = false;
		}
	
		this.activeCount = sinks.length;
	}
	
	CombineSink.prototype.error = Pipe.prototype.error;
	
	CombineSink.prototype.event = function (t, indexedValue) {
		var i = indexedValue.index;
		var awaiting = this._updateReady(i);
	
		this.values[i] = indexedValue.value;
		if (awaiting === 0) {
			this.sink.event(t, invoke(this.f, this.values));
		}
	};
	
	CombineSink.prototype._updateReady = function (index) {
		if (this.awaiting > 0) {
			if (!this.hasValue[index]) {
				this.hasValue[index] = true;
				this.awaiting -= 1;
			}
		}
		return this.awaiting;
	};
	
	CombineSink.prototype.end = function (t, indexedValue) {
		dispose.tryDispose(t, this.disposables[indexedValue.index], this.sink);
		if (--this.activeCount === 0) {
			this.sink.end(t, indexedValue.value);
		}
	};

/***/ },
/* 54 */
/*!**************************************!*\
  !*** ./~/most/lib/sink/IndexSink.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Sink = __webpack_require__(/*! ./Pipe */ 42);
	
	module.exports = IndexSink;
	
	function IndexSink(i, sink) {
		this.sink = sink;
		this.index = i;
		this.active = true;
		this.value = void 0;
	}
	
	IndexSink.prototype.event = function (t, x) {
		if (!this.active) {
			return;
		}
		this.value = x;
		this.sink.event(t, this);
	};
	
	IndexSink.prototype.end = function (t, x) {
		if (!this.active) {
			return;
		}
		this.active = false;
		this.sink.end(t, { index: this.index, value: x });
	};
	
	IndexSink.prototype.error = Sink.prototype.error;

/***/ },
/* 55 */
/*!******************************!*\
  !*** ./~/most/lib/invoke.js ***!
  \******************************/
/***/ function(module, exports) {

	"use strict";
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	module.exports = invoke;
	
	function invoke(f, args) {
		/*eslint complexity: [2,7]*/
		switch (args.length) {
			case 0:
				return f();
			case 1:
				return f(args[0]);
			case 2:
				return f(args[0], args[1]);
			case 3:
				return f(args[0], args[1], args[2]);
			case 4:
				return f(args[0], args[1], args[2], args[3]);
			case 5:
				return f(args[0], args[1], args[2], args[3], args[4]);
			default:
				return f.apply(void 0, args);
		}
	}

/***/ },
/* 56 */
/*!********************************************!*\
  !*** ./~/most/lib/combinator/transduce.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Stream = __webpack_require__(/*! ../Stream */ 5);
	
	exports.transduce = transduce;
	
	/**
	 * Transform a stream by passing its events through a transducer.
	 * @param  {function} transducer transducer function
	 * @param  {Stream} stream stream whose events will be passed through the
	 *  transducer
	 * @return {Stream} stream of events transformed by the transducer
	 */
	function transduce(transducer, stream) {
		return new Stream(new Transduce(transducer, stream.source));
	}
	
	function Transduce(transducer, source) {
		this.transducer = transducer;
		this.source = source;
	}
	
	Transduce.prototype.run = function (sink, scheduler) {
		var xf = this.transducer(new Transformer(sink));
		return this.source.run(new TransduceSink(getTxHandler(xf), sink), scheduler);
	};
	
	function TransduceSink(adapter, sink) {
		this.xf = adapter;
		this.sink = sink;
	}
	
	TransduceSink.prototype.event = function (t, x) {
		var next = this.xf.step(t, x);
	
		return this.xf.isReduced(next) ? this.sink.end(t, this.xf.getResult(next)) : next;
	};
	
	TransduceSink.prototype.end = function (t, x) {
		return this.xf.result(x);
	};
	
	TransduceSink.prototype.error = function (t, e) {
		return this.sink.error(t, e);
	};
	
	function Transformer(sink) {
		this.time = -Infinity;
		this.sink = sink;
	}
	
	Transformer.prototype['@@transducer/init'] = Transformer.prototype.init = function () {};
	
	Transformer.prototype['@@transducer/step'] = Transformer.prototype.step = function (t, x) {
		if (!isNaN(t)) {
			this.time = Math.max(t, this.time);
		}
		return this.sink.event(this.time, x);
	};
	
	Transformer.prototype['@@transducer/result'] = Transformer.prototype.result = function (x) {
		return this.sink.end(this.time, x);
	};
	
	/**
	 * Given an object supporting the new or legacy transducer protocol,
	 * create an adapter for it.
	 * @param {object} tx transform
	 * @returns {TxAdapter|LegacyTxAdapter}
	 */
	function getTxHandler(tx) {
		return typeof tx['@@transducer/step'] === 'function' ? new TxAdapter(tx) : new LegacyTxAdapter(tx);
	}
	
	/**
	 * Adapter for new official transducer protocol
	 * @param {object} tx transform
	 * @constructor
	 */
	function TxAdapter(tx) {
		this.tx = tx;
	}
	
	TxAdapter.prototype.step = function (t, x) {
		return this.tx['@@transducer/step'](t, x);
	};
	TxAdapter.prototype.result = function (x) {
		return this.tx['@@transducer/result'](x);
	};
	TxAdapter.prototype.isReduced = function (x) {
		return x != null && x['@@transducer/reduced'];
	};
	TxAdapter.prototype.getResult = function (x) {
		return x['@@transducer/value'];
	};
	
	/**
	 * Adapter for older transducer protocol
	 * @param {object} tx transform
	 * @constructor
	 */
	function LegacyTxAdapter(tx) {
		this.tx = tx;
	}
	
	LegacyTxAdapter.prototype.step = function (t, x) {
		return this.tx.step(t, x);
	};
	LegacyTxAdapter.prototype.result = function (x) {
		return this.tx.result(x);
	};
	LegacyTxAdapter.prototype.isReduced = function (x) {
		return x != null && x.__transducers_reduced__;
	};
	LegacyTxAdapter.prototype.getResult = function (x) {
		return x.value;
	};

/***/ },
/* 57 */
/*!******************************************!*\
  !*** ./~/most/lib/combinator/flatMap.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var mergeConcurrently = __webpack_require__(/*! ./mergeConcurrently */ 58).mergeConcurrently;
	var mergeMapConcurrently = __webpack_require__(/*! ./mergeConcurrently */ 58).mergeMapConcurrently;
	
	exports.flatMap = flatMap;
	exports.join = join;
	
	/**
	 * Map each value in the stream to a new stream, and merge it into the
	 * returned outer stream. Event arrival times are preserved.
	 * @param {function(x:*):Stream} f chaining function, must return a Stream
	 * @param {Stream} stream
	 * @returns {Stream} new stream containing all events from each stream returned by f
	 */
	function flatMap(f, stream) {
	  return mergeMapConcurrently(f, Infinity, stream);
	}
	
	/**
	 * Monadic join. Flatten a Stream<Stream<X>> to Stream<X> by merging inner
	 * streams to the outer. Event arrival times are preserved.
	 * @param {Stream<Stream<X>>} stream stream of streams
	 * @returns {Stream<X>} new stream containing all events of all inner streams
	 */
	function join(stream) {
	  return mergeConcurrently(Infinity, stream);
	}

/***/ },
/* 58 */
/*!****************************************************!*\
  !*** ./~/most/lib/combinator/mergeConcurrently.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Stream = __webpack_require__(/*! ../Stream */ 5);
	var dispose = __webpack_require__(/*! ../disposable/dispose */ 8);
	var LinkedList = __webpack_require__(/*! ../LinkedList */ 59);
	var identity = __webpack_require__(/*! @most/prelude */ 6).id;
	
	exports.mergeConcurrently = mergeConcurrently;
	exports.mergeMapConcurrently = mergeMapConcurrently;
	
	function mergeConcurrently(concurrency, stream) {
		return mergeMapConcurrently(identity, concurrency, stream);
	}
	
	function mergeMapConcurrently(f, concurrency, stream) {
		return new Stream(new MergeConcurrently(f, concurrency, stream.source));
	}
	
	function MergeConcurrently(f, concurrency, source) {
		this.f = f;
		this.concurrency = concurrency;
		this.source = source;
	}
	
	MergeConcurrently.prototype.run = function (sink, scheduler) {
		return new Outer(this.f, this.concurrency, this.source, sink, scheduler);
	};
	
	function Outer(f, concurrency, source, sink, scheduler) {
		this.f = f;
		this.concurrency = concurrency;
		this.sink = sink;
		this.scheduler = scheduler;
		this.pending = [];
		this.current = new LinkedList();
		this.disposable = dispose.once(source.run(this, scheduler));
		this.active = true;
	}
	
	Outer.prototype.event = function (t, x) {
		this._addInner(t, x);
	};
	
	Outer.prototype._addInner = function (t, x) {
		if (this.current.length < this.concurrency) {
			this._startInner(t, x);
		} else {
			this.pending.push(x);
		}
	};
	
	Outer.prototype._startInner = function (t, x) {
		try {
			this._initInner(t, x);
		} catch (e) {
			this.error(t, e);
		}
	};
	
	Outer.prototype._initInner = function (t, x) {
		var innerSink = new Inner(t, this, this.sink);
		innerSink.disposable = mapAndRun(this.f, x, innerSink, this.scheduler);
		this.current.add(innerSink);
	};
	
	function mapAndRun(f, x, sink, scheduler) {
		return f(x).source.run(sink, scheduler);
	}
	
	Outer.prototype.end = function (t, x) {
		this.active = false;
		dispose.tryDispose(t, this.disposable, this.sink);
		this._checkEnd(t, x);
	};
	
	Outer.prototype.error = function (t, e) {
		this.active = false;
		this.sink.error(t, e);
	};
	
	Outer.prototype.dispose = function () {
		this.active = false;
		this.pending.length = 0;
		return Promise.all([this.disposable.dispose(), this.current.dispose()]);
	};
	
	Outer.prototype._endInner = function (t, x, inner) {
		this.current.remove(inner);
		dispose.tryDispose(t, inner, this);
	
		if (this.pending.length === 0) {
			this._checkEnd(t, x);
		} else {
			this._startInner(t, this.pending.shift());
		}
	};
	
	Outer.prototype._checkEnd = function (t, x) {
		if (!this.active && this.current.isEmpty()) {
			this.sink.end(t, x);
		}
	};
	
	function Inner(time, outer, sink) {
		this.prev = this.next = null;
		this.time = time;
		this.outer = outer;
		this.sink = sink;
		this.disposable = void 0;
	}
	
	Inner.prototype.event = function (t, x) {
		this.sink.event(Math.max(t, this.time), x);
	};
	
	Inner.prototype.end = function (t, x) {
		this.outer._endInner(Math.max(t, this.time), x, this);
	};
	
	Inner.prototype.error = function (t, e) {
		this.outer.error(Math.max(t, this.time), e);
	};
	
	Inner.prototype.dispose = function () {
		return this.disposable.dispose();
	};

/***/ },
/* 59 */
/*!**********************************!*\
  !*** ./~/most/lib/LinkedList.js ***!
  \**********************************/
/***/ function(module, exports) {

	"use strict";
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	module.exports = LinkedList;
	
	/**
	 * Doubly linked list
	 * @constructor
	 */
	function LinkedList() {
		this.head = null;
		this.length = 0;
	}
	
	/**
	 * Add a node to the end of the list
	 * @param {{prev:Object|null, next:Object|null, dispose:function}} x node to add
	 */
	LinkedList.prototype.add = function (x) {
		if (this.head !== null) {
			this.head.prev = x;
			x.next = this.head;
		}
		this.head = x;
		++this.length;
	};
	
	/**
	 * Remove the provided node from the list
	 * @param {{prev:Object|null, next:Object|null, dispose:function}} x node to remove
	 */
	LinkedList.prototype.remove = function (x) {
		--this.length;
		if (x === this.head) {
			this.head = this.head.next;
		}
		if (x.next !== null) {
			x.next.prev = x.prev;
			x.next = null;
		}
		if (x.prev !== null) {
			x.prev.next = x.next;
			x.prev = null;
		}
	};
	
	/**
	 * @returns {boolean} true iff there are no nodes in the list
	 */
	LinkedList.prototype.isEmpty = function () {
		return this.length === 0;
	};
	
	/**
	 * Dispose all nodes
	 * @returns {Promise} promise that fulfills when all nodes have been disposed,
	 *  or rejects if an error occurs while disposing
	 */
	LinkedList.prototype.dispose = function () {
		if (this.isEmpty()) {
			return Promise.resolve();
		}
	
		var promises = [];
		var x = this.head;
		this.head = null;
		this.length = 0;
	
		while (x !== null) {
			promises.push(x.dispose());
			x = x.next;
		}
	
		return Promise.all(promises);
	};

/***/ },
/* 60 */
/*!********************************************!*\
  !*** ./~/most/lib/combinator/concatMap.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var mergeMapConcurrently = __webpack_require__(/*! ./mergeConcurrently */ 58).mergeMapConcurrently;
	
	exports.concatMap = concatMap;
	
	/**
	 * Map each value in stream to a new stream, and concatenate them all
	 * stream:              -a---b---cX
	 * f(a):                 1-1-1-1X
	 * f(b):                        -2-2-2-2X
	 * f(c):                                -3-3-3-3X
	 * stream.concatMap(f): -1-1-1-1-2-2-2-2-3-3-3-3X
	 * @param {function(x:*):Stream} f function to map each value to a stream
	 * @param {Stream} stream
	 * @returns {Stream} new stream containing all events from each stream returned by f
	 */
	function concatMap(f, stream) {
	  return mergeMapConcurrently(f, 1, stream);
	}

/***/ },
/* 61 */
/*!****************************************!*\
  !*** ./~/most/lib/combinator/merge.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Stream = __webpack_require__(/*! ../Stream */ 5);
	var Pipe = __webpack_require__(/*! ../sink/Pipe */ 42);
	var IndexSink = __webpack_require__(/*! ../sink/IndexSink */ 54);
	var empty = __webpack_require__(/*! ../source/core */ 7).empty;
	var dispose = __webpack_require__(/*! ../disposable/dispose */ 8);
	var base = __webpack_require__(/*! @most/prelude */ 6);
	
	var copy = base.copy;
	var reduce = base.reduce;
	
	exports.merge = merge;
	exports.mergeArray = mergeArray;
	
	/**
	 * @returns {Stream} stream containing events from all streams in the argument
	 * list in time order.  If two events are simultaneous they will be merged in
	 * arbitrary order.
	 */
	function merge() /*...streams*/{
		return mergeArray(copy(arguments));
	}
	
	/**
	 * @param {Array} streams array of stream to merge
	 * @returns {Stream} stream containing events from all input observables
	 * in time order.  If two events are simultaneous they will be merged in
	 * arbitrary order.
	 */
	function mergeArray(streams) {
		var l = streams.length;
		return l === 0 ? empty() : l === 1 ? streams[0] : new Stream(mergeSources(streams));
	}
	
	/**
	 * This implements fusion/flattening for merge.  It will
	 * fuse adjacent merge operations.  For example:
	 * - a.merge(b).merge(c) effectively becomes merge(a, b, c)
	 * - merge(a, merge(b, c)) effectively becomes merge(a, b, c)
	 * It does this by concatenating the sources arrays of
	 * any nested Merge sources, in effect "flattening" nested
	 * merge operations into a single merge.
	 */
	function mergeSources(streams) {
		return new Merge(reduce(appendSources, [], streams));
	}
	
	function appendSources(sources, stream) {
		var source = stream.source;
		return source instanceof Merge ? sources.concat(source.sources) : sources.concat(source);
	}
	
	function Merge(sources) {
		this.sources = sources;
	}
	
	Merge.prototype.run = function (sink, scheduler) {
		var l = this.sources.length;
		var disposables = new Array(l);
		var sinks = new Array(l);
	
		var mergeSink = new MergeSink(disposables, sinks, sink);
	
		for (var indexSink, i = 0; i < l; ++i) {
			indexSink = sinks[i] = new IndexSink(i, mergeSink);
			disposables[i] = this.sources[i].run(indexSink, scheduler);
		}
	
		return dispose.all(disposables);
	};
	
	function MergeSink(disposables, sinks, sink) {
		this.sink = sink;
		this.disposables = disposables;
		this.activeCount = sinks.length;
	}
	
	MergeSink.prototype.error = Pipe.prototype.error;
	
	MergeSink.prototype.event = function (t, indexValue) {
		this.sink.event(t, indexValue.value);
	};
	
	MergeSink.prototype.end = function (t, indexedValue) {
		dispose.tryDispose(t, this.disposables[indexedValue.index], this.sink);
		if (--this.activeCount === 0) {
			this.sink.end(t, indexedValue.value);
		}
	};

/***/ },
/* 62 */
/*!*****************************************!*\
  !*** ./~/most/lib/combinator/sample.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Stream = __webpack_require__(/*! ../Stream */ 5);
	var Pipe = __webpack_require__(/*! ../sink/Pipe */ 42);
	var dispose = __webpack_require__(/*! ../disposable/dispose */ 8);
	var base = __webpack_require__(/*! @most/prelude */ 6);
	var invoke = __webpack_require__(/*! ../invoke */ 55);
	
	exports.sample = sample;
	exports.sampleWith = sampleWith;
	exports.sampleArray = sampleArray;
	
	/**
	 * When an event arrives on sampler, emit the result of calling f with the latest
	 * values of all streams being sampled
	 * @param {function(...values):*} f function to apply to each set of sampled values
	 * @param {Stream} sampler streams will be sampled whenever an event arrives
	 *  on sampler
	 * @returns {Stream} stream of sampled and transformed values
	 */
	function sample(f, sampler /*, ...streams */) {
		return sampleArray(f, sampler, base.drop(2, arguments));
	}
	
	/**
	 * When an event arrives on sampler, emit the latest event value from stream.
	 * @param {Stream} sampler stream of events at whose arrival time
	 *  stream's latest value will be propagated
	 * @param {Stream} stream stream of values
	 * @returns {Stream} sampled stream of values
	 */
	function sampleWith(sampler, stream) {
		return new Stream(new Sampler(base.id, sampler.source, [stream.source]));
	}
	
	function sampleArray(f, sampler, streams) {
		return new Stream(new Sampler(f, sampler.source, base.map(getSource, streams)));
	}
	
	function getSource(stream) {
		return stream.source;
	}
	
	function Sampler(f, sampler, sources) {
		this.f = f;
		this.sampler = sampler;
		this.sources = sources;
	}
	
	Sampler.prototype.run = function (sink, scheduler) {
		var l = this.sources.length;
		var disposables = new Array(l + 1);
		var sinks = new Array(l);
	
		var sampleSink = new SampleSink(this.f, sinks, sink);
	
		for (var hold, i = 0; i < l; ++i) {
			hold = sinks[i] = new Hold(sampleSink);
			disposables[i] = this.sources[i].run(hold, scheduler);
		}
	
		disposables[i] = this.sampler.run(sampleSink, scheduler);
	
		return dispose.all(disposables);
	};
	
	function Hold(sink) {
		this.sink = sink;
		this.hasValue = false;
	}
	
	Hold.prototype.event = function (t, x) {
		this.value = x;
		this.hasValue = true;
		this.sink._notify(this);
	};
	
	Hold.prototype.end = function () {};
	Hold.prototype.error = Pipe.prototype.error;
	
	function SampleSink(f, sinks, sink) {
		this.f = f;
		this.sinks = sinks;
		this.sink = sink;
		this.active = false;
	}
	
	SampleSink.prototype._notify = function () {
		if (!this.active) {
			this.active = this.sinks.every(hasValue);
		}
	};
	
	SampleSink.prototype.event = function (t) {
		if (this.active) {
			this.sink.event(t, invoke(this.f, base.map(getValue, this.sinks)));
		}
	};
	
	SampleSink.prototype.end = Pipe.prototype.end;
	SampleSink.prototype.error = Pipe.prototype.error;
	
	function hasValue(hold) {
		return hold.hasValue;
	}
	
	function getValue(hold) {
		return hold.value;
	}

/***/ },
/* 63 */
/*!**************************************!*\
  !*** ./~/most/lib/combinator/zip.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Stream = __webpack_require__(/*! ../Stream */ 5);
	var transform = __webpack_require__(/*! ./transform */ 40);
	var core = __webpack_require__(/*! ../source/core */ 7);
	var Sink = __webpack_require__(/*! ../sink/Pipe */ 42);
	var IndexSink = __webpack_require__(/*! ../sink/IndexSink */ 54);
	var dispose = __webpack_require__(/*! ../disposable/dispose */ 8);
	var base = __webpack_require__(/*! @most/prelude */ 6);
	var invoke = __webpack_require__(/*! ../invoke */ 55);
	var Queue = __webpack_require__(/*! ../Queue */ 64);
	
	var map = base.map;
	var tail = base.tail;
	
	exports.zip = zip;
	exports.zipArray = zipArray;
	
	/**
	 * Combine streams pairwise (or tuple-wise) by index by applying f to values
	 * at corresponding indices.  The returned stream ends when any of the input
	 * streams ends.
	 * @param {function} f function to combine values
	 * @returns {Stream} new stream with items at corresponding indices combined
	 *  using f
	 */
	function zip(f /*,...streams */) {
		return zipArray(f, tail(arguments));
	}
	
	/**
	 * Combine streams pairwise (or tuple-wise) by index by applying f to values
	 * at corresponding indices.  The returned stream ends when any of the input
	 * streams ends.
	 * @param {function} f function to combine values
	 * @param {[Stream]} streams streams to zip using f
	 * @returns {Stream} new stream with items at corresponding indices combined
	 *  using f
	 */
	function zipArray(f, streams) {
		return streams.length === 0 ? core.empty() : streams.length === 1 ? transform.map(f, streams[0]) : new Stream(new Zip(f, map(getSource, streams)));
	}
	
	function getSource(stream) {
		return stream.source;
	}
	
	function Zip(f, sources) {
		this.f = f;
		this.sources = sources;
	}
	
	Zip.prototype.run = function (sink, scheduler) {
		var l = this.sources.length;
		var disposables = new Array(l);
		var sinks = new Array(l);
		var buffers = new Array(l);
	
		var zipSink = new ZipSink(this.f, buffers, sinks, sink);
	
		for (var indexSink, i = 0; i < l; ++i) {
			buffers[i] = new Queue();
			indexSink = sinks[i] = new IndexSink(i, zipSink);
			disposables[i] = this.sources[i].run(indexSink, scheduler);
		}
	
		return dispose.all(disposables);
	};
	
	function ZipSink(f, buffers, sinks, sink) {
		this.f = f;
		this.sinks = sinks;
		this.sink = sink;
		this.buffers = buffers;
	}
	
	ZipSink.prototype.event = function (t, indexedValue) {
		var buffers = this.buffers;
		var buffer = buffers[indexedValue.index];
	
		buffer.push(indexedValue.value);
	
		if (buffer.length() === 1) {
			if (!ready(this.buffers)) {
				return;
			}
	
			emitZipped(this.f, t, buffers, this.sink);
	
			if (ended(this.buffers, this.sinks)) {
				this.sink.end(t, void 0);
			}
		}
	};
	
	ZipSink.prototype.end = function (t, indexedValue) {
		var buffer = this.buffers[indexedValue.index];
		if (buffer.isEmpty()) {
			this.sink.end(t, indexedValue.value);
		}
	};
	
	ZipSink.prototype.error = Sink.prototype.error;
	
	function emitZipped(f, t, buffers, sink) {
		sink.event(t, invoke(f, map(head, buffers)));
	}
	
	function head(buffer) {
		return buffer.shift();
	}
	
	function ended(buffers, sinks) {
		for (var i = 0, l = buffers.length; i < l; ++i) {
			if (buffers[i].isEmpty() && !sinks[i].active) {
				return true;
			}
		}
		return false;
	}
	
	function ready(buffers) {
		for (var i = 0, l = buffers.length; i < l; ++i) {
			if (buffers[i].isEmpty()) {
				return false;
			}
		}
		return true;
	}

/***/ },
/* 64 */
/*!*****************************!*\
  !*** ./~/most/lib/Queue.js ***!
  \*****************************/
/***/ function(module, exports) {

	"use strict";
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	// Based on https://github.com/petkaantonov/deque
	
	module.exports = Queue;
	
	function Queue(capPow2) {
		this._capacity = capPow2 || 32;
		this._length = 0;
		this._head = 0;
	}
	
	Queue.prototype.push = function (x) {
		var len = this._length;
		this._checkCapacity(len + 1);
	
		var i = this._head + len & this._capacity - 1;
		this[i] = x;
		this._length = len + 1;
	};
	
	Queue.prototype.shift = function () {
		var head = this._head;
		var x = this[head];
	
		this[head] = void 0;
		this._head = head + 1 & this._capacity - 1;
		this._length--;
		return x;
	};
	
	Queue.prototype.isEmpty = function () {
		return this._length === 0;
	};
	
	Queue.prototype.length = function () {
		return this._length;
	};
	
	Queue.prototype._checkCapacity = function (size) {
		if (this._capacity < size) {
			this._ensureCapacity(this._capacity << 1);
		}
	};
	
	Queue.prototype._ensureCapacity = function (capacity) {
		var oldCapacity = this._capacity;
		this._capacity = capacity;
	
		var last = this._head + this._length;
	
		if (last > oldCapacity) {
			copy(this, 0, this, oldCapacity, last & oldCapacity - 1);
		}
	};
	
	function copy(src, srcIndex, dst, dstIndex, len) {
		for (var j = 0; j < len; ++j) {
			dst[j + dstIndex] = src[j + srcIndex];
			src[j + srcIndex] = void 0;
		}
	}

/***/ },
/* 65 */
/*!*****************************************!*\
  !*** ./~/most/lib/combinator/switch.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Stream = __webpack_require__(/*! ../Stream */ 5);
	var dispose = __webpack_require__(/*! ../disposable/dispose */ 8);
	
	exports.switch = switchLatest;
	
	/**
	 * Given a stream of streams, return a new stream that adopts the behavior
	 * of the most recent inner stream.
	 * @param {Stream} stream of streams on which to switch
	 * @returns {Stream} switching stream
	 */
	function switchLatest(stream) {
		return new Stream(new Switch(stream.source));
	}
	
	function Switch(source) {
		this.source = source;
	}
	
	Switch.prototype.run = function (sink, scheduler) {
		var switchSink = new SwitchSink(sink, scheduler);
		return dispose.all(switchSink, this.source.run(switchSink, scheduler));
	};
	
	function SwitchSink(sink, scheduler) {
		this.sink = sink;
		this.scheduler = scheduler;
		this.current = null;
		this.ended = false;
	}
	
	SwitchSink.prototype.event = function (t, stream) {
		this._disposeCurrent(t); // TODO: capture the result of this dispose
		this.current = new Segment(t, Infinity, this, this.sink);
		this.current.disposable = stream.source.run(this.current, this.scheduler);
	};
	
	SwitchSink.prototype.end = function (t, x) {
		this.ended = true;
		this._checkEnd(t, x);
	};
	
	SwitchSink.prototype.error = function (t, e) {
		this.ended = true;
		this.sink.error(t, e);
	};
	
	SwitchSink.prototype.dispose = function () {
		return this._disposeCurrent(0);
	};
	
	SwitchSink.prototype._disposeCurrent = function (t) {
		if (this.current !== null) {
			return this.current._dispose(t);
		}
	};
	
	SwitchSink.prototype._disposeInner = function (t, inner) {
		inner._dispose(t); // TODO: capture the result of this dispose
		if (inner === this.current) {
			this.current = null;
		}
	};
	
	SwitchSink.prototype._checkEnd = function (t, x) {
		if (this.ended && this.current === null) {
			this.sink.end(t, x);
		}
	};
	
	SwitchSink.prototype._endInner = function (t, x, inner) {
		this._disposeInner(t, inner);
		this._checkEnd(t, x);
	};
	
	SwitchSink.prototype._errorInner = function (t, e, inner) {
		this._disposeInner(t, inner);
		this.sink.error(t, e);
	};
	
	function Segment(min, max, outer, sink) {
		this.min = min;
		this.max = max;
		this.outer = outer;
		this.sink = sink;
		this.disposable = dispose.empty();
	}
	
	Segment.prototype.event = function (t, x) {
		if (t < this.max) {
			this.sink.event(Math.max(t, this.min), x);
		}
	};
	
	Segment.prototype.end = function (t, x) {
		this.outer._endInner(Math.max(t, this.min), x, this);
	};
	
	Segment.prototype.error = function (t, e) {
		this.outer._errorInner(Math.max(t, this.min), e, this);
	};
	
	Segment.prototype._dispose = function (t) {
		this.max = t;
		dispose.tryDispose(t, this.disposable, this.sink);
	};

/***/ },
/* 66 */
/*!*****************************************!*\
  !*** ./~/most/lib/combinator/filter.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Stream = __webpack_require__(/*! ../Stream */ 5);
	var Sink = __webpack_require__(/*! ../sink/Pipe */ 42);
	var Filter = __webpack_require__(/*! ../fusion/Filter */ 43);
	
	exports.filter = filter;
	exports.skipRepeats = skipRepeats;
	exports.skipRepeatsWith = skipRepeatsWith;
	
	/**
	 * Retain only items matching a predicate
	 * @param {function(x:*):boolean} p filtering predicate called for each item
	 * @param {Stream} stream stream to filter
	 * @returns {Stream} stream containing only items for which predicate returns truthy
	 */
	function filter(p, stream) {
		return new Stream(Filter.create(p, stream.source));
	}
	
	/**
	 * Skip repeated events, using === to detect duplicates
	 * @param {Stream} stream stream from which to omit repeated events
	 * @returns {Stream} stream without repeated events
	 */
	function skipRepeats(stream) {
		return skipRepeatsWith(same, stream);
	}
	
	/**
	 * Skip repeated events using the provided equals function to detect duplicates
	 * @param {function(a:*, b:*):boolean} equals optional function to compare items
	 * @param {Stream} stream stream from which to omit repeated events
	 * @returns {Stream} stream without repeated events
	 */
	function skipRepeatsWith(equals, stream) {
		return new Stream(new SkipRepeats(equals, stream.source));
	}
	
	function SkipRepeats(equals, source) {
		this.equals = equals;
		this.source = source;
	}
	
	SkipRepeats.prototype.run = function (sink, scheduler) {
		return this.source.run(new SkipRepeatsSink(this.equals, sink), scheduler);
	};
	
	function SkipRepeatsSink(equals, sink) {
		this.equals = equals;
		this.sink = sink;
		this.value = void 0;
		this.init = true;
	}
	
	SkipRepeatsSink.prototype.end = Sink.prototype.end;
	SkipRepeatsSink.prototype.error = Sink.prototype.error;
	
	SkipRepeatsSink.prototype.event = function (t, x) {
		if (this.init) {
			this.init = false;
			this.value = x;
			this.sink.event(t, x);
		} else if (!this.equals(this.value, x)) {
			this.value = x;
			this.sink.event(t, x);
		}
	};
	
	function same(a, b) {
		return a === b;
	}

/***/ },
/* 67 */
/*!****************************************!*\
  !*** ./~/most/lib/combinator/slice.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Stream = __webpack_require__(/*! ../Stream */ 5);
	var Sink = __webpack_require__(/*! ../sink/Pipe */ 42);
	var core = __webpack_require__(/*! ../source/core */ 7);
	var dispose = __webpack_require__(/*! ../disposable/dispose */ 8);
	var Map = __webpack_require__(/*! ../fusion/Map */ 41);
	
	exports.take = take;
	exports.skip = skip;
	exports.slice = slice;
	exports.takeWhile = takeWhile;
	exports.skipWhile = skipWhile;
	
	/**
	 * @param {number} n
	 * @param {Stream} stream
	 * @returns {Stream} new stream containing only up to the first n items from stream
	 */
	function take(n, stream) {
		return slice(0, n, stream);
	}
	
	/**
	 * @param {number} n
	 * @param {Stream} stream
	 * @returns {Stream} new stream with the first n items removed
	 */
	function skip(n, stream) {
		return slice(n, Infinity, stream);
	}
	
	/**
	 * Slice a stream by index. Negative start/end indexes are not supported
	 * @param {number} start
	 * @param {number} end
	 * @param {Stream} stream
	 * @returns {Stream} stream containing items where start <= index < end
	 */
	function slice(start, end, stream) {
		return end <= start ? core.empty() : new Stream(sliceSource(start, end, stream.source));
	}
	
	function sliceSource(start, end, source) {
		return source instanceof Map ? commuteMapSlice(start, end, source) : source instanceof Slice ? fuseSlice(start, end, source) : new Slice(start, end, source);
	}
	
	function commuteMapSlice(start, end, source) {
		return Map.create(source.f, sliceSource(start, end, source.source));
	}
	
	function fuseSlice(start, end, source) {
		start += source.min;
		end = Math.min(end + source.min, source.max);
		return new Slice(start, end, source.source);
	}
	
	function Slice(min, max, source) {
		this.source = source;
		this.min = min;
		this.max = max;
	}
	
	Slice.prototype.run = function (sink, scheduler) {
		return new SliceSink(this.min, this.max - this.min, this.source, sink, scheduler);
	};
	
	function SliceSink(skip, take, source, sink, scheduler) {
		this.sink = sink;
		this.skip = skip;
		this.take = take;
		this.disposable = dispose.once(source.run(this, scheduler));
	}
	
	SliceSink.prototype.end = Sink.prototype.end;
	SliceSink.prototype.error = Sink.prototype.error;
	
	SliceSink.prototype.event = function (t, x) {
		if (this.skip > 0) {
			this.skip -= 1;
			return;
		}
	
		if (this.take === 0) {
			return;
		}
	
		this.take -= 1;
		this.sink.event(t, x);
		if (this.take === 0) {
			this.dispose();
			this.sink.end(t, x);
		}
	};
	
	SliceSink.prototype.dispose = function () {
		return this.disposable.dispose();
	};
	
	function takeWhile(p, stream) {
		return new Stream(new TakeWhile(p, stream.source));
	}
	
	function TakeWhile(p, source) {
		this.p = p;
		this.source = source;
	}
	
	TakeWhile.prototype.run = function (sink, scheduler) {
		return new TakeWhileSink(this.p, this.source, sink, scheduler);
	};
	
	function TakeWhileSink(p, source, sink, scheduler) {
		this.p = p;
		this.sink = sink;
		this.active = true;
		this.disposable = dispose.once(source.run(this, scheduler));
	}
	
	TakeWhileSink.prototype.end = Sink.prototype.end;
	TakeWhileSink.prototype.error = Sink.prototype.error;
	
	TakeWhileSink.prototype.event = function (t, x) {
		if (!this.active) {
			return;
		}
	
		var p = this.p;
		this.active = p(x);
		if (this.active) {
			this.sink.event(t, x);
		} else {
			this.dispose();
			this.sink.end(t, x);
		}
	};
	
	TakeWhileSink.prototype.dispose = function () {
		return this.disposable.dispose();
	};
	
	function skipWhile(p, stream) {
		return new Stream(new SkipWhile(p, stream.source));
	}
	
	function SkipWhile(p, source) {
		this.p = p;
		this.source = source;
	}
	
	SkipWhile.prototype.run = function (sink, scheduler) {
		return this.source.run(new SkipWhileSink(this.p, sink), scheduler);
	};
	
	function SkipWhileSink(p, sink) {
		this.p = p;
		this.sink = sink;
		this.skipping = true;
	}
	
	SkipWhileSink.prototype.end = Sink.prototype.end;
	SkipWhileSink.prototype.error = Sink.prototype.error;
	
	SkipWhileSink.prototype.event = function (t, x) {
		if (this.skipping) {
			var p = this.p;
			this.skipping = p(x);
			if (this.skipping) {
				return;
			}
		}
	
		this.sink.event(t, x);
	};

/***/ },
/* 68 */
/*!********************************************!*\
  !*** ./~/most/lib/combinator/timeslice.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Stream = __webpack_require__(/*! ../Stream */ 5);
	var Pipe = __webpack_require__(/*! ../sink/Pipe */ 42);
	var dispose = __webpack_require__(/*! ../disposable/dispose */ 8);
	var join = __webpack_require__(/*! ../combinator/flatMap */ 57).join;
	
	exports.during = during;
	exports.takeUntil = takeUntil;
	exports.skipUntil = skipUntil;
	
	function takeUntil(signal, stream) {
		return new Stream(new Until(signal.source, stream.source));
	}
	
	function skipUntil(signal, stream) {
		return new Stream(new Since(signal.source, stream.source));
	}
	
	function during(timeWindow, stream) {
		return takeUntil(join(timeWindow), skipUntil(timeWindow, stream));
	}
	
	function Until(maxSignal, source) {
		this.maxSignal = maxSignal;
		this.source = source;
	}
	
	Until.prototype.run = function (sink, scheduler) {
		var min = new Bound(-Infinity, sink);
		var max = new UpperBound(this.maxSignal, sink, scheduler);
		var disposable = this.source.run(new TimeWindowSink(min, max, sink), scheduler);
	
		return dispose.all([min, max, disposable]);
	};
	
	function Since(minSignal, source) {
		this.minSignal = minSignal;
		this.source = source;
	}
	
	Since.prototype.run = function (sink, scheduler) {
		var min = new LowerBound(this.minSignal, sink, scheduler);
		var max = new Bound(Infinity, sink);
		var disposable = this.source.run(new TimeWindowSink(min, max, sink), scheduler);
	
		return dispose.all([min, max, disposable]);
	};
	
	function Bound(value, sink) {
		this.value = value;
		this.sink = sink;
	}
	
	Bound.prototype.error = Pipe.prototype.error;
	Bound.prototype.event = noop;
	Bound.prototype.end = noop;
	Bound.prototype.dispose = noop;
	
	function TimeWindowSink(min, max, sink) {
		this.min = min;
		this.max = max;
		this.sink = sink;
	}
	
	TimeWindowSink.prototype.event = function (t, x) {
		if (t >= this.min.value && t < this.max.value) {
			this.sink.event(t, x);
		}
	};
	
	TimeWindowSink.prototype.error = Pipe.prototype.error;
	TimeWindowSink.prototype.end = Pipe.prototype.end;
	
	function LowerBound(signal, sink, scheduler) {
		this.value = Infinity;
		this.sink = sink;
		this.disposable = signal.run(this, scheduler);
	}
	
	LowerBound.prototype.event = function (t /*, x */) {
		if (t < this.value) {
			this.value = t;
		}
	};
	
	LowerBound.prototype.end = noop;
	LowerBound.prototype.error = Pipe.prototype.error;
	
	LowerBound.prototype.dispose = function () {
		return this.disposable.dispose();
	};
	
	function UpperBound(signal, sink, scheduler) {
		this.value = Infinity;
		this.sink = sink;
		this.disposable = signal.run(this, scheduler);
	}
	
	UpperBound.prototype.event = function (t, x) {
		if (t < this.value) {
			this.value = t;
			this.sink.end(t, x);
		}
	};
	
	UpperBound.prototype.end = noop;
	UpperBound.prototype.error = Pipe.prototype.error;
	
	UpperBound.prototype.dispose = function () {
		return this.disposable.dispose();
	};
	
	function noop() {}

/***/ },
/* 69 */
/*!****************************************!*\
  !*** ./~/most/lib/combinator/delay.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Stream = __webpack_require__(/*! ../Stream */ 5);
	var Sink = __webpack_require__(/*! ../sink/Pipe */ 42);
	var dispose = __webpack_require__(/*! ../disposable/dispose */ 8);
	var PropagateTask = __webpack_require__(/*! ../scheduler/PropagateTask */ 12);
	
	exports.delay = delay;
	
	/**
	 * @param {Number} delayTime milliseconds to delay each item
	 * @param {Stream} stream
	 * @returns {Stream} new stream containing the same items, but delayed by ms
	 */
	function delay(delayTime, stream) {
		return delayTime <= 0 ? stream : new Stream(new Delay(delayTime, stream.source));
	}
	
	function Delay(dt, source) {
		this.dt = dt;
		this.source = source;
	}
	
	Delay.prototype.run = function (sink, scheduler) {
		var delaySink = new DelaySink(this.dt, sink, scheduler);
		return dispose.all([delaySink, this.source.run(delaySink, scheduler)]);
	};
	
	function DelaySink(dt, sink, scheduler) {
		this.dt = dt;
		this.sink = sink;
		this.scheduler = scheduler;
	}
	
	DelaySink.prototype.dispose = function () {
		var self = this;
		this.scheduler.cancelAll(function (task) {
			return task.sink === self.sink;
		});
	};
	
	DelaySink.prototype.event = function (t, x) {
		this.scheduler.delay(this.dt, PropagateTask.event(x, this.sink));
	};
	
	DelaySink.prototype.end = function (t, x) {
		this.scheduler.delay(this.dt, PropagateTask.end(x, this.sink));
	};
	
	DelaySink.prototype.error = Sink.prototype.error;

/***/ },
/* 70 */
/*!********************************************!*\
  !*** ./~/most/lib/combinator/timestamp.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Stream = __webpack_require__(/*! ../Stream */ 5);
	var Sink = __webpack_require__(/*! ../sink/Pipe */ 42);
	
	exports.timestamp = timestamp;
	
	function timestamp(stream) {
		return new Stream(new Timestamp(stream.source));
	}
	
	function Timestamp(source) {
		this.source = source;
	}
	
	Timestamp.prototype.run = function (sink, scheduler) {
		return this.source.run(new TimestampSink(sink), scheduler);
	};
	
	function TimestampSink(sink) {
		this.sink = sink;
	}
	
	TimestampSink.prototype.end = Sink.prototype.end;
	TimestampSink.prototype.error = Sink.prototype.error;
	
	TimestampSink.prototype.event = function (t, x) {
		this.sink.event(t, { time: t, value: x });
	};

/***/ },
/* 71 */
/*!****************************************!*\
  !*** ./~/most/lib/combinator/limit.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Stream = __webpack_require__(/*! ../Stream */ 5);
	var Sink = __webpack_require__(/*! ../sink/Pipe */ 42);
	var dispose = __webpack_require__(/*! ../disposable/dispose */ 8);
	var PropagateTask = __webpack_require__(/*! ../scheduler/PropagateTask */ 12);
	var Map = __webpack_require__(/*! ../fusion/Map */ 41);
	
	exports.throttle = throttle;
	exports.debounce = debounce;
	
	/**
	 * Limit the rate of events by suppressing events that occur too often
	 * @param {Number} period time to suppress events
	 * @param {Stream} stream
	 * @returns {Stream}
	 */
	function throttle(period, stream) {
		return new Stream(throttleSource(period, stream.source));
	}
	
	function throttleSource(period, source) {
		return source instanceof Map ? commuteMapThrottle(period, source) : source instanceof Throttle ? fuseThrottle(period, source) : new Throttle(period, source);
	}
	
	function commuteMapThrottle(period, source) {
		return Map.create(source.f, throttleSource(period, source.source));
	}
	
	function fuseThrottle(period, source) {
		return new Throttle(Math.max(period, source.period), source.source);
	}
	
	function Throttle(period, source) {
		this.period = period;
		this.source = source;
	}
	
	Throttle.prototype.run = function (sink, scheduler) {
		return this.source.run(new ThrottleSink(this.period, sink), scheduler);
	};
	
	function ThrottleSink(period, sink) {
		this.time = 0;
		this.period = period;
		this.sink = sink;
	}
	
	ThrottleSink.prototype.event = function (t, x) {
		if (t >= this.time) {
			this.time = t + this.period;
			this.sink.event(t, x);
		}
	};
	
	ThrottleSink.prototype.end = Sink.prototype.end;
	
	ThrottleSink.prototype.error = Sink.prototype.error;
	
	/**
	 * Wait for a burst of events to subside and emit only the last event in the burst
	 * @param {Number} period events occuring more frequently than this
	 *  will be suppressed
	 * @param {Stream} stream stream to debounce
	 * @returns {Stream} new debounced stream
	 */
	function debounce(period, stream) {
		return new Stream(new Debounce(period, stream.source));
	}
	
	function Debounce(dt, source) {
		this.dt = dt;
		this.source = source;
	}
	
	Debounce.prototype.run = function (sink, scheduler) {
		return new DebounceSink(this.dt, this.source, sink, scheduler);
	};
	
	function DebounceSink(dt, source, sink, scheduler) {
		this.dt = dt;
		this.sink = sink;
		this.scheduler = scheduler;
		this.value = void 0;
		this.timer = null;
	
		var sourceDisposable = source.run(this, scheduler);
		this.disposable = dispose.all([this, sourceDisposable]);
	}
	
	DebounceSink.prototype.event = function (t, x) {
		this._clearTimer();
		this.value = x;
		this.timer = this.scheduler.delay(this.dt, PropagateTask.event(x, this.sink));
	};
	
	DebounceSink.prototype.end = function (t, x) {
		if (this._clearTimer()) {
			this.sink.event(t, this.value);
			this.value = void 0;
		}
		this.sink.end(t, x);
	};
	
	DebounceSink.prototype.error = function (t, x) {
		this._clearTimer();
		this.sink.error(t, x);
	};
	
	DebounceSink.prototype.dispose = function () {
		this._clearTimer();
	};
	
	DebounceSink.prototype._clearTimer = function () {
		if (this.timer === null) {
			return false;
		}
		this.timer.dispose();
		this.timer = null;
		return true;
	};

/***/ },
/* 72 */
/*!*******************************************!*\
  !*** ./~/most/lib/combinator/promises.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Stream = __webpack_require__(/*! ../Stream */ 5);
	var fatal = __webpack_require__(/*! ../fatalError */ 13);
	var just = __webpack_require__(/*! ../source/core */ 7).of;
	
	exports.fromPromise = fromPromise;
	exports.awaitPromises = awaitPromises;
	
	/**
	 * Create a stream containing only the promise's fulfillment
	 * value at the time it fulfills.
	 * @param {Promise<T>} p promise
	 * @return {Stream<T>} stream containing promise's fulfillment value.
	 *  If the promise rejects, the stream will error
	 */
	function fromPromise(p) {
		return awaitPromises(just(p));
	}
	
	/**
	 * Turn a Stream<Promise<T>> into Stream<T> by awaiting each promise.
	 * Event order is preserved.
	 * @param {Stream<Promise<T>>} stream
	 * @return {Stream<T>} stream of fulfillment values.  The stream will
	 * error if any promise rejects.
	 */
	function awaitPromises(stream) {
		return new Stream(new Await(stream.source));
	}
	
	function Await(source) {
		this.source = source;
	}
	
	Await.prototype.run = function (sink, scheduler) {
		return this.source.run(new AwaitSink(sink, scheduler), scheduler);
	};
	
	function AwaitSink(sink, scheduler) {
		this.sink = sink;
		this.scheduler = scheduler;
		this.queue = Promise.resolve();
		var self = this;
	
		// Pre-create closures, to avoid creating them per event
		this._eventBound = function (x) {
			self.sink.event(self.scheduler.now(), x);
		};
	
		this._endBound = function (x) {
			self.sink.end(self.scheduler.now(), x);
		};
	
		this._errorBound = function (e) {
			self.sink.error(self.scheduler.now(), e);
		};
	}
	
	AwaitSink.prototype.event = function (t, promise) {
		var self = this;
		this.queue = this.queue.then(function () {
			return self._event(promise);
		}).catch(this._errorBound);
	};
	
	AwaitSink.prototype.end = function (t, x) {
		var self = this;
		this.queue = this.queue.then(function () {
			return self._end(x);
		}).catch(this._errorBound);
	};
	
	AwaitSink.prototype.error = function (t, e) {
		var self = this;
		// Don't resolve error values, propagate directly
		this.queue = this.queue.then(function () {
			return self._errorBound(e);
		}).catch(fatal);
	};
	
	AwaitSink.prototype._event = function (promise) {
		return promise.then(this._eventBound);
	};
	
	AwaitSink.prototype._end = function (x) {
		return Promise.resolve(x).then(this._endBound);
	};

/***/ },
/* 73 */
/*!*****************************************!*\
  !*** ./~/most/lib/combinator/errors.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	var Stream = __webpack_require__(/*! ../Stream */ 5);
	var SafeSink = __webpack_require__(/*! ../sink/SafeSink */ 74);
	var Pipe = __webpack_require__(/*! ../sink/Pipe */ 42);
	var dispose = __webpack_require__(/*! ../disposable/dispose */ 8);
	var tryEvent = __webpack_require__(/*! ../source/tryEvent */ 34);
	var isPromise = __webpack_require__(/*! ../Promise */ 11).isPromise;
	var PropagateTask = __webpack_require__(/*! ../scheduler/PropagateTask */ 12);
	
	exports.flatMapError = recoverWith;
	exports.recoverWith = recoverWith;
	exports.throwError = throwError;
	
	/**
	 * If stream encounters an error, recover and continue with items from stream
	 * returned by f.
	 * @param {function(error:*):Stream} f function which returns a new stream
	 * @param {Stream} stream
	 * @returns {Stream} new stream which will recover from an error by calling f
	 */
	function recoverWith(f, stream) {
		return new Stream(new RecoverWith(f, stream.source));
	}
	
	/**
	 * Create a stream containing only an error
	 * @param {*} e error value, preferably an Error or Error subtype
	 * @returns {Stream} new stream containing only an error
	 */
	function throwError(e) {
		return new Stream(new ErrorSource(e));
	}
	
	function ErrorSource(e) {
		this.value = e;
	}
	
	ErrorSource.prototype.run = function (sink, scheduler) {
		return scheduler.asap(new PropagateTask(runError, this.value, sink));
	};
	
	function runError(t, e, sink) {
		sink.error(t, e);
	}
	
	function RecoverWith(f, source) {
		this.f = f;
		this.source = source;
	}
	
	RecoverWith.prototype.run = function (sink, scheduler) {
		return new RecoverWithSink(this.f, this.source, sink, scheduler);
	};
	
	function RecoverWithSink(f, source, sink, scheduler) {
		this.f = f;
		this.sink = new SafeSink(sink);
		this.scheduler = scheduler;
		this.disposable = source.run(this, scheduler);
	}
	
	RecoverWithSink.prototype.event = function (t, x) {
		tryEvent.tryEvent(t, x, this.sink);
	};
	
	RecoverWithSink.prototype.end = function (t, x) {
		tryEvent.tryEnd(t, x, this.sink);
	};
	
	RecoverWithSink.prototype.error = function (t, e) {
		var nextSink = this.sink.disable();
	
		dispose.tryDispose(t, this.disposable, this.sink);
		this._startNext(t, e, nextSink);
	};
	
	RecoverWithSink.prototype._startNext = function (t, x, sink) {
		try {
			this.disposable = this._continue(this.f, x, sink);
		} catch (e) {
			sink.error(t, e);
		}
	};
	
	RecoverWithSink.prototype._continue = function (f, x, sink) {
		var stream = f(x);
		return stream.source.run(sink, this.scheduler);
	};
	
	RecoverWithSink.prototype.dispose = function () {
		return this.disposable.dispose();
	};

/***/ },
/* 74 */
/*!*************************************!*\
  !*** ./~/most/lib/sink/SafeSink.js ***!
  \*************************************/
/***/ function(module, exports) {

	"use strict";
	
	/** @license MIT License (c) copyright 2010-2016 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	module.exports = SafeSink;
	
	function SafeSink(sink) {
		this.sink = sink;
		this.active = true;
	}
	
	SafeSink.prototype.event = function (t, x) {
		if (!this.active) {
			return;
		}
		this.sink.event(t, x);
	};
	
	SafeSink.prototype.end = function (t, x) {
		if (!this.active) {
			return;
		}
		this.disable();
		this.sink.end(t, x);
	};
	
	SafeSink.prototype.error = function (t, e) {
		this.disable();
		this.sink.error(t, e);
	};
	
	SafeSink.prototype.disable = function () {
		this.active = false;
		return this.sink;
	};

/***/ },
/* 75 */
/*!***********************************!*\
  !*** ./~/@most/hold/dist/hold.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! @most/multicast */ 23)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('@most/multicast'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.multicast);
	    global.mostHold = mod.exports;
	  }
	})(undefined, function (exports, _multicast) {
	  'use strict';
	
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	
	  function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	      throw new TypeError("Cannot call a class as a function");
	    }
	  }
	
	  var _createClass = function () {
	    function defineProperties(target, props) {
	      for (var i = 0; i < props.length; i++) {
	        var descriptor = props[i];
	        descriptor.enumerable = descriptor.enumerable || false;
	        descriptor.configurable = true;
	        if ("value" in descriptor) descriptor.writable = true;
	        Object.defineProperty(target, descriptor.key, descriptor);
	      }
	    }
	
	    return function (Constructor, protoProps, staticProps) {
	      if (protoProps) defineProperties(Constructor.prototype, protoProps);
	      if (staticProps) defineProperties(Constructor, staticProps);
	      return Constructor;
	    };
	  }();
	
	  // hold :: Stream a -> Stream a
	  var index = function index(stream) {
	    return new stream.constructor(new _multicast.MulticastSource(new Hold(stream.source)));
	  };
	
	  var Hold = function () {
	    function Hold(source) {
	      _classCallCheck(this, Hold);
	
	      this.source = source;
	      this.time = -Infinity;
	      this.value = void 0;
	    }
	
	    _createClass(Hold, [{
	      key: 'run',
	      value: function run(sink, scheduler) {
	        /* istanbul ignore else */
	        if (sink._hold !== this) {
	          sink._hold = this;
	          sink._holdAdd = sink.add;
	          sink.add = holdAdd;
	
	          sink._holdEvent = sink.event;
	          sink.event = holdEvent;
	        }
	
	        return this.source.run(sink, scheduler);
	      }
	    }]);
	
	    return Hold;
	  }();
	
	  function holdAdd(sink) {
	    var len = this._holdAdd(sink);
	    /* istanbul ignore else */
	    if (this._hold.time >= 0) {
	      sink.event(this._hold.time, this._hold.value);
	    }
	    return len;
	  }
	
	  function holdEvent(t, x) {
	    /* istanbul ignore else */
	    if (t >= this._hold.time) {
	      this._hold.time = t;
	      this._hold.value = x;
	    }
	    return this._holdEvent(t, x);
	  }
	
	  exports.default = index;
	});

/***/ },
/* 76 */
/*!********************************!*\
  !*** ./~/snabbdom/snabbdom.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	// jshint newcap: false
	/* global require, module, document, Node */
	'use strict';
	
	var VNode = __webpack_require__(/*! ./vnode */ 77);
	var is = __webpack_require__(/*! ./is */ 78);
	var domApi = __webpack_require__(/*! ./htmldomapi.js */ 79);
	
	function isUndef(s) {
	  return s === undefined;
	}
	function isDef(s) {
	  return s !== undefined;
	}
	
	var emptyNode = VNode('', {}, [], undefined, undefined);
	
	function sameVnode(vnode1, vnode2) {
	  return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
	}
	
	function createKeyToOldIdx(children, beginIdx, endIdx) {
	  var i,
	      map = {},
	      key;
	  for (i = beginIdx; i <= endIdx; ++i) {
	    key = children[i].key;
	    if (isDef(key)) map[key] = i;
	  }
	  return map;
	}
	
	var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];
	
	function init(modules, api) {
	  var i,
	      j,
	      cbs = {};
	
	  if (isUndef(api)) api = domApi;
	
	  for (i = 0; i < hooks.length; ++i) {
	    cbs[hooks[i]] = [];
	    for (j = 0; j < modules.length; ++j) {
	      if (modules[j][hooks[i]] !== undefined) cbs[hooks[i]].push(modules[j][hooks[i]]);
	    }
	  }
	
	  function emptyNodeAt(elm) {
	    return VNode(api.tagName(elm).toLowerCase(), {}, [], undefined, elm);
	  }
	
	  function createRmCb(childElm, listeners) {
	    return function () {
	      if (--listeners === 0) {
	        var parent = api.parentNode(childElm);
	        api.removeChild(parent, childElm);
	      }
	    };
	  }
	
	  function createElm(vnode, insertedVnodeQueue) {
	    var i,
	        thunk,
	        data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) i(vnode);
	      if (isDef(i = data.vnode)) {
	        thunk = vnode;
	        vnode = i;
	      }
	    }
	    var elm,
	        children = vnode.children,
	        sel = vnode.sel;
	    if (isDef(sel)) {
	      // Parse selector
	      var hashIdx = sel.indexOf('#');
	      var dotIdx = sel.indexOf('.', hashIdx);
	      var hash = hashIdx > 0 ? hashIdx : sel.length;
	      var dot = dotIdx > 0 ? dotIdx : sel.length;
	      var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
	      elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag) : api.createElement(tag);
	      if (hash < dot) elm.id = sel.slice(hash + 1, dot);
	      if (dotIdx > 0) elm.className = sel.slice(dot + 1).replace(/\./g, ' ');
	      if (is.array(children)) {
	        for (i = 0; i < children.length; ++i) {
	          api.appendChild(elm, createElm(children[i], insertedVnodeQueue));
	        }
	      } else if (is.primitive(vnode.text)) {
	        api.appendChild(elm, api.createTextNode(vnode.text));
	      }
	      for (i = 0; i < cbs.create.length; ++i) {
	        cbs.create[i](emptyNode, vnode);
	      }i = vnode.data.hook; // Reuse variable
	      if (isDef(i)) {
	        if (i.create) i.create(emptyNode, vnode);
	        if (i.insert) insertedVnodeQueue.push(vnode);
	      }
	    } else {
	      elm = vnode.elm = api.createTextNode(vnode.text);
	    }
	    if (isDef(thunk)) thunk.elm = vnode.elm;
	    return vnode.elm;
	  }
	
	  function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      api.insertBefore(parentElm, createElm(vnodes[startIdx], insertedVnodeQueue), before);
	    }
	  }
	
	  function invokeDestroyHook(vnode) {
	    var i,
	        j,
	        data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.destroy)) i(vnode);
	      for (i = 0; i < cbs.destroy.length; ++i) {
	        cbs.destroy[i](vnode);
	      }if (isDef(i = vnode.children)) {
	        for (j = 0; j < vnode.children.length; ++j) {
	          invokeDestroyHook(vnode.children[j]);
	        }
	      }
	      if (isDef(i = data.vnode)) invokeDestroyHook(i);
	    }
	  }
	
	  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      var i,
	          listeners,
	          rm,
	          ch = vnodes[startIdx];
	      if (isDef(ch)) {
	        if (isDef(ch.sel)) {
	          invokeDestroyHook(ch);
	          listeners = cbs.remove.length + 1;
	          rm = createRmCb(ch.elm, listeners);
	          for (i = 0; i < cbs.remove.length; ++i) {
	            cbs.remove[i](ch, rm);
	          }if (isDef(i = ch.data) && isDef(i = i.hook) && isDef(i = i.remove)) {
	            i(ch, rm);
	          } else {
	            rm();
	          }
	        } else {
	          // Text node
	          api.removeChild(parentElm, ch.elm);
	        }
	      }
	    }
	  }
	
	  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
	    var oldStartIdx = 0,
	        newStartIdx = 0;
	    var oldEndIdx = oldCh.length - 1;
	    var oldStartVnode = oldCh[0];
	    var oldEndVnode = oldCh[oldEndIdx];
	    var newEndIdx = newCh.length - 1;
	    var newStartVnode = newCh[0];
	    var newEndVnode = newCh[newEndIdx];
	    var oldKeyToIdx, idxInOld, elmToMove, before;
	
	    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	      if (isUndef(oldStartVnode)) {
	        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
	      } else if (isUndef(oldEndVnode)) {
	          oldEndVnode = oldCh[--oldEndIdx];
	        } else if (sameVnode(oldStartVnode, newStartVnode)) {
	          patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
	          oldStartVnode = oldCh[++oldStartIdx];
	          newStartVnode = newCh[++newStartIdx];
	        } else if (sameVnode(oldEndVnode, newEndVnode)) {
	          patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
	          oldEndVnode = oldCh[--oldEndIdx];
	          newEndVnode = newCh[--newEndIdx];
	        } else if (sameVnode(oldStartVnode, newEndVnode)) {
	          // Vnode moved right
	          patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
	          api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
	          oldStartVnode = oldCh[++oldStartIdx];
	          newEndVnode = newCh[--newEndIdx];
	        } else if (sameVnode(oldEndVnode, newStartVnode)) {
	          // Vnode moved left
	          patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
	          api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
	          oldEndVnode = oldCh[--oldEndIdx];
	          newStartVnode = newCh[++newStartIdx];
	        } else {
	          if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
	          idxInOld = oldKeyToIdx[newStartVnode.key];
	          if (isUndef(idxInOld)) {
	            // New element
	            api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
	            newStartVnode = newCh[++newStartIdx];
	          } else {
	            elmToMove = oldCh[idxInOld];
	            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
	            oldCh[idxInOld] = undefined;
	            api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
	            newStartVnode = newCh[++newStartIdx];
	          }
	        }
	    }
	    if (oldStartIdx > oldEndIdx) {
	      before = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
	      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
	    } else if (newStartIdx > newEndIdx) {
	      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
	    }
	  }
	
	  function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
	    var i, hook;
	    if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
	      i(oldVnode, vnode);
	    }
	    if (isDef(i = oldVnode.data) && isDef(i = i.vnode)) oldVnode = i;
	    if (isDef(i = vnode.data) && isDef(i = i.vnode)) {
	      patchVnode(oldVnode, i, insertedVnodeQueue);
	      vnode.elm = i.elm;
	      return;
	    }
	    var elm = vnode.elm = oldVnode.elm,
	        oldCh = oldVnode.children,
	        ch = vnode.children;
	    if (oldVnode === vnode) return;
	    if (!sameVnode(oldVnode, vnode)) {
	      var parentElm = api.parentNode(oldVnode.elm);
	      elm = createElm(vnode, insertedVnodeQueue);
	      api.insertBefore(parentElm, elm, oldVnode.elm);
	      removeVnodes(parentElm, [oldVnode], 0, 0);
	      return;
	    }
	    if (isDef(vnode.data)) {
	      for (i = 0; i < cbs.update.length; ++i) {
	        cbs.update[i](oldVnode, vnode);
	      }i = vnode.data.hook;
	      if (isDef(i) && isDef(i = i.update)) i(oldVnode, vnode);
	    }
	    if (isUndef(vnode.text)) {
	      if (isDef(oldCh) && isDef(ch)) {
	        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
	      } else if (isDef(ch)) {
	        if (isDef(oldVnode.text)) api.setTextContent(elm, '');
	        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
	      } else if (isDef(oldCh)) {
	        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
	      } else if (isDef(oldVnode.text)) {
	        api.setTextContent(elm, '');
	      }
	    } else if (oldVnode.text !== vnode.text) {
	      api.setTextContent(elm, vnode.text);
	    }
	    if (isDef(hook) && isDef(i = hook.postpatch)) {
	      i(oldVnode, vnode);
	    }
	  }
	
	  return function (oldVnode, vnode) {
	    var i, elm, parent;
	    var insertedVnodeQueue = [];
	    for (i = 0; i < cbs.pre.length; ++i) {
	      cbs.pre[i]();
	    }if (isUndef(oldVnode.sel)) {
	      oldVnode = emptyNodeAt(oldVnode);
	    }
	
	    if (sameVnode(oldVnode, vnode)) {
	      patchVnode(oldVnode, vnode, insertedVnodeQueue);
	    } else {
	      elm = oldVnode.elm;
	      parent = api.parentNode(elm);
	
	      createElm(vnode, insertedVnodeQueue);
	
	      if (parent !== null) {
	        api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
	        removeVnodes(parent, [oldVnode], 0, 0);
	      }
	    }
	
	    for (i = 0; i < insertedVnodeQueue.length; ++i) {
	      insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
	    }
	    for (i = 0; i < cbs.post.length; ++i) {
	      cbs.post[i]();
	    }return vnode;
	  };
	}
	
	module.exports = { init: init };

/***/ },
/* 77 */
/*!*****************************!*\
  !*** ./~/snabbdom/vnode.js ***!
  \*****************************/
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function (sel, data, children, text, elm) {
	  var key = data === undefined ? undefined : data.key;
	  return { sel: sel, data: data, children: children,
	    text: text, elm: elm, key: key };
	};

/***/ },
/* 78 */
/*!**************************!*\
  !*** ./~/snabbdom/is.js ***!
  \**************************/
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	  array: Array.isArray,
	  primitive: function primitive(s) {
	    return typeof s === 'string' || typeof s === 'number';
	  }
	};

/***/ },
/* 79 */
/*!**********************************!*\
  !*** ./~/snabbdom/htmldomapi.js ***!
  \**********************************/
/***/ function(module, exports) {

	"use strict";
	
	function createElement(tagName) {
	  return document.createElement(tagName);
	}
	
	function createElementNS(namespaceURI, qualifiedName) {
	  return document.createElementNS(namespaceURI, qualifiedName);
	}
	
	function createTextNode(text) {
	  return document.createTextNode(text);
	}
	
	function insertBefore(parentNode, newNode, referenceNode) {
	  parentNode.insertBefore(newNode, referenceNode);
	}
	
	function removeChild(node, child) {
	  node.removeChild(child);
	}
	
	function appendChild(node, child) {
	  node.appendChild(child);
	}
	
	function parentNode(node) {
	  return node.parentElement;
	}
	
	function nextSibling(node) {
	  return node.nextSibling;
	}
	
	function tagName(node) {
	  return node.tagName;
	}
	
	function setTextContent(node, text) {
	  node.textContent = text;
	}
	
	module.exports = {
	  createElement: createElement,
	  createElementNS: createElementNS,
	  createTextNode: createTextNode,
	  appendChild: appendChild,
	  removeChild: removeChild,
	  insertBefore: insertBefore,
	  parentNode: parentNode,
	  nextSibling: nextSibling,
	  tagName: tagName,
	  setTextContent: setTextContent
	};

/***/ },
/* 80 */
/*!*************************!*\
  !*** ./~/snabbdom/h.js ***!
  \*************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var VNode = __webpack_require__(/*! ./vnode */ 77);
	var is = __webpack_require__(/*! ./is */ 78);
	
	function addNS(data, children) {
	  data.ns = 'http://www.w3.org/2000/svg';
	  if (children !== undefined) {
	    for (var i = 0; i < children.length; ++i) {
	      addNS(children[i].data, children[i].children);
	    }
	  }
	}
	
	module.exports = function h(sel, b, c) {
	  var data = {},
	      children,
	      text,
	      i;
	  if (arguments.length === 3) {
	    data = b;
	    if (is.array(c)) {
	      children = c;
	    } else if (is.primitive(c)) {
	      text = c;
	    }
	  } else if (arguments.length === 2) {
	    if (is.array(b)) {
	      children = b;
	    } else if (is.primitive(b)) {
	      text = b;
	    } else {
	      data = b;
	    }
	  }
	  if (is.array(children)) {
	    for (i = 0; i < children.length; ++i) {
	      if (is.primitive(children[i])) children[i] = VNode(undefined, undefined, undefined, children[i]);
	    }
	  }
	  if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g') {
	    addNS(data, children);
	  }
	  return VNode(sel, data, children, text, undefined);
	};

/***/ },
/* 81 */
/*!*******************************************************!*\
  !*** ./~/snabbdom-selector/lib/classNameFromVNode.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = classNameFromVNode;
	
	var _selectorParser2 = __webpack_require__(/*! ./selectorParser */ 82);
	
	var _selectorParser3 = _interopRequireDefault(_selectorParser2);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	function classNameFromVNode(vNode) {
	  var _selectorParser = (0, _selectorParser3.default)(vNode.sel);
	
	  var cn = _selectorParser.className;
	
	  if (!vNode.data) {
	    return cn;
	  }
	
	  var _vNode$data = vNode.data;
	  var dataClass = _vNode$data.class;
	  var props = _vNode$data.props;
	
	  if (dataClass) {
	    var c = Object.keys(vNode.data.class).filter(function (cl) {
	      return vNode.data.class[cl];
	    });
	    cn += ' ' + c.join(' ');
	  }
	
	  if (props && props.className) {
	    cn += ' ' + props.className;
	  }
	
	  return cn.trim();
	}

/***/ },
/* 82 */
/*!***************************************************!*\
  !*** ./~/snabbdom-selector/lib/selectorParser.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = selectorParser;
	
	var _browserSplit = __webpack_require__(/*! browser-split */ 83);
	
	var _browserSplit2 = _interopRequireDefault(_browserSplit);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
	var notClassId = /^\.|#/;
	
	function selectorParser() {
	  var selector = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	  var tagName = undefined;
	  var id = '';
	  var classes = [];
	
	  var tagParts = (0, _browserSplit2.default)(selector, classIdSplit);
	
	  if (notClassId.test(tagParts[1]) || selector === '') {
	    tagName = 'div';
	  }
	
	  var part = undefined;
	  var type = undefined;
	  var i = undefined;
	
	  for (i = 0; i < tagParts.length; i++) {
	    part = tagParts[i];
	
	    if (!part) {
	      continue;
	    }
	
	    type = part.charAt(0);
	
	    if (!tagName) {
	      tagName = part;
	    } else if (type === '.') {
	      classes.push(part.substring(1, part.length));
	    } else if (type === '#') {
	      id = part.substring(1, part.length);
	    }
	  }
	
	  return {
	    tagName: tagName,
	    id: id,
	    className: classes.join(' ')
	  };
	}

/***/ },
/* 83 */
/*!**********************************!*\
  !*** ./~/browser-split/index.js ***!
  \**********************************/
/***/ function(module, exports) {

	"use strict";
	
	/*!
	 * Cross-Browser Split 1.1.1
	 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
	 * Available under the MIT License
	 * ECMAScript compliant, uniform cross-browser split method
	 */
	
	/**
	 * Splits a string into an array of strings using a regex or string separator. Matches of the
	 * separator are not included in the result array. However, if `separator` is a regex that contains
	 * capturing groups, backreferences are spliced into the result each time `separator` is matched.
	 * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
	 * cross-browser.
	 * @param {String} str String to split.
	 * @param {RegExp|String} separator Regex or string to use for separating the string.
	 * @param {Number} [limit] Maximum number of items to include in the result array.
	 * @returns {Array} Array of substrings.
	 * @example
	 *
	 * // Basic use
	 * split('a b c d', ' ');
	 * // -> ['a', 'b', 'c', 'd']
	 *
	 * // With limit
	 * split('a b c d', ' ', 2);
	 * // -> ['a', 'b']
	 *
	 * // Backreferences in result array
	 * split('..word1 word2..', /([a-z]+)(\d+)/i);
	 * // -> ['..', 'word', '1', ' ', 'word', '2', '..']
	 */
	module.exports = function split(undef) {
	
	  var nativeSplit = String.prototype.split,
	      compliantExecNpcg = /()??/.exec("")[1] === undef,
	
	  // NPCG: nonparticipating capturing group
	  self;
	
	  self = function self(str, separator, limit) {
	    // If `separator` is not a regex, use `nativeSplit`
	    if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
	      return nativeSplit.call(str, separator, limit);
	    }
	    var output = [],
	        flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + ( // Proposed for ES6
	    separator.sticky ? "y" : ""),
	
	    // Firefox 3+
	    lastLastIndex = 0,
	
	    // Make `global` and avoid `lastIndex` issues by working with a copy
	    separator = new RegExp(separator.source, flags + "g"),
	        separator2,
	        match,
	        lastIndex,
	        lastLength;
	    str += ""; // Type-convert
	    if (!compliantExecNpcg) {
	      // Doesn't need flags gy, but they don't hurt
	      separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
	    }
	    /* Values for `limit`, per the spec:
	     * If undefined: 4294967295 // Math.pow(2, 32) - 1
	     * If 0, Infinity, or NaN: 0
	     * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
	     * If negative number: 4294967296 - Math.floor(Math.abs(limit))
	     * If other: Type-convert, then use the above rules
	     */
	    limit = limit === undef ? -1 >>> 0 : // Math.pow(2, 32) - 1
	    limit >>> 0; // ToUint32(limit)
	    while (match = separator.exec(str)) {
	      // `separator.lastIndex` is not reliable cross-browser
	      lastIndex = match.index + match[0].length;
	      if (lastIndex > lastLastIndex) {
	        output.push(str.slice(lastLastIndex, match.index));
	        // Fix browsers whose `exec` methods don't consistently return `undefined` for
	        // nonparticipating capturing groups
	        if (!compliantExecNpcg && match.length > 1) {
	          match[0].replace(separator2, function () {
	            for (var i = 1; i < arguments.length - 2; i++) {
	              if (arguments[i] === undef) {
	                match[i] = undef;
	              }
	            }
	          });
	        }
	        if (match.length > 1 && match.index < str.length) {
	          Array.prototype.push.apply(output, match.slice(1));
	        }
	        lastLength = match[0].length;
	        lastLastIndex = lastIndex;
	        if (output.length >= limit) {
	          break;
	        }
	      }
	      if (separator.lastIndex === match.index) {
	        separator.lastIndex++; // Avoid an infinite loop
	      }
	    }
	    if (lastLastIndex === str.length) {
	      if (lastLength || !separator.test("")) {
	        output.push("");
	      }
	    } else {
	      output.push(str.slice(lastLastIndex));
	    }
	    return output.length > limit ? output.slice(0, limit) : output;
	  };
	
	  return self;
	}();

/***/ },
/* 84 */
/*!****************************************!*\
  !*** ./~/@motorcycle/dom/lib/utils.js ***!
  \****************************************/
/***/ function(module, exports) {

	"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var SCOPE_PREFIX = "cycle-scope-";
	
	var isElement = function isElement(obj) {
	  return (typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement)) === "object" ? obj instanceof HTMLElement || obj instanceof DocumentFragment : obj && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && obj !== null && (obj.nodeType === 1 || obj.nodeType === 11) && typeof obj.nodeName === "string";
	};
	
	var domSelectorParser = function domSelectorParser(selectors) {
	  var domElement = typeof selectors === "string" ? document.querySelector(selectors) : selectors;
	
	  if (typeof domElement === "string" && domElement === null) {
	    throw new Error("Cannot render into unknown element `" + selectors + "`");
	  } else if (!isElement(domElement)) {
	    throw new Error("Given container is not a DOM element neither a " + "selector string.");
	  }
	  return domElement;
	};
	
	exports.domSelectorParser = domSelectorParser;
	exports.SCOPE_PREFIX = SCOPE_PREFIX;

/***/ },
/* 85 */
/*!************************************************!*\
  !*** ./~/@motorcycle/dom/lib/modules/index.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.EventsModule = exports.HeroModule = exports.AttrsModule = exports.PropsModule = exports.ClassModule = exports.StyleModule = undefined;
	
	var _class = __webpack_require__(/*! snabbdom/modules/class */ 86);
	
	var _class2 = _interopRequireDefault(_class);
	
	var _props = __webpack_require__(/*! snabbdom/modules/props */ 87);
	
	var _props2 = _interopRequireDefault(_props);
	
	var _attributes = __webpack_require__(/*! snabbdom/modules/attributes */ 88);
	
	var _attributes2 = _interopRequireDefault(_attributes);
	
	var _eventlisteners = __webpack_require__(/*! snabbdom/modules/eventlisteners */ 89);
	
	var _eventlisteners2 = _interopRequireDefault(_eventlisteners);
	
	var _style = __webpack_require__(/*! snabbdom/modules/style */ 90);
	
	var _style2 = _interopRequireDefault(_style);
	
	var _hero = __webpack_require__(/*! snabbdom/modules/hero */ 91);
	
	var _hero2 = _interopRequireDefault(_hero);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	exports.default = [_style2.default, _class2.default, _props2.default, _attributes2.default];
	exports.StyleModule = _style2.default;
	exports.ClassModule = _class2.default;
	exports.PropsModule = _props2.default;
	exports.AttrsModule = _attributes2.default;
	exports.HeroModule = _hero2.default;
	exports.EventsModule = _eventlisteners2.default;

/***/ },
/* 86 */
/*!*************************************!*\
  !*** ./~/snabbdom/modules/class.js ***!
  \*************************************/
/***/ function(module, exports) {

	'use strict';
	
	function updateClass(oldVnode, vnode) {
	  var cur,
	      name,
	      elm = vnode.elm,
	      oldClass = oldVnode.data.class || {},
	      klass = vnode.data.class || {};
	  for (name in oldClass) {
	    if (!klass[name]) {
	      elm.classList.remove(name);
	    }
	  }
	  for (name in klass) {
	    cur = klass[name];
	    if (cur !== oldClass[name]) {
	      elm.classList[cur ? 'add' : 'remove'](name);
	    }
	  }
	}
	
	module.exports = { create: updateClass, update: updateClass };

/***/ },
/* 87 */
/*!*************************************!*\
  !*** ./~/snabbdom/modules/props.js ***!
  \*************************************/
/***/ function(module, exports) {

	'use strict';
	
	function updateProps(oldVnode, vnode) {
	  var key,
	      cur,
	      old,
	      elm = vnode.elm,
	      oldProps = oldVnode.data.props || {},
	      props = vnode.data.props || {};
	  for (key in oldProps) {
	    if (!props[key]) {
	      delete elm[key];
	    }
	  }
	  for (key in props) {
	    cur = props[key];
	    old = oldProps[key];
	    if (old !== cur && (key !== 'value' || elm[key] !== cur)) {
	      elm[key] = cur;
	    }
	  }
	}
	
	module.exports = { create: updateProps, update: updateProps };

/***/ },
/* 88 */
/*!******************************************!*\
  !*** ./~/snabbdom/modules/attributes.js ***!
  \******************************************/
/***/ function(module, exports) {

	"use strict";
	
	var booleanAttrs = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "compact", "controls", "declare", "default", "defaultchecked", "defaultmuted", "defaultselected", "defer", "disabled", "draggable", "enabled", "formnovalidate", "hidden", "indeterminate", "inert", "ismap", "itemscope", "loop", "multiple", "muted", "nohref", "noresize", "noshade", "novalidate", "nowrap", "open", "pauseonexit", "readonly", "required", "reversed", "scoped", "seamless", "selected", "sortable", "spellcheck", "translate", "truespeed", "typemustmatch", "visible"];
	
	var booleanAttrsDict = {};
	for (var i = 0, len = booleanAttrs.length; i < len; i++) {
	  booleanAttrsDict[booleanAttrs[i]] = true;
	}
	
	function updateAttrs(oldVnode, vnode) {
	  var key,
	      cur,
	      old,
	      elm = vnode.elm,
	      oldAttrs = oldVnode.data.attrs || {},
	      attrs = vnode.data.attrs || {};
	
	  // update modified attributes, add new attributes
	  for (key in attrs) {
	    cur = attrs[key];
	    old = oldAttrs[key];
	    if (old !== cur) {
	      // TODO: add support to namespaced attributes (setAttributeNS)
	      if (!cur && booleanAttrsDict[key]) elm.removeAttribute(key);else elm.setAttribute(key, cur);
	    }
	  }
	  //remove removed attributes
	  // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
	  // the other option is to remove all attributes with value == undefined
	  for (key in oldAttrs) {
	    if (!(key in attrs)) {
	      elm.removeAttribute(key);
	    }
	  }
	}
	
	module.exports = { create: updateAttrs, update: updateAttrs };

/***/ },
/* 89 */
/*!**********************************************!*\
  !*** ./~/snabbdom/modules/eventlisteners.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var is = __webpack_require__(/*! ../is */ 78);
	
	function arrInvoker(arr) {
	  return function () {
	    // Special case when length is two, for performance
	    arr.length === 2 ? arr[0](arr[1]) : arr[0].apply(undefined, arr.slice(1));
	  };
	}
	
	function fnInvoker(o) {
	  return function (ev) {
	    o.fn(ev);
	  };
	}
	
	function updateEventListeners(oldVnode, vnode) {
	  var name,
	      cur,
	      old,
	      elm = vnode.elm,
	      oldOn = oldVnode.data.on || {},
	      on = vnode.data.on;
	  if (!on) return;
	  for (name in on) {
	    cur = on[name];
	    old = oldOn[name];
	    if (old === undefined) {
	      if (is.array(cur)) {
	        elm.addEventListener(name, arrInvoker(cur));
	      } else {
	        cur = { fn: cur };
	        on[name] = cur;
	        elm.addEventListener(name, fnInvoker(cur));
	      }
	    } else if (is.array(old)) {
	      // Deliberately modify old array since it's captured in closure created with `arrInvoker`
	      old.length = cur.length;
	      for (var i = 0; i < old.length; ++i) {
	        old[i] = cur[i];
	      }on[name] = old;
	    } else {
	      old.fn = cur;
	      on[name] = old;
	    }
	  }
	}
	
	module.exports = { create: updateEventListeners, update: updateEventListeners };

/***/ },
/* 90 */
/*!*************************************!*\
  !*** ./~/snabbdom/modules/style.js ***!
  \*************************************/
/***/ function(module, exports) {

	'use strict';
	
	var raf = typeof window !== 'undefined' && window.requestAnimationFrame || setTimeout;
	var nextFrame = function nextFrame(fn) {
	  raf(function () {
	    raf(fn);
	  });
	};
	
	function setNextFrame(obj, prop, val) {
	  nextFrame(function () {
	    obj[prop] = val;
	  });
	}
	
	function updateStyle(oldVnode, vnode) {
	  var cur,
	      name,
	      elm = vnode.elm,
	      oldStyle = oldVnode.data.style || {},
	      style = vnode.data.style || {},
	      oldHasDel = 'delayed' in oldStyle;
	  for (name in oldStyle) {
	    if (!style[name]) {
	      elm.style[name] = '';
	    }
	  }
	  for (name in style) {
	    cur = style[name];
	    if (name === 'delayed') {
	      for (name in style.delayed) {
	        cur = style.delayed[name];
	        if (!oldHasDel || cur !== oldStyle.delayed[name]) {
	          setNextFrame(elm.style, name, cur);
	        }
	      }
	    } else if (name !== 'remove' && cur !== oldStyle[name]) {
	      elm.style[name] = cur;
	    }
	  }
	}
	
	function applyDestroyStyle(vnode) {
	  var style,
	      name,
	      elm = vnode.elm,
	      s = vnode.data.style;
	  if (!s || !(style = s.destroy)) return;
	  for (name in style) {
	    elm.style[name] = style[name];
	  }
	}
	
	function applyRemoveStyle(vnode, rm) {
	  var s = vnode.data.style;
	  if (!s || !s.remove) {
	    rm();
	    return;
	  }
	  var name,
	      elm = vnode.elm,
	      idx,
	      i = 0,
	      maxDur = 0,
	      compStyle,
	      style = s.remove,
	      amount = 0,
	      applied = [];
	  for (name in style) {
	    applied.push(name);
	    elm.style[name] = style[name];
	  }
	  compStyle = getComputedStyle(elm);
	  var props = compStyle['transition-property'].split(', ');
	  for (; i < props.length; ++i) {
	    if (applied.indexOf(props[i]) !== -1) amount++;
	  }
	  elm.addEventListener('transitionend', function (ev) {
	    if (ev.target === elm) --amount;
	    if (amount === 0) rm();
	  });
	}
	
	module.exports = { create: updateStyle, update: updateStyle, destroy: applyDestroyStyle, remove: applyRemoveStyle };

/***/ },
/* 91 */
/*!************************************!*\
  !*** ./~/snabbdom/modules/hero.js ***!
  \************************************/
/***/ function(module, exports) {

	'use strict';
	
	var raf = typeof window !== 'undefined' && window.requestAnimationFrame || setTimeout;
	var nextFrame = function nextFrame(fn) {
	  raf(function () {
	    raf(fn);
	  });
	};
	
	function setNextFrame(obj, prop, val) {
	  nextFrame(function () {
	    obj[prop] = val;
	  });
	}
	
	function getTextNodeRect(textNode) {
	  var rect;
	  if (document.createRange) {
	    var range = document.createRange();
	    range.selectNodeContents(textNode);
	    if (range.getBoundingClientRect) {
	      rect = range.getBoundingClientRect();
	    }
	  }
	  return rect;
	}
	
	function calcTransformOrigin(isTextNode, textRect, boundingRect) {
	  if (isTextNode) {
	    if (textRect) {
	      //calculate pixels to center of text from left edge of bounding box
	      var relativeCenterX = textRect.left + textRect.width / 2 - boundingRect.left;
	      var relativeCenterY = textRect.top + textRect.height / 2 - boundingRect.top;
	      return relativeCenterX + 'px ' + relativeCenterY + 'px';
	    }
	  }
	  return '0 0'; //top left
	}
	
	function getTextDx(oldTextRect, newTextRect) {
	  if (oldTextRect && newTextRect) {
	    return oldTextRect.left + oldTextRect.width / 2 - (newTextRect.left + newTextRect.width / 2);
	  }
	  return 0;
	}
	function getTextDy(oldTextRect, newTextRect) {
	  if (oldTextRect && newTextRect) {
	    return oldTextRect.top + oldTextRect.height / 2 - (newTextRect.top + newTextRect.height / 2);
	  }
	  return 0;
	}
	
	function isTextElement(elm) {
	  return elm.childNodes.length === 1 && elm.childNodes[0].nodeType === 3;
	}
	
	var removed, created;
	
	function pre(oldVnode, vnode) {
	  removed = {};
	  created = [];
	}
	
	function create(oldVnode, vnode) {
	  var hero = vnode.data.hero;
	  if (hero && hero.id) {
	    created.push(hero.id);
	    created.push(vnode);
	  }
	}
	
	function destroy(vnode) {
	  var hero = vnode.data.hero;
	  if (hero && hero.id) {
	    var elm = vnode.elm;
	    vnode.isTextNode = isTextElement(elm); //is this a text node?
	    vnode.boundingRect = elm.getBoundingClientRect(); //save the bounding rectangle to a new property on the vnode
	    vnode.textRect = vnode.isTextNode ? getTextNodeRect(elm.childNodes[0]) : null; //save bounding rect of inner text node
	    var computedStyle = window.getComputedStyle(elm, null); //get current styles (includes inherited properties)
	    vnode.savedStyle = JSON.parse(JSON.stringify(computedStyle)); //save a copy of computed style values
	    removed[hero.id] = vnode;
	  }
	}
	
	function post() {
	  var i, id, newElm, oldVnode, oldElm, hRatio, wRatio, oldRect, newRect, dx, dy, origTransform, origTransition, newStyle, oldStyle, newComputedStyle, isTextNode, newTextRect, oldTextRect;
	  for (i = 0; i < created.length; i += 2) {
	    id = created[i];
	    newElm = created[i + 1].elm;
	    oldVnode = removed[id];
	    if (oldVnode) {
	      isTextNode = oldVnode.isTextNode && isTextElement(newElm); //Are old & new both text?
	      newStyle = newElm.style;
	      newComputedStyle = window.getComputedStyle(newElm, null); //get full computed style for new element
	      oldElm = oldVnode.elm;
	      oldStyle = oldElm.style;
	      //Overall element bounding boxes
	      newRect = newElm.getBoundingClientRect();
	      oldRect = oldVnode.boundingRect; //previously saved bounding rect
	      //Text node bounding boxes & distances
	      if (isTextNode) {
	        newTextRect = getTextNodeRect(newElm.childNodes[0]);
	        oldTextRect = oldVnode.textRect;
	        dx = getTextDx(oldTextRect, newTextRect);
	        dy = getTextDy(oldTextRect, newTextRect);
	      } else {
	        //Calculate distances between old & new positions
	        dx = oldRect.left - newRect.left;
	        dy = oldRect.top - newRect.top;
	      }
	      hRatio = newRect.height / Math.max(oldRect.height, 1);
	      wRatio = isTextNode ? hRatio : newRect.width / Math.max(oldRect.width, 1); //text scales based on hRatio
	      // Animate new element
	      origTransform = newStyle.transform;
	      origTransition = newStyle.transition;
	      if (newComputedStyle.display === 'inline') //inline elements cannot be transformed
	        newStyle.display = 'inline-block'; //this does not appear to have any negative side effects
	      newStyle.transition = origTransition + 'transform 0s';
	      newStyle.transformOrigin = calcTransformOrigin(isTextNode, newTextRect, newRect);
	      newStyle.opacity = '0';
	      newStyle.transform = origTransform + 'translate(' + dx + 'px, ' + dy + 'px) ' + 'scale(' + 1 / wRatio + ', ' + 1 / hRatio + ')';
	      setNextFrame(newStyle, 'transition', origTransition);
	      setNextFrame(newStyle, 'transform', origTransform);
	      setNextFrame(newStyle, 'opacity', '1');
	      // Animate old element
	      for (var key in oldVnode.savedStyle) {
	        //re-apply saved inherited properties
	        if (parseInt(key) != key) {
	          var ms = key.substring(0, 2) === 'ms';
	          var moz = key.substring(0, 3) === 'moz';
	          var webkit = key.substring(0, 6) === 'webkit';
	          if (!ms && !moz && !webkit) //ignore prefixed style properties
	            oldStyle[key] = oldVnode.savedStyle[key];
	        }
	      }
	      oldStyle.position = 'absolute';
	      oldStyle.top = oldRect.top + 'px'; //start at existing position
	      oldStyle.left = oldRect.left + 'px';
	      oldStyle.width = oldRect.width + 'px'; //Needed for elements who were sized relative to their parents
	      oldStyle.height = oldRect.height + 'px'; //Needed for elements who were sized relative to their parents
	      oldStyle.margin = 0; //Margin on hero element leads to incorrect positioning
	      oldStyle.transformOrigin = calcTransformOrigin(isTextNode, oldTextRect, oldRect);
	      oldStyle.transform = '';
	      oldStyle.opacity = '1';
	      document.body.appendChild(oldElm);
	      setNextFrame(oldStyle, 'transform', 'translate(' + -dx + 'px, ' + -dy + 'px) scale(' + wRatio + ', ' + hRatio + ')'); //scale must be on far right for translate to be correct
	      setNextFrame(oldStyle, 'opacity', '0');
	      oldElm.addEventListener('transitionend', function (ev) {
	        if (ev.propertyName === 'transform') document.body.removeChild(ev.target);
	      });
	    }
	  }
	  removed = created = undefined;
	}
	
	module.exports = { pre: pre, create: create, destroy: destroy, post: post };

/***/ },
/* 92 */
/*!************************************************!*\
  !*** ./~/@motorcycle/dom/lib/transposition.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.transposeVTree = undefined;
	
	var _most = __webpack_require__(/*! most */ 4);
	
	var _most2 = _interopRequireDefault(_most);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	function createVTree(vTree, children) {
	  return {
	    sel: vTree.sel,
	    data: vTree.data,
	    text: vTree.text,
	    elm: vTree.elm,
	    key: vTree.key,
	    children: children
	  };
	}
	
	function transposeVTree(vTree) {
	  if (!vTree) {
	    return null;
	  } else if (vTree && _typeof(vTree.data) === 'object' && vTree.data.static) {
	    return _most2.default.just(vTree);
	  } else if (typeof vTree.observe === 'function') {
	    return vTree.map(transposeVTree).switch();
	  } else if ((typeof vTree === 'undefined' ? 'undefined' : _typeof(vTree)) === 'object') {
	    if (!vTree.children || vTree.children.length === 0) {
	      return _most2.default.just(vTree);
	    }
	
	    var vTreeChildren = vTree.children.map(transposeVTree).filter(function (x) {
	      return x !== null;
	    });
	
	    return vTreeChildren.length === 0 ? _most2.default.just(createVTree(vTree, vTreeChildren)) : _most2.default.combineArray(function () {
	      for (var _len = arguments.length, children = Array(_len), _key = 0; _key < _len; _key++) {
	        children[_key] = arguments[_key];
	      }
	
	      return createVTree(vTree, children);
	    }, vTreeChildren);
	  } else {
	    throw new Error('Unhandled vTree Value');
	  }
	}
	
	exports.transposeVTree = transposeVTree;

/***/ },
/* 93 */
/*!******************************************!*\
  !*** ./~/@motorcycle/dom/lib/isolate.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isolateSource = exports.isolateSink = undefined;
	
	var _utils = __webpack_require__(/*! ./utils */ 84);
	
	var isolateSource = function isolateSource(source_, scope) {
	  return source_.select('.' + _utils.SCOPE_PREFIX + scope);
	};
	
	var isolateSink = function isolateSink(sink, scope) {
	  return sink.map(function (vTree) {
	    if (vTree.sel.indexOf('' + _utils.SCOPE_PREFIX + scope) === -1) {
	      if (vTree.data.ns) {
	        // svg elements
	        var _vTree$data$attrs = vTree.data.attrs;
	        var attrs = _vTree$data$attrs === undefined ? {} : _vTree$data$attrs;
	
	        attrs.class = (attrs.class || '') + ' ' + _utils.SCOPE_PREFIX + scope;
	      } else {
	        vTree.sel = vTree.sel + '.' + _utils.SCOPE_PREFIX + scope;
	      }
	    }
	    return vTree;
	  });
	};
	
	exports.isolateSink = isolateSink;
	exports.isolateSource = isolateSource;

/***/ },
/* 94 */
/*!*****************************************!*\
  !*** ./~/@motorcycle/dom/lib/select.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.makeIsStrictlyInRootScope = exports.makeElementSelector = undefined;
	
	var _makeIsStrictlyInRootScope = __webpack_require__(/*! ./makeIsStrictlyInRootScope */ 95);
	
	var _events = __webpack_require__(/*! ./events */ 96);
	
	var _isolate = __webpack_require__(/*! ./isolate */ 93);
	
	var isValidString = function isValidString(param) {
	  return typeof param === 'string' && param.length > 0;
	};
	
	var contains = function contains(str, match) {
	  return str.indexOf(match) > -1;
	};
	
	var isNotTagName = function isNotTagName(param) {
	  return isValidString(param) && contains(param, '.') || contains(param, '#') || contains(param, ':');
	};
	
	function sortNamespace(a, b) {
	  if (isNotTagName(a) && isNotTagName(b)) {
	    return 0;
	  }
	  return isNotTagName(a) ? 1 : -1;
	}
	
	function removeDuplicates(arr) {
	  var newArray = [];
	  arr.forEach(function (element) {
	    if (newArray.indexOf(element) === -1) {
	      newArray.push(element);
	    }
	  });
	  return newArray;
	}
	
	var getScope = function getScope(namespace) {
	  return namespace.filter(function (c) {
	    return c.indexOf('.cycle-scope') > -1;
	  });
	};
	
	function makeFindElements(namespace) {
	  return function findElements(rootElement) {
	    if (namespace.join('') === '') {
	      return rootElement;
	    }
	    var slice = Array.prototype.slice;
	
	    var scope = getScope(namespace);
	    // Uses global selector && is isolated
	    if (namespace.indexOf('*') > -1 && scope.length > 0) {
	      // grab top-level boundary of scope
	      var topNode = rootElement.querySelector(scope.join(' '));
	      // grab all children
	      var childNodes = topNode.getElementsByTagName('*');
	      return removeDuplicates([topNode].concat(slice.call(childNodes))).filter((0, _makeIsStrictlyInRootScope.makeIsStrictlyInRootScope)(namespace));
	    }
	
	    return removeDuplicates(slice.call(rootElement.querySelectorAll(namespace.join(' '))).concat(slice.call(rootElement.querySelectorAll(namespace.join(''))))).filter((0, _makeIsStrictlyInRootScope.makeIsStrictlyInRootScope)(namespace));
	  };
	}
	
	function makeElementSelector(rootElement$) {
	  return function elementSelector(selector) {
	    if (typeof selector !== 'string') {
	      throw new Error('DOM driver\'s select() expects the argument to be a ' + 'string as a CSS selector');
	    }
	
	    var namespace = this.namespace;
	    var trimmedSelector = selector.trim();
	    var childNamespace = trimmedSelector === ':root' ? namespace : namespace.concat(trimmedSelector).sort(sortNamespace);
	
	    return {
	      observable: rootElement$.map(makeFindElements(childNamespace)),
	      namespace: childNamespace,
	      select: makeElementSelector(rootElement$),
	      events: (0, _events.makeEventsSelector)(rootElement$, childNamespace),
	      isolateSource: _isolate.isolateSource,
	      isolateSink: _isolate.isolateSink
	    };
	  };
	}
	
	exports.makeElementSelector = makeElementSelector;
	exports.makeIsStrictlyInRootScope = _makeIsStrictlyInRootScope.makeIsStrictlyInRootScope;

/***/ },
/* 95 */
/*!************************************************************!*\
  !*** ./~/@motorcycle/dom/lib/makeIsStrictlyInRootScope.js ***!
  \************************************************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function makeIsStrictlyInRootScope(namespace) {
	  var classIsForeign = function classIsForeign(c) {
	    var matched = c.match(/cycle-scope-(\S+)/);
	    return matched && namespace.indexOf("." + c) === -1;
	  };
	  var classIsDomestic = function classIsDomestic(c) {
	    var matched = c.match(/cycle-scope-(\S+)/);
	    return matched && namespace.indexOf("." + c) !== -1;
	  };
	  return function isStrictlyInRootScope(leaf) {
	    var some = Array.prototype.some;
	    var split = String.prototype.split;
	    for (var el = leaf; el; el = el.parentElement) {
	      var classList = el.classList || split.call(el.className, " ");
	      if (some.call(classList, classIsDomestic)) {
	        return true;
	      }
	      if (some.call(classList, classIsForeign)) {
	        return false;
	      }
	    }
	    return true;
	  };
	}
	
	exports.makeIsStrictlyInRootScope = makeIsStrictlyInRootScope;

/***/ },
/* 96 */
/*!*****************************************!*\
  !*** ./~/@motorcycle/dom/lib/events.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.makeEventsSelector = undefined;
	
	var _domEvent = __webpack_require__(/*! @most/dom-event */ 97);
	
	var _makeIsStrictlyInRootScope = __webpack_require__(/*! ./makeIsStrictlyInRootScope */ 95);
	
	var matchesSelector = void 0;
	try {
	  matchesSelector = __webpack_require__(/*! matches-selector */ 98);
	} catch (e) {
	  matchesSelector = function matchesSelector() {};
	}
	
	var eventTypesThatDontBubble = ['load', 'unload', 'focus', 'blur', 'mouseenter', 'mouseleave', 'submit', 'change', 'reset', 'timeupdate', 'playing', 'waiting', 'seeking', 'seeked', 'ended', 'loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough', 'durationchange', 'play', 'pause', 'ratechange', 'volumechange', 'suspend', 'emptied', 'stalled'];
	
	function maybeMutateEventPropagationAttributes(event) {
	  if (!event.hasOwnProperty('propagationHasBeenStopped')) {
	    (function () {
	      event.propagationHasBeenStopped = false;
	      var oldStopPropagation = event.stopPropagation;
	      event.stopPropagation = function stopPropagation() {
	        oldStopPropagation.call(this);
	        this.propagationHasBeenStopped = true;
	      };
	    })();
	  }
	}
	
	function mutateEventCurrentTarget(event, currentTargetElement) {
	  try {
	    Object.defineProperty(event, 'currentTarget', {
	      value: currentTargetElement,
	      configurable: true
	    });
	  } catch (err) {
	    console.log('please use event.ownerTarget');
	  }
	  event.ownerTarget = currentTargetElement;
	}
	
	function makeSimulateBubbling(namespace, rootEl) {
	  var isStrictlyInRootScope = (0, _makeIsStrictlyInRootScope.makeIsStrictlyInRootScope)(namespace);
	  var descendantSel = namespace.join(' ');
	  var topSel = namespace.join('');
	  var roof = rootEl.parentElement;
	
	  return function simulateBubbling(ev) {
	    maybeMutateEventPropagationAttributes(ev);
	    if (ev.propagationHasBeenStopped) {
	      return false;
	    }
	    for (var el = ev.target; el && el !== roof; el = el.parentElement) {
	      if (!isStrictlyInRootScope(el)) {
	        continue;
	      }
	      if (matchesSelector(el, descendantSel) || matchesSelector(el, topSel)) {
	        mutateEventCurrentTarget(ev, el);
	        return true;
	      }
	    }
	    return false;
	  };
	}
	
	var defaults = {
	  useCapture: false
	};
	
	function makeEventsSelector(rootElement$, namespace) {
	  return function eventsSelector(type) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? defaults : arguments[1];
	
	    if (typeof type !== 'string') {
	      throw new Error('DOM driver\'s events() expects argument to be a ' + 'string representing the event type to listen for.');
	    }
	    var useCapture = false;
	    if (typeof options.useCapture === 'boolean') {
	      useCapture = options.useCapture;
	    }
	    if (eventTypesThatDontBubble.indexOf(type) !== -1) {
	      useCapture = true;
	    }
	
	    return rootElement$.map(function (rootElement) {
	      return { rootElement: rootElement, namespace: namespace };
	    }).skipRepeatsWith(function (prev, curr) {
	      return prev.namespace.join('') === curr.namespace.join('');
	    }).map(function (_ref) {
	      var rootElement = _ref.rootElement;
	
	      if (!namespace || namespace.length === 0) {
	        return (0, _domEvent.domEvent)(type, rootElement, useCapture);
	      }
	      var simulateBubbling = makeSimulateBubbling(namespace, rootElement);
	      return (0, _domEvent.domEvent)(type, rootElement, useCapture).filter(simulateBubbling);
	    }).switch().multicast();
	  };
	}
	
	exports.makeEventsSelector = makeEventsSelector;

/***/ },
/* 97 */
/*!*********************************************!*\
  !*** ./~/@most/dom-event/dist/dom-event.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! most */ 4)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('most'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.most);
	    global.mostDomEvent = mod.exports;
	  }
	})(undefined, function (exports, _most) {
	  'use strict';
	
	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.touchcancel = exports.touchmove = exports.touchend = exports.touchstart = exports.pointerleave = exports.pointerout = exports.pointerenter = exports.pointerover = exports.pointermove = exports.pointerup = exports.pointerdown = exports.unload = exports.load = exports.popstate = exports.hashchange = exports.error = exports.scroll = exports.resize = exports.contextmenu = exports.input = exports.keyup = exports.keypress = exports.keydown = exports.submit = exports.select = exports.change = exports.mouseleave = exports.mouseout = exports.mouseenter = exports.mouseover = exports.mousemove = exports.mouseup = exports.mousedown = exports.dblclick = exports.click = exports.focusout = exports.focusin = exports.focus = exports.blur = exports.domEvent = undefined;
	
	  function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	      throw new TypeError("Cannot call a class as a function");
	    }
	  }
	
	  var _createClass = function () {
	    function defineProperties(target, props) {
	      for (var i = 0; i < props.length; i++) {
	        var descriptor = props[i];
	        descriptor.enumerable = descriptor.enumerable || false;
	        descriptor.configurable = true;
	        if ("value" in descriptor) descriptor.writable = true;
	        Object.defineProperty(target, descriptor.key, descriptor);
	      }
	    }
	
	    return function (Constructor, protoProps, staticProps) {
	      if (protoProps) defineProperties(Constructor.prototype, protoProps);
	      if (staticProps) defineProperties(Constructor, staticProps);
	      return Constructor;
	    };
	  }();
	
	  var domEvent = function domEvent(event, node) {
	    var capture = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
	    return new _most.Stream(new DomEvent(event, node, capture));
	  };
	
	  var blur = function blur(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('blur', node, capture);
	  };
	
	  var focus = function focus(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('focus', node, capture);
	  };
	
	  var focusin = function focusin(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('focusin', node, capture);
	  };
	
	  var focusout = function focusout(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('focusout', node, capture);
	  };
	
	  var click = function click(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('click', node, capture);
	  };
	
	  var dblclick = function dblclick(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('dblclick', node, capture);
	  };
	
	  var mousedown = function mousedown(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('mousedown', node, capture);
	  };
	
	  var mouseup = function mouseup(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('mouseup', node, capture);
	  };
	
	  var mousemove = function mousemove(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('mousemove', node, capture);
	  };
	
	  var mouseover = function mouseover(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('mouseover', node, capture);
	  };
	
	  var mouseenter = function mouseenter(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('mouseenter', node, capture);
	  };
	
	  var mouseout = function mouseout(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('mouseout', node, capture);
	  };
	
	  var mouseleave = function mouseleave(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('mouseleave', node, capture);
	  };
	
	  var change = function change(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('change', node, capture);
	  };
	
	  var select = function select(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('select', node, capture);
	  };
	
	  var submit = function submit(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('submit', node, capture);
	  };
	
	  var keydown = function keydown(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('keydown', node, capture);
	  };
	
	  var keypress = function keypress(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('keypress', node, capture);
	  };
	
	  var keyup = function keyup(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('keyup', node, capture);
	  };
	
	  var input = function input(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('input', node, capture);
	  };
	
	  var contextmenu = function contextmenu(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('contextmenu', node, capture);
	  };
	
	  var resize = function resize(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('resize', node, capture);
	  };
	
	  var scroll = function scroll(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('scroll', node, capture);
	  };
	
	  var error = function error(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('error', node, capture);
	  };
	
	  var hashchange = function hashchange(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('hashchange', node, capture);
	  };
	
	  var popstate = function popstate(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('popstate', node, capture);
	  };
	
	  var load = function load(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('load', node, capture);
	  };
	
	  var unload = function unload(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('unload', node, capture);
	  };
	
	  var pointerdown = function pointerdown(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('pointerdown', node, capture);
	  };
	
	  var pointerup = function pointerup(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('pointerup', node, capture);
	  };
	
	  var pointermove = function pointermove(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('pointermove', node, capture);
	  };
	
	  var pointerover = function pointerover(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('pointerover', node, capture);
	  };
	
	  var pointerenter = function pointerenter(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('pointerenter', node, capture);
	  };
	
	  var pointerout = function pointerout(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('pointerout', node, capture);
	  };
	
	  var pointerleave = function pointerleave(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('pointerleave', node, capture);
	  };
	
	  var touchstart = function touchstart(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('touchstart', node, capture);
	  };
	
	  var touchend = function touchend(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('touchend', node, capture);
	  };
	
	  var touchmove = function touchmove(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('touchmove', node, capture);
	  };
	
	  var touchcancel = function touchcancel(node) {
	    var capture = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    return domEvent('touchcancel', node, capture);
	  };
	
	  var DomEvent = function () {
	    function DomEvent(event, node, capture) {
	      _classCallCheck(this, DomEvent);
	
	      this.event = event;
	      this.node = node;
	      this.capture = capture;
	    }
	
	    _createClass(DomEvent, [{
	      key: 'run',
	      value: function run(sink, scheduler) {
	        var _this = this;
	
	        var send = function send(e) {
	          return tryEvent(scheduler.now(), e, sink);
	        };
	
	        var dispose = function dispose() {
	          return _this.node.removeEventListener(_this.event, send, _this.capture);
	        };
	
	        this.node.addEventListener(this.event, send, this.capture);
	        return {
	          dispose: dispose
	        };
	      }
	    }]);
	
	    return DomEvent;
	  }();
	
	  function tryEvent(t, x, sink) {
	    try {
	      sink.event(t, x);
	    } catch (e) {
	      sink.error(t, e);
	    }
	  }
	
	  exports.domEvent = domEvent;
	  exports.blur = blur;
	  exports.focus = focus;
	  exports.focusin = focusin;
	  exports.focusout = focusout;
	  exports.click = click;
	  exports.dblclick = dblclick;
	  exports.mousedown = mousedown;
	  exports.mouseup = mouseup;
	  exports.mousemove = mousemove;
	  exports.mouseover = mouseover;
	  exports.mouseenter = mouseenter;
	  exports.mouseout = mouseout;
	  exports.mouseleave = mouseleave;
	  exports.change = change;
	  exports.select = select;
	  exports.submit = submit;
	  exports.keydown = keydown;
	  exports.keypress = keypress;
	  exports.keyup = keyup;
	  exports.input = input;
	  exports.contextmenu = contextmenu;
	  exports.resize = resize;
	  exports.scroll = scroll;
	  exports.error = error;
	  exports.hashchange = hashchange;
	  exports.popstate = popstate;
	  exports.load = load;
	  exports.unload = unload;
	  exports.pointerdown = pointerdown;
	  exports.pointerup = pointerup;
	  exports.pointermove = pointermove;
	  exports.pointerover = pointerover;
	  exports.pointerenter = pointerenter;
	  exports.pointerout = pointerout;
	  exports.pointerleave = pointerleave;
	  exports.touchstart = touchstart;
	  exports.touchend = touchend;
	  exports.touchmove = touchmove;
	  exports.touchcancel = touchcancel;
	});

/***/ },
/* 98 */
/*!*************************************!*\
  !*** ./~/matches-selector/index.js ***!
  \*************************************/
/***/ function(module, exports) {

	'use strict';
	
	var proto = Element.prototype;
	var vendor = proto.matches || proto.matchesSelector || proto.webkitMatchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector;
	
	module.exports = match;
	
	/**
	 * Match `el` to `selector`.
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @return {Boolean}
	 * @api public
	 */
	
	function match(el, selector) {
	  if (vendor) return vendor.call(el, selector);
	  var nodes = el.parentNode.querySelectorAll(selector);
	  for (var i = 0; i < nodes.length; i++) {
	    if (nodes[i] == el) return true;
	  }
	  return false;
	}

/***/ },
/* 99 */
/*!************************************************!*\
  !*** ./~/@motorcycle/dom/lib/mockDOMSource.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mockDOMSource = undefined;
	
	var _most = __webpack_require__(/*! most */ 4);
	
	var _most2 = _interopRequireDefault(_most);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	var emptyStream = _most2.default.empty();
	
	function getEventsStreamForSelector(mockedEventTypes) {
	  return function getEventsStream(eventType) {
	    for (var key in mockedEventTypes) {
	      if (mockedEventTypes.hasOwnProperty(key) && key === eventType) {
	        return mockedEventTypes[key];
	      }
	    }
	    return emptyStream;
	  };
	}
	
	function makeMockSelector(mockedSelectors) {
	  return function select(selector) {
	    for (var key in mockedSelectors) {
	      if (mockedSelectors.hasOwnProperty(key) && key === selector) {
	        var observable = emptyStream;
	        if (mockedSelectors[key].hasOwnProperty('observable')) {
	          observable = mockedSelectors[key].observable;
	        }
	        return {
	          observable: observable,
	          select: makeMockSelector(mockedSelectors[key]),
	          events: getEventsStreamForSelector(mockedSelectors[key])
	        };
	      }
	    }
	    return {
	      observable: emptyStream,
	      select: makeMockSelector(mockedSelectors),
	      events: function events() {
	        return emptyStream;
	      }
	    };
	  };
	}
	
	function mockDOMSource() {
	  var mockedSelectors = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  return {
	    observable: emptyStream,
	    select: makeMockSelector(mockedSelectors),
	    events: function events() {
	      return emptyStream;
	    }
	  };
	}
	
	exports.mockDOMSource = mockDOMSource;

/***/ },
/* 100 */
/*!*****************************!*\
  !*** ./~/snabbdom/thunk.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var h = __webpack_require__(/*! ./h */ 80);
	
	function init(thunk) {
	  var i,
	      cur = thunk.data;
	  cur.vnode = cur.fn.apply(undefined, cur.args);
	}
	
	function prepatch(oldThunk, thunk) {
	  var i,
	      old = oldThunk.data,
	      cur = thunk.data;
	  var oldArgs = old.args,
	      args = cur.args;
	  cur.vnode = old.vnode;
	  if (old.fn !== cur.fn || oldArgs.length !== args.length) {
	    cur.vnode = cur.fn.apply(undefined, args);
	    return;
	  }
	  for (i = 0; i < args.length; ++i) {
	    if (oldArgs[i] !== args[i]) {
	      cur.vnode = cur.fn.apply(undefined, args);
	      return;
	    }
	  }
	}
	
	module.exports = function (name, fn /* args */) {
	  var i,
	      args = [];
	  for (i = 2; i < arguments.length; ++i) {
	    args[i - 2] = arguments[i];
	  }
	  return h('thunk' + name, {
	    hook: { init: init, prepatch: prepatch },
	    fn: fn, args: args
	  });
	};

/***/ },
/* 101 */
/*!**********************************************!*\
  !*** ./~/@motorcycle/dom/lib/hyperscript.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _vnode = __webpack_require__(/*! snabbdom/vnode */ 77);
	
	var _vnode2 = _interopRequireDefault(_vnode);
	
	var _is = __webpack_require__(/*! snabbdom/is */ 78);
	
	var _is2 = _interopRequireDefault(_is);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	var isObservable = function isObservable(x) {
	  return typeof x.observe === 'function';
	};
	
	var addNSToObservable = function addNSToObservable(vNode) {
	  addNS(vNode.data, vNode.children); // eslint-disable-line
	};
	
	function addNS(data, children) {
	  data.ns = 'http://www.w3.org/2000/svg';
	  if (typeof children !== 'undefined' && _is2.default.array(children)) {
	    for (var i = 0; i < children.length; ++i) {
	      if (isObservable(children[i])) {
	        children[i] = children[i].tap(addNSToObservable);
	      } else {
	        addNS(children[i].data, children[i].children);
	      }
	    }
	  }
	}
	
	/* eslint-disable */
	function h(sel, b, c) {
	  var data = {};
	  var children = void 0;
	  var text = void 0;
	  var i = void 0;
	  if (arguments.length === 3) {
	    data = b;
	    if (_is2.default.array(c)) {
	      children = c;
	    } else if (_is2.default.primitive(c)) {
	      text = c;
	    }
	  } else if (arguments.length === 2) {
	    if (_is2.default.array(b)) {
	      children = b;
	    } else if (_is2.default.primitive(b)) {
	      text = b;
	    } else {
	      data = b;
	    }
	  }
	  if (_is2.default.array(children)) {
	    for (i = 0; i < children.length; ++i) {
	      if (_is2.default.primitive(children[i])) {
	        children[i] = (0, _vnode2.default)(undefined, undefined, undefined, children[i]);
	      }
	    }
	  }
	  if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g') {
	    addNS(data, children);
	  }
	  return (0, _vnode2.default)(sel, data || {}, children, text, undefined);
	}
	/* eslint-enable */
	
	exports.default = h;

/***/ },
/* 102 */
/*!*********************************************!*\
  !*** ./~/hyperscript-helpers/dist/index.js ***!
  \*********************************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var isValidString = function isValidString(param) {
	  return typeof param === 'string' && param.length > 0;
	};
	
	var startsWith = function startsWith(string, start) {
	  return string[0] === start;
	};
	
	var isSelector = function isSelector(param) {
	  return isValidString(param) && (startsWith(param, '.') || startsWith(param, '#'));
	};
	
	var node = function node(h) {
	  return function (tagName) {
	    return function (first) {
	      for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        rest[_key - 1] = arguments[_key];
	      }
	
	      if (isSelector(first)) {
	        return h.apply(undefined, [tagName + first].concat(rest));
	      } else {
	        return h.apply(undefined, [tagName, first].concat(rest));
	      }
	    };
	  };
	};
	
	var TAG_NAMES = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'dd', 'del', 'dfn', 'dir', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'meta', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'p', 'param', 'pre', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'title', 'tr', 'u', 'ul', 'video', 'progress'];
	
	exports['default'] = function (h) {
	  var createTag = node(h);
	  var exported = { TAG_NAMES: TAG_NAMES, isSelector: isSelector, createTag: createTag };
	  TAG_NAMES.forEach(function (n) {
	    exported[n] = createTag(n);
	  });
	  return exported;
	};
	
	module.exports = exports['default'];

/***/ },
/* 103 */
/*!***************************************!*\
  !*** ./~/@cycle/isolate/lib/index.js ***!
  \***************************************/
/***/ function(module, exports) {

	"use strict";
	
	var counter = 0;
	function newScope() {
	    return "cycle" + ++counter;
	}
	function checkIsolateArgs(dataflowComponent, scope) {
	    if (typeof dataflowComponent !== "function") {
	        throw new Error("First argument given to isolate() must be a " + "'dataflowComponent' function");
	    }
	    if (typeof scope !== "string") {
	        throw new Error("Second argument given to isolate() must be a " + "string for 'scope'");
	    }
	}
	function isolateAllSources(sources, scope) {
	    var scopedSources = {};
	    for (var key in sources) {
	        if (sources.hasOwnProperty(key) && sources[key] && typeof sources[key].isolateSource === "function") {
	            scopedSources[key] = sources[key].isolateSource(sources[key], scope);
	        } else if (sources.hasOwnProperty(key)) {
	            scopedSources[key] = sources[key];
	        }
	    }
	    return scopedSources;
	}
	function isolateAllSinks(sources, sinks, scope) {
	    var scopedSinks = {};
	    for (var key in sinks) {
	        if (sinks.hasOwnProperty(key) && sources.hasOwnProperty(key) && typeof sources[key].isolateSink === "function") {
	            scopedSinks[key] = sources[key].isolateSink(sinks[key], scope);
	        } else if (sinks.hasOwnProperty(key)) {
	            scopedSinks[key] = sinks[key];
	        }
	    }
	    return scopedSinks;
	}
	/**
	 * Takes a `dataflowComponent` function and an optional `scope` string, and
	 * returns a scoped version of the `dataflowComponent` function.
	 *
	 * When the scoped dataflow component is invoked, each source provided to the
	 * scoped dataflowComponent is isolated to the scope using
	 * `source.isolateSource(source, scope)`, if possible. Likewise, the sinks
	 * returned from the scoped dataflow component are isolate to the scope using
	 * `source.isolateSink(sink, scope)`.
	 *
	 * If the `scope` is not provided, a new scope will be automatically created.
	 * This means that while **`isolate(dataflowComponent, scope)` is pure**
	 * (referentially transparent), **`isolate(dataflowComponent)` is impure**
	 * (not referentially transparent). Two calls to `isolate(Foo, bar)` will
	 * generate two indistinct dataflow components. But, two calls to `isolate(Foo)`
	 * will generate two distinct dataflow components.
	 *
	 * Note that both `isolateSource()` and `isolateSink()` are static members of
	 * `source`. The reason for this is that drivers produce `source` while the
	 * application produces `sink`, and it's the driver's responsibility to
	 * implement `isolateSource()` and `isolateSink()`.
	 *
	 * @param {Function} dataflowComponent a function that takes `sources` as input
	 * and outputs a collection of `sinks`.
	 * @param {String} scope an optional string that is used to isolate each
	 * `sources` and `sinks` when the returned scoped dataflow component is invoked.
	 * @return {Function} the scoped dataflow component function that, as the
	 * original `dataflowComponent` function, takes `sources` and returns `sinks`.
	 * @function isolate
	 */
	function isolate(component, scope) {
	    if (scope === void 0) {
	        scope = newScope();
	    }
	    checkIsolateArgs(component, scope);
	    return function scopedComponent(sources) {
	        var rest = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            rest[_i - 1] = arguments[_i];
	        }
	        var scopedSources = isolateAllSources(sources, scope);
	        var sinks = component.apply(void 0, [scopedSources].concat(rest));
	        var scopedSinks = isolateAllSinks(sources, sinks, scope);
	        return scopedSinks;
	    };
	}
	isolate.reset = function () {
	    return counter = 0;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = isolate;
	//# sourceMappingURL=index.js.map

/***/ },
/* 104 */
/*!***********************************!*\
  !*** ./components/nameform_01.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _dom = __webpack_require__(/*! @motorcycle/dom */ 2);
	
	var _isolate = __webpack_require__(/*! @cycle/isolate */ 103);
	
	var _isolate2 = _interopRequireDefault(_isolate);
	
	var _most = __webpack_require__(/*! most */ 4);
	
	var _most2 = _interopRequireDefault(_most);
	
	var _textentry_ = __webpack_require__(/*! ./textentry_01 */ 105);
	
	var _textentry_2 = _interopRequireDefault(_textentry_);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function main(sources) {
	  var comp = (0, _textentry_2.default)(sources);
	
	  var load$ = sources.store;
	
	  var state$ = comp.submit$.startWith('John').merge(load$);
	
	  var vtree$ = _most2.default.combine(function (state, compvtree) {
	    return (0, _dom.div)([compvtree, (0, _dom.h4)('Hello, ' + state)]);
	  }, state$, comp.DOM);
	
	  return {
	    DOM: vtree$,
	    store: state$
	  };
	}
	
	exports.default = main;

/***/ },
/* 105 */
/*!************************************!*\
  !*** ./components/textentry_01.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Not using any children
	
	var _dom = __webpack_require__(/*! @motorcycle/dom */ 2);
	
	var _isolate = __webpack_require__(/*! @cycle/isolate */ 103);
	
	var _isolate2 = _interopRequireDefault(_isolate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function intent(sources) {
	  var input$ = sources.DOM.select('.field').events('input');
	
	  var click$ = sources.DOM.select('.submitbtn').events('click');
	
	  var newValue$ = input$.map(function (e) {
	    return { type: 'INPUT', data: e.target.value };
	  });
	
	  var submit$ = input$.sampleWith(click$).map(function (e) {
	    return { type: 'SUBMIT', data: e.target.value };
	  });
	
	  return {
	    action$: submit$.merge(newValue$),
	    submit$: submit$
	  };
	}
	
	function model(actions$) {
	  return actions$.scan(function (state, action) {
	    switch (action.type) {
	      case 'INPUT':
	        return _extends({}, state, { inputVal: action.data });
	      case 'SUBMIT':
	        return { displayName: action.data, inputVal: '' };
	      default:
	        return state;
	    }
	  }, { displayName: '', inputVal: '' });
	}
	
	function view(state$) {
	  return state$.map(function (state) {
	    return (0, _dom.div)('.child', [(0, _dom.label)('Name:'), (0, _dom.input)('.field', { attrs: { type: 'text' }, props: { value: state.inputVal } }), (0, _dom.button)('.submitbtn', { attrs: { type: 'submit', value: 'Save', disabled: !state.inputVal } }, 'Submit')]);
	  });
	}
	
	exports.default = (0, _isolate2.default)(function (sources) {
	  var intents = intent(sources);
	  var state$ = model(intents.action$);
	  var vtree$ = view(state$);
	  return {
	    DOM: vtree$,
	    submit$: intents.submit$.map(function (a) {
	      return a.data;
	    })
	  };
	});

/***/ },
/* 106 */
/*!***********************************!*\
  !*** ./components/nameform_02.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _dom = __webpack_require__(/*! @motorcycle/dom */ 2);
	
	var _isolate = __webpack_require__(/*! @cycle/isolate */ 103);
	
	var _isolate2 = _interopRequireDefault(_isolate);
	
	var _most = __webpack_require__(/*! most */ 4);
	
	var _most2 = _interopRequireDefault(_most);
	
	var _textentry_ = __webpack_require__(/*! ./textentry_02 */ 107);
	
	var _textentry_2 = _interopRequireDefault(_textentry_);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function main(sources) {
	  var comp = (0, _textentry_2.default)(sources);
	
	  var load$ = sources.store;
	
	  var state$ = comp.submit$.startWith('John').merge(load$);
	
	  var vtree$ = _most2.default.combine(function (state, compvtree) {
	    return (0, _dom.div)([compvtree, (0, _dom.h4)('Hello, ' + state)]);
	  }, state$, comp.DOM);
	
	  return {
	    DOM: vtree$,
	    store: state$
	  };
	}
	
	exports.default = main;

/***/ },
/* 107 */
/*!************************************!*\
  !*** ./components/textentry_02.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _dom = __webpack_require__(/*! @motorcycle/dom */ 2);
	
	var _isolate = __webpack_require__(/*! @cycle/isolate */ 103);
	
	var _isolate2 = _interopRequireDefault(_isolate);
	
	var _confirm = __webpack_require__(/*! ./confirm */ 1);
	
	var _confirm2 = _interopRequireDefault(_confirm);
	
	var _mostSubject = __webpack_require__(/*! most-subject */ 108);
	
	var _mostSubject2 = _interopRequireDefault(_mostSubject);
	
	var _most = __webpack_require__(/*! most */ 4);
	
	var _most2 = _interopRequireDefault(_most);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function intent(sources, confirm$) {
	  var input$ = sources.DOM.select('.field').events('input');
	
	  var newValue$ = input$.map(function (e) {
	    return { type: 'INPUT', data: e.target.value };
	  });
	
	  var submit$ = input$.sampleWith(confirm$).map(function (e) {
	    return { type: 'SUBMIT', data: e.target.value };
	  }).multicast();
	
	  return {
	    action$: submit$.merge(newValue$),
	    submit$: submit$
	  };
	} // Using Submit child, solves circular dep manually
	
	function model(actions$) {
	  return actions$.scan(function (state, action) {
	    switch (action.type) {
	      case 'INPUT':
	        return action.data;
	      case 'SUBMIT':
	        return '';
	      default:
	        return state;
	    }
	  }, '');
	}
	
	function view(state$, confirmvtree$) {
	  return _most2.default.combine(function (state, confirmvtree) {
	    return (0, _dom.div)('.child', [(0, _dom.label)('Name: '), (0, _dom.input)('.field', { attrs: { type: 'text' }, props: { value: state } }), confirmvtree]);
	  }, state$, confirmvtree$);
	}
	
	exports.default = (0, _isolate2.default)(function (sources) {
	
	  var disabledproxy = _mostSubject2.default.holdSubject(1);
	  var childsources = { DOM: sources.DOM, disabled$: disabledproxy };
	  var confirm = (0, _confirm2.default)(childsources);
	
	  var intents = intent(sources, confirm.submit$);
	  var state$ = model(intents.action$);
	  var vtree$ = view(state$, confirm.DOM);
	
	  var disabled$ = state$.map(function (i) {
	    return !i;
	  }).startWith(true);
	  disabled$.subscribe(disabledproxy);
	
	  return {
	    DOM: vtree$,
	    submit$: intents.submit$.map(function (a) {
	      return a.data;
	    })
	  };
	});

/***/ },
/* 108 */
/*!*************************************!*\
  !*** ./~/most-subject/lib/index.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var most_1 = __webpack_require__(/*! most */ 4);
	var SubjectSource_1 = __webpack_require__(/*! ./SubjectSource */ 109);
	var HoldSubjectSource_1 = __webpack_require__(/*! ./HoldSubjectSource */ 112);
	function subject() {
	    return new Subject(new SubjectSource_1.BasicSubjectSource());
	}
	exports.subject = subject;
	function holdSubject(bufferSize) {
	    if (bufferSize === void 0) {
	        bufferSize = 1;
	    }
	    if (bufferSize <= 0) {
	        throw new Error('bufferSize must be an integer 1 or greater');
	    }
	    return new Subject(new HoldSubjectSource_1.HoldSubjectSource(bufferSize));
	}
	exports.holdSubject = holdSubject;
	var Subject = function (_super) {
	    __extends(Subject, _super);
	    function Subject(source) {
	        _super.call(this, source);
	    }
	    Subject.prototype.next = function (value) {
	        this.source.next(value);
	    };
	    Subject.prototype.error = function (err) {
	        this.source.error(err);
	    };
	    Subject.prototype.complete = function (value) {
	        this.source.complete(value);
	    };
	    return Subject;
	}(most_1.Stream);
	exports.Subject = Subject;
	//# sourceMappingURL=index.js.map

/***/ },
/* 109 */
/*!*********************************************!*\
  !*** ./~/most-subject/lib/SubjectSource.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var SubjectDisposable_1 = __webpack_require__(/*! ./SubjectDisposable */ 110);
	var util_1 = __webpack_require__(/*! ./util */ 111);
	var defaultScheduler = __webpack_require__(/*! most/lib/scheduler/defaultScheduler */ 25);
	var BasicSubjectSource = function () {
	    function BasicSubjectSource() {
	        this.scheduler = defaultScheduler;
	        this.sinks = [];
	        this.active = true;
	    }
	    BasicSubjectSource.prototype.run = function (sink, scheduler) {
	        var n = this.add(sink);
	        if (n === 1) this.scheduler = scheduler;
	        return new SubjectDisposable_1.SubjectDisposable(this, sink);
	    };
	    BasicSubjectSource.prototype.add = function (sink) {
	        this.sinks = util_1.append(sink, this.sinks);
	        return this.sinks.length;
	    };
	    BasicSubjectSource.prototype.remove = function (sink) {
	        var i = util_1.findIndex(sink, this.sinks);
	        if (i >= 0) {
	            this.sinks = util_1.remove(i, this.sinks);
	        }
	        return this.sinks.length;
	    };
	    BasicSubjectSource.prototype._dispose = function () {
	        this.active = false;
	    };
	    BasicSubjectSource.prototype.next = function (value) {
	        if (!this.active || this.scheduler === void 0) return;
	        this._next(this.scheduler.now(), value);
	    };
	    BasicSubjectSource.prototype.error = function (err) {
	        if (!this.active || this.scheduler === void 0) return;
	        this.active = false;
	        this._error(this.scheduler.now(), err);
	    };
	    BasicSubjectSource.prototype.complete = function (value) {
	        if (!this.active || this.scheduler === void 0) return;
	        this.active = false;
	        this._complete(this.scheduler.now(), value);
	    };
	    BasicSubjectSource.prototype._next = function (time, value) {
	        var s = this.sinks;
	        if (s.length === 1) {
	            return s[0].event(time, value);
	        }
	        for (var i = 0; i < s.length; ++i) {
	            util_1.tryEvent(time, value, s[i]);
	        }
	    };
	    BasicSubjectSource.prototype._complete = function (time, value) {
	        var s = this.sinks;
	        for (var i = 0; i < s.length; ++i) {
	            util_1.tryEnd(time, value, s[i]);
	        }
	    };
	    BasicSubjectSource.prototype._error = function (time, err) {
	        var s = this.sinks;
	        for (var i = 0; i < s.length; ++i) {
	            s[i].error(time, err);
	        }
	    };
	    return BasicSubjectSource;
	}();
	exports.BasicSubjectSource = BasicSubjectSource;
	//# sourceMappingURL=SubjectSource.js.map

/***/ },
/* 110 */
/*!*************************************************!*\
  !*** ./~/most-subject/lib/SubjectDisposable.js ***!
  \*************************************************/
/***/ function(module, exports) {

	"use strict";
	
	var SubjectDisposable = function () {
	    function SubjectDisposable(source, sink) {
	        this.source = source;
	        this.sink = sink;
	        this.disposed = false;
	    }
	    SubjectDisposable.prototype.dispose = function () {
	        if (this.disposed) return;
	        this.disposed = true;
	        var remaining = this.source.remove(this.sink);
	        return remaining === 0 && this.source._dispose();
	    };
	    return SubjectDisposable;
	}();
	exports.SubjectDisposable = SubjectDisposable;
	//# sourceMappingURL=SubjectDisposable.js.map

/***/ },
/* 111 */
/*!************************************!*\
  !*** ./~/most-subject/lib/util.js ***!
  \************************************/
/***/ function(module, exports) {

	"use strict";
	
	function tryEvent(t, x, sink) {
	    try {
	        sink.event(t, x);
	    } catch (e) {
	        sink.error(t, e);
	    }
	}
	exports.tryEvent = tryEvent;
	function tryEnd(t, x, sink) {
	    try {
	        sink.end(t, x);
	    } catch (e) {
	        sink.error(t, e);
	    }
	}
	exports.tryEnd = tryEnd;
	function pushEvents(buffer, sink) {
	    for (var i = 0; i < buffer.length; ++i) {
	        var _a = buffer[i],
	            time = _a.time,
	            value = _a.value;
	        sink.event(time, value);
	    }
	}
	exports.pushEvents = pushEvents;
	function dropAndAppend(event, buffer, bufferSize) {
	    if (buffer.length === bufferSize) {
	        return append(event, drop(1, buffer));
	    }
	    return append(event, buffer);
	}
	exports.dropAndAppend = dropAndAppend;
	function append(x, a) {
	    var l = a.length;
	    var b = new Array(l + 1);
	    for (var i = 0; i < l; ++i) {
	        b[i] = a[i];
	    }
	    b[l] = x;
	    return b;
	}
	exports.append = append;
	function drop(n, a) {
	    if (n < 0) {
	        throw new TypeError('n must be >= 0');
	    }
	    var l = a.length;
	    if (n === 0 || l === 0) {
	        return a;
	    }
	    if (n >= l) {
	        return [];
	    }
	    return unsafeDrop(n, a, l - n);
	}
	// unsafeDrop :: Int -> [a] -> Int -> [a]
	// Internal helper for drop
	function unsafeDrop(n, a, l) {
	    var b = new Array(l);
	    for (var i = 0; i < l; ++i) {
	        b[i] = a[n + i];
	    }
	    return b;
	}
	function remove(i, a) {
	    if (i < 0) {
	        throw new TypeError('i must be >= 0');
	    }
	    var l = a.length;
	    if (l === 0 || i >= l) {
	        return a;
	    }
	    if (l === 1) {
	        return [];
	    }
	    return unsafeRemove(i, a, l - 1);
	}
	exports.remove = remove;
	// unsafeRemove :: Int -> [a] -> Int -> [a]
	// Internal helper to remove element at index
	function unsafeRemove(i, a, l) {
	    var b = new Array(l);
	    var j;
	    for (j = 0; j < i; ++j) {
	        b[j] = a[j];
	    }
	    for (j = i; j < l; ++j) {
	        b[j] = a[j + 1];
	    }
	    return b;
	}
	function findIndex(x, a) {
	    for (var i = 0, l = a.length; i < l; ++i) {
	        if (x === a[i]) {
	            return i;
	        }
	    }
	    return -1;
	}
	exports.findIndex = findIndex;
	//# sourceMappingURL=util.js.map

/***/ },
/* 112 */
/*!*************************************************!*\
  !*** ./~/most-subject/lib/HoldSubjectSource.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var __extends = undefined && undefined.__extends || function (d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var SubjectSource_1 = __webpack_require__(/*! ./SubjectSource */ 109);
	var util_1 = __webpack_require__(/*! ./util */ 111);
	var HoldSubjectSource = function (_super) {
	    __extends(HoldSubjectSource, _super);
	    function HoldSubjectSource(bufferSize) {
	        _super.call(this);
	        this.buffer = [];
	        this.bufferSize = bufferSize;
	    }
	    HoldSubjectSource.prototype.add = function (sink) {
	        var buffer = this.buffer;
	        if (buffer.length > 0) {
	            util_1.pushEvents(buffer, sink);
	        }
	        return _super.prototype.add.call(this, sink);
	    };
	    HoldSubjectSource.prototype.next = function (value) {
	        if (!this.active || this.scheduler === void 0) {
	            return;
	        }
	        var time = this.scheduler.now();
	        this.buffer = util_1.dropAndAppend({ time: time, value: value }, this.buffer, this.bufferSize);
	        this._next(time, value);
	    };
	    return HoldSubjectSource;
	}(SubjectSource_1.BasicSubjectSource);
	exports.HoldSubjectSource = HoldSubjectSource;
	//# sourceMappingURL=HoldSubjectSource.js.map

/***/ },
/* 113 */
/*!***********************************!*\
  !*** ./components/nameform_03.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _dom = __webpack_require__(/*! @motorcycle/dom */ 2);
	
	var _isolate = __webpack_require__(/*! @cycle/isolate */ 103);
	
	var _isolate2 = _interopRequireDefault(_isolate);
	
	var _most = __webpack_require__(/*! most */ 4);
	
	var _most2 = _interopRequireDefault(_most);
	
	var _most3 = __webpack_require__(/*! ../compose/most */ 114);
	
	var _most4 = _interopRequireDefault(_most3);
	
	var _textentry_ = __webpack_require__(/*! ./textentry_03 */ 119);
	
	var _textentry_2 = _interopRequireDefault(_textentry_);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _compose = (0, _most4.default)();
	
	var withComponents = _compose.withComponents;
	
	
	function main(sources) {
	
	  var load$ = sources.store;
	
	  var state$ = sources.childrensinks.submit.submit$.startWith('John').merge(load$);
	
	  var vtree$ = _most2.default.combine(function (state, compvtree) {
	    return (0, _dom.div)([compvtree, (0, _dom.h4)('Hello, ' + state)]);
	  }, state$, sources.childrensinks.submit.DOM);
	
	  return {
	    DOM: vtree$,
	    store: state$
	  };
	}
	
	exports.default = withComponents(main, {
	  submit: [_textentry_2.default]
	});

/***/ },
/* 114 */
/*!*************************!*\
  !*** ./compose/most.js ***!
  \*************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _core = __webpack_require__(/*! ./core */ 115);
	
	var _core2 = _interopRequireDefault(_core);
	
	var _most = __webpack_require__(/*! cycle-circular/most */ 116);
	
	var _most2 = _interopRequireDefault(_most);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (0, _core2.default)(_most2.default);

/***/ },
/* 115 */
/*!*************************!*\
  !*** ./compose/core.js ***!
  \*************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var makeCompose = function makeCompose(proxy) {
	  return function () {
	    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var withComponent = function withComponent(main, constructor) {
	      for (var _len = arguments.length, dependencies = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	        dependencies[_key - 2] = arguments[_key];
	      }
	
	      return function (sources) {
	        var proxies = dependencies.reduce(function (proxies, dep) {
	          return _extends({}, proxies, _defineProperty({}, dep, proxy()));
	        }, {});
	        var childsinks = constructor(_extends({}, sources, proxies));
	        var sinks = main(_extends({}, sources, _defineProperty({}, config.childrensinks || 'childsinks', childsinks)));
	        Object.keys(proxies).forEach(function (proxy) {
	          return proxies[proxy].proxy(sinks[proxy]);
	        });
	        return sinks;
	      };
	    };
	    var withComponents = function withComponents(main, children) {
	      return function (sources) {
	        var proxies = {};
	        var childrensinks = Object.keys(children).reduce(function (childrensinks, child) {
	          var _children$child = _toArray(children[child]);
	
	          var constructor = _children$child[0];
	
	          var dependencies = _children$child.slice(1);
	
	          var myproxies = dependencies.reduce(function (myproxies, dep) {
	            return _extends({}, myproxies, _defineProperty({}, dep, proxies[dep] || (proxies[dep] = proxy())));
	          }, {});
	          return _extends({}, childrensinks, _defineProperty({}, child, constructor(_extends({}, sources, myproxies))));
	        }, {});
	        var sinks = main(_extends({}, sources, _defineProperty({}, config.childrensinks || 'childrensinks', childrensinks)));
	        Object.keys(proxies).forEach(function (proxy) {
	          return proxies[proxy].proxy(sinks[proxy]);
	        });
	        return sinks;
	      };
	    };
	    return { withComponent: withComponent, withComponents: withComponents };
	  };
	};
	
	exports.default = makeCompose;

/***/ },
/* 116 */
/*!**********************************!*\
  !*** ./~/cycle-circular/most.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(/*! ./lib */ 117).makeProxy(__webpack_require__(/*! @cycle/most-adapter */ 118).default);

/***/ },
/* 117 */
/*!***************************************!*\
  !*** ./~/cycle-circular/lib/index.js ***!
  \***************************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var proxy = exports.proxy = function proxy(adapter) {
	  var composeFn = arguments.length <= 1 || arguments[1] === undefined ? function (_) {
	    return _;
	  } : arguments[1];
	
	  if (!adapter) {
	    throw new Error('You should pass stream adapter to use');
	  }
	  var proxy = adapter.makeHoldSubject();
	  var proxyDispose = void 0;
	  var originalStream = void 0;
	  var refs = 0;
	  var proxyStream = adapter.adapt({}, function (_, observer) {
	    var dispose = adapter.streamSubscribe(proxy.stream, observer);
	    refs++;
	    if (originalStream && !proxyDispose) {
	      proxyStream.proxy(originalStream);
	    }
	    return function () {
	      dispose();
	      if (! --refs) {
	        proxyDispose();
	        proxyDispose = null;
	      }
	    };
	  });
	  proxyStream.proxy = function (original) {
	    if (original) {
	      original = composeFn(original);
	      if (!adapter.isValidStream(original)) {
	        throw new Error('You should provide a valid stream to proxy');
	      }
	      originalStream = null;
	      proxyDispose = adapter.streamSubscribe(original, proxy.observer);
	      originalStream = original;
	    } else {
	      return proxyStream;
	    }
	  };
	  return proxyStream;
	};
	
	var makeProxy = exports.makeProxy = function makeProxy(adapter) {
	  return function (fn) {
	    return proxy(adapter, fn);
	  };
	};
	
	exports.default = makeProxy;

/***/ },
/* 118 */
/*!********************************************!*\
  !*** ./~/@cycle/most-adapter/lib/index.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var most_subject_1 = __webpack_require__(/*! most-subject */ 108);
	function logToConsoleError(err) {
	    var target = err.stack || err;
	    if (console && console.error) {
	        console.error(target);
	    } else if (console && console.log) {
	        console.log(target);
	    }
	}
	var MostAdapter = {
	    adapt: function adapt(originStream, originStreamSubscribe) {
	        if (MostAdapter.isValidStream(originStream)) {
	            return originStream;
	        }
	        ;
	        var dispose;
	        var stream = most_subject_1.subject();
	        dispose = originStreamSubscribe(originStream, {
	            next: function next(x) {
	                return stream.next(x);
	            },
	            error: function error(err) {
	                return stream.error(err);
	            },
	            complete: function complete(x) {
	                stream.complete(x);
	                if (typeof dispose === 'function') {
	                    dispose();
	                }
	            }
	        });
	        return stream;
	    },
	    dispose: function dispose(sinks, sinkProxies, sources) {
	        Object.keys(sinkProxies).forEach(function (k) {
	            sinkProxies[k].observer.complete();
	        });
	    },
	    makeHoldSubject: function makeHoldSubject() {
	        var stream = most_subject_1.holdSubject();
	        var observer = {
	            next: function next(x) {
	                stream.next(x);
	            },
	            error: function error(err) {
	                logToConsoleError(err);
	                stream.error(err);
	            },
	            complete: function complete(x) {
	                stream.complete(x);
	            }
	        };
	        return { observer: observer, stream: stream };
	    },
	    isValidStream: function isValidStream(stream) {
	        return typeof stream.drain === 'function' && typeof stream.subscribe === 'function';
	    },
	    streamSubscribe: function streamSubscribe(stream, observer) {
	        var subscription = stream.subscribe(observer);
	        return function () {
	            return subscription.unsubscribe();
	        };
	    }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = MostAdapter;
	//# sourceMappingURL=index.js.map

/***/ },
/* 119 */
/*!************************************!*\
  !*** ./components/textentry_03.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _dom = __webpack_require__(/*! @motorcycle/dom */ 2);
	
	var _isolate = __webpack_require__(/*! @cycle/isolate */ 103);
	
	var _isolate2 = _interopRequireDefault(_isolate);
	
	var _confirm = __webpack_require__(/*! ./confirm */ 1);
	
	var _confirm2 = _interopRequireDefault(_confirm);
	
	var _mostSubject = __webpack_require__(/*! most-subject */ 108);
	
	var _mostSubject2 = _interopRequireDefault(_mostSubject);
	
	var _most = __webpack_require__(/*! most */ 4);
	
	var _most2 = _interopRequireDefault(_most);
	
	var _most3 = __webpack_require__(/*! ../compose/most */ 114);
	
	var _most4 = _interopRequireDefault(_most3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Solves circular dep using helper function
	
	var _compose = (0, _most4.default)();
	
	var withComponents = _compose.withComponents;
	
	
	var intent = function intent(sources) {
	  var input$ = sources.DOM.select('.field').events('input');
	
	  var newValue$ = input$.map(function (e) {
	    return { type: 'INPUT', data: e.target.value };
	  });
	
	  var submit$ = input$.sampleWith(sources.childrensinks.confirm.submit$).map(function (e) {
	    return { type: 'SUBMIT', data: e.target.value };
	  }).multicast();
	
	  return {
	    action$: submit$.merge(newValue$),
	    submit$: submit$
	  };
	};
	
	var model = function model(action$) {
	  return action$.scan(function (state, action) {
	    switch (action.type) {
	      case 'INPUT':
	        return action.data;
	      case 'SUBMIT':
	        return '';
	      default:
	        return state;
	    }
	  }, '');
	};
	
	var view = function view(state$, confirmvtree$) {
	  return _most2.default.combine(function (state, confirmvtree) {
	    return (0, _dom.div)('.child', [(0, _dom.label)('Name: '), (0, _dom.input)('.field', { attrs: { type: 'text' }, props: { value: state } }), confirmvtree]);
	  }, state$, confirmvtree$);
	};
	
	function main(sources) {
	  var intents = intent(sources);
	  var state$ = model(intents.action$);
	  var vtree$ = view(state$, sources.childrensinks.confirm.DOM);
	  return {
	    DOM: vtree$,
	    submit$: intents.submit$.map(function (a) {
	      return a.data;
	    }),
	    disabled$: state$.map(function (i) {
	      return !i;
	    }).startWith(true)
	  };
	}
	
	exports.default = (0, _isolate2.default)(withComponents(main, {
	  confirm: [_confirm2.default, "disabled$"]
	}));

/***/ },
/* 120 */
/*!***********************************!*\
  !*** ./components/nameform_04.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _dom = __webpack_require__(/*! @motorcycle/dom */ 2);
	
	var _isolate = __webpack_require__(/*! @cycle/isolate */ 103);
	
	var _isolate2 = _interopRequireDefault(_isolate);
	
	var _most = __webpack_require__(/*! most */ 4);
	
	var _most2 = _interopRequireDefault(_most);
	
	var _most3 = __webpack_require__(/*! ../compose/most */ 114);
	
	var _most4 = _interopRequireDefault(_most3);
	
	var _textentry_ = __webpack_require__(/*! ./textentry_04 */ 121);
	
	var _textentry_2 = _interopRequireDefault(_textentry_);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _compose = (0, _most4.default)();
	
	var withComponents = _compose.withComponents;
	
	
	function main(sources) {
	
	  var load$ = sources.store;
	
	  var state$ = sources.childsinks.submit$.startWith('John').merge(load$);
	
	  var vtree$ = _most2.default.combine(function (state, compvtree) {
	    return (0, _dom.div)([compvtree, (0, _dom.h4)('Hello, ' + state)]);
	  }, state$, sources.childsinks.submit.DOM);
	
	  return {
	    DOM: vtree$,
	    store: state$
	  };
	}
	
	exports.default = withComponents(main, _textentry_2.default);

/***/ },
/* 121 */
/*!************************************!*\
  !*** ./components/textentry_04.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _dom = __webpack_require__(/*! @motorcycle/dom */ 2);
	
	var _isolate = __webpack_require__(/*! @cycle/isolate */ 103);
	
	var _isolate2 = _interopRequireDefault(_isolate);
	
	var _confirm = __webpack_require__(/*! ./confirm */ 1);
	
	var _confirm2 = _interopRequireDefault(_confirm);
	
	var _mostSubject = __webpack_require__(/*! most-subject */ 108);
	
	var _mostSubject2 = _interopRequireDefault(_mostSubject);
	
	var _most = __webpack_require__(/*! most */ 4);
	
	var _most2 = _interopRequireDefault(_most);
	
	var _most3 = __webpack_require__(/*! ../compose/most */ 114);
	
	var _most4 = _interopRequireDefault(_most3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Solves circular dep using helper function for singular
	
	var _compose = (0, _most4.default)();
	
	var withComponent = _compose.withComponent;
	
	
	var intent = function intent(sources) {
	  var input$ = sources.DOM.select('.field').events('input');
	
	  var newValue$ = input$.map(function (e) {
	    return { type: 'INPUT', data: e.target.value };
	  });
	
	  var submit$ = input$.sampleWith(sources.childsinks.submit$).map(function (e) {
	    return { type: 'SUBMIT', data: e.target.value };
	  }).multicast();
	
	  return {
	    action$: submit$.merge(newValue$),
	    submit$: submit$
	  };
	};
	
	var model = function model(action$) {
	  return action$.scan(function (state, action) {
	    switch (action.type) {
	      case 'INPUT':
	        return action.data;
	      case 'SUBMIT':
	        return '';
	      default:
	        return state;
	    }
	  }, '');
	};
	
	var view = function view(state$, confirmvtree$) {
	  return _most2.default.combine(function (state, confirmvtree) {
	    return (0, _dom.div)('.child', [(0, _dom.label)('Name: '), (0, _dom.input)('.field', { attrs: { type: 'text' }, props: { value: state } }), confirmvtree]);
	  }, state$, confirmvtree$);
	};
	
	function main(sources) {
	  var intents = intent(sources);
	  var state$ = model(intents.action$);
	  var vtree$ = view(state$, sources.childsinks.DOM);
	  return {
	    DOM: vtree$,
	    submit$: intents.submit$.map(function (a) {
	      return a.data;
	    }),
	    disabled$: state$.map(function (i) {
	      return !i;
	    }).startWith(true)
	  };
	}
	
	exports.default = (0, _isolate2.default)(withComponent(main, _confirm2.default, "disabled$"));

/***/ },
/* 122 */
/*!****************************************!*\
  !*** ./~/@cycle/most-run/lib/index.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var base_1 = __webpack_require__(/*! @cycle/base */ 123);
	var most_adapter_1 = __webpack_require__(/*! @cycle/most-adapter */ 118);
	/**
	 * A function that prepares the Cycle application to be executed. Takes a `main`
	 * function and prepares to circularly connects it to the given collection of
	 * driver functions. As an output, `Cycle()` returns an object with three
	 * properties: `sources`, `sinks` and `run`. Only when `run()` is called will
	 * the application actually execute. Refer to the documentation of `run()` for
	 * more details.
	 *
	 * **Example:**
	 * ```js
	 * const {sources, sinks, run} = Cycle(main, drivers);
	 * // ...
	 * const dispose = run(); // Executes the application
	 * // ...
	 * dispose();
	 * ```
	 *
	 * @param {Function} main a function that takes `sources` as input
	 * and outputs a collection of `sinks` Observables.
	 * @param {Object} drivers an object where keys are driver names and values
	 * are driver functions.
	 * @return {Object} an object with three properties: `sources`, `sinks` and
	 * `run`. `sources` is the collection of driver sources, `sinks` is the
	 * collection of driver sinks, these can be used for debugging or testing. `run`
	 * is the function that once called will execute the application.
	 * @function Cycle
	 */
	var Cycle = function Cycle(main, drivers) {
	  return base_1.default(main, drivers, { streamAdapter: most_adapter_1.default });
	};
	/**
	 * Takes a `main` function and circularly connects it to the given collection
	 * of driver functions.
	 *
	 * **Example:**
	 * ```js
	 * const dispose = Cycle.run(main, drivers);
	 * // ...
	 * dispose();
	 * ```
	 *
	 * The `main` function expects a collection of "source" Observables (returned
	 * from drivers) as input, and should return a collection of "sink" Observables
	 * (to be given to drivers). A "collection of Observables" is a JavaScript
	 * object where keys match the driver names registered by the `drivers` object,
	 * and values are the Observables. Refer to the documentation of each driver to
	 * see more details on what types of sources it outputs and sinks it receives.
	 *
	 * @param {Function} main a function that takes `sources` as input
	 * and outputs a collection of `sinks` Observables.
	 * @param {Object} drivers an object where keys are driver names and values
	 * are driver functions.
	 * @return {Function} a dispose function, used to terminate the execution of the
	 * Cycle.js program, cleaning up resources used.
	 * @function run
	 */
	function run(main, drivers) {
	  return base_1.default(main, drivers, { streamAdapter: most_adapter_1.default }).run();
	}
	Cycle.run = run;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Cycle;
	//# sourceMappingURL=index.js.map

/***/ },
/* 123 */
/*!************************************!*\
  !*** ./~/@cycle/base/lib/index.js ***!
  \************************************/
/***/ function(module, exports) {

	"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	function makeSinkProxies(drivers, streamAdapter) {
	    var sinkProxies = {};
	    for (var name_1 in drivers) {
	        if (drivers.hasOwnProperty(name_1)) {
	            var holdSubject = streamAdapter.makeHoldSubject();
	            var driverStreamAdapter = drivers[name_1].streamAdapter || streamAdapter;
	            var stream = driverStreamAdapter.adapt(holdSubject.stream, streamAdapter.streamSubscribe);
	            sinkProxies[name_1] = {
	                stream: stream,
	                observer: holdSubject.observer
	            };
	        }
	    }
	    return sinkProxies;
	}
	function callDrivers(drivers, sinkProxies, streamAdapter) {
	    var sources = {};
	    for (var name_2 in drivers) {
	        if (drivers.hasOwnProperty(name_2)) {
	            var driverOutput = drivers[name_2](sinkProxies[name_2].stream, streamAdapter, name_2);
	            var driverStreamAdapter = drivers[name_2].streamAdapter;
	            if (driverStreamAdapter && driverStreamAdapter.isValidStream(driverOutput)) {
	                sources[name_2] = streamAdapter.adapt(driverOutput, driverStreamAdapter.streamSubscribe);
	            } else {
	                sources[name_2] = driverOutput;
	            }
	        }
	    }
	    return sources;
	}
	function replicateMany(sinks, sinkProxies, streamAdapter) {
	    var results = Object.keys(sinks).filter(function (name) {
	        return !!sinkProxies[name];
	    }).map(function (name) {
	        return streamAdapter.streamSubscribe(sinks[name], sinkProxies[name].observer);
	    });
	    var disposeFunctions = results.filter(function (dispose) {
	        return typeof dispose === 'function';
	    });
	    return function () {
	        disposeFunctions.forEach(function (dispose) {
	            return dispose();
	        });
	    };
	}
	function disposeSources(sources) {
	    for (var k in sources) {
	        if (sources.hasOwnProperty(k) && sources[k] && typeof sources[k].dispose === 'function') {
	            sources[k].dispose();
	        }
	    }
	}
	var isObjectEmpty = function isObjectEmpty(obj) {
	    return Object.keys(obj).length === 0;
	};
	function Cycle(main, drivers, options) {
	    if (typeof main !== "function") {
	        throw new Error("First argument given to Cycle must be the 'main' " + "function.");
	    }
	    if ((typeof drivers === 'undefined' ? 'undefined' : _typeof(drivers)) !== "object" || drivers === null) {
	        throw new Error("Second argument given to Cycle must be an object " + "with driver functions as properties.");
	    }
	    if (isObjectEmpty(drivers)) {
	        throw new Error("Second argument given to Cycle must be an object " + "with at least one driver function declared as a property.");
	    }
	    var streamAdapter = options.streamAdapter;
	    if (!streamAdapter || isObjectEmpty(streamAdapter)) {
	        throw new Error("Third argument given to Cycle must be an options object " + "with the streamAdapter key supplied with a valid stream adapter.");
	    }
	    var sinkProxies = makeSinkProxies(drivers, streamAdapter);
	    var sources = callDrivers(drivers, sinkProxies, streamAdapter);
	    var sinks = main(sources);
	    if (typeof window !== 'undefined') {
	        window.Cyclejs = { sinks: sinks };
	    }
	    var run = function run() {
	        var disposeReplication = replicateMany(sinks, sinkProxies, streamAdapter);
	        return function () {
	            streamAdapter.dispose(sinks, sinkProxies, sources);
	            disposeSources(sources);
	            disposeReplication();
	        };
	    };
	    return { sinks: sinks, sources: sources, run: run };
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Cycle;
	//# sourceMappingURL=index.js.map

/***/ },
/* 124 */
/*!************************!*\
  !*** ./storedriver.js ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (key) {
	  return function (save$) {
	    // save values from sink to localstorage
	    save$.subscribe({
	      next: function next(i) {
	        localStorage.setItem(key, i);
	      }
	    });
	    // return existing saved value as a source
	    return _most2.default.just(localStorage.getItem(key));
	  };
	};
	
	var _most = __webpack_require__(/*! most */ 4);
	
	var _most2 = _interopRequireDefault(_most);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }
/******/ ]);
//# sourceMappingURL=appbundle.js.map