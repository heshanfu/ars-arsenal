/**
 * MultiSelection
 */

let Button             = require('./ui/button')
let MultiSelectionItem = require('./multiselection-item')
let SelectionText      = require('./selection-text')
let React              = require('react')
let Types              = React.PropTypes
let cx                 = require('classnames')

let MultiSelection = React.createClass({

  propTypes: {
    resource: React.PropTypes.string.isRequired,
    slug: Types.array
  },

  getItems() {
    let { slug, url } = this.props
    if (slug && slug.length > 0) {
      return (
        <div className="ars-multiselection-grid">
          { slug.map( (s, i) => (<MultiSelectionItem key={ i } slug={ s } url={ url } />) ) }
        </div>
      )
    }
  },

  render() {
    let { slug } = this.props

    return (
      <div className="ars-multiselection">
        { this.getItems() }

        <Button ref="button" onClick={ this._onClick } className="ars-selection-edit">
          <SelectionText resource={ this.props.resource } item={ slug && slug.length > 0 } isPlural={ true } />
          <span className="ars-selection-button-icon" aria-hidden="true"></span>
        </Button>
      </div>
    )
  },

  _onClick(e) {
    e.preventDefault()
    this.props.onClick(e)
  }

})

module.exports = MultiSelection
