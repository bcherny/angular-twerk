// mock stuff for angular
var document = {
  addEventListener: function(){},
  cookie: '',
  createElement: function (){
    return {
      addEventListener: function(){},
      pathname: '',
      setAttribute: function(){}
    }
  },
  querySelector: function () {}
}
var window = {
  addEventListener: function(){},
  console: this.console,
  document: document,
  location: {
    href: '',
    url: ''
  },
  history: {
    state: {}
  },
  clearTimeout: this.clearTimeout,
  setTimeout: this.setTimeout,
  XMLHttpRequest: this.XMLHttpRequest
}

// load angular
importScripts('../bower_components/angular/angular.js')

// not this is a sandboxed module, and has no knowledge of the main twerk module
window.angular
.module('twerk', [])
.run(['$http', '$log', function ($http, $log) {

  console.info('initialized twerkworker', this.performance.now())

  onmessage = function onMessage (e) {

    var method = e.data[0].toLowerCase()

    console.info('twerkworker got message', method, e.data.slice(1))

    if (!$http[method]) {
      throw new Error('HTTP method not supported')
      return
    }

    $http[method].apply($http, e.data.slice(1)).then(function (res) {

      // var arr = new Float32Array(res.length)

      postMessage(res, [res])

    }, function (err) {
      throw err
    })

  }

}.bind(this)])

// since the worker can't interact with the DOM,
// we need to manually bootstrap our app
window.angular
.bootstrap(document, ['twerk'])