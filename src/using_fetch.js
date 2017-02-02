// typically we import libraries first
const fetch = require('node-fetch')
const jsonf = require('jsonfile')
const all_datastores = require('../data/all_datastores').all_datastores.result

// const url = 'http://data.cityofdenton.com/'
const url = 'http://data.cityofdenton.com/api/3/action/package_show?id='
const package_list_endpoint = 'api/3/action/package_list'
const test_package_endpoint = 'alt-development-plan'

let json_bank = '../data/issue_data.json'

var accum = []

var arr = all_datastores.forEach(name => {
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
  .then(obj => accum.push(obj))
  // .then(() => console.log(accum))
  .catch(err => console.log(err.message))
})

// There's probably a better way to do this with Promise.all
setTimeout(() => {
    jsonf.writeFile(json_bank, accum, (err) => console.error(err))
  }
  , 20000)

/*
    ======================
    The Data That We Want.
    ======================
*/
/*
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
