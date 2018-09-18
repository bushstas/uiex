'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UNIQUE_ID = 'UniqueCmpIDn';
var CONTEXTS = {};
var ID = 0;

var StateMaster = function StateMaster(propsList, initialState, parent, callback) {
	_classCallCheck(this, StateMaster);

	_initialiseProps.call(this);

	this.propsList = propsList;
	this.initialState = initialState;
	this.parent = typeof parent == 'function' && typeof parent.getDerivedStateFromProps == 'function' ? parent : null;
	this.callback = callback;
};

var _initialiseProps = function _initialiseProps() {
	var _this = this;

	this.getDerivedState = function (props, state) {
		_this.id = state[UNIQUE_ID];
		_this.prevProps = state.prevProps || {};
		_this.props = props;
		_this.newState = null;
		_this.changed = null;
		_this.changedProps = [];
		var isInitial = _this.id == null;
		if (isInitial && !state.initialId) {
			_this.id = ID++;
			_this.newState = _defineProperty({}, UNIQUE_ID, _this.id);
			if (_this.initialState instanceof Object) {
				_this.newState = _extends({}, _this.initialState, _this.newState);
			}
		}
		_this.id = _this.id || state.initialId;
		var instance = CONTEXTS[_this.id];
		_this.check(_this.propsList);
		var parentalState = void 0;
		if (_this.parent) {
			var s = isInitial ? { initialId: _this.id } : state;
			parentalState = _this.parent.getDerivedStateFromProps(props, s);
		}
		var changed = !!_this.changed;
		if (changed || parentalState || isInitial) {
			var data = {
				nextProps: props,
				prevProps: _this.prevProps,
				state: state,
				changed: changed,
				changedProps: _this.changedProps,
				isInitial: isInitial,
				add: _this.add,
				addIfChanged: _this.addIfChanged,
				isChanged: _this.isChanged,
				isChangedAny: _this.isChangedAny,
				addIfChangedAny: _this.addIfChangedAny,
				isChangedAll: _this.isChangedAll,
				get: _this.get,
				call: _this.call
			};
			if (parentalState) {
				_this.merge(parentalState);
			}
			var newState = _this.callback.call(instance, data);
			if (newState) {
				_this.merge(newState);
			}
			if (changed) {
				_this.newState = _this.newState || {};
				if (!_this.newState.prevProps) {
					_this.newState.prevProps = _this.prevProps;
				}
				for (var k in _this.changed) {
					_this.newState.prevProps[k] = _this.props[k];
				}
			}
			return _this.newState;
		}
		return null;
	};

	this.check = function (key) {
		if (typeof key == 'string') {
			var isChanged = _this.prevProps[key] !== _this.props[key];
			if (isChanged) {
				_this.changed = _this.changed || {};
				_this.changed[key] = true;
				_this.changedProps.push(key);
			}
			return isChanged;
		} else if (key instanceof Array) {
			var _isChanged = false;
			for (var i = 0; i < key.length; i++) {
				if (_this.check(key[i])) {
					_isChanged = true;
				}
			}
			return _isChanged;
		}
	};

	this.isChanged = function (key) {
		var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		return _this.changed && _this.changed[key] && (value === undefined || _this.props[key] === value);
	};

	this.addIfChangedAny = function (key) {
		var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		if (_this.isChangedAny()) {
			_this.add(key, value);
		}
	};

	this.isChangedAny = function () {
		for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
			keys[_key] = arguments[_key];
		}

		if (_this.changed) {
			if (keys.length > 0) {
				if (keys[0] instanceof Array) {
					keys = keys[0];
				}
				for (var i = 0; i < keys.length; i++) {
					if (_this.changed[keys[i]]) {
						return true;
					}
				}
				return false;
			}
			return true;
		}
		return false;
	};

	this.isChangedAll = function () {
		for (var _len2 = arguments.length, keys = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			keys[_key2] = arguments[_key2];
		}

		if (_this.changed) {
			if (keys.length > 0) {
				if (keys[0] instanceof Array) {
					keys = keys[0];
				}
				for (var i = 0; i < keys.length; i++) {
					if (!_this.changed[keys[i]]) {
						return false;
					}
				}
				return true;
			}
			var propsCount = 0;
			if (typeof _this.propsList == 'string') {
				propsCount = 1;
			} else if (_this.propsList instanceof Array) {
				propsCount = _this.propsList.length;
			}

			var _Object$keys = Object.keys(_this.changed),
			    length = _Object$keys.length;

			return length && length >= propsCount;
		}
		return false;
	};

	this.addIfChanged = function (key) {
		var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		if (_this.isChanged(key)) {
			_this.add(key, value);
		}
	};

	this.add = function (key) {
		var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		if (value === undefined) {
			if (key instanceof Object) {
				return _this.merge(key);
			}
			value = _this.props[key];
		}
		_this.newState = _this.newState || {};
		_this.addParam(key, value);
	};

	this.merge = function (obj) {
		if (_this.newState == null) {
			_this.newState = obj;
		} else if (obj instanceof Object) {
			_this.newState = _this.newState || {};
			for (var k in obj) {
				if (k == 'prevProps') {
					_this.newState.prevProps = _extends({}, obj[k], _this.newState.prevProps);
				} else {
					_this.addParam(k, obj[k]);
				}
			}
		}
	};

	this.addParam = function (key, value) {
		if (_this.newState[key] instanceof Object && value instanceof Object) {
			_this.newState[key] = _extends({}, _this.newState[key], value);
		} else {
			_this.newState[key] = value;
		}
	};

	this.get = function () {
		return _this.newState;
	};

	this.call = function (callback) {
		setTimeout(callback, 0);
	};
};

var nullFunc = function nullFunc() {
	return null;
};

var withStateMaster = exports.withStateMaster = function withStateMaster(component, propsList) {
	var initialState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
	var parent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

	var originalGetDerivedState = component.getDerivedStateFromProps;
	var prototype = component.prototype;

	var validPropsList = propsList && (propsList instanceof Array && propsList.length > 0 || typeof propsList == 'string');

	if (validPropsList) {
		var p = prototype.__proto__;

		if (p && p.constructor.getDerivedStateFromProps === originalGetDerivedState) {
			originalGetDerivedState = nullFunc;
		}
		var stateMaster = new StateMaster(propsList, initialState, parent, originalGetDerivedState);
		if (typeof originalGetDerivedState != 'function') {
			originalGetDerivedState = nullFunc;
		}
		component.getDerivedStateFromProps = function (props, state) {
			return stateMaster.getDerivedState(props, state || {});
		};
	}
	return component;
};

var registerContext = exports.registerContext = function registerContext(context) {
	CONTEXTS[ID] = context;
	context.state = context.state || {};
};

var unregisterContext = exports.unregisterContext = function unregisterContext(context) {
	var id = context.state[UNIQUE_ID];
	CONTEXTS[id] = null;
	delete CONTEXTS[id];
};