const najax = $ = require('najax')
const jsonf = require('jsonfile')

let file = '../data/test.json'
// We could use a replacer to filter out or edit properties on the fly
// for example, we might want only certain data types (eg. csv or excel files)
let options = {}

// Json-File configuration
jsonf.spaces = 4

// 1. Ask for the server for a file or some data

var data = {
  resource_id: '814a6238-8a8e-4ab9-9cbf-18288cdc5c38', // the resource id
  // limit: 5, // get 5 results
  // q: 'jones' // query for 'jones'
};

// 2. Write that file to the /data folder
/* https://www.npmjs.com/package/jsonfile#writefilefilename-obj-options-callback */
// Takes an optional [replacer] parameter
// -- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_replacer_parameter

let successHandler = (data) => {
  jsonf.writeFile(file, data, function (err) {
    console.error(err)
  })
}

// perform the query -- request will be a deferred (asyncronous) operation

najax({
  url: 'http://data.cityofdenton.com/api/action/datastore_search',
  data: data,
  dataType: 'jsonp',
  success: successHandler
});


// 3. Experiment with different kinds of analysis
