## Running these examples

I'm using [yarn] as our package management client, you can read more about it
by going to their website, if you're on MacOS and have a current version of
[Node] installed, you can just run the following:

```shell
homebrew update
homebrew install yarn
cd path/to/this/project
yarn
[will install all dependencies]
```

We're currently only using two external libraries, these just make it a little
easier to write requests and process results. It could be done without the extra
libraries, but that would be... a tiny bit more code (unacceptable!)


#### Querying CKAN

JavaScript example:

```js
var data = {
  resource_id: '283f49d0-9e9a-4c5c-bb51-046b0a8a890c', // the resource id
  limit: 5, // get 5 results
  q: 'jones' // query for 'jones'
};
$.ajax({
  url: 'http://data.cityofdenton.com/api/action/datastore_search',
  data: data,
  dataType: 'jsonp',
  success: function(data) {
    alert('Total results found: ' + data.result.total)
  }
});
```




[yarn]: https://yarnpkg.com "Yarn NPM Client"
[Node]: https://nodejs.org "JavaScript runtime that runs on a server"
