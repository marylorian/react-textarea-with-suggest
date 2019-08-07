"use strict";

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash.once"));

require("../styles.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TextareaSuggest =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TextareaSuggest, _React$Component);

  function TextareaSuggest(props) {
    var _this;

    _classCallCheck(this, TextareaSuggest);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TextareaSuggest).call(this, props));
    _this._textarea = null;
    _this._element = null;
    _this.state = {
      needStartSearch: _this.props.value && _this.props.value.includes(_this.props.searchMarker),
      text: _this.props.value || ""
    };
    return _this;
  }

  _createClass(TextareaSuggest, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.initialize = (0, _lodash.default)(function (el) {
        var className = _this2.props.className;
        var elem = document.getElementsByClassName(className)[0];
        _this2._textarea = elem;
        _this2._element = el;
      });

      if (this.props.searchMarker.length > 1) {
        throw new TypeError("Max length of searchMarker is 1 symbol. Please change your searchMarker to char");
      }
    }
  }, {
    key: "mobileAndTabletCheck",
    value: function mobileAndTabletCheck() {
      var check = false;

      (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.substr(0, 4))) check = true;
      })(navigator.userAgent || navigator.vendor || window.opera);

      return check;
    }
  }, {
    key: "onChange",
    value: function onChange(_ref) {
      var args = _extends({}, _ref);

      var _this$props = this.props,
          searchMarker = _this$props.searchMarker,
          searchRegexp = _this$props.searchRegexp;
      var needStartSearch = this.state.needStartSearch;
      var _args$currentTarget = args.currentTarget,
          currentTarget = _args$currentTarget === void 0 ? {} : _args$currentTarget,
          _args$isTrusted = args.isTrusted,
          isTrusted = _args$isTrusted === void 0 ? true : _args$isTrusted;
      var _currentTarget$value = currentTarget.value,
          value = _currentTarget$value === void 0 ? this.state.text : _currentTarget$value;
      var selectionEnd = this._textarea.selectionEnd;
      var last = selectionEnd ? value.slice(selectionEnd - 1, selectionEnd) : value.slice(-1);
      this.setState({
        text: value
      });

      if (last === searchMarker) {
        this.setState({
          needStartSearch: true
        }); //TODO: clear suggestList here
      }

      if (!value.includes(searchMarker) && needStartSearch) {
        this.setState({
          needStartSearch: false
        });
      }

      if (last !== searchMarker && needStartSearch) {
        var textWithResults = value.slice(0, selectionEnd);
        var results = textWithResults.slice(textWithResults.lastIndexOf(searchMarker)).match(new RegExp(searchRegexp));
        var result = results ? results[0].slice(1) : last;
        this.props.onSearch(result);
      }

      if (isTrusted) return this.props.onChange(args);
      return this.props.onChange(_objectSpread({}, args, {
        currentTarget: this._textarea,
        target: this._textarea
      }));
    }
  }, {
    key: "setResult",
    value: function setResult(result) {
      var searchMarker = this.props.searchMarker;
      var currentText = this.state.text;
      var selectionEnd = this._textarea.selectionEnd;
      var position = currentText.slice(0, selectionEnd).lastIndexOf(searchMarker);
      var textWithResult = currentText.slice(position);

      if (position !== -1) {
        var endPosition = (textWithResult.includes(" ") ? textWithResult.indexOf(" ") : currentText.length) + position;
        var newValue;

        if (textWithResult.lastIndexOf(searchMarker) > 0) {
          endPosition = textWithResult.lastIndexOf(searchMarker) + position;
        }

        if (!endPosition || endPosition < position) {
          endPosition = currentText.length;
        }

        newValue = currentText.slice(0, position || 0) + currentText.slice(position).replace(currentText.slice(position, endPosition), "".concat(searchMarker).concat(result, " "));
        this._textarea.value = newValue;

        this._textarea.focus();

        if (this.mobileAndTabletCheck()) {
          var endCaretPosition = newValue.slice(position).indexOf(" ") + position + 1;

          this._textarea.setSelectionRange(endCaretPosition, endCaretPosition);
        }

        var event = new Event("onchange", {
          bubbles: true,
          cancelable: false
        });

        this._element._onChange(event);

        this.setState({
          needStartSearch: false,
          text: newValue
        });
      }
    }
  }, {
    key: "renderSuggestItem",
    value: function renderSuggestItem(item, index) {
      var _this3 = this;

      if (this.props.onSuggestItemRender) return this.props.onSuggestItemRender(item);
      return _react.default.createElement("div", {
        key: index,
        className: "textarea-suggest-item",
        onClick: function onClick() {
          return _this3.setResult(item);
        }
      }, _react.default.createElement("div", {
        className: "textarea-suggest-item--info"
      }, _react.default.createElement("div", null, item)));
    }
  }, {
    key: "renderSearchResults",
    value: function renderSearchResults() {
      var _this4 = this;

      var suggestList = this.props.suggestList;

      if (this.state.needStartSearch && suggestList && suggestList.length && this._textare) {
        var curHeight = this._textarea.getBoundingClientRect().height;

        return _react.default.createElement("div", {
          className: "textarea-suggest--results",
          style: {
            top: curHeight
          }
        }, suggestList.map(function (item, index) {
          return _this4.renderSuggestItem(item, index);
        }));
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          value = _this$props2.value,
          props = _objectWithoutProperties(_this$props2, ["value"]);

      var searchResults = this.renderSearchResults();
      return _react.default.createElement("div", {
        className: "textarea-suggest"
      }, _react.default.createElement("textarea", _extends({}, props, {
        ref: this.initialize,
        onChange: this.onChange,
        value: this.state.text || value
      })), searchResults);
    }
  }]);

  return TextareaSuggest;
}(_react.default.Component);

;
TextareaSuggest.propTypes = {
  className: _propTypes.default.string.isRequired,
  onChange: _propTypes.default.func.isRequired,
  onSearch: _propTypes.default.func.isRequired,
  onSuggestItemRender: _propTypes.default.func,
  searchMarker: _propTypes.default.string.isRequired,
  searchRegexp: _propTypes.default.any,
  suggestList: _propTypes.default.array,
  value: _propTypes.default.string
};
TextareaSuggest.defaultProps = {
  searchMarker: "@",
  searchRegexp: /@([a-z0\d\-.]+[a-z\d])/gim,
  suggestList: []
};
module.exports = TextareaSuggest;