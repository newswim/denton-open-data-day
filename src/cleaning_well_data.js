const data = require('../data/well_data.js')
const _ = require('lodash')
const d3 = require('d3')

let records = data["result"]["records"]

// let sumIds = _.sum(_.map(records, i => i["_id"]))

// let owners = _.uniq(_.map(records, i => i["Operator"]))

let groupedOwners = _.groupBy(records, "Operator")

let sumOfGroups = _.map(groupedOwners, (v) => {
  return { [v[0]["Operator"]] : v.length }
})

console.log(sumOfGroups)

// This is just the first 500 records....

/*
[ { Vantage: 9 },
  { Devon: 35 },
  { Eagleridge: 14 },
  { Enervest: 7 },
  { 'Clearfork Production': 1 },
  { Endeavor: 2 },
  { Legend: 12 },
  { XTO: 5 },
  { '\nAllegiance\n(Operator Number 013301)': 1 },
  { Trio: 1 },
  { Spindletop: 1 },
  { 'M. Shidler': 2 },
  { Brammer: 7 },
  { Bend: 3 } ]
*/
