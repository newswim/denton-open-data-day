const fetch = require('node-fetch')
const jsonf = require('jsonfile')
const all_datastores = require('../data/all_datastores').all_datastores.result

const baseUrl = 'http://data.cityofdenton.com/'
const url = 'http://data.cityofdenton.com/api/3/action/package_show?id='
const package_list_endpoint = 'api/3/action/package_list'
const test_package_endpoint = 'alt-development-plan'

let json_bank = '../data/issue_data.json'

function fetchMetaData (name) {
    return fetch(url + name)
    .then(response => response.json())
    .then(json => {
      var obj = {
        title: json.result.title,
        id: json.result.id,
        description: json.result.notes,
        created: new Date(Date.parse(json.result.metadata_created)).toDateString().slice(4),
        modified: new Date(Date.parse(json.result.metadata_modified)).toDateString().slice(4),
        state: json.result.state,
        organization: json.result.organization.title,
        group: json.result.groups[0]['display_name'],
        tags: json.result.tags.map(i => i['display_name']),
        url: json.result.resources[0].url

      }
      return obj
    })
    .catch(err => console.log(err.message))
}

let performFetch = all_datastores.map(fetchMetaData)
let results = Promise.all(performFetch)

  // should return an array as a result of calling map
results.then((data) => jsonf.writeFile(json_bank, data, (err) => console.error(err)))
  // .then(data => console.log(data))
  .catch(err => console.log(err.message))


/*
    ======================
    The Data That We Want.
    ======================

dataset title
dataset id
dataset description
date created
date updated
state
# of resources + resources types (or even a small subset of resource info)
tags
organization
group
generated url

*/
