/**
 * Image
 * A wrapper around image elements to handle loading states
 * and transitions
 */

import React from 'react'
import cx from 'classnames'
import createClass from 'create-react-class'
import { string } from 'prop-types'

let Image = createClass({
  statics: {
    ONLOAD: 10
  },

  propTypes: {
    src: string
  },

  getDefaultProps() {
    return {
      className: ''
    }
  },

  getInitialState() {
    return {
      didFail: false,
      isLoaded: false
    }
  },

  componentWillReceiveProps(nextProps) {
    let { src } = this.props

    if (nextProps.src !== src) {
      this.setState({ isLoaded: false })
    }
  },

  render() {
    let { className, ...props } = this.props

    let css = cx({
      'ars-img': true,
      'ars-img-loaded': this.state.isLoaded,
      'ars-img-failed': this.state.didFail,
      [className]: true
    })

    return (
      <img
        className={css}
        onLoad={this._onLoad}
        onError={this._onError}
        {...props}
      />
    )
  },

  _onLoad() {
    setTimeout(
      () => this.setState({ didFail: false, isLoaded: true }),
      Image.ONLOAD
    )
  },

  _onError() {
    this.setState({ didFail: true, isLoaded: true })
  }
})

export default Image
