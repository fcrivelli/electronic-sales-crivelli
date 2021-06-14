import React, { Component } from "react";

export default class Button extends Component {
  render() {
    return <button className="button is-small is-outlined is-primary   is-pulled-right" onClick={this.props.action}>{this.props.title}</button>;
  }
}