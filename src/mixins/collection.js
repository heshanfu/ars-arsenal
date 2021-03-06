/**
 * Collection Mixin
 * Sync operations for a list of items
 */

import Sync from './sync'
import invariant from 'invariant'

export default {
  mixins: [Sync],

  getInitialState() {
    return {
      items: []
    }
  },

  componentDidMount() {
    this.fetch()
  },

  componentWillMount() {
    invariant(
      this.responseDidSucceed,
      'Component requires a responseDidSucceed method'
    )
    invariant(
      this.responseDidFail,
      'Component requires a responseDidFail method'
    )
  },

  responseDidSucceed(response) {
    let items = this.props.onFetch(response) || []

    this.setState({ items, error: false })
  },

  responseDidFail(response) {
    let error = this.props.onError(response)

    this.setState({ error })
  }
}
