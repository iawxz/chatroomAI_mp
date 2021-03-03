(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });var


EventChannel = /*#__PURE__*/function () {
  function EventChannel(id, events) {var _this = this;_classCallCheck(this, EventChannel);
    this.id = id;
    this.listener = {};
    this.emitCache = {};
    if (events) {
      Object.keys(events).forEach(function (name) {
        _this.on(name, events[name]);
      });
    }
  }_createClass(EventChannel, [{ key: "emit", value: function emit(

    eventName) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
      var fns = this.listener[eventName];
      if (!fns) {
        return (this.emitCache[eventName] || (this.emitCache[eventName] = [])).push(args);
      }
      fns.forEach(function (opt) {
        opt.fn.apply(opt.fn, args);
      });
      this.listener[eventName] = fns.filter(function (opt) {return opt.type !== 'once';});
    } }, { key: "on", value: function on(

    eventName, fn) {
      this._addListener(eventName, 'on', fn);
      this._clearCache(eventName);
    } }, { key: "once", value: function once(

    eventName, fn) {
      this._addListener(eventName, 'once', fn);
      this._clearCache(eventName);
    } }, { key: "off", value: function off(

    eventName, fn) {
      var fns = this.listener[eventName];
      if (!fns) {
        return;
      }
      if (fn) {
        for (var i = 0; i < fns.length;) {
          if (fns[i].fn === fn) {
            fns.splice(i, 1);
            i--;
          }
          i++;
        }
      } else {
        delete this.listener[eventName];
      }
    } }, { key: "_clearCache", value: function _clearCache(

    eventName) {
      var cacheArgs = this.emitCache[eventName];
      if (cacheArgs) {
        for (; cacheArgs.length > 0;) {
          this.emit.apply(this, [eventName].concat(cacheArgs.shift()));
        }
      }
    } }, { key: "_addListener", value: function _addListener(

    eventName, type, fn) {
      (this.listener[eventName] || (this.listener[eventName] = [])).push({
        fn: fn,
        type: type });

    } }]);return EventChannel;}();


var eventChannels = {};

var eventChannelStack = [];

var id = 0;

function initEventChannel(events) {var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  id++;
  var eventChannel = new EventChannel(id, events);
  if (cache) {
    eventChannels[id] = eventChannel;
    eventChannelStack.push(eventChannel);
  }
  return eventChannel;
}

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var navigateTo = {
  args: function args(fromArgs, toArgs) {
    var id = initEventChannel(fromArgs.events).id;
    if (fromArgs.url) {
      fromArgs.url = fromArgs.url + (fromArgs.url.indexOf('?') === -1 ? '?' : '&') + '__id__=' + id;
    }
  },
  returnValue: function returnValue(fromRes, toRes) {
    fromRes.eventChannel = getEventChannel();
  } };


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  redirectTo: redirectTo,
  navigateTo: navigateTo,
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {args[_key4 - 1] = arguments[_key4];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this2.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this2.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          // eslint-disable-next-line no-sparse-arrays
          ret.push(handler.apply(handlerCtx, (Array.isArray(params) ? params : []).concat([,,,,,,,,,, event])));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  _vue.default.prototype.getOpenerEventChannel = function () {
    if (!this.__eventChannel__) {
      this.__eventChannel__ = new EventChannel();
    }
    return this.__eventChannel__;
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var rawBindings = vm.__secret_vfa_state__ && vm.__secret_vfa_state__.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }
  
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!**************************************!*\
  !*** D:/工作/chatroomAI_mp/pages.json ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 97:
/*!**************************************************!*\
  !*** D:/工作/chatroomAI_mp/pages/tool_4/city.json ***!
  \**************************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, default */
/***/ (function(module) {

module.exports = JSON.parse("[{\"label\":\"北京市\",\"value\":0,\"children\":[{\"label\":\"北京市\",\"value\":0,\"children\":[{\"label\":\"东城区\",\"value\":0},{\"label\":\"西城区\",\"value\":1},{\"label\":\"崇文区\",\"value\":2},{\"label\":\"宣武区\",\"value\":3},{\"label\":\"朝阳区\",\"value\":4},{\"label\":\"丰台区\",\"value\":5},{\"label\":\"石景山区\",\"value\":6},{\"label\":\"海淀区\",\"value\":7},{\"label\":\"门头沟区\",\"value\":8},{\"label\":\"房山区\",\"value\":9},{\"label\":\"通州区\",\"value\":10},{\"label\":\"顺义区\",\"value\":11},{\"label\":\"昌平区\",\"value\":12},{\"label\":\"大兴区\",\"value\":13},{\"label\":\"平谷区\",\"value\":14},{\"label\":\"怀柔区\",\"value\":15},{\"label\":\"密云县\",\"value\":16},{\"label\":\"延庆县\",\"value\":17}]}]},{\"label\":\"天津市\",\"value\":1,\"children\":[{\"label\":\"天津市\",\"value\":0,\"children\":[{\"label\":\"和平区\",\"value\":0},{\"label\":\"河东区\",\"value\":1},{\"label\":\"河西区\",\"value\":2},{\"label\":\"南开区\",\"value\":3},{\"label\":\"河北区\",\"value\":4},{\"label\":\"红桥区\",\"value\":5},{\"label\":\"塘沽区\",\"value\":6},{\"label\":\"汉沽区\",\"value\":7},{\"label\":\"大港区\",\"value\":8},{\"label\":\"东丽区\",\"value\":9},{\"label\":\"西青区\",\"value\":10},{\"label\":\"津南区\",\"value\":11},{\"label\":\"北辰区\",\"value\":12},{\"label\":\"武清区\",\"value\":13},{\"label\":\"宝坻区\",\"value\":14},{\"label\":\"宁河县\",\"value\":15},{\"label\":\"静海县\",\"value\":16},{\"label\":\"蓟  县\",\"value\":17}]}]},{\"label\":\"河北省\",\"value\":2,\"children\":[{\"label\":\"石家庄市\",\"value\":0,\"children\":[{\"label\":\"长安区\",\"value\":0},{\"label\":\"桥东区\",\"value\":1},{\"label\":\"桥西区\",\"value\":2},{\"label\":\"新华区\",\"value\":3},{\"label\":\"郊  区\",\"value\":4},{\"label\":\"井陉矿区\",\"value\":5},{\"label\":\"井陉县\",\"value\":6},{\"label\":\"正定县\",\"value\":7},{\"label\":\"栾城县\",\"value\":8},{\"label\":\"行唐县\",\"value\":9},{\"label\":\"灵寿县\",\"value\":10},{\"label\":\"高邑县\",\"value\":11},{\"label\":\"深泽县\",\"value\":12},{\"label\":\"赞皇县\",\"value\":13},{\"label\":\"无极县\",\"value\":14},{\"label\":\"平山县\",\"value\":15},{\"label\":\"元氏县\",\"value\":16},{\"label\":\"赵  县\",\"value\":17},{\"label\":\"辛集市\",\"value\":18},{\"label\":\"藁\",\"value\":19},{\"label\":\"晋州市\",\"value\":20},{\"label\":\"新乐市\",\"value\":21},{\"label\":\"鹿泉市\",\"value\":22}]},{\"label\":\"唐山市\",\"value\":1,\"children\":[{\"label\":\"路南区\",\"value\":0},{\"label\":\"路北区\",\"value\":1},{\"label\":\"古冶区\",\"value\":2},{\"label\":\"开平区\",\"value\":3},{\"label\":\"新  区\",\"value\":4},{\"label\":\"丰润县\",\"value\":5},{\"label\":\"滦  县\",\"value\":6},{\"label\":\"滦南县\",\"value\":7},{\"label\":\"乐亭县\",\"value\":8},{\"label\":\"迁西县\",\"value\":9},{\"label\":\"玉田县\",\"value\":10},{\"label\":\"唐海县\",\"value\":11},{\"label\":\"遵化市\",\"value\":12},{\"label\":\"丰南市\",\"value\":13},{\"label\":\"迁安市\",\"value\":14}]},{\"label\":\"秦皇岛市\",\"value\":2,\"children\":[{\"label\":\"海港区\",\"value\":0},{\"label\":\"山海关区\",\"value\":1},{\"label\":\"北戴河区\",\"value\":2},{\"label\":\"青龙满族自治县\",\"value\":3},{\"label\":\"昌黎县\",\"value\":4},{\"label\":\"抚宁县\",\"value\":5},{\"label\":\"卢龙县\",\"value\":6}]},{\"label\":\"邯郸市\",\"value\":3,\"children\":[{\"label\":\"邯山区\",\"value\":0},{\"label\":\"丛台区\",\"value\":1},{\"label\":\"复兴区\",\"value\":2},{\"label\":\"峰峰矿区\",\"value\":3},{\"label\":\"邯郸县\",\"value\":4},{\"label\":\"临漳县\",\"value\":5},{\"label\":\"成安县\",\"value\":6},{\"label\":\"大名县\",\"value\":7},{\"label\":\"涉  县\",\"value\":8},{\"label\":\"磁  县\",\"value\":9},{\"label\":\"肥乡县\",\"value\":10},{\"label\":\"永年县\",\"value\":11},{\"label\":\"邱  县\",\"value\":12},{\"label\":\"鸡泽县\",\"value\":13},{\"label\":\"广平县\",\"value\":14},{\"label\":\"馆陶县\",\"value\":15},{\"label\":\"魏  县\",\"value\":16},{\"label\":\"曲周县\",\"value\":17},{\"label\":\"武安市\",\"value\":18}]},{\"label\":\"邢台市\",\"value\":4,\"children\":[{\"label\":\"桥东区\",\"value\":0},{\"label\":\"桥西区\",\"value\":1},{\"label\":\"邢台县\",\"value\":2},{\"label\":\"临城县\",\"value\":3},{\"label\":\"内丘县\",\"value\":4},{\"label\":\"柏乡县\",\"value\":5},{\"label\":\"隆尧县\",\"value\":6},{\"label\":\"任  县\",\"value\":7},{\"label\":\"南和县\",\"value\":8},{\"label\":\"宁晋县\",\"value\":9},{\"label\":\"巨鹿县\",\"value\":10},{\"label\":\"新河县\",\"value\":11},{\"label\":\"广宗县\",\"value\":12},{\"label\":\"平乡县\",\"value\":13},{\"label\":\"威  县\",\"value\":14},{\"label\":\"清河县\",\"value\":15},{\"label\":\"临西县\",\"value\":16},{\"label\":\"南宫市\",\"value\":17},{\"label\":\"沙河市\",\"value\":18}]},{\"label\":\"保定市\",\"value\":5,\"children\":[{\"label\":\"新市区\",\"value\":0},{\"label\":\"北市区\",\"value\":1},{\"label\":\"南市区\",\"value\":2},{\"label\":\"满城县\",\"value\":3},{\"label\":\"清苑县\",\"value\":4},{\"label\":\"涞水县\",\"value\":5},{\"label\":\"阜平县\",\"value\":6},{\"label\":\"徐水县\",\"value\":7},{\"label\":\"定兴县\",\"value\":8},{\"label\":\"唐  县\",\"value\":9},{\"label\":\"高阳县\",\"value\":10},{\"label\":\"容城县\",\"value\":11},{\"label\":\"涞源县\",\"value\":12},{\"label\":\"望都县\",\"value\":13},{\"label\":\"安新县\",\"value\":14},{\"label\":\"易  县\",\"value\":15},{\"label\":\"曲阳县\",\"value\":16},{\"label\":\"蠡  县\",\"value\":17},{\"label\":\"顺平县\",\"value\":18},{\"label\":\"博野\",\"value\":19},{\"label\":\"雄县\",\"value\":20},{\"label\":\"涿州市\",\"value\":21},{\"label\":\"定州市\",\"value\":22},{\"label\":\"安国市\",\"value\":23},{\"label\":\"高碑店市\",\"value\":24},{\"label\":\"雄安新区\",\"value\":25}]},{\"label\":\"张家口\",\"value\":6,\"children\":[{\"label\":\"桥东区\",\"value\":0},{\"label\":\"桥西区\",\"value\":1},{\"label\":\"宣化区\",\"value\":2},{\"label\":\"下花园区\",\"value\":3},{\"label\":\"宣化县\",\"value\":4},{\"label\":\"张北县\",\"value\":5},{\"label\":\"康保县\",\"value\":6},{\"label\":\"沽源县\",\"value\":7},{\"label\":\"尚义县\",\"value\":8},{\"label\":\"蔚  县\",\"value\":9},{\"label\":\"阳原县\",\"value\":10},{\"label\":\"怀安县\",\"value\":11},{\"label\":\"万全县\",\"value\":12},{\"label\":\"怀来县\",\"value\":13},{\"label\":\"涿鹿县\",\"value\":14},{\"label\":\"赤城县\",\"value\":15},{\"label\":\"崇礼县\",\"value\":16}]},{\"label\":\"承德市\",\"value\":7,\"children\":[{\"label\":\"双桥区\",\"value\":0},{\"label\":\"双滦区\",\"value\":1},{\"label\":\"鹰手营子矿区\",\"value\":2},{\"label\":\"承德县\",\"value\":3},{\"label\":\"兴隆县\",\"value\":4},{\"label\":\"平泉县\",\"value\":5},{\"label\":\"滦平县\",\"value\":6},{\"label\":\"隆化县\",\"value\":7},{\"label\":\"丰宁满族自治县\",\"value\":8},{\"label\":\"宽城满族自治县\",\"value\":9},{\"label\":\"围场满族蒙古族自治县\",\"value\":10}]},{\"label\":\"沧州市\",\"value\":8,\"children\":[{\"label\":\"新华区\",\"value\":0},{\"label\":\"运河区\",\"value\":1},{\"label\":\"沧  县\",\"value\":2},{\"label\":\"青  县\",\"value\":3},{\"label\":\"东光县\",\"value\":4},{\"label\":\"海兴县\",\"value\":5},{\"label\":\"盐山县\",\"value\":6},{\"label\":\"肃宁县\",\"value\":7},{\"label\":\"南皮县\",\"value\":8},{\"label\":\"吴桥县\",\"value\":9},{\"label\":\"献  县\",\"value\":10},{\"label\":\"孟村回族自治县\",\"value\":11},{\"label\":\"泊头市\",\"value\":12},{\"label\":\"任丘市\",\"value\":13},{\"label\":\"黄骅市\",\"value\":14},{\"label\":\"河间市\",\"value\":15}]},{\"label\":\"廊坊市\",\"value\":9,\"children\":[{\"label\":\"安次区\",\"value\":0},{\"label\":\"固安县\",\"value\":1},{\"label\":\"永清县\",\"value\":2},{\"label\":\"香河县\",\"value\":3},{\"label\":\"大城县\",\"value\":4},{\"label\":\"文安县\",\"value\":5},{\"label\":\"大厂回族自治县\",\"value\":6},{\"label\":\"霸州市\",\"value\":7},{\"label\":\"三河市\",\"value\":8}]},{\"label\":\"衡水市\",\"value\":10,\"children\":[{\"label\":\"桃城区\",\"value\":0},{\"label\":\"枣强县\",\"value\":1},{\"label\":\"武邑县\",\"value\":2},{\"label\":\"武强县\",\"value\":3},{\"label\":\"饶阳县\",\"value\":4},{\"label\":\"安平县\",\"value\":5},{\"label\":\"故城县\",\"value\":6},{\"label\":\"景  县\",\"value\":7},{\"label\":\"阜城县\",\"value\":8},{\"label\":\"冀州市\",\"value\":9},{\"label\":\"深州市\",\"value\":10}]}]},{\"label\":\"山西省\",\"value\":3,\"children\":[{\"label\":\"太原市\",\"value\":0,\"children\":[{\"label\":\"小店区\",\"value\":0},{\"label\":\"迎泽区\",\"value\":1},{\"label\":\"杏花岭区\",\"value\":2},{\"label\":\"尖草坪区\",\"value\":3},{\"label\":\"万柏林区\",\"value\":4},{\"label\":\"晋源区\",\"value\":5},{\"label\":\"清徐县\",\"value\":6},{\"label\":\"阳曲县\",\"value\":7},{\"label\":\"娄烦县\",\"value\":8},{\"label\":\"古交市\",\"value\":9}]},{\"label\":\"大同市\",\"value\":1,\"children\":[{\"label\":\"城  区\",\"value\":0},{\"label\":\"矿  区\",\"value\":1},{\"label\":\"南郊区\",\"value\":2},{\"label\":\"新荣区\",\"value\":3},{\"label\":\"阳高县\",\"value\":4},{\"label\":\"天镇县\",\"value\":5},{\"label\":\"广灵县\",\"value\":6},{\"label\":\"灵丘县\",\"value\":7},{\"label\":\"浑源县\",\"value\":8},{\"label\":\"左云县\",\"value\":9},{\"label\":\"大同县\",\"value\":10}]},{\"label\":\"阳泉市\",\"value\":2,\"children\":[{\"label\":\"城  区\",\"value\":0},{\"label\":\"矿  区\",\"value\":1},{\"label\":\"郊  区\",\"value\":2},{\"label\":\"平定县\",\"value\":3},{\"label\":\"盂  县\",\"value\":4}]},{\"label\":\"长治市\",\"value\":3,\"children\":[{\"label\":\"城  区\",\"value\":0},{\"label\":\"郊  区\",\"value\":1},{\"label\":\"长治县\",\"value\":2},{\"label\":\"襄垣县\",\"value\":3},{\"label\":\"屯留县\",\"value\":4},{\"label\":\"平顺县\",\"value\":5},{\"label\":\"黎城县\",\"value\":6},{\"label\":\"壶关县\",\"value\":7},{\"label\":\"长子县\",\"value\":8},{\"label\":\"武乡县\",\"value\":9},{\"label\":\"沁  县\",\"value\":10},{\"label\":\"沁源县\",\"value\":11},{\"label\":\"潞城市\",\"value\":12}]},{\"label\":\"晋城市\",\"value\":4,\"children\":[{\"label\":\"城  区\",\"value\":0},{\"label\":\"沁水县\",\"value\":1},{\"label\":\"阳城县\",\"value\":2},{\"label\":\"陵川县\",\"value\":3},{\"label\":\"泽州县\",\"value\":4},{\"label\":\"高平市\",\"value\":5}]},{\"label\":\"朔州市\",\"value\":5,\"children\":[{\"label\":\"朔城区\",\"value\":0},{\"label\":\"平鲁区\",\"value\":1},{\"label\":\"山阴县\",\"value\":2},{\"label\":\"应  县\",\"value\":3},{\"label\":\"右玉县\",\"value\":4},{\"label\":\"怀仁县\",\"value\":5}]},{\"label\":\"忻州市\",\"value\":6,\"children\":[{\"label\":\"忻府区\",\"value\":0},{\"label\":\"原平市\",\"value\":1},{\"label\":\"定襄县\",\"value\":2},{\"label\":\"五台县\",\"value\":3},{\"label\":\"代  县\",\"value\":4},{\"label\":\"繁峙县\",\"value\":5},{\"label\":\"宁武县\",\"value\":6},{\"label\":\"静乐县\",\"value\":7},{\"label\":\"神池县\",\"value\":8},{\"label\":\"五寨县\",\"value\":9},{\"label\":\"岢岚县\",\"value\":10},{\"label\":\"河曲县\",\"value\":11},{\"label\":\"保德县\",\"value\":12},{\"label\":\"偏关县\",\"value\":13}]},{\"label\":\"吕梁市\",\"value\":7,\"children\":[{\"label\":\"离石区\",\"value\":0},{\"label\":\"孝义市\",\"value\":1},{\"label\":\"汾阳市\",\"value\":2},{\"label\":\"文水县\",\"value\":3},{\"label\":\"交城县\",\"value\":4},{\"label\":\"兴  县\",\"value\":5},{\"label\":\"临  县\",\"value\":6},{\"label\":\"柳林县\",\"value\":7},{\"label\":\"石楼县\",\"value\":8},{\"label\":\"岚  县\",\"value\":9},{\"label\":\"方山县\",\"value\":10},{\"label\":\"中阳县\",\"value\":11},{\"label\":\"交口县\",\"value\":12}]},{\"label\":\"晋中市\",\"value\":8,\"children\":[{\"label\":\"榆次市\",\"value\":0},{\"label\":\"介休市\",\"value\":1},{\"label\":\"榆社县\",\"value\":2},{\"label\":\"左权县\",\"value\":3},{\"label\":\"和顺县\",\"value\":4},{\"label\":\"昔阳县\",\"value\":5},{\"label\":\"寿阳县\",\"value\":6},{\"label\":\"太谷县\",\"value\":7},{\"label\":\"祁  县\",\"value\":8},{\"label\":\"平遥县\",\"value\":9},{\"label\":\"灵石县\",\"value\":10}]},{\"label\":\"临汾市\",\"value\":9,\"children\":[{\"label\":\"临汾市\",\"value\":0},{\"label\":\"侯马市\",\"value\":1},{\"label\":\"霍州市\",\"value\":2},{\"label\":\"曲沃县\",\"value\":3},{\"label\":\"翼城县\",\"value\":4},{\"label\":\"襄汾县\",\"value\":5},{\"label\":\"洪洞县\",\"value\":6},{\"label\":\"古  县\",\"value\":7},{\"label\":\"安泽县\",\"value\":8},{\"label\":\"浮山县\",\"value\":9},{\"label\":\"吉  县\",\"value\":10},{\"label\":\"乡宁县\",\"value\":11},{\"label\":\"蒲  县\",\"value\":12},{\"label\":\"大宁县\",\"value\":13},{\"label\":\"永和县\",\"value\":14},{\"label\":\"隰  县\",\"value\":15},{\"label\":\"汾西县\",\"value\":16}]},{\"label\":\"运城市\",\"value\":10,\"children\":[{\"label\":\"运城市\",\"value\":0},{\"label\":\"永济市\",\"value\":1},{\"label\":\"河津市\",\"value\":2},{\"label\":\"芮城县\",\"value\":3},{\"label\":\"临猗县\",\"value\":4},{\"label\":\"万荣县\",\"value\":5},{\"label\":\"新绛县\",\"value\":6},{\"label\":\"稷山县\",\"value\":7},{\"label\":\"闻喜县\",\"value\":8},{\"label\":\"夏  县\",\"value\":9},{\"label\":\"绛  县\",\"value\":10},{\"label\":\"平陆县\",\"value\":11},{\"label\":\"垣曲县\",\"value\":12}]}]},{\"label\":\"内蒙古\",\"value\":4,\"children\":[{\"label\":\"呼和浩特市\",\"value\":0,\"children\":[{\"label\":\"新城区\",\"value\":0},{\"label\":\"回民区\",\"value\":1},{\"label\":\"玉泉区\",\"value\":2},{\"label\":\"郊  区\",\"value\":3},{\"label\":\"土默特左旗\",\"value\":4},{\"label\":\"托克托县\",\"value\":5},{\"label\":\"和林格尔县\",\"value\":6},{\"label\":\"清水河县\",\"value\":7},{\"label\":\"武川县\",\"value\":8}]},{\"label\":\"包头市\",\"value\":1,\"children\":[{\"label\":\"东河区\",\"value\":0},{\"label\":\"昆都伦区\",\"value\":1},{\"label\":\"青山区\",\"value\":2},{\"label\":\"石拐矿区\",\"value\":3},{\"label\":\"白云矿区\",\"value\":4},{\"label\":\"郊  区\",\"value\":5},{\"label\":\"土默特右旗\",\"value\":6},{\"label\":\"固阳县\",\"value\":7},{\"label\":\"达尔罕茂明安联合旗\",\"value\":8}]},{\"label\":\"乌海市\",\"value\":2,\"children\":[{\"label\":\"海勃湾区\",\"value\":0},{\"label\":\"海南区\",\"value\":1},{\"label\":\"乌达区\",\"value\":2}]},{\"label\":\"赤峰市\",\"value\":3,\"children\":[{\"label\":\"红山区\",\"value\":0},{\"label\":\"元宝山区\",\"value\":1},{\"label\":\"松山区\",\"value\":2},{\"label\":\"阿鲁科尔沁旗\",\"value\":3},{\"label\":\"巴林左旗\",\"value\":4},{\"label\":\"巴林右旗\",\"value\":5},{\"label\":\"林西县\",\"value\":6},{\"label\":\"克什克腾旗\",\"value\":7},{\"label\":\"翁牛特旗\",\"value\":8},{\"label\":\"喀喇沁旗\",\"value\":9},{\"label\":\"宁城县\",\"value\":10},{\"label\":\"敖汉旗\",\"value\":11}]},{\"label\":\"呼伦贝尔市\",\"value\":4,\"children\":[{\"label\":\"海拉尔市\",\"value\":0},{\"label\":\"满洲里市\",\"value\":1},{\"label\":\"扎兰屯市\",\"value\":2},{\"label\":\"牙克石市\",\"value\":3},{\"label\":\"根河市\",\"value\":4},{\"label\":\"额尔古纳市\",\"value\":5},{\"label\":\"阿荣旗\",\"value\":6},{\"label\":\"莫力达瓦达斡尔族自治旗\",\"value\":7},{\"label\":\"鄂伦春自治旗\",\"value\":8},{\"label\":\"鄂温克族自治旗\",\"value\":9},{\"label\":\"新巴尔虎右旗\",\"value\":10},{\"label\":\"新巴尔虎左旗\",\"value\":11},{\"label\":\"陈巴尔虎旗\",\"value\":12}]},{\"label\":\"兴安盟\",\"value\":5,\"children\":[{\"label\":\"乌兰浩特市\",\"value\":0},{\"label\":\"阿尔山市\",\"value\":1},{\"label\":\"科尔沁右翼前旗\",\"value\":2},{\"label\":\"科尔沁右翼中旗\",\"value\":3},{\"label\":\"扎赉特旗\",\"value\":4},{\"label\":\"突泉县\",\"value\":5}]},{\"label\":\"通辽市\",\"value\":6,\"children\":[{\"label\":\"科尔沁区\",\"value\":0},{\"label\":\"霍林郭勒市\",\"value\":1},{\"label\":\"科尔沁左翼中旗\",\"value\":2},{\"label\":\"科尔沁左翼后旗\",\"value\":3},{\"label\":\"开鲁县\",\"value\":4},{\"label\":\"库伦旗\",\"value\":5},{\"label\":\"奈曼旗\",\"value\":6},{\"label\":\"扎鲁特旗\",\"value\":7}]},{\"label\":\"锡林郭勒盟\",\"value\":7,\"children\":[{\"label\":\"二连浩特市\",\"value\":0},{\"label\":\"锡林浩特市\",\"value\":1},{\"label\":\"阿巴嘎旗\",\"value\":2},{\"label\":\"苏尼特左旗\",\"value\":3},{\"label\":\"苏尼特右旗\",\"value\":4},{\"label\":\"东乌珠穆沁旗\",\"value\":5},{\"label\":\"西乌珠穆沁旗\",\"value\":6},{\"label\":\"太仆寺旗\",\"value\":7},{\"label\":\"镶黄旗\",\"value\":8},{\"label\":\"正镶白旗\",\"value\":9},{\"label\":\"正蓝旗\",\"value\":10},{\"label\":\"多伦县\",\"value\":11}]},{\"label\":\"乌兰察布盟\",\"value\":8,\"children\":[{\"label\":\"集宁市\",\"value\":0},{\"label\":\"丰镇市\",\"value\":1},{\"label\":\"卓资县\",\"value\":2},{\"label\":\"化德县\",\"value\":3},{\"label\":\"商都县\",\"value\":4},{\"label\":\"兴和县\",\"value\":5},{\"label\":\"凉城县\",\"value\":6},{\"label\":\"察哈尔右翼前旗\",\"value\":7},{\"label\":\"察哈尔右翼中旗\",\"value\":8},{\"label\":\"察哈尔右翼后旗\",\"value\":9},{\"label\":\"四子王旗\",\"value\":10}]},{\"label\":\"伊克昭盟\",\"value\":9,\"children\":[{\"label\":\"东胜市\",\"value\":0},{\"label\":\"达拉特旗\",\"value\":1},{\"label\":\"准格尔旗\",\"value\":2},{\"label\":\"鄂托克前旗\",\"value\":3},{\"label\":\"鄂托克旗\",\"value\":4},{\"label\":\"杭锦旗\",\"value\":5},{\"label\":\"乌审旗\",\"value\":6},{\"label\":\"伊金霍洛旗\",\"value\":7}]},{\"label\":\"巴彦淖尔盟\",\"value\":10,\"children\":[{\"label\":\"临河市\",\"value\":0},{\"label\":\"五原县\",\"value\":1},{\"label\":\"磴口县\",\"value\":2},{\"label\":\"乌拉特前旗\",\"value\":3},{\"label\":\"乌拉特中旗\",\"value\":4},{\"label\":\"乌拉特后旗\",\"value\":5},{\"label\":\"杭锦后旗\",\"value\":6}]},{\"label\":\"阿拉善盟\",\"value\":11,\"children\":[{\"label\":\"阿拉善左旗\",\"value\":0},{\"label\":\"阿拉善右旗\",\"value\":1},{\"label\":\"额济纳旗\",\"value\":2}]}]},{\"label\":\"辽宁省\",\"value\":5,\"children\":[{\"label\":\"沈阳市\",\"value\":0,\"children\":[{\"label\":\"沈河区\",\"value\":0},{\"label\":\"皇姑区\",\"value\":1},{\"label\":\"和平区\",\"value\":2},{\"label\":\"大东区\",\"value\":3},{\"label\":\"铁西区\",\"value\":4},{\"label\":\"苏家屯区\",\"value\":5},{\"label\":\"东陵区\",\"value\":6},{\"label\":\"于洪区\",\"value\":7},{\"label\":\"新民市\",\"value\":8},{\"label\":\"法库县\",\"value\":9},{\"label\":\"辽中县\",\"value\":10},{\"label\":\"康平县\",\"value\":11},{\"label\":\"新城子区\",\"value\":12},{\"label\":\"其他\",\"value\":13}]},{\"label\":\"大连市\",\"value\":1,\"children\":[{\"label\":\"西岗区\",\"value\":0},{\"label\":\"中山区\",\"value\":1},{\"label\":\"沙河口区\",\"value\":2},{\"label\":\"甘井子区\",\"value\":3},{\"label\":\"旅顺口区\",\"value\":4},{\"label\":\"金州区\",\"value\":5},{\"label\":\"瓦房店市\",\"value\":6},{\"label\":\"普兰店市\",\"value\":7},{\"label\":\"庄河市\",\"value\":8},{\"label\":\"长海县\",\"value\":9},{\"label\":\"其他\",\"value\":10}]},{\"label\":\"鞍山市\",\"value\":2,\"children\":[{\"label\":\"铁东区\",\"value\":0},{\"label\":\"铁西区\",\"value\":1},{\"label\":\"立山区\",\"value\":2},{\"label\":\"千山区\",\"value\":3},{\"label\":\"海城市\",\"value\":4},{\"label\":\"台安县\",\"value\":5},{\"label\":\"岫岩满族自治县\",\"value\":6},{\"label\":\"其他\",\"value\":7}]},{\"label\":\"抚顺市\",\"value\":3,\"children\":[{\"label\":\"顺城区\",\"value\":0},{\"label\":\"新抚区\",\"value\":1},{\"label\":\"东洲区\",\"value\":2},{\"label\":\"望花区\",\"value\":3},{\"label\":\"抚顺县\",\"value\":4},{\"label\":\"清原满族自治县\",\"value\":5},{\"label\":\"新宾满族自治县\",\"value\":6},{\"label\":\"其他\",\"value\":7}]},{\"label\":\"本溪市\",\"value\":4,\"children\":[{\"label\":\"平山区\",\"value\":0},{\"label\":\"明山区\",\"value\":1},{\"label\":\"溪湖区\",\"value\":2},{\"label\":\"南芬区\",\"value\":3},{\"label\":\"本溪满族自治县\",\"value\":4},{\"label\":\"桓仁满族自治县\",\"value\":5},{\"label\":\"其他\",\"value\":6}]},{\"label\":\"丹东市\",\"value\":5,\"children\":[{\"label\":\"振兴区\",\"value\":0},{\"label\":\"元宝区\",\"value\":1},{\"label\":\"振安区\",\"value\":2},{\"label\":\"东港市\",\"value\":3},{\"label\":\"凤城市\",\"value\":4},{\"label\":\"宽甸满族自治县\",\"value\":5},{\"label\":\"其他\",\"value\":6}]},{\"label\":\"锦州市\",\"value\":6,\"children\":[{\"label\":\"太和区\",\"value\":0},{\"label\":\"古塔区\",\"value\":1},{\"label\":\"凌河区\",\"value\":2},{\"label\":\"凌海市\",\"value\":3},{\"label\":\"黑山县\",\"value\":4},{\"label\":\"义县\",\"value\":5},{\"label\":\"北宁市\",\"value\":6},{\"label\":\"其他\",\"value\":7}]},{\"label\":\"营口市\",\"value\":7,\"children\":[{\"label\":\"站前区\",\"value\":0},{\"label\":\"西市区\",\"value\":1},{\"label\":\"鲅鱼圈区\",\"value\":2},{\"label\":\"老边区\",\"value\":3},{\"label\":\"大石桥市\",\"value\":4},{\"label\":\"盖州市\",\"value\":5},{\"label\":\"其他\",\"value\":6}]},{\"label\":\"阜新市\",\"value\":8,\"children\":[{\"label\":\"海州区\",\"value\":0},{\"label\":\"新邱区\",\"value\":1},{\"label\":\"太平区\",\"value\":2},{\"label\":\"清河门区\",\"value\":3},{\"label\":\"细河区\",\"value\":4},{\"label\":\"彰武县\",\"value\":5},{\"label\":\"阜新蒙古族自治县\",\"value\":6},{\"label\":\"其他\",\"value\":7}]},{\"label\":\"辽阳市\",\"value\":9,\"children\":[{\"label\":\"白塔区\",\"value\":0},{\"label\":\"文圣区\",\"value\":1},{\"label\":\"宏伟区\",\"value\":2},{\"label\":\"太子河区\",\"value\":3},{\"label\":\"弓长岭区\",\"value\":4},{\"label\":\"灯塔市\",\"value\":5},{\"label\":\"辽阳县\",\"value\":6},{\"label\":\"其他\",\"value\":7}]},{\"label\":\"盘锦\",\"value\":10,\"children\":[{\"label\":\"双台子区\",\"value\":0},{\"label\":\"兴隆台区\",\"value\":1},{\"label\":\"盘山县\",\"value\":2},{\"label\":\"大洼县\",\"value\":3},{\"label\":\"其他\",\"value\":4}]},{\"label\":\"铁岭市\",\"value\":11,\"children\":[{\"label\":\"银州区\",\"value\":0},{\"label\":\"清河区\",\"value\":1},{\"label\":\"调兵山市\",\"value\":2},{\"label\":\"开原市\",\"value\":3},{\"label\":\"铁岭县\",\"value\":4},{\"label\":\"昌图县\",\"value\":5},{\"label\":\"西丰县\",\"value\":6},{\"label\":\"其他\",\"value\":7}]},{\"label\":\"朝阳市\",\"value\":12,\"children\":[{\"label\":\"双塔区\",\"value\":0},{\"label\":\"龙城区\",\"value\":1},{\"label\":\"凌源市\",\"value\":2},{\"label\":\"北票市\",\"value\":3},{\"label\":\"朝阳县\",\"value\":4},{\"label\":\"建平县\",\"value\":5},{\"label\":\"喀喇沁左翼蒙古族自治县\",\"value\":6},{\"label\":\"其他\",\"value\":7}]},{\"label\":\"葫芦岛市\",\"value\":13,\"children\":[{\"label\":\"龙港区\",\"value\":0},{\"label\":\"南票区\",\"value\":1},{\"label\":\"连山区\",\"value\":2},{\"label\":\"兴城市\",\"value\":3},{\"label\":\"绥中县\",\"value\":4},{\"label\":\"建昌县\",\"value\":5},{\"label\":\"其他\",\"value\":6}]},{\"label\":\"其他\",\"value\":14,\"children\":[{\"label\":\"其他\",\"value\":0}]}]},{\"label\":\"吉林省\",\"value\":6,\"children\":[{\"label\":\"长春市\",\"value\":0,\"children\":[{\"label\":\"朝阳区\",\"value\":0},{\"label\":\"宽城区\",\"value\":1},{\"label\":\"二道区\",\"value\":2},{\"label\":\"南关区\",\"value\":3},{\"label\":\"绿园区\",\"value\":4},{\"label\":\"双阳区\",\"value\":5},{\"label\":\"九台市\",\"value\":6},{\"label\":\"榆树市\",\"value\":7},{\"label\":\"德惠市\",\"value\":8},{\"label\":\"农安县\",\"value\":9},{\"label\":\"其他\",\"value\":10}]},{\"label\":\"吉林市\",\"value\":1,\"children\":[{\"label\":\"船营区\",\"value\":0},{\"label\":\"昌邑区\",\"value\":1},{\"label\":\"龙潭区\",\"value\":2},{\"label\":\"丰满区\",\"value\":3},{\"label\":\"舒兰市\",\"value\":4},{\"label\":\"桦甸市\",\"value\":5},{\"label\":\"蛟河市\",\"value\":6},{\"label\":\"磐石市\",\"value\":7},{\"label\":\"永吉县\",\"value\":8},{\"label\":\"其他\",\"value\":9}]},{\"label\":\"四平\",\"value\":2,\"children\":[{\"label\":\"铁西区\",\"value\":0},{\"label\":\"铁东区\",\"value\":1},{\"label\":\"公主岭市\",\"value\":2},{\"label\":\"双辽市\",\"value\":3},{\"label\":\"梨树县\",\"value\":4},{\"label\":\"伊通满族自治县\",\"value\":5},{\"label\":\"其他\",\"value\":6}]},{\"label\":\"辽源市\",\"value\":3,\"children\":[{\"label\":\"龙山区\",\"value\":0},{\"label\":\"西安区\",\"value\":1},{\"label\":\"东辽县\",\"value\":2},{\"label\":\"东丰县\",\"value\":3},{\"label\":\"其他\",\"value\":4}]},{\"label\":\"通化市\",\"value\":4,\"children\":[{\"label\":\"东昌区\",\"value\":0},{\"label\":\"二道江区\",\"value\":1},{\"label\":\"梅河口市\",\"value\":2},{\"label\":\"集安市\",\"value\":3},{\"label\":\"通化县\",\"value\":4},{\"label\":\"辉南县\",\"value\":5},{\"label\":\"柳河县\",\"value\":6},{\"label\":\"其他\",\"value\":7}]},{\"label\":\"白山市\",\"value\":5,\"children\":[{\"label\":\"八道江区\",\"value\":0},{\"label\":\"江源区\",\"value\":1},{\"label\":\"临江市\",\"value\":2},{\"label\":\"靖宇县\",\"value\":3},{\"label\":\"抚松县\",\"value\":4},{\"label\":\"长白朝鲜族自治县\",\"value\":5},{\"label\":\"其他\",\"value\":6}]},{\"label\":\"松原市\",\"value\":6,\"children\":[{\"label\":\"宁江区\",\"value\":0},{\"label\":\"乾安县\",\"value\":1},{\"label\":\"长岭县\",\"value\":2},{\"label\":\"扶余县\",\"value\":3},{\"label\":\"前郭尔罗斯蒙古族自治县\",\"value\":4},{\"label\":\"其他\",\"value\":5}]},{\"label\":\"白城市\",\"value\":7,\"children\":[{\"label\":\"洮北区\",\"value\":0},{\"label\":\"大安市\",\"value\":1},{\"label\":\"洮南市\",\"value\":2},{\"label\":\"镇赉县\",\"value\":3},{\"label\":\"通榆县\",\"value\":4},{\"label\":\"其他\",\"value\":5}]},{\"label\":\"延边朝鲜族自治州\",\"value\":8,\"children\":[{\"label\":\"延吉市\",\"value\":0},{\"label\":\"图们市\",\"value\":1},{\"label\":\"敦化市\",\"value\":2},{\"label\":\"龙井市\",\"value\":3},{\"label\":\"珲春市\",\"value\":4},{\"label\":\"和龙市\",\"value\":5},{\"label\":\"安图县\",\"value\":6},{\"label\":\"汪清县\",\"value\":7},{\"label\":\"其他\",\"value\":8}]},{\"label\":\"其他\",\"value\":9,\"children\":[{\"label\":\"其他\",\"value\":0}]}]},{\"label\":\"黑龙江省\",\"value\":7,\"children\":[{\"label\":\"哈尔滨市\",\"value\":0,\"children\":[{\"label\":\"松北区\",\"value\":0},{\"label\":\"道里区\",\"value\":1},{\"label\":\"南岗区\",\"value\":2},{\"label\":\"平房区\",\"value\":3},{\"label\":\"香坊区\",\"value\":4},{\"label\":\"道外区\",\"value\":5},{\"label\":\"呼兰区\",\"value\":6},{\"label\":\"阿城区\",\"value\":7},{\"label\":\"双城市\",\"value\":8},{\"label\":\"尚志市\",\"value\":9},{\"label\":\"五常市\",\"value\":10},{\"label\":\"宾县\",\"value\":11},{\"label\":\"方正县\",\"value\":12},{\"label\":\"通河县\",\"value\":13},{\"label\":\"巴彦县\",\"value\":14},{\"label\":\"延寿县\",\"value\":15},{\"label\":\"木兰县\",\"value\":16},{\"label\":\"依兰县\",\"value\":17},{\"label\":\"其他\",\"value\":18}]},{\"label\":\"齐齐哈尔市\",\"value\":1,\"children\":[{\"label\":\"龙沙区\",\"value\":0},{\"label\":\"昂昂溪区\",\"value\":1},{\"label\":\"铁锋区\",\"value\":2},{\"label\":\"建华区\",\"value\":3},{\"label\":\"富拉尔基区\",\"value\":4},{\"label\":\"碾子山区\",\"value\":5},{\"label\":\"梅里斯达斡尔族区\",\"value\":6},{\"label\":\"讷河市\",\"value\":7},{\"label\":\"富裕县\",\"value\":8},{\"label\":\"拜泉县\",\"value\":9},{\"label\":\"甘南县\",\"value\":10},{\"label\":\"依安县\",\"value\":11},{\"label\":\"克山县\",\"value\":12},{\"label\":\"泰来县\",\"value\":13},{\"label\":\"克东县\",\"value\":14},{\"label\":\"龙江县\",\"value\":15},{\"label\":\"其他\",\"value\":16}]},{\"label\":\"鹤岗市\",\"value\":2,\"children\":[{\"label\":\"兴山区\",\"value\":0},{\"label\":\"工农区\",\"value\":1},{\"label\":\"南山区\",\"value\":2},{\"label\":\"兴安区\",\"value\":3},{\"label\":\"向阳区\",\"value\":4},{\"label\":\"东山区\",\"value\":5},{\"label\":\"萝北县\",\"value\":6},{\"label\":\"绥滨县\",\"value\":7},{\"label\":\"其他\",\"value\":8}]},{\"label\":\"双鸭山\",\"value\":3,\"children\":[{\"label\":\"尖山区\",\"value\":0},{\"label\":\"岭东区\",\"value\":1},{\"label\":\"四方台区\",\"value\":2},{\"label\":\"宝山区\",\"value\":3},{\"label\":\"集贤县\",\"value\":4},{\"label\":\"宝清县\",\"value\":5},{\"label\":\"友谊县\",\"value\":6},{\"label\":\"饶河县\",\"value\":7},{\"label\":\"其他\",\"value\":8}]},{\"label\":\"鸡西市\",\"value\":4,\"children\":[{\"label\":\"鸡冠区\",\"value\":0},{\"label\":\"恒山区\",\"value\":1},{\"label\":\"城子河区\",\"value\":2},{\"label\":\"滴道区\",\"value\":3},{\"label\":\"梨树区\",\"value\":4},{\"label\":\"麻山区\",\"value\":5},{\"label\":\"密山市\",\"value\":6},{\"label\":\"虎林市\",\"value\":7},{\"label\":\"鸡东县\",\"value\":8},{\"label\":\"其他\",\"value\":9}]},{\"label\":\"大庆市\",\"value\":5,\"children\":[{\"label\":\"萨尔图区\",\"value\":0},{\"label\":\"红岗区\",\"value\":1},{\"label\":\"龙凤区\",\"value\":2},{\"label\":\"让胡路区\",\"value\":3},{\"label\":\"大同区\",\"value\":4},{\"label\":\"林甸县\",\"value\":5},{\"label\":\"肇州县\",\"value\":6},{\"label\":\"肇源县\",\"value\":7},{\"label\":\"杜尔伯特蒙古族自治县\",\"value\":8},{\"label\":\"其他\",\"value\":9}]},{\"label\":\"伊春市\",\"value\":6,\"children\":[{\"label\":\"伊春区\",\"value\":0},{\"label\":\"带岭区\",\"value\":1},{\"label\":\"南岔区\",\"value\":2},{\"label\":\"金山屯区\",\"value\":3},{\"label\":\"西林区\",\"value\":4},{\"label\":\"美溪区\",\"value\":5},{\"label\":\"乌马河区\",\"value\":6},{\"label\":\"翠峦区\",\"value\":7},{\"label\":\"友好区\",\"value\":8},{\"label\":\"上甘岭区\",\"value\":9},{\"label\":\"五营区\",\"value\":10},{\"label\":\"红星区\",\"value\":11},{\"label\":\"新青区\",\"value\":12},{\"label\":\"汤旺河区\",\"value\":13},{\"label\":\"乌伊岭区\",\"value\":14},{\"label\":\"铁力市\",\"value\":15},{\"label\":\"嘉荫县\",\"value\":16},{\"label\":\"其他\",\"value\":17}]},{\"label\":\"牡丹江市\",\"value\":7,\"children\":[{\"label\":\"爱民区\",\"value\":0},{\"label\":\"东安区\",\"value\":1},{\"label\":\"阳明区\",\"value\":2},{\"label\":\"西安区\",\"value\":3},{\"label\":\"绥芬河市\",\"value\":4},{\"label\":\"宁安市\",\"value\":5},{\"label\":\"海林市\",\"value\":6},{\"label\":\"穆棱市\",\"value\":7},{\"label\":\"林口县\",\"value\":8},{\"label\":\"东宁县\",\"value\":9},{\"label\":\"其他\",\"value\":10}]},{\"label\":\"佳木斯市\",\"value\":8,\"children\":[{\"label\":\"向阳区\",\"value\":0},{\"label\":\"前进区\",\"value\":1},{\"label\":\"东风区\",\"value\":2},{\"label\":\"郊区\",\"value\":3},{\"label\":\"同江市\",\"value\":4},{\"label\":\"富锦市\",\"value\":5},{\"label\":\"桦川县\",\"value\":6},{\"label\":\"抚远县\",\"value\":7},{\"label\":\"桦南县\",\"value\":8},{\"label\":\"汤原县\",\"value\":9},{\"label\":\"其他\",\"value\":10}]},{\"label\":\"七台河市\",\"value\":9,\"children\":[{\"label\":\"桃山区\",\"value\":0},{\"label\":\"新兴区\",\"value\":1},{\"label\":\"茄子河区\",\"value\":2},{\"label\":\"勃利县\",\"value\":3},{\"label\":\"其他\",\"value\":4}]},{\"label\":\"黑河市\",\"value\":10,\"children\":[{\"label\":\"爱辉区\",\"value\":0},{\"label\":\"北安市\",\"value\":1},{\"label\":\"五大连池市\",\"value\":2},{\"label\":\"逊克县\",\"value\":3},{\"label\":\"嫩江县\",\"value\":4},{\"label\":\"孙吴县\",\"value\":5},{\"label\":\"其他\",\"value\":6}]},{\"label\":\"绥化市\",\"value\":11,\"children\":[{\"label\":\"北林区\",\"value\":0},{\"label\":\"安达市\",\"value\":1},{\"label\":\"肇东市\",\"value\":2},{\"label\":\"海伦市\",\"value\":3},{\"label\":\"绥棱县\",\"value\":4},{\"label\":\"兰西县\",\"value\":5},{\"label\":\"明水县\",\"value\":6},{\"label\":\"青冈县\",\"value\":7},{\"label\":\"庆安县\",\"value\":8},{\"label\":\"望奎县\",\"value\":9},{\"label\":\"其他\",\"value\":10}]},{\"label\":\"大兴安岭地区\",\"value\":12,\"children\":[{\"label\":\"呼玛县\",\"value\":0},{\"label\":\"塔河县\",\"value\":1},{\"label\":\"漠河县\",\"value\":2},{\"label\":\"大兴安岭辖区\",\"value\":3},{\"label\":\"其他\",\"value\":4}]},{\"label\":\"其他\",\"value\":13,\"children\":[{\"label\":\"其他\",\"value\":0}]}]},{\"label\":\"上海市\",\"value\":8,\"children\":[{\"label\":\"上海市\",\"value\":0,\"children\":[{\"label\":\"黄浦区\",\"value\":0},{\"label\":\"卢湾区\",\"value\":1},{\"label\":\"徐汇区\",\"value\":2},{\"label\":\"长宁区\",\"value\":3},{\"label\":\"静安区\",\"value\":4},{\"label\":\"普陀区\",\"value\":5},{\"label\":\"闸北区\",\"value\":6},{\"label\":\"虹口区\",\"value\":7},{\"label\":\"杨浦区\",\"value\":8},{\"label\":\"宝山区\",\"value\":9},{\"label\":\"闵行区\",\"value\":10},{\"label\":\"嘉定区\",\"value\":11},{\"label\":\"松江区\",\"value\":12},{\"label\":\"金山区\",\"value\":13},{\"label\":\"青浦区\",\"value\":14},{\"label\":\"南汇区\",\"value\":15},{\"label\":\"奉贤区\",\"value\":16},{\"label\":\"浦东新区\",\"value\":17},{\"label\":\"崇明县\",\"value\":18},{\"label\":\"其他\",\"value\":19}]}]},{\"label\":\"江苏省\",\"value\":9,\"children\":[{\"label\":\"南京市\",\"value\":0,\"children\":[{\"label\":\"玄武区\",\"value\":0},{\"label\":\"白下区\",\"value\":1},{\"label\":\"秦淮区\",\"value\":2},{\"label\":\"建邺区\",\"value\":3},{\"label\":\"鼓楼区\",\"value\":4},{\"label\":\"下关区\",\"value\":5},{\"label\":\"栖霞区\",\"value\":6},{\"label\":\"雨花台区\",\"value\":7},{\"label\":\"浦口区\",\"value\":8},{\"label\":\"江宁区\",\"value\":9},{\"label\":\"六合区\",\"value\":10},{\"label\":\"溧水县\",\"value\":11},{\"label\":\"高淳县\",\"value\":12},{\"label\":\"其他\",\"value\":13}]},{\"label\":\"苏州市\",\"value\":1,\"children\":[{\"label\":\"金阊区\",\"value\":0},{\"label\":\"平江区\",\"value\":1},{\"label\":\"沧浪区\",\"value\":2},{\"label\":\"虎丘区\",\"value\":3},{\"label\":\"吴中区\",\"value\":4},{\"label\":\"相城区\",\"value\":5},{\"label\":\"常熟市\",\"value\":6},{\"label\":\"张家港市\",\"value\":7},{\"label\":\"昆山市\",\"value\":8},{\"label\":\"吴江市\",\"value\":9},{\"label\":\"太仓市\",\"value\":10},{\"label\":\"其他\",\"value\":11}]},{\"label\":\"无锡市\",\"value\":2,\"children\":[{\"label\":\"崇安区\",\"value\":0},{\"label\":\"南长区\",\"value\":1},{\"label\":\"北塘区\",\"value\":2},{\"label\":\"滨湖区\",\"value\":3},{\"label\":\"锡山区\",\"value\":4},{\"label\":\"惠山区\",\"value\":5},{\"label\":\"江阴市\",\"value\":6},{\"label\":\"宜兴市\",\"value\":7},{\"label\":\"其他\",\"value\":8}]},{\"label\":\"常州市\",\"value\":3,\"children\":[{\"label\":\"钟楼区\",\"value\":0},{\"label\":\"天宁区\",\"value\":1},{\"label\":\"戚墅堰区\",\"value\":2},{\"label\":\"新北区\",\"value\":3},{\"label\":\"武进区\",\"value\":4},{\"label\":\"金坛市\",\"value\":5},{\"label\":\"溧阳市\",\"value\":6},{\"label\":\"其他\",\"value\":7}]},{\"label\":\"镇江市\",\"value\":4,\"children\":[{\"label\":\"京口区\",\"value\":0},{\"label\":\"润州区\",\"value\":1},{\"label\":\"丹徒区\",\"value\":2},{\"label\":\"丹阳市\",\"value\":3},{\"label\":\"扬中市\",\"value\":4},{\"label\":\"句容市\",\"value\":5},{\"label\":\"其他\",\"value\":6}]},{\"label\":\"南通市\",\"value\":5,\"children\":[{\"label\":\"崇川区\",\"value\":0},{\"label\":\"港闸区\",\"value\":1},{\"label\":\"通州市\",\"value\":2},{\"label\":\"如皋市\",\"value\":3},{\"label\":\"海门市\",\"value\":4},{\"label\":\"启东市\",\"value\":5},{\"label\":\"海安县\",\"value\":6},{\"label\":\"如东县\",\"value\":7},{\"label\":\"其他\",\"value\":8}]},{\"label\":\"泰州市\",\"value\":6,\"children\":[{\"label\":\"海陵区\",\"value\":0},{\"label\":\"高港区\",\"value\":1},{\"label\":\"姜堰市\",\"value\":2},{\"label\":\"泰兴市\",\"value\":3},{\"label\":\"靖江市\",\"value\":4},{\"label\":\"兴化市\",\"value\":5},{\"label\":\"其他\",\"value\":6}]},{\"label\":\"扬州市\",\"value\":7,\"children\":[{\"label\":\"广陵区\",\"value\":0},{\"label\":\"维扬区\",\"value\":1},{\"label\":\"邗江区\",\"value\":2},{\"label\":\"江都市\",\"value\":3},{\"label\":\"仪征市\",\"value\":4},{\"label\":\"高邮市\",\"value\":5},{\"label\":\"宝应县\",\"value\":6},{\"label\":\"其他\",\"value\":7}]},{\"label\":\"盐城市\",\"value\":8,\"children\":[{\"label\":\"亭湖区\",\"value\":0},{\"label\":\"盐都区\",\"value\":1},{\"label\":\"大丰市\",\"value\":2},{\"label\":\"东台市\",\"value\":3},{\"label\":\"建湖县\",\"value\":4},{\"label\":\"射阳县\",\"value\":5},{\"label\":\"阜宁县\",\"value\":6},{\"label\":\"滨海县\",\"value\":7},{\"label\":\"响水县\",\"value\":8},{\"label\":\"其他\",\"value\":9}]},{\"label\":\"连云港市\",\"value\":9,\"children\":[{\"label\":\"新浦区\",\"value\":0},{\"label\":\"海州区\",\"value\":1},{\"label\":\"连云区\",\"value\":2},{\"label\":\"东海县\",\"value\":3},{\"label\":\"灌云县\",\"value\":4},{\"label\":\"赣榆县\",\"value\":5},{\"label\":\"灌南县\",\"value\":6},{\"label\":\"其他\",\"value\":7}]},{\"label\":\"徐州市\",\"value\":10,\"children\":[{\"label\":\"云龙区\",\"value\":0},{\"label\":\"鼓楼区\",\"value\":1},{\"label\":\"九里区\",\"value\":2},{\"label\":\"泉山区\",\"value\":3},{\"label\":\"贾汪区\",\"value\":4},{\"label\":\"邳州市\",\"value\":5},{\"label\":\"新沂市\",\"value\":6},{\"label\":\"铜山县\",\"value\":7},{\"label\":\"睢宁县\",\"value\":8},{\"label\":\"沛县\",\"value\":9},{\"label\":\"丰县\",\"value\":10},{\"label\":\"其他\",\"value\":11}]},{\"label\":\"淮安市\",\"value\":11,\"children\":[{\"label\":\"清河区\",\"value\":0},{\"label\":\"清浦区\",\"value\":1},{\"label\":\"楚州区\",\"value\":2},{\"label\":\"淮阴区\",\"value\":3},{\"label\":\"涟水县\",\"value\":4},{\"label\":\"洪泽县\",\"value\":5},{\"label\":\"金湖县\",\"value\":6},{\"label\":\"盱眙县\",\"value\":7},{\"label\":\"其他\",\"value\":8}]},{\"label\":\"宿迁市\",\"value\":12,\"children\":[{\"label\":\"宿城区\",\"value\":0},{\"label\":\"宿豫区\",\"value\":1},{\"label\":\"沭阳县\",\"value\":2},{\"label\":\"泗阳县\",\"value\":3},{\"label\":\"泗洪县\",\"value\":4},{\"label\":\"其他\",\"value\":5}]},{\"label\":\"其他\",\"value\":13,\"children\":[{\"label\":\"其他\",\"value\":0}]}]},{\"label\":\"浙江省\",\"value\":10,\"children\":[{\"label\":\"杭州市\",\"value\":0,\"children\":[{\"label\":\"拱墅区\",\"value\":0},{\"label\":\"西湖区\",\"value\":1},{\"label\":\"上城区\",\"value\":2},{\"label\":\"下城区\",\"value\":3},{\"label\":\"江干区\",\"value\":4},{\"label\":\"滨江区\",\"value\":5},{\"label\":\"余杭区\",\"value\":6},{\"label\":\"萧山区\",\"value\":7},{\"label\":\"建德市\",\"value\":8},{\"label\":\"富阳市\",\"value\":9},{\"label\":\"临安市\",\"value\":10},{\"label\":\"桐庐县\",\"value\":11},{\"label\":\"淳安县\",\"value\":12},{\"label\":\"其他\",\"value\":13}]},{\"label\":\"宁波市\",\"value\":1,\"children\":[{\"label\":\"海曙区\",\"value\":0},{\"label\":\"江东区\",\"value\":1},{\"label\":\"江北区\",\"value\":2},{\"label\":\"镇海区\",\"value\":3},{\"label\":\"北仑区\",\"value\":4},{\"label\":\"鄞州区\",\"value\":5},{\"label\":\"余姚市\",\"value\":6},{\"label\":\"慈溪市\",\"value\":7},{\"label\":\"奉化市\",\"value\":8},{\"label\":\"宁海县\",\"value\":9},{\"label\":\"象山县\",\"value\":10},{\"label\":\"其他\",\"value\":11}]},{\"label\":\"温州市\",\"value\":2,\"children\":[{\"label\":\"鹿城区\",\"value\":0},{\"label\":\"龙湾区\",\"value\":1},{\"label\":\"瓯海区\",\"value\":2},{\"label\":\"瑞安市\",\"value\":3},{\"label\":\"乐清市\",\"value\":4},{\"label\":\"永嘉县\",\"value\":5},{\"label\":\"洞头县\",\"value\":6},{\"label\":\"平阳县\",\"value\":7},{\"label\":\"苍南县\",\"value\":8},{\"label\":\"文成县\",\"value\":9},{\"label\":\"泰顺县\",\"value\":10},{\"label\":\"其他\",\"value\":11}]},{\"label\":\"嘉兴市\",\"value\":3,\"children\":[{\"label\":\"秀城区\",\"value\":0},{\"label\":\"秀洲区\",\"value\":1},{\"label\":\"海宁市\",\"value\":2},{\"label\":\"平湖市\",\"value\":3},{\"label\":\"桐乡市\",\"value\":4},{\"label\":\"嘉善县\",\"value\":5},{\"label\":\"海盐县\",\"value\":6},{\"label\":\"其他\",\"value\":7}]},{\"label\":\"湖州市\",\"value\":4,\"children\":[{\"label\":\"吴兴区\",\"value\":0},{\"label\":\"南浔区\",\"value\":1},{\"label\":\"长兴县\",\"value\":2},{\"label\":\"德清县\",\"value\":3},{\"label\":\"安吉县\",\"value\":4},{\"label\":\"其他\",\"value\":5}]},{\"label\":\"绍兴市\",\"value\":5,\"children\":[{\"label\":\"越城区\",\"value\":0},{\"label\":\"诸暨市\",\"value\":1},{\"label\":\"上虞市\",\"value\":2},{\"label\":\"嵊州市\",\"value\":3},{\"label\":\"绍兴县\",\"value\":4},{\"label\":\"新昌县\",\"value\":5},{\"label\":\"其他\",\"value\":6}]},{\"label\":\"金华市\",\"value\":6,\"children\":[{\"label\":\"婺城区\",\"value\":0},{\"label\":\"金东区\",\"value\":1},{\"label\":\"兰溪市\",\"value\":2},{\"label\":\"义乌市\",\"value\":3},{\"label\":\"东阳市\",\"value\":4},{\"label\":\"永康市\",\"value\":5},{\"label\":\"武义县\",\"value\":6},{\"label\":\"浦江县\",\"value\":7},{\"label\":\"磐安县\",\"value\":8},{\"label\":\"其他\",\"value\":9}]},{\"label\":\"衢州市\",\"value\":7,\"children\":[{\"label\":\"柯城区\",\"value\":0},{\"label\":\"衢江区\",\"value\":1},{\"label\":\"江山市\",\"value\":2},{\"label\":\"龙游县\",\"value\":3},{\"label\":\"常山县\",\"value\":4},{\"label\":\"开化县\",\"value\":5},{\"label\":\"其他\",\"value\":6}]},{\"label\":\"舟山市\",\"value\":8,\"children\":[{\"label\":\"定海区\",\"value\":0},{\"label\":\"普陀区\",\"value\":1},{\"label\":\"岱山县\",\"value\":2},{\"label\":\"嵊泗县\",\"value\":3},{\"label\":\"其他\",\"value\":4}]},{\"label\":\"台州市\",\"value\":9,\"children\":[{\"label\":\"椒江区\",\"value\":0},{\"label\":\"黄岩区\",\"value\":1},{\"label\":\"路桥区\",\"value\":2},{\"label\":\"临海市\",\"value\":3},{\"label\":\"温岭市\",\"value\":4},{\"label\":\"玉环县\",\"value\":5},{\"label\":\"天台县\",\"value\":6},{\"label\":\"仙居县\",\"value\":7},{\"label\":\"三门县\",\"value\":8},{\"label\":\"其他\",\"value\":9}]},{\"label\":\"丽水市\",\"value\":10,\"children\":[{\"label\":\"莲都区\",\"value\":0},{\"label\":\"龙泉市\",\"value\":1},{\"label\":\"缙云县\",\"value\":2},{\"label\":\"青田县\",\"value\":3},{\"label\":\"云和县\",\"value\":4},{\"label\":\"遂昌县\",\"value\":5},{\"label\":\"松阳县\",\"value\":6},{\"label\":\"庆元县\",\"value\":7},{\"label\":\"景宁畲族自治县\",\"value\":8},{\"label\":\"其他\",\"value\":9}]},{\"label\":\"其他市\",\"value\":11,\"children\":[{\"label\":\"其他\",\"value\":0}]}]},{\"label\":\"安徽省\",\"value\":11,\"children\":[{\"label\":\"合肥市\",\"value\":0,\"children\":[{\"label\":\"庐阳区\",\"value\":0},{\"label\":\"瑶海区\",\"value\":1},{\"label\":\"蜀山区\",\"value\":2},{\"label\":\"包河区\",\"value\":3},{\"label\":\"长丰县\",\"value\":4},{\"label\":\"肥东县\",\"value\":5},{\"label\":\"肥西县\",\"value\":6},{\"label\":\"其他\",\"value\":7}]},{\"label\":\"芜湖市\",\"value\":1,\"children\":[{\"label\":\"镜湖区\",\"value\":0},{\"label\":\"弋江区\",\"value\":1},{\"label\":\"鸠江区\",\"value\":2},{\"label\":\"三山区\",\"value\":3},{\"label\":\"芜湖县\",\"value\":4},{\"label\":\"南陵县\",\"value\":5},{\"label\":\"繁昌县\",\"value\":6},{\"label\":\"其他\",\"value\":7}]},{\"label\":\"蚌埠市\",\"value\":2,\"children\":[{\"label\":\"蚌山区\",\"value\":0},{\"label\":\"龙子湖区\",\"value\":1},{\"label\":\"禹会区\",\"value\":2},{\"label\":\"淮上区\",\"value\":3},{\"label\":\"怀远县\",\"value\":4},{\"label\":\"固镇县\",\"value\":5},{\"label\":\"五河县\",\"value\":6},{\"label\":\"其他\",\"value\":7}]},{\"label\":\"淮南市\",\"value\":3,\"children\":[{\"label\":\"田家庵区\",\"value\":0},{\"label\":\"大通区\",\"value\":1},{\"label\":\"谢家集区\",\"value\":2},{\"label\":\"八公山区\",\"value\":3},{\"label\":\"潘集区\",\"value\":4},{\"label\":\"凤台县\",\"value\":5},{\"label\":\"其他\",\"value\":6}]},{\"label\":\"马鞍山市\",\"value\":4,\"children\":[{\"label\":\"雨山区\",\"value\":0},{\"label\":\"花山区\",\"value\":1},{\"label\":\"金家庄区\",\"value\":2},{\"label\":\"当涂县\",\"value\":3},{\"label\":\"其他\",\"value\":4}]},{\"label\":\"淮北市\",\"value\":5,\"children\":[{\"label\":\"相山区\",\"value\":0},{\"label\":\"杜集区\",\"value\":1},{\"label\":\"烈山区\",\"value\":2},{\"label\":\"濉溪县\",\"value\":3},{\"label\":\"其他\",\"value\":4}]},{\"label\":\"铜陵市\",\"value\":6,\"children\":[{\"label\":\"铜官山区\",\"value\":0},{\"label\":\"狮子山区\",\"value\":1},{\"label\":\"郊区\",\"value\":2},{\"label\":\"铜陵县\",\"value\":3},{\"label\":\"其他\",\"value\":4}]},{\"label\":\"安庆市\",\"value\":7,\"children\":[{\"label\":\"迎江区\",\"value\":0},{\"label\":\"大观区\",\"value\":1},{\"label\":\"宜秀区\",\"value\":2},{\"label\":\"桐城市\",\"value\":3},{\"label\":\"宿松县\",\"value\":4},{\"label\":\"枞阳县\",\"value\":5},{\"label\":\"太湖县\",\"value\":6},{\"label\":\"怀宁县\",\"value\":7},{\"label\":\"岳西县\",\"value\":8},{\"label\":\"望江县\",\"value\":9},{\"label\":\"潜山县\",\"value\":10},{\"label\":\"其他\",\"value\":11}]},{\"label\":\"黄山市\",\"value\":8,\"children\":[{\"label\":\"屯溪区\",\"value\":0},{\"label\":\"黄山区\",\"value\":1},{\"label\":\"徽州区\",\"value\":2},{\"label\":\"休宁县\",\"value\":3},{\"label\":\"歙县\",\"value\":4},{\"label\":\"祁门县\",\"value\":5},{\"label\":\"黟县\",\"value\":6},{\"label\":\"其他\",\"value\":7}]},{\"label\":\"滁州市\",\"value\":9,\"children\":[{\"label\":\"琅琊区\",\"value\":0},{\"label\":\"南谯区\",\"value\":1},{\"label\":\"天长市\",\"value\":2},{\"label\":\"明光市\",\"value\":3},{\"label\":\"全椒县\",\"value\":4},{\"label\":\"来安县\",\"value\":5},{\"label\":\"定远县\",\"value\":6},{\"label\":\"凤阳县\",\"value\":7},{\"label\":\"其他\",\"value\":8}]},{\"label\":\"阜阳市\",\"value\":10,\"children\":[{\"label\":\"颍州区\",\"value\":0},{\"label\":\"颍东区\",\"value\":1},{\"label\":\"颍泉区\",\"value\":2},{\"label\":\"界首市\",\"value\":3},{\"label\":\"临泉县\",\"value\":4},{\"label\":\"颍上县\",\"value\":5},{\"label\":\"阜南县\",\"value\":6},{\"label\":\"太和县\",\"value\":7},{\"label\":\"其他\",\"value\":8}]},{\"label\":\"宿州市\",\"value\":11,\"children\":[{\"label\":\"埇桥区\",\"value\":0},{\"label\":\"萧县\",\"value\":1},{\"label\":\"泗县\",\"value\":2},{\"label\":\"砀山县\",\"value\":3},{\"label\":\"灵璧县\",\"value\":4},{\"label\":\"其他\",\"value\":5}]},{\"label\":\"巢湖市\",\"value\":12,\"children\":[{\"label\":\"居巢区\",\"value\":0},{\"label\":\"含山县\",\"value\":1},{\"label\":\"无为县\",\"value\":2},{\"label\":\"庐江县\",\"value\":3},{\"label\":\"和县\",\"value\":4},{\"label\":\"其他\",\"value\":5}]},{\"label\":\"六安市\",\"value\":13,\"children\":[{\"label\":\"金安区\",\"value\":0},{\"label\":\"裕安区\",\"value\":1},{\"label\":\"寿县\",\"value\":2},{\"label\":\"霍山县\",\"value\":3},{\"label\":\"霍邱县\",\"value\":4},{\"label\":\"舒城县\",\"value\":5},{\"label\":\"金寨县\",\"value\":6},{\"label\":\"其他\",\"value\":7}]},{\"label\":\"亳州市\",\"value\":14,\"children\":[{\"label\":\"谯城区\",\"value\":0},{\"label\":\"利辛县\",\"value\":1},{\"label\":\"涡阳县\",\"value\":2},{\"label\":\"蒙城县\",\"value\":3},{\"label\":\"其他\",\"value\":4}]},{\"label\":\"池州市\",\"value\":15,\"children\":[{\"label\":\"贵池区\",\"value\":0},{\"label\":\"东至县\",\"value\":1},{\"label\":\"石台县\",\"value\":2},{\"label\":\"青阳县\",\"value\":3},{\"label\":\"其他\",\"value\":4}]},{\"label\":\"宣城市\",\"value\":16,\"children\":[{\"label\":\"宣州区\",\"value\":0},{\"label\":\"宁国市\",\"value\":1},{\"label\":\"广德县\",\"value\":2},{\"label\":\"郎溪县\",\"value\":3},{\"label\":\"泾县\",\"value\":4},{\"label\":\"旌德县\",\"value\":5},{\"label\":\"绩溪县\",\"value\":6},{\"label\":\"其他\",\"value\":7}]},{\"label\":\"其他市\",\"value\":17,\"children\":[{\"label\":\"其他\",\"value\":0}]}]},{\"label\":\"福建省\",\"value\":12,\"children\":[{\"label\":\"福州市\",\"value\":0,\"children\":[{\"label\":\"鼓楼区\",\"value\":0},{\"label\":\"台江区\",\"value\":1},{\"label\":\"仓山区\",\"value\":2},{\"label\":\"马尾区\",\"value\":3},{\"label\":\"晋安区\",\"value\":4},{\"label\":\"福清市\",\"value\":5},{\"label\":\"长乐市\",\"value\":6},{\"label\":\"闽侯县\",\"value\":7},{\"label\":\"闽清县\",\"value\":8},{\"label\":\"永泰县\",\"value\":9},{\"label\":\"连江县\",\"value\":10},{\"label\":\"罗源县\",\"value\":11},{\"label\":\"平潭县\",\"value\":12},{\"label\":\"其他\",\"value\":13}]},{\"label\":\"厦门市\",\"value\":1,\"children\":[{\"label\":\"思明区\",\"value\":0},{\"label\":\"海沧区\",\"value\":1},{\"label\":\"湖里区\",\"value\":2},{\"label\":\"集美区\",\"value\":3},{\"label\":\"同安区\",\"value\":4},{\"label\":\"翔安区\",\"value\":5},{\"label\":\"其他\",\"value\":6}]},{\"label\":\"莆田市\",\"value\":2,\"children\":[{\"label\":\"城厢区\",\"value\":0},{\"label\":\"涵江区\",\"value\":1},{\"label\":\"荔城区\",\"value\":2},{\"label\":\"秀屿区\",\"value\":3},{\"label\":\"仙游县\",\"value\":4},{\"label\":\"其他\",\"value\":5}]},{\"label\":\"三明市\",\"value\":3,\"children\":[{\"label\":\"梅列区\",\"value\":0},{\"label\":\"三元区\",\"value\":1},{\"label\":\"永安市\",\"value\":2},{\"label\":\"明溪县\",\"value\":3},{\"label\":\"将乐县\",\"value\":4},{\"label\":\"大田县\",\"value\":5},{\"label\":\"宁化县\",\"value\":6},{\"label\":\"建宁县\",\"value\":7},{\"label\":\"沙县\",\"value\":8},{\"label\":\"尤溪县\",\"value\":9},{\"label\":\"清流县\",\"value\":10},{\"label\":\"泰宁县\",\"value\":11},{\"label\":\"其他\",\"value\":12}]},{\"label\":\"泉州市\",\"value\":4,\"children\":[{\"label\":\"鲤城区\",\"value\":0},{\"label\":\"丰泽区\",\"value\":1},{\"label\":\"洛江区\",\"value\":2},{\"label\":\"泉港区\",\"value\":3},{\"label\":\"石狮市\",\"value\":4},{\"label\":\"晋江市\",\"value\":5},{\"label\":\"南安市\",\"value\":6},{\"label\":\"惠安县\",\"value\":7},{\"label\":\"永春县\",\"value\":8},{\"label\":\"安溪县\",\"value\":9},{\"label\":\"德化县\",\"value\":10},{\"label\":\"金门县\",\"value\":11},{\"label\":\"其他\",\"value\":12}]},{\"label\":\"漳州市\",\"value\":5,\"children\":[{\"label\":\"芗城区\",\"value\":0},{\"label\":\"龙文区\",\"value\":1},{\"label\":\"龙海市\",\"value\":2},{\"label\":\"平和县\",\"value\":3},{\"label\":\"南靖县\",\"value\":4},{\"label\":\"诏安县\",\"value\":5},{\"label\":\"漳浦县\",\"value\":6},{\"label\":\"华安县\",\"value\":7},{\"label\":\"东山县\",\"value\":8},{\"label\":\"长泰县\",\"value\":9},{\"label\":\"云霄县\",\"value\":10},{\"label\":\"其他\",\"value\":11}]},{\"label\":\"南平市\",\"value\":6,\"children\":[{\"label\":\"延平区\",\"value\":0},{\"label\":\"建瓯市\",\"value\":1},{\"label\":\"邵武市\",\"value\":2},{\"label\":\"武夷山市\",\"value\":3},{\"label\":\"建阳市\",\"value\":4},{\"label\":\"松溪县\",\"value\":5},{\"label\":\"光泽县\",\"value\":6},{\"label\":\"顺昌县\",\"value\":7},{\"label\":\"浦城县\",\"value\":8},{\"label\":\"政和县\",\"value\":9},{\"label\":\"其他\",\"value\":10}]},{\"label\":\"龙岩市\",\"value\":7,\"children\":[{\"label\":\"新罗区\",\"value\":0},{\"label\":\"漳平市\",\"value\":1},{\"label\":\"长汀县\",\"value\":2},{\"label\":\"武平县\",\"value\":3},{\"label\":\"上杭县\",\"value\":4},{\"label\":\"永定县\",\"value\":5},{\"label\":\"连城县\",\"value\":6},{\"label\":\"其他\",\"value\":7}]},{\"label\":\"宁德市\",\"value\":8,\"children\":[{\"label\":\"蕉城区\",\"value\":0},{\"label\":\"福安市\",\"value\":1},{\"label\":\"福鼎市\",\"value\":2},{\"label\":\"寿宁县\",\"value\":3},{\"label\":\"霞浦县\",\"value\":4},{\"label\":\"柘荣县\",\"value\":5},{\"label\":\"屏南县\",\"value\":6},{\"label\":\"古田县\",\"value\":7},{\"label\":\"周宁县\",\"value\":8},{\"label\":\"其他\",\"value\":9}]},{\"label\":\"其他\",\"value\":9,\"children\":[{\"label\":\"其他\",\"value\":0}]}]},{\"label\":\"江西省\",\"value\":13,\"children\":[{\"label\":\"南昌市\",\"value\":0,\"children\":[{\"label\":\"东湖区\",\"value\":0},{\"label\":\"西湖区\",\"value\":1},{\"label\":\"青云谱区\",\"value\":2},{\"label\":\"湾里区\",\"value\":3},{\"label\":\"青山湖区\",\"value\":4},{\"label\":\"新建县\",\"value\":5},{\"label\":\"南昌县\",\"value\":6},{\"label\":\"进贤县\",\"value\":7},{\"label\":\"安义县\",\"value\":8},{\"label\":\"其他\",\"value\":9}]},{\"label\":\"景德镇市\",\"value\":1,\"children\":[{\"label\":\"珠山区\",\"value\":0},{\"label\":\"昌江区\",\"value\":1},{\"label\":\"乐平市\",\"value\":2},{\"label\":\"浮梁县\",\"value\":3},{\"label\":\"其他\",\"value\":4}]},{\"label\":\"萍乡市\",\"value\":2,\"children\":[{\"label\":\"安源区\",\"value\":0},{\"label\":\"湘东区\",\"value\":1},{\"label\":\"莲花县\",\"value\":2},{\"label\":\"上栗县\",\"value\":3},{\"label\":\"芦溪县\",\"value\":4},{\"label\":\"其他\",\"value\":5}]},{\"label\":\"九江市\",\"value\":3,\"children\":[{\"label\":\"浔阳区\",\"value\":0},{\"label\":\"庐山区\",\"value\":1},{\"label\":\"瑞昌市\",\"value\":2},{\"label\":\"九江县\",\"value\":3},{\"label\":\"星子县\",\"value\":4},{\"label\":\"武宁县\",\"value\":5},{\"label\":\"彭泽县\",\"value\":6},{\"label\":\"永修县\",\"value\":7},{\"label\":\"修水县\",\"value\":8},{\"label\":\"湖口县\",\"value\":9},{\"label\":\"德安县\",\"value\":10},{\"label\":\"都昌县\",\"value\":11},{\"label\":\"其他\",\"value\":12}]},{\"label\":\"新余市\",\"value\":4,\"children\":[{\"label\":\"渝水区\",\"value\":0},{\"label\":\"分宜县\",\"value\":1},{\"label\":\"其他\",\"value\":2}]},{\"label\":\"鹰潭市\",\"value\":5,\"children\":[{\"label\":\"月湖区\",\"value\":0},{\"label\":\"贵溪市\",\"value\":1},{\"label\":\"余江县\",\"value\":2},{\"label\":\"其他\",\"value\":3}]},{\"label\":\"赣州市\",\"value\":6,\"children\":[{\"label\":\"章贡区\",\"value\":0},{\"label\":\"瑞金市\",\"value\":1},{\"label\":\"南康市\",\"value\":2},{\"label\":\"石城县\",\"value\":3},{\"label\":\"安远县\",\"value\":4},{\"label\":\"赣县\",\"value\":5},{\"label\":\"宁都县\",\"value\":6},{\"label\":\"寻乌县\",\"value\":7},{\"label\":\"兴国县\",\"value\":8},{\"label\":\"定南县\",\"value\":9},{\"label\":\"上犹县\",\"value\":10},{\"label\":\"于都县\",\"value\":11},{\"label\":\"龙南县\",\"value\":12},{\"label\":\"崇义县\",\"value\":13},{\"label\":\"信丰县\",\"value\":14},{\"label\":\"全南县\",\"value\":15},{\"label\":\"大余县\",\"value\":16},{\"label\":\"会昌县\",\"value\":17},{\"label\":\"其他\",\"value\":18}]},{\"label\":\"吉安市\",\"value\":7,\"children\":[{\"label\":\"吉州区\",\"value\":0},{\"label\":\"青原区\",\"value\":1},{\"label\":\"井冈山市\",\"value\":2},{\"label\":\"吉安县\",\"value\":3},{\"label\":\"永丰县\",\"value\":4},{\"label\":\"永新县\",\"value\":5},{\"label\":\"新干县\",\"value\":6},{\"label\":\"泰和县\",\"value\":7},{\"label\":\"峡江县\",\"value\":8},{\"label\":\"遂川县\",\"value\":9},{\"label\":\"安福县\",\"value\":10},{\"label\":\"吉水县\",\"value\":11},{\"label\":\"万安县\",\"value\":12},{\"label\":\"其他\",\"value\":13}]},{\"label\":\"宜春市\",\"value\":8,\"children\":[{\"label\":\"袁州区\",\"value\":0},{\"label\":\"丰城市\",\"value\":1},{\"label\":\"樟树市\",\"value\":2},{\"label\":\"高安市\",\"value\":3},{\"label\":\"铜鼓县\",\"value\":4},{\"label\":\"靖安县\",\"value\":5},{\"label\":\"宜丰县\",\"value\":6},{\"label\":\"奉新县\",\"value\":7},{\"label\":\"万载县\",\"value\":8},{\"label\":\"上高县\",\"value\":9},{\"label\":\"其他\",\"value\":10}]},{\"label\":\"抚州市\",\"value\":9,\"children\":[{\"label\":\"临川区\",\"value\":0},{\"label\":\"南丰县\",\"value\":1},{\"label\":\"乐安县\",\"value\":2},{\"label\":\"金溪县\",\"value\":3},{\"label\":\"南城县\",\"value\":4},{\"label\":\"东乡县\",\"value\":5},{\"label\":\"资溪县\",\"value\":6},{\"label\":\"宜黄县\",\"value\":7},{\"label\":\"广昌县\",\"value\":8},{\"label\":\"黎川县\",\"value\":9},{\"label\":\"崇仁县\",\"value\":10},{\"label\":\"其他\",\"value\":11}]},{\"label\":\"上饶市\",\"value\":10,\"children\":[{\"label\":\"信州区\",\"value\":0},{\"label\":\"德兴市\",\"value\":1},{\"label\":\"上饶县\",\"value\":2},{\"label\":\"广丰县\",\"value\":3},{\"label\":\"鄱阳县\",\"value\":4},{\"label\":\"婺源县\",\"value\":5},{\"label\":\"铅山县\",\"value\":6},{\"label\":\"余干县\",\"value\":7},{\"label\":\"横峰县\",\"value\":8},{\"label\":\"弋阳县\",\"value\":9},{\"label\":\"玉山县\",\"value\":10},{\"label\":\"万年县\",\"value\":11},{\"label\":\"其他\",\"value\":12}]},{\"label\":\"其他\",\"value\":11,\"children\":[{\"label\":\"其他\",\"value\":0}]}]},{\"label\":\"山东省\",\"value\":14,\"children\":[{\"label\":\"济南市\",\"value\":0,\"children\":[{\"label\":\"市中区\",\"value\":0},{\"label\":\"历下区\",\"value\":1},{\"label\":\"天桥区\",\"value\":2},{\"label\":\"槐荫区\",\"value\":3},{\"label\":\"历城区\",\"value\":4},{\"label\":\"长清区\",\"value\":5},{\"label\":\"章丘市\",\"value\":6},{\"label\":\"平阴县\",\"value\":7},{\"label\":\"济阳县\",\"value\":8},{\"label\":\"商河县\",\"value\":9},{\"label\":\"其他\",\"value\":10}]},{\"label\":\"青岛市\",\"value\":1,\"children\":[{\"label\":\"市南区\",\"value\":0},{\"label\":\"市北区\",\"value\":1},{\"label\":\"城阳区\",\"value\":2},{\"label\":\"四方区\",\"value\":3},{\"label\":\"李沧区\",\"value\":4},{\"label\":\"黄岛区\",\"value\":5},{\"label\":\"崂山区\",\"value\":6},{\"label\":\"胶南市\",\"value\":7},{\"label\":\"胶州市\",\"value\":8},{\"label\":\"平度市\",\"value\":9},{\"label\":\"莱西市\",\"value\":10},{\"label\":\"即墨市\",\"value\":11},{\"label\":\"其他\",\"value\":12}]},{\"label\":\"淄博市\",\"value\":2,\"children\":[{\"label\":\"张店区\",\"value\":0},{\"label\":\"临淄区\",\"value\":1},{\"label\":\"淄川区\",\"value\":2},{\"label\":\"博山区\",\"value\":3},{\"label\":\"周村区\",\"value\":4},{\"label\":\"桓台县\",\"value\":5},{\"label\":\"高青县\",\"value\":6},{\"label\":\"沂源县\",\"value\":7},{\"label\":\"其他\",\"value\":8}]},{\"label\":\"枣庄市\",\"value\":3,\"children\":[{\"label\":\"市中区\",\"value\":0},{\"label\":\"山亭区\",\"value\":1},{\"label\":\"峄城区\",\"value\":2},{\"label\":\"台儿庄区\",\"value\":3},{\"label\":\"薛城区\",\"value\":4},{\"label\":\"滕州市\",\"value\":5},{\"label\":\"其他\",\"value\":6}]},{\"label\":\"东营市\",\"value\":4,\"children\":[{\"label\":\"东营区\",\"value\":0},{\"label\":\"河口区\",\"value\":1},{\"label\":\"垦利县\",\"value\":2},{\"label\":\"广饶县\",\"value\":3},{\"label\":\"利津县\",\"value\":4},{\"label\":\"其他\",\"value\":5}]},{\"label\":\"烟台市\",\"value\":5,\"children\":[{\"label\":\"芝罘区\",\"value\":0},{\"label\":\"福山区\",\"value\":1},{\"label\":\"牟平区\",\"value\":2},{\"label\":\"莱山区\",\"value\":3},{\"label\":\"龙口市\",\"value\":4},{\"label\":\"莱阳市\",\"value\":5},{\"label\":\"莱州市\",\"value\":6},{\"label\":\"招远市\",\"value\":7},{\"label\":\"蓬莱市\",\"value\":8},{\"label\":\"栖霞市\",\"value\":9},{\"label\":\"海阳市\",\"value\":10},{\"label\":\"长岛县\",\"value\":11},{\"label\":\"其他\",\"value\":12}]},{\"label\":\"潍坊市\",\"value\":6,\"children\":[{\"label\":\"潍城区\",\"value\":0},{\"label\":\"寒亭区\",\"value\":1},{\"label\":\"坊子区\",\"value\":2},{\"label\":\"奎文区\",\"value\":3},{\"label\":\"青州市\",\"value\":4},{\"label\":\"诸城市\",\"value\":5},{\"label\":\"寿光市\",\"value\":6},{\"label\":\"安丘市\",\"value\":7},{\"label\":\"高密市\",\"value\":8},{\"label\":\"昌邑市\",\"value\":9},{\"label\":\"昌乐县\",\"value\":10},{\"label\":\"临朐县\",\"value\":11},{\"label\":\"其他\",\"value\":12}]},{\"label\":\"济宁市\",\"value\":7,\"children\":[{\"label\":\"市中区\",\"value\":0},{\"label\":\"任城区\",\"value\":1},{\"label\":\"曲阜市\",\"value\":2},{\"label\":\"兖州市\",\"value\":3},{\"label\":\"邹城市\",\"value\":4},{\"label\":\"鱼台县\",\"value\":5},{\"label\":\"金乡县\",\"value\":6},{\"label\":\"嘉祥县\",\"value\":7},{\"label\":\"微山县\",\"value\":8},{\"label\":\"汶上县\",\"value\":9},{\"label\":\"泗水县\",\"value\":10},{\"label\":\"梁山县\",\"value\":11},{\"label\":\"其他\",\"value\":12}]},{\"label\":\"泰安市\",\"value\":8,\"children\":[{\"label\":\"泰山区\",\"value\":0},{\"label\":\"岱岳区\",\"value\":1},{\"label\":\"新泰市\",\"value\":2},{\"label\":\"肥城市\",\"value\":3},{\"label\":\"宁阳县\",\"value\":4},{\"label\":\"东平县\",\"value\":5},{\"label\":\"其他\",\"value\":6}]},{\"label\":\"威海市\",\"value\":9,\"children\":[{\"label\":\"环翠区\",\"value\":0},{\"label\":\"乳山市\",\"value\":1},{\"label\":\"文登市\",\"value\":2},{\"label\":\"荣成市\",\"value\":3},{\"label\":\"其他\",\"value\":4}]},{\"label\":\"日照市\",\"value\":10,\"children\":[{\"label\":\"东港区\",\"value\":0},{\"label\":\"岚山区\",\"value\":1},{\"label\":\"五莲县\",\"value\":2},{\"label\":\"莒县\",\"value\":3},{\"label\":\"其他\",\"value\":4}]},{\"label\":\"莱芜市\",\"value\":11,\"children\":[{\"label\":\"莱城区\",\"value\":0},{\"label\":\"钢城区\",\"value\":1},{\"label\":\"其他\",\"value\":2}]},{\"label\":\"临沂市\",\"value\":12,\"children\":[{\"label\":\"兰山区\",\"value\":0},{\"label\":\"罗庄区\",\"value\":1},{\"label\":\"河东区\",\"value\":2},{\"label\":\"沂南县\",\"value\":3},{\"label\":\"郯城县\",\"value\":4},{\"label\":\"沂水县\",\"value\":5},{\"label\":\"苍山县\",\"value\":6},{\"label\":\"费县\",\"value\":7},{\"label\":\"平邑县\",\"value\":8},{\"label\":\"莒南县\",\"value\":9},{\"label\":\"蒙阴县\",\"value\":10},{\"label\":\"临沭县\",\"value\":11},{\"label\":\"其他\",\"value\":12}]},{\"label\":\"德州市\",\"value\":13,\"children\":[{\"label\":\"德城区\",\"value\":0},{\"label\":\"乐陵市\",\"value\":1},{\"label\":\"禹城市\",\"value\":2},{\"label\":\"陵县\",\"value\":3},{\"label\":\"宁津县\",\"value\":4},{\"label\":\"齐河县\",\"value\":5},{\"label\":\"武城县\",\"value\":6},{\"label\":\"庆云县\",\"value\":7},{\"label\":\"平原县\",\"value\":8},{\"label\":\"夏津县\",\"value\":9},{\"label\":\"临邑县\",\"value\":10},{\"label\":\"其他\",\"value\":11}]},{\"label\":\"聊城市\",\"value\":14,\"children\":[{\"label\":\"东昌府区\",\"value\":0},{\"label\":\"临清市\",\"value\":1},{\"label\":\"高唐县\",\"value\":2},{\"label\":\"阳谷县\",\"value\":3},{\"label\":\"茌平县\",\"value\":4},{\"label\":\"莘县\",\"value\":5},{\"label\":\"东阿县\",\"value\":6},{\"label\":\"冠县\",\"value\":7},{\"label\":\"其他\",\"value\":8}]},{\"label\":\"滨州市\",\"value\":15,\"children\":[{\"label\":\"滨城区\",\"value\":0},{\"label\":\"邹平县\",\"value\":1},{\"label\":\"沾化县\",\"value\":2},{\"label\":\"惠民县\",\"value\":3},{\"label\":\"博兴县\",\"value\":4},{\"label\":\"阳信县\",\"value\":5},{\"label\":\"无棣县\",\"value\":6},{\"label\":\"其他\",\"value\":7}]},{\"label\":\"菏泽市\",\"value\":16,\"children\":[{\"label\":\"牡丹区\",\"value\":0},{\"label\":\"鄄城县\",\"value\":1},{\"label\":\"单县\",\"value\":2},{\"label\":\"郓城县\",\"value\":3},{\"label\":\"曹县\",\"value\":4},{\"label\":\"定陶县\",\"value\":5},{\"label\":\"巨野县\",\"value\":6},{\"label\":\"东明县\",\"value\":7},{\"label\":\"成武县\",\"value\":8},{\"label\":\"其他\",\"value\":9}]},{\"label\":\"其他\",\"value\":17,\"children\":[{\"label\":\"其他\",\"value\":0}]}]},{\"label\":\"河南省\",\"value\":15,\"children\":[{\"label\":\"郑州市\",\"value\":0,\"children\":[{\"label\":\"中原区\",\"value\":0},{\"label\":\"金水区\",\"value\":1},{\"label\":\"二七区\",\"value\":2},{\"label\":\"管城回族区\",\"value\":3},{\"label\":\"上街区\",\"value\":4},{\"label\":\"惠济区\",\"value\":5},{\"label\":\"巩义市\",\"value\":6},{\"label\":\"新郑市\",\"value\":7},{\"label\":\"新密市\",\"value\":8},{\"label\":\"登封市\",\"value\":9},{\"label\":\"荥阳市\",\"value\":10},{\"label\":\"中牟县\",\"value\":11},{\"label\":\"其他\",\"value\":12}]},{\"label\":\"开封市\",\"value\":1,\"children\":[{\"label\":\"鼓楼区\",\"value\":0},{\"label\":\"龙亭区\",\"value\":1},{\"label\":\"顺河回族区\",\"value\":2},{\"label\":\"禹王台区\",\"value\":3},{\"label\":\"金明区\",\"value\":4},{\"label\":\"开封县\",\"value\":5},{\"label\":\"尉氏县\",\"value\":6},{\"label\":\"兰考县\",\"value\":7},{\"label\":\"杞县\",\"value\":8},{\"label\":\"通许县\",\"value\":9},{\"label\":\"其他\",\"value\":10}]},{\"label\":\"洛阳市\",\"value\":2,\"children\":[{\"label\":\"西工区\",\"value\":0},{\"label\":\"老城区\",\"value\":1},{\"label\":\"涧西区\",\"value\":2},{\"label\":\"瀍河回族区\",\"value\":3},{\"label\":\"洛龙区\",\"value\":4},{\"label\":\"吉利区\",\"value\":5},{\"label\":\"偃师市\",\"value\":6},{\"label\":\"孟津县\",\"value\":7},{\"label\":\"汝阳县\",\"value\":8},{\"label\":\"伊川县\",\"value\":9},{\"label\":\"洛宁县\",\"value\":10},{\"label\":\"嵩县\",\"value\":11},{\"label\":\"宜阳县\",\"value\":12},{\"label\":\"新安县\",\"value\":13},{\"label\":\"栾川县\",\"value\":14},{\"label\":\"其他\",\"value\":15}]},{\"label\":\"平顶山市\",\"value\":3,\"children\":[{\"label\":\"新华区\",\"value\":0},{\"label\":\"卫东区\",\"value\":1},{\"label\":\"湛河区\",\"value\":2},{\"label\":\"石龙区\",\"value\":3},{\"label\":\"汝州市\",\"value\":4},{\"label\":\"舞钢市\",\"value\":5},{\"label\":\"宝丰县\",\"value\":6},{\"label\":\"叶县\",\"value\":7},{\"label\":\"郏县\",\"value\":8},{\"label\":\"鲁山县\",\"value\":9},{\"label\":\"其他\",\"value\":10}]},{\"label\":\"安阳市\",\"value\":4,\"children\":[{\"label\":\"北关区\",\"value\":0},{\"label\":\"文峰区\",\"value\":1},{\"label\":\"殷都区\",\"value\":2},{\"label\":\"龙安区\",\"value\":3},{\"label\":\"林州市\",\"value\":4},{\"label\":\"安阳县\",\"value\":5},{\"label\":\"滑县\",\"value\":6},{\"label\":\"内黄县\",\"value\":7},{\"label\":\"汤阴县\",\"value\":8},{\"label\":\"其他\",\"value\":9}]},{\"label\":\"鹤壁市\",\"value\":5,\"children\":[{\"label\":\"淇滨区\",\"value\":0},{\"label\":\"山城区\",\"value\":1},{\"label\":\"鹤山区\",\"value\":2},{\"label\":\"浚县\",\"value\":3},{\"label\":\"淇县\",\"value\":4},{\"label\":\"其他\",\"value\":5}]},{\"label\":\"新乡市\",\"value\":6,\"children\":[{\"label\":\"卫滨区\",\"value\":0},{\"label\":\"红旗区\",\"value\":1},{\"label\":\"凤泉区\",\"value\":2},{\"label\":\"牧野区\",\"value\":3},{\"label\":\"卫辉市\",\"value\":4},{\"label\":\"辉县市\",\"value\":5},{\"label\":\"新乡县\",\"value\":6},{\"label\":\"获嘉县\",\"value\":7},{\"label\":\"原阳县\",\"value\":8},{\"label\":\"长垣县\",\"value\":9},{\"label\":\"封丘县\",\"value\":10},{\"label\":\"延津县\",\"value\":11},{\"label\":\"其他\",\"value\":12}]},{\"label\":\"焦作市\",\"value\":7,\"children\":[{\"label\":\"解放区\",\"value\":0},{\"label\":\"中站区\",\"value\":1},{\"label\":\"马村区\",\"value\":2},{\"label\":\"山阳区\",\"value\":3},{\"label\":\"沁阳市\",\"value\":4},{\"label\":\"孟州市\",\"value\":5},{\"label\":\"修武县\",\"value\":6},{\"label\":\"温县\",\"value\":7},{\"label\":\"武陟县\",\"value\":8},{\"label\":\"博爱县\",\"value\":9},{\"label\":\"其他\",\"value\":10}]},{\"label\":\"濮阳市\",\"value\":8,\"children\":[{\"label\":\"华龙区\",\"value\":0},{\"label\":\"濮阳县\",\"value\":1},{\"label\":\"南乐县\",\"value\":2},{\"label\":\"台前县\",\"value\":3},{\"label\":\"清丰县\",\"value\":4},{\"label\":\"范县\",\"value\":5},{\"label\":\"其他\",\"value\":6}]},{\"label\":\"许昌市\",\"value\":9,\"children\":[{\"label\":\"魏都区\",\"value\":0},{\"label\":\"禹州市\",\"value\":1},{\"label\":\"长葛市\",\"value\":2},{\"label\":\"许昌县\",\"value\":3},{\"label\":\"鄢陵县\",\"value\":4},{\"label\":\"襄城县\",\"value\":5},{\"label\":\"其他\",\"value\":6}]},{\"label\":\"漯河市\",\"value\":10,\"children\":[{\"label\":\"源汇区\",\"value\":0},{\"label\":\"郾城区\",\"value\":1},{\"label\":\"召陵区\",\"value\":2},{\"label\":\"临颍县\",\"value\":3},{\"label\":\"舞阳县\",\"value\":4},{\"label\":\"其他\",\"value\":5}]},{\"label\":\"三门峡市\",\"value\":11,\"children\":[{\"label\":\"湖滨区\",\"value\":0},{\"label\":\"义马市\",\"value\":1},{\"label\":\"灵宝市\",\"value\":2},{\"label\":\"渑池县\",\"value\":3},{\"label\":\"卢氏县\",\"value\":4},{\"label\":\"陕县\",\"value\":5},{\"label\":\"其他\",\"value\":6}]},{\"label\":\"南阳市\",\"value\":12,\"children\":[{\"label\":\"卧龙区\",\"value\":0},{\"label\":\"宛城区\",\"value\":1},{\"label\":\"邓州市\",\"value\":2},{\"label\":\"桐柏县\",\"value\":3},{\"label\":\"方城县\",\"value\":4},{\"label\":\"淅川县\",\"value\":5},{\"label\":\"镇平县\",\"value\":6},{\"label\":\"唐河县\",\"value\":7},{\"label\":\"南召县\",\"value\":8},{\"label\":\"内乡县\",\"value\":9},{\"label\":\"新野县\",\"value\":10},{\"label\":\"社旗县\",\"value\":11},{\"label\":\"西峡县\",\"value\":12},{\"label\":\"其他\",\"value\":13}]},{\"label\":\"商丘市\",\"value\":13,\"children\":[{\"label\":\"梁园区\",\"value\":0},{\"label\":\"睢阳区\",\"value\":1},{\"label\":\"永城市\",\"value\":2},{\"label\":\"宁陵县\",\"value\":3},{\"label\":\"虞城县\",\"value\":4},{\"label\":\"民权县\",\"value\":5},{\"label\":\"夏邑县\",\"value\":6},{\"label\":\"柘城县\",\"value\":7},{\"label\":\"睢县\",\"value\":8},{\"label\":\"其他\",\"value\":9}]},{\"label\":\"信阳市\",\"value\":14,\"children\":[{\"label\":\"浉河区\",\"value\":0},{\"label\":\"平桥区\",\"value\":1},{\"label\":\"潢川县\",\"value\":2},{\"label\":\"淮滨县\",\"value\":3},{\"label\":\"息县\",\"value\":4},{\"label\":\"新县\",\"value\":5},{\"label\":\"商城县\",\"value\":6},{\"label\":\"固始县\",\"value\":7},{\"label\":\"罗山县\",\"value\":8},{\"label\":\"光山县\",\"value\":9},{\"label\":\"其他\",\"value\":10}]},{\"label\":\"周口市\",\"value\":15,\"children\":[{\"label\":\"川汇区\",\"value\":0},{\"label\":\"项城市\",\"value\":1},{\"label\":\"商水县\",\"value\":2},{\"label\":\"淮阳县\",\"value\":3},{\"label\":\"太康县\",\"value\":4},{\"label\":\"鹿邑县\",\"value\":5},{\"label\":\"西华县\",\"value\":6},{\"label\":\"扶沟县\",\"value\":7},{\"label\":\"沈丘县\",\"value\":8},{\"label\":\"郸城县\",\"value\":9},{\"label\":\"其他\",\"value\":10}]},{\"label\":\"驻马店市\",\"value\":16,\"children\":[{\"label\":\"驿城区\",\"value\":0},{\"label\":\"确山县\",\"value\":1},{\"label\":\"新蔡县\",\"value\":2},{\"label\":\"上蔡县\",\"value\":3},{\"label\":\"西平县\",\"value\":4},{\"label\":\"泌阳县\",\"value\":5},{\"label\":\"平舆县\",\"value\":6},{\"label\":\"汝南县\",\"value\":7},{\"label\":\"遂平县\",\"value\":8},{\"label\":\"正阳县\",\"value\":9},{\"label\":\"其他\",\"value\":10}]},{\"label\":\"焦作市\",\"value\":17,\"children\":[{\"label\":\"济源市\",\"value\":0},{\"label\":\"其他\",\"value\":1}]},{\"label\":\"其他\",\"value\":18,\"children\":[{\"label\":\"其他\",\"value\":0}]}]},{\"label\":\"湖北省\",\"value\":16,\"children\":[{\"label\":\"武汉市\",\"value\":0,\"children\":[{\"label\":\"江岸区\",\"value\":0},{\"label\":\"武昌区\",\"value\":1},{\"label\":\"江汉区\",\"value\":2},{\"label\":\"硚口区\",\"value\":3},{\"label\":\"汉阳区\",\"value\":4},{\"label\":\"青山区\",\"value\":5},{\"label\":\"洪山区\",\"value\":6},{\"label\":\"东西湖区\",\"value\":7},{\"label\":\"汉南区\",\"value\":8},{\"label\":\"蔡甸区\",\"value\":9},{\"label\":\"江夏区\",\"value\":10},{\"label\":\"黄陂区\",\"value\":11},{\"label\":\"新洲区\",\"value\":12},{\"label\":\"其他\",\"value\":13}]},{\"label\":\"黄石市\",\"value\":1,\"children\":[{\"label\":\"黄石港区\",\"value\":0},{\"label\":\"西塞山区\",\"value\":1},{\"label\":\"下陆区\",\"value\":2},{\"label\":\"铁山区\",\"value\":3},{\"label\":\"大冶市\",\"value\":4},{\"label\":\"阳新县\",\"value\":5},{\"label\":\"其他\",\"value\":6}]},{\"label\":\"十堰市\",\"value\":2,\"children\":[{\"label\":\"张湾区\",\"value\":0},{\"label\":\"茅箭区\",\"value\":1},{\"label\":\"丹江口市\",\"value\":2},{\"label\":\"郧县\",\"value\":3},{\"label\":\"竹山县\",\"value\":4},{\"label\":\"房县\",\"value\":5},{\"label\":\"郧西县\",\"value\":6},{\"label\":\"竹溪县\",\"value\":7},{\"label\":\"其他\",\"value\":8}]},{\"label\":\"荆州市\",\"value\":3,\"children\":[{\"label\":\"沙市区\",\"value\":0},{\"label\":\"荆州区\",\"value\":1},{\"label\":\"洪湖市\",\"value\":2},{\"label\":\"石首市\",\"value\":3},{\"label\":\"松滋市\",\"value\":4},{\"label\":\"监利县\",\"value\":5},{\"label\":\"公安县\",\"value\":6},{\"label\":\"江陵县\",\"value\":7},{\"label\":\"其他\",\"value\":8}]},{\"label\":\"宜昌市\",\"value\":4,\"children\":[{\"label\":\"西陵区\",\"value\":0},{\"label\":\"伍家岗区\",\"value\":1},{\"label\":\"点军区\",\"value\":2},{\"label\":\"猇亭区\",\"value\":3},{\"label\":\"夷陵区\",\"value\":4},{\"label\":\"宜都市\",\"value\":5},{\"label\":\"当阳市\",\"value\":6},{\"label\":\"枝江市\",\"value\":7},{\"label\":\"秭归县\",\"value\":8},{\"label\":\"远安县\",\"value\":9},{\"label\":\"兴山县\",\"value\":10},{\"label\":\"五峰土家族自治县\",\"value\":11},{\"label\":\"长阳土家族自治县\",\"value\":12},{\"label\":\"其他\",\"value\":13}]},{\"label\":\"襄樊市\",\"value\":5,\"children\":[{\"label\":\"襄城区\",\"value\":0},{\"label\":\"樊城区\",\"value\":1},{\"label\":\"襄阳区\",\"value\":2},{\"label\":\"老河口市\",\"value\":3},{\"label\":\"枣阳市\",\"value\":4},{\"label\":\"宜城市\",\"value\":5},{\"label\":\"南漳县\",\"value\":6},{\"label\":\"谷城县\",\"value\":7},{\"label\":\"保康县\",\"value\":8},{\"label\":\"其他\",\"value\":9}]},{\"label\":\"鄂州市\",\"value\":6,\"children\":[{\"label\":\"鄂城区\",\"value\":0},{\"label\":\"华容区\",\"value\":1},{\"label\":\"梁子湖区\",\"value\":2},{\"label\":\"其他\",\"value\":3}]},{\"label\":\"荆门市\",\"value\":7,\"children\":[{\"label\":\"东宝区\",\"value\":0},{\"label\":\"掇刀区\",\"value\":1},{\"label\":\"钟祥市\",\"value\":2},{\"label\":\"京山县\",\"value\":3},{\"label\":\"沙洋县\",\"value\":4},{\"label\":\"其他\",\"value\":5}]},{\"label\":\"孝感市\",\"value\":8,\"children\":[{\"label\":\"孝南区\",\"value\":0},{\"label\":\"应城市\",\"value\":1},{\"label\":\"安陆市\",\"value\":2},{\"label\":\"汉川市\",\"value\":3},{\"label\":\"云梦县\",\"value\":4},{\"label\":\"大悟县\",\"value\":5},{\"label\":\"孝昌县\",\"value\":6},{\"label\":\"其他\",\"value\":7}]},{\"label\":\"黄冈市\",\"value\":9,\"children\":[{\"label\":\"黄州区\",\"value\":0},{\"label\":\"麻城市\",\"value\":1},{\"label\":\"武穴市\",\"value\":2},{\"label\":\"红安县\",\"value\":3},{\"label\":\"罗田县\",\"value\":4},{\"label\":\"浠水县\",\"value\":5},{\"label\":\"蕲春县\",\"value\":6},{\"label\":\"黄梅县\",\"value\":7},{\"label\":\"英山县\",\"value\":8},{\"label\":\"团风县\",\"value\":9},{\"label\":\"其他\",\"value\":10}]},{\"label\":\"咸宁市\",\"value\":10,\"children\":[{\"label\":\"咸安区\",\"value\":0},{\"label\":\"赤壁市\",\"value\":1},{\"label\":\"嘉鱼县\",\"value\":2},{\"label\":\"通山县\",\"value\":3},{\"label\":\"崇阳县\",\"value\":4},{\"label\":\"通城县\",\"value\":5},{\"label\":\"其他\",\"value\":6}]},{\"label\":\"随州市\",\"value\":11,\"children\":[{\"label\":\"曾都区\",\"value\":0},{\"label\":\"广水市\",\"value\":1},{\"label\":\"其他\",\"value\":2}]},{\"label\":\"恩施土家族苗族自治州\",\"value\":12,\"children\":[{\"label\":\"恩施市\",\"value\":0},{\"label\":\"利川市\",\"value\":1},{\"label\":\"建始县\",\"value\":2},{\"label\":\"来凤县\",\"value\":3},{\"label\":\"巴东县\",\"value\":4},{\"label\":\"鹤峰县\",\"value\":5},{\"label\":\"宣恩县\",\"value\":6},{\"label\":\"咸丰县\",\"value\":7},{\"label\":\"其他\",\"value\":8}]},{\"label\":\"仙桃市\",\"value\":13,\"children\":[{\"label\":\"仙桃\",\"value\":0}]},{\"label\":\"天门市\",\"value\":14,\"children\":[{\"label\":\"天门\",\"value\":0}]},{\"label\":\"潜江市\",\"value\":15,\"children\":[{\"label\":\"潜江\",\"value\":0}]},{\"label\":\"神农架林区\",\"value\":16,\"children\":[{\"label\":\"神农架林区\",\"value\":0}]},{\"label\":\"其他\",\"value\":17,\"children\":[{\"label\":\"其他\",\"value\":0}]}]},{\"label\":\"湖南省\",\"value\":17,\"children\":[{\"label\":\"长沙市\",\"value\":0,\"children\":[{\"label\":\"岳麓区\",\"value\":0},{\"label\":\"芙蓉区\",\"value\":1},{\"label\":\"天心区\",\"value\":2},{\"label\":\"开福区\",\"value\":3},{\"label\":\"雨花区\",\"value\":4},{\"label\":\"浏阳市\",\"value\":5},{\"label\":\"长沙县\",\"value\":6},{\"label\":\"望城县\",\"value\":7},{\"label\":\"宁乡县\",\"value\":8},{\"label\":\"其他\",\"value\":9}]},{\"label\":\"株洲市\",\"value\":1,\"children\":[{\"label\":\"天元区\",\"value\":0},{\"label\":\"荷塘区\",\"value\":1},{\"label\":\"芦淞区\",\"value\":2},{\"label\":\"石峰区\",\"value\":3},{\"label\":\"醴陵市\",\"value\":4},{\"label\":\"株洲县\",\"value\":5},{\"label\":\"炎陵县\",\"value\":6},{\"label\":\"茶陵县\",\"value\":7},{\"label\":\"攸县\",\"value\":8},{\"label\":\"其他\",\"value\":9}]},{\"label\":\"湘潭市\",\"value\":2,\"children\":[{\"label\":\"岳塘区\",\"value\":0},{\"label\":\"雨湖区\",\"value\":1},{\"label\":\"湘乡市\",\"value\":2},{\"label\":\"韶山市\",\"value\":3},{\"label\":\"湘潭县\",\"value\":4},{\"label\":\"其他\",\"value\":5}]},{\"label\":\"衡阳市\",\"value\":3,\"children\":[{\"label\":\"雁峰区\",\"value\":0},{\"label\":\"珠晖区\",\"value\":1},{\"label\":\"石鼓区\",\"value\":2},{\"label\":\"蒸湘区\",\"value\":3},{\"label\":\"南岳区\",\"value\":4},{\"label\":\"耒阳市\",\"value\":5},{\"label\":\"常宁市\",\"value\":6},{\"label\":\"衡阳县\",\"value\":7},{\"label\":\"衡东县\",\"value\":8},{\"label\":\"衡山县\",\"value\":9},{\"label\":\"衡南县\",\"value\":10},{\"label\":\"祁东县\",\"value\":11},{\"label\":\"其他\",\"value\":12}]},{\"label\":\"邵阳市\",\"value\":4,\"children\":[{\"label\":\"双清区\",\"value\":0},{\"label\":\"大祥区\",\"value\":1},{\"label\":\"北塔区\",\"value\":2},{\"label\":\"武冈市\",\"value\":3},{\"label\":\"邵东县\",\"value\":4},{\"label\":\"洞口县\",\"value\":5},{\"label\":\"新邵县\",\"value\":6},{\"label\":\"绥宁县\",\"value\":7},{\"label\":\"新宁县\",\"value\":8},{\"label\":\"邵阳县\",\"value\":9},{\"label\":\"隆回县\",\"value\":10},{\"label\":\"城步苗族自治县\",\"value\":11},{\"label\":\"其他\",\"value\":12}]},{\"label\":\"岳阳市\",\"value\":5,\"children\":[{\"label\":\"岳阳楼区\",\"value\":0},{\"label\":\"云溪区\",\"value\":1},{\"label\":\"君山区\",\"value\":2},{\"label\":\"临湘市\",\"value\":3},{\"label\":\"汨罗市\",\"value\":4},{\"label\":\"岳阳县\",\"value\":5},{\"label\":\"湘阴县\",\"value\":6},{\"label\":\"平江县\",\"value\":7},{\"label\":\"华容县\",\"value\":8},{\"label\":\"其他\",\"value\":9}]},{\"label\":\"常德市\",\"value\":6,\"children\":[{\"label\":\"武陵区\",\"value\":0},{\"label\":\"鼎城区\",\"value\":1},{\"label\":\"津市市\",\"value\":2},{\"label\":\"澧县\",\"value\":3},{\"label\":\"临澧县\",\"value\":4},{\"label\":\"桃源县\",\"value\":5},{\"label\":\"汉寿县\",\"value\":6},{\"label\":\"安乡县\",\"value\":7},{\"label\":\"石门县\",\"value\":8},{\"label\":\"其他\",\"value\":9}]},{\"label\":\"张家界市\",\"value\":7,\"children\":[{\"label\":\"永定区\",\"value\":0},{\"label\":\"武陵源区\",\"value\":1},{\"label\":\"慈利县\",\"value\":2},{\"label\":\"桑植县\",\"value\":3},{\"label\":\"其他\",\"value\":4}]},{\"label\":\"益阳市\",\"value\":8,\"children\":[{\"label\":\"赫山区\",\"value\":0},{\"label\":\"资阳区\",\"value\":1},{\"label\":\"沅江市\",\"value\":2},{\"label\":\"桃江县\",\"value\":3},{\"label\":\"南县\",\"value\":4},{\"label\":\"安化县\",\"value\":5},{\"label\":\"其他\",\"value\":6}]},{\"label\":\"郴州市\",\"value\":9,\"children\":[{\"label\":\"北湖区\",\"value\":0},{\"label\":\"苏仙区\",\"value\":1},{\"label\":\"资兴市\",\"value\":2},{\"label\":\"宜章县\",\"value\":3},{\"label\":\"汝城县\",\"value\":4},{\"label\":\"安仁县\",\"value\":5},{\"label\":\"嘉禾县\",\"value\":6},{\"label\":\"临武县\",\"value\":7},{\"label\":\"桂东县\",\"value\":8},{\"label\":\"永兴县\",\"value\":9},{\"label\":\"桂阳县\",\"value\":10},{\"label\":\"其他\",\"value\":11}]},{\"label\":\"永州市\",\"value\":10,\"children\":[{\"label\":\"冷水滩区\",\"value\":0},{\"label\":\"零陵区\",\"value\":1},{\"label\":\"祁阳县\",\"value\":2},{\"label\":\"蓝山县\",\"value\":3},{\"label\":\"宁远县\",\"value\":4},{\"label\":\"新田县\",\"value\":5},{\"label\":\"东安县\",\"value\":6},{\"label\":\"江永县\",\"value\":7},{\"label\":\"道县\",\"value\":8},{\"label\":\"双牌县\",\"value\":9},{\"label\":\"江华瑶族自治县\",\"value\":10},{\"label\":\"其他\",\"value\":11}]},{\"label\":\"怀化市\",\"value\":11,\"children\":[{\"label\":\"鹤城区\",\"value\":0},{\"label\":\"洪江市\",\"value\":1},{\"label\":\"会同县\",\"value\":2},{\"label\":\"沅陵县\",\"value\":3},{\"label\":\"辰溪县\",\"value\":4},{\"label\":\"溆浦县\",\"value\":5},{\"label\":\"中方县\",\"value\":6},{\"label\":\"新晃侗族自治县\",\"value\":7},{\"label\":\"芷江侗族自治县\",\"value\":8},{\"label\":\"通道侗族自治县\",\"value\":9},{\"label\":\"靖州苗族侗族自治县\",\"value\":10},{\"label\":\"麻阳苗族自治县\",\"value\":11},{\"label\":\"其他\",\"value\":12}]},{\"label\":\"娄底市\",\"value\":12,\"children\":[{\"label\":\"娄星区\",\"value\":0},{\"label\":\"冷水江市\",\"value\":1},{\"label\":\"涟源市\",\"value\":2},{\"label\":\"新化县\",\"value\":3},{\"label\":\"双峰县\",\"value\":4},{\"label\":\"其他\",\"value\":5}]},{\"label\":\"湘西土家族苗族自治州\",\"value\":13,\"children\":[{\"label\":\"吉首市\",\"value\":0},{\"label\":\"古丈县\",\"value\":1},{\"label\":\"龙山县\",\"value\":2},{\"label\":\"永顺县\",\"value\":3},{\"label\":\"凤凰县\",\"value\":4},{\"label\":\"泸溪县\",\"value\":5},{\"label\":\"保靖县\",\"value\":6},{\"label\":\"花垣县\",\"value\":7},{\"label\":\"其他\",\"value\":8}]},{\"label\":\"其他\",\"value\":14,\"children\":[{\"label\":\"其他\",\"value\":0}]}]},{\"label\":\"广东省\",\"value\":18,\"children\":[{\"label\":\"广州市\",\"value\":0,\"children\":[{\"label\":\"越秀区\",\"value\":0},{\"label\":\"荔湾区\",\"value\":1},{\"label\":\"海珠区\",\"value\":2},{\"label\":\"天河区\",\"value\":3},{\"label\":\"白云区\",\"value\":4},{\"label\":\"黄埔区\",\"value\":5},{\"label\":\"番禺区\",\"value\":6},{\"label\":\"花都区\",\"value\":7},{\"label\":\"南沙区\",\"value\":8},{\"label\":\"萝岗区\",\"value\":9},{\"label\":\"增城市\",\"value\":10},{\"label\":\"从化市\",\"value\":11},{\"label\":\"其他\",\"value\":12}]},{\"label\":\"深圳市\",\"value\":1,\"children\":[{\"label\":\"福田区\",\"value\":0},{\"label\":\"罗湖区\",\"value\":1},{\"label\":\"南山区\",\"value\":2},{\"label\":\"宝安区\",\"value\":3},{\"label\":\"龙岗区\",\"value\":4},{\"label\":\"盐田区\",\"value\":5},{\"label\":\"其他\",\"value\":6}]},{\"label\":\"东莞市\",\"value\":2,\"children\":[{\"label\":\"莞城\",\"value\":0},{\"label\":\"常平\",\"value\":1},{\"label\":\"塘厦\",\"value\":2},{\"label\":\"塘厦\",\"value\":3},{\"label\":\"塘厦\",\"value\":4},{\"label\":\"其他\",\"value\":5}]},{\"label\":\"中山市\",\"value\":3,\"children\":[{\"label\":\"中山\",\"value\":0}]},{\"label\":\"潮州市\",\"value\":4,\"children\":[{\"label\":\"湘桥区\",\"value\":0},{\"label\":\"潮安县\",\"value\":1},{\"label\":\"饶平县\",\"value\":2},{\"label\":\"其他\",\"value\":3}]},{\"label\":\"揭阳市\",\"value\":5,\"children\":[{\"label\":\"榕城区\",\"value\":0},{\"label\":\"揭东县\",\"value\":1},{\"label\":\"揭西县\",\"value\":2},{\"label\":\"惠来县\",\"value\":3},{\"label\":\"普宁市\",\"value\":4},{\"label\":\"其他\",\"value\":5}]},{\"label\":\"云浮市\",\"value\":6,\"children\":[{\"label\":\"云城区\",\"value\":0},{\"label\":\"新兴县\",\"value\":1},{\"label\":\"郁南县\",\"value\":2},{\"label\":\"云安县\",\"value\":3},{\"label\":\"罗定市\",\"value\":4},{\"label\":\"其他\",\"value\":5}]},{\"label\":\"珠海市\",\"value\":7,\"children\":[{\"label\":\"香洲区\",\"value\":0},{\"label\":\"斗门区\",\"value\":1},{\"label\":\"金湾区\",\"value\":2},{\"label\":\"其他\",\"value\":3}]},{\"label\":\"汕头市\",\"value\":8,\"children\":[{\"label\":\"金平区\",\"value\":0},{\"label\":\"濠江区\",\"value\":1},{\"label\":\"龙湖区\",\"value\":2},{\"label\":\"潮阳区\",\"value\":3},{\"label\":\"潮南区\",\"value\":4},{\"label\":\"澄海区\",\"value\":5},{\"label\":\"南澳县\",\"value\":6},{\"label\":\"其他\",\"value\":7}]},{\"label\":\"韶关市\",\"value\":9,\"children\":[{\"label\":\"浈江区\",\"value\":0},{\"label\":\"武江区\",\"value\":1},{\"label\":\"曲江区\",\"value\":2},{\"label\":\"乐昌市\",\"value\":3},{\"label\":\"南雄市\",\"value\":4},{\"label\":\"始兴县\",\"value\":5},{\"label\":\"仁化县\",\"value\":6},{\"label\":\"翁源县\",\"value\":7},{\"label\":\"新丰县\",\"value\":8},{\"label\":\"乳源瑶族自治县\",\"value\":9},{\"label\":\"其他\",\"value\":10}]},{\"label\":\"佛山市\",\"value\":10,\"children\":[{\"label\":\"禅城区\",\"value\":0},{\"label\":\"南海区\",\"value\":1},{\"label\":\"顺德区\",\"value\":2},{\"label\":\"三水区\",\"value\":3},{\"label\":\"高明区\",\"value\":4},{\"label\":\"其他\",\"value\":5}]},{\"label\":\"江门市\",\"value\":11,\"children\":[{\"label\":\"蓬江区\",\"value\":0},{\"label\":\"江海区\",\"value\":1},{\"label\":\"新会区\",\"value\":2},{\"label\":\"恩平市\",\"value\":3},{\"label\":\"台山市\",\"value\":4},{\"label\":\"开平市\",\"value\":5},{\"label\":\"鹤山市\",\"value\":6},{\"label\":\"其他\",\"value\":7}]},{\"label\":\"湛江市\",\"value\":12,\"children\":[{\"label\":\"赤坎区\",\"value\":0},{\"label\":\"霞山区\",\"value\":1},{\"label\":\"坡头区\",\"value\":2},{\"label\":\"麻章区\",\"value\":3},{\"label\":\"吴川市\",\"value\":4},{\"label\":\"廉江市\",\"value\":5},{\"label\":\"雷州市\",\"value\":6},{\"label\":\"遂溪县\",\"value\":7},{\"label\":\"徐闻县\",\"value\":8},{\"label\":\"其他\",\"value\":9}]},{\"label\":\"茂名市\",\"value\":13,\"children\":[{\"label\":\"茂南区\",\"value\":0},{\"label\":\"茂港区\",\"value\":1},{\"label\":\"化州市\",\"value\":2},{\"label\":\"信宜市\",\"value\":3},{\"label\":\"高州市\",\"value\":4},{\"label\":\"电白县\",\"value\":5},{\"label\":\"其他\",\"value\":6}]},{\"label\":\"肇庆市\",\"value\":14,\"children\":[{\"label\":\"端州区\",\"value\":0},{\"label\":\"鼎湖区\",\"value\":1},{\"label\":\"高要市\",\"value\":2},{\"label\":\"四会市\",\"value\":3},{\"label\":\"广宁县\",\"value\":4},{\"label\":\"怀集县\",\"value\":5},{\"label\":\"封开县\",\"value\":6},{\"label\":\"德庆县\",\"value\":7},{\"label\":\"其他\",\"value\":8}]},{\"label\":\"惠州市\",\"value\":15,\"children\":[{\"label\":\"惠城区\",\"value\":0},{\"label\":\"惠阳区\",\"value\":1},{\"label\":\"博罗县\",\"value\":2},{\"label\":\"惠东县\",\"value\":3},{\"label\":\"龙门县\",\"value\":4},{\"label\":\"其他\",\"value\":5}]},{\"label\":\"梅州市\",\"value\":16,\"children\":[{\"label\":\"梅江区\",\"value\":0},{\"label\":\"兴宁市\",\"value\":1},{\"label\":\"梅县\",\"value\":2},{\"label\":\"大埔县\",\"value\":3},{\"label\":\"丰顺县\",\"value\":4},{\"label\":\"五华县\",\"value\":5},{\"label\":\"平远县\",\"value\":6},{\"label\":\"蕉岭县\",\"value\":7},{\"label\":\"其他\",\"value\":8}]},{\"label\":\"汕尾市\",\"value\":17,\"children\":[{\"label\":\"城区\",\"value\":0},{\"label\":\"陆丰市\",\"value\":1},{\"label\":\"海丰县\",\"value\":2},{\"label\":\"陆河县\",\"value\":3},{\"label\":\"其他\",\"value\":4}]},{\"label\":\"河源市\",\"value\":18,\"children\":[{\"label\":\"源城区\",\"value\":0},{\"label\":\"紫金县\",\"value\":1},{\"label\":\"龙川县\",\"value\":2},{\"label\":\"连平县\",\"value\":3},{\"label\":\"和平县\",\"value\":4},{\"label\":\"东源县\",\"value\":5},{\"label\":\"其他\",\"value\":6}]},{\"label\":\"阳江市\",\"value\":19,\"children\":[{\"label\":\"江城区\",\"value\":0},{\"label\":\"阳春市\",\"value\":1},{\"label\":\"阳西县\",\"value\":2},{\"label\":\"阳东县\",\"value\":3},{\"label\":\"其他\",\"value\":4}]},{\"label\":\"清远市\",\"value\":20,\"children\":[{\"label\":\"清城区\",\"value\":0},{\"label\":\"英德市\",\"value\":1},{\"label\":\"连州市\",\"value\":2},{\"label\":\"佛冈县\",\"value\":3},{\"label\":\"阳山县\",\"value\":4},{\"label\":\"清新县\",\"value\":5},{\"label\":\"连山壮族瑶族自治县\",\"value\":6},{\"label\":\"连南瑶族自治县\",\"value\":7},{\"label\":\"其他\",\"value\":8}]}]},{\"label\":\"广西\",\"value\":19,\"children\":[{\"label\":\"南宁市\",\"value\":0,\"children\":[{\"label\":\"青秀区\",\"value\":0},{\"label\":\"兴宁区\",\"value\":1},{\"label\":\"西乡塘区\",\"value\":2},{\"label\":\"良庆区\",\"value\":3},{\"label\":\"江南区\",\"value\":4},{\"label\":\"邕宁区\",\"value\":5},{\"label\":\"武鸣县\",\"value\":6},{\"label\":\"隆安县\",\"value\":7},{\"label\":\"马山县\",\"value\":8},{\"label\":\"上林县\",\"value\":9},{\"label\":\"宾阳县\",\"value\":10},{\"label\":\"横县\",\"value\":11},{\"label\":\"其他\",\"value\":12}]},{\"label\":\"柳州市\",\"value\":1,\"children\":[{\"label\":\"城中区\",\"value\":0},{\"label\":\"鱼峰区\",\"value\":1},{\"label\":\"柳北区\",\"value\":2},{\"label\":\"柳南区\",\"value\":3},{\"label\":\"柳江县\",\"value\":4},{\"label\":\"柳城县\",\"value\":5},{\"label\":\"鹿寨县\",\"value\":6},{\"label\":\"融安县\",\"value\":7},{\"label\":\"融水苗族自治县\",\"value\":8},{\"label\":\"三江侗族自治县\",\"value\":9},{\"label\":\"其他\",\"value\":10}]},{\"label\":\"桂林市\",\"value\":2,\"children\":[{\"label\":\"象山区\",\"value\":0},{\"label\":\"秀峰区\",\"value\":1},{\"label\":\"叠彩区\",\"value\":2},{\"label\":\"七星区\",\"value\":3},{\"label\":\"雁山区\",\"value\":4},{\"label\":\"阳朔县\",\"value\":5},{\"label\":\"临桂县\",\"value\":6},{\"label\":\"灵川县\",\"value\":7},{\"label\":\"全州县\",\"value\":8},{\"label\":\"平乐县\",\"value\":9},{\"label\":\"兴安县\",\"value\":10},{\"label\":\"灌阳县\",\"value\":11},{\"label\":\"荔浦县\",\"value\":12},{\"label\":\"资源县\",\"value\":13},{\"label\":\"永福县\",\"value\":14},{\"label\":\"龙胜各族自治县\",\"value\":15},{\"label\":\"恭城瑶族自治县\",\"value\":16},{\"label\":\"其他\",\"value\":17}]},{\"label\":\"梧州市\",\"value\":3,\"children\":[{\"label\":\"万秀区\",\"value\":0},{\"label\":\"蝶山区\",\"value\":1},{\"label\":\"长洲区\",\"value\":2},{\"label\":\"岑溪市\",\"value\":3},{\"label\":\"苍梧县\",\"value\":4},{\"label\":\"藤县\",\"value\":5},{\"label\":\"蒙山县\",\"value\":6},{\"label\":\"其他\",\"value\":7}]},{\"label\":\"北海市\",\"value\":4,\"children\":[{\"label\":\"海城区\",\"value\":0},{\"label\":\"银海区\",\"value\":1},{\"label\":\"铁山港区\",\"value\":2},{\"label\":\"合浦县\",\"value\":3},{\"label\":\"其他\",\"value\":4}]},{\"label\":\"防城港市\",\"value\":5,\"children\":[{\"label\":\"港口区\",\"value\":0},{\"label\":\"防城区\",\"value\":1},{\"label\":\"东兴市\",\"value\":2},{\"label\":\"上思县\",\"value\":3},{\"label\":\"其他\",\"value\":4}]},{\"label\":\"钦州市\",\"value\":6,\"children\":[{\"label\":\"钦南区\",\"value\":0},{\"label\":\"钦北区\",\"value\":1},{\"label\":\"灵山县\",\"value\":2},{\"label\":\"浦北县\",\"value\":3},{\"label\":\"其他\",\"value\":4}]},{\"label\":\"贵港市\",\"value\":7,\"children\":[{\"label\":\"港北区\",\"value\":0},{\"label\":\"港南区\",\"value\":1},{\"label\":\"覃塘区\",\"value\":2},{\"label\":\"桂平市\",\"value\":3},{\"label\":\"平南县\",\"value\":4},{\"label\":\"其他\",\"value\":5}]},{\"label\":\"玉林市\",\"value\":8,\"children\":[{\"label\":\"玉州区\",\"value\":0},{\"label\":\"北流市\",\"value\":1},{\"label\":\"容县\",\"value\":2},{\"label\":\"陆川县\",\"value\":3},{\"label\":\"博白县\",\"value\":4},{\"label\":\"兴业县\",\"value\":5},{\"label\":\"其他\",\"value\":6}]},{\"label\":\"百色市\",\"value\":9,\"children\":[{\"label\":\"右江区\",\"value\":0},{\"label\":\"凌云县\",\"value\":1},{\"label\":\"平果县\",\"value\":2},{\"label\":\"西林县\",\"value\":3},{\"label\":\"乐业县\",\"value\":4},{\"label\":\"德保县\",\"value\":5},{\"label\":\"田林县\",\"value\":6},{\"label\":\"田阳县\",\"value\":7},{\"label\":\"靖西县\",\"value\":8},{\"label\":\"田东县\",\"value\":9},{\"label\":\"那坡县\",\"value\":10},{\"label\":\"隆林各族自治县\",\"value\":11},{\"label\":\"其他\",\"value\":12}]},{\"label\":\"贺州市\",\"value\":10,\"children\":[{\"label\":\"八步区\",\"value\":0},{\"label\":\"钟山县\",\"value\":1},{\"label\":\"昭平县\",\"value\":2},{\"label\":\"富川瑶族自治县\",\"value\":3},{\"label\":\"其他\",\"value\":4}]},{\"label\":\"河池市\",\"value\":11,\"children\":[{\"label\":\"金城江区\",\"value\":0},{\"label\":\"宜州市\",\"value\":1},{\"label\":\"天峨县\",\"value\":2},{\"label\":\"凤山县\",\"value\":3},{\"label\":\"南丹县\",\"value\":4},{\"label\":\"东兰县\",\"value\":5},{\"label\":\"都安瑶族自治县\",\"value\":6},{\"label\":\"罗城仫佬族自治县\",\"value\":7},{\"label\":\"巴马瑶族自治县\",\"value\":8},{\"label\":\"环江毛南族自治县\",\"value\":9},{\"label\":\"大化瑶族自治县\",\"value\":10},{\"label\":\"其他\",\"value\":11}]},{\"label\":\"来宾市\",\"value\":12,\"children\":[{\"label\":\"兴宾区\",\"value\":0},{\"label\":\"合山市\",\"value\":1},{\"label\":\"象州县\",\"value\":2},{\"label\":\"武宣县\",\"value\":3},{\"label\":\"忻城县\",\"value\":4},{\"label\":\"金秀瑶族自治县\",\"value\":5},{\"label\":\"其他\",\"value\":6}]},{\"label\":\"崇左市\",\"value\":13,\"children\":[{\"label\":\"江州区\",\"value\":0},{\"label\":\"凭祥市\",\"value\":1},{\"label\":\"宁明县\",\"value\":2},{\"label\":\"扶绥县\",\"value\":3},{\"label\":\"龙州县\",\"value\":4},{\"label\":\"大新县\",\"value\":5},{\"label\":\"天等县\",\"value\":6},{\"label\":\"其他\",\"value\":7}]},{\"label\":\"其他市\",\"value\":14,\"children\":[{\"label\":\"其他\",\"value\":0}]}]},{\"label\":\"海南省\",\"value\":20,\"children\":[{\"label\":\"海口市\",\"value\":0,\"children\":[{\"label\":\"龙华区\",\"value\":0},{\"label\":\"秀英区\",\"value\":1},{\"label\":\"琼山区\",\"value\":2},{\"label\":\"美兰区\",\"value\":3},{\"label\":\"其他\",\"value\":4}]},{\"label\":\"三亚市\",\"value\":1,\"children\":[{\"label\":\"三亚市\",\"value\":0},{\"label\":\"其他\",\"value\":1}]},{\"label\":\"五指山市\",\"value\":2,\"children\":[{\"label\":\"五指山\",\"value\":0}]},{\"label\":\"琼海市\",\"value\":3,\"children\":[{\"label\":\"琼海\",\"value\":0}]},{\"label\":\"儋州市\",\"value\":4,\"children\":[{\"label\":\"儋州\",\"value\":0}]},{\"label\":\"文昌市\",\"value\":5,\"children\":[{\"label\":\"文昌\",\"value\":0}]},{\"label\":\"万宁市\",\"value\":6,\"children\":[{\"label\":\"万宁\",\"value\":0}]},{\"label\":\"东方市\",\"value\":7,\"children\":[{\"label\":\"东方\",\"value\":0}]},{\"label\":\"澄迈县\",\"value\":8,\"children\":[{\"label\":\"澄迈县\",\"value\":0}]},{\"label\":\"定安县\",\"value\":9,\"children\":[{\"label\":\"定安县\",\"value\":0}]},{\"label\":\"屯昌县\",\"value\":10,\"children\":[{\"label\":\"屯昌县\",\"value\":0}]},{\"label\":\"临高县\",\"value\":11,\"children\":[{\"label\":\"临高县\",\"value\":0}]},{\"label\":\"白沙黎族自治县\",\"value\":12,\"children\":[{\"label\":\"白沙黎族自治县\",\"value\":0}]},{\"label\":\"昌江黎族自治县\",\"value\":13,\"children\":[{\"label\":\"昌江黎族自治县\",\"value\":0}]},{\"label\":\"乐东黎族自治县\",\"value\":14,\"children\":[{\"label\":\"乐东黎族自治县\",\"value\":0}]},{\"label\":\"陵水黎族自治县\",\"value\":15,\"children\":[{\"label\":\"陵水黎族自治县\",\"value\":0}]},{\"label\":\"保亭黎族苗族自治县\",\"value\":16,\"children\":[{\"label\":\"保亭黎族苗族自治县\",\"value\":0}]},{\"label\":\"琼中黎族苗族自治县\",\"value\":17,\"children\":[{\"label\":\"琼中黎族苗族自治县\",\"value\":0}]},{\"label\":\"其他\",\"value\":18,\"children\":[{\"label\":\"其他\",\"value\":0}]}]},{\"label\":\"重庆市\",\"value\":21,\"children\":[{\"label\":\"重庆市\",\"value\":0,\"children\":[{\"label\":\"渝中区\",\"value\":0},{\"label\":\"大渡口区\",\"value\":1},{\"label\":\"江北区\",\"value\":2},{\"label\":\"南岸区\",\"value\":3},{\"label\":\"北碚区\",\"value\":4},{\"label\":\"渝北区\",\"value\":5},{\"label\":\"巴南区\",\"value\":6},{\"label\":\"长寿区\",\"value\":7},{\"label\":\"双桥区\",\"value\":8},{\"label\":\"沙坪坝区\",\"value\":9},{\"label\":\"万盛区\",\"value\":10},{\"label\":\"万州区\",\"value\":11},{\"label\":\"涪陵区\",\"value\":12},{\"label\":\"黔江区\",\"value\":13},{\"label\":\"永川区\",\"value\":14},{\"label\":\"合川区\",\"value\":15},{\"label\":\"江津区\",\"value\":16},{\"label\":\"九龙坡区\",\"value\":17},{\"label\":\"南川区\",\"value\":18},{\"label\":\"綦江县\",\"value\":19},{\"label\":\"潼南县\",\"value\":20},{\"label\":\"荣昌县\",\"value\":21},{\"label\":\"璧山县\",\"value\":22},{\"label\":\"大足县\",\"value\":23},{\"label\":\"铜梁县\",\"value\":24},{\"label\":\"梁平县\",\"value\":25},{\"label\":\"开县\",\"value\":26},{\"label\":\"忠县\",\"value\":27},{\"label\":\"城口县\",\"value\":28},{\"label\":\"垫江县\",\"value\":29},{\"label\":\"武隆县\",\"value\":30},{\"label\":\"丰都县\",\"value\":31},{\"label\":\"奉节县\",\"value\":32},{\"label\":\"云阳县\",\"value\":33},{\"label\":\"巫溪县\",\"value\":34},{\"label\":\"巫山县\",\"value\":35},{\"label\":\"石柱土家族自治县\",\"value\":36},{\"label\":\"秀山土家族苗族自治县\",\"value\":37},{\"label\":\"酉阳土家族苗族自治县\",\"value\":38},{\"label\":\"彭水苗族土家族自治县\",\"value\":39},{\"label\":\"其他\",\"value\":40}]}]},{\"label\":\"四川省\",\"value\":22,\"children\":[{\"label\":\"成都市\",\"value\":0,\"children\":[{\"label\":\"青羊区\",\"value\":0},{\"label\":\"锦江区\",\"value\":1},{\"label\":\"金牛区\",\"value\":2},{\"label\":\"武侯区\",\"value\":3},{\"label\":\"成华区\",\"value\":4},{\"label\":\"龙泉驿区\",\"value\":5},{\"label\":\"青白江区\",\"value\":6},{\"label\":\"新都区\",\"value\":7},{\"label\":\"温江区\",\"value\":8},{\"label\":\"都江堰市\",\"value\":9},{\"label\":\"彭州市\",\"value\":10},{\"label\":\"邛崃市\",\"value\":11},{\"label\":\"崇州市\",\"value\":12},{\"label\":\"金堂县\",\"value\":13},{\"label\":\"郫县\",\"value\":14},{\"label\":\"新津县\",\"value\":15},{\"label\":\"双流县\",\"value\":16},{\"label\":\"蒲江县\",\"value\":17},{\"label\":\"大邑县\",\"value\":18},{\"label\":\"其他\",\"value\":19}]},{\"label\":\"自贡市\",\"value\":1,\"children\":[{\"label\":\"大安区\",\"value\":0},{\"label\":\"自流井区\",\"value\":1},{\"label\":\"贡井区\",\"value\":2},{\"label\":\"沿滩区\",\"value\":3},{\"label\":\"荣县\",\"value\":4},{\"label\":\"富顺县\",\"value\":5},{\"label\":\"其他\",\"value\":6}]},{\"label\":\"攀枝花市\",\"value\":2,\"children\":[{\"label\":\"仁和区\",\"value\":0},{\"label\":\"米易县\",\"value\":1},{\"label\":\"盐边县\",\"value\":2},{\"label\":\"东区\",\"value\":3},{\"label\":\"西区\",\"value\":4},{\"label\":\"其他\",\"value\":5}]},{\"label\":\"泸州市\",\"value\":3,\"children\":[{\"label\":\"江阳区\",\"value\":0},{\"label\":\"纳溪区\",\"value\":1},{\"label\":\"龙马潭区\",\"value\":2},{\"label\":\"泸县\",\"value\":3},{\"label\":\"合江县\",\"value\":4},{\"label\":\"叙永县\",\"value\":5},{\"label\":\"古蔺县\",\"value\":6},{\"label\":\"其他\",\"value\":7}]},{\"label\":\"德阳市\",\"value\":4,\"children\":[{\"label\":\"旌阳区\",\"value\":0},{\"label\":\"广汉市\",\"value\":1},{\"label\":\"什邡市\",\"value\":2},{\"label\":\"绵竹市\",\"value\":3},{\"label\":\"罗江县\",\"value\":4},{\"label\":\"中江县\",\"value\":5},{\"label\":\"其他\",\"value\":6}]},{\"label\":\"绵阳市\",\"value\":5,\"children\":[{\"label\":\"涪城区\",\"value\":0},{\"label\":\"游仙区\",\"value\":1},{\"label\":\"江油市\",\"value\":2},{\"label\":\"盐亭县\",\"value\":3},{\"label\":\"三台县\",\"value\":4},{\"label\":\"平武县\",\"value\":5},{\"label\":\"安县\",\"value\":6},{\"label\":\"梓潼县\",\"value\":7},{\"label\":\"北川羌族自治县\",\"value\":8},{\"label\":\"其他\",\"value\":9}]},{\"label\":\"广元市\",\"value\":6,\"children\":[{\"label\":\"元坝区\",\"value\":0},{\"label\":\"朝天区\",\"value\":1},{\"label\":\"青川县\",\"value\":2},{\"label\":\"旺苍县\",\"value\":3},{\"label\":\"剑阁县\",\"value\":4},{\"label\":\"苍溪县\",\"value\":5},{\"label\":\"市中区\",\"value\":6},{\"label\":\"其他\",\"value\":7}]},{\"label\":\"遂宁市\",\"value\":7,\"children\":[{\"label\":\"船山区\",\"value\":0},{\"label\":\"安居区\",\"value\":1},{\"label\":\"射洪县\",\"value\":2},{\"label\":\"蓬溪县\",\"value\":3},{\"label\":\"大英县\",\"value\":4},{\"label\":\"其他\",\"value\":5}]},{\"label\":\"内江市\",\"value\":8,\"children\":[{\"label\":\"市中区\",\"value\":0},{\"label\":\"东兴区\",\"value\":1},{\"label\":\"资中县\",\"value\":2},{\"label\":\"隆昌县\",\"value\":3},{\"label\":\"威远县\",\"value\":4},{\"label\":\"其他\",\"value\":5}]},{\"label\":\"乐山市\",\"value\":9,\"children\":[{\"label\":\"市中区\",\"value\":0},{\"label\":\"五通桥区\",\"value\":1},{\"label\":\"沙湾区\",\"value\":2},{\"label\":\"金口河区\",\"value\":3},{\"label\":\"峨眉山市\",\"value\":4},{\"label\":\"夹江县\",\"value\":5},{\"label\":\"井研县\",\"value\":6},{\"label\":\"犍为县\",\"value\":7},{\"label\":\"沐川县\",\"value\":8},{\"label\":\"马边彝族自治县\",\"value\":9},{\"label\":\"峨边彝族自治县\",\"value\":10},{\"label\":\"其他\",\"value\":11}]},{\"label\":\"南充\",\"value\":10,\"children\":[{\"label\":\"顺庆区\",\"value\":0},{\"label\":\"高坪区\",\"value\":1},{\"label\":\"嘉陵区\",\"value\":2},{\"label\":\"阆中市\",\"value\":3},{\"label\":\"营山县\",\"value\":4},{\"label\":\"蓬安县\",\"value\":5},{\"label\":\"仪陇县\",\"value\":6},{\"label\":\"南部县\",\"value\":7},{\"label\":\"西充县\",\"value\":8},{\"label\":\"其他\",\"value\":9}]},{\"label\":\"眉山市\",\"value\":11,\"children\":[{\"label\":\"东坡区\",\"value\":0},{\"label\":\"仁寿县\",\"value\":1},{\"label\":\"彭山县\",\"value\":2},{\"label\":\"洪雅县\",\"value\":3},{\"label\":\"丹棱县\",\"value\":4},{\"label\":\"青神县\",\"value\":5},{\"label\":\"其他\",\"value\":6}]},{\"label\":\"宜宾市\",\"value\":12,\"children\":[{\"label\":\"翠屏区\",\"value\":0},{\"label\":\"宜宾县\",\"value\":1},{\"label\":\"兴文县\",\"value\":2},{\"label\":\"南溪县\",\"value\":3},{\"label\":\"珙县\",\"value\":4},{\"label\":\"长宁县\",\"value\":5},{\"label\":\"高县\",\"value\":6},{\"label\":\"江安县\",\"value\":7},{\"label\":\"筠连县\",\"value\":8},{\"label\":\"屏山县\",\"value\":9},{\"label\":\"其他\",\"value\":10}]},{\"label\":\"广安市\",\"value\":13,\"children\":[{\"label\":\"广安区\",\"value\":0},{\"label\":\"华蓥市\",\"value\":1},{\"label\":\"岳池县\",\"value\":2},{\"label\":\"邻水县\",\"value\":3},{\"label\":\"武胜县\",\"value\":4},{\"label\":\"其他\",\"value\":5}]},{\"label\":\"达州市\",\"value\":14,\"children\":[{\"label\":\"通川区\",\"value\":0},{\"label\":\"万源市\",\"value\":1},{\"label\":\"达县\",\"value\":2},{\"label\":\"渠县\",\"value\":3},{\"label\":\"宣汉县\",\"value\":4},{\"label\":\"开江县\",\"value\":5},{\"label\":\"大竹县\",\"value\":6},{\"label\":\"其他\",\"value\":7}]},{\"label\":\"雅安市\",\"value\":15,\"children\":[{\"label\":\"雨城区\",\"value\":0},{\"label\":\"芦山县\",\"value\":1},{\"label\":\"石棉县\",\"value\":2},{\"label\":\"名山县\",\"value\":3},{\"label\":\"天全县\",\"value\":4},{\"label\":\"荥经县\",\"value\":5},{\"label\":\"宝兴县\",\"value\":6},{\"label\":\"汉源县\",\"value\":7},{\"label\":\"其他\",\"value\":8}]},{\"label\":\"巴中市\",\"value\":16,\"children\":[{\"label\":\"巴州区\",\"value\":0},{\"label\":\"南江县\",\"value\":1},{\"label\":\"平昌县\",\"value\":2},{\"label\":\"通江县\",\"value\":3},{\"label\":\"其他\",\"value\":4}]},{\"label\":\"资阳市\",\"value\":17,\"children\":[{\"label\":\"雁江区\",\"value\":0},{\"label\":\"简阳市\",\"value\":1},{\"label\":\"安岳县\",\"value\":2},{\"label\":\"乐至县\",\"value\":3},{\"label\":\"其他\",\"value\":4}]},{\"label\":\"阿坝藏族羌族自治州\",\"value\":18,\"children\":[{\"label\":\"马尔康县\",\"value\":0},{\"label\":\"九寨沟县\",\"value\":1},{\"label\":\"红原县\",\"value\":2},{\"label\":\"汶川县\",\"value\":3},{\"label\":\"阿坝县\",\"value\":4},{\"label\":\"理县\",\"value\":5},{\"label\":\"若尔盖县\",\"value\":6},{\"label\":\"小金县\",\"value\":7},{\"label\":\"黑水县\",\"value\":8},{\"label\":\"金川县\",\"value\":9},{\"label\":\"松潘县\",\"value\":10},{\"label\":\"壤塘县\",\"value\":11},{\"label\":\"茂县\",\"value\":12},{\"label\":\"其他\",\"value\":13}]},{\"label\":\"甘孜藏族自治州\",\"value\":19,\"children\":[{\"label\":\"康定县\",\"value\":0},{\"label\":\"丹巴县\",\"value\":1},{\"label\":\"炉霍县\",\"value\":2},{\"label\":\"九龙县\",\"value\":3},{\"label\":\"甘孜县\",\"value\":4},{\"label\":\"雅江县\",\"value\":5},{\"label\":\"新龙县\",\"value\":6},{\"label\":\"道孚县\",\"value\":7},{\"label\":\"白玉县\",\"value\":8},{\"label\":\"理塘县\",\"value\":9},{\"label\":\"德格县\",\"value\":10},{\"label\":\"乡城县\",\"value\":11},{\"label\":\"石渠县\",\"value\":12},{\"label\":\"稻城县\",\"value\":13},{\"label\":\"色达县\",\"value\":14},{\"label\":\"巴塘县\",\"value\":15},{\"label\":\"泸定县\",\"value\":16},{\"label\":\"得荣县\",\"value\":17},{\"label\":\"其他\",\"value\":18}]},{\"label\":\"凉山彝族自治州\",\"value\":20,\"children\":[{\"label\":\"西昌市\",\"value\":0},{\"label\":\"美姑县\",\"value\":1},{\"label\":\"昭觉县\",\"value\":2},{\"label\":\"金阳县\",\"value\":3},{\"label\":\"甘洛县\",\"value\":4},{\"label\":\"布拖县\",\"value\":5},{\"label\":\"雷波县\",\"value\":6},{\"label\":\"普格县\",\"value\":7},{\"label\":\"宁南县\",\"value\":8},{\"label\":\"喜德县\",\"value\":9},{\"label\":\"会东县\",\"value\":10},{\"label\":\"越西县\",\"value\":11},{\"label\":\"会理县\",\"value\":12},{\"label\":\"盐源县\",\"value\":13},{\"label\":\"德昌县\",\"value\":14},{\"label\":\"冕宁县\",\"value\":15},{\"label\":\"木里藏族自治县\",\"value\":16},{\"label\":\"其他\",\"value\":17}]},{\"label\":\"其他\",\"value\":21,\"children\":[{\"label\":\"其他\",\"value\":0}]}]},{\"label\":\"贵州省\",\"value\":23,\"children\":[{\"label\":\"贵阳市\",\"value\":0,\"children\":[{\"label\":\"南明区\",\"value\":0},{\"label\":\"云岩区\",\"value\":1},{\"label\":\"花溪区\",\"value\":2},{\"label\":\"乌当区\",\"value\":3},{\"label\":\"白云区\",\"value\":4},{\"label\":\"小河区\",\"value\":5},{\"label\":\"清镇市\",\"value\":6},{\"label\":\"开阳县\",\"value\":7},{\"label\":\"修文县\",\"value\":8},{\"label\":\"息烽县\",\"value\":9},{\"label\":\"其他\",\"value\":10}]},{\"label\":\"六盘水市\",\"value\":1,\"children\":[{\"label\":\"钟山区\",\"value\":0},{\"label\":\"水城县\",\"value\":1},{\"label\":\"盘县\",\"value\":2},{\"label\":\"六枝特区\",\"value\":3},{\"label\":\"其他\",\"value\":4}]},{\"label\":\"遵义市\",\"value\":2,\"children\":[{\"label\":\"红花岗区\",\"value\":0},{\"label\":\"汇川区\",\"value\":1},{\"label\":\"赤水市\",\"value\":2},{\"label\":\"仁怀市\",\"value\":3},{\"label\":\"遵义县\",\"value\":4},{\"label\":\"绥阳县\",\"value\":5},{\"label\":\"桐梓县\",\"value\":6},{\"label\":\"习水县\",\"value\":7},{\"label\":\"凤冈县\",\"value\":8},{\"label\":\"正安县\",\"value\":9},{\"label\":\"余庆县\",\"value\":10},{\"label\":\"湄潭县\",\"value\":11},{\"label\":\"道真仡佬族苗族自治县\",\"value\":12},{\"label\":\"务川仡佬族苗族自治县\",\"value\":13},{\"label\":\"其他\",\"value\":14}]},{\"label\":\"安顺市\",\"value\":3,\"children\":[{\"label\":\"西秀区\",\"value\":0},{\"label\":\"普定县\",\"value\":1},{\"label\":\"平坝县\",\"value\":2},{\"label\":\"镇宁布依族苗族自治县\",\"value\":3},{\"label\":\"紫云苗族布依族自治县\",\"value\":4},{\"label\":\"关岭布依族苗族自治县\",\"value\":5},{\"label\":\"其他\",\"value\":6}]},{\"label\":\"铜仁地区\",\"value\":4,\"children\":[{\"label\":\"铜仁市\",\"value\":0},{\"label\":\"德江县\",\"value\":1},{\"label\":\"江口县\",\"value\":2},{\"label\":\"思南县\",\"value\":3},{\"label\":\"石阡县\",\"value\":4},{\"label\":\"玉屏侗族自治县\",\"value\":5},{\"label\":\"松桃苗族自治县\",\"value\":6},{\"label\":\"印江土家族苗族自治县\",\"value\":7},{\"label\":\"沿河土家族自治县\",\"value\":8},{\"label\":\"万山特区\",\"value\":9},{\"label\":\"其他\",\"value\":10}]},{\"label\":\"毕节地区\",\"value\":5,\"children\":[{\"label\":\"毕节市\",\"value\":0},{\"label\":\"黔西县\",\"value\":1},{\"label\":\"大方县\",\"value\":2},{\"label\":\"织金县\",\"value\":3},{\"label\":\"金沙县\",\"value\":4},{\"label\":\"赫章县\",\"value\":5},{\"label\":\"纳雍县\",\"value\":6},{\"label\":\"威宁彝族回族苗族自治县\",\"value\":7},{\"label\":\"其他\",\"value\":8}]},{\"label\":\"黔西南布依族苗族自治州\",\"value\":6,\"children\":[{\"label\":\"兴义市\",\"value\":0},{\"label\":\"望谟县\",\"value\":1},{\"label\":\"兴仁县\",\"value\":2},{\"label\":\"普安县\",\"value\":3},{\"label\":\"册亨县\",\"value\":4},{\"label\":\"晴隆县\",\"value\":5},{\"label\":\"贞丰县\",\"value\":6},{\"label\":\"安龙县\",\"value\":7},{\"label\":\"其他\",\"value\":8}]},{\"label\":\"黔东南苗族侗族自治州\",\"value\":7,\"children\":[{\"label\":\"凯里市\",\"value\":0},{\"label\":\"施秉县\",\"value\":1},{\"label\":\"从江县\",\"value\":2},{\"label\":\"锦屏县\",\"value\":3},{\"label\":\"镇远县\",\"value\":4},{\"label\":\"麻江县\",\"value\":5},{\"label\":\"台江县\",\"value\":6},{\"label\":\"天柱县\",\"value\":7},{\"label\":\"黄平县\",\"value\":8},{\"label\":\"榕江县\",\"value\":9},{\"label\":\"剑河县\",\"value\":10},{\"label\":\"三穗县\",\"value\":11},{\"label\":\"雷山县\",\"value\":12},{\"label\":\"黎平县\",\"value\":13},{\"label\":\"岑巩县\",\"value\":14},{\"label\":\"丹寨县\",\"value\":15},{\"label\":\"其他\",\"value\":16}]},{\"label\":\"黔南布依族苗族自治州\",\"value\":8,\"children\":[{\"label\":\"都匀市\",\"value\":0},{\"label\":\"福泉市\",\"value\":1},{\"label\":\"贵定县\",\"value\":2},{\"label\":\"惠水县\",\"value\":3},{\"label\":\"罗甸县\",\"value\":4},{\"label\":\"瓮安县\",\"value\":5},{\"label\":\"荔波县\",\"value\":6},{\"label\":\"龙里县\",\"value\":7},{\"label\":\"平塘县\",\"value\":8},{\"label\":\"长顺县\",\"value\":9},{\"label\":\"独山县\",\"value\":10},{\"label\":\"三都水族自治县\",\"value\":11},{\"label\":\"其他\",\"value\":12}]},{\"label\":\"其他\",\"value\":9,\"children\":[{\"label\":\"其他\",\"value\":0}]}]},{\"label\":\"云南省\",\"value\":24,\"children\":[{\"label\":\"昆明市\",\"value\":0,\"children\":[{\"label\":\"盘龙区\",\"value\":0},{\"label\":\"五华区\",\"value\":1},{\"label\":\"官渡区\",\"value\":2},{\"label\":\"西山区\",\"value\":3},{\"label\":\"东川区\",\"value\":4},{\"label\":\"安宁市\",\"value\":5},{\"label\":\"呈贡县\",\"value\":6},{\"label\":\"晋宁县\",\"value\":7},{\"label\":\"富民县\",\"value\":8},{\"label\":\"宜良县\",\"value\":9},{\"label\":\"嵩明县\",\"value\":10},{\"label\":\"石林彝族自治县\",\"value\":11},{\"label\":\"禄劝彝族苗族自治县\",\"value\":12},{\"label\":\"寻甸回族彝族自治县\",\"value\":13},{\"label\":\"其他\",\"value\":14}]},{\"label\":\"曲靖市\",\"value\":1,\"children\":[{\"label\":\"麒麟区\",\"value\":0},{\"label\":\"宣威市\",\"value\":1},{\"label\":\"马龙县\",\"value\":2},{\"label\":\"沾益县\",\"value\":3},{\"label\":\"富源县\",\"value\":4},{\"label\":\"罗平县\",\"value\":5},{\"label\":\"师宗县\",\"value\":6},{\"label\":\"陆良县\",\"value\":7},{\"label\":\"会泽县\",\"value\":8},{\"label\":\"其他\",\"value\":9}]},{\"label\":\"玉溪市\",\"value\":2,\"children\":[{\"label\":\"红塔区\",\"value\":0},{\"label\":\"江川县\",\"value\":1},{\"label\":\"澄江县\",\"value\":2},{\"label\":\"通海县\",\"value\":3},{\"label\":\"华宁县\",\"value\":4},{\"label\":\"易门县\",\"value\":5},{\"label\":\"峨山彝族自治县\",\"value\":6},{\"label\":\"新平彝族傣族自治县\",\"value\":7},{\"label\":\"元江哈尼族彝族傣族自治县\",\"value\":8},{\"label\":\"其他\",\"value\":9}]},{\"label\":\"保山市\",\"value\":3,\"children\":[{\"label\":\"隆阳区\",\"value\":0},{\"label\":\"施甸县\",\"value\":1},{\"label\":\"腾冲县\",\"value\":2},{\"label\":\"龙陵县\",\"value\":3},{\"label\":\"昌宁县\",\"value\":4},{\"label\":\"其他\",\"value\":5}]},{\"label\":\"昭通市\",\"value\":4,\"children\":[{\"label\":\"昭阳区\",\"value\":0},{\"label\":\"鲁甸县\",\"value\":1},{\"label\":\"巧家县\",\"value\":2},{\"label\":\"盐津县\",\"value\":3},{\"label\":\"大关县\",\"value\":4},{\"label\":\"永善县\",\"value\":5},{\"label\":\"绥江县\",\"value\":6},{\"label\":\"镇雄县\",\"value\":7},{\"label\":\"彝良县\",\"value\":8},{\"label\":\"威信县\",\"value\":9},{\"label\":\"水富县\",\"value\":10},{\"label\":\"其他\",\"value\":11}]},{\"label\":\"丽江市\",\"value\":5,\"children\":[{\"label\":\"古城区\",\"value\":0},{\"label\":\"永胜县\",\"value\":1},{\"label\":\"华坪县\",\"value\":2},{\"label\":\"玉龙纳西族自治县\",\"value\":3},{\"label\":\"宁蒗彝族自治县\",\"value\":4},{\"label\":\"其他\",\"value\":5}]},{\"label\":\"普洱市\",\"value\":6,\"children\":[{\"label\":\"思茅区\",\"value\":0},{\"label\":\"普洱哈尼族彝族自治县\",\"value\":1},{\"label\":\"墨江哈尼族自治县\",\"value\":2},{\"label\":\"景东彝族自治县\",\"value\":3},{\"label\":\"景谷傣族彝族自治县\",\"value\":4},{\"label\":\"镇沅彝族哈尼族拉祜族自治县\",\"value\":5},{\"label\":\"江城哈尼族彝族自治县\",\"value\":6},{\"label\":\"孟连傣族拉祜族佤族自治县\",\"value\":7},{\"label\":\"澜沧拉祜族自治县\",\"value\":8},{\"label\":\"西盟佤族自治县\",\"value\":9},{\"label\":\"其他\",\"value\":10}]},{\"label\":\"临沧市\",\"value\":7,\"children\":[{\"label\":\"临翔区\",\"value\":0},{\"label\":\"凤庆县\",\"value\":1},{\"label\":\"云县\",\"value\":2},{\"label\":\"永德县\",\"value\":3},{\"label\":\"镇康县\",\"value\":4},{\"label\":\"双江拉祜族佤族布朗族傣族自治县\",\"value\":5},{\"label\":\"耿马傣族佤族自治县\",\"value\":6},{\"label\":\"沧源佤族自治县\",\"value\":7},{\"label\":\"其他\",\"value\":8}]},{\"label\":\"德宏傣族景颇族自治州\",\"value\":8,\"children\":[{\"label\":\"潞西市\",\"value\":0},{\"label\":\"瑞丽市\",\"value\":1},{\"label\":\"梁河县\",\"value\":2},{\"label\":\"盈江县\",\"value\":3},{\"label\":\"陇川县\",\"value\":4},{\"label\":\"其他\",\"value\":5}]},{\"label\":\"怒江傈僳族自治州\",\"value\":9,\"children\":[{\"label\":\"泸水县\",\"value\":0},{\"label\":\"福贡县\",\"value\":1},{\"label\":\"贡山独龙族怒族自治县\",\"value\":2},{\"label\":\"兰坪白族普米族自治县\",\"value\":3},{\"label\":\"其他\",\"value\":4}]},{\"label\":\"迪庆藏族自治州\",\"value\":10,\"children\":[{\"label\":\"香格里拉县\",\"value\":0},{\"label\":\"德钦县\",\"value\":1},{\"label\":\"维西傈僳族自治县\",\"value\":2},{\"label\":\"其他\",\"value\":3}]},{\"label\":\"大理白族自治州\",\"value\":11,\"children\":[{\"label\":\"大理市\",\"value\":0},{\"label\":\"祥云县\",\"value\":1},{\"label\":\"宾川县\",\"value\":2},{\"label\":\"弥渡县\",\"value\":3},{\"label\":\"永平县\",\"value\":4},{\"label\":\"云龙县\",\"value\":5},{\"label\":\"洱源县\",\"value\":6},{\"label\":\"剑川县\",\"value\":7},{\"label\":\"鹤庆县\",\"value\":8},{\"label\":\"漾濞彝族自治县\",\"value\":9},{\"label\":\"南涧彝族自治县\",\"value\":10},{\"label\":\"巍山彝族回族自治县\",\"value\":11},{\"label\":\"其他\",\"value\":12}]},{\"label\":\"楚雄彝族自治州\",\"value\":12,\"children\":[{\"label\":\"楚雄市\",\"value\":0},{\"label\":\"双柏县\",\"value\":1},{\"label\":\"牟定县\",\"value\":2},{\"label\":\"南华县\",\"value\":3},{\"label\":\"姚安县\",\"value\":4},{\"label\":\"大姚县\",\"value\":5},{\"label\":\"永仁县\",\"value\":6},{\"label\":\"元谋县\",\"value\":7},{\"label\":\"武定县\",\"value\":8},{\"label\":\"禄丰县\",\"value\":9},{\"label\":\"其他\",\"value\":10}]},{\"label\":\"红河哈尼族彝族自治州\",\"value\":13,\"children\":[{\"label\":\"蒙自县\",\"value\":0},{\"label\":\"个旧市\",\"value\":1},{\"label\":\"开远市\",\"value\":2},{\"label\":\"绿春县\",\"value\":3},{\"label\":\"建水县\",\"value\":4},{\"label\":\"石屏县\",\"value\":5},{\"label\":\"弥勒县\",\"value\":6},{\"label\":\"泸西县\",\"value\":7},{\"label\":\"元阳县\",\"value\":8},{\"label\":\"红河县\",\"value\":9},{\"label\":\"金平苗族瑶族傣族自治县\",\"value\":10},{\"label\":\"河口瑶族自治县\",\"value\":11},{\"label\":\"屏边苗族自治县\",\"value\":12},{\"label\":\"其他\",\"value\":13}]},{\"label\":\"文山壮族苗族自治州\",\"value\":14,\"children\":[{\"label\":\"文山县\",\"value\":0},{\"label\":\"砚山县\",\"value\":1},{\"label\":\"西畴县\",\"value\":2},{\"label\":\"麻栗坡县\",\"value\":3},{\"label\":\"马关县\",\"value\":4},{\"label\":\"丘北县\",\"value\":5},{\"label\":\"广南县\",\"value\":6},{\"label\":\"富宁县\",\"value\":7},{\"label\":\"其他\",\"value\":8}]},{\"label\":\"西双版纳傣族自治州\",\"value\":15,\"children\":[{\"label\":\"景洪市\",\"value\":0},{\"label\":\"勐海县\",\"value\":1},{\"label\":\"勐腊县\",\"value\":2},{\"label\":\"其他\",\"value\":3}]},{\"label\":\"其他\",\"value\":16,\"children\":[{\"label\":\"其他\",\"value\":0}]}]},{\"label\":\"西藏\",\"value\":25,\"children\":[{\"label\":\"拉萨市\",\"value\":0,\"children\":[{\"label\":\"城关区\",\"value\":0},{\"label\":\"林周县\",\"value\":1},{\"label\":\"当雄县\",\"value\":2},{\"label\":\"尼木县\",\"value\":3},{\"label\":\"曲水县\",\"value\":4},{\"label\":\"堆龙德庆县\",\"value\":5},{\"label\":\"达孜县\",\"value\":6},{\"label\":\"墨竹工卡县\",\"value\":7},{\"label\":\"其他\",\"value\":8}]},{\"label\":\"那曲地区\",\"value\":1,\"children\":[{\"label\":\"那曲县\",\"value\":0},{\"label\":\"嘉黎县\",\"value\":1},{\"label\":\"比如县\",\"value\":2},{\"label\":\"聂荣县\",\"value\":3},{\"label\":\"安多县\",\"value\":4},{\"label\":\"申扎县\",\"value\":5},{\"label\":\"索县\",\"value\":6},{\"label\":\"班戈县\",\"value\":7},{\"label\":\"巴青县\",\"value\":8},{\"label\":\"尼玛县\",\"value\":9},{\"label\":\"其他\",\"value\":10}]},{\"label\":\"昌都地区\",\"value\":2,\"children\":[{\"label\":\"昌都县\",\"value\":0},{\"label\":\"江达县\",\"value\":1},{\"label\":\"贡觉县\",\"value\":2},{\"label\":\"类乌齐县\",\"value\":3},{\"label\":\"丁青县\",\"value\":4},{\"label\":\"察雅县\",\"value\":5},{\"label\":\"八宿县\",\"value\":6},{\"label\":\"左贡县\",\"value\":7},{\"label\":\"芒康县\",\"value\":8},{\"label\":\"洛隆县\",\"value\":9},{\"label\":\"边坝县\",\"value\":10},{\"label\":\"其他\",\"value\":11}]},{\"label\":\"林芝地区\",\"value\":3,\"children\":[{\"label\":\"林芝县\",\"value\":0},{\"label\":\"工布江达县\",\"value\":1},{\"label\":\"米林县\",\"value\":2},{\"label\":\"墨脱县\",\"value\":3},{\"label\":\"波密县\",\"value\":4},{\"label\":\"察隅县\",\"value\":5},{\"label\":\"朗县\",\"value\":6},{\"label\":\"其他\",\"value\":7}]},{\"label\":\"山南地区\",\"value\":4,\"children\":[{\"label\":\"乃东县\",\"value\":0},{\"label\":\"扎囊县\",\"value\":1},{\"label\":\"贡嘎县\",\"value\":2},{\"label\":\"桑日县\",\"value\":3},{\"label\":\"琼结县\",\"value\":4},{\"label\":\"曲松县\",\"value\":5},{\"label\":\"措美县\",\"value\":6},{\"label\":\"洛扎县\",\"value\":7},{\"label\":\"加查县\",\"value\":8},{\"label\":\"隆子县\",\"value\":9},{\"label\":\"错那县\",\"value\":10},{\"label\":\"浪卡子县\",\"value\":11},{\"label\":\"其他\",\"value\":12}]},{\"label\":\"日喀则地区\",\"value\":5,\"children\":[{\"label\":\"日喀则市\",\"value\":0},{\"label\":\"南木林县\",\"value\":1},{\"label\":\"江孜县\",\"value\":2},{\"label\":\"定日县\",\"value\":3},{\"label\":\"萨迦县\",\"value\":4},{\"label\":\"拉孜县\",\"value\":5},{\"label\":\"昂仁县\",\"value\":6},{\"label\":\"谢通门县\",\"value\":7},{\"label\":\"白朗县\",\"value\":8},{\"label\":\"仁布县\",\"value\":9},{\"label\":\"康马县\",\"value\":10},{\"label\":\"定结县\",\"value\":11},{\"label\":\"仲巴县\",\"value\":12},{\"label\":\"亚东县\",\"value\":13},{\"label\":\"吉隆县\",\"value\":14},{\"label\":\"聂拉木县\",\"value\":15},{\"label\":\"萨嘎县\",\"value\":16},{\"label\":\"岗巴县\",\"value\":17},{\"label\":\"其他\",\"value\":18}]},{\"label\":\"阿里地区\",\"value\":6,\"children\":[{\"label\":\"噶尔县\",\"value\":0},{\"label\":\"普兰县\",\"value\":1},{\"label\":\"札达县\",\"value\":2},{\"label\":\"日土县\",\"value\":3},{\"label\":\"革吉县\",\"value\":4},{\"label\":\"改则县\",\"value\":5},{\"label\":\"措勤县\",\"value\":6},{\"label\":\"其他\",\"value\":7}]},{\"label\":\"其他\",\"value\":7,\"children\":[{\"label\":\"其他\",\"value\":0}]}]},{\"label\":\"陕西省\",\"value\":26,\"children\":[{\"label\":\"西安市\",\"value\":0,\"children\":[{\"label\":\"莲湖区\",\"value\":0},{\"label\":\"新城区\",\"value\":1},{\"label\":\"碑林区\",\"value\":2},{\"label\":\"雁塔区\",\"value\":3},{\"label\":\"灞桥区\",\"value\":4},{\"label\":\"未央区\",\"value\":5},{\"label\":\"阎良区\",\"value\":6},{\"label\":\"临潼区\",\"value\":7},{\"label\":\"长安区\",\"value\":8},{\"label\":\"高陵县\",\"value\":9},{\"label\":\"蓝田县\",\"value\":10},{\"label\":\"户县\",\"value\":11},{\"label\":\"周至县\",\"value\":12},{\"label\":\"其他\",\"value\":13}]},{\"label\":\"铜川市\",\"value\":1,\"children\":[{\"label\":\"耀州区\",\"value\":0},{\"label\":\"王益区\",\"value\":1},{\"label\":\"印台区\",\"value\":2},{\"label\":\"宜君县\",\"value\":3},{\"label\":\"其他\",\"value\":4}]},{\"label\":\"宝鸡市\",\"value\":2,\"children\":[{\"label\":\"渭滨区\",\"value\":0},{\"label\":\"金台区\",\"value\":1},{\"label\":\"陈仓区\",\"value\":2},{\"label\":\"岐山县\",\"value\":3},{\"label\":\"凤翔县\",\"value\":4},{\"label\":\"陇县\",\"value\":5},{\"label\":\"太白县\",\"value\":6},{\"label\":\"麟游县\",\"value\":7},{\"label\":\"扶风县\",\"value\":8},{\"label\":\"千阳县\",\"value\":9},{\"label\":\"眉县\",\"value\":10},{\"label\":\"凤县\",\"value\":11},{\"label\":\"其他\",\"value\":12}]},{\"label\":\"咸阳市\",\"value\":3,\"children\":[{\"label\":\"秦都区\",\"value\":0},{\"label\":\"渭城区\",\"value\":1},{\"label\":\"杨陵区\",\"value\":2},{\"label\":\"兴平市\",\"value\":3},{\"label\":\"礼泉县\",\"value\":4},{\"label\":\"泾阳县\",\"value\":5},{\"label\":\"永寿县\",\"value\":6},{\"label\":\"三原县\",\"value\":7},{\"label\":\"彬县\",\"value\":8},{\"label\":\"旬邑县\",\"value\":9},{\"label\":\"长武县\",\"value\":10},{\"label\":\"乾县\",\"value\":11},{\"label\":\"武功县\",\"value\":12},{\"label\":\"淳化县\",\"value\":13},{\"label\":\"其他\",\"value\":14}]},{\"label\":\"渭南市\",\"value\":4,\"children\":[{\"label\":\"临渭区\",\"value\":0},{\"label\":\"韩城市\",\"value\":1},{\"label\":\"华阴市\",\"value\":2},{\"label\":\"蒲城县\",\"value\":3},{\"label\":\"潼关县\",\"value\":4},{\"label\":\"白水县\",\"value\":5},{\"label\":\"澄城县\",\"value\":6},{\"label\":\"华县\",\"value\":7},{\"label\":\"合阳县\",\"value\":8},{\"label\":\"富平县\",\"value\":9},{\"label\":\"大荔县\",\"value\":10},{\"label\":\"其他\",\"value\":11}]},{\"label\":\"延安市\",\"value\":5,\"children\":[{\"label\":\"宝塔区\",\"value\":0},{\"label\":\"安塞县\",\"value\":1},{\"label\":\"洛川县\",\"value\":2},{\"label\":\"子长县\",\"value\":3},{\"label\":\"黄陵县\",\"value\":4},{\"label\":\"延川县\",\"value\":5},{\"label\":\"富县\",\"value\":6},{\"label\":\"延长县\",\"value\":7},{\"label\":\"甘泉县\",\"value\":8},{\"label\":\"宜川县\",\"value\":9},{\"label\":\"志丹县\",\"value\":10},{\"label\":\"黄龙县\",\"value\":11},{\"label\":\"吴起县\",\"value\":12},{\"label\":\"其他\",\"value\":13}]},{\"label\":\"汉中市\",\"value\":6,\"children\":[{\"label\":\"汉台区\",\"value\":0},{\"label\":\"留坝县\",\"value\":1},{\"label\":\"镇巴县\",\"value\":2},{\"label\":\"城固县\",\"value\":3},{\"label\":\"南郑县\",\"value\":4},{\"label\":\"洋县\",\"value\":5},{\"label\":\"宁强县\",\"value\":6},{\"label\":\"佛坪县\",\"value\":7},{\"label\":\"勉县\",\"value\":8},{\"label\":\"西乡县\",\"value\":9},{\"label\":\"略阳县\",\"value\":10},{\"label\":\"其他\",\"value\":11}]},{\"label\":\"榆林市\",\"value\":7,\"children\":[{\"label\":\"榆阳区\",\"value\":0},{\"label\":\"清涧县\",\"value\":1},{\"label\":\"绥德县\",\"value\":2},{\"label\":\"神木县\",\"value\":3},{\"label\":\"佳县\",\"value\":4},{\"label\":\"府谷县\",\"value\":5},{\"label\":\"子洲县\",\"value\":6},{\"label\":\"靖边县\",\"value\":7},{\"label\":\"横山县\",\"value\":8},{\"label\":\"米脂县\",\"value\":9},{\"label\":\"吴堡县\",\"value\":10},{\"label\":\"定边县\",\"value\":11},{\"label\":\"其他\",\"value\":12}]},{\"label\":\"安康市\",\"value\":8,\"children\":[{\"label\":\"汉滨区\",\"value\":0},{\"label\":\"紫阳县\",\"value\":1},{\"label\":\"岚皋县\",\"value\":2},{\"label\":\"旬阳县\",\"value\":3},{\"label\":\"镇坪县\",\"value\":4},{\"label\":\"平利县\",\"value\":5},{\"label\":\"石泉县\",\"value\":6},{\"label\":\"宁陕县\",\"value\":7},{\"label\":\"白河县\",\"value\":8},{\"label\":\"汉阴县\",\"value\":9},{\"label\":\"其他\",\"value\":10}]},{\"label\":\"商洛市\",\"value\":9,\"children\":[{\"label\":\"商州区\",\"value\":0},{\"label\":\"镇安县\",\"value\":1},{\"label\":\"山阳县\",\"value\":2},{\"label\":\"洛南县\",\"value\":3},{\"label\":\"商南县\",\"value\":4},{\"label\":\"丹凤县\",\"value\":5},{\"label\":\"柞水县\",\"value\":6},{\"label\":\"其他\",\"value\":7}]},{\"label\":\"其他\",\"value\":10,\"children\":[{\"label\":\"其他\",\"value\":0}]}]},{\"label\":\"甘肃省\",\"value\":27,\"children\":[{\"label\":\"兰州市\",\"value\":0,\"children\":[{\"label\":\"城关区\",\"value\":0},{\"label\":\"七里河区\",\"value\":1},{\"label\":\"西固区\",\"value\":2},{\"label\":\"安宁区\",\"value\":3},{\"label\":\"红古区\",\"value\":4},{\"label\":\"永登县\",\"value\":5},{\"label\":\"皋兰县\",\"value\":6},{\"label\":\"榆中县\",\"value\":7},{\"label\":\"其他\",\"value\":8}]},{\"label\":\"嘉峪关市\",\"value\":1,\"children\":[{\"label\":\"嘉峪关市\",\"value\":0},{\"label\":\"其他\",\"value\":1}]},{\"label\":\"金昌市\",\"value\":2,\"children\":[{\"label\":\"金川区\",\"value\":0},{\"label\":\"永昌县\",\"value\":1},{\"label\":\"其他\",\"value\":2}]},{\"label\":\"白银市\",\"value\":3,\"children\":[{\"label\":\"白银区\",\"value\":0},{\"label\":\"平川区\",\"value\":1},{\"label\":\"靖远县\",\"value\":2},{\"label\":\"会宁县\",\"value\":3},{\"label\":\"景泰县\",\"value\":4},{\"label\":\"其他\",\"value\":5}]},{\"label\":\"天水市\",\"value\":4,\"children\":[{\"label\":\"清水县\",\"value\":0},{\"label\":\"秦安县\",\"value\":1},{\"label\":\"甘谷县\",\"value\":2},{\"label\":\"武山县\",\"value\":3},{\"label\":\"张家川回族自治县\",\"value\":4},{\"label\":\"北道区\",\"value\":5},{\"label\":\"秦城区\",\"value\":6},{\"label\":\"其他\",\"value\":7}]},{\"label\":\"武威市\",\"value\":5,\"children\":[{\"label\":\"凉州区\",\"value\":0},{\"label\":\"民勤县\",\"value\":1},{\"label\":\"古浪县\",\"value\":2},{\"label\":\"天祝藏族自治县\",\"value\":3},{\"label\":\"其他\",\"value\":4}]},{\"label\":\"酒泉市\",\"value\":6,\"children\":[{\"label\":\"肃州区\",\"value\":0},{\"label\":\"玉门市\",\"value\":1},{\"label\":\"敦煌市\",\"value\":2},{\"label\":\"金塔县\",\"value\":3},{\"label\":\"肃北蒙古族自治县\",\"value\":4},{\"label\":\"阿克塞哈萨克族自治县\",\"value\":5},{\"label\":\"安西县\",\"value\":6},{\"label\":\"其他\",\"value\":7}]},{\"label\":\"张掖市\",\"value\":7,\"children\":[{\"label\":\"甘州区\",\"value\":0},{\"label\":\"民乐县\",\"value\":1},{\"label\":\"临泽县\",\"value\":2},{\"label\":\"高台县\",\"value\":3},{\"label\":\"山丹县\",\"value\":4},{\"label\":\"肃南裕固族自治县\",\"value\":5},{\"label\":\"其他\",\"value\":6}]},{\"label\":\"庆阳市\",\"value\":8,\"children\":[{\"label\":\"西峰区\",\"value\":0},{\"label\":\"庆城县\",\"value\":1},{\"label\":\"环县\",\"value\":2},{\"label\":\"华池县\",\"value\":3},{\"label\":\"合水县\",\"value\":4},{\"label\":\"正宁县\",\"value\":5},{\"label\":\"宁县\",\"value\":6},{\"label\":\"镇原县\",\"value\":7},{\"label\":\"其他\",\"value\":8}]},{\"label\":\"平凉市\",\"value\":9,\"children\":[{\"label\":\"崆峒区\",\"value\":0},{\"label\":\"泾川县\",\"value\":1},{\"label\":\"灵台县\",\"value\":2},{\"label\":\"崇信县\",\"value\":3},{\"label\":\"华亭县\",\"value\":4},{\"label\":\"庄浪县\",\"value\":5},{\"label\":\"静宁县\",\"value\":6},{\"label\":\"其他\",\"value\":7}]},{\"label\":\"定西市\",\"value\":10,\"children\":[{\"label\":\"安定区\",\"value\":0},{\"label\":\"通渭县\",\"value\":1},{\"label\":\"临洮县\",\"value\":2},{\"label\":\"漳县\",\"value\":3},{\"label\":\"岷县\",\"value\":4},{\"label\":\"渭源县\",\"value\":5},{\"label\":\"陇西县\",\"value\":6},{\"label\":\"其他\",\"value\":7}]},{\"label\":\"陇南市\",\"value\":11,\"children\":[{\"label\":\"武都区\",\"value\":0},{\"label\":\"成县\",\"value\":1},{\"label\":\"宕昌县\",\"value\":2},{\"label\":\"康县\",\"value\":3},{\"label\":\"文县\",\"value\":4},{\"label\":\"西和县\",\"value\":5},{\"label\":\"礼县\",\"value\":6},{\"label\":\"两当县\",\"value\":7},{\"label\":\"徽县\",\"value\":8},{\"label\":\"其他\",\"value\":9}]},{\"label\":\"临夏回族自治州\",\"value\":12,\"children\":[{\"label\":\"临夏市\",\"value\":0},{\"label\":\"临夏县\",\"value\":1},{\"label\":\"康乐县\",\"value\":2},{\"label\":\"永靖县\",\"value\":3},{\"label\":\"广河县\",\"value\":4},{\"label\":\"和政县\",\"value\":5},{\"label\":\"东乡族自治县\",\"value\":6},{\"label\":\"积石山保安族东乡族撒拉族自治县\",\"value\":7},{\"label\":\"其他\",\"value\":8}]},{\"label\":\"甘南藏族自治州\",\"value\":13,\"children\":[{\"label\":\"合作市\",\"value\":0},{\"label\":\"临潭县\",\"value\":1},{\"label\":\"卓尼县\",\"value\":2},{\"label\":\"舟曲县\",\"value\":3},{\"label\":\"迭部县\",\"value\":4},{\"label\":\"玛曲县\",\"value\":5},{\"label\":\"碌曲县\",\"value\":6},{\"label\":\"夏河县\",\"value\":7},{\"label\":\"其他\",\"value\":8}]},{\"label\":\"其他\",\"value\":14,\"children\":[{\"label\":\"其他\",\"value\":0}]}]},{\"label\":\"青海省\",\"value\":28,\"children\":[{\"label\":\"西宁市\",\"value\":0,\"children\":[{\"label\":\"城中区\",\"value\":0},{\"label\":\"城东区\",\"value\":1},{\"label\":\"城西区\",\"value\":2},{\"label\":\"城北区\",\"value\":3},{\"label\":\"湟源县\",\"value\":4},{\"label\":\"湟中县\",\"value\":5},{\"label\":\"大通回族土族自治县\",\"value\":6},{\"label\":\"其他\",\"value\":7}]},{\"label\":\"海东地区\",\"value\":1,\"children\":[{\"label\":\"平安县\",\"value\":0},{\"label\":\"乐都县\",\"value\":1},{\"label\":\"民和回族土族自治县\",\"value\":2},{\"label\":\"互助土族自治县\",\"value\":3},{\"label\":\"化隆回族自治县\",\"value\":4},{\"label\":\"循化撒拉族自治县\",\"value\":5},{\"label\":\"其他\",\"value\":6}]},{\"label\":\"海北藏族自治州\",\"value\":2,\"children\":[{\"label\":\"海晏县\",\"value\":0},{\"label\":\"祁连县\",\"value\":1},{\"label\":\"刚察县\",\"value\":2},{\"label\":\"门源回族自治县\",\"value\":3},{\"label\":\"其他\",\"value\":4}]},{\"label\":\"海南藏族自治州\",\"value\":3,\"children\":[{\"label\":\"共和县\",\"value\":0},{\"label\":\"同德县\",\"value\":1},{\"label\":\"贵德县\",\"value\":2},{\"label\":\"兴海县\",\"value\":3},{\"label\":\"贵南县\",\"value\":4},{\"label\":\"其他\",\"value\":5}]},{\"label\":\"黄南藏族自治州\",\"value\":4,\"children\":[{\"label\":\"同仁县\",\"value\":0},{\"label\":\"尖扎县\",\"value\":1},{\"label\":\"泽库县\",\"value\":2},{\"label\":\"河南蒙古族自治县\",\"value\":3},{\"label\":\"其他\",\"value\":4}]},{\"label\":\"果洛藏族自治州\",\"value\":5,\"children\":[{\"label\":\"玛沁县\",\"value\":0},{\"label\":\"班玛县\",\"value\":1},{\"label\":\"甘德县\",\"value\":2},{\"label\":\"达日县\",\"value\":3},{\"label\":\"久治县\",\"value\":4},{\"label\":\"玛多县\",\"value\":5},{\"label\":\"其他\",\"value\":6}]},{\"label\":\"玉树藏族自治州\",\"value\":6,\"children\":[{\"label\":\"玉树县\",\"value\":0},{\"label\":\"杂多县\",\"value\":1},{\"label\":\"称多县\",\"value\":2},{\"label\":\"治多县\",\"value\":3},{\"label\":\"囊谦县\",\"value\":4},{\"label\":\"曲麻莱县\",\"value\":5},{\"label\":\"其他\",\"value\":6}]},{\"label\":\"海西蒙古族藏族自治州\",\"value\":7,\"children\":[{\"label\":\"德令哈市\",\"value\":0},{\"label\":\"格尔木市\",\"value\":1},{\"label\":\"乌兰县\",\"value\":2},{\"label\":\"都兰县\",\"value\":3},{\"label\":\"天峻县\",\"value\":4},{\"label\":\"其他\",\"value\":5}]},{\"label\":\"其他\",\"value\":8,\"children\":[{\"label\":\"其他\",\"value\":0}]}]},{\"label\":\"宁夏\",\"value\":29,\"children\":[{\"label\":\"银川市\",\"value\":0,\"children\":[{\"label\":\"兴庆区\",\"value\":0},{\"label\":\"西夏区\",\"value\":1},{\"label\":\"金凤区\",\"value\":2},{\"label\":\"灵武市\",\"value\":3},{\"label\":\"永宁县\",\"value\":4},{\"label\":\"贺兰县\",\"value\":5},{\"label\":\"其他\",\"value\":6}]},{\"label\":\"石嘴山市\",\"value\":1,\"children\":[{\"label\":\"大武口区\",\"value\":0},{\"label\":\"惠农区\",\"value\":1},{\"label\":\"平罗县\",\"value\":2},{\"label\":\"其他\",\"value\":3}]},{\"label\":\"吴忠市\",\"value\":2,\"children\":[{\"label\":\"利通区\",\"value\":0},{\"label\":\"青铜峡市\",\"value\":1},{\"label\":\"盐池县\",\"value\":2},{\"label\":\"同心县\",\"value\":3},{\"label\":\"其他\",\"value\":4}]},{\"label\":\"固原市\",\"value\":3,\"children\":[{\"label\":\"原州区\",\"value\":0},{\"label\":\"西吉县\",\"value\":1},{\"label\":\"隆德县\",\"value\":2},{\"label\":\"泾源县\",\"value\":3},{\"label\":\"彭阳县\",\"value\":4},{\"label\":\"其他\",\"value\":5}]},{\"label\":\"中卫市\",\"value\":4,\"children\":[{\"label\":\"沙坡头区\",\"value\":0},{\"label\":\"中宁县\",\"value\":1},{\"label\":\"海原县\",\"value\":2},{\"label\":\"其他\",\"value\":3}]},{\"label\":\"其他\",\"value\":5,\"children\":[{\"label\":\"其他\",\"value\":0}]}]},{\"label\":\"新疆\",\"value\":30,\"children\":[{\"label\":\"乌鲁木齐市\",\"value\":0,\"children\":[{\"label\":\"天山区\",\"value\":0},{\"label\":\"沙依巴克区\",\"value\":1},{\"label\":\"新市区\",\"value\":2},{\"label\":\"水磨沟区\",\"value\":3},{\"label\":\"头屯河区\",\"value\":4},{\"label\":\"达坂城区\",\"value\":5},{\"label\":\"东山区\",\"value\":6},{\"label\":\"乌鲁木齐县\",\"value\":7},{\"label\":\"其他\",\"value\":8}]},{\"label\":\"克拉玛依市\",\"value\":1,\"children\":[{\"label\":\"克拉玛依区\",\"value\":0},{\"label\":\"独山子区\",\"value\":1},{\"label\":\"白碱滩区\",\"value\":2},{\"label\":\"乌尔禾区\",\"value\":3},{\"label\":\"其他\",\"value\":4}]},{\"label\":\"吐鲁番地区\",\"value\":2,\"children\":[{\"label\":\"吐鲁番市\",\"value\":0},{\"label\":\"托克逊县\",\"value\":1},{\"label\":\"鄯善县\",\"value\":2},{\"label\":\"其他\",\"value\":3}]},{\"label\":\"哈密地区\",\"value\":3,\"children\":[{\"label\":\"哈密市\",\"value\":0},{\"label\":\"伊吾县\",\"value\":1},{\"label\":\"巴里坤哈萨克自治县\",\"value\":2},{\"label\":\"其他\",\"value\":3}]},{\"label\":\"和田地区\",\"value\":4,\"children\":[{\"label\":\"和田市\",\"value\":0},{\"label\":\"和田县\",\"value\":1},{\"label\":\"洛浦县\",\"value\":2},{\"label\":\"民丰县\",\"value\":3},{\"label\":\"皮山县\",\"value\":4},{\"label\":\"策勒县\",\"value\":5},{\"label\":\"于田县\",\"value\":6},{\"label\":\"墨玉县\",\"value\":7},{\"label\":\"其他\",\"value\":8}]},{\"label\":\"阿克苏地区\",\"value\":5,\"children\":[{\"label\":\"阿克苏市\",\"value\":0},{\"label\":\"温宿县\",\"value\":1},{\"label\":\"沙雅县\",\"value\":2},{\"label\":\"拜城县\",\"value\":3},{\"label\":\"阿瓦提县\",\"value\":4},{\"label\":\"库车县\",\"value\":5},{\"label\":\"柯坪县\",\"value\":6},{\"label\":\"新和县\",\"value\":7},{\"label\":\"乌什县\",\"value\":8},{\"label\":\"其他\",\"value\":9}]},{\"label\":\"喀什地区\",\"value\":6,\"children\":[{\"label\":\"喀什市\",\"value\":0},{\"label\":\"巴楚县\",\"value\":1},{\"label\":\"泽普县\",\"value\":2},{\"label\":\"伽师县\",\"value\":3},{\"label\":\"叶城县\",\"value\":4},{\"label\":\"岳普湖县\",\"value\":5},{\"label\":\"疏勒县\",\"value\":6},{\"label\":\"麦盖提县\",\"value\":7},{\"label\":\"英吉沙县\",\"value\":8},{\"label\":\"莎车县\",\"value\":9},{\"label\":\"疏附县\",\"value\":10},{\"label\":\"塔什库尔干塔吉克自治县\",\"value\":11},{\"label\":\"其他\",\"value\":12}]},{\"label\":\"克孜勒苏柯尔克孜自治州\",\"value\":7,\"children\":[{\"label\":\"阿图什市\",\"value\":0},{\"label\":\"阿合奇县\",\"value\":1},{\"label\":\"乌恰县\",\"value\":2},{\"label\":\"阿克陶县\",\"value\":3},{\"label\":\"其他\",\"value\":4}]},{\"label\":\"巴音郭楞蒙古自治州\",\"value\":8,\"children\":[{\"label\":\"库尔勒市\",\"value\":0},{\"label\":\"和静县\",\"value\":1},{\"label\":\"尉犁县\",\"value\":2},{\"label\":\"和硕县\",\"value\":3},{\"label\":\"且末县\",\"value\":4},{\"label\":\"博湖县\",\"value\":5},{\"label\":\"轮台县\",\"value\":6},{\"label\":\"若羌县\",\"value\":7},{\"label\":\"焉耆回族自治县\",\"value\":8},{\"label\":\"其他\",\"value\":9}]},{\"label\":\"昌吉回族自治州\",\"value\":9,\"children\":[{\"label\":\"昌吉市\",\"value\":0},{\"label\":\"阜康市\",\"value\":1},{\"label\":\"奇台县\",\"value\":2},{\"label\":\"玛纳斯县\",\"value\":3},{\"label\":\"吉木萨尔县\",\"value\":4},{\"label\":\"呼图壁县\",\"value\":5},{\"label\":\"木垒哈萨克自治县\",\"value\":6},{\"label\":\"米泉市\",\"value\":7},{\"label\":\"其他\",\"value\":8}]},{\"label\":\"博尔塔拉蒙古自治州\",\"value\":10,\"children\":[{\"label\":\"博乐市\",\"value\":0},{\"label\":\"精河县\",\"value\":1},{\"label\":\"温泉县\",\"value\":2},{\"label\":\"其他\",\"value\":3}]},{\"label\":\"石河子\",\"value\":11,\"children\":[{\"label\":\"石河子\",\"value\":0}]},{\"label\":\"阿拉尔\",\"value\":12,\"children\":[{\"label\":\"阿拉尔\",\"value\":0}]},{\"label\":\"图木舒克\",\"value\":13,\"children\":[{\"label\":\"图木舒克\",\"value\":0}]},{\"label\":\"五家渠\",\"value\":14,\"children\":[{\"label\":\"五家渠\",\"value\":0}]},{\"label\":\"伊犁哈萨克自治州\",\"value\":15,\"children\":[{\"label\":\"伊宁市\",\"value\":0},{\"label\":\"奎屯市\",\"value\":1},{\"label\":\"伊宁县\",\"value\":2},{\"label\":\"特克斯县\",\"value\":3},{\"label\":\"尼勒克县\",\"value\":4},{\"label\":\"昭苏县\",\"value\":5},{\"label\":\"新源县\",\"value\":6},{\"label\":\"霍城县\",\"value\":7},{\"label\":\"巩留县\",\"value\":8},{\"label\":\"察布查尔锡伯自治县\",\"value\":9},{\"label\":\"塔城地区\",\"value\":10},{\"label\":\"阿勒泰地区\",\"value\":11},{\"label\":\"其他\",\"value\":12}]},{\"label\":\"其他\",\"value\":16,\"children\":[{\"label\":\"其他\",\"value\":0}]}]},{\"label\":\"台湾省\",\"value\":31,\"children\":[{\"label\":\"台北市\",\"value\":0,\"children\":[{\"label\":\"内湖区\",\"value\":0},{\"label\":\"南港区\",\"value\":1},{\"label\":\"中正区\",\"value\":2},{\"label\":\"万华区\",\"value\":3},{\"label\":\"大同区\",\"value\":4},{\"label\":\"中山区\",\"value\":5},{\"label\":\"松山区\",\"value\":6},{\"label\":\"大安区\",\"value\":7},{\"label\":\"信义区\",\"value\":8},{\"label\":\"文山区\",\"value\":9},{\"label\":\"士林区\",\"value\":10},{\"label\":\"北投区\",\"value\":11}]},{\"label\":\"新北市\",\"value\":1,\"children\":[{\"label\":\"板桥区\",\"value\":0},{\"label\":\"汐止区\",\"value\":1},{\"label\":\"新店区\",\"value\":2},{\"label\":\"其他\",\"value\":3}]},{\"label\":\"桃园市\",\"value\":2,\"children\":[{\"label\":\"其他\",\"value\":0}]},{\"label\":\"台中市\",\"value\":3,\"children\":[{\"label\":\"其他\",\"value\":0}]},{\"label\":\"台南市\",\"value\":4,\"children\":[{\"label\":\"其他\",\"value\":0}]},{\"label\":\"高雄市\",\"value\":5,\"children\":[{\"label\":\"其他\",\"value\":0}]}]},{\"label\":\"澳门\",\"value\":32,\"children\":[{\"label\":\"澳门\",\"value\":0,\"children\":[{\"label\":\"花地玛堂区\",\"value\":0},{\"label\":\"圣安多尼堂区\",\"value\":1},{\"label\":\"大堂区\",\"value\":2},{\"label\":\"望德堂区\",\"value\":3},{\"label\":\"风顺堂区\",\"value\":4},{\"label\":\"嘉模堂区\",\"value\":5},{\"label\":\"圣方济各堂区\",\"value\":6},{\"label\":\"路凼\",\"value\":7},{\"label\":\"其他\",\"value\":8}]}]},{\"label\":\"香港\",\"value\":33,\"children\":[{\"label\":\"香港\",\"value\":0,\"children\":[{\"label\":\"深水埗区\",\"value\":0},{\"label\":\"油尖旺区\",\"value\":1},{\"label\":\"九龙城区\",\"value\":2},{\"label\":\"黄大仙区\",\"value\":3},{\"label\":\"观塘区\",\"value\":4},{\"label\":\"北区\",\"value\":5},{\"label\":\"大埔区\",\"value\":6},{\"label\":\"沙田区\",\"value\":7},{\"label\":\"西贡区\",\"value\":8},{\"label\":\"元朗区\",\"value\":9},{\"label\":\"屯门区\",\"value\":10},{\"label\":\"荃湾区\",\"value\":11},{\"label\":\"葵青区\",\"value\":12},{\"label\":\"离岛区\",\"value\":13},{\"label\":\"中西区\",\"value\":14},{\"label\":\"湾仔区\",\"value\":15},{\"label\":\"东区\",\"value\":16},{\"label\":\"南区\",\"value\":17},{\"label\":\"其他\",\"value\":18}]}]}]");

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map