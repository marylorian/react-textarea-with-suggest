/** React textarea with suggest v1.0.0
 *
 *
 * Copyright (c) 2019-present,
 * by Maria Lobareva (marialobareva97@gmail.com).
 *
 * LICENSE MIT.
 */
"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import once from "lodash.once";
import "./styles.css";

export default class Textarea extends React.Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    onSuggestItemRender: PropTypes.func,
    searchMarker: PropTypes.string.isRequired,
    searchRegexp: PropTypes.any,
    suggestList: PropTypes.array,
    value: PropTypes.string
  };

  static defaultProps = {
    searchMarker: "@",
    searchRegexp: /@([a-z0\d\-.]+[a-z\d])/gim,
    suggestList: [],
  };

  state = {
    needStartSearch: this.props.value && this.props.value.includes(this.props.searchMarker),
    text: this.props.value || ""
  };
  _textarea = null;
  _element = null;

  componentDidMount() {
    if (this.props.searchMarker.length > 1) {
      throw new TypeError("Max length of searchMarker is 1 symbol. Please change your searchMarker to char");
    }
  }

  initialize = once(el => {
    const {className} = this.props;
    const elem = document.getElementsByClassName(className)[0];
    this._textarea = elem;
    this._element = el;
  });

  mobileAndTabletCheck = () => {
    let check = false;
    (function (a) {
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  };

  onChange = ({...args}) => {
    const {searchMarker, searchRegexp} = this.props;
    const {needStartSearch} = this.state;
    const {currentTarget = {}, isTrusted = true} = args;
    const {value = this.state.text} = currentTarget;
    let selectionEnd = this._textarea.selectionEnd;
    let last = selectionEnd
        ? value.slice(selectionEnd - 1, selectionEnd)
        : value.slice(-1);

    this.setState({text: value});

    if (last === searchMarker) {
      this.setState({needStartSearch: true});
      //TODO: clear suggestList here
    }

    if (!value.includes(searchMarker) && needStartSearch) {
      this.setState({needStartSearch: false});
    }

    if (last !== searchMarker && needStartSearch) {
      let textWithResults = value.slice(0, selectionEnd);
      let results = textWithResults
          .slice(textWithResults.lastIndexOf(searchMarker)).match(new RegExp(searchRegexp));
      let result = results ? results[0].slice(1) : last;

      this.props.onSearch(result);
    }

    if (isTrusted) return this.props.onChange(args);
    return this.props.onChange({
      ...args,
      currentTarget: this._textarea,
      target: this._textarea
    });
  };

  setResult = result => {
    const {searchMarker} = this.props;
    const {text: currentText} = this.state;
    let selectionEnd = this._textarea.selectionEnd;
    let position = currentText.slice(0, selectionEnd).lastIndexOf(searchMarker);
    let textWithResult = currentText.slice(position);

    if (position !== -1) {
      let endPosition =
          (textWithResult.includes(" ")
              ? textWithResult.indexOf(" ")
              : currentText.length) + position;
      let newValue;

      if (textWithResult.lastIndexOf(searchMarker) > 0) {
        endPosition = textWithResult.lastIndexOf(searchMarker) + position;
      }
      if (!endPosition || endPosition < position) {
        endPosition = currentText.length;
      }

      newValue =
          currentText.slice(0, position || 0) +
          currentText
              .slice(position)
              .replace(currentText.slice(position, endPosition), `${searchMarker}${result} `);

      this._textarea.value = newValue;
      this._textarea.focus();

      if (this.mobileAndTabletCheck()) {
        let endCaretPosition =
            newValue.slice(position).indexOf(" ") + position + 1;
        this._textarea.setSelectionRange(endCaretPosition, endCaretPosition);
      }

      let event = new Event("onchange", {
        bubbles: true,
        cancelable: false
      });
      this._element._onChange(event);

      this.setState({needStartSearch: false, text: newValue});
    }
  };

  renderSuggestItem = (item, index) => {
    if (this.props.onSuggestItemRender) return this.props.onSuggestItemRender(item);
    return (
        <div
            key={index}
            className="textarea-suggest-item"
            onClick={() => this.setResult(item)}
        >
          <div className="textarea-suggest-item--info">
            <div>{item}</div>
          </div>
        </div>
    );
  };

  renderSearchResults = () => {
    const {suggestList} = this.props;

    if (this.state.needStartSearch && suggestList && suggestList.length && this._textare) {
      let curHeight = this._textarea.getBoundingClientRect().height;

      return (
          <div className="textarea-suggest--results" style={{top: curHeight}}>
            {suggestList.map((item, index) => {
              return this.renderSuggestItem(item, index);
            })}
          </div>
      );
    }
    return null;
  };

  render() {
    const {value, ...props} = this.props;
    const searchResults = this.renderSearchResults();

    return (
        <div className="textarea-suggest">
        <textarea
            {...props}
            ref={this.initialize}
            onChange={this.onChange}
            value={this.state.text || value}
        />
          {searchResults}
        </div>
    );
  }
};