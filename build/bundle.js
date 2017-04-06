(function () {
'use strict';

function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);

  return css;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var global$1 = typeof global !== "undefined" ? global :
            typeof self !== "undefined" ? self :
            typeof window !== "undefined" ? window : {};

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;
if (typeof global$1.setTimeout === 'function') {
    cachedSetTimeout = setTimeout;
}
if (typeof global$1.clearTimeout === 'function') {
    cachedClearTimeout = clearTimeout;
}

function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
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
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
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
    runClearTimeout(timeout);
}
function nextTick(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
}
// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
var title = 'browser';
var platform = 'browser';
var browser = true;
var env = {};
var argv = [];
var version = ''; // empty string to avoid regexp issues
var versions = {};
var release = {};
var config = {};

function noop() {}

var on = noop;
var addListener = noop;
var once = noop;
var off = noop;
var removeListener = noop;
var removeAllListeners = noop;
var emit = noop;

function binding(name) {
    throw new Error('process.binding is not supported');
}

function cwd () { return '/' }
function chdir (dir) {
    throw new Error('process.chdir is not supported');
}
function umask() { return 0; }

// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
var performance = global$1.performance || {};
var performanceNow =
  performance.now        ||
  performance.mozNow     ||
  performance.msNow      ||
  performance.oNow       ||
  performance.webkitNow  ||
  function(){ return (new Date()).getTime() };

// generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime
function hrtime(previousTimestamp){
  var clocktime = performanceNow.call(performance)*1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor((clocktime%1)*1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds<0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds,nanoseconds]
}

var startTime = new Date();
function uptime() {
  var currentTime = new Date();
  var dif = currentTime - startTime;
  return dif / 1000;
}

var process = {
  nextTick: nextTick,
  title: title,
  browser: browser,
  env: env,
  argv: argv,
  version: version,
  versions: versions,
  on: on,
  addListener: addListener,
  once: once,
  off: off,
  removeListener: removeListener,
  removeAllListeners: removeAllListeners,
  emit: emit,
  binding: binding,
  cwd: cwd,
  chdir: chdir,
  umask: umask,
  hrtime: hrtime,
  platform: platform,
  release: release,
  config: config,
  uptime: uptime
};

var index$5 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NO_OP = '$NO_OP';
exports.ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
// This should be boolean and not reference to window.document
exports.isBrowser = !!(typeof window !== 'undefined' && window.document);
function toArray(children) {
    return exports.isArray(children) ? children : (children ? [children] : children);
}
exports.toArray = toArray;
// this is MUCH faster than .constructor === Array and instanceof Array
// in Node 7 and the later versions of V8, slower in older versions though
exports.isArray = Array.isArray;
function isStatefulComponent(o) {
    return !isUndefined(o.prototype) && !isUndefined(o.prototype.render);
}
exports.isStatefulComponent = isStatefulComponent;
function isStringOrNumber(obj) {
    var type = typeof obj;
    return type === 'string' || type === 'number';
}
exports.isStringOrNumber = isStringOrNumber;
function isNullOrUndef(obj) {
    return isUndefined(obj) || isNull(obj);
}
exports.isNullOrUndef = isNullOrUndef;
function isInvalid(obj) {
    return isNull(obj) || obj === false || isTrue(obj) || isUndefined(obj);
}
exports.isInvalid = isInvalid;
function isFunction(obj) {
    return typeof obj === 'function';
}
exports.isFunction = isFunction;
function isString(obj) {
    return typeof obj === 'string';
}
exports.isString = isString;
function isNumber(obj) {
    return typeof obj === 'number';
}
exports.isNumber = isNumber;
function isNull(obj) {
    return obj === null;
}
exports.isNull = isNull;
function isTrue(obj) {
    return obj === true;
}
exports.isTrue = isTrue;
function isUndefined(obj) {
    return obj === undefined;
}
exports.isUndefined = isUndefined;
function isObject(o) {
    return typeof o === 'object';
}
exports.isObject = isObject;
function throwError(message) {
    if (!message) {
        message = exports.ERROR_MSG;
    }
    throw new Error("Inferno Error: " + message);
}
exports.throwError = throwError;
function warning(message) {
    console.warn(message);
}
exports.warning = warning;
function combineFrom(first, second) {
    var obj = {};
    var key;
    if (first) {
        for (key in first) {
            obj[key] = first[key];
        }
    }
    if (second) {
        for (key in second) {
            obj[key] = second[key];
        }
    }
    return obj;
}
exports.combineFrom = combineFrom;
function Lifecycle() {
    this.listeners = [];
}
exports.Lifecycle = Lifecycle;
Lifecycle.prototype.addListener = function addListener(callback) {
    this.listeners.push(callback);
};
Lifecycle.prototype.trigger = function trigger() {
    var listeners = this.listeners;
    var listener;
    // We need to remove current listener from array when calling it, because more listeners might be added
    while (listener = listeners.shift()) {
        listener();
    }
};
});

var index$3 = createCommonjsModule(function (module) {
module.exports = index$5;
module.exports.default = module.exports;
});

var options = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    recyclingEnabled: false,
    findDOMNodeEnabled: false,
    roots: null,
    createVNode: null,
    beforeRender: null,
    afterRender: null,
    afterMount: null,
    afterUpdate: null,
    beforeUnmount: null
};
});

var constants = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xlinkNS = 'http://www.w3.org/1999/xlink';
exports.xmlNS = 'http://www.w3.org/XML/1998/namespace';
exports.svgNS = 'http://www.w3.org/2000/svg';
var TRUE = true;
exports.strictProps = Object.create(null);
exports.strictProps.volume = TRUE;
exports.strictProps.defaultChecked = TRUE;
Object.freeze(exports.strictProps);
exports.booleanProps = Object.create(null);
exports.booleanProps.muted = TRUE;
exports.booleanProps.scoped = TRUE;
exports.booleanProps.loop = TRUE;
exports.booleanProps.open = TRUE;
exports.booleanProps.checked = TRUE;
exports.booleanProps.default = TRUE;
exports.booleanProps.capture = TRUE;
exports.booleanProps.disabled = TRUE;
exports.booleanProps.readOnly = TRUE;
exports.booleanProps.required = TRUE;
exports.booleanProps.autoplay = TRUE;
exports.booleanProps.controls = TRUE;
exports.booleanProps.seamless = TRUE;
exports.booleanProps.reversed = TRUE;
exports.booleanProps.allowfullscreen = TRUE;
exports.booleanProps.novalidate = TRUE;
exports.booleanProps.hidden = TRUE;
exports.booleanProps.autoFocus = TRUE;
Object.freeze(exports.booleanProps);
exports.namespaces = Object.create(null);
exports.namespaces['xlink:href'] = exports.xlinkNS;
exports.namespaces['xlink:arcrole'] = exports.xlinkNS;
exports.namespaces['xlink:actuate'] = exports.xlinkNS;
exports.namespaces['xlink:show'] = exports.xlinkNS;
exports.namespaces['xlink:role'] = exports.xlinkNS;
exports.namespaces['xlink:title'] = exports.xlinkNS;
exports.namespaces['xlink:type'] = exports.xlinkNS;
exports.namespaces['xml:base'] = exports.xmlNS;
exports.namespaces['xml:lang'] = exports.xmlNS;
exports.namespaces['xml:space'] = exports.xmlNS;
Object.freeze(exports.namespaces);
exports.isUnitlessNumber = Object.create(null);
exports.isUnitlessNumber.animationIterationCount = TRUE;
exports.isUnitlessNumber.borderImageOutset = TRUE;
exports.isUnitlessNumber.borderImageSlice = TRUE;
exports.isUnitlessNumber.borderImageWidth = TRUE;
exports.isUnitlessNumber.boxFlex = TRUE;
exports.isUnitlessNumber.boxFlexGroup = TRUE;
exports.isUnitlessNumber.boxOrdinalGroup = TRUE;
exports.isUnitlessNumber.columnCount = TRUE;
exports.isUnitlessNumber.flex = TRUE;
exports.isUnitlessNumber.flexGrow = TRUE;
exports.isUnitlessNumber.flexPositive = TRUE;
exports.isUnitlessNumber.flexShrink = TRUE;
exports.isUnitlessNumber.flexNegative = TRUE;
exports.isUnitlessNumber.flexOrder = TRUE;
exports.isUnitlessNumber.gridRow = TRUE;
exports.isUnitlessNumber.gridColumn = TRUE;
exports.isUnitlessNumber.fontWeight = TRUE;
exports.isUnitlessNumber.lineClamp = TRUE;
exports.isUnitlessNumber.lineHeight = TRUE;
exports.isUnitlessNumber.opacity = TRUE;
exports.isUnitlessNumber.order = TRUE;
exports.isUnitlessNumber.orphans = TRUE;
exports.isUnitlessNumber.tabSize = TRUE;
exports.isUnitlessNumber.widows = TRUE;
exports.isUnitlessNumber.zIndex = TRUE;
exports.isUnitlessNumber.zoom = TRUE;
exports.isUnitlessNumber.fillOpacity = TRUE;
exports.isUnitlessNumber.floodOpacity = TRUE;
exports.isUnitlessNumber.stopOpacity = TRUE;
exports.isUnitlessNumber.strokeDasharray = TRUE;
exports.isUnitlessNumber.strokeDashoffset = TRUE;
exports.isUnitlessNumber.strokeMiterlimit = TRUE;
exports.isUnitlessNumber.strokeOpacity = TRUE;
exports.isUnitlessNumber.strokeWidth = TRUE;
Object.freeze(exports.isUnitlessNumber);
exports.skipProps = Object.create(null);
exports.skipProps.children = TRUE;
exports.skipProps.childrenType = TRUE;
exports.skipProps.defaultValue = TRUE;
exports.skipProps.ref = TRUE;
exports.skipProps.key = TRUE;
exports.skipProps.selected = TRUE;
exports.skipProps.checked = TRUE;
exports.skipProps.multiple = TRUE;
Object.freeze(exports.skipProps);
exports.delegatedEvents = Object.create(null);
exports.delegatedEvents.onClick = TRUE;
exports.delegatedEvents.onMouseDown = TRUE;
exports.delegatedEvents.onMouseUp = TRUE;
exports.delegatedEvents.onMouseMove = TRUE;
exports.delegatedEvents.onSubmit = TRUE;
exports.delegatedEvents.onDblClick = TRUE;
exports.delegatedEvents.onKeyDown = TRUE;
exports.delegatedEvents.onKeyUp = TRUE;
exports.delegatedEvents.onKeyPress = TRUE;
Object.freeze(exports.delegatedEvents);
});

var delegation = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

var isiOS = index$3.isBrowser && !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
var delegatedEvents = new Map();
function handleEvent(name, lastEvent, nextEvent, dom) {
    var delegatedRoots = delegatedEvents.get(name);
    if (nextEvent) {
        if (!delegatedRoots) {
            delegatedRoots = { items: new Map(), count: 0, docEvent: null };
            delegatedRoots.docEvent = attachEventToDocument(name, delegatedRoots);
            delegatedEvents.set(name, delegatedRoots);
        }
        if (!lastEvent) {
            delegatedRoots.count++;
            if (isiOS && name === 'onClick') {
                trapClickOnNonInteractiveElement(dom);
            }
        }
        delegatedRoots.items.set(dom, nextEvent);
    }
    else if (delegatedRoots) {
        delegatedRoots.count--;
        delegatedRoots.items.delete(dom);
        if (delegatedRoots.count === 0) {
            document.removeEventListener(normalizeEventName(name), delegatedRoots.docEvent);
            delegatedEvents.delete(name);
        }
    }
}
exports.handleEvent = handleEvent;
function dispatchEvent(event, target, items, count, dom, isClick) {
    var eventsToTrigger = items.get(target);
    if (eventsToTrigger) {
        count--;
        // linkEvent object
        dom = target;
        if (eventsToTrigger.event) {
            eventsToTrigger.event(eventsToTrigger.data, event);
        }
        else {
            eventsToTrigger(event);
        }
        if (event.cancelBubble) {
            return;
        }
    }
    if (count > 0) {
        var parentDom = target.parentNode;
        // Html Nodes can be nested fe: span inside button in that scenario browser does not handle disabled attribute on parent,
        // because the event listener is on document.body
        // Don't process clicks on disabled elements
        if (parentDom === null || (isClick && parentDom.nodeType === 1 && parentDom.disabled)) {
            return;
        }
        dispatchEvent(event, parentDom, items, count, dom, isClick);
    }
}
function normalizeEventName(name) {
    return name.substr(2).toLowerCase();
}
function stopPropagation() {
    this.cancelBubble = true;
    this.stopImmediatePropagation();
}
function attachEventToDocument(name, delegatedRoots) {
    var docEvent = function (event) {
        var count = delegatedRoots.count;
        if (count > 0) {
            event.stopPropagation = stopPropagation;
            dispatchEvent(event, event.target, delegatedRoots.items, count, document, event.type === 'click');
        }
    };
    document.addEventListener(normalizeEventName(name), docEvent);
    return docEvent;
}
function emptyFn() {
}
function trapClickOnNonInteractiveElement(dom) {
    // Mobile Safari does not fire properly bubble click events on
    // non-interactive elements, which means delegated click listeners do not
    // fire. The workaround for this bug involves attaching an empty click
    // listener on the target node.
    // http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
    // Just set it using the onclick property so that we don't have to manage any
    // bookkeeping for it. Not sure if we need to clear it when the listener is
    // removed.
    // TODO: Only do this for the relevant Safaris maybe?
    dom.onclick = emptyFn;
}
});

var InputWrapper = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


function isCheckedType(type) {
    return type === 'checkbox' || type === 'radio';
}
exports.isCheckedType = isCheckedType;
function onTextInputChange(e) {
    var vNode = this;
    var props = vNode.props || utils.EMPTY_OBJ;
    var dom = vNode.dom;
    var previousValue = props.value;
    if (props.onInput) {
        var event_1 = props.onInput;
        if (event_1.event) {
            event_1.event(event_1.data, e);
        }
        else {
            event_1(e);
        }
    }
    else if (props.oninput) {
        props.oninput(e);
    }
    // the user may have updated the vNode from the above onInput events syncronously
    // so we need to get it from the context of `this` again
    var newVNode = this;
    var newProps = newVNode.props || utils.EMPTY_OBJ;
    // If render is going async there is no value change yet, it will come back to process input soon
    if (previousValue !== newProps.value) {
        // When this happens we need to store current cursor position and restore it, to avoid jumping
        applyValue(newProps, dom);
    }
}
function wrappedOnChange(e) {
    var props = this.props || utils.EMPTY_OBJ;
    var event = props.onChange;
    if (event.event) {
        event.event(event.data, e);
    }
    else {
        event(e);
    }
}
function onCheckboxChange(e) {
    e.stopPropagation(); // This click should not propagate its for internal use
    var vNode = this;
    var props = vNode.props || utils.EMPTY_OBJ;
    var dom = vNode.dom;
    var previousValue = props.value;
    if (props.onClick) {
        var event_2 = props.onClick;
        if (event_2.event) {
            event_2.event(event_2.data, e);
        }
        else {
            event_2(e);
        }
    }
    else if (props.onclick) {
        props.onclick(e);
    }
    // the user may have updated the vNode from the above onInput events syncronously
    // so we need to get it from the context of `this` again
    var newVNode = this;
    var newProps = newVNode.props || utils.EMPTY_OBJ;
    // If render is going async there is no value change yet, it will come back to process input soon
    if (previousValue !== newProps.value) {
        // When this happens we need to store current cursor position and restore it, to avoid jumping
        applyValue(newProps, dom);
    }
}
function processInput(vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
    applyValue(nextPropsOrEmpty, dom);
    if (mounting && isControlled) {
        if (isCheckedType(nextPropsOrEmpty.type)) {
            dom.onclick = onCheckboxChange.bind(vNode);
            dom.onclick.wrapped = true;
        }
        else {
            dom.oninput = onTextInputChange.bind(vNode);
            dom.oninput.wrapped = true;
        }
        if (nextPropsOrEmpty.onChange) {
            dom.onchange = wrappedOnChange.bind(vNode);
            dom.onchange.wrapped = true;
        }
    }
}
exports.processInput = processInput;
function applyValue(nextPropsOrEmpty, dom) {
    var type = nextPropsOrEmpty.type;
    var value = nextPropsOrEmpty.value;
    var checked = nextPropsOrEmpty.checked;
    var multiple = nextPropsOrEmpty.multiple;
    var defaultValue = nextPropsOrEmpty.defaultValue;
    var hasValue = !index$3.isNullOrUndef(value);
    if (type && type !== dom.type) {
        dom.setAttribute('type', type);
    }
    if (multiple && multiple !== dom.multiple) {
        dom.multiple = multiple;
    }
    if (!index$3.isNullOrUndef(defaultValue) && !hasValue) {
        dom.defaultValue = defaultValue + '';
    }
    if (isCheckedType(type)) {
        if (hasValue) {
            dom.value = value;
        }
        if (!index$3.isNullOrUndef(checked)) {
            dom.checked = checked;
        }
    }
    else {
        if (hasValue && dom.value !== value) {
            dom.value = value;
        }
        else if (!index$3.isNullOrUndef(checked)) {
            dom.checked = checked;
        }
    }
}
exports.applyValue = applyValue;
});

var SelectWrapper = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });



function updateChildOptionGroup(vNode, value) {
    var type = vNode.type;
    if (type === 'optgroup') {
        var children = vNode.children;
        if (index$3.isArray(children)) {
            for (var i = 0, len = children.length; i < len; i++) {
                updateChildOption(children[i], value);
            }
        }
        else if (VNodes.isVNode(children)) {
            updateChildOption(children, value);
        }
    }
    else {
        updateChildOption(vNode, value);
    }
}
function updateChildOption(vNode, value) {
    var props = vNode.props || utils.EMPTY_OBJ;
    var dom = vNode.dom;
    // we do this as multiple may have changed
    dom.value = props.value;
    if ((index$3.isArray(value) && value.indexOf(props.value) !== -1) || props.value === value) {
        dom.selected = true;
    }
    else if (!index$3.isNullOrUndef(value) || !index$3.isNullOrUndef(props.selected)) {
        dom.selected = props.selected || false;
    }
}
function onSelectChange(e) {
    var vNode = this;
    var props = vNode.props || utils.EMPTY_OBJ;
    var dom = vNode.dom;
    var previousValue = props.value;
    if (props.onChange) {
        var event_1 = props.onChange;
        if (event_1.event) {
            event_1.event(event_1.data, e);
        }
        else {
            event_1(e);
        }
    }
    else if (props.onchange) {
        props.onchange(e);
    }
    // the user may have updated the vNode from the above onInput events syncronously
    // so we need to get it from the context of `this` again
    var newVNode = this;
    var newProps = newVNode.props || utils.EMPTY_OBJ;
    // If render is going async there is no value change yet, it will come back to process input soon
    if (previousValue !== newProps.value) {
        // When this happens we need to store current cursor position and restore it, to avoid jumping
        applyValue(newVNode, dom, newProps, false);
    }
}
function processSelect(vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
    applyValue(vNode, dom, nextPropsOrEmpty, mounting);
    if (mounting && isControlled) {
        dom.onchange = onSelectChange.bind(vNode);
        dom.onchange.wrapped = true;
    }
}
exports.processSelect = processSelect;
function applyValue(vNode, dom, nextPropsOrEmpty, mounting) {
    if (nextPropsOrEmpty.multiple !== dom.multiple) {
        dom.multiple = nextPropsOrEmpty.multiple;
    }
    var children = vNode.children;
    if (!index$3.isInvalid(children)) {
        var value = nextPropsOrEmpty.value;
        if (mounting && index$3.isNullOrUndef(value)) {
            value = nextPropsOrEmpty.defaultValue;
        }
        if (index$3.isArray(children)) {
            for (var i = 0, len = children.length; i < len; i++) {
                updateChildOptionGroup(children[i], value);
            }
        }
        else if (VNodes.isVNode(children)) {
            updateChildOptionGroup(children, value);
        }
    }
}
exports.applyValue = applyValue;
});

var TextareaWrapper = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


function wrappedOnChange(e) {
    var props = this.props || utils.EMPTY_OBJ;
    var event = props.onChange;
    if (event.event) {
        event.event(event.data, e);
    }
    else {
        event(e);
    }
}
function onTextareaInputChange(e) {
    var vNode = this;
    var props = vNode.props || utils.EMPTY_OBJ;
    var previousValue = props.value;
    if (props.onInput) {
        var event_1 = props.onInput;
        if (event_1.event) {
            event_1.event(event_1.data, e);
        }
        else {
            event_1(e);
        }
    }
    else if (props.oninput) {
        props.oninput(e);
    }
    // the user may have updated the vNode from the above onInput events syncronously
    // so we need to get it from the context of `this` again
    var newVNode = this;
    var newProps = newVNode.props || utils.EMPTY_OBJ;
    // If render is going async there is no value change yet, it will come back to process input soon
    if (previousValue !== newProps.value) {
        // When this happens we need to store current cursor position and restore it, to avoid jumping
        applyValue(newVNode, vNode.dom, false);
    }
}
function processTextarea(vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
    applyValue(nextPropsOrEmpty, dom, mounting);
    if (mounting && isControlled) {
        dom.oninput = onTextareaInputChange.bind(vNode);
        dom.oninput.wrapped = true;
        if (nextPropsOrEmpty.onChange) {
            dom.onchange = wrappedOnChange.bind(vNode);
            dom.onchange.wrapped = true;
        }
    }
}
exports.processTextarea = processTextarea;
function applyValue(nextPropsOrEmpty, dom, mounting) {
    var value = nextPropsOrEmpty.value;
    var domValue = dom.value;
    if (index$3.isNullOrUndef(value)) {
        if (mounting) {
            var defaultValue = nextPropsOrEmpty.defaultValue;
            if (!index$3.isNullOrUndef(defaultValue)) {
                if (defaultValue !== domValue) {
                    dom.value = defaultValue;
                }
            }
            else if (domValue !== '') {
                dom.value = '';
            }
        }
    }
    else {
        /* There is value so keep it controlled */
        if (domValue !== value) {
            dom.value = value;
        }
    }
}
exports.applyValue = applyValue;
});

var processElement_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });




/**
 * There is currently no support for switching same input between controlled and nonControlled
 * If that ever becomes a real issue, then re design controlled elements
 * Currently user must choose either controlled or non-controlled and stick with that
 */
function processElement(flags, vNode, dom, nextPropsOrEmpty, mounting, isControlled) {
    if (flags & 512 /* InputElement */) {
        InputWrapper.processInput(vNode, dom, nextPropsOrEmpty, mounting, isControlled);
    }
    if (flags & 2048 /* SelectElement */) {
        SelectWrapper.processSelect(vNode, dom, nextPropsOrEmpty, mounting, isControlled);
    }
    if (flags & 1024 /* TextareaElement */) {
        TextareaWrapper.processTextarea(vNode, dom, nextPropsOrEmpty, mounting, isControlled);
    }
}
exports.processElement = processElement;
function isControlledFormElement(nextPropsOrEmpty) {
    return (nextPropsOrEmpty.type && InputWrapper.isCheckedType(nextPropsOrEmpty.type)) ? !index$3.isNullOrUndef(nextPropsOrEmpty.checked) : !index$3.isNullOrUndef(nextPropsOrEmpty.value);
}
exports.isControlledFormElement = isControlledFormElement;
});

var hydration = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });








function normalizeChildNodes(parentDom) {
    var dom = parentDom.firstChild;
    while (dom) {
        if (dom.nodeType === 8) {
            if (dom.data === '!') {
                var placeholder = document.createTextNode('');
                parentDom.replaceChild(placeholder, dom);
                dom = dom.nextSibling;
            }
            else {
                var lastDom = dom.previousSibling;
                parentDom.removeChild(dom);
                dom = lastDom || parentDom.firstChild;
            }
        }
        else {
            dom = dom.nextSibling;
        }
    }
}
exports.normalizeChildNodes = normalizeChildNodes;
function hydrateComponent(vNode, dom, lifecycle, context, isSVG, isClass) {
    var type = vNode.type;
    var ref = vNode.ref;
    vNode.dom = dom;
    var props = vNode.props || utils.EMPTY_OBJ;
    if (isClass) {
        var _isSVG = dom.namespaceURI === constants.svgNS;
        var instance = utils.createClassComponentInstance(vNode, type, props, context, _isSVG, lifecycle);
        var input = instance._lastInput;
        instance._vComponent = vNode;
        instance._vNode = vNode;
        hydrate(input, dom, lifecycle, instance._childContext, _isSVG);
        mounting.mountClassComponentCallbacks(vNode, ref, instance, lifecycle);
        instance._updating = false; // Mount finished allow going sync
        options.default.findDOMNodeEnabled && rendering.componentToDOMNodeMap.set(instance, dom);
    }
    else {
        var input = utils.createFunctionalComponentInput(vNode, type, props, context);
        hydrate(input, dom, lifecycle, context, isSVG);
        vNode.children = input;
        vNode.dom = input.dom;
        mounting.mountFunctionalComponentCallbacks(ref, dom, lifecycle);
    }
    return dom;
}
function hydrateElement(vNode, dom, lifecycle, context, isSVG) {
    var children = vNode.children;
    var props = vNode.props;
    var className = vNode.className;
    var flags = vNode.flags;
    var ref = vNode.ref;
    if (isSVG || (flags & 128 /* SvgElement */)) {
        isSVG = true;
    }
    if (dom.nodeType !== 1 || dom.tagName.toLowerCase() !== vNode.type) {
        if (process.env.NODE_ENV !== 'production') {
            index$3.warning('Inferno hydration: Server-side markup doesn\'t match client-side markup or Initial render target is not empty');
        }
        var newDom = mounting.mountElement(vNode, null, lifecycle, context, isSVG);
        vNode.dom = newDom;
        utils.replaceChild(dom.parentNode, newDom, dom);
        return newDom;
    }
    vNode.dom = dom;
    if (children) {
        hydrateChildren(children, dom, lifecycle, context, isSVG);
    }
    if (props) {
        var hasControlledValue = false;
        var isFormElement = (flags & 3584 /* FormElement */) > 0;
        if (isFormElement) {
            hasControlledValue = processElement_1.isControlledFormElement(props);
        }
        for (var prop in props) {
            // do not add a hasOwnProperty check here, it affects performance
            patching.patchProp(prop, null, props[prop], dom, isSVG, hasControlledValue);
        }
        if (isFormElement) {
            processElement_1.processElement(flags, vNode, dom, props, true, hasControlledValue);
        }
    }
    if (index$3.isNullOrUndef(className)) {
        dom.removeAttribute('class');
    }
    else {
        if (isSVG) {
            dom.setAttribute('class', className);
        }
        else {
            dom.className = className;
        }
    }
    if (ref) {
        mounting.mountRef(dom, ref, lifecycle);
    }
    return dom;
}
function hydrateChildren(children, parentDom, lifecycle, context, isSVG) {
    normalizeChildNodes(parentDom);
    var dom = parentDom.firstChild;
    if (index$3.isArray(children)) {
        for (var i = 0, len = children.length; i < len; i++) {
            var child = children[i];
            if (!index$3.isNull(child) && index$3.isObject(child)) {
                if (dom) {
                    dom = hydrate(child, dom, lifecycle, context, isSVG);
                    dom = dom.nextSibling;
                }
                else {
                    mounting.mount(child, parentDom, lifecycle, context, isSVG);
                }
            }
        }
    }
    else if (index$3.isStringOrNumber(children)) {
        if (dom && dom.nodeType === 3) {
            if (dom.nodeValue !== children) {
                dom.nodeValue = children;
            }
        }
        else if (children) {
            parentDom.textContent = children;
        }
        dom = dom.nextSibling;
    }
    else if (index$3.isObject(children)) {
        hydrate(children, dom, lifecycle, context, isSVG);
        dom = dom.nextSibling;
    }
    // clear any other DOM nodes, there should be only a single entry for the root
    while (dom) {
        var nextSibling = dom.nextSibling;
        parentDom.removeChild(dom);
        dom = nextSibling;
    }
}
function hydrateText(vNode, dom) {
    if (dom.nodeType !== 3) {
        var newDom = mounting.mountText(vNode, null);
        vNode.dom = newDom;
        utils.replaceChild(dom.parentNode, newDom, dom);
        return newDom;
    }
    var text = vNode.children;
    if (dom.nodeValue !== text) {
        dom.nodeValue = text;
    }
    vNode.dom = dom;
    return dom;
}
function hydrateVoid(vNode, dom) {
    vNode.dom = dom;
    return dom;
}
function hydrate(vNode, dom, lifecycle, context, isSVG) {
    var flags = vNode.flags;
    if (flags & 28 /* Component */) {
        return hydrateComponent(vNode, dom, lifecycle, context, isSVG, flags & 4 /* ComponentClass */);
    }
    else if (flags & 3970 /* Element */) {
        return hydrateElement(vNode, dom, lifecycle, context, isSVG);
    }
    else if (flags & 1 /* Text */) {
        return hydrateText(vNode, dom);
    }
    else if (flags & 4096 /* Void */) {
        return hydrateVoid(vNode, dom);
    }
    else {
        if (process.env.NODE_ENV !== 'production') {
            index$3.throwError("hydrate() expects a valid VNode, instead it received an object with the type \"" + typeof vNode + "\".");
        }
        index$3.throwError();
    }
}
function hydrateRoot(input, parentDom, lifecycle) {
    var dom = parentDom && parentDom.firstChild;
    if (dom) {
        hydrate(input, dom, lifecycle, utils.EMPTY_OBJ, false);
        dom = parentDom.firstChild;
        // clear any other DOM nodes, there should be only a single entry for the root
        while (dom = dom.nextSibling) {
            parentDom.removeChild(dom);
        }
        return true;
    }
    return false;
}
exports.default = hydrateRoot;
});

var recycling = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


var componentPools = new Map();
var elementPools = new Map();
function recycleElement(vNode, lifecycle, context, isSVG) {
    var tag = vNode.type;
    var pools = elementPools.get(tag);
    if (!index$3.isUndefined(pools)) {
        var key = vNode.key;
        var pool = key === null ? pools.nonKeyed : pools.keyed.get(key);
        if (!index$3.isUndefined(pool)) {
            var recycledVNode = pool.pop();
            if (!index$3.isUndefined(recycledVNode)) {
                patching.patchElement(recycledVNode, vNode, null, lifecycle, context, isSVG, true);
                return vNode.dom;
            }
        }
    }
    return null;
}
exports.recycleElement = recycleElement;
function poolElement(vNode) {
    var tag = vNode.type;
    var key = vNode.key;
    var pools = elementPools.get(tag);
    if (index$3.isUndefined(pools)) {
        pools = {
            nonKeyed: [],
            keyed: new Map()
        };
        elementPools.set(tag, pools);
    }
    if (index$3.isNull(key)) {
        pools.nonKeyed.push(vNode);
    }
    else {
        var pool = pools.keyed.get(key);
        if (index$3.isUndefined(pool)) {
            pool = [];
            pools.keyed.set(key, pool);
        }
        pool.push(vNode);
    }
}
exports.poolElement = poolElement;
function recycleComponent(vNode, lifecycle, context, isSVG) {
    var type = vNode.type;
    var pools = componentPools.get(type);
    if (!index$3.isUndefined(pools)) {
        var key = vNode.key;
        var pool = key === null ? pools.nonKeyed : pools.keyed.get(key);
        if (!index$3.isUndefined(pool)) {
            var recycledVNode = pool.pop();
            if (!index$3.isUndefined(recycledVNode)) {
                var flags = vNode.flags;
                var failed = patching.patchComponent(recycledVNode, vNode, null, lifecycle, context, isSVG, flags & 4 /* ComponentClass */, true);
                if (!failed) {
                    return vNode.dom;
                }
            }
        }
    }
    return null;
}
exports.recycleComponent = recycleComponent;
function poolComponent(vNode) {
    var hooks = vNode.ref;
    var nonRecycleHooks = hooks && (hooks.onComponentWillMount ||
        hooks.onComponentWillUnmount ||
        hooks.onComponentDidMount ||
        hooks.onComponentWillUpdate ||
        hooks.onComponentDidUpdate);
    if (nonRecycleHooks) {
        return;
    }
    var type = vNode.type;
    var key = vNode.key;
    var pools = componentPools.get(type);
    if (index$3.isUndefined(pools)) {
        pools = {
            nonKeyed: [],
            keyed: new Map()
        };
        componentPools.set(type, pools);
    }
    if (index$3.isNull(key)) {
        pools.nonKeyed.push(vNode);
    }
    else {
        var pool = pools.keyed.get(key);
        if (index$3.isUndefined(pool)) {
            pool = [];
            pools.keyed.set(key, pool);
        }
        pool.push(vNode);
    }
}
exports.poolComponent = poolComponent;
});

var unmounting = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });






function unmount(vNode, parentDom, lifecycle, canRecycle, isRecycling) {
    var flags = vNode.flags;
    if (flags & 28 /* Component */) {
        unmountComponent(vNode, parentDom, lifecycle, canRecycle, isRecycling);
    }
    else if (flags & 3970 /* Element */) {
        unmountElement(vNode, parentDom, lifecycle, canRecycle, isRecycling);
    }
    else if (flags & (1 /* Text */ | 4096 /* Void */)) {
        unmountVoidOrText(vNode, parentDom);
    }
}
exports.unmount = unmount;
function unmountVoidOrText(vNode, parentDom) {
    if (parentDom) {
        utils.removeChild(parentDom, vNode.dom);
    }
}
function unmountComponent(vNode, parentDom, lifecycle, canRecycle, isRecycling) {
    var instance = vNode.children;
    var flags = vNode.flags;
    var isStatefulComponent = flags & 4;
    var ref = vNode.ref;
    var dom = vNode.dom;
    if (!isRecycling) {
        if (isStatefulComponent) {
            if (!instance._unmounted) {
                instance._blockSetState = true;
                options.default.beforeUnmount && options.default.beforeUnmount(vNode);
                instance.componentWillUnmount && instance.componentWillUnmount();
                if (ref && !isRecycling) {
                    ref(null);
                }
                instance._unmounted = true;
                options.default.findDOMNodeEnabled && rendering.componentToDOMNodeMap.delete(instance);
                unmount(instance._lastInput, null, instance._lifecycle, false, isRecycling);
            }
        }
        else {
            if (!index$3.isNullOrUndef(ref)) {
                if (!index$3.isNullOrUndef(ref.onComponentWillUnmount)) {
                    ref.onComponentWillUnmount(dom);
                }
            }
            unmount(instance, null, lifecycle, false, isRecycling);
        }
    }
    if (parentDom) {
        var lastInput = instance._lastInput;
        if (index$3.isNullOrUndef(lastInput)) {
            lastInput = instance;
        }
        utils.removeChild(parentDom, dom);
    }
    if (options.default.recyclingEnabled && !isStatefulComponent && (parentDom || canRecycle)) {
        recycling.poolComponent(vNode);
    }
}
exports.unmountComponent = unmountComponent;
function unmountElement(vNode, parentDom, lifecycle, canRecycle, isRecycling) {
    var dom = vNode.dom;
    var ref = vNode.ref;
    var props = vNode.props;
    if (ref && !isRecycling) {
        unmountRef(ref);
    }
    var children = vNode.children;
    if (!index$3.isNullOrUndef(children)) {
        unmountChildren(children, lifecycle, isRecycling);
    }
    if (!index$3.isNull(props)) {
        for (var name_1 in props) {
            // do not add a hasOwnProperty check here, it affects performance
            if (props[name_1] !== null && patching.isAttrAnEvent(name_1)) {
                patching.patchEvent(name_1, props[name_1], null, dom);
                // We need to set this null, because same props otherwise come back if SCU returns false and we are recyling
                props[name_1] = null;
            }
        }
    }
    if (parentDom) {
        utils.removeChild(parentDom, dom);
    }
    if (options.default.recyclingEnabled && (parentDom || canRecycle)) {
        recycling.poolElement(vNode);
    }
}
exports.unmountElement = unmountElement;
function unmountChildren(children, lifecycle, isRecycling) {
    if (index$3.isArray(children)) {
        for (var i = 0, len = children.length; i < len; i++) {
            var child = children[i];
            if (!index$3.isInvalid(child) && index$3.isObject(child)) {
                unmount(child, null, lifecycle, false, isRecycling);
            }
        }
    }
    else if (index$3.isObject(children)) {
        unmount(children, null, lifecycle, false, isRecycling);
    }
}
function unmountRef(ref) {
    if (index$3.isFunction(ref)) {
        ref(null);
    }
    else {
        if (index$3.isInvalid(ref)) {
            return;
        }
        if (process.env.NODE_ENV !== 'production') {
            index$3.throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
        }
        index$3.throwError();
    }
}
});

var rendering = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });








// rather than use a Map, like we did before, we can use an array here
// given there shouldn't be THAT many roots on the page, the difference
// in performance is huge: https://esbench.com/bench/5802a691330ab09900a1a2da
exports.roots = [];
exports.componentToDOMNodeMap = new Map();
options.default.roots = exports.roots;
/**
 * When inferno.options.findDOMNOdeEnabled is true, this function will return DOM Node by component instance
 * @param ref Component instance
 * @returns {*|null} returns dom node
 */
function findDOMNode(ref) {
    if (!options.default.findDOMNodeEnabled) {
        if (process.env.NODE_ENV !== 'production') {
            index$3.throwError('findDOMNode() has been disabled, use Inferno.options.findDOMNodeEnabled = true; enabled findDOMNode(). Warning this can significantly impact performance!');
        }
        index$3.throwError();
    }
    var dom = ref && ref.nodeType ? ref : null;
    return exports.componentToDOMNodeMap.get(ref) || dom;
}
exports.findDOMNode = findDOMNode;
function getRoot(dom) {
    for (var i = 0, len = exports.roots.length; i < len; i++) {
        var root = exports.roots[i];
        if (root.dom === dom) {
            return root;
        }
    }
    return null;
}
function setRoot(dom, input, lifecycle) {
    var root = {
        dom: dom,
        input: input,
        lifecycle: lifecycle
    };
    exports.roots.push(root);
    return root;
}
function removeRoot(root) {
    for (var i = 0, len = exports.roots.length; i < len; i++) {
        if (exports.roots[i] === root) {
            exports.roots.splice(i, 1);
            return;
        }
    }
}
if (process.env.NODE_ENV !== 'production') {
    if (index$3.isBrowser && document.body === null) {
        index$3.warning('Inferno warning: you cannot initialize inferno without "document.body". Wait on "DOMContentLoaded" event, add script to bottom of body, or use async/defer attributes on script tag.');
    }
}
var documentBody = index$3.isBrowser ? document.body : null;
/**
 * Renders virtual node tree into parent node.
 * @param {VNode | null | string | number} input vNode to be rendered
 * @param parentDom DOM node which content will be replaced by virtual node
 * @returns {InfernoChildren} rendered virtual node
 */
function render(input, parentDom) {
    if (documentBody === parentDom) {
        if (process.env.NODE_ENV !== 'production') {
            index$3.throwError('you cannot render() to the "document.body". Use an empty element as a container instead.');
        }
        index$3.throwError();
    }
    if (input === index$3.NO_OP) {
        return;
    }
    var root = getRoot(parentDom);
    if (index$3.isNull(root)) {
        var lifecycle = new index$3.Lifecycle();
        if (!index$3.isInvalid(input)) {
            if (input.dom) {
                input = VNodes.directClone(input);
            }
            if (!hydration.default(input, parentDom, lifecycle)) {
                mounting.mount(input, parentDom, lifecycle, utils.EMPTY_OBJ, false);
            }
            root = setRoot(parentDom, input, lifecycle);
            lifecycle.trigger();
        }
    }
    else {
        var lifecycle = root.lifecycle;
        lifecycle.listeners = [];
        if (index$3.isNullOrUndef(input)) {
            unmounting.unmount(root.input, parentDom, lifecycle, false, false);
            removeRoot(root);
        }
        else {
            if (input.dom) {
                input = VNodes.directClone(input);
            }
            patching.patch(root.input, input, parentDom, lifecycle, utils.EMPTY_OBJ, false, false);
        }
        root.input = input;
        lifecycle.trigger();
    }
    if (root) {
        var rootInput = root.input;
        if (rootInput && (rootInput.flags & 28 /* Component */)) {
            return rootInput.children;
        }
    }
}
exports.render = render;
function createRenderer(parentDom) {
    return function renderer(lastInput, nextInput) {
        if (!parentDom) {
            parentDom = lastInput;
        }
        render(nextInput, parentDom);
    };
}
exports.createRenderer = createRenderer;
});

var patching = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });










function patch(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling) {
    if (lastVNode !== nextVNode) {
        var lastFlags = lastVNode.flags;
        var nextFlags = nextVNode.flags;
        if (nextFlags & 28 /* Component */) {
            if (lastFlags & 28 /* Component */) {
                patchComponent(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, nextFlags & 4 /* ComponentClass */, isRecycling);
            }
            else {
                utils.replaceVNode(parentDom, mounting.mountComponent(nextVNode, null, lifecycle, context, isSVG, nextFlags & 4 /* ComponentClass */), lastVNode, lifecycle, isRecycling);
            }
        }
        else if (nextFlags & 3970 /* Element */) {
            if (lastFlags & 3970 /* Element */) {
                patchElement(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
            }
            else {
                utils.replaceVNode(parentDom, mounting.mountElement(nextVNode, null, lifecycle, context, isSVG), lastVNode, lifecycle, isRecycling);
            }
        }
        else if (nextFlags & 1 /* Text */) {
            if (lastFlags & 1 /* Text */) {
                patchText(lastVNode, nextVNode);
            }
            else {
                utils.replaceVNode(parentDom, mounting.mountText(nextVNode, null), lastVNode, lifecycle, isRecycling);
            }
        }
        else if (nextFlags & 4096 /* Void */) {
            if (lastFlags & 4096 /* Void */) {
                patchVoid(lastVNode, nextVNode);
            }
            else {
                utils.replaceVNode(parentDom, mounting.mountVoid(nextVNode, null), lastVNode, lifecycle, isRecycling);
            }
        }
        else {
            // Error case: mount new one replacing old one
            utils.replaceLastChildAndUnmount(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
        }
    }
}
exports.patch = patch;
function unmountChildren(children, dom, lifecycle, isRecycling) {
    if (VNodes.isVNode(children)) {
        unmounting.unmount(children, dom, lifecycle, true, isRecycling);
    }
    else if (index$3.isArray(children)) {
        utils.removeAllChildren(dom, children, lifecycle, isRecycling);
    }
    else {
        dom.textContent = '';
    }
}
function patchElement(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling) {
    var nextTag = nextVNode.type;
    var lastTag = lastVNode.type;
    if (lastTag !== nextTag) {
        utils.replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
    }
    else {
        var dom = lastVNode.dom;
        var lastProps = lastVNode.props;
        var nextProps = nextVNode.props;
        var lastChildren = lastVNode.children;
        var nextChildren = nextVNode.children;
        var lastFlags = lastVNode.flags;
        var nextFlags = nextVNode.flags;
        var nextRef = nextVNode.ref;
        var lastClassName = lastVNode.className;
        var nextClassName = nextVNode.className;
        nextVNode.dom = dom;
        if (isSVG || (nextFlags & 128 /* SvgElement */) > 0) {
            isSVG = true;
        }
        if (lastChildren !== nextChildren) {
            patchChildren(lastFlags, nextFlags, lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
        }
        // inlined patchProps  -- starts --
        if (lastProps !== nextProps) {
            var lastPropsOrEmpty = lastProps || utils.EMPTY_OBJ;
            var nextPropsOrEmpty = nextProps || utils.EMPTY_OBJ;
            var hasControlledValue = false;
            if (nextPropsOrEmpty !== utils.EMPTY_OBJ) {
                var isFormElement = (nextFlags & 3584 /* FormElement */) > 0;
                if (isFormElement) {
                    hasControlledValue = processElement_1.isControlledFormElement(nextPropsOrEmpty);
                }
                for (var prop in nextPropsOrEmpty) {
                    // do not add a hasOwnProperty check here, it affects performance
                    var nextValue = nextPropsOrEmpty[prop];
                    var lastValue = lastPropsOrEmpty[prop];
                    patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue);
                }
                if (isFormElement) {
                    processElement_1.processElement(nextFlags, nextVNode, dom, nextPropsOrEmpty, false, hasControlledValue);
                }
            }
            if (lastPropsOrEmpty !== utils.EMPTY_OBJ) {
                for (var prop in lastPropsOrEmpty) {
                    // do not add a hasOwnProperty check here, it affects performance
                    if (index$3.isNullOrUndef(nextPropsOrEmpty[prop])) {
                        removeProp(prop, lastPropsOrEmpty[prop], dom);
                    }
                }
            }
        }
        // inlined patchProps  -- ends --
        if (lastClassName !== nextClassName) {
            if (index$3.isNullOrUndef(nextClassName)) {
                dom.removeAttribute('class');
            }
            else {
                if (isSVG) {
                    dom.setAttribute('class', nextClassName);
                }
                else {
                    dom.className = nextClassName;
                }
            }
        }
        if (nextRef) {
            if (lastVNode.ref !== nextRef || isRecycling) {
                mounting.mountRef(dom, nextRef, lifecycle);
            }
        }
    }
}
exports.patchElement = patchElement;
function patchChildren(lastFlags, nextFlags, lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling) {
    var patchArray = false;
    var patchKeyed = false;
    if (nextFlags & 64 /* HasNonKeyedChildren */) {
        patchArray = true;
    }
    else if ((lastFlags & 32 /* HasKeyedChildren */) && (nextFlags & 32 /* HasKeyedChildren */)) {
        patchKeyed = true;
        patchArray = true;
    }
    else if (index$3.isInvalid(nextChildren)) {
        unmountChildren(lastChildren, dom, lifecycle, isRecycling);
    }
    else if (index$3.isInvalid(lastChildren)) {
        if (index$3.isStringOrNumber(nextChildren)) {
            utils.setTextContent(dom, nextChildren);
        }
        else {
            if (index$3.isArray(nextChildren)) {
                mounting.mountArrayChildren(nextChildren, dom, lifecycle, context, isSVG);
            }
            else {
                mounting.mount(nextChildren, dom, lifecycle, context, isSVG);
            }
        }
    }
    else if (index$3.isStringOrNumber(nextChildren)) {
        if (index$3.isStringOrNumber(lastChildren)) {
            utils.updateTextContent(dom, nextChildren);
        }
        else {
            unmountChildren(lastChildren, dom, lifecycle, isRecycling);
            utils.setTextContent(dom, nextChildren);
        }
    }
    else if (index$3.isArray(nextChildren)) {
        if (index$3.isArray(lastChildren)) {
            patchArray = true;
            if (utils.isKeyed(lastChildren, nextChildren)) {
                patchKeyed = true;
            }
        }
        else {
            unmountChildren(lastChildren, dom, lifecycle, isRecycling);
            mounting.mountArrayChildren(nextChildren, dom, lifecycle, context, isSVG);
        }
    }
    else if (index$3.isArray(lastChildren)) {
        utils.removeAllChildren(dom, lastChildren, lifecycle, isRecycling);
        mounting.mount(nextChildren, dom, lifecycle, context, isSVG);
    }
    else if (VNodes.isVNode(nextChildren)) {
        if (VNodes.isVNode(lastChildren)) {
            patch(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
        }
        else {
            unmountChildren(lastChildren, dom, lifecycle, isRecycling);
            mounting.mount(nextChildren, dom, lifecycle, context, isSVG);
        }
    }
    if (patchArray) {
        if (patchKeyed) {
            patchKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
        }
        else {
            patchNonKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
        }
    }
}
function patchComponent(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isClass, isRecycling) {
    var lastType = lastVNode.type;
    var nextType = nextVNode.type;
    var lastKey = lastVNode.key;
    var nextKey = nextVNode.key;
    if (lastType !== nextType || lastKey !== nextKey) {
        utils.replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
        return false;
    }
    else {
        var nextProps = nextVNode.props || utils.EMPTY_OBJ;
        if (isClass) {
            var instance = lastVNode.children;
            instance._updating = true;
            if (instance._unmounted) {
                if (index$3.isNull(parentDom)) {
                    return true;
                }
                utils.replaceChild(parentDom, mounting.mountComponent(nextVNode, null, lifecycle, context, isSVG, nextVNode.flags & 4 /* ComponentClass */), lastVNode.dom);
            }
            else {
                var lastState = instance.state;
                var nextState = instance.state;
                var lastProps = instance.props;
                var childContext = void 0;
                if (!index$3.isUndefined(instance.getChildContext)) {
                    childContext = instance.getChildContext();
                }
                nextVNode.children = instance;
                instance._isSVG = isSVG;
                if (index$3.isNullOrUndef(childContext)) {
                    childContext = context;
                }
                else {
                    childContext = index$3.combineFrom(context, childContext);
                }
                var lastInput = instance._lastInput;
                var nextInput = instance._updateComponent(lastState, nextState, lastProps, nextProps, context, false, false);
                var didUpdate = true;
                instance._childContext = childContext;
                if (index$3.isInvalid(nextInput)) {
                    nextInput = VNodes.createVoidVNode();
                }
                else if (nextInput === index$3.NO_OP) {
                    nextInput = lastInput;
                    didUpdate = false;
                }
                else if (index$3.isStringOrNumber(nextInput)) {
                    nextInput = VNodes.createTextVNode(nextInput, null);
                }
                else if (index$3.isArray(nextInput)) {
                    if (process.env.NODE_ENV !== 'production') {
                        index$3.throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
                    }
                    index$3.throwError();
                }
                else if (index$3.isObject(nextInput) && nextInput.dom) {
                    nextInput = VNodes.directClone(nextInput);
                }
                if (nextInput.flags & 28 /* Component */) {
                    nextInput.parentVNode = nextVNode;
                }
                else if (lastInput.flags & 28 /* Component */) {
                    lastInput.parentVNode = nextVNode;
                }
                instance._lastInput = nextInput;
                instance._vNode = nextVNode;
                if (didUpdate) {
                    patch(lastInput, nextInput, parentDom, lifecycle, childContext, isSVG, isRecycling);
                    if (!index$3.isUndefined(instance.componentDidUpdate)) {
                        instance.componentDidUpdate(lastProps, lastState);
                    }
                    options.default.afterUpdate && options.default.afterUpdate(nextVNode);
                    options.default.findDOMNodeEnabled && rendering.componentToDOMNodeMap.set(instance, nextInput.dom);
                }
                nextVNode.dom = nextInput.dom;
            }
            instance._updating = false;
        }
        else {
            var shouldUpdate = true;
            var lastProps = lastVNode.props;
            var nextHooks = nextVNode.ref;
            var nextHooksDefined = !index$3.isNullOrUndef(nextHooks);
            var lastInput = lastVNode.children;
            var nextInput = lastInput;
            nextVNode.dom = lastVNode.dom;
            nextVNode.children = lastInput;
            if (lastKey !== nextKey) {
                shouldUpdate = true;
            }
            else {
                if (nextHooksDefined && !index$3.isNullOrUndef(nextHooks.onComponentShouldUpdate)) {
                    shouldUpdate = nextHooks.onComponentShouldUpdate(lastProps, nextProps);
                }
            }
            if (shouldUpdate !== false) {
                if (nextHooksDefined && !index$3.isNullOrUndef(nextHooks.onComponentWillUpdate)) {
                    nextHooks.onComponentWillUpdate(lastProps, nextProps);
                }
                nextInput = nextType(nextProps, context);
                if (index$3.isInvalid(nextInput)) {
                    nextInput = VNodes.createVoidVNode();
                }
                else if (index$3.isStringOrNumber(nextInput) && nextInput !== index$3.NO_OP) {
                    nextInput = VNodes.createTextVNode(nextInput, null);
                }
                else if (index$3.isArray(nextInput)) {
                    if (process.env.NODE_ENV !== 'production') {
                        index$3.throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
                    }
                    index$3.throwError();
                }
                else if (index$3.isObject(nextInput) && nextInput.dom) {
                    nextInput = VNodes.directClone(nextInput);
                }
                if (nextInput !== index$3.NO_OP) {
                    patch(lastInput, nextInput, parentDom, lifecycle, context, isSVG, isRecycling);
                    nextVNode.children = nextInput;
                    if (nextHooksDefined && !index$3.isNullOrUndef(nextHooks.onComponentDidUpdate)) {
                        nextHooks.onComponentDidUpdate(lastProps, nextProps);
                    }
                    nextVNode.dom = nextInput.dom;
                }
            }
            if (nextInput.flags & 28 /* Component */) {
                nextInput.parentVNode = nextVNode;
            }
            else if (lastInput.flags & 28 /* Component */) {
                lastInput.parentVNode = nextVNode;
            }
        }
    }
    return false;
}
exports.patchComponent = patchComponent;
function patchText(lastVNode, nextVNode) {
    var nextText = nextVNode.children;
    var dom = lastVNode.dom;
    nextVNode.dom = dom;
    if (lastVNode.children !== nextText) {
        dom.nodeValue = nextText;
    }
}
exports.patchText = patchText;
function patchVoid(lastVNode, nextVNode) {
    nextVNode.dom = lastVNode.dom;
}
exports.patchVoid = patchVoid;
function patchNonKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling) {
    var lastChildrenLength = lastChildren.length;
    var nextChildrenLength = nextChildren.length;
    var commonLength = lastChildrenLength > nextChildrenLength ? nextChildrenLength : lastChildrenLength;
    var i = 0;
    for (; i < commonLength; i++) {
        var nextChild = nextChildren[i];
        if (nextChild.dom) {
            nextChild = nextChildren[i] = VNodes.directClone(nextChild);
        }
        patch(lastChildren[i], nextChild, dom, lifecycle, context, isSVG, isRecycling);
    }
    if (lastChildrenLength < nextChildrenLength) {
        for (i = commonLength; i < nextChildrenLength; i++) {
            var nextChild = nextChildren[i];
            if (nextChild.dom) {
                nextChild = nextChildren[i] = VNodes.directClone(nextChild);
            }
            utils.appendChild(dom, mounting.mount(nextChild, null, lifecycle, context, isSVG));
        }
    }
    else if (nextChildrenLength === 0) {
        utils.removeAllChildren(dom, lastChildren, lifecycle, isRecycling);
    }
    else if (lastChildrenLength > nextChildrenLength) {
        for (i = commonLength; i < lastChildrenLength; i++) {
            unmounting.unmount(lastChildren[i], dom, lifecycle, false, isRecycling);
        }
    }
}
exports.patchNonKeyedChildren = patchNonKeyedChildren;
function patchKeyedChildren(a, b, dom, lifecycle, context, isSVG, isRecycling) {
    var aLength = a.length;
    var bLength = b.length;
    var aEnd = aLength - 1;
    var bEnd = bLength - 1;
    var aStart = 0;
    var bStart = 0;
    var i;
    var j;
    var aNode;
    var bNode;
    var nextNode;
    var nextPos;
    var node;
    if (aLength === 0) {
        if (bLength !== 0) {
            mounting.mountArrayChildren(b, dom, lifecycle, context, isSVG);
        }
        return;
    }
    else if (bLength === 0) {
        utils.removeAllChildren(dom, a, lifecycle, isRecycling);
        return;
    }
    var aStartNode = a[aStart];
    var bStartNode = b[bStart];
    var aEndNode = a[aEnd];
    var bEndNode = b[bEnd];
    if (bStartNode.dom) {
        b[bStart] = bStartNode = VNodes.directClone(bStartNode);
    }
    if (bEndNode.dom) {
        b[bEnd] = bEndNode = VNodes.directClone(bEndNode);
    }
    // Step 1
    /* eslint no-constant-condition: 0 */
    outer: while (true) {
        // Sync nodes with the same key at the beginning.
        while (aStartNode.key === bStartNode.key) {
            patch(aStartNode, bStartNode, dom, lifecycle, context, isSVG, isRecycling);
            aStart++;
            bStart++;
            if (aStart > aEnd || bStart > bEnd) {
                break outer;
            }
            aStartNode = a[aStart];
            bStartNode = b[bStart];
            if (bStartNode.dom) {
                b[bStart] = bStartNode = VNodes.directClone(bStartNode);
            }
        }
        // Sync nodes with the same key at the end.
        while (aEndNode.key === bEndNode.key) {
            patch(aEndNode, bEndNode, dom, lifecycle, context, isSVG, isRecycling);
            aEnd--;
            bEnd--;
            if (aStart > aEnd || bStart > bEnd) {
                break outer;
            }
            aEndNode = a[aEnd];
            bEndNode = b[bEnd];
            if (bEndNode.dom) {
                b[bEnd] = bEndNode = VNodes.directClone(bEndNode);
            }
        }
        // Move and sync nodes from right to left.
        if (aEndNode.key === bStartNode.key) {
            patch(aEndNode, bStartNode, dom, lifecycle, context, isSVG, isRecycling);
            utils.insertOrAppend(dom, bStartNode.dom, aStartNode.dom);
            aEnd--;
            bStart++;
            aEndNode = a[aEnd];
            bStartNode = b[bStart];
            if (bStartNode.dom) {
                b[bStart] = bStartNode = VNodes.directClone(bStartNode);
            }
            continue;
        }
        // Move and sync nodes from left to right.
        if (aStartNode.key === bEndNode.key) {
            patch(aStartNode, bEndNode, dom, lifecycle, context, isSVG, isRecycling);
            nextPos = bEnd + 1;
            nextNode = nextPos < b.length ? b[nextPos].dom : null;
            utils.insertOrAppend(dom, bEndNode.dom, nextNode);
            aStart++;
            bEnd--;
            aStartNode = a[aStart];
            bEndNode = b[bEnd];
            if (bEndNode.dom) {
                b[bEnd] = bEndNode = VNodes.directClone(bEndNode);
            }
            continue;
        }
        break;
    }
    if (aStart > aEnd) {
        if (bStart <= bEnd) {
            nextPos = bEnd + 1;
            nextNode = nextPos < b.length ? b[nextPos].dom : null;
            while (bStart <= bEnd) {
                node = b[bStart];
                if (node.dom) {
                    b[bStart] = node = VNodes.directClone(node);
                }
                bStart++;
                utils.insertOrAppend(dom, mounting.mount(node, null, lifecycle, context, isSVG), nextNode);
            }
        }
    }
    else if (bStart > bEnd) {
        while (aStart <= aEnd) {
            unmounting.unmount(a[aStart++], dom, lifecycle, false, isRecycling);
        }
    }
    else {
        aLength = aEnd - aStart + 1;
        bLength = bEnd - bStart + 1;
        var sources = new Array(bLength);
        // Mark all nodes as inserted.
        for (i = 0; i < bLength; i++) {
            sources[i] = -1;
        }
        var moved = false;
        var pos = 0;
        var patched = 0;
        // When sizes are small, just loop them through
        if ((bLength <= 4) || (aLength * bLength <= 16)) {
            for (i = aStart; i <= aEnd; i++) {
                aNode = a[i];
                if (patched < bLength) {
                    for (j = bStart; j <= bEnd; j++) {
                        bNode = b[j];
                        if (aNode.key === bNode.key) {
                            sources[j - bStart] = i;
                            if (pos > j) {
                                moved = true;
                            }
                            else {
                                pos = j;
                            }
                            if (bNode.dom) {
                                b[j] = bNode = VNodes.directClone(bNode);
                            }
                            patch(aNode, bNode, dom, lifecycle, context, isSVG, isRecycling);
                            patched++;
                            a[i] = null;
                            break;
                        }
                    }
                }
            }
        }
        else {
            var keyIndex = new Map();
            // Map keys by their index in array
            for (i = bStart; i <= bEnd; i++) {
                keyIndex.set(b[i].key, i);
            }
            // Try to patch same keys
            for (i = aStart; i <= aEnd; i++) {
                aNode = a[i];
                if (patched < bLength) {
                    j = keyIndex.get(aNode.key);
                    if (!index$3.isUndefined(j)) {
                        bNode = b[j];
                        sources[j - bStart] = i;
                        if (pos > j) {
                            moved = true;
                        }
                        else {
                            pos = j;
                        }
                        if (bNode.dom) {
                            b[j] = bNode = VNodes.directClone(bNode);
                        }
                        patch(aNode, bNode, dom, lifecycle, context, isSVG, isRecycling);
                        patched++;
                        a[i] = null;
                    }
                }
            }
        }
        // fast-path: if nothing patched remove all old and add all new
        if (aLength === a.length && patched === 0) {
            utils.removeAllChildren(dom, a, lifecycle, isRecycling);
            while (bStart < bLength) {
                node = b[bStart];
                if (node.dom) {
                    b[bStart] = node = VNodes.directClone(node);
                }
                bStart++;
                utils.insertOrAppend(dom, mounting.mount(node, null, lifecycle, context, isSVG), null);
            }
        }
        else {
            i = aLength - patched;
            while (i > 0) {
                aNode = a[aStart++];
                if (!index$3.isNull(aNode)) {
                    unmounting.unmount(aNode, dom, lifecycle, true, isRecycling);
                    i--;
                }
            }
            if (moved) {
                var seq = lis_algorithm(sources);
                j = seq.length - 1;
                for (i = bLength - 1; i >= 0; i--) {
                    if (sources[i] === -1) {
                        pos = i + bStart;
                        node = b[pos];
                        if (node.dom) {
                            b[pos] = node = VNodes.directClone(node);
                        }
                        nextPos = pos + 1;
                        nextNode = nextPos < b.length ? b[nextPos].dom : null;
                        utils.insertOrAppend(dom, mounting.mount(node, dom, lifecycle, context, isSVG), nextNode);
                    }
                    else {
                        if (j < 0 || i !== seq[j]) {
                            pos = i + bStart;
                            node = b[pos];
                            nextPos = pos + 1;
                            nextNode = nextPos < b.length ? b[nextPos].dom : null;
                            utils.insertOrAppend(dom, node.dom, nextNode);
                        }
                        else {
                            j--;
                        }
                    }
                }
            }
            else if (patched !== bLength) {
                // when patched count doesn't match b length we need to insert those new ones
                // loop backwards so we can use insertBefore
                for (i = bLength - 1; i >= 0; i--) {
                    if (sources[i] === -1) {
                        pos = i + bStart;
                        node = b[pos];
                        if (node.dom) {
                            b[pos] = node = VNodes.directClone(node);
                        }
                        nextPos = pos + 1;
                        nextNode = nextPos < b.length ? b[nextPos].dom : null;
                        utils.insertOrAppend(dom, mounting.mount(node, null, lifecycle, context, isSVG), nextNode);
                    }
                }
            }
        }
    }
}
exports.patchKeyedChildren = patchKeyedChildren;
// // https://en.wikipedia.org/wiki/Longest_increasing_subsequence
function lis_algorithm(arr) {
    var p = arr.slice(0);
    var result = [0];
    var i;
    var j;
    var u;
    var v;
    var c;
    var len = arr.length;
    for (i = 0; i < len; i++) {
        var arrI = arr[i];
        if (arrI === -1) {
            continue;
        }
        j = result[result.length - 1];
        if (arr[j] < arrI) {
            p[i] = j;
            result.push(i);
            continue;
        }
        u = 0;
        v = result.length - 1;
        while (u < v) {
            c = ((u + v) / 2) | 0;
            if (arr[result[c]] < arrI) {
                u = c + 1;
            }
            else {
                v = c;
            }
        }
        if (arrI < arr[result[u]]) {
            if (u > 0) {
                p[i] = result[u - 1];
            }
            result[u] = i;
        }
    }
    u = result.length;
    v = result[u - 1];
    while (u-- > 0) {
        result[u] = v;
        v = p[v];
    }
    return result;
}
function isAttrAnEvent(attr) {
    return attr[0] === 'o' && attr[1] === 'n';
}
exports.isAttrAnEvent = isAttrAnEvent;
function patchProp(prop, lastValue, nextValue, dom, isSVG, hasControlledValue) {
    if (lastValue !== nextValue) {
        if (prop in constants.skipProps || (hasControlledValue && prop === 'value')) {
            return;
        }
        else if (prop in constants.booleanProps) {
            prop = prop === 'autoFocus' ? prop.toLowerCase() : prop;
            dom[prop] = !!nextValue;
        }
        else if (prop in constants.strictProps) {
            var value = index$3.isNullOrUndef(nextValue) ? '' : nextValue;
            if (dom[prop] !== value) {
                dom[prop] = value;
            }
        }
        else if (isAttrAnEvent(prop)) {
            patchEvent(prop, lastValue, nextValue, dom);
        }
        else if (index$3.isNullOrUndef(nextValue)) {
            dom.removeAttribute(prop);
        }
        else if (prop === 'style') {
            patchStyle(lastValue, nextValue, dom);
        }
        else if (prop === 'dangerouslySetInnerHTML') {
            var lastHtml = lastValue && lastValue.__html;
            var nextHtml = nextValue && nextValue.__html;
            if (lastHtml !== nextHtml) {
                if (!index$3.isNullOrUndef(nextHtml)) {
                    dom.innerHTML = nextHtml;
                }
            }
        }
        else {
            // We optimize for NS being boolean. Its 99.9% time false
            if (isSVG && prop in constants.namespaces) {
                // If we end up in this path we can read property again
                dom.setAttributeNS(constants.namespaces[prop], prop, nextValue);
            }
            else {
                dom.setAttribute(prop, nextValue);
            }
        }
    }
}
exports.patchProp = patchProp;
function patchEvent(name, lastValue, nextValue, dom) {
    if (lastValue !== nextValue) {
        if (name in constants.delegatedEvents) {
            delegation.handleEvent(name, lastValue, nextValue, dom);
        }
        else {
            var nameLowerCase = name.toLowerCase();
            var domEvent = dom[nameLowerCase];
            // if the function is wrapped, that means it's been controlled by a wrapper
            if (domEvent && domEvent.wrapped) {
                return;
            }
            if (!index$3.isFunction(nextValue) && !index$3.isNullOrUndef(nextValue)) {
                var linkEvent_1 = nextValue.event;
                if (linkEvent_1 && index$3.isFunction(linkEvent_1)) {
                    if (!dom._data) {
                        dom[nameLowerCase] = function (e) {
                            linkEvent_1(e.currentTarget._data, e);
                        };
                    }
                    dom._data = nextValue.data;
                }
                else {
                    if (process.env.NODE_ENV !== 'production') {
                        index$3.throwError("an event on a VNode \"" + name + "\". was not a function or a valid linkEvent.");
                    }
                    index$3.throwError();
                }
            }
            else {
                dom[nameLowerCase] = nextValue;
            }
        }
    }
}
exports.patchEvent = patchEvent;
// We are assuming here that we come from patchProp routine
// -nextAttrValue cannot be null or undefined
function patchStyle(lastAttrValue, nextAttrValue, dom) {
    var domStyle = dom.style;
    if (index$3.isString(nextAttrValue)) {
        domStyle.cssText = nextAttrValue;
        return;
    }
    for (var style in nextAttrValue) {
        // do not add a hasOwnProperty check here, it affects performance
        var value = nextAttrValue[style];
        if (!index$3.isNumber(value) || style in constants.isUnitlessNumber) {
            domStyle[style] = value;
        }
        else {
            domStyle[style] = value + 'px';
        }
    }
    if (!index$3.isNullOrUndef(lastAttrValue)) {
        for (var style in lastAttrValue) {
            if (index$3.isNullOrUndef(nextAttrValue[style])) {
                domStyle[style] = '';
            }
        }
    }
}
exports.patchStyle = patchStyle;
function removeProp(prop, lastValue, dom) {
    if (prop === 'value') {
        dom.value = '';
    }
    else if (prop === 'style') {
        dom.removeAttribute('style');
    }
    else if (isAttrAnEvent(prop)) {
        delegation.handleEvent(name, lastValue, null, dom);
    }
    else {
        dom.removeAttribute(prop);
    }
}
});

var mounting = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });








function mount(vNode, parentDom, lifecycle, context, isSVG) {
    var flags = vNode.flags;
    if (flags & 3970 /* Element */) {
        return mountElement(vNode, parentDom, lifecycle, context, isSVG);
    }
    else if (flags & 28 /* Component */) {
        return mountComponent(vNode, parentDom, lifecycle, context, isSVG, flags & 4 /* ComponentClass */);
    }
    else if (flags & 4096 /* Void */) {
        return mountVoid(vNode, parentDom);
    }
    else if (flags & 1 /* Text */) {
        return mountText(vNode, parentDom);
    }
    else {
        if (process.env.NODE_ENV !== 'production') {
            if (typeof vNode === 'object') {
                index$3.throwError("mount() received an object that's not a valid VNode, you should stringify it first. Object: \"" + JSON.stringify(vNode) + "\".");
            }
            else {
                index$3.throwError("mount() expects a valid VNode, instead it received an object with the type \"" + typeof vNode + "\".");
            }
        }
        index$3.throwError();
    }
}
exports.mount = mount;
function mountText(vNode, parentDom) {
    var dom = document.createTextNode(vNode.children);
    vNode.dom = dom;
    if (parentDom) {
        utils.appendChild(parentDom, dom);
    }
    return dom;
}
exports.mountText = mountText;
function mountVoid(vNode, parentDom) {
    var dom = document.createTextNode('');
    vNode.dom = dom;
    if (parentDom) {
        utils.appendChild(parentDom, dom);
    }
    return dom;
}
exports.mountVoid = mountVoid;
function mountElement(vNode, parentDom, lifecycle, context, isSVG) {
    if (options.default.recyclingEnabled) {
        var dom_1 = recycling.recycleElement(vNode, lifecycle, context, isSVG);
        if (!index$3.isNull(dom_1)) {
            if (!index$3.isNull(parentDom)) {
                utils.appendChild(parentDom, dom_1);
            }
            return dom_1;
        }
    }
    var flags = vNode.flags;
    if (isSVG || (flags & 128 /* SvgElement */)) {
        isSVG = true;
    }
    var dom = utils.documentCreateElement(vNode.type, isSVG);
    var children = vNode.children;
    var props = vNode.props;
    var className = vNode.className;
    var ref = vNode.ref;
    vNode.dom = dom;
    if (!index$3.isInvalid(children)) {
        if (index$3.isStringOrNumber(children)) {
            utils.setTextContent(dom, children);
        }
        else if (index$3.isArray(children)) {
            mountArrayChildren(children, dom, lifecycle, context, isSVG);
        }
        else if (VNodes.isVNode(children)) {
            mount(children, dom, lifecycle, context, isSVG);
        }
    }
    if (!index$3.isNull(props)) {
        var hasControlledValue = false;
        var isFormElement = (flags & 3584 /* FormElement */) > 0;
        if (isFormElement) {
            hasControlledValue = processElement_1.isControlledFormElement(props);
        }
        for (var prop in props) {
            // do not add a hasOwnProperty check here, it affects performance
            patching.patchProp(prop, null, props[prop], dom, isSVG, hasControlledValue);
        }
        if (isFormElement) {
            processElement_1.processElement(flags, vNode, dom, props, true, hasControlledValue);
        }
    }
    if (index$3.isNullOrUndef(className)) {
        dom.removeAttribute('class');
    }
    else {
        if (isSVG) {
            dom.setAttribute('class', className);
        }
        else {
            dom.className = className;
        }
    }
    if (!index$3.isNull(ref)) {
        mountRef(dom, ref, lifecycle);
    }
    if (!index$3.isNull(parentDom)) {
        utils.appendChild(parentDom, dom);
    }
    return dom;
}
exports.mountElement = mountElement;
function mountArrayChildren(children, dom, lifecycle, context, isSVG) {
    for (var i = 0, len = children.length; i < len; i++) {
        var child = children[i];
        // Verify can string/number be here. might cause de-opt. - Normalization takes care of it.
        if (!index$3.isInvalid(child)) {
            if (child.dom) {
                children[i] = child = VNodes.directClone(child);
            }
            mount(children[i], dom, lifecycle, context, isSVG);
        }
    }
}
exports.mountArrayChildren = mountArrayChildren;
function mountComponent(vNode, parentDom, lifecycle, context, isSVG, isClass) {
    if (options.default.recyclingEnabled) {
        var dom_2 = recycling.recycleComponent(vNode, lifecycle, context, isSVG);
        if (!index$3.isNull(dom_2)) {
            if (!index$3.isNull(parentDom)) {
                utils.appendChild(parentDom, dom_2);
            }
            return dom_2;
        }
    }
    var type = vNode.type;
    var props = vNode.props || utils.EMPTY_OBJ;
    var ref = vNode.ref;
    var dom;
    if (isClass) {
        var instance = utils.createClassComponentInstance(vNode, type, props, context, isSVG, lifecycle);
        var input = instance._lastInput;
        instance._vNode = vNode;
        vNode.dom = dom = mount(input, null, lifecycle, instance._childContext, isSVG);
        if (!index$3.isNull(parentDom)) {
            utils.appendChild(parentDom, dom);
        }
        mountClassComponentCallbacks(vNode, ref, instance, lifecycle);
        instance._updating = false;
        options.default.findDOMNodeEnabled && rendering.componentToDOMNodeMap.set(instance, dom);
    }
    else {
        var input = utils.createFunctionalComponentInput(vNode, type, props, context);
        vNode.dom = dom = mount(input, null, lifecycle, context, isSVG);
        vNode.children = input;
        mountFunctionalComponentCallbacks(ref, dom, lifecycle);
        if (!index$3.isNull(parentDom)) {
            utils.appendChild(parentDom, dom);
        }
    }
    return dom;
}
exports.mountComponent = mountComponent;
function mountClassComponentCallbacks(vNode, ref, instance, lifecycle) {
    if (ref) {
        if (index$3.isFunction(ref)) {
            ref(instance);
        }
        else {
            if (process.env.NODE_ENV !== 'production') {
                if (index$3.isStringOrNumber(ref)) {
                    index$3.throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
                }
                else if (index$3.isObject(ref) && (vNode.flags & 4 /* ComponentClass */)) {
                    index$3.throwError('functional component lifecycle events are not supported on ES2015 class components.');
                }
                else {
                    index$3.throwError("a bad value for \"ref\" was used on component: \"" + JSON.stringify(ref) + "\"");
                }
            }
            index$3.throwError();
        }
    }
    var hasDidMount = !index$3.isUndefined(instance.componentDidMount);
    var afterMount = options.default.afterMount;
    if (hasDidMount || !index$3.isNull(afterMount)) {
        lifecycle.addListener(function () {
            instance._updating = true;
            if (afterMount) {
                afterMount(vNode);
            }
            if (hasDidMount) {
                instance.componentDidMount();
            }
            instance._updating = false;
        });
    }
}
exports.mountClassComponentCallbacks = mountClassComponentCallbacks;
function mountFunctionalComponentCallbacks(ref, dom, lifecycle) {
    if (ref) {
        if (!index$3.isNullOrUndef(ref.onComponentWillMount)) {
            ref.onComponentWillMount();
        }
        if (!index$3.isNullOrUndef(ref.onComponentDidMount)) {
            lifecycle.addListener(function () { return ref.onComponentDidMount(dom); });
        }
    }
}
exports.mountFunctionalComponentCallbacks = mountFunctionalComponentCallbacks;
function mountRef(dom, value, lifecycle) {
    if (index$3.isFunction(value)) {
        lifecycle.addListener(function () { return value(dom); });
    }
    else {
        if (index$3.isInvalid(value)) {
            return;
        }
        if (process.env.NODE_ENV !== 'production') {
            index$3.throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
        }
        index$3.throwError();
    }
}
exports.mountRef = mountRef;
});

var utils = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });








// We need EMPTY_OBJ defined in one place.
// Its used for comparison so we cant inline it into shared
exports.EMPTY_OBJ = {};
if (process.env.NODE_ENV !== 'production') {
    Object.freeze(exports.EMPTY_OBJ);
}
function createClassComponentInstance(vNode, Component, props, context, isSVG, lifecycle) {
    if (index$3.isUndefined(context)) {
        context = exports.EMPTY_OBJ; // Context should not be mutable
    }
    var instance = new Component(props, context);
    vNode.children = instance;
    instance._blockSetState = false;
    instance.context = context;
    if (instance.props === exports.EMPTY_OBJ) {
        instance.props = props;
    }
    instance._patch = patching.patch;
    if (options.default.findDOMNodeEnabled) {
        instance._componentToDOMNodeMap = rendering.componentToDOMNodeMap;
    }
    // setState callbacks must fire after render is done when called from componentWillReceiveProps or componentWillMount
    instance._lifecycle = lifecycle;
    instance._unmounted = false;
    instance._pendingSetState = true;
    instance._isSVG = isSVG;
    if (!index$3.isUndefined(instance.componentWillMount)) {
        instance._blockRender = true;
        instance.componentWillMount();
        instance._blockRender = false;
    }
    var childContext;
    if (!index$3.isUndefined(instance.getChildContext)) {
        childContext = instance.getChildContext();
    }
    if (index$3.isNullOrUndef(childContext)) {
        instance._childContext = context;
    }
    else {
        instance._childContext = index$3.combineFrom(context, childContext);
    }
    options.default.beforeRender && options.default.beforeRender(instance);
    var input = instance.render(props, instance.state, context);
    options.default.afterRender && options.default.afterRender(instance);
    if (index$3.isArray(input)) {
        if (process.env.NODE_ENV !== 'production') {
            index$3.throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
        }
        index$3.throwError();
    }
    else if (index$3.isInvalid(input)) {
        input = VNodes.createVoidVNode();
    }
    else if (index$3.isStringOrNumber(input)) {
        input = VNodes.createTextVNode(input, null);
    }
    else {
        if (input.dom) {
            input = VNodes.directClone(input);
        }
        if (input.flags & 28 /* Component */) {
            // if we have an input that is also a component, we run into a tricky situation
            // where the root vNode needs to always have the correct DOM entry
            // so we break monomorphism on our input and supply it our vNode as parentVNode
            // we can optimise this in the future, but this gets us out of a lot of issues
            input.parentVNode = vNode;
        }
    }
    instance._pendingSetState = false;
    instance._lastInput = input;
    return instance;
}
exports.createClassComponentInstance = createClassComponentInstance;
function replaceLastChildAndUnmount(lastInput, nextInput, parentDom, lifecycle, context, isSVG, isRecycling) {
    replaceVNode(parentDom, mounting.mount(nextInput, null, lifecycle, context, isSVG), lastInput, lifecycle, isRecycling);
}
exports.replaceLastChildAndUnmount = replaceLastChildAndUnmount;
function replaceVNode(parentDom, dom, vNode, lifecycle, isRecycling) {
    unmounting.unmount(vNode, null, lifecycle, false, isRecycling);
    replaceChild(parentDom, dom, vNode.dom);
}
exports.replaceVNode = replaceVNode;
function createFunctionalComponentInput(vNode, component, props, context) {
    var input = component(props, context);
    if (index$3.isArray(input)) {
        if (process.env.NODE_ENV !== 'production') {
            index$3.throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
        }
        index$3.throwError();
    }
    else if (index$3.isInvalid(input)) {
        input = VNodes.createVoidVNode();
    }
    else if (index$3.isStringOrNumber(input)) {
        input = VNodes.createTextVNode(input, null);
    }
    else {
        if (input.dom) {
            input = VNodes.directClone(input);
        }
        if (input.flags & 28 /* Component */) {
            // if we have an input that is also a component, we run into a tricky situation
            // where the root vNode needs to always have the correct DOM entry
            // so we break monomorphism on our input and supply it our vNode as parentVNode
            // we can optimise this in the future, but this gets us out of a lot of issues
            input.parentVNode = vNode;
        }
    }
    return input;
}
exports.createFunctionalComponentInput = createFunctionalComponentInput;
function setTextContent(dom, text) {
    if (text !== '') {
        dom.textContent = text;
    }
    else {
        dom.appendChild(document.createTextNode(''));
    }
}
exports.setTextContent = setTextContent;
function updateTextContent(dom, text) {
    dom.firstChild.nodeValue = text;
}
exports.updateTextContent = updateTextContent;
function appendChild(parentDom, dom) {
    parentDom.appendChild(dom);
}
exports.appendChild = appendChild;
function insertOrAppend(parentDom, newNode, nextNode) {
    if (index$3.isNullOrUndef(nextNode)) {
        appendChild(parentDom, newNode);
    }
    else {
        parentDom.insertBefore(newNode, nextNode);
    }
}
exports.insertOrAppend = insertOrAppend;
function documentCreateElement(tag, isSVG) {
    if (isSVG === true) {
        return document.createElementNS(constants.svgNS, tag);
    }
    else {
        return document.createElement(tag);
    }
}
exports.documentCreateElement = documentCreateElement;
function replaceWithNewNode(lastNode, nextNode, parentDom, lifecycle, context, isSVG, isRecycling) {
    unmounting.unmount(lastNode, null, lifecycle, false, isRecycling);
    var dom = mounting.mount(nextNode, null, lifecycle, context, isSVG);
    nextNode.dom = dom;
    replaceChild(parentDom, dom, lastNode.dom);
}
exports.replaceWithNewNode = replaceWithNewNode;
function replaceChild(parentDom, nextDom, lastDom) {
    if (!parentDom) {
        parentDom = lastDom.parentNode;
    }
    parentDom.replaceChild(nextDom, lastDom);
}
exports.replaceChild = replaceChild;
function removeChild(parentDom, dom) {
    parentDom.removeChild(dom);
}
exports.removeChild = removeChild;
function removeAllChildren(dom, children, lifecycle, isRecycling) {
    dom.textContent = '';
    if (!options.default.recyclingEnabled || (options.default.recyclingEnabled && !isRecycling)) {
        removeChildren(null, children, lifecycle, isRecycling);
    }
}
exports.removeAllChildren = removeAllChildren;
function removeChildren(dom, children, lifecycle, isRecycling) {
    for (var i = 0, len = children.length; i < len; i++) {
        var child = children[i];
        if (!index$3.isInvalid(child)) {
            unmounting.unmount(child, dom, lifecycle, true, isRecycling);
        }
    }
}
exports.removeChildren = removeChildren;
function isKeyed(lastChildren, nextChildren) {
    return nextChildren.length && !index$3.isNullOrUndef(nextChildren[0]) && !index$3.isNullOrUndef(nextChildren[0].key)
        && lastChildren.length && !index$3.isNullOrUndef(lastChildren[0]) && !index$3.isNullOrUndef(lastChildren[0].key);
}
exports.isKeyed = isKeyed;
});

var normalization = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


function applyKey(key, vNode) {
    vNode.key = key;
    return vNode;
}
function applyKeyIfMissing(key, vNode) {
    if (index$3.isNumber(key)) {
        key = "." + key;
    }
    if (index$3.isNull(vNode.key) || vNode.key[0] === '.') {
        return applyKey(key, vNode);
    }
    return vNode;
}
function applyKeyPrefix(key, vNode) {
    vNode.key = key + vNode.key;
    return vNode;
}
function _normalizeVNodes(nodes, result, index, currentKey) {
    for (var len = nodes.length; index < len; index++) {
        var n = nodes[index];
        var key = currentKey + "." + index;
        if (!index$3.isInvalid(n)) {
            if (index$3.isArray(n)) {
                _normalizeVNodes(n, result, 0, key);
            }
            else {
                if (index$3.isStringOrNumber(n)) {
                    n = VNodes.createTextVNode(n, null);
                }
                else if (VNodes.isVNode(n) && n.dom || (n.key && n.key[0] === '.')) {
                    n = VNodes.directClone(n);
                }
                if (index$3.isNull(n.key) || n.key[0] === '.') {
                    n = applyKey(key, n);
                }
                else {
                    n = applyKeyPrefix(currentKey, n);
                }
                result.push(n);
            }
        }
    }
}
function normalizeVNodes(nodes) {
    var newNodes;
    // we assign $ which basically means we've flagged this array for future note
    // if it comes back again, we need to clone it, as people are using it
    // in an immutable way
    // tslint:disable
    if (nodes['$']) {
        nodes = nodes.slice();
    }
    else {
        nodes['$'] = true;
    }
    // tslint:enable
    for (var i = 0, len = nodes.length; i < len; i++) {
        var n = nodes[i];
        if (index$3.isInvalid(n) || index$3.isArray(n)) {
            var result = (newNodes || nodes).slice(0, i);
            _normalizeVNodes(nodes, result, i, "");
            return result;
        }
        else if (index$3.isStringOrNumber(n)) {
            if (!newNodes) {
                newNodes = nodes.slice(0, i);
            }
            newNodes.push(applyKeyIfMissing(i, VNodes.createTextVNode(n, null)));
        }
        else if ((VNodes.isVNode(n) && n.dom) || (index$3.isNull(n.key) && !(n.flags & 64 /* HasNonKeyedChildren */))) {
            if (!newNodes) {
                newNodes = nodes.slice(0, i);
            }
            newNodes.push(applyKeyIfMissing(i, VNodes.directClone(n)));
        }
        else if (newNodes) {
            newNodes.push(applyKeyIfMissing(i, VNodes.directClone(n)));
        }
    }
    return newNodes || nodes;
}
exports.normalizeVNodes = normalizeVNodes;
function normalizeChildren(children) {
    if (index$3.isArray(children)) {
        return normalizeVNodes(children);
    }
    else if (VNodes.isVNode(children) && children.dom) {
        return VNodes.directClone(children);
    }
    return children;
}
function normalizeProps(vNode, props, children) {
    if (!(vNode.flags & 28 /* Component */)) {
        if (index$3.isNullOrUndef(children) && !index$3.isNullOrUndef(props.children)) {
            vNode.children = props.children;
        }
        if (props.className) {
            vNode.className = props.className;
            delete props.className;
        }
    }
    if (props.ref) {
        vNode.ref = props.ref;
        delete props.ref;
    }
    if (!index$3.isNullOrUndef(props.key)) {
        vNode.key = props.key;
        delete props.key;
    }
}
function normalizeElement(type, vNode) {
    if (type === 'svg') {
        vNode.flags = 128 /* SvgElement */;
    }
    else if (type === 'input') {
        vNode.flags = 512 /* InputElement */;
    }
    else if (type === 'select') {
        vNode.flags = 2048 /* SelectElement */;
    }
    else if (type === 'textarea') {
        vNode.flags = 1024 /* TextareaElement */;
    }
    else if (type === 'media') {
        vNode.flags = 256 /* MediaElement */;
    }
    else {
        vNode.flags = 2 /* HtmlElement */;
    }
}
function normalize(vNode) {
    var props = vNode.props;
    var children = vNode.children;
    // convert a wrongly created type back to element
    // Primitive node doesn't have defaultProps, only Component
    if (vNode.flags & 28 /* Component */) {
        // set default props
        var type = vNode.type;
        var defaultProps = type.defaultProps;
        if (!index$3.isNullOrUndef(defaultProps)) {
            if (!props) {
                props = vNode.props = defaultProps; // Create new object if only defaultProps given
            }
            else {
                for (var prop in defaultProps) {
                    if (index$3.isUndefined(props[prop])) {
                        props[prop] = defaultProps[prop];
                    }
                }
            }
        }
        if (index$3.isString(type)) {
            normalizeElement(type, vNode);
            if (props && props.children) {
                vNode.children = props.children;
                children = props.children;
            }
        }
    }
    if (props) {
        normalizeProps(vNode, props, children);
    }
    if (!index$3.isInvalid(children)) {
        vNode.children = normalizeChildren(children);
    }
    if (props && !index$3.isInvalid(props.children)) {
        props.children = normalizeChildren(props.children);
    }
    if (process.env.NODE_ENV !== 'production') {
        // This code will be stripped out from production CODE
        // It will help users to track errors in their applications.
        var verifyKeys = function (vNodes) {
            var keyValues = vNodes.map(function (vnode) {
                return vnode.key;
            });
            keyValues.some(function (item, idx) {
                var hasDuplicate = keyValues.indexOf(item) !== idx;
                if (hasDuplicate) {
                    index$3.warning('Inferno normalisation(...): Encountered two children with same key, all keys must be unique within its siblings. Duplicated key is:' + item);
                }
                return hasDuplicate;
            });
        };
        if (vNode.children && Array.isArray(vNode.children)) {
            verifyKeys(vNode.children);
        }
    }
}
exports.normalize = normalize;
});

var VNodes = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });




/**
 * Creates virtual node
 * @param {number} flags
 * @param {string|Function|null} type
 * @param {string|null=} className
 * @param {object=} children
 * @param {object=} props
 * @param {*=} key
 * @param {object|Function=} ref
 * @param {boolean=} noNormalise
 * @returns {VNode} returns new virtual node
 */
function createVNode(flags, type, className, children, props, key, ref, noNormalise) {
    if (flags & 16 /* ComponentUnknown */) {
        flags = index$3.isStatefulComponent(type) ? 4 /* ComponentClass */ : 8 /* ComponentFunction */;
    }
    var vNode = {
        children: index$3.isUndefined(children) ? null : children,
        className: className,
        dom: null,
        flags: flags,
        key: index$3.isUndefined(key) ? null : key,
        props: props || null,
        ref: ref || null,
        type: type
    };
    if (!noNormalise) {
        normalization.normalize(vNode);
    }
    if (options.default.createVNode) {
        options.default.createVNode(vNode);
    }
    return vNode;
}
exports.createVNode = createVNode;
function directClone(vNodeToClone) {
    var newVNode;
    var flags = vNodeToClone.flags;
    if (flags & 28 /* Component */) {
        var props = void 0;
        var propsToClone = vNodeToClone.props;
        if (!propsToClone) {
            props = utils.EMPTY_OBJ;
        }
        else {
            props = {};
            for (var key in propsToClone) {
                props[key] = propsToClone[key];
            }
        }
        newVNode = createVNode(flags, vNodeToClone.type, vNodeToClone.className, null, props, vNodeToClone.key, vNodeToClone.ref, true);
        var newProps = newVNode.props;
        if (newProps) {
            var newChildren = newProps.children;
            // we need to also clone component children that are in props
            // as the children may also have been hoisted
            if (newChildren) {
                if (index$3.isArray(newChildren)) {
                    var len = newChildren.length;
                    if (len > 0) {
                        var tmpArray = [];
                        for (var i = 0; i < len; i++) {
                            var child = newChildren[i];
                            if (index$3.isStringOrNumber(child)) {
                                tmpArray.push(child);
                            }
                            else if (!index$3.isInvalid(child) && isVNode(child)) {
                                tmpArray.push(directClone(child));
                            }
                        }
                        newProps.children = tmpArray;
                    }
                }
                else if (isVNode(newChildren)) {
                    newProps.children = directClone(newChildren);
                }
            }
        }
        newVNode.children = null;
    }
    else if (flags & 3970 /* Element */) {
        var children = vNodeToClone.children;
        var props = void 0;
        var propsToClone = vNodeToClone.props;
        if (!propsToClone) {
            props = utils.EMPTY_OBJ;
        }
        else {
            props = {};
            for (var key in propsToClone) {
                props[key] = propsToClone[key];
            }
        }
        newVNode = createVNode(flags, vNodeToClone.type, vNodeToClone.className, children, props, vNodeToClone.key, vNodeToClone.ref, !children);
    }
    else if (flags & 1 /* Text */) {
        newVNode = createTextVNode(vNodeToClone.children, vNodeToClone.key);
    }
    return newVNode;
}
exports.directClone = directClone;
/*
 directClone is preferred over cloneVNode and used internally also.
 This function makes Inferno backwards compatible.
 And can be tree-shaked by modern bundlers

 Would be nice to combine this with directClone but could not do it without breaking change
 */
/**
 * Clones given virtual node by creating new instance of it
 * @param {VNode} vNodeToClone virtual node to be cloned
 * @param {Props=} props additional props for new virtual node
 * @param {...*} _children new children for new virtual node
 * @returns {VNode} new virtual node
 */
function cloneVNode(vNodeToClone, props) {
    var _children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        _children[_i - 2] = arguments[_i];
    }
    var children = _children;
    var childrenLen = _children.length;
    if (childrenLen > 0 && !index$3.isUndefined(_children[0])) {
        if (!props) {
            props = {};
        }
        if (childrenLen === 1) {
            children = _children[0];
        }
        if (!index$3.isUndefined(children)) {
            props.children = children;
        }
    }
    var newVNode;
    if (index$3.isArray(vNodeToClone)) {
        var tmpArray = [];
        for (var i = 0, len = vNodeToClone.length; i < len; i++) {
            tmpArray.push(directClone(vNodeToClone[i]));
        }
        newVNode = tmpArray;
    }
    else {
        var flags = vNodeToClone.flags;
        var className = vNodeToClone.className || (props && props.className) || null;
        var key = !index$3.isNullOrUndef(vNodeToClone.key) ? vNodeToClone.key : (props ? props.key : null);
        var ref = vNodeToClone.ref || (props ? props.ref : null);
        if (flags & 28 /* Component */) {
            newVNode = createVNode(flags, vNodeToClone.type, className, null, (!vNodeToClone.props && !props) ? utils.EMPTY_OBJ : index$3.combineFrom(vNodeToClone.props, props), key, ref, true);
            var newProps = newVNode.props;
            if (newProps) {
                var newChildren = newProps.children;
                // we need to also clone component children that are in props
                // as the children may also have been hoisted
                if (newChildren) {
                    if (index$3.isArray(newChildren)) {
                        var len = newChildren.length;
                        if (len > 0) {
                            var tmpArray = [];
                            for (var i = 0; i < len; i++) {
                                var child = newChildren[i];
                                if (index$3.isStringOrNumber(child)) {
                                    tmpArray.push(child);
                                }
                                else if (!index$3.isInvalid(child) && isVNode(child)) {
                                    tmpArray.push(directClone(child));
                                }
                            }
                            newProps.children = tmpArray;
                        }
                    }
                    else if (isVNode(newChildren)) {
                        newProps.children = directClone(newChildren);
                    }
                }
            }
            newVNode.children = null;
        }
        else if (flags & 3970 /* Element */) {
            children = (props && !index$3.isUndefined(props.children)) ? props.children : vNodeToClone.children;
            newVNode = createVNode(flags, vNodeToClone.type, className, children, (!vNodeToClone.props && !props) ? utils.EMPTY_OBJ : index$3.combineFrom(vNodeToClone.props, props), key, ref, !children);
        }
        else if (flags & 1 /* Text */) {
            newVNode = createTextVNode(vNodeToClone.children, key);
        }
    }
    return newVNode;
}
exports.cloneVNode = cloneVNode;
function createVoidVNode() {
    return createVNode(4096 /* Void */, null);
}
exports.createVoidVNode = createVoidVNode;
function createTextVNode(text, key) {
    return createVNode(1 /* Text */, null, null, text, null, key);
}
exports.createTextVNode = createTextVNode;
function isVNode(o) {
    return !!o.flags;
}
exports.isVNode = isVNode;
});

var linkEvent_1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Links given data to event as first parameter
 * @param {*} data data to be linked, it will be available in function as first parameter
 * @param {Function} event Function to be called when event occurs
 * @returns {{data: *, event: Function}}
 */
function linkEvent(data, event) {
    return { data: data, event: event };
}
exports.default = linkEvent;
});

var index$1 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

exports.NO_OP = index$3.NO_OP;

exports.options = options.default;

exports.cloneVNode = VNodes.cloneVNode;
exports.createVNode = VNodes.createVNode;

exports.linkEvent = linkEvent_1.default;

exports.createRenderer = rendering.createRenderer;
exports.findDOMNode = rendering.findDOMNode;
exports.render = rendering.render;

exports.EMPTY_OBJ = utils.EMPTY_OBJ;
if (process.env.NODE_ENV !== 'production') {
    var testFunc = function testFn() {
    };
    if ((testFunc.name || testFunc.toString()).indexOf('testFn') === -1) {
        index$3.warning(('It looks like you\'re using a minified copy of the development build ' +
            'of Inferno. When deploying Inferno apps to production, make sure to use ' +
            'the production build which skips development warnings and is faster. ' +
            'See http://infernojs.org for more details.'));
    }
}
exports.version = '1.6.2';
// we duplicate it so it plays nicely with different module loading systems
exports.default = {
    linkEvent: linkEvent_1.default,
    // core shapes
    createVNode: VNodes.createVNode,
    // cloning
    cloneVNode: VNodes.cloneVNode,
    // used to shared common items between Inferno libs
    NO_OP: index$3.NO_OP,
    EMPTY_OBJ: utils.EMPTY_OBJ,
    // DOM
    render: rendering.render,
    findDOMNode: rendering.findDOMNode,
    createRenderer: rendering.createRenderer,
    options: options.default,
    version: exports.version
};
// Internal stuff that only core inferno-* packages use

exports.internal_isUnitlessNumber = constants.isUnitlessNumber;
// Mainly for testing

exports.internal_normalize = normalization.normalize;
});

var index = createCommonjsModule(function (module) {
module.exports = index$1.default;
module.exports.default = module.exports;
});

var index$8 = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Make sure u use EMPTY_OBJ from 'inferno', otherwise it'll be a different reference


var noOp = index$3.ERROR_MSG;
if (process.env.NODE_ENV !== 'production') {
    noOp = 'Inferno Error: Can only update a mounted or mounting component. This usually means you called setState() or forceUpdate() on an unmounted component. This is a no-op.';
}
var componentCallbackQueue = new Map();
// when a components root VNode is also a component, we can run into issues
// this will recursively look for vNode.parentNode if the VNode is a component
function updateParentComponentVNodes(vNode, dom) {
    if (vNode.flags & 28 /* Component */) {
        var parentVNode = vNode.parentVNode;
        if (parentVNode) {
            parentVNode.dom = dom;
            updateParentComponentVNodes(parentVNode, dom);
        }
    }
}
var resolvedPromise = Promise.resolve();
function addToQueue(component, force, callback) {
    // TODO this function needs to be revised and improved on
    var queue = componentCallbackQueue.get(component);
    if (!queue) {
        queue = [];
        componentCallbackQueue.set(component, queue);
        resolvedPromise.then(function () {
            componentCallbackQueue.delete(component);
            component._updating = true;
            applyState(component, force, function () {
                for (var i = 0, len = queue.length; i < len; i++) {
                    queue[i]();
                }
            });
            component._updating = false;
        });
    }
    if (callback) {
        queue.push(callback);
    }
}
function queueStateChanges(component, newState, callback) {
    if (index$3.isFunction(newState)) {
        newState = newState(component.state, component.props, component.context);
    }
    var pending = component._pendingState;
    if (pending === null) {
        component._pendingState = pending = newState;
    }
    else {
        for (var stateKey in newState) {
            pending[stateKey] = newState[stateKey];
        }
    }
    if (index$3.isBrowser && !component._pendingSetState && !component._blockRender) {
        if (!component._updating) {
            component._pendingSetState = true;
            component._updating = true;
            applyState(component, false, callback);
            component._updating = false;
        }
        else {
            addToQueue(component, false, callback);
        }
    }
    else {
        var state = component.state;
        if (state === null) {
            component.state = pending;
        }
        else {
            for (var key in pending) {
                state[key] = pending[key];
            }
        }
        component._pendingState = null;
        if (callback && component._blockRender) {
            component._lifecycle.addListener(callback.bind(component));
        }
    }
}
function applyState(component, force, callback) {
    if (component._unmounted) {
        return;
    }
    if (force || !component._blockRender) {
        component._pendingSetState = false;
        var pendingState = component._pendingState;
        var prevState = component.state;
        var nextState = index$3.combineFrom(prevState, pendingState);
        var props = component.props;
        var context_1 = component.context;
        component._pendingState = null;
        var nextInput = component._updateComponent(prevState, nextState, props, props, context_1, force, true);
        var didUpdate = true;
        if (index$3.isInvalid(nextInput)) {
            nextInput = index.createVNode(4096 /* Void */, null);
        }
        else if (nextInput === index$3.NO_OP) {
            nextInput = component._lastInput;
            didUpdate = false;
        }
        else if (index$3.isStringOrNumber(nextInput)) {
            nextInput = index.createVNode(1 /* Text */, null, null, nextInput);
        }
        else if (index$3.isArray(nextInput)) {
            if (process.env.NODE_ENV !== 'production') {
                index$3.throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
            }
            index$3.throwError();
        }
        var lastInput = component._lastInput;
        var vNode = component._vNode;
        var parentDom = (lastInput.dom && lastInput.dom.parentNode) || (lastInput.dom = vNode.dom);
        component._lastInput = nextInput;
        if (didUpdate) {
            var childContext = void 0;
            if (!index$3.isUndefined(component.getChildContext)) {
                childContext = component.getChildContext();
            }
            if (index$3.isNullOrUndef(childContext)) {
                childContext = component._childContext;
            }
            else {
                childContext = index$3.combineFrom(context_1, childContext);
            }
            var lifeCycle = component._lifecycle;
            component._patch(lastInput, nextInput, parentDom, lifeCycle, childContext, component._isSVG, false);
            lifeCycle.trigger();
            if (!index$3.isUndefined(component.componentDidUpdate)) {
                component.componentDidUpdate(props, prevState, context_1);
            }
            index.options.afterUpdate && index.options.afterUpdate(vNode);
        }
        var dom = vNode.dom = nextInput.dom;
        var componentToDOMNodeMap = component._componentToDOMNodeMap;
        componentToDOMNodeMap && componentToDOMNodeMap.set(component, nextInput.dom);
        updateParentComponentVNodes(vNode, dom);
    }
    else {
        component.state = component._pendingState;
        component._pendingState = null;
    }
    if (!index$3.isNullOrUndef(callback)) {
        callback.call(component);
    }
}
var alreadyWarned = false;
var Component = (function () {
    function Component(props, context) {
        this.state = null;
        this._blockRender = false;
        this._blockSetState = true;
        this._pendingSetState = false;
        this._pendingState = null;
        this._lastInput = null;
        this._vNode = null;
        this._unmounted = false;
        this._lifecycle = null;
        this._childContext = null;
        this._patch = null;
        this._isSVG = false;
        this._componentToDOMNodeMap = null;
        this._updating = true;
        /** @type {object} */
        this.props = props || index.EMPTY_OBJ;
        /** @type {object} */
        this.context = context || index.EMPTY_OBJ; // context should not be mutable
    }
    Component.prototype.render = function (nextProps, nextState, nextContext) {
    };
    Component.prototype.forceUpdate = function (callback) {
        if (this._unmounted || !index$3.isBrowser) {
            return;
        }
        applyState(this, true, callback);
    };
    Component.prototype.setState = function (newState, callback) {
        if (this._unmounted) {
            return;
        }
        if (!this._blockSetState) {
            queueStateChanges(this, newState, callback);
        }
        else {
            if (process.env.NODE_ENV !== 'production') {
                index$3.throwError('cannot update state via setState() in componentWillUpdate() or constructor.');
            }
            index$3.throwError();
        }
    };
    Component.prototype.setStateSync = function (newState) {
        if (process.env.NODE_ENV !== 'production') {
            if (!alreadyWarned) {
                alreadyWarned = true;
                console.warn('Inferno WARNING: setStateSync has been deprecated and will be removed in next release. Use setState instead.');
            }
        }
        this.setState(newState);
    };
    Component.prototype._updateComponent = function (prevState, nextState, prevProps, nextProps, context, force, fromSetState) {
        if (this._unmounted === true) {
            if (process.env.NODE_ENV !== 'production') {
                index$3.throwError(noOp);
            }
            index$3.throwError();
        }
        if ((prevProps !== nextProps || nextProps === index.EMPTY_OBJ) || prevState !== nextState || force) {
            if (prevProps !== nextProps || nextProps === index.EMPTY_OBJ) {
                if (!index$3.isUndefined(this.componentWillReceiveProps) && !fromSetState) {
                    this._blockRender = true;
                    this.componentWillReceiveProps(nextProps, context);
                    this._blockRender = false;
                }
                if (this._pendingSetState) {
                    nextState = index$3.combineFrom(nextState, this._pendingState);
                    this._pendingSetState = false;
                    this._pendingState = null;
                }
            }
            /* Update if scu is not defined, or it returns truthy value or force */
            if (index$3.isUndefined(this.shouldComponentUpdate) || this.shouldComponentUpdate(nextProps, nextState, context) || force) {
                if (!index$3.isUndefined(this.componentWillUpdate)) {
                    this._blockSetState = true;
                    this.componentWillUpdate(nextProps, nextState, context);
                    this._blockSetState = false;
                }
                this.props = nextProps;
                this.state = nextState;
                this.context = context;
                if (index.options.beforeRender) {
                    index.options.beforeRender(this);
                }
                var render = this.render(nextProps, nextState, context);
                if (index.options.afterRender) {
                    index.options.afterRender(this);
                }
                return render;
            }
            else {
                this.props = nextProps;
                this.state = nextState;
                this.context = context;
            }
        }
        return index$3.NO_OP;
    };
    return Component;
}());
exports.default = Component;
});

var index$7 = createCommonjsModule(function (module) {
module.exports = index$8.default;
module.exports.default = module.exports;
});

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
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









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var createVNode$1 = index.createVNode;

var Root = function (_Component) {
  inherits(Root, _Component);

  function Root() {
    classCallCheck(this, Root);
    return possibleConstructorReturn(this, (Root.__proto__ || Object.getPrototypeOf(Root)).apply(this, arguments));
  }

  createClass(Root, [{
    key: 'render',
    value: function render() {

      var NODE_ENV = 'NODE_ENV';

      return createVNode$1(2, 'div', null, [createVNode$1(2, 'h1', null, 'Hello world!'), createVNode$1(2, 'code', null, ['Current ENV: ', NODE_ENV])]);
    }
  }]);
  return Root;
}(index$7);

___$insertStyle("body {\n  font-family: Helvetica, Arial, sans-serif; }\n  body h1 {\n    font-size: 24px; }\n  body code {\n    display: block; }\n");

var rootEl = document.getElementById('root');

var createVNode = index.createVNode;
index.render(createVNode(16, Root), rootEl);

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvcm9sbHVwLXBsdWdpbi1ub2RlLWdsb2JhbHMvc3JjL2dsb2JhbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9wcm9jZXNzLWVzNi9icm93c2VyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2luZmVybm8tc2hhcmVkL2Rpc3QvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvaW5mZXJuby1zaGFyZWQvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvaW5mZXJuby9kaXN0L2NvcmUvb3B0aW9ucy5qcyIsIi4uL25vZGVfbW9kdWxlcy9pbmZlcm5vL2Rpc3QvRE9NL2NvbnN0YW50cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9pbmZlcm5vL2Rpc3QvRE9NL2V2ZW50cy9kZWxlZ2F0aW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2luZmVybm8vZGlzdC9ET00vd3JhcHBlcnMvSW5wdXRXcmFwcGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2luZmVybm8vZGlzdC9ET00vd3JhcHBlcnMvU2VsZWN0V3JhcHBlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9pbmZlcm5vL2Rpc3QvRE9NL3dyYXBwZXJzL1RleHRhcmVhV3JhcHBlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9pbmZlcm5vL2Rpc3QvRE9NL3dyYXBwZXJzL3Byb2Nlc3NFbGVtZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2luZmVybm8vZGlzdC9ET00vaHlkcmF0aW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2luZmVybm8vZGlzdC9ET00vcmVjeWNsaW5nLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2luZmVybm8vZGlzdC9ET00vdW5tb3VudGluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9pbmZlcm5vL2Rpc3QvRE9NL3JlbmRlcmluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9pbmZlcm5vL2Rpc3QvRE9NL3BhdGNoaW5nLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2luZmVybm8vZGlzdC9ET00vbW91bnRpbmcuanMiLCIuLi9ub2RlX21vZHVsZXMvaW5mZXJuby9kaXN0L0RPTS91dGlscy5qcyIsIi4uL25vZGVfbW9kdWxlcy9pbmZlcm5vL2Rpc3QvY29yZS9ub3JtYWxpemF0aW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2luZmVybm8vZGlzdC9jb3JlL1ZOb2Rlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9pbmZlcm5vL2Rpc3QvRE9NL2V2ZW50cy9saW5rRXZlbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvaW5mZXJuby9kaXN0L2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2luZmVybm8vaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvaW5mZXJuby1jb21wb25lbnQvZGlzdC9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9pbmZlcm5vLWNvbXBvbmVudC9pbmRleC5qcyIsIi4uL3NyYy9yb290LmpzIiwiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOlxuICAgICAgICAgICAgdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDpcbiAgICAgICAgICAgIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fVxuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG4vLyBiYXNlZCBvZmYgaHR0cHM6Ly9naXRodWIuY29tL2RlZnVuY3R6b21iaWUvbm9kZS1wcm9jZXNzL2Jsb2IvbWFzdGVyL2Jyb3dzZXIuanNcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG52YXIgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbmlmICh0eXBlb2YgZ2xvYmFsLnNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbn1cbmlmICh0eXBlb2YgZ2xvYmFsLmNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbn1cblxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIG5leHRUaWNrKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59XG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xuZXhwb3J0IHZhciB0aXRsZSA9ICdicm93c2VyJztcbmV4cG9ydCB2YXIgcGxhdGZvcm0gPSAnYnJvd3Nlcic7XG5leHBvcnQgdmFyIGJyb3dzZXIgPSB0cnVlO1xuZXhwb3J0IHZhciBlbnYgPSB7fTtcbmV4cG9ydCB2YXIgYXJndiA9IFtdO1xuZXhwb3J0IHZhciB2ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5leHBvcnQgdmFyIHZlcnNpb25zID0ge307XG5leHBvcnQgdmFyIHJlbGVhc2UgPSB7fTtcbmV4cG9ydCB2YXIgY29uZmlnID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5leHBvcnQgdmFyIG9uID0gbm9vcDtcbmV4cG9ydCB2YXIgYWRkTGlzdGVuZXIgPSBub29wO1xuZXhwb3J0IHZhciBvbmNlID0gbm9vcDtcbmV4cG9ydCB2YXIgb2ZmID0gbm9vcDtcbmV4cG9ydCB2YXIgcmVtb3ZlTGlzdGVuZXIgPSBub29wO1xuZXhwb3J0IHZhciByZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xuZXhwb3J0IHZhciBlbWl0ID0gbm9vcDtcblxuZXhwb3J0IGZ1bmN0aW9uIGJpbmRpbmcobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGN3ZCAoKSB7IHJldHVybiAnLycgfVxuZXhwb3J0IGZ1bmN0aW9uIGNoZGlyIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbmV4cG9ydCBmdW5jdGlvbiB1bWFzaygpIHsgcmV0dXJuIDA7IH1cblxuLy8gZnJvbSBodHRwczovL2dpdGh1Yi5jb20va3VtYXZpcy9icm93c2VyLXByb2Nlc3MtaHJ0aW1lL2Jsb2IvbWFzdGVyL2luZGV4LmpzXG52YXIgcGVyZm9ybWFuY2UgPSBnbG9iYWwucGVyZm9ybWFuY2UgfHwge31cbnZhciBwZXJmb3JtYW5jZU5vdyA9XG4gIHBlcmZvcm1hbmNlLm5vdyAgICAgICAgfHxcbiAgcGVyZm9ybWFuY2UubW96Tm93ICAgICB8fFxuICBwZXJmb3JtYW5jZS5tc05vdyAgICAgIHx8XG4gIHBlcmZvcm1hbmNlLm9Ob3cgICAgICAgfHxcbiAgcGVyZm9ybWFuY2Uud2Via2l0Tm93ICB8fFxuICBmdW5jdGlvbigpeyByZXR1cm4gKG5ldyBEYXRlKCkpLmdldFRpbWUoKSB9XG5cbi8vIGdlbmVyYXRlIHRpbWVzdGFtcCBvciBkZWx0YVxuLy8gc2VlIGh0dHA6Ly9ub2RlanMub3JnL2FwaS9wcm9jZXNzLmh0bWwjcHJvY2Vzc19wcm9jZXNzX2hydGltZVxuZXhwb3J0IGZ1bmN0aW9uIGhydGltZShwcmV2aW91c1RpbWVzdGFtcCl7XG4gIHZhciBjbG9ja3RpbWUgPSBwZXJmb3JtYW5jZU5vdy5jYWxsKHBlcmZvcm1hbmNlKSoxZS0zXG4gIHZhciBzZWNvbmRzID0gTWF0aC5mbG9vcihjbG9ja3RpbWUpXG4gIHZhciBuYW5vc2Vjb25kcyA9IE1hdGguZmxvb3IoKGNsb2NrdGltZSUxKSoxZTkpXG4gIGlmIChwcmV2aW91c1RpbWVzdGFtcCkge1xuICAgIHNlY29uZHMgPSBzZWNvbmRzIC0gcHJldmlvdXNUaW1lc3RhbXBbMF1cbiAgICBuYW5vc2Vjb25kcyA9IG5hbm9zZWNvbmRzIC0gcHJldmlvdXNUaW1lc3RhbXBbMV1cbiAgICBpZiAobmFub3NlY29uZHM8MCkge1xuICAgICAgc2Vjb25kcy0tXG4gICAgICBuYW5vc2Vjb25kcyArPSAxZTlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFtzZWNvbmRzLG5hbm9zZWNvbmRzXVxufVxuXG52YXIgc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcbmV4cG9ydCBmdW5jdGlvbiB1cHRpbWUoKSB7XG4gIHZhciBjdXJyZW50VGltZSA9IG5ldyBEYXRlKCk7XG4gIHZhciBkaWYgPSBjdXJyZW50VGltZSAtIHN0YXJ0VGltZTtcbiAgcmV0dXJuIGRpZiAvIDEwMDA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmV4dFRpY2s6IG5leHRUaWNrLFxuICB0aXRsZTogdGl0bGUsXG4gIGJyb3dzZXI6IGJyb3dzZXIsXG4gIGVudjogZW52LFxuICBhcmd2OiBhcmd2LFxuICB2ZXJzaW9uOiB2ZXJzaW9uLFxuICB2ZXJzaW9uczogdmVyc2lvbnMsXG4gIG9uOiBvbixcbiAgYWRkTGlzdGVuZXI6IGFkZExpc3RlbmVyLFxuICBvbmNlOiBvbmNlLFxuICBvZmY6IG9mZixcbiAgcmVtb3ZlTGlzdGVuZXI6IHJlbW92ZUxpc3RlbmVyLFxuICByZW1vdmVBbGxMaXN0ZW5lcnM6IHJlbW92ZUFsbExpc3RlbmVycyxcbiAgZW1pdDogZW1pdCxcbiAgYmluZGluZzogYmluZGluZyxcbiAgY3dkOiBjd2QsXG4gIGNoZGlyOiBjaGRpcixcbiAgdW1hc2s6IHVtYXNrLFxuICBocnRpbWU6IGhydGltZSxcbiAgcGxhdGZvcm06IHBsYXRmb3JtLFxuICByZWxlYXNlOiByZWxlYXNlLFxuICBjb25maWc6IGNvbmZpZyxcbiAgdXB0aW1lOiB1cHRpbWVcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLk5PX09QID0gJyROT19PUCc7XHJcbmV4cG9ydHMuRVJST1JfTVNHID0gJ2EgcnVudGltZSBlcnJvciBvY2N1cmVkISBVc2UgSW5mZXJubyBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudCB0byBmaW5kIHRoZSBlcnJvci4nO1xyXG4vLyBUaGlzIHNob3VsZCBiZSBib29sZWFuIGFuZCBub3QgcmVmZXJlbmNlIHRvIHdpbmRvdy5kb2N1bWVudFxyXG5leHBvcnRzLmlzQnJvd3NlciA9ICEhKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCk7XHJcbmZ1bmN0aW9uIHRvQXJyYXkoY2hpbGRyZW4pIHtcclxuICAgIHJldHVybiBleHBvcnRzLmlzQXJyYXkoY2hpbGRyZW4pID8gY2hpbGRyZW4gOiAoY2hpbGRyZW4gPyBbY2hpbGRyZW5dIDogY2hpbGRyZW4pO1xyXG59XHJcbmV4cG9ydHMudG9BcnJheSA9IHRvQXJyYXk7XHJcbi8vIHRoaXMgaXMgTVVDSCBmYXN0ZXIgdGhhbiAuY29uc3RydWN0b3IgPT09IEFycmF5IGFuZCBpbnN0YW5jZW9mIEFycmF5XHJcbi8vIGluIE5vZGUgNyBhbmQgdGhlIGxhdGVyIHZlcnNpb25zIG9mIFY4LCBzbG93ZXIgaW4gb2xkZXIgdmVyc2lvbnMgdGhvdWdoXHJcbmV4cG9ydHMuaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XHJcbmZ1bmN0aW9uIGlzU3RhdGVmdWxDb21wb25lbnQobykge1xyXG4gICAgcmV0dXJuICFpc1VuZGVmaW5lZChvLnByb3RvdHlwZSkgJiYgIWlzVW5kZWZpbmVkKG8ucHJvdG90eXBlLnJlbmRlcik7XHJcbn1cclxuZXhwb3J0cy5pc1N0YXRlZnVsQ29tcG9uZW50ID0gaXNTdGF0ZWZ1bENvbXBvbmVudDtcclxuZnVuY3Rpb24gaXNTdHJpbmdPck51bWJlcihvYmopIHtcclxuICAgIHZhciB0eXBlID0gdHlwZW9mIG9iajtcclxuICAgIHJldHVybiB0eXBlID09PSAnc3RyaW5nJyB8fCB0eXBlID09PSAnbnVtYmVyJztcclxufVxyXG5leHBvcnRzLmlzU3RyaW5nT3JOdW1iZXIgPSBpc1N0cmluZ09yTnVtYmVyO1xyXG5mdW5jdGlvbiBpc051bGxPclVuZGVmKG9iaikge1xyXG4gICAgcmV0dXJuIGlzVW5kZWZpbmVkKG9iaikgfHwgaXNOdWxsKG9iaik7XHJcbn1cclxuZXhwb3J0cy5pc051bGxPclVuZGVmID0gaXNOdWxsT3JVbmRlZjtcclxuZnVuY3Rpb24gaXNJbnZhbGlkKG9iaikge1xyXG4gICAgcmV0dXJuIGlzTnVsbChvYmopIHx8IG9iaiA9PT0gZmFsc2UgfHwgaXNUcnVlKG9iaikgfHwgaXNVbmRlZmluZWQob2JqKTtcclxufVxyXG5leHBvcnRzLmlzSW52YWxpZCA9IGlzSW52YWxpZDtcclxuZnVuY3Rpb24gaXNGdW5jdGlvbihvYmopIHtcclxuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nO1xyXG59XHJcbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XHJcbmZ1bmN0aW9uIGlzU3RyaW5nKG9iaikge1xyXG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdzdHJpbmcnO1xyXG59XHJcbmV4cG9ydHMuaXNTdHJpbmcgPSBpc1N0cmluZztcclxuZnVuY3Rpb24gaXNOdW1iZXIob2JqKSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ251bWJlcic7XHJcbn1cclxuZXhwb3J0cy5pc051bWJlciA9IGlzTnVtYmVyO1xyXG5mdW5jdGlvbiBpc051bGwob2JqKSB7XHJcbiAgICByZXR1cm4gb2JqID09PSBudWxsO1xyXG59XHJcbmV4cG9ydHMuaXNOdWxsID0gaXNOdWxsO1xyXG5mdW5jdGlvbiBpc1RydWUob2JqKSB7XHJcbiAgICByZXR1cm4gb2JqID09PSB0cnVlO1xyXG59XHJcbmV4cG9ydHMuaXNUcnVlID0gaXNUcnVlO1xyXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChvYmopIHtcclxuICAgIHJldHVybiBvYmogPT09IHVuZGVmaW5lZDtcclxufVxyXG5leHBvcnRzLmlzVW5kZWZpbmVkID0gaXNVbmRlZmluZWQ7XHJcbmZ1bmN0aW9uIGlzT2JqZWN0KG8pIHtcclxuICAgIHJldHVybiB0eXBlb2YgbyA9PT0gJ29iamVjdCc7XHJcbn1cclxuZXhwb3J0cy5pc09iamVjdCA9IGlzT2JqZWN0O1xyXG5mdW5jdGlvbiB0aHJvd0Vycm9yKG1lc3NhZ2UpIHtcclxuICAgIGlmICghbWVzc2FnZSkge1xyXG4gICAgICAgIG1lc3NhZ2UgPSBleHBvcnRzLkVSUk9SX01TRztcclxuICAgIH1cclxuICAgIHRocm93IG5ldyBFcnJvcihcIkluZmVybm8gRXJyb3I6IFwiICsgbWVzc2FnZSk7XHJcbn1cclxuZXhwb3J0cy50aHJvd0Vycm9yID0gdGhyb3dFcnJvcjtcclxuZnVuY3Rpb24gd2FybmluZyhtZXNzYWdlKSB7XHJcbiAgICBjb25zb2xlLndhcm4obWVzc2FnZSk7XHJcbn1cclxuZXhwb3J0cy53YXJuaW5nID0gd2FybmluZztcclxuZnVuY3Rpb24gY29tYmluZUZyb20oZmlyc3QsIHNlY29uZCkge1xyXG4gICAgdmFyIG9iaiA9IHt9O1xyXG4gICAgdmFyIGtleTtcclxuICAgIGlmIChmaXJzdCkge1xyXG4gICAgICAgIGZvciAoa2V5IGluIGZpcnN0KSB7XHJcbiAgICAgICAgICAgIG9ialtrZXldID0gZmlyc3Rba2V5XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoc2Vjb25kKSB7XHJcbiAgICAgICAgZm9yIChrZXkgaW4gc2Vjb25kKSB7XHJcbiAgICAgICAgICAgIG9ialtrZXldID0gc2Vjb25kW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9iajtcclxufVxyXG5leHBvcnRzLmNvbWJpbmVGcm9tID0gY29tYmluZUZyb207XHJcbmZ1bmN0aW9uIExpZmVjeWNsZSgpIHtcclxuICAgIHRoaXMubGlzdGVuZXJzID0gW107XHJcbn1cclxuZXhwb3J0cy5MaWZlY3ljbGUgPSBMaWZlY3ljbGU7XHJcbkxpZmVjeWNsZS5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcihjYWxsYmFjaykge1xyXG4gICAgdGhpcy5saXN0ZW5lcnMucHVzaChjYWxsYmFjayk7XHJcbn07XHJcbkxpZmVjeWNsZS5wcm90b3R5cGUudHJpZ2dlciA9IGZ1bmN0aW9uIHRyaWdnZXIoKSB7XHJcbiAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnM7XHJcbiAgICB2YXIgbGlzdGVuZXI7XHJcbiAgICAvLyBXZSBuZWVkIHRvIHJlbW92ZSBjdXJyZW50IGxpc3RlbmVyIGZyb20gYXJyYXkgd2hlbiBjYWxsaW5nIGl0LCBiZWNhdXNlIG1vcmUgbGlzdGVuZXJzIG1pZ2h0IGJlIGFkZGVkXHJcbiAgICB3aGlsZSAobGlzdGVuZXIgPSBsaXN0ZW5lcnMuc2hpZnQoKSkge1xyXG4gICAgICAgIGxpc3RlbmVyKCk7XHJcbiAgICB9XHJcbn07XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9kaXN0Jyk7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gbW9kdWxlLmV4cG9ydHM7XG5cbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZGVmYXVsdCA9IHtcclxuICAgIHJlY3ljbGluZ0VuYWJsZWQ6IGZhbHNlLFxyXG4gICAgZmluZERPTU5vZGVFbmFibGVkOiBmYWxzZSxcclxuICAgIHJvb3RzOiBudWxsLFxyXG4gICAgY3JlYXRlVk5vZGU6IG51bGwsXHJcbiAgICBiZWZvcmVSZW5kZXI6IG51bGwsXHJcbiAgICBhZnRlclJlbmRlcjogbnVsbCxcclxuICAgIGFmdGVyTW91bnQ6IG51bGwsXHJcbiAgICBhZnRlclVwZGF0ZTogbnVsbCxcclxuICAgIGJlZm9yZVVubW91bnQ6IG51bGxcclxufTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy54bGlua05TID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnO1xyXG5leHBvcnRzLnhtbE5TID0gJ2h0dHA6Ly93d3cudzMub3JnL1hNTC8xOTk4L25hbWVzcGFjZSc7XHJcbmV4cG9ydHMuc3ZnTlMgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xyXG52YXIgVFJVRSA9IHRydWU7XHJcbmV4cG9ydHMuc3RyaWN0UHJvcHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG5leHBvcnRzLnN0cmljdFByb3BzLnZvbHVtZSA9IFRSVUU7XHJcbmV4cG9ydHMuc3RyaWN0UHJvcHMuZGVmYXVsdENoZWNrZWQgPSBUUlVFO1xyXG5PYmplY3QuZnJlZXplKGV4cG9ydHMuc3RyaWN0UHJvcHMpO1xyXG5leHBvcnRzLmJvb2xlYW5Qcm9wcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XHJcbmV4cG9ydHMuYm9vbGVhblByb3BzLm11dGVkID0gVFJVRTtcclxuZXhwb3J0cy5ib29sZWFuUHJvcHMuc2NvcGVkID0gVFJVRTtcclxuZXhwb3J0cy5ib29sZWFuUHJvcHMubG9vcCA9IFRSVUU7XHJcbmV4cG9ydHMuYm9vbGVhblByb3BzLm9wZW4gPSBUUlVFO1xyXG5leHBvcnRzLmJvb2xlYW5Qcm9wcy5jaGVja2VkID0gVFJVRTtcclxuZXhwb3J0cy5ib29sZWFuUHJvcHMuZGVmYXVsdCA9IFRSVUU7XHJcbmV4cG9ydHMuYm9vbGVhblByb3BzLmNhcHR1cmUgPSBUUlVFO1xyXG5leHBvcnRzLmJvb2xlYW5Qcm9wcy5kaXNhYmxlZCA9IFRSVUU7XHJcbmV4cG9ydHMuYm9vbGVhblByb3BzLnJlYWRPbmx5ID0gVFJVRTtcclxuZXhwb3J0cy5ib29sZWFuUHJvcHMucmVxdWlyZWQgPSBUUlVFO1xyXG5leHBvcnRzLmJvb2xlYW5Qcm9wcy5hdXRvcGxheSA9IFRSVUU7XHJcbmV4cG9ydHMuYm9vbGVhblByb3BzLmNvbnRyb2xzID0gVFJVRTtcclxuZXhwb3J0cy5ib29sZWFuUHJvcHMuc2VhbWxlc3MgPSBUUlVFO1xyXG5leHBvcnRzLmJvb2xlYW5Qcm9wcy5yZXZlcnNlZCA9IFRSVUU7XHJcbmV4cG9ydHMuYm9vbGVhblByb3BzLmFsbG93ZnVsbHNjcmVlbiA9IFRSVUU7XHJcbmV4cG9ydHMuYm9vbGVhblByb3BzLm5vdmFsaWRhdGUgPSBUUlVFO1xyXG5leHBvcnRzLmJvb2xlYW5Qcm9wcy5oaWRkZW4gPSBUUlVFO1xyXG5leHBvcnRzLmJvb2xlYW5Qcm9wcy5hdXRvRm9jdXMgPSBUUlVFO1xyXG5PYmplY3QuZnJlZXplKGV4cG9ydHMuYm9vbGVhblByb3BzKTtcclxuZXhwb3J0cy5uYW1lc3BhY2VzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuZXhwb3J0cy5uYW1lc3BhY2VzWyd4bGluazpocmVmJ10gPSBleHBvcnRzLnhsaW5rTlM7XHJcbmV4cG9ydHMubmFtZXNwYWNlc1sneGxpbms6YXJjcm9sZSddID0gZXhwb3J0cy54bGlua05TO1xyXG5leHBvcnRzLm5hbWVzcGFjZXNbJ3hsaW5rOmFjdHVhdGUnXSA9IGV4cG9ydHMueGxpbmtOUztcclxuZXhwb3J0cy5uYW1lc3BhY2VzWyd4bGluazpzaG93J10gPSBleHBvcnRzLnhsaW5rTlM7XHJcbmV4cG9ydHMubmFtZXNwYWNlc1sneGxpbms6cm9sZSddID0gZXhwb3J0cy54bGlua05TO1xyXG5leHBvcnRzLm5hbWVzcGFjZXNbJ3hsaW5rOnRpdGxlJ10gPSBleHBvcnRzLnhsaW5rTlM7XHJcbmV4cG9ydHMubmFtZXNwYWNlc1sneGxpbms6dHlwZSddID0gZXhwb3J0cy54bGlua05TO1xyXG5leHBvcnRzLm5hbWVzcGFjZXNbJ3htbDpiYXNlJ10gPSBleHBvcnRzLnhtbE5TO1xyXG5leHBvcnRzLm5hbWVzcGFjZXNbJ3htbDpsYW5nJ10gPSBleHBvcnRzLnhtbE5TO1xyXG5leHBvcnRzLm5hbWVzcGFjZXNbJ3htbDpzcGFjZSddID0gZXhwb3J0cy54bWxOUztcclxuT2JqZWN0LmZyZWV6ZShleHBvcnRzLm5hbWVzcGFjZXMpO1xyXG5leHBvcnRzLmlzVW5pdGxlc3NOdW1iZXIgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG5leHBvcnRzLmlzVW5pdGxlc3NOdW1iZXIuYW5pbWF0aW9uSXRlcmF0aW9uQ291bnQgPSBUUlVFO1xyXG5leHBvcnRzLmlzVW5pdGxlc3NOdW1iZXIuYm9yZGVySW1hZ2VPdXRzZXQgPSBUUlVFO1xyXG5leHBvcnRzLmlzVW5pdGxlc3NOdW1iZXIuYm9yZGVySW1hZ2VTbGljZSA9IFRSVUU7XHJcbmV4cG9ydHMuaXNVbml0bGVzc051bWJlci5ib3JkZXJJbWFnZVdpZHRoID0gVFJVRTtcclxuZXhwb3J0cy5pc1VuaXRsZXNzTnVtYmVyLmJveEZsZXggPSBUUlVFO1xyXG5leHBvcnRzLmlzVW5pdGxlc3NOdW1iZXIuYm94RmxleEdyb3VwID0gVFJVRTtcclxuZXhwb3J0cy5pc1VuaXRsZXNzTnVtYmVyLmJveE9yZGluYWxHcm91cCA9IFRSVUU7XHJcbmV4cG9ydHMuaXNVbml0bGVzc051bWJlci5jb2x1bW5Db3VudCA9IFRSVUU7XHJcbmV4cG9ydHMuaXNVbml0bGVzc051bWJlci5mbGV4ID0gVFJVRTtcclxuZXhwb3J0cy5pc1VuaXRsZXNzTnVtYmVyLmZsZXhHcm93ID0gVFJVRTtcclxuZXhwb3J0cy5pc1VuaXRsZXNzTnVtYmVyLmZsZXhQb3NpdGl2ZSA9IFRSVUU7XHJcbmV4cG9ydHMuaXNVbml0bGVzc051bWJlci5mbGV4U2hyaW5rID0gVFJVRTtcclxuZXhwb3J0cy5pc1VuaXRsZXNzTnVtYmVyLmZsZXhOZWdhdGl2ZSA9IFRSVUU7XHJcbmV4cG9ydHMuaXNVbml0bGVzc051bWJlci5mbGV4T3JkZXIgPSBUUlVFO1xyXG5leHBvcnRzLmlzVW5pdGxlc3NOdW1iZXIuZ3JpZFJvdyA9IFRSVUU7XHJcbmV4cG9ydHMuaXNVbml0bGVzc051bWJlci5ncmlkQ29sdW1uID0gVFJVRTtcclxuZXhwb3J0cy5pc1VuaXRsZXNzTnVtYmVyLmZvbnRXZWlnaHQgPSBUUlVFO1xyXG5leHBvcnRzLmlzVW5pdGxlc3NOdW1iZXIubGluZUNsYW1wID0gVFJVRTtcclxuZXhwb3J0cy5pc1VuaXRsZXNzTnVtYmVyLmxpbmVIZWlnaHQgPSBUUlVFO1xyXG5leHBvcnRzLmlzVW5pdGxlc3NOdW1iZXIub3BhY2l0eSA9IFRSVUU7XHJcbmV4cG9ydHMuaXNVbml0bGVzc051bWJlci5vcmRlciA9IFRSVUU7XHJcbmV4cG9ydHMuaXNVbml0bGVzc051bWJlci5vcnBoYW5zID0gVFJVRTtcclxuZXhwb3J0cy5pc1VuaXRsZXNzTnVtYmVyLnRhYlNpemUgPSBUUlVFO1xyXG5leHBvcnRzLmlzVW5pdGxlc3NOdW1iZXIud2lkb3dzID0gVFJVRTtcclxuZXhwb3J0cy5pc1VuaXRsZXNzTnVtYmVyLnpJbmRleCA9IFRSVUU7XHJcbmV4cG9ydHMuaXNVbml0bGVzc051bWJlci56b29tID0gVFJVRTtcclxuZXhwb3J0cy5pc1VuaXRsZXNzTnVtYmVyLmZpbGxPcGFjaXR5ID0gVFJVRTtcclxuZXhwb3J0cy5pc1VuaXRsZXNzTnVtYmVyLmZsb29kT3BhY2l0eSA9IFRSVUU7XHJcbmV4cG9ydHMuaXNVbml0bGVzc051bWJlci5zdG9wT3BhY2l0eSA9IFRSVUU7XHJcbmV4cG9ydHMuaXNVbml0bGVzc051bWJlci5zdHJva2VEYXNoYXJyYXkgPSBUUlVFO1xyXG5leHBvcnRzLmlzVW5pdGxlc3NOdW1iZXIuc3Ryb2tlRGFzaG9mZnNldCA9IFRSVUU7XHJcbmV4cG9ydHMuaXNVbml0bGVzc051bWJlci5zdHJva2VNaXRlcmxpbWl0ID0gVFJVRTtcclxuZXhwb3J0cy5pc1VuaXRsZXNzTnVtYmVyLnN0cm9rZU9wYWNpdHkgPSBUUlVFO1xyXG5leHBvcnRzLmlzVW5pdGxlc3NOdW1iZXIuc3Ryb2tlV2lkdGggPSBUUlVFO1xyXG5PYmplY3QuZnJlZXplKGV4cG9ydHMuaXNVbml0bGVzc051bWJlcik7XHJcbmV4cG9ydHMuc2tpcFByb3BzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuZXhwb3J0cy5za2lwUHJvcHMuY2hpbGRyZW4gPSBUUlVFO1xyXG5leHBvcnRzLnNraXBQcm9wcy5jaGlsZHJlblR5cGUgPSBUUlVFO1xyXG5leHBvcnRzLnNraXBQcm9wcy5kZWZhdWx0VmFsdWUgPSBUUlVFO1xyXG5leHBvcnRzLnNraXBQcm9wcy5yZWYgPSBUUlVFO1xyXG5leHBvcnRzLnNraXBQcm9wcy5rZXkgPSBUUlVFO1xyXG5leHBvcnRzLnNraXBQcm9wcy5zZWxlY3RlZCA9IFRSVUU7XHJcbmV4cG9ydHMuc2tpcFByb3BzLmNoZWNrZWQgPSBUUlVFO1xyXG5leHBvcnRzLnNraXBQcm9wcy5tdWx0aXBsZSA9IFRSVUU7XHJcbk9iamVjdC5mcmVlemUoZXhwb3J0cy5za2lwUHJvcHMpO1xyXG5leHBvcnRzLmRlbGVnYXRlZEV2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XHJcbmV4cG9ydHMuZGVsZWdhdGVkRXZlbnRzLm9uQ2xpY2sgPSBUUlVFO1xyXG5leHBvcnRzLmRlbGVnYXRlZEV2ZW50cy5vbk1vdXNlRG93biA9IFRSVUU7XHJcbmV4cG9ydHMuZGVsZWdhdGVkRXZlbnRzLm9uTW91c2VVcCA9IFRSVUU7XHJcbmV4cG9ydHMuZGVsZWdhdGVkRXZlbnRzLm9uTW91c2VNb3ZlID0gVFJVRTtcclxuZXhwb3J0cy5kZWxlZ2F0ZWRFdmVudHMub25TdWJtaXQgPSBUUlVFO1xyXG5leHBvcnRzLmRlbGVnYXRlZEV2ZW50cy5vbkRibENsaWNrID0gVFJVRTtcclxuZXhwb3J0cy5kZWxlZ2F0ZWRFdmVudHMub25LZXlEb3duID0gVFJVRTtcclxuZXhwb3J0cy5kZWxlZ2F0ZWRFdmVudHMub25LZXlVcCA9IFRSVUU7XHJcbmV4cG9ydHMuZGVsZWdhdGVkRXZlbnRzLm9uS2V5UHJlc3MgPSBUUlVFO1xyXG5PYmplY3QuZnJlZXplKGV4cG9ydHMuZGVsZWdhdGVkRXZlbnRzKTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGluZmVybm9fc2hhcmVkXzEgPSByZXF1aXJlKFwiaW5mZXJuby1zaGFyZWRcIik7XHJcbnZhciBpc2lPUyA9IGluZmVybm9fc2hhcmVkXzEuaXNCcm93c2VyICYmICEhbmF2aWdhdG9yLnBsYXRmb3JtICYmIC9pUGFkfGlQaG9uZXxpUG9kLy50ZXN0KG5hdmlnYXRvci5wbGF0Zm9ybSk7XHJcbnZhciBkZWxlZ2F0ZWRFdmVudHMgPSBuZXcgTWFwKCk7XHJcbmZ1bmN0aW9uIGhhbmRsZUV2ZW50KG5hbWUsIGxhc3RFdmVudCwgbmV4dEV2ZW50LCBkb20pIHtcclxuICAgIHZhciBkZWxlZ2F0ZWRSb290cyA9IGRlbGVnYXRlZEV2ZW50cy5nZXQobmFtZSk7XHJcbiAgICBpZiAobmV4dEV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCFkZWxlZ2F0ZWRSb290cykge1xyXG4gICAgICAgICAgICBkZWxlZ2F0ZWRSb290cyA9IHsgaXRlbXM6IG5ldyBNYXAoKSwgY291bnQ6IDAsIGRvY0V2ZW50OiBudWxsIH07XHJcbiAgICAgICAgICAgIGRlbGVnYXRlZFJvb3RzLmRvY0V2ZW50ID0gYXR0YWNoRXZlbnRUb0RvY3VtZW50KG5hbWUsIGRlbGVnYXRlZFJvb3RzKTtcclxuICAgICAgICAgICAgZGVsZWdhdGVkRXZlbnRzLnNldChuYW1lLCBkZWxlZ2F0ZWRSb290cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghbGFzdEV2ZW50KSB7XHJcbiAgICAgICAgICAgIGRlbGVnYXRlZFJvb3RzLmNvdW50Kys7XHJcbiAgICAgICAgICAgIGlmIChpc2lPUyAmJiBuYW1lID09PSAnb25DbGljaycpIHtcclxuICAgICAgICAgICAgICAgIHRyYXBDbGlja09uTm9uSW50ZXJhY3RpdmVFbGVtZW50KGRvbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZGVsZWdhdGVkUm9vdHMuaXRlbXMuc2V0KGRvbSwgbmV4dEV2ZW50KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGRlbGVnYXRlZFJvb3RzKSB7XHJcbiAgICAgICAgZGVsZWdhdGVkUm9vdHMuY291bnQtLTtcclxuICAgICAgICBkZWxlZ2F0ZWRSb290cy5pdGVtcy5kZWxldGUoZG9tKTtcclxuICAgICAgICBpZiAoZGVsZWdhdGVkUm9vdHMuY291bnQgPT09IDApIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihub3JtYWxpemVFdmVudE5hbWUobmFtZSksIGRlbGVnYXRlZFJvb3RzLmRvY0V2ZW50KTtcclxuICAgICAgICAgICAgZGVsZWdhdGVkRXZlbnRzLmRlbGV0ZShuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5oYW5kbGVFdmVudCA9IGhhbmRsZUV2ZW50O1xyXG5mdW5jdGlvbiBkaXNwYXRjaEV2ZW50KGV2ZW50LCB0YXJnZXQsIGl0ZW1zLCBjb3VudCwgZG9tLCBpc0NsaWNrKSB7XHJcbiAgICB2YXIgZXZlbnRzVG9UcmlnZ2VyID0gaXRlbXMuZ2V0KHRhcmdldCk7XHJcbiAgICBpZiAoZXZlbnRzVG9UcmlnZ2VyKSB7XHJcbiAgICAgICAgY291bnQtLTtcclxuICAgICAgICAvLyBsaW5rRXZlbnQgb2JqZWN0XHJcbiAgICAgICAgZG9tID0gdGFyZ2V0O1xyXG4gICAgICAgIGlmIChldmVudHNUb1RyaWdnZXIuZXZlbnQpIHtcclxuICAgICAgICAgICAgZXZlbnRzVG9UcmlnZ2VyLmV2ZW50KGV2ZW50c1RvVHJpZ2dlci5kYXRhLCBldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBldmVudHNUb1RyaWdnZXIoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXZlbnQuY2FuY2VsQnViYmxlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoY291bnQgPiAwKSB7XHJcbiAgICAgICAgdmFyIHBhcmVudERvbSA9IHRhcmdldC5wYXJlbnROb2RlO1xyXG4gICAgICAgIC8vIEh0bWwgTm9kZXMgY2FuIGJlIG5lc3RlZCBmZTogc3BhbiBpbnNpZGUgYnV0dG9uIGluIHRoYXQgc2NlbmFyaW8gYnJvd3NlciBkb2VzIG5vdCBoYW5kbGUgZGlzYWJsZWQgYXR0cmlidXRlIG9uIHBhcmVudCxcclxuICAgICAgICAvLyBiZWNhdXNlIHRoZSBldmVudCBsaXN0ZW5lciBpcyBvbiBkb2N1bWVudC5ib2R5XHJcbiAgICAgICAgLy8gRG9uJ3QgcHJvY2VzcyBjbGlja3Mgb24gZGlzYWJsZWQgZWxlbWVudHNcclxuICAgICAgICBpZiAocGFyZW50RG9tID09PSBudWxsIHx8IChpc0NsaWNrICYmIHBhcmVudERvbS5ub2RlVHlwZSA9PT0gMSAmJiBwYXJlbnREb20uZGlzYWJsZWQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGlzcGF0Y2hFdmVudChldmVudCwgcGFyZW50RG9tLCBpdGVtcywgY291bnQsIGRvbSwgaXNDbGljayk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gbm9ybWFsaXplRXZlbnROYW1lKG5hbWUpIHtcclxuICAgIHJldHVybiBuYW1lLnN1YnN0cigyKS50b0xvd2VyQ2FzZSgpO1xyXG59XHJcbmZ1bmN0aW9uIHN0b3BQcm9wYWdhdGlvbigpIHtcclxuICAgIHRoaXMuY2FuY2VsQnViYmxlID0gdHJ1ZTtcclxuICAgIHRoaXMuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbn1cclxuZnVuY3Rpb24gYXR0YWNoRXZlbnRUb0RvY3VtZW50KG5hbWUsIGRlbGVnYXRlZFJvb3RzKSB7XHJcbiAgICB2YXIgZG9jRXZlbnQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICB2YXIgY291bnQgPSBkZWxlZ2F0ZWRSb290cy5jb3VudDtcclxuICAgICAgICBpZiAoY291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbiA9IHN0b3BQcm9wYWdhdGlvbjtcclxuICAgICAgICAgICAgZGlzcGF0Y2hFdmVudChldmVudCwgZXZlbnQudGFyZ2V0LCBkZWxlZ2F0ZWRSb290cy5pdGVtcywgY291bnQsIGRvY3VtZW50LCBldmVudC50eXBlID09PSAnY2xpY2snKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihub3JtYWxpemVFdmVudE5hbWUobmFtZSksIGRvY0V2ZW50KTtcclxuICAgIHJldHVybiBkb2NFdmVudDtcclxufVxyXG5mdW5jdGlvbiBlbXB0eUZuKCkge1xyXG59XHJcbmZ1bmN0aW9uIHRyYXBDbGlja09uTm9uSW50ZXJhY3RpdmVFbGVtZW50KGRvbSkge1xyXG4gICAgLy8gTW9iaWxlIFNhZmFyaSBkb2VzIG5vdCBmaXJlIHByb3Blcmx5IGJ1YmJsZSBjbGljayBldmVudHMgb25cclxuICAgIC8vIG5vbi1pbnRlcmFjdGl2ZSBlbGVtZW50cywgd2hpY2ggbWVhbnMgZGVsZWdhdGVkIGNsaWNrIGxpc3RlbmVycyBkbyBub3RcclxuICAgIC8vIGZpcmUuIFRoZSB3b3JrYXJvdW5kIGZvciB0aGlzIGJ1ZyBpbnZvbHZlcyBhdHRhY2hpbmcgYW4gZW1wdHkgY2xpY2tcclxuICAgIC8vIGxpc3RlbmVyIG9uIHRoZSB0YXJnZXQgbm9kZS5cclxuICAgIC8vIGh0dHA6Ly93d3cucXVpcmtzbW9kZS5vcmcvYmxvZy9hcmNoaXZlcy8yMDEwLzA5L2NsaWNrX2V2ZW50X2RlbC5odG1sXHJcbiAgICAvLyBKdXN0IHNldCBpdCB1c2luZyB0aGUgb25jbGljayBwcm9wZXJ0eSBzbyB0aGF0IHdlIGRvbid0IGhhdmUgdG8gbWFuYWdlIGFueVxyXG4gICAgLy8gYm9va2tlZXBpbmcgZm9yIGl0LiBOb3Qgc3VyZSBpZiB3ZSBuZWVkIHRvIGNsZWFyIGl0IHdoZW4gdGhlIGxpc3RlbmVyIGlzXHJcbiAgICAvLyByZW1vdmVkLlxyXG4gICAgLy8gVE9ETzogT25seSBkbyB0aGlzIGZvciB0aGUgcmVsZXZhbnQgU2FmYXJpcyBtYXliZT9cclxuICAgIGRvbS5vbmNsaWNrID0gZW1wdHlGbjtcclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgaW5mZXJub19zaGFyZWRfMSA9IHJlcXVpcmUoXCJpbmZlcm5vLXNoYXJlZFwiKTtcclxudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XHJcbmZ1bmN0aW9uIGlzQ2hlY2tlZFR5cGUodHlwZSkge1xyXG4gICAgcmV0dXJuIHR5cGUgPT09ICdjaGVja2JveCcgfHwgdHlwZSA9PT0gJ3JhZGlvJztcclxufVxyXG5leHBvcnRzLmlzQ2hlY2tlZFR5cGUgPSBpc0NoZWNrZWRUeXBlO1xyXG5mdW5jdGlvbiBvblRleHRJbnB1dENoYW5nZShlKSB7XHJcbiAgICB2YXIgdk5vZGUgPSB0aGlzO1xyXG4gICAgdmFyIHByb3BzID0gdk5vZGUucHJvcHMgfHwgdXRpbHNfMS5FTVBUWV9PQko7XHJcbiAgICB2YXIgZG9tID0gdk5vZGUuZG9tO1xyXG4gICAgdmFyIHByZXZpb3VzVmFsdWUgPSBwcm9wcy52YWx1ZTtcclxuICAgIGlmIChwcm9wcy5vbklucHV0KSB7XHJcbiAgICAgICAgdmFyIGV2ZW50XzEgPSBwcm9wcy5vbklucHV0O1xyXG4gICAgICAgIGlmIChldmVudF8xLmV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50XzEuZXZlbnQoZXZlbnRfMS5kYXRhLCBlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGV2ZW50XzEoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocHJvcHMub25pbnB1dCkge1xyXG4gICAgICAgIHByb3BzLm9uaW5wdXQoZSk7XHJcbiAgICB9XHJcbiAgICAvLyB0aGUgdXNlciBtYXkgaGF2ZSB1cGRhdGVkIHRoZSB2Tm9kZSBmcm9tIHRoZSBhYm92ZSBvbklucHV0IGV2ZW50cyBzeW5jcm9ub3VzbHlcclxuICAgIC8vIHNvIHdlIG5lZWQgdG8gZ2V0IGl0IGZyb20gdGhlIGNvbnRleHQgb2YgYHRoaXNgIGFnYWluXHJcbiAgICB2YXIgbmV3Vk5vZGUgPSB0aGlzO1xyXG4gICAgdmFyIG5ld1Byb3BzID0gbmV3Vk5vZGUucHJvcHMgfHwgdXRpbHNfMS5FTVBUWV9PQko7XHJcbiAgICAvLyBJZiByZW5kZXIgaXMgZ29pbmcgYXN5bmMgdGhlcmUgaXMgbm8gdmFsdWUgY2hhbmdlIHlldCwgaXQgd2lsbCBjb21lIGJhY2sgdG8gcHJvY2VzcyBpbnB1dCBzb29uXHJcbiAgICBpZiAocHJldmlvdXNWYWx1ZSAhPT0gbmV3UHJvcHMudmFsdWUpIHtcclxuICAgICAgICAvLyBXaGVuIHRoaXMgaGFwcGVucyB3ZSBuZWVkIHRvIHN0b3JlIGN1cnJlbnQgY3Vyc29yIHBvc2l0aW9uIGFuZCByZXN0b3JlIGl0LCB0byBhdm9pZCBqdW1waW5nXHJcbiAgICAgICAgYXBwbHlWYWx1ZShuZXdQcm9wcywgZG9tKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiB3cmFwcGVkT25DaGFuZ2UoZSkge1xyXG4gICAgdmFyIHByb3BzID0gdGhpcy5wcm9wcyB8fCB1dGlsc18xLkVNUFRZX09CSjtcclxuICAgIHZhciBldmVudCA9IHByb3BzLm9uQ2hhbmdlO1xyXG4gICAgaWYgKGV2ZW50LmV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQuZXZlbnQoZXZlbnQuZGF0YSwgZSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBldmVudChlKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBvbkNoZWNrYm94Q2hhbmdlKGUpIHtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7IC8vIFRoaXMgY2xpY2sgc2hvdWxkIG5vdCBwcm9wYWdhdGUgaXRzIGZvciBpbnRlcm5hbCB1c2VcclxuICAgIHZhciB2Tm9kZSA9IHRoaXM7XHJcbiAgICB2YXIgcHJvcHMgPSB2Tm9kZS5wcm9wcyB8fCB1dGlsc18xLkVNUFRZX09CSjtcclxuICAgIHZhciBkb20gPSB2Tm9kZS5kb207XHJcbiAgICB2YXIgcHJldmlvdXNWYWx1ZSA9IHByb3BzLnZhbHVlO1xyXG4gICAgaWYgKHByb3BzLm9uQ2xpY2spIHtcclxuICAgICAgICB2YXIgZXZlbnRfMiA9IHByb3BzLm9uQ2xpY2s7XHJcbiAgICAgICAgaWYgKGV2ZW50XzIuZXZlbnQpIHtcclxuICAgICAgICAgICAgZXZlbnRfMi5ldmVudChldmVudF8yLmRhdGEsIGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZXZlbnRfMihlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChwcm9wcy5vbmNsaWNrKSB7XHJcbiAgICAgICAgcHJvcHMub25jbGljayhlKTtcclxuICAgIH1cclxuICAgIC8vIHRoZSB1c2VyIG1heSBoYXZlIHVwZGF0ZWQgdGhlIHZOb2RlIGZyb20gdGhlIGFib3ZlIG9uSW5wdXQgZXZlbnRzIHN5bmNyb25vdXNseVxyXG4gICAgLy8gc28gd2UgbmVlZCB0byBnZXQgaXQgZnJvbSB0aGUgY29udGV4dCBvZiBgdGhpc2AgYWdhaW5cclxuICAgIHZhciBuZXdWTm9kZSA9IHRoaXM7XHJcbiAgICB2YXIgbmV3UHJvcHMgPSBuZXdWTm9kZS5wcm9wcyB8fCB1dGlsc18xLkVNUFRZX09CSjtcclxuICAgIC8vIElmIHJlbmRlciBpcyBnb2luZyBhc3luYyB0aGVyZSBpcyBubyB2YWx1ZSBjaGFuZ2UgeWV0LCBpdCB3aWxsIGNvbWUgYmFjayB0byBwcm9jZXNzIGlucHV0IHNvb25cclxuICAgIGlmIChwcmV2aW91c1ZhbHVlICE9PSBuZXdQcm9wcy52YWx1ZSkge1xyXG4gICAgICAgIC8vIFdoZW4gdGhpcyBoYXBwZW5zIHdlIG5lZWQgdG8gc3RvcmUgY3VycmVudCBjdXJzb3IgcG9zaXRpb24gYW5kIHJlc3RvcmUgaXQsIHRvIGF2b2lkIGp1bXBpbmdcclxuICAgICAgICBhcHBseVZhbHVlKG5ld1Byb3BzLCBkb20pO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHByb2Nlc3NJbnB1dCh2Tm9kZSwgZG9tLCBuZXh0UHJvcHNPckVtcHR5LCBtb3VudGluZywgaXNDb250cm9sbGVkKSB7XHJcbiAgICBhcHBseVZhbHVlKG5leHRQcm9wc09yRW1wdHksIGRvbSk7XHJcbiAgICBpZiAobW91bnRpbmcgJiYgaXNDb250cm9sbGVkKSB7XHJcbiAgICAgICAgaWYgKGlzQ2hlY2tlZFR5cGUobmV4dFByb3BzT3JFbXB0eS50eXBlKSkge1xyXG4gICAgICAgICAgICBkb20ub25jbGljayA9IG9uQ2hlY2tib3hDaGFuZ2UuYmluZCh2Tm9kZSk7XHJcbiAgICAgICAgICAgIGRvbS5vbmNsaWNrLndyYXBwZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZG9tLm9uaW5wdXQgPSBvblRleHRJbnB1dENoYW5nZS5iaW5kKHZOb2RlKTtcclxuICAgICAgICAgICAgZG9tLm9uaW5wdXQud3JhcHBlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuZXh0UHJvcHNPckVtcHR5Lm9uQ2hhbmdlKSB7XHJcbiAgICAgICAgICAgIGRvbS5vbmNoYW5nZSA9IHdyYXBwZWRPbkNoYW5nZS5iaW5kKHZOb2RlKTtcclxuICAgICAgICAgICAgZG9tLm9uY2hhbmdlLndyYXBwZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLnByb2Nlc3NJbnB1dCA9IHByb2Nlc3NJbnB1dDtcclxuZnVuY3Rpb24gYXBwbHlWYWx1ZShuZXh0UHJvcHNPckVtcHR5LCBkb20pIHtcclxuICAgIHZhciB0eXBlID0gbmV4dFByb3BzT3JFbXB0eS50eXBlO1xyXG4gICAgdmFyIHZhbHVlID0gbmV4dFByb3BzT3JFbXB0eS52YWx1ZTtcclxuICAgIHZhciBjaGVja2VkID0gbmV4dFByb3BzT3JFbXB0eS5jaGVja2VkO1xyXG4gICAgdmFyIG11bHRpcGxlID0gbmV4dFByb3BzT3JFbXB0eS5tdWx0aXBsZTtcclxuICAgIHZhciBkZWZhdWx0VmFsdWUgPSBuZXh0UHJvcHNPckVtcHR5LmRlZmF1bHRWYWx1ZTtcclxuICAgIHZhciBoYXNWYWx1ZSA9ICFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbE9yVW5kZWYodmFsdWUpO1xyXG4gICAgaWYgKHR5cGUgJiYgdHlwZSAhPT0gZG9tLnR5cGUpIHtcclxuICAgICAgICBkb20uc2V0QXR0cmlidXRlKCd0eXBlJywgdHlwZSk7XHJcbiAgICB9XHJcbiAgICBpZiAobXVsdGlwbGUgJiYgbXVsdGlwbGUgIT09IGRvbS5tdWx0aXBsZSkge1xyXG4gICAgICAgIGRvbS5tdWx0aXBsZSA9IG11bHRpcGxlO1xyXG4gICAgfVxyXG4gICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbE9yVW5kZWYoZGVmYXVsdFZhbHVlKSAmJiAhaGFzVmFsdWUpIHtcclxuICAgICAgICBkb20uZGVmYXVsdFZhbHVlID0gZGVmYXVsdFZhbHVlICsgJyc7XHJcbiAgICB9XHJcbiAgICBpZiAoaXNDaGVja2VkVHlwZSh0eXBlKSkge1xyXG4gICAgICAgIGlmIChoYXNWYWx1ZSkge1xyXG4gICAgICAgICAgICBkb20udmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbE9yVW5kZWYoY2hlY2tlZCkpIHtcclxuICAgICAgICAgICAgZG9tLmNoZWNrZWQgPSBjaGVja2VkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGlmIChoYXNWYWx1ZSAmJiBkb20udmFsdWUgIT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGRvbS52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICghaW5mZXJub19zaGFyZWRfMS5pc051bGxPclVuZGVmKGNoZWNrZWQpKSB7XHJcbiAgICAgICAgICAgIGRvbS5jaGVja2VkID0gY2hlY2tlZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5hcHBseVZhbHVlID0gYXBwbHlWYWx1ZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGluZmVybm9fc2hhcmVkXzEgPSByZXF1aXJlKFwiaW5mZXJuby1zaGFyZWRcIik7XHJcbnZhciBWTm9kZXNfMSA9IHJlcXVpcmUoXCIuLi8uLi9jb3JlL1ZOb2Rlc1wiKTtcclxudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHNcIik7XHJcbmZ1bmN0aW9uIHVwZGF0ZUNoaWxkT3B0aW9uR3JvdXAodk5vZGUsIHZhbHVlKSB7XHJcbiAgICB2YXIgdHlwZSA9IHZOb2RlLnR5cGU7XHJcbiAgICBpZiAodHlwZSA9PT0gJ29wdGdyb3VwJykge1xyXG4gICAgICAgIHZhciBjaGlsZHJlbiA9IHZOb2RlLmNoaWxkcmVuO1xyXG4gICAgICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzQXJyYXkoY2hpbGRyZW4pKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlQ2hpbGRPcHRpb24oY2hpbGRyZW5baV0sIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChWTm9kZXNfMS5pc1ZOb2RlKGNoaWxkcmVuKSkge1xyXG4gICAgICAgICAgICB1cGRhdGVDaGlsZE9wdGlvbihjaGlsZHJlbiwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHVwZGF0ZUNoaWxkT3B0aW9uKHZOb2RlLCB2YWx1ZSk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gdXBkYXRlQ2hpbGRPcHRpb24odk5vZGUsIHZhbHVlKSB7XHJcbiAgICB2YXIgcHJvcHMgPSB2Tm9kZS5wcm9wcyB8fCB1dGlsc18xLkVNUFRZX09CSjtcclxuICAgIHZhciBkb20gPSB2Tm9kZS5kb207XHJcbiAgICAvLyB3ZSBkbyB0aGlzIGFzIG11bHRpcGxlIG1heSBoYXZlIGNoYW5nZWRcclxuICAgIGRvbS52YWx1ZSA9IHByb3BzLnZhbHVlO1xyXG4gICAgaWYgKChpbmZlcm5vX3NoYXJlZF8xLmlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmluZGV4T2YocHJvcHMudmFsdWUpICE9PSAtMSkgfHwgcHJvcHMudmFsdWUgPT09IHZhbHVlKSB7XHJcbiAgICAgICAgZG9tLnNlbGVjdGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbE9yVW5kZWYodmFsdWUpIHx8ICFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbE9yVW5kZWYocHJvcHMuc2VsZWN0ZWQpKSB7XHJcbiAgICAgICAgZG9tLnNlbGVjdGVkID0gcHJvcHMuc2VsZWN0ZWQgfHwgZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gb25TZWxlY3RDaGFuZ2UoZSkge1xyXG4gICAgdmFyIHZOb2RlID0gdGhpcztcclxuICAgIHZhciBwcm9wcyA9IHZOb2RlLnByb3BzIHx8IHV0aWxzXzEuRU1QVFlfT0JKO1xyXG4gICAgdmFyIGRvbSA9IHZOb2RlLmRvbTtcclxuICAgIHZhciBwcmV2aW91c1ZhbHVlID0gcHJvcHMudmFsdWU7XHJcbiAgICBpZiAocHJvcHMub25DaGFuZ2UpIHtcclxuICAgICAgICB2YXIgZXZlbnRfMSA9IHByb3BzLm9uQ2hhbmdlO1xyXG4gICAgICAgIGlmIChldmVudF8xLmV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50XzEuZXZlbnQoZXZlbnRfMS5kYXRhLCBlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGV2ZW50XzEoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocHJvcHMub25jaGFuZ2UpIHtcclxuICAgICAgICBwcm9wcy5vbmNoYW5nZShlKTtcclxuICAgIH1cclxuICAgIC8vIHRoZSB1c2VyIG1heSBoYXZlIHVwZGF0ZWQgdGhlIHZOb2RlIGZyb20gdGhlIGFib3ZlIG9uSW5wdXQgZXZlbnRzIHN5bmNyb25vdXNseVxyXG4gICAgLy8gc28gd2UgbmVlZCB0byBnZXQgaXQgZnJvbSB0aGUgY29udGV4dCBvZiBgdGhpc2AgYWdhaW5cclxuICAgIHZhciBuZXdWTm9kZSA9IHRoaXM7XHJcbiAgICB2YXIgbmV3UHJvcHMgPSBuZXdWTm9kZS5wcm9wcyB8fCB1dGlsc18xLkVNUFRZX09CSjtcclxuICAgIC8vIElmIHJlbmRlciBpcyBnb2luZyBhc3luYyB0aGVyZSBpcyBubyB2YWx1ZSBjaGFuZ2UgeWV0LCBpdCB3aWxsIGNvbWUgYmFjayB0byBwcm9jZXNzIGlucHV0IHNvb25cclxuICAgIGlmIChwcmV2aW91c1ZhbHVlICE9PSBuZXdQcm9wcy52YWx1ZSkge1xyXG4gICAgICAgIC8vIFdoZW4gdGhpcyBoYXBwZW5zIHdlIG5lZWQgdG8gc3RvcmUgY3VycmVudCBjdXJzb3IgcG9zaXRpb24gYW5kIHJlc3RvcmUgaXQsIHRvIGF2b2lkIGp1bXBpbmdcclxuICAgICAgICBhcHBseVZhbHVlKG5ld1ZOb2RlLCBkb20sIG5ld1Byb3BzLCBmYWxzZSk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gcHJvY2Vzc1NlbGVjdCh2Tm9kZSwgZG9tLCBuZXh0UHJvcHNPckVtcHR5LCBtb3VudGluZywgaXNDb250cm9sbGVkKSB7XHJcbiAgICBhcHBseVZhbHVlKHZOb2RlLCBkb20sIG5leHRQcm9wc09yRW1wdHksIG1vdW50aW5nKTtcclxuICAgIGlmIChtb3VudGluZyAmJiBpc0NvbnRyb2xsZWQpIHtcclxuICAgICAgICBkb20ub25jaGFuZ2UgPSBvblNlbGVjdENoYW5nZS5iaW5kKHZOb2RlKTtcclxuICAgICAgICBkb20ub25jaGFuZ2Uud3JhcHBlZCA9IHRydWU7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5wcm9jZXNzU2VsZWN0ID0gcHJvY2Vzc1NlbGVjdDtcclxuZnVuY3Rpb24gYXBwbHlWYWx1ZSh2Tm9kZSwgZG9tLCBuZXh0UHJvcHNPckVtcHR5LCBtb3VudGluZykge1xyXG4gICAgaWYgKG5leHRQcm9wc09yRW1wdHkubXVsdGlwbGUgIT09IGRvbS5tdWx0aXBsZSkge1xyXG4gICAgICAgIGRvbS5tdWx0aXBsZSA9IG5leHRQcm9wc09yRW1wdHkubXVsdGlwbGU7XHJcbiAgICB9XHJcbiAgICB2YXIgY2hpbGRyZW4gPSB2Tm9kZS5jaGlsZHJlbjtcclxuICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc0ludmFsaWQoY2hpbGRyZW4pKSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gbmV4dFByb3BzT3JFbXB0eS52YWx1ZTtcclxuICAgICAgICBpZiAobW91bnRpbmcgJiYgaW5mZXJub19zaGFyZWRfMS5pc051bGxPclVuZGVmKHZhbHVlKSkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IG5leHRQcm9wc09yRW1wdHkuZGVmYXVsdFZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc0FycmF5KGNoaWxkcmVuKSkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZUNoaWxkT3B0aW9uR3JvdXAoY2hpbGRyZW5baV0sIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChWTm9kZXNfMS5pc1ZOb2RlKGNoaWxkcmVuKSkge1xyXG4gICAgICAgICAgICB1cGRhdGVDaGlsZE9wdGlvbkdyb3VwKGNoaWxkcmVuLCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuYXBwbHlWYWx1ZSA9IGFwcGx5VmFsdWU7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBpbmZlcm5vX3NoYXJlZF8xID0gcmVxdWlyZShcImluZmVybm8tc2hhcmVkXCIpO1xyXG52YXIgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcclxuZnVuY3Rpb24gd3JhcHBlZE9uQ2hhbmdlKGUpIHtcclxuICAgIHZhciBwcm9wcyA9IHRoaXMucHJvcHMgfHwgdXRpbHNfMS5FTVBUWV9PQko7XHJcbiAgICB2YXIgZXZlbnQgPSBwcm9wcy5vbkNoYW5nZTtcclxuICAgIGlmIChldmVudC5ldmVudCkge1xyXG4gICAgICAgIGV2ZW50LmV2ZW50KGV2ZW50LmRhdGEsIGUpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgZXZlbnQoZSk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gb25UZXh0YXJlYUlucHV0Q2hhbmdlKGUpIHtcclxuICAgIHZhciB2Tm9kZSA9IHRoaXM7XHJcbiAgICB2YXIgcHJvcHMgPSB2Tm9kZS5wcm9wcyB8fCB1dGlsc18xLkVNUFRZX09CSjtcclxuICAgIHZhciBwcmV2aW91c1ZhbHVlID0gcHJvcHMudmFsdWU7XHJcbiAgICBpZiAocHJvcHMub25JbnB1dCkge1xyXG4gICAgICAgIHZhciBldmVudF8xID0gcHJvcHMub25JbnB1dDtcclxuICAgICAgICBpZiAoZXZlbnRfMS5ldmVudCkge1xyXG4gICAgICAgICAgICBldmVudF8xLmV2ZW50KGV2ZW50XzEuZGF0YSwgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBldmVudF8xKGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHByb3BzLm9uaW5wdXQpIHtcclxuICAgICAgICBwcm9wcy5vbmlucHV0KGUpO1xyXG4gICAgfVxyXG4gICAgLy8gdGhlIHVzZXIgbWF5IGhhdmUgdXBkYXRlZCB0aGUgdk5vZGUgZnJvbSB0aGUgYWJvdmUgb25JbnB1dCBldmVudHMgc3luY3Jvbm91c2x5XHJcbiAgICAvLyBzbyB3ZSBuZWVkIHRvIGdldCBpdCBmcm9tIHRoZSBjb250ZXh0IG9mIGB0aGlzYCBhZ2FpblxyXG4gICAgdmFyIG5ld1ZOb2RlID0gdGhpcztcclxuICAgIHZhciBuZXdQcm9wcyA9IG5ld1ZOb2RlLnByb3BzIHx8IHV0aWxzXzEuRU1QVFlfT0JKO1xyXG4gICAgLy8gSWYgcmVuZGVyIGlzIGdvaW5nIGFzeW5jIHRoZXJlIGlzIG5vIHZhbHVlIGNoYW5nZSB5ZXQsIGl0IHdpbGwgY29tZSBiYWNrIHRvIHByb2Nlc3MgaW5wdXQgc29vblxyXG4gICAgaWYgKHByZXZpb3VzVmFsdWUgIT09IG5ld1Byb3BzLnZhbHVlKSB7XHJcbiAgICAgICAgLy8gV2hlbiB0aGlzIGhhcHBlbnMgd2UgbmVlZCB0byBzdG9yZSBjdXJyZW50IGN1cnNvciBwb3NpdGlvbiBhbmQgcmVzdG9yZSBpdCwgdG8gYXZvaWQganVtcGluZ1xyXG4gICAgICAgIGFwcGx5VmFsdWUobmV3Vk5vZGUsIHZOb2RlLmRvbSwgZmFsc2UpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHByb2Nlc3NUZXh0YXJlYSh2Tm9kZSwgZG9tLCBuZXh0UHJvcHNPckVtcHR5LCBtb3VudGluZywgaXNDb250cm9sbGVkKSB7XHJcbiAgICBhcHBseVZhbHVlKG5leHRQcm9wc09yRW1wdHksIGRvbSwgbW91bnRpbmcpO1xyXG4gICAgaWYgKG1vdW50aW5nICYmIGlzQ29udHJvbGxlZCkge1xyXG4gICAgICAgIGRvbS5vbmlucHV0ID0gb25UZXh0YXJlYUlucHV0Q2hhbmdlLmJpbmQodk5vZGUpO1xyXG4gICAgICAgIGRvbS5vbmlucHV0LndyYXBwZWQgPSB0cnVlO1xyXG4gICAgICAgIGlmIChuZXh0UHJvcHNPckVtcHR5Lm9uQ2hhbmdlKSB7XHJcbiAgICAgICAgICAgIGRvbS5vbmNoYW5nZSA9IHdyYXBwZWRPbkNoYW5nZS5iaW5kKHZOb2RlKTtcclxuICAgICAgICAgICAgZG9tLm9uY2hhbmdlLndyYXBwZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLnByb2Nlc3NUZXh0YXJlYSA9IHByb2Nlc3NUZXh0YXJlYTtcclxuZnVuY3Rpb24gYXBwbHlWYWx1ZShuZXh0UHJvcHNPckVtcHR5LCBkb20sIG1vdW50aW5nKSB7XHJcbiAgICB2YXIgdmFsdWUgPSBuZXh0UHJvcHNPckVtcHR5LnZhbHVlO1xyXG4gICAgdmFyIGRvbVZhbHVlID0gZG9tLnZhbHVlO1xyXG4gICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNOdWxsT3JVbmRlZih2YWx1ZSkpIHtcclxuICAgICAgICBpZiAobW91bnRpbmcpIHtcclxuICAgICAgICAgICAgdmFyIGRlZmF1bHRWYWx1ZSA9IG5leHRQcm9wc09yRW1wdHkuZGVmYXVsdFZhbHVlO1xyXG4gICAgICAgICAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNOdWxsT3JVbmRlZihkZWZhdWx0VmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdFZhbHVlICE9PSBkb21WYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbS52YWx1ZSA9IGRlZmF1bHRWYWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChkb21WYWx1ZSAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIGRvbS52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgLyogVGhlcmUgaXMgdmFsdWUgc28ga2VlcCBpdCBjb250cm9sbGVkICovXHJcbiAgICAgICAgaWYgKGRvbVZhbHVlICE9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICBkb20udmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5hcHBseVZhbHVlID0gYXBwbHlWYWx1ZTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIElucHV0V3JhcHBlcl8xID0gcmVxdWlyZShcIi4vSW5wdXRXcmFwcGVyXCIpO1xyXG52YXIgU2VsZWN0V3JhcHBlcl8xID0gcmVxdWlyZShcIi4vU2VsZWN0V3JhcHBlclwiKTtcclxudmFyIFRleHRhcmVhV3JhcHBlcl8xID0gcmVxdWlyZShcIi4vVGV4dGFyZWFXcmFwcGVyXCIpO1xyXG52YXIgaW5mZXJub19zaGFyZWRfMSA9IHJlcXVpcmUoXCJpbmZlcm5vLXNoYXJlZFwiKTtcclxuLyoqXHJcbiAqIFRoZXJlIGlzIGN1cnJlbnRseSBubyBzdXBwb3J0IGZvciBzd2l0Y2hpbmcgc2FtZSBpbnB1dCBiZXR3ZWVuIGNvbnRyb2xsZWQgYW5kIG5vbkNvbnRyb2xsZWRcclxuICogSWYgdGhhdCBldmVyIGJlY29tZXMgYSByZWFsIGlzc3VlLCB0aGVuIHJlIGRlc2lnbiBjb250cm9sbGVkIGVsZW1lbnRzXHJcbiAqIEN1cnJlbnRseSB1c2VyIG11c3QgY2hvb3NlIGVpdGhlciBjb250cm9sbGVkIG9yIG5vbi1jb250cm9sbGVkIGFuZCBzdGljayB3aXRoIHRoYXRcclxuICovXHJcbmZ1bmN0aW9uIHByb2Nlc3NFbGVtZW50KGZsYWdzLCB2Tm9kZSwgZG9tLCBuZXh0UHJvcHNPckVtcHR5LCBtb3VudGluZywgaXNDb250cm9sbGVkKSB7XHJcbiAgICBpZiAoZmxhZ3MgJiA1MTIgLyogSW5wdXRFbGVtZW50ICovKSB7XHJcbiAgICAgICAgSW5wdXRXcmFwcGVyXzEucHJvY2Vzc0lucHV0KHZOb2RlLCBkb20sIG5leHRQcm9wc09yRW1wdHksIG1vdW50aW5nLCBpc0NvbnRyb2xsZWQpO1xyXG4gICAgfVxyXG4gICAgaWYgKGZsYWdzICYgMjA0OCAvKiBTZWxlY3RFbGVtZW50ICovKSB7XHJcbiAgICAgICAgU2VsZWN0V3JhcHBlcl8xLnByb2Nlc3NTZWxlY3Qodk5vZGUsIGRvbSwgbmV4dFByb3BzT3JFbXB0eSwgbW91bnRpbmcsIGlzQ29udHJvbGxlZCk7XHJcbiAgICB9XHJcbiAgICBpZiAoZmxhZ3MgJiAxMDI0IC8qIFRleHRhcmVhRWxlbWVudCAqLykge1xyXG4gICAgICAgIFRleHRhcmVhV3JhcHBlcl8xLnByb2Nlc3NUZXh0YXJlYSh2Tm9kZSwgZG9tLCBuZXh0UHJvcHNPckVtcHR5LCBtb3VudGluZywgaXNDb250cm9sbGVkKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLnByb2Nlc3NFbGVtZW50ID0gcHJvY2Vzc0VsZW1lbnQ7XHJcbmZ1bmN0aW9uIGlzQ29udHJvbGxlZEZvcm1FbGVtZW50KG5leHRQcm9wc09yRW1wdHkpIHtcclxuICAgIHJldHVybiAobmV4dFByb3BzT3JFbXB0eS50eXBlICYmIElucHV0V3JhcHBlcl8xLmlzQ2hlY2tlZFR5cGUobmV4dFByb3BzT3JFbXB0eS50eXBlKSkgPyAhaW5mZXJub19zaGFyZWRfMS5pc051bGxPclVuZGVmKG5leHRQcm9wc09yRW1wdHkuY2hlY2tlZCkgOiAhaW5mZXJub19zaGFyZWRfMS5pc051bGxPclVuZGVmKG5leHRQcm9wc09yRW1wdHkudmFsdWUpO1xyXG59XHJcbmV4cG9ydHMuaXNDb250cm9sbGVkRm9ybUVsZW1lbnQgPSBpc0NvbnRyb2xsZWRGb3JtRWxlbWVudDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGluZmVybm9fc2hhcmVkXzEgPSByZXF1aXJlKFwiaW5mZXJuby1zaGFyZWRcIik7XHJcbnZhciBvcHRpb25zXzEgPSByZXF1aXJlKFwiLi4vY29yZS9vcHRpb25zXCIpO1xyXG52YXIgY29uc3RhbnRzXzEgPSByZXF1aXJlKFwiLi9jb25zdGFudHNcIik7XHJcbnZhciBtb3VudGluZ18xID0gcmVxdWlyZShcIi4vbW91bnRpbmdcIik7XHJcbnZhciBwYXRjaGluZ18xID0gcmVxdWlyZShcIi4vcGF0Y2hpbmdcIik7XHJcbnZhciByZW5kZXJpbmdfMSA9IHJlcXVpcmUoXCIuL3JlbmRlcmluZ1wiKTtcclxudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcclxudmFyIHByb2Nlc3NFbGVtZW50XzEgPSByZXF1aXJlKFwiLi93cmFwcGVycy9wcm9jZXNzRWxlbWVudFwiKTtcclxuZnVuY3Rpb24gbm9ybWFsaXplQ2hpbGROb2RlcyhwYXJlbnREb20pIHtcclxuICAgIHZhciBkb20gPSBwYXJlbnREb20uZmlyc3RDaGlsZDtcclxuICAgIHdoaWxlIChkb20pIHtcclxuICAgICAgICBpZiAoZG9tLm5vZGVUeXBlID09PSA4KSB7XHJcbiAgICAgICAgICAgIGlmIChkb20uZGF0YSA9PT0gJyEnKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGxhY2Vob2xkZXIgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnREb20ucmVwbGFjZUNoaWxkKHBsYWNlaG9sZGVyLCBkb20pO1xyXG4gICAgICAgICAgICAgICAgZG9tID0gZG9tLm5leHRTaWJsaW5nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxhc3REb20gPSBkb20ucHJldmlvdXNTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgcGFyZW50RG9tLnJlbW92ZUNoaWxkKGRvbSk7XHJcbiAgICAgICAgICAgICAgICBkb20gPSBsYXN0RG9tIHx8IHBhcmVudERvbS5maXJzdENoaWxkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkb20gPSBkb20ubmV4dFNpYmxpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMubm9ybWFsaXplQ2hpbGROb2RlcyA9IG5vcm1hbGl6ZUNoaWxkTm9kZXM7XHJcbmZ1bmN0aW9uIGh5ZHJhdGVDb21wb25lbnQodk5vZGUsIGRvbSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRywgaXNDbGFzcykge1xyXG4gICAgdmFyIHR5cGUgPSB2Tm9kZS50eXBlO1xyXG4gICAgdmFyIHJlZiA9IHZOb2RlLnJlZjtcclxuICAgIHZOb2RlLmRvbSA9IGRvbTtcclxuICAgIHZhciBwcm9wcyA9IHZOb2RlLnByb3BzIHx8IHV0aWxzXzEuRU1QVFlfT0JKO1xyXG4gICAgaWYgKGlzQ2xhc3MpIHtcclxuICAgICAgICB2YXIgX2lzU1ZHID0gZG9tLm5hbWVzcGFjZVVSSSA9PT0gY29uc3RhbnRzXzEuc3ZnTlM7XHJcbiAgICAgICAgdmFyIGluc3RhbmNlID0gdXRpbHNfMS5jcmVhdGVDbGFzc0NvbXBvbmVudEluc3RhbmNlKHZOb2RlLCB0eXBlLCBwcm9wcywgY29udGV4dCwgX2lzU1ZHLCBsaWZlY3ljbGUpO1xyXG4gICAgICAgIHZhciBpbnB1dCA9IGluc3RhbmNlLl9sYXN0SW5wdXQ7XHJcbiAgICAgICAgaW5zdGFuY2UuX3ZDb21wb25lbnQgPSB2Tm9kZTtcclxuICAgICAgICBpbnN0YW5jZS5fdk5vZGUgPSB2Tm9kZTtcclxuICAgICAgICBoeWRyYXRlKGlucHV0LCBkb20sIGxpZmVjeWNsZSwgaW5zdGFuY2UuX2NoaWxkQ29udGV4dCwgX2lzU1ZHKTtcclxuICAgICAgICBtb3VudGluZ18xLm1vdW50Q2xhc3NDb21wb25lbnRDYWxsYmFja3Modk5vZGUsIHJlZiwgaW5zdGFuY2UsIGxpZmVjeWNsZSk7XHJcbiAgICAgICAgaW5zdGFuY2UuX3VwZGF0aW5nID0gZmFsc2U7IC8vIE1vdW50IGZpbmlzaGVkIGFsbG93IGdvaW5nIHN5bmNcclxuICAgICAgICBvcHRpb25zXzEuZGVmYXVsdC5maW5kRE9NTm9kZUVuYWJsZWQgJiYgcmVuZGVyaW5nXzEuY29tcG9uZW50VG9ET01Ob2RlTWFwLnNldChpbnN0YW5jZSwgZG9tKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHZhciBpbnB1dCA9IHV0aWxzXzEuY3JlYXRlRnVuY3Rpb25hbENvbXBvbmVudElucHV0KHZOb2RlLCB0eXBlLCBwcm9wcywgY29udGV4dCk7XHJcbiAgICAgICAgaHlkcmF0ZShpbnB1dCwgZG9tLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHKTtcclxuICAgICAgICB2Tm9kZS5jaGlsZHJlbiA9IGlucHV0O1xyXG4gICAgICAgIHZOb2RlLmRvbSA9IGlucHV0LmRvbTtcclxuICAgICAgICBtb3VudGluZ18xLm1vdW50RnVuY3Rpb25hbENvbXBvbmVudENhbGxiYWNrcyhyZWYsIGRvbSwgbGlmZWN5Y2xlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBkb207XHJcbn1cclxuZnVuY3Rpb24gaHlkcmF0ZUVsZW1lbnQodk5vZGUsIGRvbSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRykge1xyXG4gICAgdmFyIGNoaWxkcmVuID0gdk5vZGUuY2hpbGRyZW47XHJcbiAgICB2YXIgcHJvcHMgPSB2Tm9kZS5wcm9wcztcclxuICAgIHZhciBjbGFzc05hbWUgPSB2Tm9kZS5jbGFzc05hbWU7XHJcbiAgICB2YXIgZmxhZ3MgPSB2Tm9kZS5mbGFncztcclxuICAgIHZhciByZWYgPSB2Tm9kZS5yZWY7XHJcbiAgICBpZiAoaXNTVkcgfHwgKGZsYWdzICYgMTI4IC8qIFN2Z0VsZW1lbnQgKi8pKSB7XHJcbiAgICAgICAgaXNTVkcgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKGRvbS5ub2RlVHlwZSAhPT0gMSB8fCBkb20udGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSB2Tm9kZS50eXBlKSB7XHJcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcclxuICAgICAgICAgICAgaW5mZXJub19zaGFyZWRfMS53YXJuaW5nKCdJbmZlcm5vIGh5ZHJhdGlvbjogU2VydmVyLXNpZGUgbWFya3VwIGRvZXNuXFwndCBtYXRjaCBjbGllbnQtc2lkZSBtYXJrdXAgb3IgSW5pdGlhbCByZW5kZXIgdGFyZ2V0IGlzIG5vdCBlbXB0eScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbmV3RG9tID0gbW91bnRpbmdfMS5tb3VudEVsZW1lbnQodk5vZGUsIG51bGwsIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcpO1xyXG4gICAgICAgIHZOb2RlLmRvbSA9IG5ld0RvbTtcclxuICAgICAgICB1dGlsc18xLnJlcGxhY2VDaGlsZChkb20ucGFyZW50Tm9kZSwgbmV3RG9tLCBkb20pO1xyXG4gICAgICAgIHJldHVybiBuZXdEb207XHJcbiAgICB9XHJcbiAgICB2Tm9kZS5kb20gPSBkb207XHJcbiAgICBpZiAoY2hpbGRyZW4pIHtcclxuICAgICAgICBoeWRyYXRlQ2hpbGRyZW4oY2hpbGRyZW4sIGRvbSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRyk7XHJcbiAgICB9XHJcbiAgICBpZiAocHJvcHMpIHtcclxuICAgICAgICB2YXIgaGFzQ29udHJvbGxlZFZhbHVlID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIGlzRm9ybUVsZW1lbnQgPSAoZmxhZ3MgJiAzNTg0IC8qIEZvcm1FbGVtZW50ICovKSA+IDA7XHJcbiAgICAgICAgaWYgKGlzRm9ybUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgaGFzQ29udHJvbGxlZFZhbHVlID0gcHJvY2Vzc0VsZW1lbnRfMS5pc0NvbnRyb2xsZWRGb3JtRWxlbWVudChwcm9wcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gcHJvcHMpIHtcclxuICAgICAgICAgICAgLy8gZG8gbm90IGFkZCBhIGhhc093blByb3BlcnR5IGNoZWNrIGhlcmUsIGl0IGFmZmVjdHMgcGVyZm9ybWFuY2VcclxuICAgICAgICAgICAgcGF0Y2hpbmdfMS5wYXRjaFByb3AocHJvcCwgbnVsbCwgcHJvcHNbcHJvcF0sIGRvbSwgaXNTVkcsIGhhc0NvbnRyb2xsZWRWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc0Zvcm1FbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHByb2Nlc3NFbGVtZW50XzEucHJvY2Vzc0VsZW1lbnQoZmxhZ3MsIHZOb2RlLCBkb20sIHByb3BzLCB0cnVlLCBoYXNDb250cm9sbGVkVmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbE9yVW5kZWYoY2xhc3NOYW1lKSkge1xyXG4gICAgICAgIGRvbS5yZW1vdmVBdHRyaWJ1dGUoJ2NsYXNzJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBpZiAoaXNTVkcpIHtcclxuICAgICAgICAgICAgZG9tLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBjbGFzc05hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZG9tLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAocmVmKSB7XHJcbiAgICAgICAgbW91bnRpbmdfMS5tb3VudFJlZihkb20sIHJlZiwgbGlmZWN5Y2xlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBkb207XHJcbn1cclxuZnVuY3Rpb24gaHlkcmF0ZUNoaWxkcmVuKGNoaWxkcmVuLCBwYXJlbnREb20sIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcpIHtcclxuICAgIG5vcm1hbGl6ZUNoaWxkTm9kZXMocGFyZW50RG9tKTtcclxuICAgIHZhciBkb20gPSBwYXJlbnREb20uZmlyc3RDaGlsZDtcclxuICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzQXJyYXkoY2hpbGRyZW4pKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNoaWxkcmVuLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNOdWxsKGNoaWxkKSAmJiBpbmZlcm5vX3NoYXJlZF8xLmlzT2JqZWN0KGNoaWxkKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRvbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbSA9IGh5ZHJhdGUoY2hpbGQsIGRvbSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9tID0gZG9tLm5leHRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW91bnRpbmdfMS5tb3VudChjaGlsZCwgcGFyZW50RG9tLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNTdHJpbmdPck51bWJlcihjaGlsZHJlbikpIHtcclxuICAgICAgICBpZiAoZG9tICYmIGRvbS5ub2RlVHlwZSA9PT0gMykge1xyXG4gICAgICAgICAgICBpZiAoZG9tLm5vZGVWYWx1ZSAhPT0gY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgIGRvbS5ub2RlVmFsdWUgPSBjaGlsZHJlbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjaGlsZHJlbikge1xyXG4gICAgICAgICAgICBwYXJlbnREb20udGV4dENvbnRlbnQgPSBjaGlsZHJlbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZG9tID0gZG9tLm5leHRTaWJsaW5nO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaW5mZXJub19zaGFyZWRfMS5pc09iamVjdChjaGlsZHJlbikpIHtcclxuICAgICAgICBoeWRyYXRlKGNoaWxkcmVuLCBkb20sIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcpO1xyXG4gICAgICAgIGRvbSA9IGRvbS5uZXh0U2libGluZztcclxuICAgIH1cclxuICAgIC8vIGNsZWFyIGFueSBvdGhlciBET00gbm9kZXMsIHRoZXJlIHNob3VsZCBiZSBvbmx5IGEgc2luZ2xlIGVudHJ5IGZvciB0aGUgcm9vdFxyXG4gICAgd2hpbGUgKGRvbSkge1xyXG4gICAgICAgIHZhciBuZXh0U2libGluZyA9IGRvbS5uZXh0U2libGluZztcclxuICAgICAgICBwYXJlbnREb20ucmVtb3ZlQ2hpbGQoZG9tKTtcclxuICAgICAgICBkb20gPSBuZXh0U2libGluZztcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBoeWRyYXRlVGV4dCh2Tm9kZSwgZG9tKSB7XHJcbiAgICBpZiAoZG9tLm5vZGVUeXBlICE9PSAzKSB7XHJcbiAgICAgICAgdmFyIG5ld0RvbSA9IG1vdW50aW5nXzEubW91bnRUZXh0KHZOb2RlLCBudWxsKTtcclxuICAgICAgICB2Tm9kZS5kb20gPSBuZXdEb207XHJcbiAgICAgICAgdXRpbHNfMS5yZXBsYWNlQ2hpbGQoZG9tLnBhcmVudE5vZGUsIG5ld0RvbSwgZG9tKTtcclxuICAgICAgICByZXR1cm4gbmV3RG9tO1xyXG4gICAgfVxyXG4gICAgdmFyIHRleHQgPSB2Tm9kZS5jaGlsZHJlbjtcclxuICAgIGlmIChkb20ubm9kZVZhbHVlICE9PSB0ZXh0KSB7XHJcbiAgICAgICAgZG9tLm5vZGVWYWx1ZSA9IHRleHQ7XHJcbiAgICB9XHJcbiAgICB2Tm9kZS5kb20gPSBkb207XHJcbiAgICByZXR1cm4gZG9tO1xyXG59XHJcbmZ1bmN0aW9uIGh5ZHJhdGVWb2lkKHZOb2RlLCBkb20pIHtcclxuICAgIHZOb2RlLmRvbSA9IGRvbTtcclxuICAgIHJldHVybiBkb207XHJcbn1cclxuZnVuY3Rpb24gaHlkcmF0ZSh2Tm9kZSwgZG9tLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHKSB7XHJcbiAgICB2YXIgZmxhZ3MgPSB2Tm9kZS5mbGFncztcclxuICAgIGlmIChmbGFncyAmIDI4IC8qIENvbXBvbmVudCAqLykge1xyXG4gICAgICAgIHJldHVybiBoeWRyYXRlQ29tcG9uZW50KHZOb2RlLCBkb20sIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcsIGZsYWdzICYgNCAvKiBDb21wb25lbnRDbGFzcyAqLyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChmbGFncyAmIDM5NzAgLyogRWxlbWVudCAqLykge1xyXG4gICAgICAgIHJldHVybiBoeWRyYXRlRWxlbWVudCh2Tm9kZSwgZG9tLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGZsYWdzICYgMSAvKiBUZXh0ICovKSB7XHJcbiAgICAgICAgcmV0dXJuIGh5ZHJhdGVUZXh0KHZOb2RlLCBkb20pO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZmxhZ3MgJiA0MDk2IC8qIFZvaWQgKi8pIHtcclxuICAgICAgICByZXR1cm4gaHlkcmF0ZVZvaWQodk5vZGUsIGRvbSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xyXG4gICAgICAgICAgICBpbmZlcm5vX3NoYXJlZF8xLnRocm93RXJyb3IoXCJoeWRyYXRlKCkgZXhwZWN0cyBhIHZhbGlkIFZOb2RlLCBpbnN0ZWFkIGl0IHJlY2VpdmVkIGFuIG9iamVjdCB3aXRoIHRoZSB0eXBlIFxcXCJcIiArIHR5cGVvZiB2Tm9kZSArIFwiXFxcIi5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZmVybm9fc2hhcmVkXzEudGhyb3dFcnJvcigpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGh5ZHJhdGVSb290KGlucHV0LCBwYXJlbnREb20sIGxpZmVjeWNsZSkge1xyXG4gICAgdmFyIGRvbSA9IHBhcmVudERvbSAmJiBwYXJlbnREb20uZmlyc3RDaGlsZDtcclxuICAgIGlmIChkb20pIHtcclxuICAgICAgICBoeWRyYXRlKGlucHV0LCBkb20sIGxpZmVjeWNsZSwgdXRpbHNfMS5FTVBUWV9PQkosIGZhbHNlKTtcclxuICAgICAgICBkb20gPSBwYXJlbnREb20uZmlyc3RDaGlsZDtcclxuICAgICAgICAvLyBjbGVhciBhbnkgb3RoZXIgRE9NIG5vZGVzLCB0aGVyZSBzaG91bGQgYmUgb25seSBhIHNpbmdsZSBlbnRyeSBmb3IgdGhlIHJvb3RcclxuICAgICAgICB3aGlsZSAoZG9tID0gZG9tLm5leHRTaWJsaW5nKSB7XHJcbiAgICAgICAgICAgIHBhcmVudERvbS5yZW1vdmVDaGlsZChkb20pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBoeWRyYXRlUm9vdDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGluZmVybm9fc2hhcmVkXzEgPSByZXF1aXJlKFwiaW5mZXJuby1zaGFyZWRcIik7XHJcbnZhciBwYXRjaGluZ18xID0gcmVxdWlyZShcIi4vcGF0Y2hpbmdcIik7XHJcbnZhciBjb21wb25lbnRQb29scyA9IG5ldyBNYXAoKTtcclxudmFyIGVsZW1lbnRQb29scyA9IG5ldyBNYXAoKTtcclxuZnVuY3Rpb24gcmVjeWNsZUVsZW1lbnQodk5vZGUsIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcpIHtcclxuICAgIHZhciB0YWcgPSB2Tm9kZS50eXBlO1xyXG4gICAgdmFyIHBvb2xzID0gZWxlbWVudFBvb2xzLmdldCh0YWcpO1xyXG4gICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzVW5kZWZpbmVkKHBvb2xzKSkge1xyXG4gICAgICAgIHZhciBrZXkgPSB2Tm9kZS5rZXk7XHJcbiAgICAgICAgdmFyIHBvb2wgPSBrZXkgPT09IG51bGwgPyBwb29scy5ub25LZXllZCA6IHBvb2xzLmtleWVkLmdldChrZXkpO1xyXG4gICAgICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc1VuZGVmaW5lZChwb29sKSkge1xyXG4gICAgICAgICAgICB2YXIgcmVjeWNsZWRWTm9kZSA9IHBvb2wucG9wKCk7XHJcbiAgICAgICAgICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc1VuZGVmaW5lZChyZWN5Y2xlZFZOb2RlKSkge1xyXG4gICAgICAgICAgICAgICAgcGF0Y2hpbmdfMS5wYXRjaEVsZW1lbnQocmVjeWNsZWRWTm9kZSwgdk5vZGUsIG51bGwsIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZOb2RlLmRvbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59XHJcbmV4cG9ydHMucmVjeWNsZUVsZW1lbnQgPSByZWN5Y2xlRWxlbWVudDtcclxuZnVuY3Rpb24gcG9vbEVsZW1lbnQodk5vZGUpIHtcclxuICAgIHZhciB0YWcgPSB2Tm9kZS50eXBlO1xyXG4gICAgdmFyIGtleSA9IHZOb2RlLmtleTtcclxuICAgIHZhciBwb29scyA9IGVsZW1lbnRQb29scy5nZXQodGFnKTtcclxuICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzVW5kZWZpbmVkKHBvb2xzKSkge1xyXG4gICAgICAgIHBvb2xzID0ge1xyXG4gICAgICAgICAgICBub25LZXllZDogW10sXHJcbiAgICAgICAgICAgIGtleWVkOiBuZXcgTWFwKClcclxuICAgICAgICB9O1xyXG4gICAgICAgIGVsZW1lbnRQb29scy5zZXQodGFnLCBwb29scyk7XHJcbiAgICB9XHJcbiAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc051bGwoa2V5KSkge1xyXG4gICAgICAgIHBvb2xzLm5vbktleWVkLnB1c2godk5vZGUpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdmFyIHBvb2wgPSBwb29scy5rZXllZC5nZXQoa2V5KTtcclxuICAgICAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc1VuZGVmaW5lZChwb29sKSkge1xyXG4gICAgICAgICAgICBwb29sID0gW107XHJcbiAgICAgICAgICAgIHBvb2xzLmtleWVkLnNldChrZXksIHBvb2wpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwb29sLnB1c2godk5vZGUpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMucG9vbEVsZW1lbnQgPSBwb29sRWxlbWVudDtcclxuZnVuY3Rpb24gcmVjeWNsZUNvbXBvbmVudCh2Tm9kZSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRykge1xyXG4gICAgdmFyIHR5cGUgPSB2Tm9kZS50eXBlO1xyXG4gICAgdmFyIHBvb2xzID0gY29tcG9uZW50UG9vbHMuZ2V0KHR5cGUpO1xyXG4gICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzVW5kZWZpbmVkKHBvb2xzKSkge1xyXG4gICAgICAgIHZhciBrZXkgPSB2Tm9kZS5rZXk7XHJcbiAgICAgICAgdmFyIHBvb2wgPSBrZXkgPT09IG51bGwgPyBwb29scy5ub25LZXllZCA6IHBvb2xzLmtleWVkLmdldChrZXkpO1xyXG4gICAgICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc1VuZGVmaW5lZChwb29sKSkge1xyXG4gICAgICAgICAgICB2YXIgcmVjeWNsZWRWTm9kZSA9IHBvb2wucG9wKCk7XHJcbiAgICAgICAgICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc1VuZGVmaW5lZChyZWN5Y2xlZFZOb2RlKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGZsYWdzID0gdk5vZGUuZmxhZ3M7XHJcbiAgICAgICAgICAgICAgICB2YXIgZmFpbGVkID0gcGF0Y2hpbmdfMS5wYXRjaENvbXBvbmVudChyZWN5Y2xlZFZOb2RlLCB2Tm9kZSwgbnVsbCwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRywgZmxhZ3MgJiA0IC8qIENvbXBvbmVudENsYXNzICovLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIGlmICghZmFpbGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZOb2RlLmRvbTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59XHJcbmV4cG9ydHMucmVjeWNsZUNvbXBvbmVudCA9IHJlY3ljbGVDb21wb25lbnQ7XHJcbmZ1bmN0aW9uIHBvb2xDb21wb25lbnQodk5vZGUpIHtcclxuICAgIHZhciBob29rcyA9IHZOb2RlLnJlZjtcclxuICAgIHZhciBub25SZWN5Y2xlSG9va3MgPSBob29rcyAmJiAoaG9va3Mub25Db21wb25lbnRXaWxsTW91bnQgfHxcclxuICAgICAgICBob29rcy5vbkNvbXBvbmVudFdpbGxVbm1vdW50IHx8XHJcbiAgICAgICAgaG9va3Mub25Db21wb25lbnREaWRNb3VudCB8fFxyXG4gICAgICAgIGhvb2tzLm9uQ29tcG9uZW50V2lsbFVwZGF0ZSB8fFxyXG4gICAgICAgIGhvb2tzLm9uQ29tcG9uZW50RGlkVXBkYXRlKTtcclxuICAgIGlmIChub25SZWN5Y2xlSG9va3MpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB2YXIgdHlwZSA9IHZOb2RlLnR5cGU7XHJcbiAgICB2YXIga2V5ID0gdk5vZGUua2V5O1xyXG4gICAgdmFyIHBvb2xzID0gY29tcG9uZW50UG9vbHMuZ2V0KHR5cGUpO1xyXG4gICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNVbmRlZmluZWQocG9vbHMpKSB7XHJcbiAgICAgICAgcG9vbHMgPSB7XHJcbiAgICAgICAgICAgIG5vbktleWVkOiBbXSxcclxuICAgICAgICAgICAga2V5ZWQ6IG5ldyBNYXAoKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29tcG9uZW50UG9vbHMuc2V0KHR5cGUsIHBvb2xzKTtcclxuICAgIH1cclxuICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbChrZXkpKSB7XHJcbiAgICAgICAgcG9vbHMubm9uS2V5ZWQucHVzaCh2Tm9kZSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB2YXIgcG9vbCA9IHBvb2xzLmtleWVkLmdldChrZXkpO1xyXG4gICAgICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzVW5kZWZpbmVkKHBvb2wpKSB7XHJcbiAgICAgICAgICAgIHBvb2wgPSBbXTtcclxuICAgICAgICAgICAgcG9vbHMua2V5ZWQuc2V0KGtleSwgcG9vbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBvb2wucHVzaCh2Tm9kZSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5wb29sQ29tcG9uZW50ID0gcG9vbENvbXBvbmVudDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGluZmVybm9fc2hhcmVkXzEgPSByZXF1aXJlKFwiaW5mZXJuby1zaGFyZWRcIik7XHJcbnZhciBvcHRpb25zXzEgPSByZXF1aXJlKFwiLi4vY29yZS9vcHRpb25zXCIpO1xyXG52YXIgcGF0Y2hpbmdfMSA9IHJlcXVpcmUoXCIuL3BhdGNoaW5nXCIpO1xyXG52YXIgcmVjeWNsaW5nXzEgPSByZXF1aXJlKFwiLi9yZWN5Y2xpbmdcIik7XHJcbnZhciByZW5kZXJpbmdfMSA9IHJlcXVpcmUoXCIuL3JlbmRlcmluZ1wiKTtcclxudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcclxuZnVuY3Rpb24gdW5tb3VudCh2Tm9kZSwgcGFyZW50RG9tLCBsaWZlY3ljbGUsIGNhblJlY3ljbGUsIGlzUmVjeWNsaW5nKSB7XHJcbiAgICB2YXIgZmxhZ3MgPSB2Tm9kZS5mbGFncztcclxuICAgIGlmIChmbGFncyAmIDI4IC8qIENvbXBvbmVudCAqLykge1xyXG4gICAgICAgIHVubW91bnRDb21wb25lbnQodk5vZGUsIHBhcmVudERvbSwgbGlmZWN5Y2xlLCBjYW5SZWN5Y2xlLCBpc1JlY3ljbGluZyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChmbGFncyAmIDM5NzAgLyogRWxlbWVudCAqLykge1xyXG4gICAgICAgIHVubW91bnRFbGVtZW50KHZOb2RlLCBwYXJlbnREb20sIGxpZmVjeWNsZSwgY2FuUmVjeWNsZSwgaXNSZWN5Y2xpbmcpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZmxhZ3MgJiAoMSAvKiBUZXh0ICovIHwgNDA5NiAvKiBWb2lkICovKSkge1xyXG4gICAgICAgIHVubW91bnRWb2lkT3JUZXh0KHZOb2RlLCBwYXJlbnREb20pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMudW5tb3VudCA9IHVubW91bnQ7XHJcbmZ1bmN0aW9uIHVubW91bnRWb2lkT3JUZXh0KHZOb2RlLCBwYXJlbnREb20pIHtcclxuICAgIGlmIChwYXJlbnREb20pIHtcclxuICAgICAgICB1dGlsc18xLnJlbW92ZUNoaWxkKHBhcmVudERvbSwgdk5vZGUuZG9tKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiB1bm1vdW50Q29tcG9uZW50KHZOb2RlLCBwYXJlbnREb20sIGxpZmVjeWNsZSwgY2FuUmVjeWNsZSwgaXNSZWN5Y2xpbmcpIHtcclxuICAgIHZhciBpbnN0YW5jZSA9IHZOb2RlLmNoaWxkcmVuO1xyXG4gICAgdmFyIGZsYWdzID0gdk5vZGUuZmxhZ3M7XHJcbiAgICB2YXIgaXNTdGF0ZWZ1bENvbXBvbmVudCA9IGZsYWdzICYgNCAvKiBDb21wb25lbnRDbGFzcyAqLztcclxuICAgIHZhciByZWYgPSB2Tm9kZS5yZWY7XHJcbiAgICB2YXIgZG9tID0gdk5vZGUuZG9tO1xyXG4gICAgaWYgKCFpc1JlY3ljbGluZykge1xyXG4gICAgICAgIGlmIChpc1N0YXRlZnVsQ29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgIGlmICghaW5zdGFuY2UuX3VubW91bnRlZCkge1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuX2Jsb2NrU2V0U3RhdGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uc18xLmRlZmF1bHQuYmVmb3JlVW5tb3VudCAmJiBvcHRpb25zXzEuZGVmYXVsdC5iZWZvcmVVbm1vdW50KHZOb2RlKTtcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlLmNvbXBvbmVudFdpbGxVbm1vdW50ICYmIGluc3RhbmNlLmNvbXBvbmVudFdpbGxVbm1vdW50KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVmICYmICFpc1JlY3ljbGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZihudWxsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGluc3RhbmNlLl91bm1vdW50ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uc18xLmRlZmF1bHQuZmluZERPTU5vZGVFbmFibGVkICYmIHJlbmRlcmluZ18xLmNvbXBvbmVudFRvRE9NTm9kZU1hcC5kZWxldGUoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgdW5tb3VudChpbnN0YW5jZS5fbGFzdElucHV0LCBudWxsLCBpbnN0YW5jZS5fbGlmZWN5Y2xlLCBmYWxzZSwgaXNSZWN5Y2xpbmcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNOdWxsT3JVbmRlZihyZWYpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNOdWxsT3JVbmRlZihyZWYub25Db21wb25lbnRXaWxsVW5tb3VudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWYub25Db21wb25lbnRXaWxsVW5tb3VudChkb20pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHVubW91bnQoaW5zdGFuY2UsIG51bGwsIGxpZmVjeWNsZSwgZmFsc2UsIGlzUmVjeWNsaW5nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAocGFyZW50RG9tKSB7XHJcbiAgICAgICAgdmFyIGxhc3RJbnB1dCA9IGluc3RhbmNlLl9sYXN0SW5wdXQ7XHJcbiAgICAgICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNOdWxsT3JVbmRlZihsYXN0SW5wdXQpKSB7XHJcbiAgICAgICAgICAgIGxhc3RJbnB1dCA9IGluc3RhbmNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB1dGlsc18xLnJlbW92ZUNoaWxkKHBhcmVudERvbSwgZG9tKTtcclxuICAgIH1cclxuICAgIGlmIChvcHRpb25zXzEuZGVmYXVsdC5yZWN5Y2xpbmdFbmFibGVkICYmICFpc1N0YXRlZnVsQ29tcG9uZW50ICYmIChwYXJlbnREb20gfHwgY2FuUmVjeWNsZSkpIHtcclxuICAgICAgICByZWN5Y2xpbmdfMS5wb29sQ29tcG9uZW50KHZOb2RlKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLnVubW91bnRDb21wb25lbnQgPSB1bm1vdW50Q29tcG9uZW50O1xyXG5mdW5jdGlvbiB1bm1vdW50RWxlbWVudCh2Tm9kZSwgcGFyZW50RG9tLCBsaWZlY3ljbGUsIGNhblJlY3ljbGUsIGlzUmVjeWNsaW5nKSB7XHJcbiAgICB2YXIgZG9tID0gdk5vZGUuZG9tO1xyXG4gICAgdmFyIHJlZiA9IHZOb2RlLnJlZjtcclxuICAgIHZhciBwcm9wcyA9IHZOb2RlLnByb3BzO1xyXG4gICAgaWYgKHJlZiAmJiAhaXNSZWN5Y2xpbmcpIHtcclxuICAgICAgICB1bm1vdW50UmVmKHJlZik7XHJcbiAgICB9XHJcbiAgICB2YXIgY2hpbGRyZW4gPSB2Tm9kZS5jaGlsZHJlbjtcclxuICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc051bGxPclVuZGVmKGNoaWxkcmVuKSkge1xyXG4gICAgICAgIHVubW91bnRDaGlsZHJlbihjaGlsZHJlbiwgbGlmZWN5Y2xlLCBpc1JlY3ljbGluZyk7XHJcbiAgICB9XHJcbiAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNOdWxsKHByb3BzKSkge1xyXG4gICAgICAgIGZvciAodmFyIG5hbWVfMSBpbiBwcm9wcykge1xyXG4gICAgICAgICAgICAvLyBkbyBub3QgYWRkIGEgaGFzT3duUHJvcGVydHkgY2hlY2sgaGVyZSwgaXQgYWZmZWN0cyBwZXJmb3JtYW5jZVxyXG4gICAgICAgICAgICBpZiAocHJvcHNbbmFtZV8xXSAhPT0gbnVsbCAmJiBwYXRjaGluZ18xLmlzQXR0ckFuRXZlbnQobmFtZV8xKSkge1xyXG4gICAgICAgICAgICAgICAgcGF0Y2hpbmdfMS5wYXRjaEV2ZW50KG5hbWVfMSwgcHJvcHNbbmFtZV8xXSwgbnVsbCwgZG9tKTtcclxuICAgICAgICAgICAgICAgIC8vIFdlIG5lZWQgdG8gc2V0IHRoaXMgbnVsbCwgYmVjYXVzZSBzYW1lIHByb3BzIG90aGVyd2lzZSBjb21lIGJhY2sgaWYgU0NVIHJldHVybnMgZmFsc2UgYW5kIHdlIGFyZSByZWN5bGluZ1xyXG4gICAgICAgICAgICAgICAgcHJvcHNbbmFtZV8xXSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAocGFyZW50RG9tKSB7XHJcbiAgICAgICAgdXRpbHNfMS5yZW1vdmVDaGlsZChwYXJlbnREb20sIGRvbSk7XHJcbiAgICB9XHJcbiAgICBpZiAob3B0aW9uc18xLmRlZmF1bHQucmVjeWNsaW5nRW5hYmxlZCAmJiAocGFyZW50RG9tIHx8IGNhblJlY3ljbGUpKSB7XHJcbiAgICAgICAgcmVjeWNsaW5nXzEucG9vbEVsZW1lbnQodk5vZGUpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMudW5tb3VudEVsZW1lbnQgPSB1bm1vdW50RWxlbWVudDtcclxuZnVuY3Rpb24gdW5tb3VudENoaWxkcmVuKGNoaWxkcmVuLCBsaWZlY3ljbGUsIGlzUmVjeWNsaW5nKSB7XHJcbiAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc0FycmF5KGNoaWxkcmVuKSkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzSW52YWxpZChjaGlsZCkgJiYgaW5mZXJub19zaGFyZWRfMS5pc09iamVjdChjaGlsZCkpIHtcclxuICAgICAgICAgICAgICAgIHVubW91bnQoY2hpbGQsIG51bGwsIGxpZmVjeWNsZSwgZmFsc2UsIGlzUmVjeWNsaW5nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNPYmplY3QoY2hpbGRyZW4pKSB7XHJcbiAgICAgICAgdW5tb3VudChjaGlsZHJlbiwgbnVsbCwgbGlmZWN5Y2xlLCBmYWxzZSwgaXNSZWN5Y2xpbmcpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHVubW91bnRSZWYocmVmKSB7XHJcbiAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc0Z1bmN0aW9uKHJlZikpIHtcclxuICAgICAgICByZWYobnVsbCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc0ludmFsaWQocmVmKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGluZmVybm9fc2hhcmVkXzEudGhyb3dFcnJvcignc3RyaW5nIFwicmVmc1wiIGFyZSBub3Qgc3VwcG9ydGVkIGluIEluZmVybm8gMS4wLiBVc2UgY2FsbGJhY2sgXCJyZWZzXCIgaW5zdGVhZC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5mZXJub19zaGFyZWRfMS50aHJvd0Vycm9yKCk7XHJcbiAgICB9XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGluZmVybm9fc2hhcmVkXzEgPSByZXF1aXJlKFwiaW5mZXJuby1zaGFyZWRcIik7XHJcbnZhciBvcHRpb25zXzEgPSByZXF1aXJlKFwiLi4vY29yZS9vcHRpb25zXCIpO1xyXG52YXIgVk5vZGVzXzEgPSByZXF1aXJlKFwiLi4vY29yZS9WTm9kZXNcIik7XHJcbnZhciBoeWRyYXRpb25fMSA9IHJlcXVpcmUoXCIuL2h5ZHJhdGlvblwiKTtcclxudmFyIG1vdW50aW5nXzEgPSByZXF1aXJlKFwiLi9tb3VudGluZ1wiKTtcclxudmFyIHBhdGNoaW5nXzEgPSByZXF1aXJlKFwiLi9wYXRjaGluZ1wiKTtcclxudmFyIHVubW91bnRpbmdfMSA9IHJlcXVpcmUoXCIuL3VubW91bnRpbmdcIik7XHJcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XHJcbi8vIHJhdGhlciB0aGFuIHVzZSBhIE1hcCwgbGlrZSB3ZSBkaWQgYmVmb3JlLCB3ZSBjYW4gdXNlIGFuIGFycmF5IGhlcmVcclxuLy8gZ2l2ZW4gdGhlcmUgc2hvdWxkbid0IGJlIFRIQVQgbWFueSByb290cyBvbiB0aGUgcGFnZSwgdGhlIGRpZmZlcmVuY2VcclxuLy8gaW4gcGVyZm9ybWFuY2UgaXMgaHVnZTogaHR0cHM6Ly9lc2JlbmNoLmNvbS9iZW5jaC81ODAyYTY5MTMzMGFiMDk5MDBhMWEyZGFcclxuZXhwb3J0cy5yb290cyA9IFtdO1xyXG5leHBvcnRzLmNvbXBvbmVudFRvRE9NTm9kZU1hcCA9IG5ldyBNYXAoKTtcclxub3B0aW9uc18xLmRlZmF1bHQucm9vdHMgPSBleHBvcnRzLnJvb3RzO1xyXG4vKipcclxuICogV2hlbiBpbmZlcm5vLm9wdGlvbnMuZmluZERPTU5PZGVFbmFibGVkIGlzIHRydWUsIHRoaXMgZnVuY3Rpb24gd2lsbCByZXR1cm4gRE9NIE5vZGUgYnkgY29tcG9uZW50IGluc3RhbmNlXHJcbiAqIEBwYXJhbSByZWYgQ29tcG9uZW50IGluc3RhbmNlXHJcbiAqIEByZXR1cm5zIHsqfG51bGx9IHJldHVybnMgZG9tIG5vZGVcclxuICovXHJcbmZ1bmN0aW9uIGZpbmRET01Ob2RlKHJlZikge1xyXG4gICAgaWYgKCFvcHRpb25zXzEuZGVmYXVsdC5maW5kRE9NTm9kZUVuYWJsZWQpIHtcclxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xyXG4gICAgICAgICAgICBpbmZlcm5vX3NoYXJlZF8xLnRocm93RXJyb3IoJ2ZpbmRET01Ob2RlKCkgaGFzIGJlZW4gZGlzYWJsZWQsIHVzZSBJbmZlcm5vLm9wdGlvbnMuZmluZERPTU5vZGVFbmFibGVkID0gdHJ1ZTsgZW5hYmxlZCBmaW5kRE9NTm9kZSgpLiBXYXJuaW5nIHRoaXMgY2FuIHNpZ25pZmljYW50bHkgaW1wYWN0IHBlcmZvcm1hbmNlIScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbmZlcm5vX3NoYXJlZF8xLnRocm93RXJyb3IoKTtcclxuICAgIH1cclxuICAgIHZhciBkb20gPSByZWYgJiYgcmVmLm5vZGVUeXBlID8gcmVmIDogbnVsbDtcclxuICAgIHJldHVybiBleHBvcnRzLmNvbXBvbmVudFRvRE9NTm9kZU1hcC5nZXQocmVmKSB8fCBkb207XHJcbn1cclxuZXhwb3J0cy5maW5kRE9NTm9kZSA9IGZpbmRET01Ob2RlO1xyXG5mdW5jdGlvbiBnZXRSb290KGRvbSkge1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGV4cG9ydHMucm9vdHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICB2YXIgcm9vdCA9IGV4cG9ydHMucm9vdHNbaV07XHJcbiAgICAgICAgaWYgKHJvb3QuZG9tID09PSBkb20pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJvb3Q7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn1cclxuZnVuY3Rpb24gc2V0Um9vdChkb20sIGlucHV0LCBsaWZlY3ljbGUpIHtcclxuICAgIHZhciByb290ID0ge1xyXG4gICAgICAgIGRvbTogZG9tLFxyXG4gICAgICAgIGlucHV0OiBpbnB1dCxcclxuICAgICAgICBsaWZlY3ljbGU6IGxpZmVjeWNsZVxyXG4gICAgfTtcclxuICAgIGV4cG9ydHMucm9vdHMucHVzaChyb290KTtcclxuICAgIHJldHVybiByb290O1xyXG59XHJcbmZ1bmN0aW9uIHJlbW92ZVJvb3Qocm9vdCkge1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGV4cG9ydHMucm9vdHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICBpZiAoZXhwb3J0cy5yb290c1tpXSA9PT0gcm9vdCkge1xyXG4gICAgICAgICAgICBleHBvcnRzLnJvb3RzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xyXG4gICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNCcm93c2VyICYmIGRvY3VtZW50LmJvZHkgPT09IG51bGwpIHtcclxuICAgICAgICBpbmZlcm5vX3NoYXJlZF8xLndhcm5pbmcoJ0luZmVybm8gd2FybmluZzogeW91IGNhbm5vdCBpbml0aWFsaXplIGluZmVybm8gd2l0aG91dCBcImRvY3VtZW50LmJvZHlcIi4gV2FpdCBvbiBcIkRPTUNvbnRlbnRMb2FkZWRcIiBldmVudCwgYWRkIHNjcmlwdCB0byBib3R0b20gb2YgYm9keSwgb3IgdXNlIGFzeW5jL2RlZmVyIGF0dHJpYnV0ZXMgb24gc2NyaXB0IHRhZy4nKTtcclxuICAgIH1cclxufVxyXG52YXIgZG9jdW1lbnRCb2R5ID0gaW5mZXJub19zaGFyZWRfMS5pc0Jyb3dzZXIgPyBkb2N1bWVudC5ib2R5IDogbnVsbDtcclxuLyoqXHJcbiAqIFJlbmRlcnMgdmlydHVhbCBub2RlIHRyZWUgaW50byBwYXJlbnQgbm9kZS5cclxuICogQHBhcmFtIHtWTm9kZSB8IG51bGwgfCBzdHJpbmcgfCBudW1iZXJ9IGlucHV0IHZOb2RlIHRvIGJlIHJlbmRlcmVkXHJcbiAqIEBwYXJhbSBwYXJlbnREb20gRE9NIG5vZGUgd2hpY2ggY29udGVudCB3aWxsIGJlIHJlcGxhY2VkIGJ5IHZpcnR1YWwgbm9kZVxyXG4gKiBAcmV0dXJucyB7SW5mZXJub0NoaWxkcmVufSByZW5kZXJlZCB2aXJ0dWFsIG5vZGVcclxuICovXHJcbmZ1bmN0aW9uIHJlbmRlcihpbnB1dCwgcGFyZW50RG9tKSB7XHJcbiAgICBpZiAoZG9jdW1lbnRCb2R5ID09PSBwYXJlbnREb20pIHtcclxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xyXG4gICAgICAgICAgICBpbmZlcm5vX3NoYXJlZF8xLnRocm93RXJyb3IoJ3lvdSBjYW5ub3QgcmVuZGVyKCkgdG8gdGhlIFwiZG9jdW1lbnQuYm9keVwiLiBVc2UgYW4gZW1wdHkgZWxlbWVudCBhcyBhIGNvbnRhaW5lciBpbnN0ZWFkLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbmZlcm5vX3NoYXJlZF8xLnRocm93RXJyb3IoKTtcclxuICAgIH1cclxuICAgIGlmIChpbnB1dCA9PT0gaW5mZXJub19zaGFyZWRfMS5OT19PUCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHZhciByb290ID0gZ2V0Um9vdChwYXJlbnREb20pO1xyXG4gICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNOdWxsKHJvb3QpKSB7XHJcbiAgICAgICAgdmFyIGxpZmVjeWNsZSA9IG5ldyBpbmZlcm5vX3NoYXJlZF8xLkxpZmVjeWNsZSgpO1xyXG4gICAgICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc0ludmFsaWQoaW5wdXQpKSB7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dC5kb20pIHtcclxuICAgICAgICAgICAgICAgIGlucHV0ID0gVk5vZGVzXzEuZGlyZWN0Q2xvbmUoaW5wdXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaHlkcmF0aW9uXzEuZGVmYXVsdChpbnB1dCwgcGFyZW50RG9tLCBsaWZlY3ljbGUpKSB7XHJcbiAgICAgICAgICAgICAgICBtb3VudGluZ18xLm1vdW50KGlucHV0LCBwYXJlbnREb20sIGxpZmVjeWNsZSwgdXRpbHNfMS5FTVBUWV9PQkosIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByb290ID0gc2V0Um9vdChwYXJlbnREb20sIGlucHV0LCBsaWZlY3ljbGUpO1xyXG4gICAgICAgICAgICBsaWZlY3ljbGUudHJpZ2dlcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHZhciBsaWZlY3ljbGUgPSByb290LmxpZmVjeWNsZTtcclxuICAgICAgICBsaWZlY3ljbGUubGlzdGVuZXJzID0gW107XHJcbiAgICAgICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNOdWxsT3JVbmRlZihpbnB1dCkpIHtcclxuICAgICAgICAgICAgdW5tb3VudGluZ18xLnVubW91bnQocm9vdC5pbnB1dCwgcGFyZW50RG9tLCBsaWZlY3ljbGUsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHJlbW92ZVJvb3Qocm9vdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoaW5wdXQuZG9tKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dCA9IFZOb2Rlc18xLmRpcmVjdENsb25lKGlucHV0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwYXRjaGluZ18xLnBhdGNoKHJvb3QuaW5wdXQsIGlucHV0LCBwYXJlbnREb20sIGxpZmVjeWNsZSwgdXRpbHNfMS5FTVBUWV9PQkosIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJvb3QuaW5wdXQgPSBpbnB1dDtcclxuICAgICAgICBsaWZlY3ljbGUudHJpZ2dlcigpO1xyXG4gICAgfVxyXG4gICAgaWYgKHJvb3QpIHtcclxuICAgICAgICB2YXIgcm9vdElucHV0ID0gcm9vdC5pbnB1dDtcclxuICAgICAgICBpZiAocm9vdElucHV0ICYmIChyb290SW5wdXQuZmxhZ3MgJiAyOCAvKiBDb21wb25lbnQgKi8pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByb290SW5wdXQuY2hpbGRyZW47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMucmVuZGVyID0gcmVuZGVyO1xyXG5mdW5jdGlvbiBjcmVhdGVSZW5kZXJlcihwYXJlbnREb20pIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiByZW5kZXJlcihsYXN0SW5wdXQsIG5leHRJbnB1dCkge1xyXG4gICAgICAgIGlmICghcGFyZW50RG9tKSB7XHJcbiAgICAgICAgICAgIHBhcmVudERvbSA9IGxhc3RJbnB1dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVuZGVyKG5leHRJbnB1dCwgcGFyZW50RG9tKTtcclxuICAgIH07XHJcbn1cclxuZXhwb3J0cy5jcmVhdGVSZW5kZXJlciA9IGNyZWF0ZVJlbmRlcmVyO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgaW5mZXJub19zaGFyZWRfMSA9IHJlcXVpcmUoXCJpbmZlcm5vLXNoYXJlZFwiKTtcclxudmFyIG9wdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi9jb3JlL29wdGlvbnNcIik7XHJcbnZhciBWTm9kZXNfMSA9IHJlcXVpcmUoXCIuLi9jb3JlL1ZOb2Rlc1wiKTtcclxudmFyIGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4vY29uc3RhbnRzXCIpO1xyXG52YXIgZGVsZWdhdGlvbl8xID0gcmVxdWlyZShcIi4vZXZlbnRzL2RlbGVnYXRpb25cIik7XHJcbnZhciBtb3VudGluZ18xID0gcmVxdWlyZShcIi4vbW91bnRpbmdcIik7XHJcbnZhciByZW5kZXJpbmdfMSA9IHJlcXVpcmUoXCIuL3JlbmRlcmluZ1wiKTtcclxudmFyIHVubW91bnRpbmdfMSA9IHJlcXVpcmUoXCIuL3VubW91bnRpbmdcIik7XHJcbnZhciB1dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XHJcbnZhciBwcm9jZXNzRWxlbWVudF8xID0gcmVxdWlyZShcIi4vd3JhcHBlcnMvcHJvY2Vzc0VsZW1lbnRcIik7XHJcbmZ1bmN0aW9uIHBhdGNoKGxhc3RWTm9kZSwgbmV4dFZOb2RlLCBwYXJlbnREb20sIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcsIGlzUmVjeWNsaW5nKSB7XHJcbiAgICBpZiAobGFzdFZOb2RlICE9PSBuZXh0Vk5vZGUpIHtcclxuICAgICAgICB2YXIgbGFzdEZsYWdzID0gbGFzdFZOb2RlLmZsYWdzO1xyXG4gICAgICAgIHZhciBuZXh0RmxhZ3MgPSBuZXh0Vk5vZGUuZmxhZ3M7XHJcbiAgICAgICAgaWYgKG5leHRGbGFncyAmIDI4IC8qIENvbXBvbmVudCAqLykge1xyXG4gICAgICAgICAgICBpZiAobGFzdEZsYWdzICYgMjggLyogQ29tcG9uZW50ICovKSB7XHJcbiAgICAgICAgICAgICAgICBwYXRjaENvbXBvbmVudChsYXN0Vk5vZGUsIG5leHRWTm9kZSwgcGFyZW50RG9tLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHLCBuZXh0RmxhZ3MgJiA0IC8qIENvbXBvbmVudENsYXNzICovLCBpc1JlY3ljbGluZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1dGlsc18xLnJlcGxhY2VWTm9kZShwYXJlbnREb20sIG1vdW50aW5nXzEubW91bnRDb21wb25lbnQobmV4dFZOb2RlLCBudWxsLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHLCBuZXh0RmxhZ3MgJiA0IC8qIENvbXBvbmVudENsYXNzICovKSwgbGFzdFZOb2RlLCBsaWZlY3ljbGUsIGlzUmVjeWNsaW5nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChuZXh0RmxhZ3MgJiAzOTcwIC8qIEVsZW1lbnQgKi8pIHtcclxuICAgICAgICAgICAgaWYgKGxhc3RGbGFncyAmIDM5NzAgLyogRWxlbWVudCAqLykge1xyXG4gICAgICAgICAgICAgICAgcGF0Y2hFbGVtZW50KGxhc3RWTm9kZSwgbmV4dFZOb2RlLCBwYXJlbnREb20sIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcsIGlzUmVjeWNsaW5nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzXzEucmVwbGFjZVZOb2RlKHBhcmVudERvbSwgbW91bnRpbmdfMS5tb3VudEVsZW1lbnQobmV4dFZOb2RlLCBudWxsLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHKSwgbGFzdFZOb2RlLCBsaWZlY3ljbGUsIGlzUmVjeWNsaW5nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChuZXh0RmxhZ3MgJiAxIC8qIFRleHQgKi8pIHtcclxuICAgICAgICAgICAgaWYgKGxhc3RGbGFncyAmIDEgLyogVGV4dCAqLykge1xyXG4gICAgICAgICAgICAgICAgcGF0Y2hUZXh0KGxhc3RWTm9kZSwgbmV4dFZOb2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzXzEucmVwbGFjZVZOb2RlKHBhcmVudERvbSwgbW91bnRpbmdfMS5tb3VudFRleHQobmV4dFZOb2RlLCBudWxsKSwgbGFzdFZOb2RlLCBsaWZlY3ljbGUsIGlzUmVjeWNsaW5nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChuZXh0RmxhZ3MgJiA0MDk2IC8qIFZvaWQgKi8pIHtcclxuICAgICAgICAgICAgaWYgKGxhc3RGbGFncyAmIDQwOTYgLyogVm9pZCAqLykge1xyXG4gICAgICAgICAgICAgICAgcGF0Y2hWb2lkKGxhc3RWTm9kZSwgbmV4dFZOb2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzXzEucmVwbGFjZVZOb2RlKHBhcmVudERvbSwgbW91bnRpbmdfMS5tb3VudFZvaWQobmV4dFZOb2RlLCBudWxsKSwgbGFzdFZOb2RlLCBsaWZlY3ljbGUsIGlzUmVjeWNsaW5nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gRXJyb3IgY2FzZTogbW91bnQgbmV3IG9uZSByZXBsYWNpbmcgb2xkIG9uZVxyXG4gICAgICAgICAgICB1dGlsc18xLnJlcGxhY2VMYXN0Q2hpbGRBbmRVbm1vdW50KGxhc3RWTm9kZSwgbmV4dFZOb2RlLCBwYXJlbnREb20sIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcsIGlzUmVjeWNsaW5nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5wYXRjaCA9IHBhdGNoO1xyXG5mdW5jdGlvbiB1bm1vdW50Q2hpbGRyZW4oY2hpbGRyZW4sIGRvbSwgbGlmZWN5Y2xlLCBpc1JlY3ljbGluZykge1xyXG4gICAgaWYgKFZOb2Rlc18xLmlzVk5vZGUoY2hpbGRyZW4pKSB7XHJcbiAgICAgICAgdW5tb3VudGluZ18xLnVubW91bnQoY2hpbGRyZW4sIGRvbSwgbGlmZWN5Y2xlLCB0cnVlLCBpc1JlY3ljbGluZyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzQXJyYXkoY2hpbGRyZW4pKSB7XHJcbiAgICAgICAgdXRpbHNfMS5yZW1vdmVBbGxDaGlsZHJlbihkb20sIGNoaWxkcmVuLCBsaWZlY3ljbGUsIGlzUmVjeWNsaW5nKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGRvbS50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHBhdGNoRWxlbWVudChsYXN0Vk5vZGUsIG5leHRWTm9kZSwgcGFyZW50RG9tLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHLCBpc1JlY3ljbGluZykge1xyXG4gICAgdmFyIG5leHRUYWcgPSBuZXh0Vk5vZGUudHlwZTtcclxuICAgIHZhciBsYXN0VGFnID0gbGFzdFZOb2RlLnR5cGU7XHJcbiAgICBpZiAobGFzdFRhZyAhPT0gbmV4dFRhZykge1xyXG4gICAgICAgIHV0aWxzXzEucmVwbGFjZVdpdGhOZXdOb2RlKGxhc3RWTm9kZSwgbmV4dFZOb2RlLCBwYXJlbnREb20sIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcsIGlzUmVjeWNsaW5nKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHZhciBkb20gPSBsYXN0Vk5vZGUuZG9tO1xyXG4gICAgICAgIHZhciBsYXN0UHJvcHMgPSBsYXN0Vk5vZGUucHJvcHM7XHJcbiAgICAgICAgdmFyIG5leHRQcm9wcyA9IG5leHRWTm9kZS5wcm9wcztcclxuICAgICAgICB2YXIgbGFzdENoaWxkcmVuID0gbGFzdFZOb2RlLmNoaWxkcmVuO1xyXG4gICAgICAgIHZhciBuZXh0Q2hpbGRyZW4gPSBuZXh0Vk5vZGUuY2hpbGRyZW47XHJcbiAgICAgICAgdmFyIGxhc3RGbGFncyA9IGxhc3RWTm9kZS5mbGFncztcclxuICAgICAgICB2YXIgbmV4dEZsYWdzID0gbmV4dFZOb2RlLmZsYWdzO1xyXG4gICAgICAgIHZhciBuZXh0UmVmID0gbmV4dFZOb2RlLnJlZjtcclxuICAgICAgICB2YXIgbGFzdENsYXNzTmFtZSA9IGxhc3RWTm9kZS5jbGFzc05hbWU7XHJcbiAgICAgICAgdmFyIG5leHRDbGFzc05hbWUgPSBuZXh0Vk5vZGUuY2xhc3NOYW1lO1xyXG4gICAgICAgIG5leHRWTm9kZS5kb20gPSBkb207XHJcbiAgICAgICAgaWYgKGlzU1ZHIHx8IChuZXh0RmxhZ3MgJiAxMjggLyogU3ZnRWxlbWVudCAqLykgPiAwKSB7XHJcbiAgICAgICAgICAgIGlzU1ZHID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxhc3RDaGlsZHJlbiAhPT0gbmV4dENoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIHBhdGNoQ2hpbGRyZW4obGFzdEZsYWdzLCBuZXh0RmxhZ3MsIGxhc3RDaGlsZHJlbiwgbmV4dENoaWxkcmVuLCBkb20sIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcsIGlzUmVjeWNsaW5nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaW5saW5lZCBwYXRjaFByb3BzICAtLSBzdGFydHMgLS1cclxuICAgICAgICBpZiAobGFzdFByb3BzICE9PSBuZXh0UHJvcHMpIHtcclxuICAgICAgICAgICAgdmFyIGxhc3RQcm9wc09yRW1wdHkgPSBsYXN0UHJvcHMgfHwgdXRpbHNfMS5FTVBUWV9PQko7XHJcbiAgICAgICAgICAgIHZhciBuZXh0UHJvcHNPckVtcHR5ID0gbmV4dFByb3BzIHx8IHV0aWxzXzEuRU1QVFlfT0JKO1xyXG4gICAgICAgICAgICB2YXIgaGFzQ29udHJvbGxlZFZhbHVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChuZXh0UHJvcHNPckVtcHR5ICE9PSB1dGlsc18xLkVNUFRZX09CSikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGlzRm9ybUVsZW1lbnQgPSAobmV4dEZsYWdzICYgMzU4NCAvKiBGb3JtRWxlbWVudCAqLykgPiAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzRm9ybUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBoYXNDb250cm9sbGVkVmFsdWUgPSBwcm9jZXNzRWxlbWVudF8xLmlzQ29udHJvbGxlZEZvcm1FbGVtZW50KG5leHRQcm9wc09yRW1wdHkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBuZXh0UHJvcHNPckVtcHR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZG8gbm90IGFkZCBhIGhhc093blByb3BlcnR5IGNoZWNrIGhlcmUsIGl0IGFmZmVjdHMgcGVyZm9ybWFuY2VcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbmV4dFZhbHVlID0gbmV4dFByb3BzT3JFbXB0eVtwcm9wXTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGFzdFZhbHVlID0gbGFzdFByb3BzT3JFbXB0eVtwcm9wXTtcclxuICAgICAgICAgICAgICAgICAgICBwYXRjaFByb3AocHJvcCwgbGFzdFZhbHVlLCBuZXh0VmFsdWUsIGRvbSwgaXNTVkcsIGhhc0NvbnRyb2xsZWRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNGb3JtRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NFbGVtZW50XzEucHJvY2Vzc0VsZW1lbnQobmV4dEZsYWdzLCBuZXh0Vk5vZGUsIGRvbSwgbmV4dFByb3BzT3JFbXB0eSwgZmFsc2UsIGhhc0NvbnRyb2xsZWRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGxhc3RQcm9wc09yRW1wdHkgIT09IHV0aWxzXzEuRU1QVFlfT0JKKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIGxhc3RQcm9wc09yRW1wdHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBkbyBub3QgYWRkIGEgaGFzT3duUHJvcGVydHkgY2hlY2sgaGVyZSwgaXQgYWZmZWN0cyBwZXJmb3JtYW5jZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbE9yVW5kZWYobmV4dFByb3BzT3JFbXB0eVtwcm9wXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlUHJvcChwcm9wLCBsYXN0UHJvcHNPckVtcHR5W3Byb3BdLCBkb20pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpbmxpbmVkIHBhdGNoUHJvcHMgIC0tIGVuZHMgLS1cclxuICAgICAgICBpZiAobGFzdENsYXNzTmFtZSAhPT0gbmV4dENsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc051bGxPclVuZGVmKG5leHRDbGFzc05hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICBkb20ucmVtb3ZlQXR0cmlidXRlKCdjbGFzcycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzU1ZHKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9tLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBuZXh0Q2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbS5jbGFzc05hbWUgPSBuZXh0Q2xhc3NOYW1lO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuZXh0UmVmKSB7XHJcbiAgICAgICAgICAgIGlmIChsYXN0Vk5vZGUucmVmICE9PSBuZXh0UmVmIHx8IGlzUmVjeWNsaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBtb3VudGluZ18xLm1vdW50UmVmKGRvbSwgbmV4dFJlZiwgbGlmZWN5Y2xlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLnBhdGNoRWxlbWVudCA9IHBhdGNoRWxlbWVudDtcclxuZnVuY3Rpb24gcGF0Y2hDaGlsZHJlbihsYXN0RmxhZ3MsIG5leHRGbGFncywgbGFzdENoaWxkcmVuLCBuZXh0Q2hpbGRyZW4sIGRvbSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRywgaXNSZWN5Y2xpbmcpIHtcclxuICAgIHZhciBwYXRjaEFycmF5ID0gZmFsc2U7XHJcbiAgICB2YXIgcGF0Y2hLZXllZCA9IGZhbHNlO1xyXG4gICAgaWYgKG5leHRGbGFncyAmIDY0IC8qIEhhc05vbktleWVkQ2hpbGRyZW4gKi8pIHtcclxuICAgICAgICBwYXRjaEFycmF5ID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKChsYXN0RmxhZ3MgJiAzMiAvKiBIYXNLZXllZENoaWxkcmVuICovKSAmJiAobmV4dEZsYWdzICYgMzIgLyogSGFzS2V5ZWRDaGlsZHJlbiAqLykpIHtcclxuICAgICAgICBwYXRjaEtleWVkID0gdHJ1ZTtcclxuICAgICAgICBwYXRjaEFycmF5ID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNJbnZhbGlkKG5leHRDaGlsZHJlbikpIHtcclxuICAgICAgICB1bm1vdW50Q2hpbGRyZW4obGFzdENoaWxkcmVuLCBkb20sIGxpZmVjeWNsZSwgaXNSZWN5Y2xpbmcpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaW5mZXJub19zaGFyZWRfMS5pc0ludmFsaWQobGFzdENoaWxkcmVuKSkge1xyXG4gICAgICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzU3RyaW5nT3JOdW1iZXIobmV4dENoaWxkcmVuKSkge1xyXG4gICAgICAgICAgICB1dGlsc18xLnNldFRleHRDb250ZW50KGRvbSwgbmV4dENoaWxkcmVuKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzQXJyYXkobmV4dENoaWxkcmVuKSkge1xyXG4gICAgICAgICAgICAgICAgbW91bnRpbmdfMS5tb3VudEFycmF5Q2hpbGRyZW4obmV4dENoaWxkcmVuLCBkb20sIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbW91bnRpbmdfMS5tb3VudChuZXh0Q2hpbGRyZW4sIGRvbSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzU3RyaW5nT3JOdW1iZXIobmV4dENoaWxkcmVuKSkge1xyXG4gICAgICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzU3RyaW5nT3JOdW1iZXIobGFzdENoaWxkcmVuKSkge1xyXG4gICAgICAgICAgICB1dGlsc18xLnVwZGF0ZVRleHRDb250ZW50KGRvbSwgbmV4dENoaWxkcmVuKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHVubW91bnRDaGlsZHJlbihsYXN0Q2hpbGRyZW4sIGRvbSwgbGlmZWN5Y2xlLCBpc1JlY3ljbGluZyk7XHJcbiAgICAgICAgICAgIHV0aWxzXzEuc2V0VGV4dENvbnRlbnQoZG9tLCBuZXh0Q2hpbGRyZW4pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNBcnJheShuZXh0Q2hpbGRyZW4pKSB7XHJcbiAgICAgICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNBcnJheShsYXN0Q2hpbGRyZW4pKSB7XHJcbiAgICAgICAgICAgIHBhdGNoQXJyYXkgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodXRpbHNfMS5pc0tleWVkKGxhc3RDaGlsZHJlbiwgbmV4dENoaWxkcmVuKSkge1xyXG4gICAgICAgICAgICAgICAgcGF0Y2hLZXllZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHVubW91bnRDaGlsZHJlbihsYXN0Q2hpbGRyZW4sIGRvbSwgbGlmZWN5Y2xlLCBpc1JlY3ljbGluZyk7XHJcbiAgICAgICAgICAgIG1vdW50aW5nXzEubW91bnRBcnJheUNoaWxkcmVuKG5leHRDaGlsZHJlbiwgZG9tLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzQXJyYXkobGFzdENoaWxkcmVuKSkge1xyXG4gICAgICAgIHV0aWxzXzEucmVtb3ZlQWxsQ2hpbGRyZW4oZG9tLCBsYXN0Q2hpbGRyZW4sIGxpZmVjeWNsZSwgaXNSZWN5Y2xpbmcpO1xyXG4gICAgICAgIG1vdW50aW5nXzEubW91bnQobmV4dENoaWxkcmVuLCBkb20sIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoVk5vZGVzXzEuaXNWTm9kZShuZXh0Q2hpbGRyZW4pKSB7XHJcbiAgICAgICAgaWYgKFZOb2Rlc18xLmlzVk5vZGUobGFzdENoaWxkcmVuKSkge1xyXG4gICAgICAgICAgICBwYXRjaChsYXN0Q2hpbGRyZW4sIG5leHRDaGlsZHJlbiwgZG9tLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHLCBpc1JlY3ljbGluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB1bm1vdW50Q2hpbGRyZW4obGFzdENoaWxkcmVuLCBkb20sIGxpZmVjeWNsZSwgaXNSZWN5Y2xpbmcpO1xyXG4gICAgICAgICAgICBtb3VudGluZ18xLm1vdW50KG5leHRDaGlsZHJlbiwgZG9tLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAocGF0Y2hBcnJheSkge1xyXG4gICAgICAgIGlmIChwYXRjaEtleWVkKSB7XHJcbiAgICAgICAgICAgIHBhdGNoS2V5ZWRDaGlsZHJlbihsYXN0Q2hpbGRyZW4sIG5leHRDaGlsZHJlbiwgZG9tLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHLCBpc1JlY3ljbGluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBwYXRjaE5vbktleWVkQ2hpbGRyZW4obGFzdENoaWxkcmVuLCBuZXh0Q2hpbGRyZW4sIGRvbSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRywgaXNSZWN5Y2xpbmcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBwYXRjaENvbXBvbmVudChsYXN0Vk5vZGUsIG5leHRWTm9kZSwgcGFyZW50RG9tLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHLCBpc0NsYXNzLCBpc1JlY3ljbGluZykge1xyXG4gICAgdmFyIGxhc3RUeXBlID0gbGFzdFZOb2RlLnR5cGU7XHJcbiAgICB2YXIgbmV4dFR5cGUgPSBuZXh0Vk5vZGUudHlwZTtcclxuICAgIHZhciBsYXN0S2V5ID0gbGFzdFZOb2RlLmtleTtcclxuICAgIHZhciBuZXh0S2V5ID0gbmV4dFZOb2RlLmtleTtcclxuICAgIGlmIChsYXN0VHlwZSAhPT0gbmV4dFR5cGUgfHwgbGFzdEtleSAhPT0gbmV4dEtleSkge1xyXG4gICAgICAgIHV0aWxzXzEucmVwbGFjZVdpdGhOZXdOb2RlKGxhc3RWTm9kZSwgbmV4dFZOb2RlLCBwYXJlbnREb20sIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcsIGlzUmVjeWNsaW5nKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB2YXIgbmV4dFByb3BzID0gbmV4dFZOb2RlLnByb3BzIHx8IHV0aWxzXzEuRU1QVFlfT0JKO1xyXG4gICAgICAgIGlmIChpc0NsYXNzKSB7XHJcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IGxhc3RWTm9kZS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgaW5zdGFuY2UuX3VwZGF0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKGluc3RhbmNlLl91bm1vdW50ZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbChwYXJlbnREb20pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB1dGlsc18xLnJlcGxhY2VDaGlsZChwYXJlbnREb20sIG1vdW50aW5nXzEubW91bnRDb21wb25lbnQobmV4dFZOb2RlLCBudWxsLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHLCBuZXh0Vk5vZGUuZmxhZ3MgJiA0IC8qIENvbXBvbmVudENsYXNzICovKSwgbGFzdFZOb2RlLmRvbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGFzdFN0YXRlID0gaW5zdGFuY2Uuc3RhdGU7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV4dFN0YXRlID0gaW5zdGFuY2Uuc3RhdGU7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGFzdFByb3BzID0gaW5zdGFuY2UucHJvcHM7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRDb250ZXh0ID0gdm9pZCAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzVW5kZWZpbmVkKGluc3RhbmNlLmdldENoaWxkQ29udGV4dCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZENvbnRleHQgPSBpbnN0YW5jZS5nZXRDaGlsZENvbnRleHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG5leHRWTm9kZS5jaGlsZHJlbiA9IGluc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuX2lzU1ZHID0gaXNTVkc7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc051bGxPclVuZGVmKGNoaWxkQ29udGV4dCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZENvbnRleHQgPSBjb250ZXh0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRDb250ZXh0ID0gaW5mZXJub19zaGFyZWRfMS5jb21iaW5lRnJvbShjb250ZXh0LCBjaGlsZENvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGxhc3RJbnB1dCA9IGluc3RhbmNlLl9sYXN0SW5wdXQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV4dElucHV0ID0gaW5zdGFuY2UuX3VwZGF0ZUNvbXBvbmVudChsYXN0U3RhdGUsIG5leHRTdGF0ZSwgbGFzdFByb3BzLCBuZXh0UHJvcHMsIGNvbnRleHQsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGlkVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlLl9jaGlsZENvbnRleHQgPSBjaGlsZENvbnRleHQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc0ludmFsaWQobmV4dElucHV0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRJbnB1dCA9IFZOb2Rlc18xLmNyZWF0ZVZvaWRWTm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobmV4dElucHV0ID09PSBpbmZlcm5vX3NoYXJlZF8xLk5PX09QKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dElucHV0ID0gbGFzdElucHV0O1xyXG4gICAgICAgICAgICAgICAgICAgIGRpZFVwZGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaW5mZXJub19zaGFyZWRfMS5pc1N0cmluZ09yTnVtYmVyKG5leHRJbnB1dCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0SW5wdXQgPSBWTm9kZXNfMS5jcmVhdGVUZXh0Vk5vZGUobmV4dElucHV0LCBudWxsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNBcnJheShuZXh0SW5wdXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5mZXJub19zaGFyZWRfMS50aHJvd0Vycm9yKCdhIHZhbGlkIEluZmVybm8gVk5vZGUgKG9yIG51bGwpIG11c3QgYmUgcmV0dXJuZWQgZnJvbSBhIGNvbXBvbmVudCByZW5kZXIuIFlvdSBtYXkgaGF2ZSByZXR1cm5lZCBhbiBhcnJheSBvciBhbiBpbnZhbGlkIG9iamVjdC4nKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaW5mZXJub19zaGFyZWRfMS50aHJvd0Vycm9yKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzT2JqZWN0KG5leHRJbnB1dCkgJiYgbmV4dElucHV0LmRvbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRJbnB1dCA9IFZOb2Rlc18xLmRpcmVjdENsb25lKG5leHRJbnB1dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobmV4dElucHV0LmZsYWdzICYgMjggLyogQ29tcG9uZW50ICovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dElucHV0LnBhcmVudFZOb2RlID0gbmV4dFZOb2RlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobGFzdElucHV0LmZsYWdzICYgMjggLyogQ29tcG9uZW50ICovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdElucHV0LnBhcmVudFZOb2RlID0gbmV4dFZOb2RlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuX2xhc3RJbnB1dCA9IG5leHRJbnB1dDtcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlLl92Tm9kZSA9IG5leHRWTm9kZTtcclxuICAgICAgICAgICAgICAgIGlmIChkaWRVcGRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRjaChsYXN0SW5wdXQsIG5leHRJbnB1dCwgcGFyZW50RG9tLCBsaWZlY3ljbGUsIGNoaWxkQ29udGV4dCwgaXNTVkcsIGlzUmVjeWNsaW5nKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNVbmRlZmluZWQoaW5zdGFuY2UuY29tcG9uZW50RGlkVXBkYXRlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZS5jb21wb25lbnREaWRVcGRhdGUobGFzdFByb3BzLCBsYXN0U3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zXzEuZGVmYXVsdC5hZnRlclVwZGF0ZSAmJiBvcHRpb25zXzEuZGVmYXVsdC5hZnRlclVwZGF0ZShuZXh0Vk5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNfMS5kZWZhdWx0LmZpbmRET01Ob2RlRW5hYmxlZCAmJiByZW5kZXJpbmdfMS5jb21wb25lbnRUb0RPTU5vZGVNYXAuc2V0KGluc3RhbmNlLCBuZXh0SW5wdXQuZG9tKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG5leHRWTm9kZS5kb20gPSBuZXh0SW5wdXQuZG9tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGluc3RhbmNlLl91cGRhdGluZyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIHNob3VsZFVwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHZhciBsYXN0UHJvcHMgPSBsYXN0Vk5vZGUucHJvcHM7XHJcbiAgICAgICAgICAgIHZhciBuZXh0SG9va3MgPSBuZXh0Vk5vZGUucmVmO1xyXG4gICAgICAgICAgICB2YXIgbmV4dEhvb2tzRGVmaW5lZCA9ICFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbE9yVW5kZWYobmV4dEhvb2tzKTtcclxuICAgICAgICAgICAgdmFyIGxhc3RJbnB1dCA9IGxhc3RWTm9kZS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgdmFyIG5leHRJbnB1dCA9IGxhc3RJbnB1dDtcclxuICAgICAgICAgICAgbmV4dFZOb2RlLmRvbSA9IGxhc3RWTm9kZS5kb207XHJcbiAgICAgICAgICAgIG5leHRWTm9kZS5jaGlsZHJlbiA9IGxhc3RJbnB1dDtcclxuICAgICAgICAgICAgaWYgKGxhc3RLZXkgIT09IG5leHRLZXkpIHtcclxuICAgICAgICAgICAgICAgIHNob3VsZFVwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV4dEhvb2tzRGVmaW5lZCAmJiAhaW5mZXJub19zaGFyZWRfMS5pc051bGxPclVuZGVmKG5leHRIb29rcy5vbkNvbXBvbmVudFNob3VsZFVwZGF0ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzaG91bGRVcGRhdGUgPSBuZXh0SG9va3Mub25Db21wb25lbnRTaG91bGRVcGRhdGUobGFzdFByb3BzLCBuZXh0UHJvcHMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzaG91bGRVcGRhdGUgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV4dEhvb2tzRGVmaW5lZCAmJiAhaW5mZXJub19zaGFyZWRfMS5pc051bGxPclVuZGVmKG5leHRIb29rcy5vbkNvbXBvbmVudFdpbGxVcGRhdGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEhvb2tzLm9uQ29tcG9uZW50V2lsbFVwZGF0ZShsYXN0UHJvcHMsIG5leHRQcm9wcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBuZXh0SW5wdXQgPSBuZXh0VHlwZShuZXh0UHJvcHMsIGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNJbnZhbGlkKG5leHRJbnB1dCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0SW5wdXQgPSBWTm9kZXNfMS5jcmVhdGVWb2lkVk5vZGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNTdHJpbmdPck51bWJlcihuZXh0SW5wdXQpICYmIG5leHRJbnB1dCAhPT0gaW5mZXJub19zaGFyZWRfMS5OT19PUCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRJbnB1dCA9IFZOb2Rlc18xLmNyZWF0ZVRleHRWTm9kZShuZXh0SW5wdXQsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaW5mZXJub19zaGFyZWRfMS5pc0FycmF5KG5leHRJbnB1dCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZlcm5vX3NoYXJlZF8xLnRocm93RXJyb3IoJ2EgdmFsaWQgSW5mZXJubyBWTm9kZSAob3IgbnVsbCkgbXVzdCBiZSByZXR1cm5lZCBmcm9tIGEgY29tcG9uZW50IHJlbmRlci4gWW91IG1heSBoYXZlIHJldHVybmVkIGFuIGFycmF5IG9yIGFuIGludmFsaWQgb2JqZWN0LicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpbmZlcm5vX3NoYXJlZF8xLnRocm93RXJyb3IoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNPYmplY3QobmV4dElucHV0KSAmJiBuZXh0SW5wdXQuZG9tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dElucHV0ID0gVk5vZGVzXzEuZGlyZWN0Q2xvbmUobmV4dElucHV0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChuZXh0SW5wdXQgIT09IGluZmVybm9fc2hhcmVkXzEuTk9fT1ApIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRjaChsYXN0SW5wdXQsIG5leHRJbnB1dCwgcGFyZW50RG9tLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHLCBpc1JlY3ljbGluZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dFZOb2RlLmNoaWxkcmVuID0gbmV4dElucHV0O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXh0SG9va3NEZWZpbmVkICYmICFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbE9yVW5kZWYobmV4dEhvb2tzLm9uQ29tcG9uZW50RGlkVXBkYXRlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0SG9va3Mub25Db21wb25lbnREaWRVcGRhdGUobGFzdFByb3BzLCBuZXh0UHJvcHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBuZXh0Vk5vZGUuZG9tID0gbmV4dElucHV0LmRvbTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobmV4dElucHV0LmZsYWdzICYgMjggLyogQ29tcG9uZW50ICovKSB7XHJcbiAgICAgICAgICAgICAgICBuZXh0SW5wdXQucGFyZW50Vk5vZGUgPSBuZXh0Vk5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAobGFzdElucHV0LmZsYWdzICYgMjggLyogQ29tcG9uZW50ICovKSB7XHJcbiAgICAgICAgICAgICAgICBsYXN0SW5wdXQucGFyZW50Vk5vZGUgPSBuZXh0Vk5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuZXhwb3J0cy5wYXRjaENvbXBvbmVudCA9IHBhdGNoQ29tcG9uZW50O1xyXG5mdW5jdGlvbiBwYXRjaFRleHQobGFzdFZOb2RlLCBuZXh0Vk5vZGUpIHtcclxuICAgIHZhciBuZXh0VGV4dCA9IG5leHRWTm9kZS5jaGlsZHJlbjtcclxuICAgIHZhciBkb20gPSBsYXN0Vk5vZGUuZG9tO1xyXG4gICAgbmV4dFZOb2RlLmRvbSA9IGRvbTtcclxuICAgIGlmIChsYXN0Vk5vZGUuY2hpbGRyZW4gIT09IG5leHRUZXh0KSB7XHJcbiAgICAgICAgZG9tLm5vZGVWYWx1ZSA9IG5leHRUZXh0O1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMucGF0Y2hUZXh0ID0gcGF0Y2hUZXh0O1xyXG5mdW5jdGlvbiBwYXRjaFZvaWQobGFzdFZOb2RlLCBuZXh0Vk5vZGUpIHtcclxuICAgIG5leHRWTm9kZS5kb20gPSBsYXN0Vk5vZGUuZG9tO1xyXG59XHJcbmV4cG9ydHMucGF0Y2hWb2lkID0gcGF0Y2hWb2lkO1xyXG5mdW5jdGlvbiBwYXRjaE5vbktleWVkQ2hpbGRyZW4obGFzdENoaWxkcmVuLCBuZXh0Q2hpbGRyZW4sIGRvbSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRywgaXNSZWN5Y2xpbmcpIHtcclxuICAgIHZhciBsYXN0Q2hpbGRyZW5MZW5ndGggPSBsYXN0Q2hpbGRyZW4ubGVuZ3RoO1xyXG4gICAgdmFyIG5leHRDaGlsZHJlbkxlbmd0aCA9IG5leHRDaGlsZHJlbi5sZW5ndGg7XHJcbiAgICB2YXIgY29tbW9uTGVuZ3RoID0gbGFzdENoaWxkcmVuTGVuZ3RoID4gbmV4dENoaWxkcmVuTGVuZ3RoID8gbmV4dENoaWxkcmVuTGVuZ3RoIDogbGFzdENoaWxkcmVuTGVuZ3RoO1xyXG4gICAgdmFyIGkgPSAwO1xyXG4gICAgZm9yICg7IGkgPCBjb21tb25MZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBuZXh0Q2hpbGQgPSBuZXh0Q2hpbGRyZW5baV07XHJcbiAgICAgICAgaWYgKG5leHRDaGlsZC5kb20pIHtcclxuICAgICAgICAgICAgbmV4dENoaWxkID0gbmV4dENoaWxkcmVuW2ldID0gVk5vZGVzXzEuZGlyZWN0Q2xvbmUobmV4dENoaWxkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcGF0Y2gobGFzdENoaWxkcmVuW2ldLCBuZXh0Q2hpbGQsIGRvbSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRywgaXNSZWN5Y2xpbmcpO1xyXG4gICAgfVxyXG4gICAgaWYgKGxhc3RDaGlsZHJlbkxlbmd0aCA8IG5leHRDaGlsZHJlbkxlbmd0aCkge1xyXG4gICAgICAgIGZvciAoaSA9IGNvbW1vbkxlbmd0aDsgaSA8IG5leHRDaGlsZHJlbkxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBuZXh0Q2hpbGQgPSBuZXh0Q2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGlmIChuZXh0Q2hpbGQuZG9tKSB7XHJcbiAgICAgICAgICAgICAgICBuZXh0Q2hpbGQgPSBuZXh0Q2hpbGRyZW5baV0gPSBWTm9kZXNfMS5kaXJlY3RDbG9uZShuZXh0Q2hpbGQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHV0aWxzXzEuYXBwZW5kQ2hpbGQoZG9tLCBtb3VudGluZ18xLm1vdW50KG5leHRDaGlsZCwgbnVsbCwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKG5leHRDaGlsZHJlbkxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHV0aWxzXzEucmVtb3ZlQWxsQ2hpbGRyZW4oZG9tLCBsYXN0Q2hpbGRyZW4sIGxpZmVjeWNsZSwgaXNSZWN5Y2xpbmcpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAobGFzdENoaWxkcmVuTGVuZ3RoID4gbmV4dENoaWxkcmVuTGVuZ3RoKSB7XHJcbiAgICAgICAgZm9yIChpID0gY29tbW9uTGVuZ3RoOyBpIDwgbGFzdENoaWxkcmVuTGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdW5tb3VudGluZ18xLnVubW91bnQobGFzdENoaWxkcmVuW2ldLCBkb20sIGxpZmVjeWNsZSwgZmFsc2UsIGlzUmVjeWNsaW5nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5wYXRjaE5vbktleWVkQ2hpbGRyZW4gPSBwYXRjaE5vbktleWVkQ2hpbGRyZW47XHJcbmZ1bmN0aW9uIHBhdGNoS2V5ZWRDaGlsZHJlbihhLCBiLCBkb20sIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcsIGlzUmVjeWNsaW5nKSB7XHJcbiAgICB2YXIgYUxlbmd0aCA9IGEubGVuZ3RoO1xyXG4gICAgdmFyIGJMZW5ndGggPSBiLmxlbmd0aDtcclxuICAgIHZhciBhRW5kID0gYUxlbmd0aCAtIDE7XHJcbiAgICB2YXIgYkVuZCA9IGJMZW5ndGggLSAxO1xyXG4gICAgdmFyIGFTdGFydCA9IDA7XHJcbiAgICB2YXIgYlN0YXJ0ID0gMDtcclxuICAgIHZhciBpO1xyXG4gICAgdmFyIGo7XHJcbiAgICB2YXIgYU5vZGU7XHJcbiAgICB2YXIgYk5vZGU7XHJcbiAgICB2YXIgbmV4dE5vZGU7XHJcbiAgICB2YXIgbmV4dFBvcztcclxuICAgIHZhciBub2RlO1xyXG4gICAgaWYgKGFMZW5ndGggPT09IDApIHtcclxuICAgICAgICBpZiAoYkxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgICBtb3VudGluZ18xLm1vdW50QXJyYXlDaGlsZHJlbihiLCBkb20sIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChiTGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgdXRpbHNfMS5yZW1vdmVBbGxDaGlsZHJlbihkb20sIGEsIGxpZmVjeWNsZSwgaXNSZWN5Y2xpbmcpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHZhciBhU3RhcnROb2RlID0gYVthU3RhcnRdO1xyXG4gICAgdmFyIGJTdGFydE5vZGUgPSBiW2JTdGFydF07XHJcbiAgICB2YXIgYUVuZE5vZGUgPSBhW2FFbmRdO1xyXG4gICAgdmFyIGJFbmROb2RlID0gYltiRW5kXTtcclxuICAgIGlmIChiU3RhcnROb2RlLmRvbSkge1xyXG4gICAgICAgIGJbYlN0YXJ0XSA9IGJTdGFydE5vZGUgPSBWTm9kZXNfMS5kaXJlY3RDbG9uZShiU3RhcnROb2RlKTtcclxuICAgIH1cclxuICAgIGlmIChiRW5kTm9kZS5kb20pIHtcclxuICAgICAgICBiW2JFbmRdID0gYkVuZE5vZGUgPSBWTm9kZXNfMS5kaXJlY3RDbG9uZShiRW5kTm9kZSk7XHJcbiAgICB9XHJcbiAgICAvLyBTdGVwIDFcclxuICAgIC8qIGVzbGludCBuby1jb25zdGFudC1jb25kaXRpb246IDAgKi9cclxuICAgIG91dGVyOiB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgIC8vIFN5bmMgbm9kZXMgd2l0aCB0aGUgc2FtZSBrZXkgYXQgdGhlIGJlZ2lubmluZy5cclxuICAgICAgICB3aGlsZSAoYVN0YXJ0Tm9kZS5rZXkgPT09IGJTdGFydE5vZGUua2V5KSB7XHJcbiAgICAgICAgICAgIHBhdGNoKGFTdGFydE5vZGUsIGJTdGFydE5vZGUsIGRvbSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRywgaXNSZWN5Y2xpbmcpO1xyXG4gICAgICAgICAgICBhU3RhcnQrKztcclxuICAgICAgICAgICAgYlN0YXJ0Kys7XHJcbiAgICAgICAgICAgIGlmIChhU3RhcnQgPiBhRW5kIHx8IGJTdGFydCA+IGJFbmQpIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrIG91dGVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFTdGFydE5vZGUgPSBhW2FTdGFydF07XHJcbiAgICAgICAgICAgIGJTdGFydE5vZGUgPSBiW2JTdGFydF07XHJcbiAgICAgICAgICAgIGlmIChiU3RhcnROb2RlLmRvbSkge1xyXG4gICAgICAgICAgICAgICAgYltiU3RhcnRdID0gYlN0YXJ0Tm9kZSA9IFZOb2Rlc18xLmRpcmVjdENsb25lKGJTdGFydE5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFN5bmMgbm9kZXMgd2l0aCB0aGUgc2FtZSBrZXkgYXQgdGhlIGVuZC5cclxuICAgICAgICB3aGlsZSAoYUVuZE5vZGUua2V5ID09PSBiRW5kTm9kZS5rZXkpIHtcclxuICAgICAgICAgICAgcGF0Y2goYUVuZE5vZGUsIGJFbmROb2RlLCBkb20sIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcsIGlzUmVjeWNsaW5nKTtcclxuICAgICAgICAgICAgYUVuZC0tO1xyXG4gICAgICAgICAgICBiRW5kLS07XHJcbiAgICAgICAgICAgIGlmIChhU3RhcnQgPiBhRW5kIHx8IGJTdGFydCA+IGJFbmQpIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrIG91dGVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFFbmROb2RlID0gYVthRW5kXTtcclxuICAgICAgICAgICAgYkVuZE5vZGUgPSBiW2JFbmRdO1xyXG4gICAgICAgICAgICBpZiAoYkVuZE5vZGUuZG9tKSB7XHJcbiAgICAgICAgICAgICAgICBiW2JFbmRdID0gYkVuZE5vZGUgPSBWTm9kZXNfMS5kaXJlY3RDbG9uZShiRW5kTm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gTW92ZSBhbmQgc3luYyBub2RlcyBmcm9tIHJpZ2h0IHRvIGxlZnQuXHJcbiAgICAgICAgaWYgKGFFbmROb2RlLmtleSA9PT0gYlN0YXJ0Tm9kZS5rZXkpIHtcclxuICAgICAgICAgICAgcGF0Y2goYUVuZE5vZGUsIGJTdGFydE5vZGUsIGRvbSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRywgaXNSZWN5Y2xpbmcpO1xyXG4gICAgICAgICAgICB1dGlsc18xLmluc2VydE9yQXBwZW5kKGRvbSwgYlN0YXJ0Tm9kZS5kb20sIGFTdGFydE5vZGUuZG9tKTtcclxuICAgICAgICAgICAgYUVuZC0tO1xyXG4gICAgICAgICAgICBiU3RhcnQrKztcclxuICAgICAgICAgICAgYUVuZE5vZGUgPSBhW2FFbmRdO1xyXG4gICAgICAgICAgICBiU3RhcnROb2RlID0gYltiU3RhcnRdO1xyXG4gICAgICAgICAgICBpZiAoYlN0YXJ0Tm9kZS5kb20pIHtcclxuICAgICAgICAgICAgICAgIGJbYlN0YXJ0XSA9IGJTdGFydE5vZGUgPSBWTm9kZXNfMS5kaXJlY3RDbG9uZShiU3RhcnROb2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gTW92ZSBhbmQgc3luYyBub2RlcyBmcm9tIGxlZnQgdG8gcmlnaHQuXHJcbiAgICAgICAgaWYgKGFTdGFydE5vZGUua2V5ID09PSBiRW5kTm9kZS5rZXkpIHtcclxuICAgICAgICAgICAgcGF0Y2goYVN0YXJ0Tm9kZSwgYkVuZE5vZGUsIGRvbSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRywgaXNSZWN5Y2xpbmcpO1xyXG4gICAgICAgICAgICBuZXh0UG9zID0gYkVuZCArIDE7XHJcbiAgICAgICAgICAgIG5leHROb2RlID0gbmV4dFBvcyA8IGIubGVuZ3RoID8gYltuZXh0UG9zXS5kb20gOiBudWxsO1xyXG4gICAgICAgICAgICB1dGlsc18xLmluc2VydE9yQXBwZW5kKGRvbSwgYkVuZE5vZGUuZG9tLCBuZXh0Tm9kZSk7XHJcbiAgICAgICAgICAgIGFTdGFydCsrO1xyXG4gICAgICAgICAgICBiRW5kLS07XHJcbiAgICAgICAgICAgIGFTdGFydE5vZGUgPSBhW2FTdGFydF07XHJcbiAgICAgICAgICAgIGJFbmROb2RlID0gYltiRW5kXTtcclxuICAgICAgICAgICAgaWYgKGJFbmROb2RlLmRvbSkge1xyXG4gICAgICAgICAgICAgICAgYltiRW5kXSA9IGJFbmROb2RlID0gVk5vZGVzXzEuZGlyZWN0Q2xvbmUoYkVuZE5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIGlmIChhU3RhcnQgPiBhRW5kKSB7XHJcbiAgICAgICAgaWYgKGJTdGFydCA8PSBiRW5kKSB7XHJcbiAgICAgICAgICAgIG5leHRQb3MgPSBiRW5kICsgMTtcclxuICAgICAgICAgICAgbmV4dE5vZGUgPSBuZXh0UG9zIDwgYi5sZW5ndGggPyBiW25leHRQb3NdLmRvbSA6IG51bGw7XHJcbiAgICAgICAgICAgIHdoaWxlIChiU3RhcnQgPD0gYkVuZCkge1xyXG4gICAgICAgICAgICAgICAgbm9kZSA9IGJbYlN0YXJ0XTtcclxuICAgICAgICAgICAgICAgIGlmIChub2RlLmRvbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJbYlN0YXJ0XSA9IG5vZGUgPSBWTm9kZXNfMS5kaXJlY3RDbG9uZShub2RlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJTdGFydCsrO1xyXG4gICAgICAgICAgICAgICAgdXRpbHNfMS5pbnNlcnRPckFwcGVuZChkb20sIG1vdW50aW5nXzEubW91bnQobm9kZSwgbnVsbCwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRyksIG5leHROb2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGJTdGFydCA+IGJFbmQpIHtcclxuICAgICAgICB3aGlsZSAoYVN0YXJ0IDw9IGFFbmQpIHtcclxuICAgICAgICAgICAgdW5tb3VudGluZ18xLnVubW91bnQoYVthU3RhcnQrK10sIGRvbSwgbGlmZWN5Y2xlLCBmYWxzZSwgaXNSZWN5Y2xpbmcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGFMZW5ndGggPSBhRW5kIC0gYVN0YXJ0ICsgMTtcclxuICAgICAgICBiTGVuZ3RoID0gYkVuZCAtIGJTdGFydCArIDE7XHJcbiAgICAgICAgdmFyIHNvdXJjZXMgPSBuZXcgQXJyYXkoYkxlbmd0aCk7XHJcbiAgICAgICAgLy8gTWFyayBhbGwgbm9kZXMgYXMgaW5zZXJ0ZWQuXHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGJMZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBzb3VyY2VzW2ldID0gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBtb3ZlZCA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBwb3MgPSAwO1xyXG4gICAgICAgIHZhciBwYXRjaGVkID0gMDtcclxuICAgICAgICAvLyBXaGVuIHNpemVzIGFyZSBzbWFsbCwganVzdCBsb29wIHRoZW0gdGhyb3VnaFxyXG4gICAgICAgIGlmICgoYkxlbmd0aCA8PSA0KSB8fCAoYUxlbmd0aCAqIGJMZW5ndGggPD0gMTYpKSB7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IGFTdGFydDsgaSA8PSBhRW5kOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGFOb2RlID0gYVtpXTtcclxuICAgICAgICAgICAgICAgIGlmIChwYXRjaGVkIDwgYkxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaiA9IGJTdGFydDsgaiA8PSBiRW5kOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYk5vZGUgPSBiW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYU5vZGUua2V5ID09PSBiTm9kZS5rZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZXNbaiAtIGJTdGFydF0gPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBvcyA+IGopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3MgPSBqO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJOb2RlLmRvbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJbal0gPSBiTm9kZSA9IFZOb2Rlc18xLmRpcmVjdENsb25lKGJOb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGNoKGFOb2RlLCBiTm9kZSwgZG9tLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHLCBpc1JlY3ljbGluZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRjaGVkKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhW2ldID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIga2V5SW5kZXggPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIC8vIE1hcCBrZXlzIGJ5IHRoZWlyIGluZGV4IGluIGFycmF5XHJcbiAgICAgICAgICAgIGZvciAoaSA9IGJTdGFydDsgaSA8PSBiRW5kOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGtleUluZGV4LnNldChiW2ldLmtleSwgaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gVHJ5IHRvIHBhdGNoIHNhbWUga2V5c1xyXG4gICAgICAgICAgICBmb3IgKGkgPSBhU3RhcnQ7IGkgPD0gYUVuZDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBhTm9kZSA9IGFbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAocGF0Y2hlZCA8IGJMZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBqID0ga2V5SW5kZXguZ2V0KGFOb2RlLmtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzVW5kZWZpbmVkKGopKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJOb2RlID0gYltqXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlc1tqIC0gYlN0YXJ0XSA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb3MgPiBqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3MgPSBqO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiTm9kZS5kb20pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJbal0gPSBiTm9kZSA9IFZOb2Rlc18xLmRpcmVjdENsb25lKGJOb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRjaChhTm9kZSwgYk5vZGUsIGRvbSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRywgaXNSZWN5Y2xpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRjaGVkKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFbaV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBmYXN0LXBhdGg6IGlmIG5vdGhpbmcgcGF0Y2hlZCByZW1vdmUgYWxsIG9sZCBhbmQgYWRkIGFsbCBuZXdcclxuICAgICAgICBpZiAoYUxlbmd0aCA9PT0gYS5sZW5ndGggJiYgcGF0Y2hlZCA9PT0gMCkge1xyXG4gICAgICAgICAgICB1dGlsc18xLnJlbW92ZUFsbENoaWxkcmVuKGRvbSwgYSwgbGlmZWN5Y2xlLCBpc1JlY3ljbGluZyk7XHJcbiAgICAgICAgICAgIHdoaWxlIChiU3RhcnQgPCBiTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlID0gYltiU3RhcnRdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuZG9tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYltiU3RhcnRdID0gbm9kZSA9IFZOb2Rlc18xLmRpcmVjdENsb25lKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYlN0YXJ0Kys7XHJcbiAgICAgICAgICAgICAgICB1dGlsc18xLmluc2VydE9yQXBwZW5kKGRvbSwgbW91bnRpbmdfMS5tb3VudChub2RlLCBudWxsLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHKSwgbnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGkgPSBhTGVuZ3RoIC0gcGF0Y2hlZDtcclxuICAgICAgICAgICAgd2hpbGUgKGkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBhTm9kZSA9IGFbYVN0YXJ0KytdO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbChhTm9kZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB1bm1vdW50aW5nXzEudW5tb3VudChhTm9kZSwgZG9tLCBsaWZlY3ljbGUsIHRydWUsIGlzUmVjeWNsaW5nKTtcclxuICAgICAgICAgICAgICAgICAgICBpLS07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG1vdmVkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VxID0gbGlzX2FsZ29yaXRobShzb3VyY2VzKTtcclxuICAgICAgICAgICAgICAgIGogPSBzZXEubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IGJMZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzb3VyY2VzW2ldID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3MgPSBpICsgYlN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gYltwb3NdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5kb20pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJbcG9zXSA9IG5vZGUgPSBWTm9kZXNfMS5kaXJlY3RDbG9uZShub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0UG9zID0gcG9zICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dE5vZGUgPSBuZXh0UG9zIDwgYi5sZW5ndGggPyBiW25leHRQb3NdLmRvbSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzXzEuaW5zZXJ0T3JBcHBlbmQoZG9tLCBtb3VudGluZ18xLm1vdW50KG5vZGUsIGRvbSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRyksIG5leHROb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqIDwgMCB8fCBpICE9PSBzZXFbal0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcyA9IGkgKyBiU3RhcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gYltwb3NdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFBvcyA9IHBvcyArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0Tm9kZSA9IG5leHRQb3MgPCBiLmxlbmd0aCA/IGJbbmV4dFBvc10uZG9tIDogbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzXzEuaW5zZXJ0T3JBcHBlbmQoZG9tLCBub2RlLmRvbSwgbmV4dE5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgai0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHBhdGNoZWQgIT09IGJMZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIC8vIHdoZW4gcGF0Y2hlZCBjb3VudCBkb2Vzbid0IG1hdGNoIGIgbGVuZ3RoIHdlIG5lZWQgdG8gaW5zZXJ0IHRob3NlIG5ldyBvbmVzXHJcbiAgICAgICAgICAgICAgICAvLyBsb29wIGJhY2t3YXJkcyBzbyB3ZSBjYW4gdXNlIGluc2VydEJlZm9yZVxyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gYkxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZXNbaV0gPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcyA9IGkgKyBiU3RhcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSBiW3Bvc107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChub2RlLmRvbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYltwb3NdID0gbm9kZSA9IFZOb2Rlc18xLmRpcmVjdENsb25lKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRQb3MgPSBwb3MgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0Tm9kZSA9IG5leHRQb3MgPCBiLmxlbmd0aCA/IGJbbmV4dFBvc10uZG9tIDogbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXRpbHNfMS5pbnNlcnRPckFwcGVuZChkb20sIG1vdW50aW5nXzEubW91bnQobm9kZSwgbnVsbCwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRyksIG5leHROb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5wYXRjaEtleWVkQ2hpbGRyZW4gPSBwYXRjaEtleWVkQ2hpbGRyZW47XHJcbi8vIC8vIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xvbmdlc3RfaW5jcmVhc2luZ19zdWJzZXF1ZW5jZVxyXG5mdW5jdGlvbiBsaXNfYWxnb3JpdGhtKGFycikge1xyXG4gICAgdmFyIHAgPSBhcnIuc2xpY2UoMCk7XHJcbiAgICB2YXIgcmVzdWx0ID0gWzBdO1xyXG4gICAgdmFyIGk7XHJcbiAgICB2YXIgajtcclxuICAgIHZhciB1O1xyXG4gICAgdmFyIHY7XHJcbiAgICB2YXIgYztcclxuICAgIHZhciBsZW4gPSBhcnIubGVuZ3RoO1xyXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGFyckkgPSBhcnJbaV07XHJcbiAgICAgICAgaWYgKGFyckkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBqID0gcmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXTtcclxuICAgICAgICBpZiAoYXJyW2pdIDwgYXJySSkge1xyXG4gICAgICAgICAgICBwW2ldID0gajtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goaSk7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB1ID0gMDtcclxuICAgICAgICB2ID0gcmVzdWx0Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgd2hpbGUgKHUgPCB2KSB7XHJcbiAgICAgICAgICAgIGMgPSAoKHUgKyB2KSAvIDIpIHwgMDtcclxuICAgICAgICAgICAgaWYgKGFycltyZXN1bHRbY11dIDwgYXJySSkge1xyXG4gICAgICAgICAgICAgICAgdSA9IGMgKyAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdiA9IGM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFyckkgPCBhcnJbcmVzdWx0W3VdXSkge1xyXG4gICAgICAgICAgICBpZiAodSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHBbaV0gPSByZXN1bHRbdSAtIDFdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc3VsdFt1XSA9IGk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdSA9IHJlc3VsdC5sZW5ndGg7XHJcbiAgICB2ID0gcmVzdWx0W3UgLSAxXTtcclxuICAgIHdoaWxlICh1LS0gPiAwKSB7XHJcbiAgICAgICAgcmVzdWx0W3VdID0gdjtcclxuICAgICAgICB2ID0gcFt2XTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuZnVuY3Rpb24gaXNBdHRyQW5FdmVudChhdHRyKSB7XHJcbiAgICByZXR1cm4gYXR0clswXSA9PT0gJ28nICYmIGF0dHJbMV0gPT09ICduJztcclxufVxyXG5leHBvcnRzLmlzQXR0ckFuRXZlbnQgPSBpc0F0dHJBbkV2ZW50O1xyXG5mdW5jdGlvbiBwYXRjaFByb3AocHJvcCwgbGFzdFZhbHVlLCBuZXh0VmFsdWUsIGRvbSwgaXNTVkcsIGhhc0NvbnRyb2xsZWRWYWx1ZSkge1xyXG4gICAgaWYgKGxhc3RWYWx1ZSAhPT0gbmV4dFZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHByb3AgaW4gY29uc3RhbnRzXzEuc2tpcFByb3BzIHx8IChoYXNDb250cm9sbGVkVmFsdWUgJiYgcHJvcCA9PT0gJ3ZhbHVlJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChwcm9wIGluIGNvbnN0YW50c18xLmJvb2xlYW5Qcm9wcykge1xyXG4gICAgICAgICAgICBwcm9wID0gcHJvcCA9PT0gJ2F1dG9Gb2N1cycgPyBwcm9wLnRvTG93ZXJDYXNlKCkgOiBwcm9wO1xyXG4gICAgICAgICAgICBkb21bcHJvcF0gPSAhIW5leHRWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocHJvcCBpbiBjb25zdGFudHNfMS5zdHJpY3RQcm9wcykge1xyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbE9yVW5kZWYobmV4dFZhbHVlKSA/ICcnIDogbmV4dFZhbHVlO1xyXG4gICAgICAgICAgICBpZiAoZG9tW3Byb3BdICE9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgZG9tW3Byb3BdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaXNBdHRyQW5FdmVudChwcm9wKSkge1xyXG4gICAgICAgICAgICBwYXRjaEV2ZW50KHByb3AsIGxhc3RWYWx1ZSwgbmV4dFZhbHVlLCBkb20pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbE9yVW5kZWYobmV4dFZhbHVlKSkge1xyXG4gICAgICAgICAgICBkb20ucmVtb3ZlQXR0cmlidXRlKHByb3ApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChwcm9wID09PSAnc3R5bGUnKSB7XHJcbiAgICAgICAgICAgIHBhdGNoU3R5bGUobGFzdFZhbHVlLCBuZXh0VmFsdWUsIGRvbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHByb3AgPT09ICdkYW5nZXJvdXNseVNldElubmVySFRNTCcpIHtcclxuICAgICAgICAgICAgdmFyIGxhc3RIdG1sID0gbGFzdFZhbHVlICYmIGxhc3RWYWx1ZS5fX2h0bWw7XHJcbiAgICAgICAgICAgIHZhciBuZXh0SHRtbCA9IG5leHRWYWx1ZSAmJiBuZXh0VmFsdWUuX19odG1sO1xyXG4gICAgICAgICAgICBpZiAobGFzdEh0bWwgIT09IG5leHRIdG1sKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNOdWxsT3JVbmRlZihuZXh0SHRtbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkb20uaW5uZXJIVE1MID0gbmV4dEh0bWw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFdlIG9wdGltaXplIGZvciBOUyBiZWluZyBib29sZWFuLiBJdHMgOTkuOSUgdGltZSBmYWxzZVxyXG4gICAgICAgICAgICBpZiAoaXNTVkcgJiYgcHJvcCBpbiBjb25zdGFudHNfMS5uYW1lc3BhY2VzKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBlbmQgdXAgaW4gdGhpcyBwYXRoIHdlIGNhbiByZWFkIHByb3BlcnR5IGFnYWluXHJcbiAgICAgICAgICAgICAgICBkb20uc2V0QXR0cmlidXRlTlMoY29uc3RhbnRzXzEubmFtZXNwYWNlc1twcm9wXSwgcHJvcCwgbmV4dFZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRvbS5zZXRBdHRyaWJ1dGUocHJvcCwgbmV4dFZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLnBhdGNoUHJvcCA9IHBhdGNoUHJvcDtcclxuZnVuY3Rpb24gcGF0Y2hFdmVudChuYW1lLCBsYXN0VmFsdWUsIG5leHRWYWx1ZSwgZG9tKSB7XHJcbiAgICBpZiAobGFzdFZhbHVlICE9PSBuZXh0VmFsdWUpIHtcclxuICAgICAgICBpZiAobmFtZSBpbiBjb25zdGFudHNfMS5kZWxlZ2F0ZWRFdmVudHMpIHtcclxuICAgICAgICAgICAgZGVsZWdhdGlvbl8xLmhhbmRsZUV2ZW50KG5hbWUsIGxhc3RWYWx1ZSwgbmV4dFZhbHVlLCBkb20pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIG5hbWVMb3dlckNhc2UgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIHZhciBkb21FdmVudCA9IGRvbVtuYW1lTG93ZXJDYXNlXTtcclxuICAgICAgICAgICAgLy8gaWYgdGhlIGZ1bmN0aW9uIGlzIHdyYXBwZWQsIHRoYXQgbWVhbnMgaXQncyBiZWVuIGNvbnRyb2xsZWQgYnkgYSB3cmFwcGVyXHJcbiAgICAgICAgICAgIGlmIChkb21FdmVudCAmJiBkb21FdmVudC53cmFwcGVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzRnVuY3Rpb24obmV4dFZhbHVlKSAmJiAhaW5mZXJub19zaGFyZWRfMS5pc051bGxPclVuZGVmKG5leHRWYWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIHZhciBsaW5rRXZlbnRfMSA9IG5leHRWYWx1ZS5ldmVudDtcclxuICAgICAgICAgICAgICAgIGlmIChsaW5rRXZlbnRfMSAmJiBpbmZlcm5vX3NoYXJlZF8xLmlzRnVuY3Rpb24obGlua0V2ZW50XzEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkb20uX2RhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9tW25hbWVMb3dlckNhc2VdID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmtFdmVudF8xKGUuY3VycmVudFRhcmdldC5fZGF0YSwgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGRvbS5fZGF0YSA9IG5leHRWYWx1ZS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5mZXJub19zaGFyZWRfMS50aHJvd0Vycm9yKFwiYW4gZXZlbnQgb24gYSBWTm9kZSBcXFwiXCIgKyBuYW1lICsgXCJcXFwiLiB3YXMgbm90IGEgZnVuY3Rpb24gb3IgYSB2YWxpZCBsaW5rRXZlbnQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpbmZlcm5vX3NoYXJlZF8xLnRocm93RXJyb3IoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRvbVtuYW1lTG93ZXJDYXNlXSA9IG5leHRWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLnBhdGNoRXZlbnQgPSBwYXRjaEV2ZW50O1xyXG4vLyBXZSBhcmUgYXNzdW1pbmcgaGVyZSB0aGF0IHdlIGNvbWUgZnJvbSBwYXRjaFByb3Agcm91dGluZVxyXG4vLyAtbmV4dEF0dHJWYWx1ZSBjYW5ub3QgYmUgbnVsbCBvciB1bmRlZmluZWRcclxuZnVuY3Rpb24gcGF0Y2hTdHlsZShsYXN0QXR0clZhbHVlLCBuZXh0QXR0clZhbHVlLCBkb20pIHtcclxuICAgIHZhciBkb21TdHlsZSA9IGRvbS5zdHlsZTtcclxuICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzU3RyaW5nKG5leHRBdHRyVmFsdWUpKSB7XHJcbiAgICAgICAgZG9tU3R5bGUuY3NzVGV4dCA9IG5leHRBdHRyVmFsdWU7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZm9yICh2YXIgc3R5bGUgaW4gbmV4dEF0dHJWYWx1ZSkge1xyXG4gICAgICAgIC8vIGRvIG5vdCBhZGQgYSBoYXNPd25Qcm9wZXJ0eSBjaGVjayBoZXJlLCBpdCBhZmZlY3RzIHBlcmZvcm1hbmNlXHJcbiAgICAgICAgdmFyIHZhbHVlID0gbmV4dEF0dHJWYWx1ZVtzdHlsZV07XHJcbiAgICAgICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzTnVtYmVyKHZhbHVlKSB8fCBzdHlsZSBpbiBjb25zdGFudHNfMS5pc1VuaXRsZXNzTnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGRvbVN0eWxlW3N0eWxlXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZG9tU3R5bGVbc3R5bGVdID0gdmFsdWUgKyAncHgnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc051bGxPclVuZGVmKGxhc3RBdHRyVmFsdWUpKSB7XHJcbiAgICAgICAgZm9yICh2YXIgc3R5bGUgaW4gbGFzdEF0dHJWYWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc051bGxPclVuZGVmKG5leHRBdHRyVmFsdWVbc3R5bGVdKSkge1xyXG4gICAgICAgICAgICAgICAgZG9tU3R5bGVbc3R5bGVdID0gJyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5wYXRjaFN0eWxlID0gcGF0Y2hTdHlsZTtcclxuZnVuY3Rpb24gcmVtb3ZlUHJvcChwcm9wLCBsYXN0VmFsdWUsIGRvbSkge1xyXG4gICAgaWYgKHByb3AgPT09ICd2YWx1ZScpIHtcclxuICAgICAgICBkb20udmFsdWUgPSAnJztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHByb3AgPT09ICdzdHlsZScpIHtcclxuICAgICAgICBkb20ucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaXNBdHRyQW5FdmVudChwcm9wKSkge1xyXG4gICAgICAgIGRlbGVnYXRpb25fMS5oYW5kbGVFdmVudChuYW1lLCBsYXN0VmFsdWUsIG51bGwsIGRvbSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBkb20ucmVtb3ZlQXR0cmlidXRlKHByb3ApO1xyXG4gICAgfVxyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBpbmZlcm5vX3NoYXJlZF8xID0gcmVxdWlyZShcImluZmVybm8tc2hhcmVkXCIpO1xyXG52YXIgb3B0aW9uc18xID0gcmVxdWlyZShcIi4uL2NvcmUvb3B0aW9uc1wiKTtcclxudmFyIFZOb2Rlc18xID0gcmVxdWlyZShcIi4uL2NvcmUvVk5vZGVzXCIpO1xyXG52YXIgcGF0Y2hpbmdfMSA9IHJlcXVpcmUoXCIuL3BhdGNoaW5nXCIpO1xyXG52YXIgcmVjeWNsaW5nXzEgPSByZXF1aXJlKFwiLi9yZWN5Y2xpbmdcIik7XHJcbnZhciByZW5kZXJpbmdfMSA9IHJlcXVpcmUoXCIuL3JlbmRlcmluZ1wiKTtcclxudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcclxudmFyIHByb2Nlc3NFbGVtZW50XzEgPSByZXF1aXJlKFwiLi93cmFwcGVycy9wcm9jZXNzRWxlbWVudFwiKTtcclxuZnVuY3Rpb24gbW91bnQodk5vZGUsIHBhcmVudERvbSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRykge1xyXG4gICAgdmFyIGZsYWdzID0gdk5vZGUuZmxhZ3M7XHJcbiAgICBpZiAoZmxhZ3MgJiAzOTcwIC8qIEVsZW1lbnQgKi8pIHtcclxuICAgICAgICByZXR1cm4gbW91bnRFbGVtZW50KHZOb2RlLCBwYXJlbnREb20sIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZmxhZ3MgJiAyOCAvKiBDb21wb25lbnQgKi8pIHtcclxuICAgICAgICByZXR1cm4gbW91bnRDb21wb25lbnQodk5vZGUsIHBhcmVudERvbSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRywgZmxhZ3MgJiA0IC8qIENvbXBvbmVudENsYXNzICovKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGZsYWdzICYgNDA5NiAvKiBWb2lkICovKSB7XHJcbiAgICAgICAgcmV0dXJuIG1vdW50Vm9pZCh2Tm9kZSwgcGFyZW50RG9tKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGZsYWdzICYgMSAvKiBUZXh0ICovKSB7XHJcbiAgICAgICAgcmV0dXJuIG1vdW50VGV4dCh2Tm9kZSwgcGFyZW50RG9tKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygdk5vZGUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICBpbmZlcm5vX3NoYXJlZF8xLnRocm93RXJyb3IoXCJtb3VudCgpIHJlY2VpdmVkIGFuIG9iamVjdCB0aGF0J3Mgbm90IGEgdmFsaWQgVk5vZGUsIHlvdSBzaG91bGQgc3RyaW5naWZ5IGl0IGZpcnN0LiBPYmplY3Q6IFxcXCJcIiArIEpTT04uc3RyaW5naWZ5KHZOb2RlKSArIFwiXFxcIi5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbmZlcm5vX3NoYXJlZF8xLnRocm93RXJyb3IoXCJtb3VudCgpIGV4cGVjdHMgYSB2YWxpZCBWTm9kZSwgaW5zdGVhZCBpdCByZWNlaXZlZCBhbiBvYmplY3Qgd2l0aCB0aGUgdHlwZSBcXFwiXCIgKyB0eXBlb2Ygdk5vZGUgKyBcIlxcXCIuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZmVybm9fc2hhcmVkXzEudGhyb3dFcnJvcigpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMubW91bnQgPSBtb3VudDtcclxuZnVuY3Rpb24gbW91bnRUZXh0KHZOb2RlLCBwYXJlbnREb20pIHtcclxuICAgIHZhciBkb20gPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh2Tm9kZS5jaGlsZHJlbik7XHJcbiAgICB2Tm9kZS5kb20gPSBkb207XHJcbiAgICBpZiAocGFyZW50RG9tKSB7XHJcbiAgICAgICAgdXRpbHNfMS5hcHBlbmRDaGlsZChwYXJlbnREb20sIGRvbSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZG9tO1xyXG59XHJcbmV4cG9ydHMubW91bnRUZXh0ID0gbW91bnRUZXh0O1xyXG5mdW5jdGlvbiBtb3VudFZvaWQodk5vZGUsIHBhcmVudERvbSkge1xyXG4gICAgdmFyIGRvbSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcclxuICAgIHZOb2RlLmRvbSA9IGRvbTtcclxuICAgIGlmIChwYXJlbnREb20pIHtcclxuICAgICAgICB1dGlsc18xLmFwcGVuZENoaWxkKHBhcmVudERvbSwgZG9tKTtcclxuICAgIH1cclxuICAgIHJldHVybiBkb207XHJcbn1cclxuZXhwb3J0cy5tb3VudFZvaWQgPSBtb3VudFZvaWQ7XHJcbmZ1bmN0aW9uIG1vdW50RWxlbWVudCh2Tm9kZSwgcGFyZW50RG9tLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHKSB7XHJcbiAgICBpZiAob3B0aW9uc18xLmRlZmF1bHQucmVjeWNsaW5nRW5hYmxlZCkge1xyXG4gICAgICAgIHZhciBkb21fMSA9IHJlY3ljbGluZ18xLnJlY3ljbGVFbGVtZW50KHZOb2RlLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHKTtcclxuICAgICAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNOdWxsKGRvbV8xKSkge1xyXG4gICAgICAgICAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNOdWxsKHBhcmVudERvbSkpIHtcclxuICAgICAgICAgICAgICAgIHV0aWxzXzEuYXBwZW5kQ2hpbGQocGFyZW50RG9tLCBkb21fMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRvbV8xO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHZhciBmbGFncyA9IHZOb2RlLmZsYWdzO1xyXG4gICAgaWYgKGlzU1ZHIHx8IChmbGFncyAmIDEyOCAvKiBTdmdFbGVtZW50ICovKSkge1xyXG4gICAgICAgIGlzU1ZHID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHZhciBkb20gPSB1dGlsc18xLmRvY3VtZW50Q3JlYXRlRWxlbWVudCh2Tm9kZS50eXBlLCBpc1NWRyk7XHJcbiAgICB2YXIgY2hpbGRyZW4gPSB2Tm9kZS5jaGlsZHJlbjtcclxuICAgIHZhciBwcm9wcyA9IHZOb2RlLnByb3BzO1xyXG4gICAgdmFyIGNsYXNzTmFtZSA9IHZOb2RlLmNsYXNzTmFtZTtcclxuICAgIHZhciByZWYgPSB2Tm9kZS5yZWY7XHJcbiAgICB2Tm9kZS5kb20gPSBkb207XHJcbiAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNJbnZhbGlkKGNoaWxkcmVuKSkge1xyXG4gICAgICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzU3RyaW5nT3JOdW1iZXIoY2hpbGRyZW4pKSB7XHJcbiAgICAgICAgICAgIHV0aWxzXzEuc2V0VGV4dENvbnRlbnQoZG9tLCBjaGlsZHJlbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNBcnJheShjaGlsZHJlbikpIHtcclxuICAgICAgICAgICAgbW91bnRBcnJheUNoaWxkcmVuKGNoaWxkcmVuLCBkb20sIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChWTm9kZXNfMS5pc1ZOb2RlKGNoaWxkcmVuKSkge1xyXG4gICAgICAgICAgICBtb3VudChjaGlsZHJlbiwgZG9tLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNOdWxsKHByb3BzKSkge1xyXG4gICAgICAgIHZhciBoYXNDb250cm9sbGVkVmFsdWUgPSBmYWxzZTtcclxuICAgICAgICB2YXIgaXNGb3JtRWxlbWVudCA9IChmbGFncyAmIDM1ODQgLyogRm9ybUVsZW1lbnQgKi8pID4gMDtcclxuICAgICAgICBpZiAoaXNGb3JtRWxlbWVudCkge1xyXG4gICAgICAgICAgICBoYXNDb250cm9sbGVkVmFsdWUgPSBwcm9jZXNzRWxlbWVudF8xLmlzQ29udHJvbGxlZEZvcm1FbGVtZW50KHByb3BzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBwcm9wcykge1xyXG4gICAgICAgICAgICAvLyBkbyBub3QgYWRkIGEgaGFzT3duUHJvcGVydHkgY2hlY2sgaGVyZSwgaXQgYWZmZWN0cyBwZXJmb3JtYW5jZVxyXG4gICAgICAgICAgICBwYXRjaGluZ18xLnBhdGNoUHJvcChwcm9wLCBudWxsLCBwcm9wc1twcm9wXSwgZG9tLCBpc1NWRywgaGFzQ29udHJvbGxlZFZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzRm9ybUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgcHJvY2Vzc0VsZW1lbnRfMS5wcm9jZXNzRWxlbWVudChmbGFncywgdk5vZGUsIGRvbSwgcHJvcHMsIHRydWUsIGhhc0NvbnRyb2xsZWRWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNOdWxsT3JVbmRlZihjbGFzc05hbWUpKSB7XHJcbiAgICAgICAgZG9tLnJlbW92ZUF0dHJpYnV0ZSgnY2xhc3MnKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGlmIChpc1NWRykge1xyXG4gICAgICAgICAgICBkb20uc2V0QXR0cmlidXRlKCdjbGFzcycsIGNsYXNzTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkb20uY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc051bGwocmVmKSkge1xyXG4gICAgICAgIG1vdW50UmVmKGRvbSwgcmVmLCBsaWZlY3ljbGUpO1xyXG4gICAgfVxyXG4gICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbChwYXJlbnREb20pKSB7XHJcbiAgICAgICAgdXRpbHNfMS5hcHBlbmRDaGlsZChwYXJlbnREb20sIGRvbSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZG9tO1xyXG59XHJcbmV4cG9ydHMubW91bnRFbGVtZW50ID0gbW91bnRFbGVtZW50O1xyXG5mdW5jdGlvbiBtb3VudEFycmF5Q2hpbGRyZW4oY2hpbGRyZW4sIGRvbSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRykge1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNoaWxkcmVuLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGNoaWxkID0gY2hpbGRyZW5baV07XHJcbiAgICAgICAgLy8gVmVyaWZ5IGNhbiBzdHJpbmcvbnVtYmVyIGJlIGhlcmUuIG1pZ2h0IGNhdXNlIGRlLW9wdC4gLSBOb3JtYWxpemF0aW9uIHRha2VzIGNhcmUgb2YgaXQuXHJcbiAgICAgICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzSW52YWxpZChjaGlsZCkpIHtcclxuICAgICAgICAgICAgaWYgKGNoaWxkLmRvbSkge1xyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW5baV0gPSBjaGlsZCA9IFZOb2Rlc18xLmRpcmVjdENsb25lKGNoaWxkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtb3VudChjaGlsZHJlbltpXSwgZG9tLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5tb3VudEFycmF5Q2hpbGRyZW4gPSBtb3VudEFycmF5Q2hpbGRyZW47XHJcbmZ1bmN0aW9uIG1vdW50Q29tcG9uZW50KHZOb2RlLCBwYXJlbnREb20sIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcsIGlzQ2xhc3MpIHtcclxuICAgIGlmIChvcHRpb25zXzEuZGVmYXVsdC5yZWN5Y2xpbmdFbmFibGVkKSB7XHJcbiAgICAgICAgdmFyIGRvbV8yID0gcmVjeWNsaW5nXzEucmVjeWNsZUNvbXBvbmVudCh2Tm9kZSwgbGlmZWN5Y2xlLCBjb250ZXh0LCBpc1NWRyk7XHJcbiAgICAgICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbChkb21fMikpIHtcclxuICAgICAgICAgICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbChwYXJlbnREb20pKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlsc18xLmFwcGVuZENoaWxkKHBhcmVudERvbSwgZG9tXzIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkb21fMjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB2YXIgdHlwZSA9IHZOb2RlLnR5cGU7XHJcbiAgICB2YXIgcHJvcHMgPSB2Tm9kZS5wcm9wcyB8fCB1dGlsc18xLkVNUFRZX09CSjtcclxuICAgIHZhciByZWYgPSB2Tm9kZS5yZWY7XHJcbiAgICB2YXIgZG9tO1xyXG4gICAgaWYgKGlzQ2xhc3MpIHtcclxuICAgICAgICB2YXIgaW5zdGFuY2UgPSB1dGlsc18xLmNyZWF0ZUNsYXNzQ29tcG9uZW50SW5zdGFuY2Uodk5vZGUsIHR5cGUsIHByb3BzLCBjb250ZXh0LCBpc1NWRywgbGlmZWN5Y2xlKTtcclxuICAgICAgICB2YXIgaW5wdXQgPSBpbnN0YW5jZS5fbGFzdElucHV0O1xyXG4gICAgICAgIGluc3RhbmNlLl92Tm9kZSA9IHZOb2RlO1xyXG4gICAgICAgIHZOb2RlLmRvbSA9IGRvbSA9IG1vdW50KGlucHV0LCBudWxsLCBsaWZlY3ljbGUsIGluc3RhbmNlLl9jaGlsZENvbnRleHQsIGlzU1ZHKTtcclxuICAgICAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNOdWxsKHBhcmVudERvbSkpIHtcclxuICAgICAgICAgICAgdXRpbHNfMS5hcHBlbmRDaGlsZChwYXJlbnREb20sIGRvbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1vdW50Q2xhc3NDb21wb25lbnRDYWxsYmFja3Modk5vZGUsIHJlZiwgaW5zdGFuY2UsIGxpZmVjeWNsZSk7XHJcbiAgICAgICAgaW5zdGFuY2UuX3VwZGF0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgb3B0aW9uc18xLmRlZmF1bHQuZmluZERPTU5vZGVFbmFibGVkICYmIHJlbmRlcmluZ18xLmNvbXBvbmVudFRvRE9NTm9kZU1hcC5zZXQoaW5zdGFuY2UsIGRvbSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB2YXIgaW5wdXQgPSB1dGlsc18xLmNyZWF0ZUZ1bmN0aW9uYWxDb21wb25lbnRJbnB1dCh2Tm9kZSwgdHlwZSwgcHJvcHMsIGNvbnRleHQpO1xyXG4gICAgICAgIHZOb2RlLmRvbSA9IGRvbSA9IG1vdW50KGlucHV0LCBudWxsLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHKTtcclxuICAgICAgICB2Tm9kZS5jaGlsZHJlbiA9IGlucHV0O1xyXG4gICAgICAgIG1vdW50RnVuY3Rpb25hbENvbXBvbmVudENhbGxiYWNrcyhyZWYsIGRvbSwgbGlmZWN5Y2xlKTtcclxuICAgICAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNOdWxsKHBhcmVudERvbSkpIHtcclxuICAgICAgICAgICAgdXRpbHNfMS5hcHBlbmRDaGlsZChwYXJlbnREb20sIGRvbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRvbTtcclxufVxyXG5leHBvcnRzLm1vdW50Q29tcG9uZW50ID0gbW91bnRDb21wb25lbnQ7XHJcbmZ1bmN0aW9uIG1vdW50Q2xhc3NDb21wb25lbnRDYWxsYmFja3Modk5vZGUsIHJlZiwgaW5zdGFuY2UsIGxpZmVjeWNsZSkge1xyXG4gICAgaWYgKHJlZikge1xyXG4gICAgICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzRnVuY3Rpb24ocmVmKSkge1xyXG4gICAgICAgICAgICByZWYoaW5zdGFuY2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzU3RyaW5nT3JOdW1iZXIocmVmKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZmVybm9fc2hhcmVkXzEudGhyb3dFcnJvcignc3RyaW5nIFwicmVmc1wiIGFyZSBub3Qgc3VwcG9ydGVkIGluIEluZmVybm8gMS4wLiBVc2UgY2FsbGJhY2sgXCJyZWZzXCIgaW5zdGVhZC4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNPYmplY3QocmVmKSAmJiAodk5vZGUuZmxhZ3MgJiA0IC8qIENvbXBvbmVudENsYXNzICovKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZmVybm9fc2hhcmVkXzEudGhyb3dFcnJvcignZnVuY3Rpb25hbCBjb21wb25lbnQgbGlmZWN5Y2xlIGV2ZW50cyBhcmUgbm90IHN1cHBvcnRlZCBvbiBFUzIwMTUgY2xhc3MgY29tcG9uZW50cy4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZmVybm9fc2hhcmVkXzEudGhyb3dFcnJvcihcImEgYmFkIHZhbHVlIGZvciBcXFwicmVmXFxcIiB3YXMgdXNlZCBvbiBjb21wb25lbnQ6IFxcXCJcIiArIEpTT04uc3RyaW5naWZ5KHJlZikgKyBcIlxcXCJcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW5mZXJub19zaGFyZWRfMS50aHJvd0Vycm9yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdmFyIGhhc0RpZE1vdW50ID0gIWluZmVybm9fc2hhcmVkXzEuaXNVbmRlZmluZWQoaW5zdGFuY2UuY29tcG9uZW50RGlkTW91bnQpO1xyXG4gICAgdmFyIGFmdGVyTW91bnQgPSBvcHRpb25zXzEuZGVmYXVsdC5hZnRlck1vdW50O1xyXG4gICAgaWYgKGhhc0RpZE1vdW50IHx8ICFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbChhZnRlck1vdW50KSkge1xyXG4gICAgICAgIGxpZmVjeWNsZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLl91cGRhdGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChhZnRlck1vdW50KSB7XHJcbiAgICAgICAgICAgICAgICBhZnRlck1vdW50KHZOb2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaGFzRGlkTW91bnQpIHtcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlLmNvbXBvbmVudERpZE1vdW50KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW5zdGFuY2UuX3VwZGF0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5tb3VudENsYXNzQ29tcG9uZW50Q2FsbGJhY2tzID0gbW91bnRDbGFzc0NvbXBvbmVudENhbGxiYWNrcztcclxuZnVuY3Rpb24gbW91bnRGdW5jdGlvbmFsQ29tcG9uZW50Q2FsbGJhY2tzKHJlZiwgZG9tLCBsaWZlY3ljbGUpIHtcclxuICAgIGlmIChyZWYpIHtcclxuICAgICAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNOdWxsT3JVbmRlZihyZWYub25Db21wb25lbnRXaWxsTW91bnQpKSB7XHJcbiAgICAgICAgICAgIHJlZi5vbkNvbXBvbmVudFdpbGxNb3VudCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNOdWxsT3JVbmRlZihyZWYub25Db21wb25lbnREaWRNb3VudCkpIHtcclxuICAgICAgICAgICAgbGlmZWN5Y2xlLmFkZExpc3RlbmVyKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlZi5vbkNvbXBvbmVudERpZE1vdW50KGRvbSk7IH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLm1vdW50RnVuY3Rpb25hbENvbXBvbmVudENhbGxiYWNrcyA9IG1vdW50RnVuY3Rpb25hbENvbXBvbmVudENhbGxiYWNrcztcclxuZnVuY3Rpb24gbW91bnRSZWYoZG9tLCB2YWx1ZSwgbGlmZWN5Y2xlKSB7XHJcbiAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc0Z1bmN0aW9uKHZhbHVlKSkge1xyXG4gICAgICAgIGxpZmVjeWNsZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAoKSB7IHJldHVybiB2YWx1ZShkb20pOyB9KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzSW52YWxpZCh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xyXG4gICAgICAgICAgICBpbmZlcm5vX3NoYXJlZF8xLnRocm93RXJyb3IoJ3N0cmluZyBcInJlZnNcIiBhcmUgbm90IHN1cHBvcnRlZCBpbiBJbmZlcm5vIDEuMC4gVXNlIGNhbGxiYWNrIFwicmVmc1wiIGluc3RlYWQuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZmVybm9fc2hhcmVkXzEudGhyb3dFcnJvcigpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMubW91bnRSZWYgPSBtb3VudFJlZjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGluZmVybm9fc2hhcmVkXzEgPSByZXF1aXJlKFwiaW5mZXJuby1zaGFyZWRcIik7XHJcbnZhciBvcHRpb25zXzEgPSByZXF1aXJlKFwiLi4vY29yZS9vcHRpb25zXCIpO1xyXG52YXIgVk5vZGVzXzEgPSByZXF1aXJlKFwiLi4vY29yZS9WTm9kZXNcIik7XHJcbnZhciBjb25zdGFudHNfMSA9IHJlcXVpcmUoXCIuL2NvbnN0YW50c1wiKTtcclxudmFyIG1vdW50aW5nXzEgPSByZXF1aXJlKFwiLi9tb3VudGluZ1wiKTtcclxudmFyIHBhdGNoaW5nXzEgPSByZXF1aXJlKFwiLi9wYXRjaGluZ1wiKTtcclxudmFyIHJlbmRlcmluZ18xID0gcmVxdWlyZShcIi4vcmVuZGVyaW5nXCIpO1xyXG52YXIgdW5tb3VudGluZ18xID0gcmVxdWlyZShcIi4vdW5tb3VudGluZ1wiKTtcclxuLy8gV2UgbmVlZCBFTVBUWV9PQkogZGVmaW5lZCBpbiBvbmUgcGxhY2UuXHJcbi8vIEl0cyB1c2VkIGZvciBjb21wYXJpc29uIHNvIHdlIGNhbnQgaW5saW5lIGl0IGludG8gc2hhcmVkXHJcbmV4cG9ydHMuRU1QVFlfT0JKID0ge307XHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XHJcbiAgICBPYmplY3QuZnJlZXplKGV4cG9ydHMuRU1QVFlfT0JKKTtcclxufVxyXG5mdW5jdGlvbiBjcmVhdGVDbGFzc0NvbXBvbmVudEluc3RhbmNlKHZOb2RlLCBDb21wb25lbnQsIHByb3BzLCBjb250ZXh0LCBpc1NWRywgbGlmZWN5Y2xlKSB7XHJcbiAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc1VuZGVmaW5lZChjb250ZXh0KSkge1xyXG4gICAgICAgIGNvbnRleHQgPSBleHBvcnRzLkVNUFRZX09CSjsgLy8gQ29udGV4dCBzaG91bGQgbm90IGJlIG11dGFibGVcclxuICAgIH1cclxuICAgIHZhciBpbnN0YW5jZSA9IG5ldyBDb21wb25lbnQocHJvcHMsIGNvbnRleHQpO1xyXG4gICAgdk5vZGUuY2hpbGRyZW4gPSBpbnN0YW5jZTtcclxuICAgIGluc3RhbmNlLl9ibG9ja1NldFN0YXRlID0gZmFsc2U7XHJcbiAgICBpbnN0YW5jZS5jb250ZXh0ID0gY29udGV4dDtcclxuICAgIGlmIChpbnN0YW5jZS5wcm9wcyA9PT0gZXhwb3J0cy5FTVBUWV9PQkopIHtcclxuICAgICAgICBpbnN0YW5jZS5wcm9wcyA9IHByb3BzO1xyXG4gICAgfVxyXG4gICAgaW5zdGFuY2UuX3BhdGNoID0gcGF0Y2hpbmdfMS5wYXRjaDtcclxuICAgIGlmIChvcHRpb25zXzEuZGVmYXVsdC5maW5kRE9NTm9kZUVuYWJsZWQpIHtcclxuICAgICAgICBpbnN0YW5jZS5fY29tcG9uZW50VG9ET01Ob2RlTWFwID0gcmVuZGVyaW5nXzEuY29tcG9uZW50VG9ET01Ob2RlTWFwO1xyXG4gICAgfVxyXG4gICAgLy8gc2V0U3RhdGUgY2FsbGJhY2tzIG11c3QgZmlyZSBhZnRlciByZW5kZXIgaXMgZG9uZSB3aGVuIGNhbGxlZCBmcm9tIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgb3IgY29tcG9uZW50V2lsbE1vdW50XHJcbiAgICBpbnN0YW5jZS5fbGlmZWN5Y2xlID0gbGlmZWN5Y2xlO1xyXG4gICAgaW5zdGFuY2UuX3VubW91bnRlZCA9IGZhbHNlO1xyXG4gICAgaW5zdGFuY2UuX3BlbmRpbmdTZXRTdGF0ZSA9IHRydWU7XHJcbiAgICBpbnN0YW5jZS5faXNTVkcgPSBpc1NWRztcclxuICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc1VuZGVmaW5lZChpbnN0YW5jZS5jb21wb25lbnRXaWxsTW91bnQpKSB7XHJcbiAgICAgICAgaW5zdGFuY2UuX2Jsb2NrUmVuZGVyID0gdHJ1ZTtcclxuICAgICAgICBpbnN0YW5jZS5jb21wb25lbnRXaWxsTW91bnQoKTtcclxuICAgICAgICBpbnN0YW5jZS5fYmxvY2tSZW5kZXIgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHZhciBjaGlsZENvbnRleHQ7XHJcbiAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNVbmRlZmluZWQoaW5zdGFuY2UuZ2V0Q2hpbGRDb250ZXh0KSkge1xyXG4gICAgICAgIGNoaWxkQ29udGV4dCA9IGluc3RhbmNlLmdldENoaWxkQ29udGV4dCgpO1xyXG4gICAgfVxyXG4gICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNOdWxsT3JVbmRlZihjaGlsZENvbnRleHQpKSB7XHJcbiAgICAgICAgaW5zdGFuY2UuX2NoaWxkQ29udGV4dCA9IGNvbnRleHQ7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBpbnN0YW5jZS5fY2hpbGRDb250ZXh0ID0gaW5mZXJub19zaGFyZWRfMS5jb21iaW5lRnJvbShjb250ZXh0LCBjaGlsZENvbnRleHQpO1xyXG4gICAgfVxyXG4gICAgb3B0aW9uc18xLmRlZmF1bHQuYmVmb3JlUmVuZGVyICYmIG9wdGlvbnNfMS5kZWZhdWx0LmJlZm9yZVJlbmRlcihpbnN0YW5jZSk7XHJcbiAgICB2YXIgaW5wdXQgPSBpbnN0YW5jZS5yZW5kZXIocHJvcHMsIGluc3RhbmNlLnN0YXRlLCBjb250ZXh0KTtcclxuICAgIG9wdGlvbnNfMS5kZWZhdWx0LmFmdGVyUmVuZGVyICYmIG9wdGlvbnNfMS5kZWZhdWx0LmFmdGVyUmVuZGVyKGluc3RhbmNlKTtcclxuICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzQXJyYXkoaW5wdXQpKSB7XHJcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcclxuICAgICAgICAgICAgaW5mZXJub19zaGFyZWRfMS50aHJvd0Vycm9yKCdhIHZhbGlkIEluZmVybm8gVk5vZGUgKG9yIG51bGwpIG11c3QgYmUgcmV0dXJuZWQgZnJvbSBhIGNvbXBvbmVudCByZW5kZXIuIFlvdSBtYXkgaGF2ZSByZXR1cm5lZCBhbiBhcnJheSBvciBhbiBpbnZhbGlkIG9iamVjdC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5mZXJub19zaGFyZWRfMS50aHJvd0Vycm9yKCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzSW52YWxpZChpbnB1dCkpIHtcclxuICAgICAgICBpbnB1dCA9IFZOb2Rlc18xLmNyZWF0ZVZvaWRWTm9kZSgpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaW5mZXJub19zaGFyZWRfMS5pc1N0cmluZ09yTnVtYmVyKGlucHV0KSkge1xyXG4gICAgICAgIGlucHV0ID0gVk5vZGVzXzEuY3JlYXRlVGV4dFZOb2RlKGlucHV0LCBudWxsKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGlmIChpbnB1dC5kb20pIHtcclxuICAgICAgICAgICAgaW5wdXQgPSBWTm9kZXNfMS5kaXJlY3RDbG9uZShpbnB1dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbnB1dC5mbGFncyAmIDI4IC8qIENvbXBvbmVudCAqLykge1xyXG4gICAgICAgICAgICAvLyBpZiB3ZSBoYXZlIGFuIGlucHV0IHRoYXQgaXMgYWxzbyBhIGNvbXBvbmVudCwgd2UgcnVuIGludG8gYSB0cmlja3kgc2l0dWF0aW9uXHJcbiAgICAgICAgICAgIC8vIHdoZXJlIHRoZSByb290IHZOb2RlIG5lZWRzIHRvIGFsd2F5cyBoYXZlIHRoZSBjb3JyZWN0IERPTSBlbnRyeVxyXG4gICAgICAgICAgICAvLyBzbyB3ZSBicmVhayBtb25vbW9ycGhpc20gb24gb3VyIGlucHV0IGFuZCBzdXBwbHkgaXQgb3VyIHZOb2RlIGFzIHBhcmVudFZOb2RlXHJcbiAgICAgICAgICAgIC8vIHdlIGNhbiBvcHRpbWlzZSB0aGlzIGluIHRoZSBmdXR1cmUsIGJ1dCB0aGlzIGdldHMgdXMgb3V0IG9mIGEgbG90IG9mIGlzc3Vlc1xyXG4gICAgICAgICAgICBpbnB1dC5wYXJlbnRWTm9kZSA9IHZOb2RlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGluc3RhbmNlLl9wZW5kaW5nU2V0U3RhdGUgPSBmYWxzZTtcclxuICAgIGluc3RhbmNlLl9sYXN0SW5wdXQgPSBpbnB1dDtcclxuICAgIHJldHVybiBpbnN0YW5jZTtcclxufVxyXG5leHBvcnRzLmNyZWF0ZUNsYXNzQ29tcG9uZW50SW5zdGFuY2UgPSBjcmVhdGVDbGFzc0NvbXBvbmVudEluc3RhbmNlO1xyXG5mdW5jdGlvbiByZXBsYWNlTGFzdENoaWxkQW5kVW5tb3VudChsYXN0SW5wdXQsIG5leHRJbnB1dCwgcGFyZW50RG9tLCBsaWZlY3ljbGUsIGNvbnRleHQsIGlzU1ZHLCBpc1JlY3ljbGluZykge1xyXG4gICAgcmVwbGFjZVZOb2RlKHBhcmVudERvbSwgbW91bnRpbmdfMS5tb3VudChuZXh0SW5wdXQsIG51bGwsIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcpLCBsYXN0SW5wdXQsIGxpZmVjeWNsZSwgaXNSZWN5Y2xpbmcpO1xyXG59XHJcbmV4cG9ydHMucmVwbGFjZUxhc3RDaGlsZEFuZFVubW91bnQgPSByZXBsYWNlTGFzdENoaWxkQW5kVW5tb3VudDtcclxuZnVuY3Rpb24gcmVwbGFjZVZOb2RlKHBhcmVudERvbSwgZG9tLCB2Tm9kZSwgbGlmZWN5Y2xlLCBpc1JlY3ljbGluZykge1xyXG4gICAgdW5tb3VudGluZ18xLnVubW91bnQodk5vZGUsIG51bGwsIGxpZmVjeWNsZSwgZmFsc2UsIGlzUmVjeWNsaW5nKTtcclxuICAgIHJlcGxhY2VDaGlsZChwYXJlbnREb20sIGRvbSwgdk5vZGUuZG9tKTtcclxufVxyXG5leHBvcnRzLnJlcGxhY2VWTm9kZSA9IHJlcGxhY2VWTm9kZTtcclxuZnVuY3Rpb24gY3JlYXRlRnVuY3Rpb25hbENvbXBvbmVudElucHV0KHZOb2RlLCBjb21wb25lbnQsIHByb3BzLCBjb250ZXh0KSB7XHJcbiAgICB2YXIgaW5wdXQgPSBjb21wb25lbnQocHJvcHMsIGNvbnRleHQpO1xyXG4gICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNBcnJheShpbnB1dCkpIHtcclxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xyXG4gICAgICAgICAgICBpbmZlcm5vX3NoYXJlZF8xLnRocm93RXJyb3IoJ2EgdmFsaWQgSW5mZXJubyBWTm9kZSAob3IgbnVsbCkgbXVzdCBiZSByZXR1cm5lZCBmcm9tIGEgY29tcG9uZW50IHJlbmRlci4gWW91IG1heSBoYXZlIHJldHVybmVkIGFuIGFycmF5IG9yIGFuIGludmFsaWQgb2JqZWN0LicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpbmZlcm5vX3NoYXJlZF8xLnRocm93RXJyb3IoKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNJbnZhbGlkKGlucHV0KSkge1xyXG4gICAgICAgIGlucHV0ID0gVk5vZGVzXzEuY3JlYXRlVm9pZFZOb2RlKCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzU3RyaW5nT3JOdW1iZXIoaW5wdXQpKSB7XHJcbiAgICAgICAgaW5wdXQgPSBWTm9kZXNfMS5jcmVhdGVUZXh0Vk5vZGUoaW5wdXQsIG51bGwpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgaWYgKGlucHV0LmRvbSkge1xyXG4gICAgICAgICAgICBpbnB1dCA9IFZOb2Rlc18xLmRpcmVjdENsb25lKGlucHV0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlucHV0LmZsYWdzICYgMjggLyogQ29tcG9uZW50ICovKSB7XHJcbiAgICAgICAgICAgIC8vIGlmIHdlIGhhdmUgYW4gaW5wdXQgdGhhdCBpcyBhbHNvIGEgY29tcG9uZW50LCB3ZSBydW4gaW50byBhIHRyaWNreSBzaXR1YXRpb25cclxuICAgICAgICAgICAgLy8gd2hlcmUgdGhlIHJvb3Qgdk5vZGUgbmVlZHMgdG8gYWx3YXlzIGhhdmUgdGhlIGNvcnJlY3QgRE9NIGVudHJ5XHJcbiAgICAgICAgICAgIC8vIHNvIHdlIGJyZWFrIG1vbm9tb3JwaGlzbSBvbiBvdXIgaW5wdXQgYW5kIHN1cHBseSBpdCBvdXIgdk5vZGUgYXMgcGFyZW50Vk5vZGVcclxuICAgICAgICAgICAgLy8gd2UgY2FuIG9wdGltaXNlIHRoaXMgaW4gdGhlIGZ1dHVyZSwgYnV0IHRoaXMgZ2V0cyB1cyBvdXQgb2YgYSBsb3Qgb2YgaXNzdWVzXHJcbiAgICAgICAgICAgIGlucHV0LnBhcmVudFZOb2RlID0gdk5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGlucHV0O1xyXG59XHJcbmV4cG9ydHMuY3JlYXRlRnVuY3Rpb25hbENvbXBvbmVudElucHV0ID0gY3JlYXRlRnVuY3Rpb25hbENvbXBvbmVudElucHV0O1xyXG5mdW5jdGlvbiBzZXRUZXh0Q29udGVudChkb20sIHRleHQpIHtcclxuICAgIGlmICh0ZXh0ICE9PSAnJykge1xyXG4gICAgICAgIGRvbS50ZXh0Q29udGVudCA9IHRleHQ7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBkb20uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLnNldFRleHRDb250ZW50ID0gc2V0VGV4dENvbnRlbnQ7XHJcbmZ1bmN0aW9uIHVwZGF0ZVRleHRDb250ZW50KGRvbSwgdGV4dCkge1xyXG4gICAgZG9tLmZpcnN0Q2hpbGQubm9kZVZhbHVlID0gdGV4dDtcclxufVxyXG5leHBvcnRzLnVwZGF0ZVRleHRDb250ZW50ID0gdXBkYXRlVGV4dENvbnRlbnQ7XHJcbmZ1bmN0aW9uIGFwcGVuZENoaWxkKHBhcmVudERvbSwgZG9tKSB7XHJcbiAgICBwYXJlbnREb20uYXBwZW5kQ2hpbGQoZG9tKTtcclxufVxyXG5leHBvcnRzLmFwcGVuZENoaWxkID0gYXBwZW5kQ2hpbGQ7XHJcbmZ1bmN0aW9uIGluc2VydE9yQXBwZW5kKHBhcmVudERvbSwgbmV3Tm9kZSwgbmV4dE5vZGUpIHtcclxuICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbE9yVW5kZWYobmV4dE5vZGUpKSB7XHJcbiAgICAgICAgYXBwZW5kQ2hpbGQocGFyZW50RG9tLCBuZXdOb2RlKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHBhcmVudERvbS5pbnNlcnRCZWZvcmUobmV3Tm9kZSwgbmV4dE5vZGUpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuaW5zZXJ0T3JBcHBlbmQgPSBpbnNlcnRPckFwcGVuZDtcclxuZnVuY3Rpb24gZG9jdW1lbnRDcmVhdGVFbGVtZW50KHRhZywgaXNTVkcpIHtcclxuICAgIGlmIChpc1NWRyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoY29uc3RhbnRzXzEuc3ZnTlMsIHRhZyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZG9jdW1lbnRDcmVhdGVFbGVtZW50ID0gZG9jdW1lbnRDcmVhdGVFbGVtZW50O1xyXG5mdW5jdGlvbiByZXBsYWNlV2l0aE5ld05vZGUobGFzdE5vZGUsIG5leHROb2RlLCBwYXJlbnREb20sIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcsIGlzUmVjeWNsaW5nKSB7XHJcbiAgICB1bm1vdW50aW5nXzEudW5tb3VudChsYXN0Tm9kZSwgbnVsbCwgbGlmZWN5Y2xlLCBmYWxzZSwgaXNSZWN5Y2xpbmcpO1xyXG4gICAgdmFyIGRvbSA9IG1vdW50aW5nXzEubW91bnQobmV4dE5vZGUsIG51bGwsIGxpZmVjeWNsZSwgY29udGV4dCwgaXNTVkcpO1xyXG4gICAgbmV4dE5vZGUuZG9tID0gZG9tO1xyXG4gICAgcmVwbGFjZUNoaWxkKHBhcmVudERvbSwgZG9tLCBsYXN0Tm9kZS5kb20pO1xyXG59XHJcbmV4cG9ydHMucmVwbGFjZVdpdGhOZXdOb2RlID0gcmVwbGFjZVdpdGhOZXdOb2RlO1xyXG5mdW5jdGlvbiByZXBsYWNlQ2hpbGQocGFyZW50RG9tLCBuZXh0RG9tLCBsYXN0RG9tKSB7XHJcbiAgICBpZiAoIXBhcmVudERvbSkge1xyXG4gICAgICAgIHBhcmVudERvbSA9IGxhc3REb20ucGFyZW50Tm9kZTtcclxuICAgIH1cclxuICAgIHBhcmVudERvbS5yZXBsYWNlQ2hpbGQobmV4dERvbSwgbGFzdERvbSk7XHJcbn1cclxuZXhwb3J0cy5yZXBsYWNlQ2hpbGQgPSByZXBsYWNlQ2hpbGQ7XHJcbmZ1bmN0aW9uIHJlbW92ZUNoaWxkKHBhcmVudERvbSwgZG9tKSB7XHJcbiAgICBwYXJlbnREb20ucmVtb3ZlQ2hpbGQoZG9tKTtcclxufVxyXG5leHBvcnRzLnJlbW92ZUNoaWxkID0gcmVtb3ZlQ2hpbGQ7XHJcbmZ1bmN0aW9uIHJlbW92ZUFsbENoaWxkcmVuKGRvbSwgY2hpbGRyZW4sIGxpZmVjeWNsZSwgaXNSZWN5Y2xpbmcpIHtcclxuICAgIGRvbS50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgaWYgKCFvcHRpb25zXzEuZGVmYXVsdC5yZWN5Y2xpbmdFbmFibGVkIHx8IChvcHRpb25zXzEuZGVmYXVsdC5yZWN5Y2xpbmdFbmFibGVkICYmICFpc1JlY3ljbGluZykpIHtcclxuICAgICAgICByZW1vdmVDaGlsZHJlbihudWxsLCBjaGlsZHJlbiwgbGlmZWN5Y2xlLCBpc1JlY3ljbGluZyk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5yZW1vdmVBbGxDaGlsZHJlbiA9IHJlbW92ZUFsbENoaWxkcmVuO1xyXG5mdW5jdGlvbiByZW1vdmVDaGlsZHJlbihkb20sIGNoaWxkcmVuLCBsaWZlY3ljbGUsIGlzUmVjeWNsaW5nKSB7XHJcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXTtcclxuICAgICAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNJbnZhbGlkKGNoaWxkKSkge1xyXG4gICAgICAgICAgICB1bm1vdW50aW5nXzEudW5tb3VudChjaGlsZCwgZG9tLCBsaWZlY3ljbGUsIHRydWUsIGlzUmVjeWNsaW5nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5yZW1vdmVDaGlsZHJlbiA9IHJlbW92ZUNoaWxkcmVuO1xyXG5mdW5jdGlvbiBpc0tleWVkKGxhc3RDaGlsZHJlbiwgbmV4dENoaWxkcmVuKSB7XHJcbiAgICByZXR1cm4gbmV4dENoaWxkcmVuLmxlbmd0aCAmJiAhaW5mZXJub19zaGFyZWRfMS5pc051bGxPclVuZGVmKG5leHRDaGlsZHJlblswXSkgJiYgIWluZmVybm9fc2hhcmVkXzEuaXNOdWxsT3JVbmRlZihuZXh0Q2hpbGRyZW5bMF0ua2V5KVxyXG4gICAgICAgICYmIGxhc3RDaGlsZHJlbi5sZW5ndGggJiYgIWluZmVybm9fc2hhcmVkXzEuaXNOdWxsT3JVbmRlZihsYXN0Q2hpbGRyZW5bMF0pICYmICFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbE9yVW5kZWYobGFzdENoaWxkcmVuWzBdLmtleSk7XHJcbn1cclxuZXhwb3J0cy5pc0tleWVkID0gaXNLZXllZDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGluZmVybm9fc2hhcmVkXzEgPSByZXF1aXJlKFwiaW5mZXJuby1zaGFyZWRcIik7XHJcbnZhciBWTm9kZXNfMSA9IHJlcXVpcmUoXCIuL1ZOb2Rlc1wiKTtcclxuZnVuY3Rpb24gYXBwbHlLZXkoa2V5LCB2Tm9kZSkge1xyXG4gICAgdk5vZGUua2V5ID0ga2V5O1xyXG4gICAgcmV0dXJuIHZOb2RlO1xyXG59XHJcbmZ1bmN0aW9uIGFwcGx5S2V5SWZNaXNzaW5nKGtleSwgdk5vZGUpIHtcclxuICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzTnVtYmVyKGtleSkpIHtcclxuICAgICAgICBrZXkgPSBcIi5cIiArIGtleTtcclxuICAgIH1cclxuICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbCh2Tm9kZS5rZXkpIHx8IHZOb2RlLmtleVswXSA9PT0gJy4nKSB7XHJcbiAgICAgICAgcmV0dXJuIGFwcGx5S2V5KGtleSwgdk5vZGUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZOb2RlO1xyXG59XHJcbmZ1bmN0aW9uIGFwcGx5S2V5UHJlZml4KGtleSwgdk5vZGUpIHtcclxuICAgIHZOb2RlLmtleSA9IGtleSArIHZOb2RlLmtleTtcclxuICAgIHJldHVybiB2Tm9kZTtcclxufVxyXG5mdW5jdGlvbiBfbm9ybWFsaXplVk5vZGVzKG5vZGVzLCByZXN1bHQsIGluZGV4LCBjdXJyZW50S2V5KSB7XHJcbiAgICBmb3IgKHZhciBsZW4gPSBub2Rlcy5sZW5ndGg7IGluZGV4IDwgbGVuOyBpbmRleCsrKSB7XHJcbiAgICAgICAgdmFyIG4gPSBub2Rlc1tpbmRleF07XHJcbiAgICAgICAgdmFyIGtleSA9IGN1cnJlbnRLZXkgKyBcIi5cIiArIGluZGV4O1xyXG4gICAgICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc0ludmFsaWQobikpIHtcclxuICAgICAgICAgICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNBcnJheShuKSkge1xyXG4gICAgICAgICAgICAgICAgX25vcm1hbGl6ZVZOb2RlcyhuLCByZXN1bHQsIDAsIGtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc1N0cmluZ09yTnVtYmVyKG4pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbiA9IFZOb2Rlc18xLmNyZWF0ZVRleHRWTm9kZShuLCBudWxsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKFZOb2Rlc18xLmlzVk5vZGUobikgJiYgbi5kb20gfHwgKG4ua2V5ICYmIG4ua2V5WzBdID09PSAnLicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbiA9IFZOb2Rlc18xLmRpcmVjdENsb25lKG4pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNOdWxsKG4ua2V5KSB8fCBuLmtleVswXSA9PT0gJy4nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbiA9IGFwcGx5S2V5KGtleSwgbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBuID0gYXBwbHlLZXlQcmVmaXgoY3VycmVudEtleSwgbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBub3JtYWxpemVWTm9kZXMobm9kZXMpIHtcclxuICAgIHZhciBuZXdOb2RlcztcclxuICAgIC8vIHdlIGFzc2lnbiAkIHdoaWNoIGJhc2ljYWxseSBtZWFucyB3ZSd2ZSBmbGFnZ2VkIHRoaXMgYXJyYXkgZm9yIGZ1dHVyZSBub3RlXHJcbiAgICAvLyBpZiBpdCBjb21lcyBiYWNrIGFnYWluLCB3ZSBuZWVkIHRvIGNsb25lIGl0LCBhcyBwZW9wbGUgYXJlIHVzaW5nIGl0XHJcbiAgICAvLyBpbiBhbiBpbW11dGFibGUgd2F5XHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZVxyXG4gICAgaWYgKG5vZGVzWyckJ10pIHtcclxuICAgICAgICBub2RlcyA9IG5vZGVzLnNsaWNlKCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBub2Rlc1snJCddID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8vIHRzbGludDplbmFibGVcclxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBub2Rlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgIHZhciBuID0gbm9kZXNbaV07XHJcbiAgICAgICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNJbnZhbGlkKG4pIHx8IGluZmVybm9fc2hhcmVkXzEuaXNBcnJheShuKSkge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gKG5ld05vZGVzIHx8IG5vZGVzKS5zbGljZSgwLCBpKTtcclxuICAgICAgICAgICAgX25vcm1hbGl6ZVZOb2Rlcyhub2RlcywgcmVzdWx0LCBpLCBcIlwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaW5mZXJub19zaGFyZWRfMS5pc1N0cmluZ09yTnVtYmVyKG4pKSB7XHJcbiAgICAgICAgICAgIGlmICghbmV3Tm9kZXMpIHtcclxuICAgICAgICAgICAgICAgIG5ld05vZGVzID0gbm9kZXMuc2xpY2UoMCwgaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3Tm9kZXMucHVzaChhcHBseUtleUlmTWlzc2luZyhpLCBWTm9kZXNfMS5jcmVhdGVUZXh0Vk5vZGUobiwgbnVsbCkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoKFZOb2Rlc18xLmlzVk5vZGUobikgJiYgbi5kb20pIHx8IChpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbChuLmtleSkgJiYgIShuLmZsYWdzICYgNjQgLyogSGFzTm9uS2V5ZWRDaGlsZHJlbiAqLykpKSB7XHJcbiAgICAgICAgICAgIGlmICghbmV3Tm9kZXMpIHtcclxuICAgICAgICAgICAgICAgIG5ld05vZGVzID0gbm9kZXMuc2xpY2UoMCwgaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3Tm9kZXMucHVzaChhcHBseUtleUlmTWlzc2luZyhpLCBWTm9kZXNfMS5kaXJlY3RDbG9uZShuKSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChuZXdOb2Rlcykge1xyXG4gICAgICAgICAgICBuZXdOb2Rlcy5wdXNoKGFwcGx5S2V5SWZNaXNzaW5nKGksIFZOb2Rlc18xLmRpcmVjdENsb25lKG4pKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ld05vZGVzIHx8IG5vZGVzO1xyXG59XHJcbmV4cG9ydHMubm9ybWFsaXplVk5vZGVzID0gbm9ybWFsaXplVk5vZGVzO1xyXG5mdW5jdGlvbiBub3JtYWxpemVDaGlsZHJlbihjaGlsZHJlbikge1xyXG4gICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNBcnJheShjaGlsZHJlbikpIHtcclxuICAgICAgICByZXR1cm4gbm9ybWFsaXplVk5vZGVzKGNoaWxkcmVuKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKFZOb2Rlc18xLmlzVk5vZGUoY2hpbGRyZW4pICYmIGNoaWxkcmVuLmRvbSkge1xyXG4gICAgICAgIHJldHVybiBWTm9kZXNfMS5kaXJlY3RDbG9uZShjaGlsZHJlbik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2hpbGRyZW47XHJcbn1cclxuZnVuY3Rpb24gbm9ybWFsaXplUHJvcHModk5vZGUsIHByb3BzLCBjaGlsZHJlbikge1xyXG4gICAgaWYgKCEodk5vZGUuZmxhZ3MgJiAyOCAvKiBDb21wb25lbnQgKi8pKSB7XHJcbiAgICAgICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNOdWxsT3JVbmRlZihjaGlsZHJlbikgJiYgIWluZmVybm9fc2hhcmVkXzEuaXNOdWxsT3JVbmRlZihwcm9wcy5jaGlsZHJlbikpIHtcclxuICAgICAgICAgICAgdk5vZGUuY2hpbGRyZW4gPSBwcm9wcy5jaGlsZHJlbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHByb3BzLmNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICB2Tm9kZS5jbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWU7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBwcm9wcy5jbGFzc05hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHByb3BzLnJlZikge1xyXG4gICAgICAgIHZOb2RlLnJlZiA9IHByb3BzLnJlZjtcclxuICAgICAgICBkZWxldGUgcHJvcHMucmVmO1xyXG4gICAgfVxyXG4gICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbE9yVW5kZWYocHJvcHMua2V5KSkge1xyXG4gICAgICAgIHZOb2RlLmtleSA9IHByb3BzLmtleTtcclxuICAgICAgICBkZWxldGUgcHJvcHMua2V5O1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIG5vcm1hbGl6ZUVsZW1lbnQodHlwZSwgdk5vZGUpIHtcclxuICAgIGlmICh0eXBlID09PSAnc3ZnJykge1xyXG4gICAgICAgIHZOb2RlLmZsYWdzID0gMTI4IC8qIFN2Z0VsZW1lbnQgKi87XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0eXBlID09PSAnaW5wdXQnKSB7XHJcbiAgICAgICAgdk5vZGUuZmxhZ3MgPSA1MTIgLyogSW5wdXRFbGVtZW50ICovO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodHlwZSA9PT0gJ3NlbGVjdCcpIHtcclxuICAgICAgICB2Tm9kZS5mbGFncyA9IDIwNDggLyogU2VsZWN0RWxlbWVudCAqLztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHR5cGUgPT09ICd0ZXh0YXJlYScpIHtcclxuICAgICAgICB2Tm9kZS5mbGFncyA9IDEwMjQgLyogVGV4dGFyZWFFbGVtZW50ICovO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodHlwZSA9PT0gJ21lZGlhJykge1xyXG4gICAgICAgIHZOb2RlLmZsYWdzID0gMjU2IC8qIE1lZGlhRWxlbWVudCAqLztcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHZOb2RlLmZsYWdzID0gMiAvKiBIdG1sRWxlbWVudCAqLztcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBub3JtYWxpemUodk5vZGUpIHtcclxuICAgIHZhciBwcm9wcyA9IHZOb2RlLnByb3BzO1xyXG4gICAgdmFyIGNoaWxkcmVuID0gdk5vZGUuY2hpbGRyZW47XHJcbiAgICAvLyBjb252ZXJ0IGEgd3JvbmdseSBjcmVhdGVkIHR5cGUgYmFjayB0byBlbGVtZW50XHJcbiAgICAvLyBQcmltaXRpdmUgbm9kZSBkb2Vzbid0IGhhdmUgZGVmYXVsdFByb3BzLCBvbmx5IENvbXBvbmVudFxyXG4gICAgaWYgKHZOb2RlLmZsYWdzICYgMjggLyogQ29tcG9uZW50ICovKSB7XHJcbiAgICAgICAgLy8gc2V0IGRlZmF1bHQgcHJvcHNcclxuICAgICAgICB2YXIgdHlwZSA9IHZOb2RlLnR5cGU7XHJcbiAgICAgICAgdmFyIGRlZmF1bHRQcm9wcyA9IHR5cGUuZGVmYXVsdFByb3BzO1xyXG4gICAgICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc051bGxPclVuZGVmKGRlZmF1bHRQcm9wcykpIHtcclxuICAgICAgICAgICAgaWYgKCFwcm9wcykge1xyXG4gICAgICAgICAgICAgICAgcHJvcHMgPSB2Tm9kZS5wcm9wcyA9IGRlZmF1bHRQcm9wczsgLy8gQ3JlYXRlIG5ldyBvYmplY3QgaWYgb25seSBkZWZhdWx0UHJvcHMgZ2l2ZW5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHByb3AgaW4gZGVmYXVsdFByb3BzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNVbmRlZmluZWQocHJvcHNbcHJvcF0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzW3Byb3BdID0gZGVmYXVsdFByb3BzW3Byb3BdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc1N0cmluZyh0eXBlKSkge1xyXG4gICAgICAgICAgICBub3JtYWxpemVFbGVtZW50KHR5cGUsIHZOb2RlKTtcclxuICAgICAgICAgICAgaWYgKHByb3BzICYmIHByb3BzLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICB2Tm9kZS5jaGlsZHJlbiA9IHByb3BzLmNoaWxkcmVuO1xyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW4gPSBwcm9wcy5jaGlsZHJlbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChwcm9wcykge1xyXG4gICAgICAgIG5vcm1hbGl6ZVByb3BzKHZOb2RlLCBwcm9wcywgY2hpbGRyZW4pO1xyXG4gICAgfVxyXG4gICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzSW52YWxpZChjaGlsZHJlbikpIHtcclxuICAgICAgICB2Tm9kZS5jaGlsZHJlbiA9IG5vcm1hbGl6ZUNoaWxkcmVuKGNoaWxkcmVuKTtcclxuICAgIH1cclxuICAgIGlmIChwcm9wcyAmJiAhaW5mZXJub19zaGFyZWRfMS5pc0ludmFsaWQocHJvcHMuY2hpbGRyZW4pKSB7XHJcbiAgICAgICAgcHJvcHMuY2hpbGRyZW4gPSBub3JtYWxpemVDaGlsZHJlbihwcm9wcy5jaGlsZHJlbik7XHJcbiAgICB9XHJcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xyXG4gICAgICAgIC8vIFRoaXMgY29kZSB3aWxsIGJlIHN0cmlwcGVkIG91dCBmcm9tIHByb2R1Y3Rpb24gQ09ERVxyXG4gICAgICAgIC8vIEl0IHdpbGwgaGVscCB1c2VycyB0byB0cmFjayBlcnJvcnMgaW4gdGhlaXIgYXBwbGljYXRpb25zLlxyXG4gICAgICAgIHZhciB2ZXJpZnlLZXlzID0gZnVuY3Rpb24gKHZOb2Rlcykge1xyXG4gICAgICAgICAgICB2YXIga2V5VmFsdWVzID0gdk5vZGVzLm1hcChmdW5jdGlvbiAodm5vZGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2bm9kZS5rZXk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBrZXlWYWx1ZXMuc29tZShmdW5jdGlvbiAoaXRlbSwgaWR4KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaGFzRHVwbGljYXRlID0ga2V5VmFsdWVzLmluZGV4T2YoaXRlbSkgIT09IGlkeDtcclxuICAgICAgICAgICAgICAgIGlmIChoYXNEdXBsaWNhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmZlcm5vX3NoYXJlZF8xLndhcm5pbmcoJ0luZmVybm8gbm9ybWFsaXNhdGlvbiguLi4pOiBFbmNvdW50ZXJlZCB0d28gY2hpbGRyZW4gd2l0aCBzYW1lIGtleSwgYWxsIGtleXMgbXVzdCBiZSB1bmlxdWUgd2l0aGluIGl0cyBzaWJsaW5ncy4gRHVwbGljYXRlZCBrZXkgaXM6JyArIGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhc0R1cGxpY2F0ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAodk5vZGUuY2hpbGRyZW4gJiYgQXJyYXkuaXNBcnJheSh2Tm9kZS5jaGlsZHJlbikpIHtcclxuICAgICAgICAgICAgdmVyaWZ5S2V5cyh2Tm9kZS5jaGlsZHJlbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMubm9ybWFsaXplID0gbm9ybWFsaXplO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgaW5mZXJub19zaGFyZWRfMSA9IHJlcXVpcmUoXCJpbmZlcm5vLXNoYXJlZFwiKTtcclxudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vRE9NL3V0aWxzXCIpO1xyXG52YXIgbm9ybWFsaXphdGlvbl8xID0gcmVxdWlyZShcIi4vbm9ybWFsaXphdGlvblwiKTtcclxudmFyIG9wdGlvbnNfMSA9IHJlcXVpcmUoXCIuL29wdGlvbnNcIik7XHJcbi8qKlxyXG4gKiBDcmVhdGVzIHZpcnR1YWwgbm9kZVxyXG4gKiBAcGFyYW0ge251bWJlcn0gZmxhZ3NcclxuICogQHBhcmFtIHtzdHJpbmd8RnVuY3Rpb258bnVsbH0gdHlwZVxyXG4gKiBAcGFyYW0ge3N0cmluZ3xudWxsPX0gY2xhc3NOYW1lXHJcbiAqIEBwYXJhbSB7b2JqZWN0PX0gY2hpbGRyZW5cclxuICogQHBhcmFtIHtvYmplY3Q9fSBwcm9wc1xyXG4gKiBAcGFyYW0geyo9fSBrZXlcclxuICogQHBhcmFtIHtvYmplY3R8RnVuY3Rpb249fSByZWZcclxuICogQHBhcmFtIHtib29sZWFuPX0gbm9Ob3JtYWxpc2VcclxuICogQHJldHVybnMge1ZOb2RlfSByZXR1cm5zIG5ldyB2aXJ0dWFsIG5vZGVcclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZVZOb2RlKGZsYWdzLCB0eXBlLCBjbGFzc05hbWUsIGNoaWxkcmVuLCBwcm9wcywga2V5LCByZWYsIG5vTm9ybWFsaXNlKSB7XHJcbiAgICBpZiAoZmxhZ3MgJiAxNiAvKiBDb21wb25lbnRVbmtub3duICovKSB7XHJcbiAgICAgICAgZmxhZ3MgPSBpbmZlcm5vX3NoYXJlZF8xLmlzU3RhdGVmdWxDb21wb25lbnQodHlwZSkgPyA0IC8qIENvbXBvbmVudENsYXNzICovIDogOCAvKiBDb21wb25lbnRGdW5jdGlvbiAqLztcclxuICAgIH1cclxuICAgIHZhciB2Tm9kZSA9IHtcclxuICAgICAgICBjaGlsZHJlbjogaW5mZXJub19zaGFyZWRfMS5pc1VuZGVmaW5lZChjaGlsZHJlbikgPyBudWxsIDogY2hpbGRyZW4sXHJcbiAgICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWUsXHJcbiAgICAgICAgZG9tOiBudWxsLFxyXG4gICAgICAgIGZsYWdzOiBmbGFncyxcclxuICAgICAgICBrZXk6IGluZmVybm9fc2hhcmVkXzEuaXNVbmRlZmluZWQoa2V5KSA/IG51bGwgOiBrZXksXHJcbiAgICAgICAgcHJvcHM6IHByb3BzIHx8IG51bGwsXHJcbiAgICAgICAgcmVmOiByZWYgfHwgbnVsbCxcclxuICAgICAgICB0eXBlOiB0eXBlXHJcbiAgICB9O1xyXG4gICAgaWYgKCFub05vcm1hbGlzZSkge1xyXG4gICAgICAgIG5vcm1hbGl6YXRpb25fMS5ub3JtYWxpemUodk5vZGUpO1xyXG4gICAgfVxyXG4gICAgaWYgKG9wdGlvbnNfMS5kZWZhdWx0LmNyZWF0ZVZOb2RlKSB7XHJcbiAgICAgICAgb3B0aW9uc18xLmRlZmF1bHQuY3JlYXRlVk5vZGUodk5vZGUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZOb2RlO1xyXG59XHJcbmV4cG9ydHMuY3JlYXRlVk5vZGUgPSBjcmVhdGVWTm9kZTtcclxuZnVuY3Rpb24gZGlyZWN0Q2xvbmUodk5vZGVUb0Nsb25lKSB7XHJcbiAgICB2YXIgbmV3Vk5vZGU7XHJcbiAgICB2YXIgZmxhZ3MgPSB2Tm9kZVRvQ2xvbmUuZmxhZ3M7XHJcbiAgICBpZiAoZmxhZ3MgJiAyOCAvKiBDb21wb25lbnQgKi8pIHtcclxuICAgICAgICB2YXIgcHJvcHMgPSB2b2lkIDA7XHJcbiAgICAgICAgdmFyIHByb3BzVG9DbG9uZSA9IHZOb2RlVG9DbG9uZS5wcm9wcztcclxuICAgICAgICBpZiAoIXByb3BzVG9DbG9uZSkge1xyXG4gICAgICAgICAgICBwcm9wcyA9IHV0aWxzXzEuRU1QVFlfT0JKO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcHJvcHMgPSB7fTtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHByb3BzVG9DbG9uZSkge1xyXG4gICAgICAgICAgICAgICAgcHJvcHNba2V5XSA9IHByb3BzVG9DbG9uZVtrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5ld1ZOb2RlID0gY3JlYXRlVk5vZGUoZmxhZ3MsIHZOb2RlVG9DbG9uZS50eXBlLCB2Tm9kZVRvQ2xvbmUuY2xhc3NOYW1lLCBudWxsLCBwcm9wcywgdk5vZGVUb0Nsb25lLmtleSwgdk5vZGVUb0Nsb25lLnJlZiwgdHJ1ZSk7XHJcbiAgICAgICAgdmFyIG5ld1Byb3BzID0gbmV3Vk5vZGUucHJvcHM7XHJcbiAgICAgICAgaWYgKG5ld1Byb3BzKSB7XHJcbiAgICAgICAgICAgIHZhciBuZXdDaGlsZHJlbiA9IG5ld1Byb3BzLmNoaWxkcmVuO1xyXG4gICAgICAgICAgICAvLyB3ZSBuZWVkIHRvIGFsc28gY2xvbmUgY29tcG9uZW50IGNoaWxkcmVuIHRoYXQgYXJlIGluIHByb3BzXHJcbiAgICAgICAgICAgIC8vIGFzIHRoZSBjaGlsZHJlbiBtYXkgYWxzbyBoYXZlIGJlZW4gaG9pc3RlZFxyXG4gICAgICAgICAgICBpZiAobmV3Q2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzQXJyYXkobmV3Q2hpbGRyZW4pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxlbiA9IG5ld0NoaWxkcmVuLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobGVuID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG1wQXJyYXkgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNoaWxkID0gbmV3Q2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc1N0cmluZ09yTnVtYmVyKGNoaWxkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcEFycmF5LnB1c2goY2hpbGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNJbnZhbGlkKGNoaWxkKSAmJiBpc1ZOb2RlKGNoaWxkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcEFycmF5LnB1c2goZGlyZWN0Q2xvbmUoY2hpbGQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdQcm9wcy5jaGlsZHJlbiA9IHRtcEFycmF5O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzVk5vZGUobmV3Q2hpbGRyZW4pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3UHJvcHMuY2hpbGRyZW4gPSBkaXJlY3RDbG9uZShuZXdDaGlsZHJlbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbmV3Vk5vZGUuY2hpbGRyZW4gPSBudWxsO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZmxhZ3MgJiAzOTcwIC8qIEVsZW1lbnQgKi8pIHtcclxuICAgICAgICB2YXIgY2hpbGRyZW4gPSB2Tm9kZVRvQ2xvbmUuY2hpbGRyZW47XHJcbiAgICAgICAgdmFyIHByb3BzID0gdm9pZCAwO1xyXG4gICAgICAgIHZhciBwcm9wc1RvQ2xvbmUgPSB2Tm9kZVRvQ2xvbmUucHJvcHM7XHJcbiAgICAgICAgaWYgKCFwcm9wc1RvQ2xvbmUpIHtcclxuICAgICAgICAgICAgcHJvcHMgPSB1dGlsc18xLkVNUFRZX09CSjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHByb3BzID0ge307XHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBwcm9wc1RvQ2xvbmUpIHtcclxuICAgICAgICAgICAgICAgIHByb3BzW2tleV0gPSBwcm9wc1RvQ2xvbmVba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBuZXdWTm9kZSA9IGNyZWF0ZVZOb2RlKGZsYWdzLCB2Tm9kZVRvQ2xvbmUudHlwZSwgdk5vZGVUb0Nsb25lLmNsYXNzTmFtZSwgY2hpbGRyZW4sIHByb3BzLCB2Tm9kZVRvQ2xvbmUua2V5LCB2Tm9kZVRvQ2xvbmUucmVmLCAhY2hpbGRyZW4pO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZmxhZ3MgJiAxIC8qIFRleHQgKi8pIHtcclxuICAgICAgICBuZXdWTm9kZSA9IGNyZWF0ZVRleHRWTm9kZSh2Tm9kZVRvQ2xvbmUuY2hpbGRyZW4sIHZOb2RlVG9DbG9uZS5rZXkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ld1ZOb2RlO1xyXG59XHJcbmV4cG9ydHMuZGlyZWN0Q2xvbmUgPSBkaXJlY3RDbG9uZTtcclxuLypcclxuIGRpcmVjdENsb25lIGlzIHByZWZlcnJlZCBvdmVyIGNsb25lVk5vZGUgYW5kIHVzZWQgaW50ZXJuYWxseSBhbHNvLlxyXG4gVGhpcyBmdW5jdGlvbiBtYWtlcyBJbmZlcm5vIGJhY2t3YXJkcyBjb21wYXRpYmxlLlxyXG4gQW5kIGNhbiBiZSB0cmVlLXNoYWtlZCBieSBtb2Rlcm4gYnVuZGxlcnNcclxuXHJcbiBXb3VsZCBiZSBuaWNlIHRvIGNvbWJpbmUgdGhpcyB3aXRoIGRpcmVjdENsb25lIGJ1dCBjb3VsZCBub3QgZG8gaXQgd2l0aG91dCBicmVha2luZyBjaGFuZ2VcclxuICovXHJcbi8qKlxyXG4gKiBDbG9uZXMgZ2l2ZW4gdmlydHVhbCBub2RlIGJ5IGNyZWF0aW5nIG5ldyBpbnN0YW5jZSBvZiBpdFxyXG4gKiBAcGFyYW0ge1ZOb2RlfSB2Tm9kZVRvQ2xvbmUgdmlydHVhbCBub2RlIHRvIGJlIGNsb25lZFxyXG4gKiBAcGFyYW0ge1Byb3BzPX0gcHJvcHMgYWRkaXRpb25hbCBwcm9wcyBmb3IgbmV3IHZpcnR1YWwgbm9kZVxyXG4gKiBAcGFyYW0gey4uLip9IF9jaGlsZHJlbiBuZXcgY2hpbGRyZW4gZm9yIG5ldyB2aXJ0dWFsIG5vZGVcclxuICogQHJldHVybnMge1ZOb2RlfSBuZXcgdmlydHVhbCBub2RlXHJcbiAqL1xyXG5mdW5jdGlvbiBjbG9uZVZOb2RlKHZOb2RlVG9DbG9uZSwgcHJvcHMpIHtcclxuICAgIHZhciBfY2hpbGRyZW4gPSBbXTtcclxuICAgIGZvciAodmFyIF9pID0gMjsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgX2NoaWxkcmVuW19pIC0gMl0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgfVxyXG4gICAgdmFyIGNoaWxkcmVuID0gX2NoaWxkcmVuO1xyXG4gICAgdmFyIGNoaWxkcmVuTGVuID0gX2NoaWxkcmVuLmxlbmd0aDtcclxuICAgIGlmIChjaGlsZHJlbkxlbiA+IDAgJiYgIWluZmVybm9fc2hhcmVkXzEuaXNVbmRlZmluZWQoX2NoaWxkcmVuWzBdKSkge1xyXG4gICAgICAgIGlmICghcHJvcHMpIHtcclxuICAgICAgICAgICAgcHJvcHMgPSB7fTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoaWxkcmVuTGVuID09PSAxKSB7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuID0gX2NoaWxkcmVuWzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNVbmRlZmluZWQoY2hpbGRyZW4pKSB7XHJcbiAgICAgICAgICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRyZW47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdmFyIG5ld1ZOb2RlO1xyXG4gICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNBcnJheSh2Tm9kZVRvQ2xvbmUpKSB7XHJcbiAgICAgICAgdmFyIHRtcEFycmF5ID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHZOb2RlVG9DbG9uZS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICB0bXBBcnJheS5wdXNoKGRpcmVjdENsb25lKHZOb2RlVG9DbG9uZVtpXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBuZXdWTm9kZSA9IHRtcEFycmF5O1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdmFyIGZsYWdzID0gdk5vZGVUb0Nsb25lLmZsYWdzO1xyXG4gICAgICAgIHZhciBjbGFzc05hbWUgPSB2Tm9kZVRvQ2xvbmUuY2xhc3NOYW1lIHx8IChwcm9wcyAmJiBwcm9wcy5jbGFzc05hbWUpIHx8IG51bGw7XHJcbiAgICAgICAgdmFyIGtleSA9ICFpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbE9yVW5kZWYodk5vZGVUb0Nsb25lLmtleSkgPyB2Tm9kZVRvQ2xvbmUua2V5IDogKHByb3BzID8gcHJvcHMua2V5IDogbnVsbCk7XHJcbiAgICAgICAgdmFyIHJlZiA9IHZOb2RlVG9DbG9uZS5yZWYgfHwgKHByb3BzID8gcHJvcHMucmVmIDogbnVsbCk7XHJcbiAgICAgICAgaWYgKGZsYWdzICYgMjggLyogQ29tcG9uZW50ICovKSB7XHJcbiAgICAgICAgICAgIG5ld1ZOb2RlID0gY3JlYXRlVk5vZGUoZmxhZ3MsIHZOb2RlVG9DbG9uZS50eXBlLCBjbGFzc05hbWUsIG51bGwsICghdk5vZGVUb0Nsb25lLnByb3BzICYmICFwcm9wcykgPyB1dGlsc18xLkVNUFRZX09CSiA6IGluZmVybm9fc2hhcmVkXzEuY29tYmluZUZyb20odk5vZGVUb0Nsb25lLnByb3BzLCBwcm9wcyksIGtleSwgcmVmLCB0cnVlKTtcclxuICAgICAgICAgICAgdmFyIG5ld1Byb3BzID0gbmV3Vk5vZGUucHJvcHM7XHJcbiAgICAgICAgICAgIGlmIChuZXdQcm9wcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld0NoaWxkcmVuID0gbmV3UHJvcHMuY2hpbGRyZW47XHJcbiAgICAgICAgICAgICAgICAvLyB3ZSBuZWVkIHRvIGFsc28gY2xvbmUgY29tcG9uZW50IGNoaWxkcmVuIHRoYXQgYXJlIGluIHByb3BzXHJcbiAgICAgICAgICAgICAgICAvLyBhcyB0aGUgY2hpbGRyZW4gbWF5IGFsc28gaGF2ZSBiZWVuIGhvaXN0ZWRcclxuICAgICAgICAgICAgICAgIGlmIChuZXdDaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzQXJyYXkobmV3Q2hpbGRyZW4pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsZW4gPSBuZXdDaGlsZHJlbi5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZW4gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG1wQXJyYXkgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2hpbGQgPSBuZXdDaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc1N0cmluZ09yTnVtYmVyKGNoaWxkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bXBBcnJheS5wdXNoKGNoaWxkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNJbnZhbGlkKGNoaWxkKSAmJiBpc1ZOb2RlKGNoaWxkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bXBBcnJheS5wdXNoKGRpcmVjdENsb25lKGNoaWxkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UHJvcHMuY2hpbGRyZW4gPSB0bXBBcnJheTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpc1ZOb2RlKG5ld0NoaWxkcmVuKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdQcm9wcy5jaGlsZHJlbiA9IGRpcmVjdENsb25lKG5ld0NoaWxkcmVuKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3Vk5vZGUuY2hpbGRyZW4gPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChmbGFncyAmIDM5NzAgLyogRWxlbWVudCAqLykge1xyXG4gICAgICAgICAgICBjaGlsZHJlbiA9IChwcm9wcyAmJiAhaW5mZXJub19zaGFyZWRfMS5pc1VuZGVmaW5lZChwcm9wcy5jaGlsZHJlbikpID8gcHJvcHMuY2hpbGRyZW4gOiB2Tm9kZVRvQ2xvbmUuY2hpbGRyZW47XHJcbiAgICAgICAgICAgIG5ld1ZOb2RlID0gY3JlYXRlVk5vZGUoZmxhZ3MsIHZOb2RlVG9DbG9uZS50eXBlLCBjbGFzc05hbWUsIGNoaWxkcmVuLCAoIXZOb2RlVG9DbG9uZS5wcm9wcyAmJiAhcHJvcHMpID8gdXRpbHNfMS5FTVBUWV9PQkogOiBpbmZlcm5vX3NoYXJlZF8xLmNvbWJpbmVGcm9tKHZOb2RlVG9DbG9uZS5wcm9wcywgcHJvcHMpLCBrZXksIHJlZiwgIWNoaWxkcmVuKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZmxhZ3MgJiAxIC8qIFRleHQgKi8pIHtcclxuICAgICAgICAgICAgbmV3Vk5vZGUgPSBjcmVhdGVUZXh0Vk5vZGUodk5vZGVUb0Nsb25lLmNoaWxkcmVuLCBrZXkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBuZXdWTm9kZTtcclxufVxyXG5leHBvcnRzLmNsb25lVk5vZGUgPSBjbG9uZVZOb2RlO1xyXG5mdW5jdGlvbiBjcmVhdGVWb2lkVk5vZGUoKSB7XHJcbiAgICByZXR1cm4gY3JlYXRlVk5vZGUoNDA5NiAvKiBWb2lkICovLCBudWxsKTtcclxufVxyXG5leHBvcnRzLmNyZWF0ZVZvaWRWTm9kZSA9IGNyZWF0ZVZvaWRWTm9kZTtcclxuZnVuY3Rpb24gY3JlYXRlVGV4dFZOb2RlKHRleHQsIGtleSkge1xyXG4gICAgcmV0dXJuIGNyZWF0ZVZOb2RlKDEgLyogVGV4dCAqLywgbnVsbCwgbnVsbCwgdGV4dCwgbnVsbCwga2V5KTtcclxufVxyXG5leHBvcnRzLmNyZWF0ZVRleHRWTm9kZSA9IGNyZWF0ZVRleHRWTm9kZTtcclxuZnVuY3Rpb24gaXNWTm9kZShvKSB7XHJcbiAgICByZXR1cm4gISFvLmZsYWdzO1xyXG59XHJcbmV4cG9ydHMuaXNWTm9kZSA9IGlzVk5vZGU7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbi8qKlxyXG4gKiBMaW5rcyBnaXZlbiBkYXRhIHRvIGV2ZW50IGFzIGZpcnN0IHBhcmFtZXRlclxyXG4gKiBAcGFyYW0geyp9IGRhdGEgZGF0YSB0byBiZSBsaW5rZWQsIGl0IHdpbGwgYmUgYXZhaWxhYmxlIGluIGZ1bmN0aW9uIGFzIGZpcnN0IHBhcmFtZXRlclxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBldmVudCBGdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiBldmVudCBvY2N1cnNcclxuICogQHJldHVybnMge3tkYXRhOiAqLCBldmVudDogRnVuY3Rpb259fVxyXG4gKi9cclxuZnVuY3Rpb24gbGlua0V2ZW50KGRhdGEsIGV2ZW50KSB7XHJcbiAgICByZXR1cm4geyBkYXRhOiBkYXRhLCBldmVudDogZXZlbnQgfTtcclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBsaW5rRXZlbnQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBpbmZlcm5vX3NoYXJlZF8xID0gcmVxdWlyZShcImluZmVybm8tc2hhcmVkXCIpO1xyXG5leHBvcnRzLk5PX09QID0gaW5mZXJub19zaGFyZWRfMS5OT19PUDtcclxudmFyIG9wdGlvbnNfMSA9IHJlcXVpcmUoXCIuL2NvcmUvb3B0aW9uc1wiKTtcclxuZXhwb3J0cy5vcHRpb25zID0gb3B0aW9uc18xLmRlZmF1bHQ7XHJcbnZhciBWTm9kZXNfMSA9IHJlcXVpcmUoXCIuL2NvcmUvVk5vZGVzXCIpO1xyXG5leHBvcnRzLmNsb25lVk5vZGUgPSBWTm9kZXNfMS5jbG9uZVZOb2RlO1xyXG5leHBvcnRzLmNyZWF0ZVZOb2RlID0gVk5vZGVzXzEuY3JlYXRlVk5vZGU7XHJcbnZhciBsaW5rRXZlbnRfMSA9IHJlcXVpcmUoXCIuL0RPTS9ldmVudHMvbGlua0V2ZW50XCIpO1xyXG5leHBvcnRzLmxpbmtFdmVudCA9IGxpbmtFdmVudF8xLmRlZmF1bHQ7XHJcbnZhciByZW5kZXJpbmdfMSA9IHJlcXVpcmUoXCIuL0RPTS9yZW5kZXJpbmdcIik7XHJcbmV4cG9ydHMuY3JlYXRlUmVuZGVyZXIgPSByZW5kZXJpbmdfMS5jcmVhdGVSZW5kZXJlcjtcclxuZXhwb3J0cy5maW5kRE9NTm9kZSA9IHJlbmRlcmluZ18xLmZpbmRET01Ob2RlO1xyXG5leHBvcnRzLnJlbmRlciA9IHJlbmRlcmluZ18xLnJlbmRlcjtcclxudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi9ET00vdXRpbHNcIik7XHJcbmV4cG9ydHMuRU1QVFlfT0JKID0gdXRpbHNfMS5FTVBUWV9PQko7XHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XHJcbiAgICB2YXIgdGVzdEZ1bmMgPSBmdW5jdGlvbiB0ZXN0Rm4oKSB7XHJcbiAgICB9O1xyXG4gICAgaWYgKCh0ZXN0RnVuYy5uYW1lIHx8IHRlc3RGdW5jLnRvU3RyaW5nKCkpLmluZGV4T2YoJ3Rlc3RGbicpID09PSAtMSkge1xyXG4gICAgICAgIGluZmVybm9fc2hhcmVkXzEud2FybmluZygoJ0l0IGxvb2tzIGxpa2UgeW91XFwncmUgdXNpbmcgYSBtaW5pZmllZCBjb3B5IG9mIHRoZSBkZXZlbG9wbWVudCBidWlsZCAnICtcclxuICAgICAgICAgICAgJ29mIEluZmVybm8uIFdoZW4gZGVwbG95aW5nIEluZmVybm8gYXBwcyB0byBwcm9kdWN0aW9uLCBtYWtlIHN1cmUgdG8gdXNlICcgK1xyXG4gICAgICAgICAgICAndGhlIHByb2R1Y3Rpb24gYnVpbGQgd2hpY2ggc2tpcHMgZGV2ZWxvcG1lbnQgd2FybmluZ3MgYW5kIGlzIGZhc3Rlci4gJyArXHJcbiAgICAgICAgICAgICdTZWUgaHR0cDovL2luZmVybm9qcy5vcmcgZm9yIG1vcmUgZGV0YWlscy4nKSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy52ZXJzaW9uID0gJzEuNi4yJztcclxuLy8gd2UgZHVwbGljYXRlIGl0IHNvIGl0IHBsYXlzIG5pY2VseSB3aXRoIGRpZmZlcmVudCBtb2R1bGUgbG9hZGluZyBzeXN0ZW1zXHJcbmV4cG9ydHMuZGVmYXVsdCA9IHtcclxuICAgIGxpbmtFdmVudDogbGlua0V2ZW50XzEuZGVmYXVsdCxcclxuICAgIC8vIGNvcmUgc2hhcGVzXHJcbiAgICBjcmVhdGVWTm9kZTogVk5vZGVzXzEuY3JlYXRlVk5vZGUsXHJcbiAgICAvLyBjbG9uaW5nXHJcbiAgICBjbG9uZVZOb2RlOiBWTm9kZXNfMS5jbG9uZVZOb2RlLFxyXG4gICAgLy8gdXNlZCB0byBzaGFyZWQgY29tbW9uIGl0ZW1zIGJldHdlZW4gSW5mZXJubyBsaWJzXHJcbiAgICBOT19PUDogaW5mZXJub19zaGFyZWRfMS5OT19PUCxcclxuICAgIEVNUFRZX09CSjogdXRpbHNfMS5FTVBUWV9PQkosXHJcbiAgICAvLyBET01cclxuICAgIHJlbmRlcjogcmVuZGVyaW5nXzEucmVuZGVyLFxyXG4gICAgZmluZERPTU5vZGU6IHJlbmRlcmluZ18xLmZpbmRET01Ob2RlLFxyXG4gICAgY3JlYXRlUmVuZGVyZXI6IHJlbmRlcmluZ18xLmNyZWF0ZVJlbmRlcmVyLFxyXG4gICAgb3B0aW9uczogb3B0aW9uc18xLmRlZmF1bHQsXHJcbiAgICB2ZXJzaW9uOiBleHBvcnRzLnZlcnNpb25cclxufTtcclxuLy8gSW50ZXJuYWwgc3R1ZmYgdGhhdCBvbmx5IGNvcmUgaW5mZXJuby0qIHBhY2thZ2VzIHVzZVxyXG52YXIgY29uc3RhbnRzXzEgPSByZXF1aXJlKFwiLi9ET00vY29uc3RhbnRzXCIpO1xyXG5leHBvcnRzLmludGVybmFsX2lzVW5pdGxlc3NOdW1iZXIgPSBjb25zdGFudHNfMS5pc1VuaXRsZXNzTnVtYmVyO1xyXG4vLyBNYWlubHkgZm9yIHRlc3RpbmdcclxudmFyIG5vcm1hbGl6YXRpb25fMSA9IHJlcXVpcmUoXCIuL2NvcmUvbm9ybWFsaXphdGlvblwiKTtcclxuZXhwb3J0cy5pbnRlcm5hbF9ub3JtYWxpemUgPSBub3JtYWxpemF0aW9uXzEubm9ybWFsaXplO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGlzdCcpLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gbW9kdWxlLmV4cG9ydHM7XG5cbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbi8vIE1ha2Ugc3VyZSB1IHVzZSBFTVBUWV9PQkogZnJvbSAnaW5mZXJubycsIG90aGVyd2lzZSBpdCdsbCBiZSBhIGRpZmZlcmVudCByZWZlcmVuY2VcclxudmFyIGluZmVybm9fMSA9IHJlcXVpcmUoXCJpbmZlcm5vXCIpO1xyXG52YXIgaW5mZXJub19zaGFyZWRfMSA9IHJlcXVpcmUoXCJpbmZlcm5vLXNoYXJlZFwiKTtcclxudmFyIG5vT3AgPSBpbmZlcm5vX3NoYXJlZF8xLkVSUk9SX01TRztcclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcclxuICAgIG5vT3AgPSAnSW5mZXJubyBFcnJvcjogQ2FuIG9ubHkgdXBkYXRlIGEgbW91bnRlZCBvciBtb3VudGluZyBjb21wb25lbnQuIFRoaXMgdXN1YWxseSBtZWFucyB5b3UgY2FsbGVkIHNldFN0YXRlKCkgb3IgZm9yY2VVcGRhdGUoKSBvbiBhbiB1bm1vdW50ZWQgY29tcG9uZW50LiBUaGlzIGlzIGEgbm8tb3AuJztcclxufVxyXG52YXIgY29tcG9uZW50Q2FsbGJhY2tRdWV1ZSA9IG5ldyBNYXAoKTtcclxuLy8gd2hlbiBhIGNvbXBvbmVudHMgcm9vdCBWTm9kZSBpcyBhbHNvIGEgY29tcG9uZW50LCB3ZSBjYW4gcnVuIGludG8gaXNzdWVzXHJcbi8vIHRoaXMgd2lsbCByZWN1cnNpdmVseSBsb29rIGZvciB2Tm9kZS5wYXJlbnROb2RlIGlmIHRoZSBWTm9kZSBpcyBhIGNvbXBvbmVudFxyXG5mdW5jdGlvbiB1cGRhdGVQYXJlbnRDb21wb25lbnRWTm9kZXModk5vZGUsIGRvbSkge1xyXG4gICAgaWYgKHZOb2RlLmZsYWdzICYgMjggLyogQ29tcG9uZW50ICovKSB7XHJcbiAgICAgICAgdmFyIHBhcmVudFZOb2RlID0gdk5vZGUucGFyZW50Vk5vZGU7XHJcbiAgICAgICAgaWYgKHBhcmVudFZOb2RlKSB7XHJcbiAgICAgICAgICAgIHBhcmVudFZOb2RlLmRvbSA9IGRvbTtcclxuICAgICAgICAgICAgdXBkYXRlUGFyZW50Q29tcG9uZW50Vk5vZGVzKHBhcmVudFZOb2RlLCBkb20pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG52YXIgcmVzb2x2ZWRQcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbmZ1bmN0aW9uIGFkZFRvUXVldWUoY29tcG9uZW50LCBmb3JjZSwgY2FsbGJhY2spIHtcclxuICAgIC8vIFRPRE8gdGhpcyBmdW5jdGlvbiBuZWVkcyB0byBiZSByZXZpc2VkIGFuZCBpbXByb3ZlZCBvblxyXG4gICAgdmFyIHF1ZXVlID0gY29tcG9uZW50Q2FsbGJhY2tRdWV1ZS5nZXQoY29tcG9uZW50KTtcclxuICAgIGlmICghcXVldWUpIHtcclxuICAgICAgICBxdWV1ZSA9IFtdO1xyXG4gICAgICAgIGNvbXBvbmVudENhbGxiYWNrUXVldWUuc2V0KGNvbXBvbmVudCwgcXVldWUpO1xyXG4gICAgICAgIHJlc29sdmVkUHJvbWlzZS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29tcG9uZW50Q2FsbGJhY2tRdWV1ZS5kZWxldGUoY29tcG9uZW50KTtcclxuICAgICAgICAgICAgY29tcG9uZW50Ll91cGRhdGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIGFwcGx5U3RhdGUoY29tcG9uZW50LCBmb3JjZSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHF1ZXVlLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVldWVbaV0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudC5fdXBkYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgIHF1ZXVlLnB1c2goY2FsbGJhY2spO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHF1ZXVlU3RhdGVDaGFuZ2VzKGNvbXBvbmVudCwgbmV3U3RhdGUsIGNhbGxiYWNrKSB7XHJcbiAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc0Z1bmN0aW9uKG5ld1N0YXRlKSkge1xyXG4gICAgICAgIG5ld1N0YXRlID0gbmV3U3RhdGUoY29tcG9uZW50LnN0YXRlLCBjb21wb25lbnQucHJvcHMsIGNvbXBvbmVudC5jb250ZXh0KTtcclxuICAgIH1cclxuICAgIHZhciBwZW5kaW5nID0gY29tcG9uZW50Ll9wZW5kaW5nU3RhdGU7XHJcbiAgICBpZiAocGVuZGluZyA9PT0gbnVsbCkge1xyXG4gICAgICAgIGNvbXBvbmVudC5fcGVuZGluZ1N0YXRlID0gcGVuZGluZyA9IG5ld1N0YXRlO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgZm9yICh2YXIgc3RhdGVLZXkgaW4gbmV3U3RhdGUpIHtcclxuICAgICAgICAgICAgcGVuZGluZ1tzdGF0ZUtleV0gPSBuZXdTdGF0ZVtzdGF0ZUtleV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGluZmVybm9fc2hhcmVkXzEuaXNCcm93c2VyICYmICFjb21wb25lbnQuX3BlbmRpbmdTZXRTdGF0ZSAmJiAhY29tcG9uZW50Ll9ibG9ja1JlbmRlcikge1xyXG4gICAgICAgIGlmICghY29tcG9uZW50Ll91cGRhdGluZykge1xyXG4gICAgICAgICAgICBjb21wb25lbnQuX3BlbmRpbmdTZXRTdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudC5fdXBkYXRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICBhcHBseVN0YXRlKGNvbXBvbmVudCwgZmFsc2UsIGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgY29tcG9uZW50Ll91cGRhdGluZyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYWRkVG9RdWV1ZShjb21wb25lbnQsIGZhbHNlLCBjYWxsYmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdmFyIHN0YXRlID0gY29tcG9uZW50LnN0YXRlO1xyXG4gICAgICAgIGlmIChzdGF0ZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjb21wb25lbnQuc3RhdGUgPSBwZW5kaW5nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHBlbmRpbmcpIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlW2tleV0gPSBwZW5kaW5nW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29tcG9uZW50Ll9wZW5kaW5nU3RhdGUgPSBudWxsO1xyXG4gICAgICAgIGlmIChjYWxsYmFjayAmJiBjb21wb25lbnQuX2Jsb2NrUmVuZGVyKSB7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudC5fbGlmZWN5Y2xlLmFkZExpc3RlbmVyKGNhbGxiYWNrLmJpbmQoY29tcG9uZW50KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGFwcGx5U3RhdGUoY29tcG9uZW50LCBmb3JjZSwgY2FsbGJhY2spIHtcclxuICAgIGlmIChjb21wb25lbnQuX3VubW91bnRlZCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChmb3JjZSB8fCAhY29tcG9uZW50Ll9ibG9ja1JlbmRlcikge1xyXG4gICAgICAgIGNvbXBvbmVudC5fcGVuZGluZ1NldFN0YXRlID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIHBlbmRpbmdTdGF0ZSA9IGNvbXBvbmVudC5fcGVuZGluZ1N0YXRlO1xyXG4gICAgICAgIHZhciBwcmV2U3RhdGUgPSBjb21wb25lbnQuc3RhdGU7XHJcbiAgICAgICAgdmFyIG5leHRTdGF0ZSA9IGluZmVybm9fc2hhcmVkXzEuY29tYmluZUZyb20ocHJldlN0YXRlLCBwZW5kaW5nU3RhdGUpO1xyXG4gICAgICAgIHZhciBwcm9wcyA9IGNvbXBvbmVudC5wcm9wcztcclxuICAgICAgICB2YXIgY29udGV4dF8xID0gY29tcG9uZW50LmNvbnRleHQ7XHJcbiAgICAgICAgY29tcG9uZW50Ll9wZW5kaW5nU3RhdGUgPSBudWxsO1xyXG4gICAgICAgIHZhciBuZXh0SW5wdXQgPSBjb21wb25lbnQuX3VwZGF0ZUNvbXBvbmVudChwcmV2U3RhdGUsIG5leHRTdGF0ZSwgcHJvcHMsIHByb3BzLCBjb250ZXh0XzEsIGZvcmNlLCB0cnVlKTtcclxuICAgICAgICB2YXIgZGlkVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICBpZiAoaW5mZXJub19zaGFyZWRfMS5pc0ludmFsaWQobmV4dElucHV0KSkge1xyXG4gICAgICAgICAgICBuZXh0SW5wdXQgPSBpbmZlcm5vXzEuY3JlYXRlVk5vZGUoNDA5NiAvKiBWb2lkICovLCBudWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAobmV4dElucHV0ID09PSBpbmZlcm5vX3NoYXJlZF8xLk5PX09QKSB7XHJcbiAgICAgICAgICAgIG5leHRJbnB1dCA9IGNvbXBvbmVudC5fbGFzdElucHV0O1xyXG4gICAgICAgICAgICBkaWRVcGRhdGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaW5mZXJub19zaGFyZWRfMS5pc1N0cmluZ09yTnVtYmVyKG5leHRJbnB1dCkpIHtcclxuICAgICAgICAgICAgbmV4dElucHV0ID0gaW5mZXJub18xLmNyZWF0ZVZOb2RlKDEgLyogVGV4dCAqLywgbnVsbCwgbnVsbCwgbmV4dElucHV0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaW5mZXJub19zaGFyZWRfMS5pc0FycmF5KG5leHRJbnB1dCkpIHtcclxuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIGluZmVybm9fc2hhcmVkXzEudGhyb3dFcnJvcignYSB2YWxpZCBJbmZlcm5vIFZOb2RlIChvciBudWxsKSBtdXN0IGJlIHJldHVybmVkIGZyb20gYSBjb21wb25lbnQgcmVuZGVyLiBZb3UgbWF5IGhhdmUgcmV0dXJuZWQgYW4gYXJyYXkgb3IgYW4gaW52YWxpZCBvYmplY3QuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW5mZXJub19zaGFyZWRfMS50aHJvd0Vycm9yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBsYXN0SW5wdXQgPSBjb21wb25lbnQuX2xhc3RJbnB1dDtcclxuICAgICAgICB2YXIgdk5vZGUgPSBjb21wb25lbnQuX3ZOb2RlO1xyXG4gICAgICAgIHZhciBwYXJlbnREb20gPSAobGFzdElucHV0LmRvbSAmJiBsYXN0SW5wdXQuZG9tLnBhcmVudE5vZGUpIHx8IChsYXN0SW5wdXQuZG9tID0gdk5vZGUuZG9tKTtcclxuICAgICAgICBjb21wb25lbnQuX2xhc3RJbnB1dCA9IG5leHRJbnB1dDtcclxuICAgICAgICBpZiAoZGlkVXBkYXRlKSB7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZENvbnRleHQgPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc1VuZGVmaW5lZChjb21wb25lbnQuZ2V0Q2hpbGRDb250ZXh0KSkge1xyXG4gICAgICAgICAgICAgICAgY2hpbGRDb250ZXh0ID0gY29tcG9uZW50LmdldENoaWxkQ29udGV4dCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzTnVsbE9yVW5kZWYoY2hpbGRDb250ZXh0KSkge1xyXG4gICAgICAgICAgICAgICAgY2hpbGRDb250ZXh0ID0gY29tcG9uZW50Ll9jaGlsZENvbnRleHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZENvbnRleHQgPSBpbmZlcm5vX3NoYXJlZF8xLmNvbWJpbmVGcm9tKGNvbnRleHRfMSwgY2hpbGRDb250ZXh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgbGlmZUN5Y2xlID0gY29tcG9uZW50Ll9saWZlY3ljbGU7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudC5fcGF0Y2gobGFzdElucHV0LCBuZXh0SW5wdXQsIHBhcmVudERvbSwgbGlmZUN5Y2xlLCBjaGlsZENvbnRleHQsIGNvbXBvbmVudC5faXNTVkcsIGZhbHNlKTtcclxuICAgICAgICAgICAgbGlmZUN5Y2xlLnRyaWdnZXIoKTtcclxuICAgICAgICAgICAgaWYgKCFpbmZlcm5vX3NoYXJlZF8xLmlzVW5kZWZpbmVkKGNvbXBvbmVudC5jb21wb25lbnREaWRVcGRhdGUpKSB7XHJcbiAgICAgICAgICAgICAgICBjb21wb25lbnQuY29tcG9uZW50RGlkVXBkYXRlKHByb3BzLCBwcmV2U3RhdGUsIGNvbnRleHRfMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW5mZXJub18xLm9wdGlvbnMuYWZ0ZXJVcGRhdGUgJiYgaW5mZXJub18xLm9wdGlvbnMuYWZ0ZXJVcGRhdGUodk5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZG9tID0gdk5vZGUuZG9tID0gbmV4dElucHV0LmRvbTtcclxuICAgICAgICB2YXIgY29tcG9uZW50VG9ET01Ob2RlTWFwID0gY29tcG9uZW50Ll9jb21wb25lbnRUb0RPTU5vZGVNYXA7XHJcbiAgICAgICAgY29tcG9uZW50VG9ET01Ob2RlTWFwICYmIGNvbXBvbmVudFRvRE9NTm9kZU1hcC5zZXQoY29tcG9uZW50LCBuZXh0SW5wdXQuZG9tKTtcclxuICAgICAgICB1cGRhdGVQYXJlbnRDb21wb25lbnRWTm9kZXModk5vZGUsIGRvbSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjb21wb25lbnQuc3RhdGUgPSBjb21wb25lbnQuX3BlbmRpbmdTdGF0ZTtcclxuICAgICAgICBjb21wb25lbnQuX3BlbmRpbmdTdGF0ZSA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAoIWluZmVybm9fc2hhcmVkXzEuaXNOdWxsT3JVbmRlZihjYWxsYmFjaykpIHtcclxuICAgICAgICBjYWxsYmFjay5jYWxsKGNvbXBvbmVudCk7XHJcbiAgICB9XHJcbn1cclxudmFyIGFscmVhZHlXYXJuZWQgPSBmYWxzZTtcclxudmFyIENvbXBvbmVudCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBDb21wb25lbnQocHJvcHMsIGNvbnRleHQpIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9ibG9ja1JlbmRlciA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2Jsb2NrU2V0U3RhdGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3BlbmRpbmdTZXRTdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3BlbmRpbmdTdGF0ZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fbGFzdElucHV0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLl92Tm9kZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fdW5tb3VudGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fbGlmZWN5Y2xlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jaGlsZENvbnRleHQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX3BhdGNoID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9pc1NWRyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2NvbXBvbmVudFRvRE9NTm9kZU1hcCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRpbmcgPSB0cnVlO1xyXG4gICAgICAgIC8qKiBAdHlwZSB7b2JqZWN0fSAqL1xyXG4gICAgICAgIHRoaXMucHJvcHMgPSBwcm9wcyB8fCBpbmZlcm5vXzEuRU1QVFlfT0JKO1xyXG4gICAgICAgIC8qKiBAdHlwZSB7b2JqZWN0fSAqL1xyXG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQgfHwgaW5mZXJub18xLkVNUFRZX09CSjsgLy8gY29udGV4dCBzaG91bGQgbm90IGJlIG11dGFibGVcclxuICAgIH1cclxuICAgIENvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dCkge1xyXG4gICAgfTtcclxuICAgIENvbXBvbmVudC5wcm90b3R5cGUuZm9yY2VVcGRhdGUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICBpZiAodGhpcy5fdW5tb3VudGVkIHx8ICFpbmZlcm5vX3NoYXJlZF8xLmlzQnJvd3Nlcikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFwcGx5U3RhdGUodGhpcywgdHJ1ZSwgY2FsbGJhY2spO1xyXG4gICAgfTtcclxuICAgIENvbXBvbmVudC5wcm90b3R5cGUuc2V0U3RhdGUgPSBmdW5jdGlvbiAobmV3U3RhdGUsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3VubW91bnRlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5fYmxvY2tTZXRTdGF0ZSkge1xyXG4gICAgICAgICAgICBxdWV1ZVN0YXRlQ2hhbmdlcyh0aGlzLCBuZXdTdGF0ZSwgY2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIGluZmVybm9fc2hhcmVkXzEudGhyb3dFcnJvcignY2Fubm90IHVwZGF0ZSBzdGF0ZSB2aWEgc2V0U3RhdGUoKSBpbiBjb21wb25lbnRXaWxsVXBkYXRlKCkgb3IgY29uc3RydWN0b3IuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW5mZXJub19zaGFyZWRfMS50aHJvd0Vycm9yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIENvbXBvbmVudC5wcm90b3R5cGUuc2V0U3RhdGVTeW5jID0gZnVuY3Rpb24gKG5ld1N0YXRlKSB7XHJcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcclxuICAgICAgICAgICAgaWYgKCFhbHJlYWR5V2FybmVkKSB7XHJcbiAgICAgICAgICAgICAgICBhbHJlYWR5V2FybmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignSW5mZXJubyBXQVJOSU5HOiBzZXRTdGF0ZVN5bmMgaGFzIGJlZW4gZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIG5leHQgcmVsZWFzZS4gVXNlIHNldFN0YXRlIGluc3RlYWQuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XHJcbiAgICB9O1xyXG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5fdXBkYXRlQ29tcG9uZW50ID0gZnVuY3Rpb24gKHByZXZTdGF0ZSwgbmV4dFN0YXRlLCBwcmV2UHJvcHMsIG5leHRQcm9wcywgY29udGV4dCwgZm9yY2UsIGZyb21TZXRTdGF0ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLl91bm1vdW50ZWQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIGluZmVybm9fc2hhcmVkXzEudGhyb3dFcnJvcihub09wKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbmZlcm5vX3NoYXJlZF8xLnRocm93RXJyb3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKChwcmV2UHJvcHMgIT09IG5leHRQcm9wcyB8fCBuZXh0UHJvcHMgPT09IGluZmVybm9fMS5FTVBUWV9PQkopIHx8IHByZXZTdGF0ZSAhPT0gbmV4dFN0YXRlIHx8IGZvcmNlKSB7XHJcbiAgICAgICAgICAgIGlmIChwcmV2UHJvcHMgIT09IG5leHRQcm9wcyB8fCBuZXh0UHJvcHMgPT09IGluZmVybm9fMS5FTVBUWV9PQkopIHtcclxuICAgICAgICAgICAgICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc1VuZGVmaW5lZCh0aGlzLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMpICYmICFmcm9tU2V0U3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ibG9ja1JlbmRlciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcywgY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYmxvY2tSZW5kZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9wZW5kaW5nU2V0U3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0U3RhdGUgPSBpbmZlcm5vX3NoYXJlZF8xLmNvbWJpbmVGcm9tKG5leHRTdGF0ZSwgdGhpcy5fcGVuZGluZ1N0YXRlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wZW5kaW5nU2V0U3RhdGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wZW5kaW5nU3RhdGUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8qIFVwZGF0ZSBpZiBzY3UgaXMgbm90IGRlZmluZWQsIG9yIGl0IHJldHVybnMgdHJ1dGh5IHZhbHVlIG9yIGZvcmNlICovXHJcbiAgICAgICAgICAgIGlmIChpbmZlcm5vX3NoYXJlZF8xLmlzVW5kZWZpbmVkKHRoaXMuc2hvdWxkQ29tcG9uZW50VXBkYXRlKSB8fCB0aGlzLnNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSwgY29udGV4dCkgfHwgZm9yY2UpIHtcclxuICAgICAgICAgICAgICAgIGlmICghaW5mZXJub19zaGFyZWRfMS5pc1VuZGVmaW5lZCh0aGlzLmNvbXBvbmVudFdpbGxVcGRhdGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYmxvY2tTZXRTdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnRXaWxsVXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlLCBjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ibG9ja1NldFN0YXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzID0gbmV4dFByb3BzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IG5leHRTdGF0ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5mZXJub18xLm9wdGlvbnMuYmVmb3JlUmVuZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5mZXJub18xLm9wdGlvbnMuYmVmb3JlUmVuZGVyKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHJlbmRlciA9IHRoaXMucmVuZGVyKG5leHRQcm9wcywgbmV4dFN0YXRlLCBjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmZlcm5vXzEub3B0aW9ucy5hZnRlclJlbmRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZmVybm9fMS5vcHRpb25zLmFmdGVyUmVuZGVyKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlbmRlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMgPSBuZXh0UHJvcHM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gbmV4dFN0YXRlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5mZXJub19zaGFyZWRfMS5OT19PUDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQ29tcG9uZW50O1xyXG59KCkpO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBDb21wb25lbnQ7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9kaXN0JykuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBtb2R1bGUuZXhwb3J0cztcblxuIiwiaW1wb3J0IEluZmVybm8gZnJvbSAnaW5mZXJubydcbmltcG9ydCBDb21wb25lbnQgZnJvbSAnaW5mZXJuby1jb21wb25lbnQnXG5cbmNsYXNzIFJvb3QgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIHJlbmRlcigpIHtcblxuICAgIGNvbnN0IE5PREVfRU5WID0gJ05PREVfRU5WJ1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxoMT5IZWxsbyB3b3JsZCE8L2gxPlxuICAgICAgICA8Y29kZT5DdXJyZW50IEVOVjoge05PREVfRU5WfTwvY29kZT5cbiAgICAgIDwvZGl2PlxuICAgIClcblxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUm9vdCIsImltcG9ydCBJbmZlcm5vIGZyb20gJ2luZmVybm8nXG5pbXBvcnQgUm9vdCBmcm9tICcuL3Jvb3QnXG5cbmltcG9ydCAnLi9zdHlsZXMvc3R5bGUuc2NzcydcblxuY29uc3Qgcm9vdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKVxuXG5JbmZlcm5vLnJlbmRlcig8Um9vdC8+LCByb290RWwpXG4iXSwibmFtZXMiOlsiZ2xvYmFsIiwicmVxdWlyZSQkMCIsImluZmVybm9fc2hhcmVkXzEiLCJ1dGlsc18xIiwiVk5vZGVzXzEiLCJJbnB1dFdyYXBwZXJfMSIsIlNlbGVjdFdyYXBwZXJfMSIsIlRleHRhcmVhV3JhcHBlcl8xIiwiY29uc3RhbnRzXzEiLCJtb3VudGluZ18xIiwib3B0aW9uc18xIiwicmVuZGVyaW5nXzEiLCJwYXRjaGluZ18xIiwicmVjeWNsaW5nXzEiLCJoeWRyYXRpb25fMSIsInVubW91bnRpbmdfMSIsImRlbGVnYXRpb25fMSIsIm5vcm1hbGl6YXRpb25fMSIsImluZmVybm9fMSIsIlJvb3QiLCJOT0RFX0VOViIsIkNvbXBvbmVudCIsInJvb3RFbCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJJbmZlcm5vIiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxlQUFlLE9BQU8sTUFBTSxLQUFLLFdBQVcsR0FBRyxNQUFNO1lBQ3pDLE9BQU8sSUFBSSxLQUFLLFdBQVcsR0FBRyxJQUFJO1lBQ2xDLE9BQU8sTUFBTSxLQUFLLFdBQVcsR0FBRyxNQUFNLEdBQUcsRUFBRSxDQUFBOztBQ0N2RCxTQUFTLGdCQUFnQixHQUFHO0lBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztDQUN0RDtBQUNELFNBQVMsbUJBQW1CLElBQUk7SUFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0NBQ3hEO0FBQ0QsSUFBSSxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztBQUN4QyxJQUFJLGtCQUFrQixHQUFHLG1CQUFtQixDQUFDO0FBQzdDLElBQUksT0FBT0EsUUFBTSxDQUFDLFVBQVUsS0FBSyxVQUFVLEVBQUU7SUFDekMsZ0JBQWdCLEdBQUcsVUFBVSxDQUFDO0NBQ2pDO0FBQ0QsSUFBSSxPQUFPQSxRQUFNLENBQUMsWUFBWSxLQUFLLFVBQVUsRUFBRTtJQUMzQyxrQkFBa0IsR0FBRyxZQUFZLENBQUM7Q0FDckM7O0FBRUQsU0FBUyxVQUFVLENBQUMsR0FBRyxFQUFFO0lBQ3JCLElBQUksZ0JBQWdCLEtBQUssVUFBVSxFQUFFOztRQUVqQyxPQUFPLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDN0I7O0lBRUQsSUFBSSxDQUFDLGdCQUFnQixLQUFLLGdCQUFnQixJQUFJLENBQUMsZ0JBQWdCLEtBQUssVUFBVSxFQUFFO1FBQzVFLGdCQUFnQixHQUFHLFVBQVUsQ0FBQztRQUM5QixPQUFPLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDN0I7SUFDRCxJQUFJOztRQUVBLE9BQU8sZ0JBQWdCLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ25DLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDTixJQUFJOztZQUVBLE9BQU8sZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDOUMsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7WUFFTixPQUFPLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzlDO0tBQ0o7OztDQUdKO0FBQ0QsU0FBUyxlQUFlLENBQUMsTUFBTSxFQUFFO0lBQzdCLElBQUksa0JBQWtCLEtBQUssWUFBWSxFQUFFOztRQUVyQyxPQUFPLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUMvQjs7SUFFRCxJQUFJLENBQUMsa0JBQWtCLEtBQUssbUJBQW1CLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxZQUFZLEVBQUU7UUFDckYsa0JBQWtCLEdBQUcsWUFBWSxDQUFDO1FBQ2xDLE9BQU8sWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQy9CO0lBQ0QsSUFBSTs7UUFFQSxPQUFPLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3JDLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDUCxJQUFJOztZQUVBLE9BQU8sa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNoRCxDQUFDLE9BQU8sQ0FBQyxDQUFDOzs7WUFHUCxPQUFPLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDaEQ7S0FDSjs7OztDQUlKO0FBQ0QsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2YsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO0FBQ3JCLElBQUksWUFBWSxDQUFDO0FBQ2pCLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDOztBQUVwQixTQUFTLGVBQWUsR0FBRztJQUN2QixJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsWUFBWSxFQUFFO1FBQzVCLE9BQU87S0FDVjtJQUNELFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDakIsSUFBSSxZQUFZLENBQUMsTUFBTSxFQUFFO1FBQ3JCLEtBQUssR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3RDLE1BQU07UUFDSCxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDbkI7SUFDRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7UUFDZCxVQUFVLEVBQUUsQ0FBQztLQUNoQjtDQUNKOztBQUVELFNBQVMsVUFBVSxHQUFHO0lBQ2xCLElBQUksUUFBUSxFQUFFO1FBQ1YsT0FBTztLQUNWO0lBQ0QsSUFBSSxPQUFPLEdBQUcsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzFDLFFBQVEsR0FBRyxJQUFJLENBQUM7O0lBRWhCLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDdkIsTUFBTSxHQUFHLEVBQUU7UUFDUCxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxPQUFPLEVBQUUsVUFBVSxHQUFHLEdBQUcsRUFBRTtZQUN2QixJQUFJLFlBQVksRUFBRTtnQkFDZCxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDbEM7U0FDSjtRQUNELFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNoQixHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztLQUN0QjtJQUNELFlBQVksR0FBRyxJQUFJLENBQUM7SUFDcEIsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUNqQixlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDNUI7QUFDRCxBQUFPLFNBQVMsUUFBUSxDQUFDLEdBQUcsRUFBRTtJQUMxQixJQUFJLElBQUksR0FBRyxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzNDLElBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDdEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdkMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDOUI7S0FDSjtJQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDaEMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUNqQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDMUI7Q0FDSjs7QUFFRCxTQUFTLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFO0lBQ3RCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Q0FDdEI7QUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxZQUFZO0lBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDcEMsQ0FBQztBQUNGLEFBQU8sSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDO0FBQzdCLEFBQU8sSUFBSSxRQUFRLEdBQUcsU0FBUyxDQUFDO0FBQ2hDLEFBQU8sSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQzFCLEFBQU8sSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLEFBQU8sSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLEFBQU8sSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQ3hCLEFBQU8sSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3pCLEFBQU8sSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQ3hCLEFBQU8sSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDOztBQUV2QixTQUFTLElBQUksR0FBRyxFQUFFOztBQUVsQixBQUFPLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztBQUNyQixBQUFPLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQztBQUM5QixBQUFPLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztBQUN2QixBQUFPLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQztBQUN0QixBQUFPLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQztBQUNqQyxBQUFPLElBQUksa0JBQWtCLEdBQUcsSUFBSSxDQUFDO0FBQ3JDLEFBQU8sSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDOztBQUV2QixBQUFPLFNBQVMsT0FBTyxDQUFDLElBQUksRUFBRTtJQUMxQixNQUFNLElBQUksS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7Q0FDdkQ7O0FBRUQsQUFBTyxTQUFTLEdBQUcsSUFBSSxFQUFFLE9BQU8sR0FBRyxFQUFFO0FBQ3JDLEFBQU8sU0FBUyxLQUFLLEVBQUUsR0FBRyxFQUFFO0lBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztDQUNyRCxBQUFDO0FBQ0YsQUFBTyxTQUFTLEtBQUssR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUU7OztBQUdyQyxJQUFJLFdBQVcsR0FBR0EsUUFBTSxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUE7QUFDMUMsSUFBSSxjQUFjO0VBQ2hCLFdBQVcsQ0FBQyxHQUFHO0VBQ2YsV0FBVyxDQUFDLE1BQU07RUFDbEIsV0FBVyxDQUFDLEtBQUs7RUFDakIsV0FBVyxDQUFDLElBQUk7RUFDaEIsV0FBVyxDQUFDLFNBQVM7RUFDckIsVUFBVSxFQUFFLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUE7Ozs7QUFJN0MsQUFBTyxTQUFTLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztFQUN2QyxJQUFJLFNBQVMsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQTtFQUNyRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0VBQ25DLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0VBQy9DLElBQUksaUJBQWlCLEVBQUU7SUFDckIsT0FBTyxHQUFHLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUN4QyxXQUFXLEdBQUcsV0FBVyxHQUFHLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2hELElBQUksV0FBVyxDQUFDLENBQUMsRUFBRTtNQUNqQixPQUFPLEVBQUUsQ0FBQTtNQUNULFdBQVcsSUFBSSxHQUFHLENBQUE7S0FDbkI7R0FDRjtFQUNELE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO0NBQzdCOztBQUVELElBQUksU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7QUFDM0IsQUFBTyxTQUFTLE1BQU0sR0FBRztFQUN2QixJQUFJLFdBQVcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0VBQzdCLElBQUksR0FBRyxHQUFHLFdBQVcsR0FBRyxTQUFTLENBQUM7RUFDbEMsT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFDO0NBQ25COztBQUVELGNBQWU7RUFDYixRQUFRLEVBQUUsUUFBUTtFQUNsQixLQUFLLEVBQUUsS0FBSztFQUNaLE9BQU8sRUFBRSxPQUFPO0VBQ2hCLEdBQUcsRUFBRSxHQUFHO0VBQ1IsSUFBSSxFQUFFLElBQUk7RUFDVixPQUFPLEVBQUUsT0FBTztFQUNoQixRQUFRLEVBQUUsUUFBUTtFQUNsQixFQUFFLEVBQUUsRUFBRTtFQUNOLFdBQVcsRUFBRSxXQUFXO0VBQ3hCLElBQUksRUFBRSxJQUFJO0VBQ1YsR0FBRyxFQUFFLEdBQUc7RUFDUixjQUFjLEVBQUUsY0FBYztFQUM5QixrQkFBa0IsRUFBRSxrQkFBa0I7RUFDdEMsSUFBSSxFQUFFLElBQUk7RUFDVixPQUFPLEVBQUUsT0FBTztFQUNoQixHQUFHLEVBQUUsR0FBRztFQUNSLEtBQUssRUFBRSxLQUFLO0VBQ1osS0FBSyxFQUFFLEtBQUs7RUFDWixNQUFNLEVBQUUsTUFBTTtFQUNkLFFBQVEsRUFBRSxRQUFRO0VBQ2xCLE9BQU8sRUFBRSxPQUFPO0VBQ2hCLE1BQU0sRUFBRSxNQUFNO0VBQ2QsTUFBTSxFQUFFLE1BQU07Q0FDZixDQUFDOzs7QUM3TkYsWUFBWSxDQUFDO0FBQ2IsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDOUQsYUFBYSxHQUFHLFFBQVEsQ0FBQztBQUN6QixpQkFBaUIsR0FBRyxvRkFBb0YsQ0FBQzs7QUFFekcsaUJBQWlCLEdBQUcsQ0FBQyxFQUFFLE9BQU8sTUFBTSxLQUFLLFdBQVcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDekUsU0FBUyxPQUFPLENBQUMsUUFBUSxFQUFFO0lBQ3ZCLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxRQUFRLElBQUksUUFBUSxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUM7Q0FDcEY7QUFDRCxlQUFlLEdBQUcsT0FBTyxDQUFDOzs7QUFHMUIsZUFBZSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7QUFDaEMsU0FBUyxtQkFBbUIsQ0FBQyxDQUFDLEVBQUU7SUFDNUIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUN4RTtBQUNELDJCQUEyQixHQUFHLG1CQUFtQixDQUFDO0FBQ2xELFNBQVMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFO0lBQzNCLElBQUksSUFBSSxHQUFHLE9BQU8sR0FBRyxDQUFDO0lBQ3RCLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLEtBQUssUUFBUSxDQUFDO0NBQ2pEO0FBQ0Qsd0JBQXdCLEdBQUcsZ0JBQWdCLENBQUM7QUFDNUMsU0FBUyxhQUFhLENBQUMsR0FBRyxFQUFFO0lBQ3hCLE9BQU8sV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUMxQztBQUNELHFCQUFxQixHQUFHLGFBQWEsQ0FBQztBQUN0QyxTQUFTLFNBQVMsQ0FBQyxHQUFHLEVBQUU7SUFDcEIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxLQUFLLEtBQUssSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQzFFO0FBQ0QsaUJBQWlCLEdBQUcsU0FBUyxDQUFDO0FBQzlCLFNBQVMsVUFBVSxDQUFDLEdBQUcsRUFBRTtJQUNyQixPQUFPLE9BQU8sR0FBRyxLQUFLLFVBQVUsQ0FBQztDQUNwQztBQUNELGtCQUFrQixHQUFHLFVBQVUsQ0FBQztBQUNoQyxTQUFTLFFBQVEsQ0FBQyxHQUFHLEVBQUU7SUFDbkIsT0FBTyxPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUM7Q0FDbEM7QUFDRCxnQkFBZ0IsR0FBRyxRQUFRLENBQUM7QUFDNUIsU0FBUyxRQUFRLENBQUMsR0FBRyxFQUFFO0lBQ25CLE9BQU8sT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFDO0NBQ2xDO0FBQ0QsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDO0FBQzVCLFNBQVMsTUFBTSxDQUFDLEdBQUcsRUFBRTtJQUNqQixPQUFPLEdBQUcsS0FBSyxJQUFJLENBQUM7Q0FDdkI7QUFDRCxjQUFjLEdBQUcsTUFBTSxDQUFDO0FBQ3hCLFNBQVMsTUFBTSxDQUFDLEdBQUcsRUFBRTtJQUNqQixPQUFPLEdBQUcsS0FBSyxJQUFJLENBQUM7Q0FDdkI7QUFDRCxjQUFjLEdBQUcsTUFBTSxDQUFDO0FBQ3hCLFNBQVMsV0FBVyxDQUFDLEdBQUcsRUFBRTtJQUN0QixPQUFPLEdBQUcsS0FBSyxTQUFTLENBQUM7Q0FDNUI7QUFDRCxtQkFBbUIsR0FBRyxXQUFXLENBQUM7QUFDbEMsU0FBUyxRQUFRLENBQUMsQ0FBQyxFQUFFO0lBQ2pCLE9BQU8sT0FBTyxDQUFDLEtBQUssUUFBUSxDQUFDO0NBQ2hDO0FBQ0QsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDO0FBQzVCLFNBQVMsVUFBVSxDQUFDLE9BQU8sRUFBRTtJQUN6QixJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ1YsT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7S0FDL0I7SUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxDQUFDO0NBQ2hEO0FBQ0Qsa0JBQWtCLEdBQUcsVUFBVSxDQUFDO0FBQ2hDLFNBQVMsT0FBTyxDQUFDLE9BQU8sRUFBRTtJQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0NBQ3pCO0FBQ0QsZUFBZSxHQUFHLE9BQU8sQ0FBQztBQUMxQixTQUFTLFdBQVcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFO0lBQ2hDLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNiLElBQUksR0FBRyxDQUFDO0lBQ1IsSUFBSSxLQUFLLEVBQUU7UUFDUCxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUU7WUFDZixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3pCO0tBQ0o7SUFDRCxJQUFJLE1BQU0sRUFBRTtRQUNSLEtBQUssR0FBRyxJQUFJLE1BQU0sRUFBRTtZQUNoQixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzFCO0tBQ0o7SUFDRCxPQUFPLEdBQUcsQ0FBQztDQUNkO0FBQ0QsbUJBQW1CLEdBQUcsV0FBVyxDQUFDO0FBQ2xDLFNBQVMsU0FBUyxHQUFHO0lBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0NBQ3ZCO0FBQ0QsaUJBQWlCLEdBQUcsU0FBUyxDQUFDO0FBQzlCLFNBQVMsQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLFNBQVMsV0FBVyxDQUFDLFFBQVEsRUFBRTtJQUM3RCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUNqQyxDQUFDO0FBQ0YsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsU0FBUyxPQUFPLEdBQUc7SUFDN0MsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMvQixJQUFJLFFBQVEsQ0FBQzs7SUFFYixPQUFPLFFBQVEsR0FBRyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDakMsUUFBUSxFQUFFLENBQUM7S0FDZDtDQUNKLENBQUM7Ozs7QUNuR0YsY0FBYyxHQUFHQyxPQUFpQixDQUFDO0FBQ25DLHNCQUFzQixHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7Ozs7QUNEeEMsWUFBWSxDQUFDO0FBQ2IsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDOUQsZUFBZSxHQUFHO0lBQ2QsZ0JBQWdCLEVBQUUsS0FBSztJQUN2QixrQkFBa0IsRUFBRSxLQUFLO0lBQ3pCLEtBQUssRUFBRSxJQUFJO0lBQ1gsV0FBVyxFQUFFLElBQUk7SUFDakIsWUFBWSxFQUFFLElBQUk7SUFDbEIsV0FBVyxFQUFFLElBQUk7SUFDakIsVUFBVSxFQUFFLElBQUk7SUFDaEIsV0FBVyxFQUFFLElBQUk7SUFDakIsYUFBYSxFQUFFLElBQUk7Q0FDdEIsQ0FBQzs7OztBQ1pGLFlBQVksQ0FBQztBQUNiLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzlELGVBQWUsR0FBRyw4QkFBOEIsQ0FBQztBQUNqRCxhQUFhLEdBQUcsc0NBQXNDLENBQUM7QUFDdkQsYUFBYSxHQUFHLDRCQUE0QixDQUFDO0FBQzdDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztBQUNoQixtQkFBbUIsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztBQUNsQyxPQUFPLENBQUMsV0FBVyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7QUFDMUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDbkMsb0JBQW9CLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMzQyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDbEMsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ25DLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNqQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDakMsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ3BDLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztBQUNwQyxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDcEMsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQ3JDLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztBQUNyQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDckMsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQ3JDLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztBQUNyQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDckMsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQ3JDLE9BQU8sQ0FBQyxZQUFZLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztBQUM1QyxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDdkMsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ25DLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztBQUN0QyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNwQyxrQkFBa0IsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pDLE9BQU8sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztBQUNuRCxPQUFPLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7QUFDdEQsT0FBTyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO0FBQ3RELE9BQU8sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztBQUNuRCxPQUFPLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7QUFDbkQsT0FBTyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO0FBQ3BELE9BQU8sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztBQUNuRCxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7QUFDL0MsT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO0FBQy9DLE9BQU8sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztBQUNoRCxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNsQyx3QkFBd0IsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQy9DLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUM7QUFDeEQsT0FBTyxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztBQUNsRCxPQUFPLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO0FBQ2pELE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7QUFDakQsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDeEMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7QUFDN0MsT0FBTyxDQUFDLGdCQUFnQixDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7QUFDaEQsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7QUFDNUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDckMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDekMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7QUFDN0MsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDM0MsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7QUFDN0MsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7QUFDMUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDeEMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDM0MsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDM0MsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7QUFDMUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDM0MsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDeEMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDdEMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDeEMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDeEMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDdkMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDdkMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDckMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7QUFDNUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7QUFDN0MsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsR0FBRyxJQUFJLENB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
