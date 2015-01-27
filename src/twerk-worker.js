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
  document: document,
  location: {
    href: {},
    state: {}
  }
}

navigator.state = {}

console.log(this)

importScripts('../bower_components/angular/angular.js')

// not this is a sandboxed module, and has no knowledge of the main twerk module
window.angular
.module('twerk', [])
.run(function () {

  console.log('init twerkworker')

  onmessage = function onMessage (e) {

    console.log('message', e)

  }

})

window.angular
.bootstrap(document, ['twerk'])