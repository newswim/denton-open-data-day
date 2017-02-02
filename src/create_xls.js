const json2xls = require('json2xls');
const fs = require('fs')

// fetch data
// ...

/**
 * createXLS - Generate an excel file from JSON object, wrapper for json2xls
 *
 * @param  {object} json       A valid JSON object
 * @param  {string} output     A valid file path, ending with file name (eg. '../data/data.xls')
 * @param  {string} encoding   Should be 'binary' in order to write .xls files
 * @returns {undefined}        FS returns undefined, we just log the file path
 */
function create_xls (json, output, encoding = 'binary') {
  /**
   * json2xls - Utility to convert json to a excel file
   *
   * @param {object} json      A valid JSON object
   * @param {object} options   Containing two keys, <style> and <fields>
   * @returns {undefined}      Does not return anything
   */
   /*
   * - <style>:  a styles xml file, see <https://github.com/functionscope/Node-Excel-Export>
   * - <fields>: either an array or map containing field configuration:
   *    - array:  a list of names of fields to be exported, in that order
   *    - object: a map of names of fields to be exported and the types of
   *              those fields. Supported types are 'number','string','bool'
   */
  let xls = json2xls(json)

  console.log('Begin file write...')

  try {
    // TODO: add better error handling
    fs.writeFileSync(output, xls, encoding);
  }
  catch (err) {
    throw err.message
  }

  console.log(`End file write to ${output}`)
}

module.exports.create_xls = create_xls
