// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"select/select.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Select = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var getTemplate = function getTemplate() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var placeholder = arguments.length > 1 ? arguments[1] : undefined;
  var selectedId = arguments.length > 2 ? arguments[2] : undefined;
  var text = placeholder !== null && placeholder !== void 0 ? placeholder : 'Placeholder по умолчанию';
  var items = data.map(function (item) {
    var cls = '';

    if (item.id === selectedId) {
      text = item.value;
      cls = 'selected';
    }

    return "\n      <li class=\"select__item ".concat(cls, "\" data-type=\"item\" data-id=\"").concat(item.id, "\">").concat(item.value, "</li>\n    ");
  });
  return "\n    <div class=\"select__backdrop\" data-type=\"backdrop\"></div>\n    <div class=\"select__input\" data-type=\"input\">\n      <span data-type=\"value\">".concat(text, "</span>\n      <i class=\"fa fa-chevron-down\" data-type=\"arrow\"></i>\n    </div>\n    <div class=\"select__dropdown\">\n      <ul class=\"select__list\">\n        ").concat(items.join(''), "\n      </ul>\n    </div>\n  ");
};

var getMultipleTemplate = function getMultipleTemplate() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var placeholder = arguments.length > 1 ? arguments[1] : undefined;
  var selectedId = arguments.length > 2 ? arguments[2] : undefined;
  var text = placeholder !== null && placeholder !== void 0 ? placeholder : 'Placeholder по умолчанию';
  var selectedItems = [];
  var items = data.map(function (item) {
    var cls = '';

    if (item.id === selectedId) {
      selectedItems.push(item.value);
      cls = 'selected';
    }

    return "\n      <li class=\"select__item-multiple ".concat(cls, "\" data-type=\"item-multiple\" data-id=\"").concat(item.id, "\">").concat(item.value, "</li>\n    ");
  });

  if (selectedItems.length) {
    text = selectedItems.join(', ');
  }

  return "\n    <div class=\"select__backdrop\" data-type=\"backdrop\"></div>\n    <div class=\"select__input\" data-type=\"input\">\n      <span class\"multiple-choice\" data-type=\"value\">".concat(text, "</span>\n      <i class=\"fa fa-chevron-down\" data-type=\"arrow\"></i>\n    </div>\n    <div class=\"select__dropdown\">\n      <ul class=\"select__list\">\n        ").concat(items.join(''), "\n      </ul>\n    </div>\n  ");
};

var _render = new WeakSet();

var _setup = new WeakSet();

var Select = /*#__PURE__*/function () {
  function Select(selector, options) {
    _classCallCheck(this, Select);

    _setup.add(this);

    _render.add(this);

    this.$el = document.querySelector(selector);
    this.options = options;
    this.selectedId = options.selectedId;

    _classPrivateMethodGet(this, _render, _render2).call(this);

    _classPrivateMethodGet(this, _setup, _setup2).call(this);
  }

  _createClass(Select, [{
    key: "clickHandler",
    value: function clickHandler(event) {
      var type = event.target.dataset.type;

      if (type === 'input' || type === 'value') {
        this.toggle();
      } else if (type === 'item') {
        var id = event.target.dataset.id;
        this.select(id);
      } else if (type === 'item-multiple') {
        var _id = event.target.dataset.id;
        this.selectMultiple(_id);
      } else if (type === 'backdrop') {
        this.close();
      }
    }
  }, {
    key: "selectMultiple",
    value: function selectMultiple(id) {
      var selectedItem = this.$el.querySelector("[data-id=\"".concat(id, "\"]"));

      if (selectedItem.classList.contains('selected')) {
        selectedItem.classList.remove('selected');
      } else {
        selectedItem.classList.add('selected');
      }

      this.selectedId = Array.from(this.$el.querySelectorAll('.selected')).map(function (item) {
        return item.dataset.id;
      });
      this.$value.textContent = Array.from(this.$el.querySelectorAll('.selected')).map(function (item) {
        return item.innerText;
      }).join(', ');
      this.options.onSelect ? this.options.onSelect(this.currentMultiple) : null;
    }
  }, {
    key: "select",
    value: function select(id) {
      this.selectedId = id;
      this.$value.textContent = this.currentSingle.value;
      this.$el.querySelectorAll('[data-type="item"]').forEach(function (el) {
        el.classList.remove('selected');
      });
      this.$el.querySelector("[data-id=\"".concat(id, "\"]")).classList.add('selected');
      this.options.onSelect ? this.options.onSelect(this.currentSingle) : null;
      this.close();
    }
  }, {
    key: "toggle",
    value: function toggle() {
      this.isOpen ? this.close() : this.open();
    }
  }, {
    key: "open",
    value: function open() {
      this.$el.classList.add('open');
      this.$arrow.classList.remove('fa-chevron-down');
      this.$arrow.classList.add('fa-chevron-up');
    }
  }, {
    key: "close",
    value: function close() {
      this.$el.classList.remove('open');
      this.$arrow.classList.add('fa-chevron-down');
      this.$arrow.classList.remove('fa-chevron-up');
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.$el.removeEventListener('click', this.clickHandler);
      this.$el.innerHTML = '';
    }
  }, {
    key: "isOpen",
    get: function get() {
      return this.$el.classList.contains('open');
    }
  }, {
    key: "currentSingle",
    get: function get() {
      var _this = this;

      return this.options.data.find(function (item) {
        return item.id === _this.selectedId;
      });
    }
  }, {
    key: "currentMultiple",
    get: function get() {
      var _this2 = this;

      return this.options.data.filter(function (item) {
        return _this2.selectedId.includes(item.id);
      });
    }
  }]);

  return Select;
}();

exports.Select = Select;

var _render2 = function _render2() {
  var _this$options = this.options,
      placeholder = _this$options.placeholder,
      data = _this$options.data;
  this.$el.classList.add('select');

  if (this.$el.classList.contains('multiple')) {
    this.$el.innerHTML = getMultipleTemplate(data, placeholder, this.selectedId);
  } else {
    this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId);
  }
};

var _setup2 = function _setup2() {
  this.clickHandler = this.clickHandler.bind(this);
  this.$el.addEventListener('click', this.clickHandler);
  this.$arrow = this.$el.querySelector('[data-type="arrow"]');
  this.$value = this.$el.querySelector('[data-type="value"]');
};
},{}],"dragAndDrop/dragAndDrop.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addDragAndDrop;

var _index = require("../index");

var _table = require("../table/table");

var rawCalendarData = localStorage.getItem('calendarData');
var calendarData = JSON.parse(rawCalendarData);

function addDragAndDrop() {
  var draggableMeetingCard = document.querySelectorAll('.filled');
  var dropZone = document.querySelectorAll('.drop-zone');
  var day;
  var time;
  var title;
  var participants;
  draggableMeetingCard.forEach(function (item) {
    item.addEventListener('dragstart', function (e) {
      day = item.dataset.day;
      time = item.dataset.time;
      title = item.dataset.title;
      participants = item.dataset.participants.split(',');
    });
  });
  dropZone.forEach(function (item) {
    item.addEventListener('dragover', function (e) {
      e.preventDefault();
    });
  });
  dropZone.forEach(function (item) {
    item.addEventListener('drop', function (e) {
      if (Object.keys(_index.data[e.target.dataset.day]).includes(e.target.dataset.time)) {
        alert('You can\'t drag to the booked slot');
      } else {
        delete _index.data[day][time];
        _index.data[e.target.dataset.day][e.target.dataset.time] = {
          title: title,
          participants: participants
        };
        localStorage.setItem('calendarData', JSON.stringify(_index.data));
      }

      if (_index.filterBy === 'All members') {
        (0, _table.renderTable)(_index.data);
      } else {
        (0, _index.filterFunc)();
        (0, _table.renderTable)(_index.filteredData);
      }
    });
  });
}
},{"../index":"index.js","../table/table":"table/table.js"}],"table/table.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderTable = renderTable;
exports.render = render;
exports.table = void 0;

var _index = require("../index");

var _dragAndDrop = _interopRequireDefault(require("../dragAndDrop/dragAndDrop"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var table = document.getElementById('tab');
exports.table = table;
var rawCalendarData = localStorage.getItem('calendarData');
var calendarData = JSON.parse(rawCalendarData);

function renderHeader() {
  var trElem = document.createElement('tr');

  _index.tableColumns.map(function (column) {
    var thElem = document.createElement('th');
    thElem.innerText = column;
    trElem.appendChild(thElem);
  });

  table.appendChild(trElem);
}

function renderTableBody(inputData) {
  _index.tableRows.map(function (time) {
    var trElem = document.createElement('tr');

    _index.tableColumns.map(function (column, index) {
      var tdElem = document.createElement('td');
      var tdElemText = document.createElement('span');
      var titleWrapper = document.createElement('div');
      var removeButton = document.createElement('button');
      tdElem.appendChild(titleWrapper);
      titleWrapper.appendChild(tdElemText);
      var event = '';

      if (index !== 0 && inputData[column][time]) {
        var _inputData$column$tim;

        event = (_inputData$column$tim = inputData[column][time]) === null || _inputData$column$tim === void 0 ? void 0 : _inputData$column$tim.title;
        removeButton.classList.add('remove-btn');
        removeButton.innerText = 'X';
        removeButton.dataset.day = column;
        removeButton.dataset.time = time;
        titleWrapper.classList.add('filled');
        titleWrapper.dataset.title = event;
        titleWrapper.dataset.participants = inputData[column][time].participants;
        titleWrapper.draggable = true;
        tdElem.classList.add('taken');
        removeButton.addEventListener('click', removeMeeting);
        titleWrapper.appendChild(removeButton);
      }

      titleWrapper.dataset.day = column;
      titleWrapper.dataset.time = time;
      tdElemText.innerText = index === 0 ? time : event;

      if (index !== 0) {
        tdElem.classList.add('drop-zone');
        tdElem.dataset.day = column;
        tdElem.dataset.time = time;
      }

      trElem.appendChild(tdElem);
    });

    table.appendChild(trElem);
  });
}

function removeMeeting(event) {
  var day = event.target.dataset.day;
  var time = event.target.dataset.time;
  delete _index.data[day][time];
  localStorage.setItem('calendarData', JSON.stringify(_index.data));
  delete _index.filteredData[day][time];

  if (_index.filterBy === 'All members') {
    renderTable(_index.data);
  } else {
    renderTable(_index.filteredData);
  }
}

function renderTable(inputData) {
  table.innerHTML = '';
  renderHeader();
  renderTableBody(inputData);
  (0, _dragAndDrop.default)();
}

function render() {
  var loginFormBack = document.querySelector(".login-form-back");
  var loginForm = document.querySelector(".login-form");

  if (calendarData) {
    for (var day in calendarData) {
      for (var time in calendarData) {
        _index.data[day] = calendarData[day];
      }
    }

    loginForm.classList.add('show');
    loginFormBack.classList.add('show');
    renderTable(_index.data);
  } else {
    loginFormBack.classList.add('show');
    loginForm.classList.add('show');
    renderTable(_index.data);
  }
}
},{"../index":"index.js","../dragAndDrop/dragAndDrop":"dragAndDrop/dragAndDrop.js"}],"form/form.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pushMeeting;

var _index = require("../index");

var _table = require("../table/table");

var form = document.getElementById('form');
form.addEventListener('submit', pushMeeting);

function pushMeeting(event) {
  event.preventDefault();
  var meetingTitle = document.getElementById('text');
  var error = document.querySelector('.error');

  if (Object.keys(_index.data[_index.selectedWeekDay]).includes(_index.selectedTime)) {
    error.innerText = 'Slot is already booked';
  } else if (meetingTitle.value) {
    _index.data[_index.selectedWeekDay][_index.selectedTime] = {
      title: meetingTitle.value,
      participants: _index.selectedParticipants
    };
    localStorage.setItem('calendarData', JSON.stringify(_index.data));
    error.innerText = '';

    if (_index.filterBy === 'All members') {
      (0, _table.renderTable)(_index.data);
    } else {
      (0, _index.filterFunc)();
      (0, _table.renderTable)(_index.filteredData);
    }
  } else {
    error.innerText = 'You need to write title first';
  }
}
},{"../index":"index.js","../table/table":"table/table.js"}],"form/loginForm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginForm = void 0;

var _index = require("../index");

var loginFormBack = document.querySelector(".login-form-back");
var loginForm = document.querySelector(".login-form");
exports.loginForm = loginForm;
var loginButton = document.getElementById("login-btn");
var createEventButton = document.getElementById('create-event');
var error = document.querySelector('.login-error');

function login(e) {
  e.preventDefault();

  if (!_index.currentUser) {
    error.innerText = "Please choose user";
  } else {
    if (_index.currentUser[0].role === "user") {
      error.innerText = "";
      createEventButton.disabled = true;
      loginFormBack.classList.remove("show");
      loginForm.classList.remove("show");
    } else {
      loginFormBack.classList.remove("show");
      loginForm.classList.remove("show");
    }
  }
}

loginForm.addEventListener("submit", login);
},{"../index":"index.js"}],"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"select/styles.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rawParticipants = exports.userRoles = void 0;
var userRoles = {
  admin: "admin",
  user: "user"
};
exports.userRoles = userRoles;
var rawParticipants = [{
  name: 'Afonya',
  role: userRoles.admin
}, {
  name: 'Oleg',
  role: userRoles.user
}, {
  name: 'Alisa',
  role: userRoles.admin
}, {
  name: 'Max',
  role: userRoles.user
}, {
  name: 'Alex',
  role: userRoles.admin
}];
exports.rawParticipants = rawParticipants;
},{}],"users/users.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Admin = exports.User = void 0;

var _constants = require("../constants");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function User(name) {
  _classCallCheck(this, User);

  this.name = name;
  this.role = _constants.userRoles.user;
};

exports.User = User;

var Admin = /*#__PURE__*/function (_User) {
  _inherits(Admin, _User);

  var _super = _createSuper(Admin);

  function Admin(name) {
    var _this;

    _classCallCheck(this, Admin);

    _this = _super.call(this, name);
    _this.role = _constants.userRoles.admin;
    return _this;
  }

  return Admin;
}(User);

exports.Admin = Admin;
},{"../constants":"constants.js"}],"utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUserClass = createUserClass;

var _constants = require("./constants");

var _users = require("./users/users");

function createUserClass(user) {
  if (user.role === _constants.userRoles.admin) {
    return new _users.Admin(user.name);
  }

  return new _users.User(user.name);
}
},{"./constants":"constants.js","./users/users":"users/users.js"}],"index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterFunc = filterFunc;
exports.filterBy = exports.filteredData = exports.data = exports.tableRows = exports.tableColumns = exports.currentUser = exports.selectedParticipants = exports.selectedTime = exports.selectedWeekDay = void 0;

var _select = require("./select/select");

var _form = _interopRequireDefault(require("./form/form"));

var _loginForm = _interopRequireDefault(require("./form/loginForm"));

var _table = require("./table/table");

require("./select/styles.scss");

require("./main.scss");

var _utils = require("./utils");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var createEventButton = document.getElementById('create-event');
var closeFormButton = document.getElementById('close-form');
var formBackdrop = document.querySelector('.create-event-form');
var selectedWeekDay;
exports.selectedWeekDay = selectedWeekDay;
var selectedTime;
exports.selectedTime = selectedTime;
var selectedParticipants = [];
exports.selectedParticipants = selectedParticipants;
var currentUser;
exports.currentUser = currentUser;

function showCreateEventWindow(e) {
  e.preventDefault();
  formBackdrop.classList.toggle('show');
  form.classList.toggle('show');
}

createEventButton.addEventListener('click', showCreateEventWindow);
closeFormButton.addEventListener('click', showCreateEventWindow);
formBackdrop.addEventListener('click', showCreateEventWindow);
var tableColumns = ['Time \\ Day', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
exports.tableColumns = tableColumns;
var tableRows = [];
exports.tableRows = tableRows;

for (var i = 10; i <= 18; i++) {
  tableRows.push("".concat(i, ":00"));
}

var participants = _constants.rawParticipants.map(_utils.createUserClass);

var data = {
  Monday: {},
  Tuesday: {},
  Wednesday: {},
  Thursday: {},
  Friday: {}
};
exports.data = data;
var filteredData = JSON.parse(JSON.stringify(data));
exports.filteredData = filteredData;
var dayPicker = new _select.Select('#day', {
  placeholder: 'Choose day',
  data: tableColumns.map(function (item, id) {
    return {
      id: id.toString(),
      value: item
    };
  }).splice(1),
  onSelect: function onSelect(value) {
    exports.selectedWeekDay = selectedWeekDay = value.value;
  }
});
var timePicker = new _select.Select('#time', {
  placeholder: 'Choose time',
  data: tableRows.map(function (item, id) {
    return {
      id: id.toString(),
      value: item
    };
  }),
  onSelect: function onSelect(value) {
    exports.selectedTime = selectedTime = value.value;
  }
});
var participantsPicker = new _select.Select('#participants', {
  placeholder: 'Choose participants',
  data: participants.map(function (item, id) {
    return {
      id: id.toString(),
      value: item.name
    };
  }),
  onSelect: function onSelect(value) {
    exports.selectedParticipants = selectedParticipants = value.map(function (item) {
      return item.value;
    });
  }
});
var userAuth = new _select.Select('#auth', {
  placeholder: 'Choose user',
  data: participants.map(function (item, id) {
    return {
      id: id.toString(),
      value: item.name
    };
  }),
  onSelect: function onSelect(value) {
    exports.currentUser = currentUser = participants.filter(function (item) {
      return item.name === value.value;
    });
  }
});

function filterFunc() {
  exports.filteredData = filteredData = JSON.parse(JSON.stringify(data));

  for (var day in filteredData) {
    for (var time in filteredData[day]) {
      if (!filteredData[day][time].participants.includes(filterBy)) {
        delete filteredData[day][time];
      }
    }
  }
}

var participantsFilter = _toConsumableArray(participants);

participantsFilter.unshift('All members');
var filterBy = 'All members';
exports.filterBy = filterBy;
var filter = new _select.Select('#filter', {
  placeholder: 'All members',
  data: participantsFilter.map(function (item, id) {
    return {
      id: id.toString(),
      value: item.name || item
    };
  }),
  onSelect: function onSelect(value) {
    exports.filterBy = filterBy = value.value;

    if (filterBy === 'All members') {
      (0, _table.renderTable)(data);
    } else {
      filterFunc();
      (0, _table.renderTable)(filteredData);
    }
  }
});
(0, _table.render)();
},{"./select/select":"select/select.js","./form/form":"form/form.js","./form/loginForm":"form/loginForm.js","./table/table":"table/table.js","./select/styles.scss":"select/styles.scss","./main.scss":"main.scss","./utils":"utils.js","./constants":"constants.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "41521" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map