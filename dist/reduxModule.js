'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

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

var defineProperty = Object.defineProperty;
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
                    defineProperty(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }

        return targetComponent;
    }

    return targetComponent;
}

var hoistNonReactStatics_cjs = hoistNonReactStatics;

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

// 值类型判断 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var isUndefined = function isUndefined(val) {
  return typeof val === 'undefined';
};

var isFunction = function isFunction(val) {
  return typeof val === 'function';
};

var isString = function isString(val) {
  return typeof val === 'string';
};
// 值类型判断 -------------------------------------------------------------

var get = function get(obj) {
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

  var func = get(obj, keys);
  var context = get(obj, keys.slice(0, -1));

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

var __redux__store = {};

var applyStore = function applyStore(store) {
  Object.assign(__redux__store, store);
};

var dispatch = function dispatch() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return run.apply(undefined, [__redux__store, 'dispatch'].concat(args));
};
var getState = function getState() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return run.apply(undefined, [__redux__store, 'getState'].concat(args));
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

var defineProperty$1 = function (obj, key, value) {
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

var _React$createContext = React__default.createContext(),
    Provider = _React$createContext.Provider,
    Consumer = _React$createContext.Consumer;

var ModuleProvider = function (_Component) {
  inherits(ModuleProvider, _Component);

  function ModuleProvider() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, ModuleProvider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = ModuleProvider.__proto__ || Object.getPrototypeOf(ModuleProvider)).call.apply(_ref, [this].concat(args))), _this), _this.state = _this.props.store.getState(), _this.listener = function () {
      return _this.setState(_this.props.store.getState());
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ModuleProvider, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var store = this.props.store;


      applyStore(store);
      this.unsubscibe = store.subscribe(this.listener);
    }
  }, {
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
    var C = function C(props) {
      return React__default.createElement(
        Consumer,
        null,
        function (storeState) {
          return React__default.createElement(Component, _extends({}, props, Object.entries(value(run(modulesGetter, undefined, getModules()), {})).reduce(function (res, _ref2) {
            var _ref3 = slicedToArray(_ref2, 2),
                name = _ref3[0],
                _ref3$ = _ref3[1],
                dispatch$$1 = _ref3$.dispatch,
                commit = _ref3$.commit,
                compute = _ref3$.compute,
                __module__name = _ref3$.name,
                findModuleState = _ref3$.findModuleState;

            return _extends({}, res, defineProperty$1({}, name, value(function () {
              var state = findModuleState(storeState);
              var getters = compute(state);

              return {
                state: state,
                getters: getters,
                dispatch: dispatch$$1,
                commit: commit
              };
            })));
          }, {})));
        }
      );
    };

    C.displayName = 'HOC_ReduxModule(' + value(Component.displayName, Component.name) + ')';

    return hoistNonReactStatics_cjs(C, Component);
  };
};

var __splitter = 'Y(^_^)Y';

var combine = function combine() {
  for (var _len = arguments.length, actions = Array(_len), _key = 0; _key < _len; _key++) {
    actions[_key] = arguments[_key];
  }

  return actions.join(__splitter);
};
var split = function split(types, reducer) {
  return types.split(__splitter).reduce(function (actions, type) {
    return _extends({}, actions, defineProperty$1({}, type, reducer));
  }, {});
};

var ReduxModule = function ReduxModule(_ref) {
  var _this = this;

  var name = _ref.name,
      _ref$getReducers = _ref.getReducers,
      computer = _ref.getters,
      __initial__state = _ref.state,
      __actions__getter = _ref.actions,
      __mutations__getter = _ref.mutations;
  classCallCheck(this, ReduxModule);

  this.dispatch = function () {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var actionName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return run.apply(undefined, [_this.actions, actionName.replace(/\//g, '.')].concat(args));
  };

  this.commit = function () {
    var actionType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var payload = arguments[1];

    dispatch({
      type: _this.name + '::' + actionType,
      payload: payload
    });
  };

  this.compute = function (state) {
    return Object.entries(_this.computer).reduce(function (getters, _ref2) {
      var _ref3 = slicedToArray(_ref2, 2),
          key = _ref3[0],
          getter = _ref3[1];

      return _extends({}, getters, defineProperty$1({}, key, getter(state)));
    }, {});
  };

  this.findModuleState = function () {
    var storeState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getState();

    if (storeState.__reduxModuleName === _this.name) {
      return storeState;
    }

    if (_this.__storeKeyCache) {
      var __cacheState = get(storeState, _this.__storeKeyCache);
      if (get(__cacheState, '__reduxModuleName') === _this.name) {
        return __cacheState;
      }
    }

    var _Object$entries$find = Object.entries(storeState).find(function (_ref4) {
      var _ref5 = slicedToArray(_ref4, 2),
          key = _ref5[0],
          state = _ref5[1];

      return get(state, '__reduxModuleName') === _this.name;
    }),
        _Object$entries$find2 = slicedToArray(_Object$entries$find, 2),
        storeKey = _Object$entries$find2[0],
        moduleState = _Object$entries$find2[1];

    _this.__storeKeyCache = storeKey;
    return moduleState;
  };

  if (hasModule(name)) {
    throw new Error('\n        [Creating ReduxModule Error] Duplicated module named \'' + name + '\'\n      ');
  }

  var initialState = Object.assign({
    __reduxModuleName: name
  }, __initial__state);
  var __fix__reg = new RegExp('^' + name + '::');
  var __mutations = Object.entries(run(__mutations__getter, undefined, {
    combine: combine
  })).reduce(function (mutations, _ref6) {
    var _ref7 = slicedToArray(_ref6, 2),
        actionType = _ref7[0],
        reducer = _ref7[1];

    return _extends({}, mutations, split(actionType, reducer));
  }, {});

  saveModule(name, Object.assign(this, {
    name: name,
    computer: computer,
    actions: run(__actions__getter, undefined, {
      getModules: getModules,
      dispatch: this.dispatch,
      commit: this.commit,
      getState: this.findModuleState,
      getReduxState: getState
    }),
    reducer: function reducer() {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
      var _ref8 = arguments[1];
      var type = _ref8.type,
          payload = _ref8.payload;
      return _extends({}, state, run(__mutations, type.replace(__fix__reg, ''), state, payload));
    }
  }));
};

var createModule = function createModule() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return new (Function.prototype.bind.apply(ReduxModule, [null].concat(args)))();
};

exports.createModule = createModule;
exports.ModuleProvider = ModuleProvider;
exports.connectModules = connectModules;
