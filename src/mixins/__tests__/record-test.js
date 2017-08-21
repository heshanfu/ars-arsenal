describe('Record Mixin', function() {
  let Sync = require('../sync')
  let Record = require('../record')
  let React = require('react')
  let TestUtils = require('react-addons-test-utils')
  let createClass = require('create-react-class')

  function makeComponent() {
    return createClass({
      displayName: 'RecordTest',
      mixins: [Record],
      render: () => <p />
    })
  }

  describe('componentWillMount', function() {
    it('fetches on mount if given a slug', function() {
      let stub = sinon.stub(Sync, 'fetch')
      let Component = makeComponent()

      TestUtils.renderIntoDocument(
        <Component url="base/test/test.json" slug="test" />
      )

      stub.should.have.been.calledWith('test')
      stub.restore()
    })

    it('does not fetch on mount if no slug is provided', function() {
      let stub = sinon.stub(Sync, 'fetch')
      let Component = makeComponent()

      TestUtils.renderIntoDocument(<Component url="base/test/test.json" />)

      stub.should.not.have.been.called
      stub.restore()
    })

    it('fetches when the slug is 0', function() {
      let stub = sinon.stub(Sync, 'fetch')
      let Component = makeComponent()

      TestUtils.renderIntoDocument(
        <Component url="base/test/test.json" slug={0} />
      )

      stub.should.have.been.called
      stub.restore()
    })

    it('does not fetch on NaN', function() {
      let stub = sinon.stub(Sync, 'fetch')
      let Component = makeComponent()

      TestUtils.renderIntoDocument(
        <Component url="base/test/test.json" slug={NaN} />
      )

      stub.should.not.have.been.called
      stub.restore()
    })
  })

  describe('componentWillReceiveProps', function() {
    it('fetches when given a new slug', function() {
      let stub = sinon.stub(Sync, 'fetch')
      let Component = makeComponent()

      let Parent = createClass({
        getInitialState() {
          return { slug: 'test' }
        },
        render() {
          return <Component url="base/test/test.json" slug={this.state.slug} />
        }
      })

      let component = TestUtils.renderIntoDocument(<Parent />)
      component.setState({ slug: 'different-slug' })

      stub.should.have.been.calledTwice
      stub.restore()
    })

    it('does not fetch when given the same slug', function() {
      let stub = sinon.stub(Sync, 'fetch')
      let Component = makeComponent()

      let Parent = createClass({
        getInitialState() {
          return { slug: 'test' }
        },
        render() {
          return <Component url="base/test/test.json" slug={this.state.slug} />
        }
      })

      let component = TestUtils.renderIntoDocument(<Parent />)

      component.setState({ slug: 'test' })

      stub.should.have.been.calledOnce
      stub.restore()
    })
  })

  describe('responseDidSucceed', function() {
    let Component = makeComponent()
    let onFetch = sinon.spy()

    it('calls onFetch when a response succeeds', function() {
      let component = TestUtils.renderIntoDocument(
        <Component url="base/test/test.json" onFetch={onFetch} />
      )

      component.responseDidSucceed('body')

      onFetch.should.have.been.calledWith('body')
    })

    it('sets the error state to false', function() {
      let component = TestUtils.renderIntoDocument(
        <Component url="base/test/test.json" onFetch={onFetch} />
      )

      component.responseDidSucceed()

      component.state.should.have.property('error', false)
    })

    it('sets the item state to the returned value of onFetch', function() {
      let onFetch = () => 'fetched'
      let component = TestUtils.renderIntoDocument(
        <Component url="base/test/test.json" onFetch={onFetch} />
      )

      component.responseDidSucceed()

      component.state.should.have.property('item', 'fetched')
    })
  })

  describe('responseDidFail', function() {
    let Component = makeComponent()

    it('sets the error state to the returned value of onError, and item to false', function() {
      let onError = response => `${response} error!`
      let component = TestUtils.renderIntoDocument(
        <Component url="base/test/test.json" onError={onError} />
      )

      component.responseDidFail('terrible')

      component.state.should.have.property('error', 'terrible error!')
      component.state.should.have.property('item', false)
    })
  })
})
