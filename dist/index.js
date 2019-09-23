(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (factory((global.ReModulex = {}),global.React));
}(this, (function (exports,React) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

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

  var defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

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

  var objectWithoutProperties = function (obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  // 值类型判断 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  var isUndefined = function isUndefined(val) {
    return typeof val === 'undefined';
  };

  var isNull = function isNull(val) {
    return val === null;
  };

  var isFunction = function isFunction(val) {
    return typeof val === 'function';
  };

  var isArray = function isArray(val) {
    return val instanceof Array;
  };

  var isObject = function isObject(val) {
    return (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && !(isArray(val) || isNull(val));
  };

  var isString = function isString(val) {
    return typeof val === 'string';
  };

  var get$1 = function get(obj) {
    var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var defaultValue = arguments[2];

    try {
      var result = (isString(keys) ? keys.split('.') : keys).reduce(function (res, key) {
        return res[key];
      }, obj);
      return isUndefined(result) ? defaultValue : result;
    } catch (e) {
      return defaultValue;
    }
  };

  var run = function run(obj) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    keys = isString(keys) ? keys.split('.') : keys;

    var func = get$1(obj, keys);
    var context = get$1(obj, keys.slice(0, -1));

    return isFunction(func) ? func.call.apply(func, [context].concat(args)) : func;
  };

  var value = function value() {
    for (var _len2 = arguments.length, values = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      values[_key2] = arguments[_key2];
    }

    return values.reduce(function (value, nextValue) {
      return isUndefined(value) ? run(nextValue) : run(value);
    }, undefined);
  };

  var conf = {
    silent: false
  };

  var config = function config(_config) {
    conf = _extends({}, conf, _config);
  };

  var check = function check(fn) {
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (conf.silent) {
        return;
      }

      return run.apply(undefined, [fn, undefined].concat(args));
    };
  };

  var warn = check(console.warn);
  var error = check(console.error);

  /**
   * [缓存函数结果]
   * @param {Function} fn 被处理的函数
   */
  var memoize = function memoize(fn) {
    var cache = new Map();
    var memoized = function memoized(param) {
      if (cache.has(param)) {
        return cache.get(param);
      }

      for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        rest[_key - 1] = arguments[_key];
      }

      var result = fn.call.apply(fn, [this, param].concat(rest));

      cache.set(param, result);
      return result;
    };

    memoized.cache = cache;
    return memoized;
  };

  var pickBy = function pickBy(obj) {
    var predicate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (val) {
      return val;
    };
    return Object.entries(obj).filter(function (_ref) {
      var _ref2 = slicedToArray(_ref, 2),
          key = _ref2[0],
          value$$1 = _ref2[1];

      return run(predicate, undefined, value$$1, key);
    }).reduce(function (res, _ref3) {
      var _ref4 = slicedToArray(_ref3, 2),
          key = _ref4[0],
          value$$1 = _ref4[1];

      return _extends({}, res, defineProperty({}, key, value$$1));
    }, {});
  };

  /**
   * [过滤对象属性] 挑选处一个对象中的指定属性
   * @param {Object} obj 数据源对象
   * @param {Array} keys
   */
  var pick = function pick(obj) {
    var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Object.keys(obj);
    return pickBy(obj, function (value$$1, key) {
      return keys.includes(key);
    });
  };

  var __modules = {};

  var getModules = function getModules() {
    return __modules;
  };
  var hasModule = function hasModule(name) {
    return !!__modules[name];
  };
  var saveModule = function saveModule(name, module) {
    __modules[name] = module;
  };
  var mapModules = function mapModules(modulesGetter, storeState) {
    if (isArray(modulesGetter)) {
      var moduleNames = [].concat(toConsumableArray(modulesGetter));
      modulesGetter = function modulesGetter(modules) {
        return pick(modules, moduleNames);
      };
    }

    var modules = value(run(modulesGetter, undefined, getModules()), {});

    return Object.entries(modules).reduce(function (res, _ref) {
      var _ref2 = slicedToArray(_ref, 2),
          name = _ref2[0],
          _ref2$ = _ref2[1],
          dispatch = _ref2$.dispatch,
          commit = _ref2$.commit,
          compute = _ref2$.compute,
          getState = _ref2$.getState,
          getComputed = _ref2$.getComputed;

      return _extends({}, res, defineProperty({}, name, value(function () {
        var state = getState(storeState);

        return {
          getState: getState,
          getComputed: getComputed,
          dispatch: dispatch,
          commit: commit,
          state: state,
          getters: getComputed()
        };
      })));
    }, {});
  };

  var __store = void 0;

  var check$1 = function check(fn) {
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (!__store) {
        error('[ReModulex Error] Forgot to apply the store? Use "applyStore" with your redux store!');
      }
      return run.apply(undefined, [fn, undefined].concat(args));
    };
  };

  var applyStore = function applyStore(store) {
    __store = store;
  };

  var getStore = check$1(function () {
    return __store;
  });
  var dispatch = check$1(function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return run.apply(undefined, [__store, 'dispatch'].concat(args));
  });
  var getState = check$1(function () {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return run.apply(undefined, [__store, 'getState'].concat(args));
  });

  var __splitter = 'Y(^_^)Y';

  var combine = function combine() {
    for (var _len = arguments.length, actions = Array(_len), _key = 0; _key < _len; _key++) {
      actions[_key] = arguments[_key];
    }

    return actions.join(__splitter);
  };
  var split = function split(types, reducer) {
    return types.split(__splitter).reduce(function (actions, type) {
      return _extends({}, actions, defineProperty({}, type, reducer));
    }, {});
  };

  var SCOPE_NAME = 'RE_MODULEX_SCOPE';

  // 很抱歉...我是一个懒人...注释什么的...等有空再加 >_<

  var ReModulex = function ReModulex(_ref) {
    var _this = this;

    var name = _ref.name,
        __initialState = _ref.state,
        config$$1 = objectWithoutProperties(_ref, ['name', 'state']);
    classCallCheck(this, ReModulex);

    _initialiseProps.call(this);

    if (hasModule(name)) {
      warn('[Creating ReModulex Waring] Module named "${name}" redefined');
    }

    if (!isObject(__initialState)) {
      throw new Error('[Creating ReModulex Error] Initial state must be an Object!');
    }

    var __actionTypePrefix = name + '::';
    var initialState = _extends({
      __ReModulexName: name
    }, __initialState);
    var __getMutationsState = Object.entries(run(config$$1, 'mutations', {
      combine: combine
    })).reduce(function (mutations, _ref2) {
      var _ref3 = slicedToArray(_ref2, 2),
          actionType = _ref3[0],
          reducer = _ref3[1];

      return _extends({}, mutations, split(actionType, reducer));
    }, {});

    var __mutations = Object.entries(__getMutationsState).reduce(function (mutations, _ref4) {
      var _ref5 = slicedToArray(_ref4, 2),
          type = _ref5[0],
          func = _ref5[1];

      return _extends({}, mutations, defineProperty({}, type, function (payload) {
        return dispatch({
          type: '' + __actionTypePrefix + type,
          payload: payload
        });
      }));
    }, {});

    var __actions = run(config$$1, 'actions', {
      getStore: getStore,
      getModules: getModules,
      getStoreState: getState,
      getRootState: getState,
      dispatch: this.dispatch,
      commit: this.commit,
      getState: this.getState,
      getComputed: this.getComputed
    });

    saveModule(name, Object.assign(this, {
      name: name,
      getters: run(config$$1, 'getters', {
        compute: function compute(name) {
          return run(_this.computeSingleState, undefined, name);
        }
      }) || {},
      actions: __actions,
      mutations: __mutations,
      reducer: function reducer() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
        var _ref6 = arguments[1];
        var type = _ref6.type,
            payload = _ref6.payload;

        if (!type.startsWith(__actionTypePrefix)) {
          return state;
        }

        var nextState = _extends({}, state, run(__getMutationsState, type.replace(__actionTypePrefix, ''), state, payload));
        var getters = _this.compute(nextState);
        _this.__getters = getters;

        return _extends({}, nextState, {
          _getters: getters
        });
      }
    }));
    Object.assign(this.dispatch, __actions);
    Object.assign(this.commit, __mutations);
  };

  var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.dispatch = function () {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var actionName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return run.apply(undefined, [_this2.actions, actionName.split('/')].concat(args));
    };

    this.commit = function () {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var payload = arguments[1];
      return run(_this2.mutations, type, payload);
    };

    this.compute = function (state) {
      var compute = memoize(function (name) {
        return run(_this2.getters, name, state, compute);
      });
      _this2.computeSingleState = compute;

      return Object.keys(_this2.getters).reduce(function (getters, name) {
        return _extends({}, getters, defineProperty({}, name, compute(name)));
      }, {});
    };

    this.getState = function () {
      var storeState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getState();

      if (!storeState) {
        return {};
      }

      if (storeState.__ReModulexName === _this2.name) {
        return storeState;
      }

      var __cacheState = get$1(storeState, _this2.__storeKeyCache);
      if (get$1(__cacheState, '__ReModulexName') === _this2.name) {
        return __cacheState;
      }

      if (SCOPE_NAME in storeState) {
        var _ref7 = Object.entries(storeState[SCOPE_NAME]).find(function (_ref9) {
          var _ref10 = slicedToArray(_ref9, 2),
              key = _ref10[0],
              state = _ref10[1];

          return get$1(state, '__ReModulexName') === _this2.name;
        }) || [],
            _ref8 = slicedToArray(_ref7, 2),
            _storeKey = _ref8[0],
            _moduleState = _ref8[1];

        if (_moduleState) {
          _this2.__storeKeyCache = SCOPE_NAME + '.' + _storeKey;
          return _moduleState;
        }
      }

      var _ref11 = Object.entries(storeState).find(function (_ref13) {
        var _ref14 = slicedToArray(_ref13, 2),
            key = _ref14[0],
            state = _ref14[1];

        return get$1(state, '__ReModulexName') === _this2.name;
      }) || [],
          _ref12 = slicedToArray(_ref11, 2),
          storeKey = _ref12[0],
          moduleState = _ref12[1];

      _this2.__storeKeyCache = storeKey;
      return moduleState;
    };

    this.getComputed = function () {
      if (_this2.__getters) {
        return _this2.__getters;
      }

      var state = _this2.getState();
      var getters = _this2.compute(state);
      _this2.__getters = getters;

      return getters;
    };
  };

  /**
   * Copyright 2015, Yahoo! Inc.
   * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
   */
  var REACT_STATICS = {
      childContextTypes: true,
      contextTypes: true,
      defaultProps: true,
      displayName: true,
      getDefaultProps: true,
      getDerivedStateFromProps: true,
      mixins: true,
      propTypes: true,
      type: true
  };

  var KNOWN_STATICS = {
      name: true,
      length: true,
      prototype: true,
      caller: true,
      callee: true,
      arguments: true,
      arity: true
  };

  var defineProperty$1 = Object.defineProperty;
  var getOwnPropertyNames = Object.getOwnPropertyNames;
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var getPrototypeOf = Object.getPrototypeOf;
  var objectPrototype = getPrototypeOf && getPrototypeOf(Object);

  function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
      if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components

          if (objectPrototype) {
              var inheritedComponent = getPrototypeOf(sourceComponent);
              if (inheritedComponent && inheritedComponent !== objectPrototype) {
                  hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
              }
          }

          var keys = getOwnPropertyNames(sourceComponent);

          if (getOwnPropertySymbols) {
              keys = keys.concat(getOwnPropertySymbols(sourceComponent));
          }

          for (var i = 0; i < keys.length; ++i) {
              var key = keys[i];
              if (!REACT_STATICS[key] && !KNOWN_STATICS[key] && (!blacklist || !blacklist[key])) {
                  var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                  try { // Avoid failures from read-only properties
                      defineProperty$1(targetComponent, key, descriptor);
                  } catch (e) {}
              }
          }

          return targetComponent;
      }

      return targetComponent;
  }

  var hoistNonReactStatics_cjs = hoistNonReactStatics;

  var ReModulexContext = value(function () {
    try {
      return React.createContext();
    } catch (error$$1) {
      warn('[ReModulex Environment Waring] "createContext" API is not supported by your React version. "ModuleProvider" and "connectModules" would NOT effect. Use "applyStore" and "mapModules" with "Provider" and "connect" in react-redux instead.');
      return {
        Provider: function Provider(_ref) {
          var children = _ref.children;
          return run(children);
        },
        Consumer: function Consumer(_ref2) {
          var children = _ref2.children;
          return run(children);
        }
      };
    }
  });

  var Provider = ReModulexContext.Provider,
      Consumer = ReModulexContext.Consumer;


  var ModuleProvider = function (_Component) {
    inherits(ModuleProvider, _Component);

    function ModuleProvider(props) {
      var _ref3;

      classCallCheck(this, ModuleProvider);
      var store = props.store;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var _this = possibleConstructorReturn(this, (_ref3 = ModuleProvider.__proto__ || Object.getPrototypeOf(ModuleProvider)).call.apply(_ref3, [this, props].concat(args)));

      _this.state = _this.props.store.getState();

      applyStore(store);
      _this.unsubscibe = store.subscribe(function () {
        return _this.setState(_this.props.store.getState());
      });
      return _this;
    }

    createClass(ModuleProvider, [{
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        run(this.unsubscibe);
      }
    }, {
      key: 'render',
      value: function render() {
        return React__default.createElement(
          Provider,
          { value: this.state },
          this.props.children
        );
      }
    }]);
    return ModuleProvider;
  }(React.Component);

  var connectModules = function connectModules(modulesGetter) {
    return function (Component) {
      var C = React.forwardRef(function (props, ref) {
        return React__default.createElement(
          Consumer,
          null,
          function (storeState) {
            return React__default.createElement(Component, _extends({}, props, mapModules(modulesGetter, storeState), { ref: ref }));
          }
        );
      });

      C.displayName = 'HOC-ReModulex(' + value(Component.displayName, Component.name) + ')';

      return hoistNonReactStatics_cjs(C, Component);
    };
  };

  var useModules = function useModules(modulesGetter) {
    if (!isFunction(React.useContext)) {
      return warn('[ReModulex Environment Waring] "useContext" API is not supported by your React version. YOU CAN NOT use "useModules" api unless upgrade React');
    }

    var storeState = React.useContext(ReModulexContext);

    return mapModules(modulesGetter, storeState);
  };

  var useModule = function useModule(moduleName) {
    return get$1(useModules([moduleName]), moduleName);
  };

  var createModule = function createModule() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return new (Function.prototype.bind.apply(ReModulex, [null].concat(args)))();
  };

  exports.default = ReModulex;
  exports.createModule = createModule;
  exports.SCOPE_NAME = SCOPE_NAME;
  exports.configLogger = config;
  exports.mapModules = mapModules;
  exports.getModules = getModules;
  exports.hasModule = hasModule;
  exports.applyStore = applyStore;
  exports.ModuleProvider = ModuleProvider;
  exports.connectModules = connectModules;
  exports.useModules = useModules;
  exports.useModule = useModule;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
