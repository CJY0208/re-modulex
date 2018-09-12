'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

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
      return moduleNames.reduce(function (res, name) {
        return modules[name] ? _extends({}, res, defineProperty({}, name, modules[name])) : res;
      }, {});
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
        getState = _ref2$.getState;

    return _extends({}, res, defineProperty({}, name, value(function () {
      var state = getState(storeState);

      return {
        getState: getState,
        getComputed: function getComputed() {
          return compute(getState());
        },
        dispatch: dispatch,
        commit: commit,
        state: state,
        getters: compute(state)
      };
    })));
  }, {});
};

var __store = void 0;

var check = function check(fn) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (!__store) {
      console.error(new Error('\n      [ReModulex Error] \n        Forgot to apply the store?\n        Use \'ReModulex.applyStore\' with your redux store!\n    '));
    }
    return run.apply(undefined, [fn, undefined].concat(args));
  };
};

var applyStore = function applyStore(store) {
  __store = store;
};

var dispatch = check(function () {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return run.apply(undefined, [__store, 'dispatch'].concat(args));
});
var getState = check(function () {
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
var split = function split(types, reducer, name) {
  return types.split(__splitter).reduce(function (actions, type) {
    return _extends({}, actions, defineProperty({}, name + '::' + type, reducer));
  }, {});
};

var ReModulex = function ReModulex(_ref) {
  var _this = this;

  var name = _ref.name,
      __initial__state = _ref.state,
      config = objectWithoutProperties(_ref, ['name', 'state']);
  classCallCheck(this, ReModulex);

  this.dispatch = function () {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var actionName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return run.apply(undefined, [_this.actions, actionName.split('/')].concat(args));
  };

  this.commit = function () {
    var actionType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var payload = arguments[1];
    return dispatch({
      type: _this.name + '::' + actionType,
      payload: payload
    });
  };

  this.compute = function (state) {
    return Object.entries(_this.getters).reduce(function (getters, _ref2) {
      var _ref3 = slicedToArray(_ref2, 2),
          key = _ref3[0],
          getter = _ref3[1];

      return _extends({}, getters, defineProperty({}, key, getter(state)));
    }, {});
  };

  this.getState = function () {
    var storeState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getState();

    if (storeState.__ReModulexName === _this.name) {
      return storeState;
    }

    var __cacheState = get$1(storeState, _this.__storeKeyCache);
    if (get$1(__cacheState, '__ReModulexName') === _this.name) {
      return __cacheState;
    }

    var _Object$entries$find = Object.entries(storeState).find(function (_ref4) {
      var _ref5 = slicedToArray(_ref4, 2),
          key = _ref5[0],
          state = _ref5[1];

      return get$1(state, '__ReModulexName') === _this.name;
    }),
        _Object$entries$find2 = slicedToArray(_Object$entries$find, 2),
        storeKey = _Object$entries$find2[0],
        moduleState = _Object$entries$find2[1];

    _this.__storeKeyCache = storeKey;
    return moduleState;
  };

  if (hasModule(name)) {
    throw new Error('\n        [Creating ReModulex Error] Duplicated module named \'' + name + '\'\n      ');
  }

  if (!isObject(__initial__state)) {
    throw new Error('\n        [Creating ReModulex Error] Initial state must be an Object!\n      ');
  }

  var initialState = _extends({
    __ReModulexName: name
  }, __initial__state);
  var __mutations = Object.entries(run(config, 'mutations', {
    combine: combine
  })).reduce(function (mutations, _ref6) {
    var _ref7 = slicedToArray(_ref6, 2),
        actionType = _ref7[0],
        reducer = _ref7[1];

    return _extends({}, mutations, split(actionType, reducer, name));
  }, {});
  var __actions = run(config, 'actions', {
    getModules: getModules,
    getStoreState: getState,
    dispatch: this.dispatch,
    commit: this.commit,
    getState: this.getState
  });

  saveModule(name, Object.assign(this, {
    name: name,
    getters: get$1(config, 'getters', {}),
    actions: __actions,
    reducer: function reducer() {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
      var _ref8 = arguments[1];
      var type = _ref8.type,
          payload = _ref8.payload;
      return _extends({}, state, run(__mutations, type, state, payload));
    }
  }));
  Object.assign(this.dispatch, __actions);
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

var _value = value(function () {
  try {
    return React__default.createContext();
  } catch (error) {
    console.warn(new Error('\n      [ReModulex Environment Waring] \n        \'React.createContext\' API is not supported by you React version. \n        So \'ModuleProvider\' and \'connectModules\' would NOT effect.\n        Use \'applyStore\' and \'mapModules\' with \'Provider\' and \'connect\' in react-redux instead.\n        https://github.com/CJY0208/re-modulex#%E4%B8%8D%E6%83%B3%E7%94%A8%E9%85%8D%E5%A5%97%E7%9A%84-moduleprovider-%E5%92%8C-connectmodules%E6%83%B3%E9%85%8D%E5%90%88-react-redux-\n    '));
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
}),
    Provider = _value.Provider,
    Consumer = _value.Consumer;

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
    var C = function C(props) {
      return React__default.createElement(
        Consumer,
        null,
        function (storeState) {
          return React__default.createElement(Component, _extends({}, props, mapModules(modulesGetter, storeState)));
        }
      );
    };

    C.displayName = 'HOC-ReModulex(' + value(Component.displayName, Component.name) + ')';

    return hoistNonReactStatics_cjs(C, Component);
  };
};

var createModule = function createModule() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return new (Function.prototype.bind.apply(ReModulex, [null].concat(args)))();
};

exports.createModule = createModule;
exports.ModuleProvider = ModuleProvider;
exports.connectModules = connectModules;
exports.mapModules = mapModules;
exports.applyStore = applyStore;
