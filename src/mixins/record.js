/**
 * Record Mixin
 * Sync operations for a single record
 */

import Sync from './sync'
import invariant from 'invariant'

export default {
  mixins: [Sync],

  getInitialState() {
    return {
      fetching: false,
      item: false
    }
  },

  fetchIf(slug) {
    if (slug || slug == 0) {
      this.setState({ fetching: true })
      this.fetch(slug)
    } else {
      this.setState({ item: false, fetching: false })
    }
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

    this.fetchIf(this.props.slug)
  },

  componentWillReceiveProps(props) {
    if (props.slug !== this.props.slug) {
      this.fetchIf(props.slug)
    }
  },

  responseDidSucceed(response) {
    let item = this.props.onFetch(response)

    this.setState({ item, fetching: false, error: false })
  },

  responseDidFail(response) {
    let error = this.props.onError(response)

    this.setState({ item: false, fetching: false, error })
  }
}
