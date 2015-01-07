/**
 * Photo
 * The resource responsible for fetching and managing operations related to
 * the API endpoint for images.
 */

import xhr from 'xhr'

let Photo = {

  fetch(url, success, error) {
    let request = xhr({ url, json: true }, function(err, response, body) {
      err ? error(err) : success(body)
    })

    return request
  },

  filter(items, query = false) {
    let pattern = new RegExp(query, 'i')

    return query ? items.filter(i => i.caption.match(pattern)) : items
  },

  find(items, id = false) {
    if (!id) return null

    return items.find(i => i.id.toString() === id.toString())
  },

  datalist(items) {
    return items.map(i => i.caption)
  }

}

export default Photo
