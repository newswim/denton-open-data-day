const najax = $ = require('najax')
const all_datastores = require('../data/all_datastores.js').all_datastores

const url = 'http://data.cityofdenton.com/'
const package_list = 'api/3/action/package_list'
const test_package = 'alt-development-plan'

function successHandler (data) {
  // Object we'll build up from the result array
  let accum = {}

  let endpoint = 'http://data.cityofdenton.com/api/3/action/'
  let name = 'alt-development-plan'

  if (result.length == 0) {
    return new Error('Result was empty')
  }

  data['result'].map((name) => {
    var getFields = najax({
      url: endpoint,
      data: {
        package_show: name,
        // opt. :limit:
      },
      dataType: 'jsonp',
      success: pluckFields
    });

    return getFields
  })
}

function pluckFields (obj) {
  return {
    description: obj['result'].notes,
    group: obj['result'].groups['display_name'],
    tags: obj['result'].tags['display_name'],
    created: obj['result'].metadata_created,
    modified: obj['result'].metadata_modified
  }
}

najax({
  url: url + package_list,
  data: data,
  dataType: 'jsonp',
  success: successHandler
});
