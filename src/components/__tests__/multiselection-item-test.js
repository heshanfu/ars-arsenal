import React from 'react'
import TestUtils from 'react-dom/test-utils'
import MultiSelectionItem from '../multiselection-item'

describe('MultiSelectionItem', () => {
  describe('when given an item', () => {
    test('renders a photo', () => {
      let component = TestUtils.renderIntoDocument(
        <MultiSelectionItem url="/test.json" />
      )

      component.setState({ item: { url: '/test.jpg' } })

      expect(component.refs).toHaveProperty('photo')
    })
  })

  describe('when not given an item', () => {
    test('does not render a photo', () => {
      let component = TestUtils.renderIntoDocument(
        <MultiSelectionItem url="/test.json" />
      )

      expect(component.refs).not.toHaveProperty('photo')
    })
  })
})
