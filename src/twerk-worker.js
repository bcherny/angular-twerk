// mock stuff for angular
var document = {
  addEventListener: function(){},
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
  state: {},
  history: {
    state: {}
  },
  url: {}
}

this.state = {}

importScripts('../bower_components/angular/angular.js')

// not this is a sandboxed module, and has no knowledge of the main twerk module
window.angular
.module('twerk', [])
.run(function ($http, $log) {

  console.info('initialized twerkworker', this.performance.now())

  onmessage = function onMessage (e) {

    console.log('message', e)

  }

}.bind(this))

// since the worker can't interact with the DOM,
// we need to manually bootstrap our app
window.angular
.bootstrap(document, ['twerk'])