angular
.module('twerk', [])
.service('twerk', function ($q) {

  var worker = new Worker('../src/twerk-worker.js')

  return {

    get: function () {

      var deferred = $q.defer()

      worker.postMessage(['GET'].concat(arguments))
      worker.onmessage = function onMessage (e) {
        console.log('onMessage', e)
      }

      return deferred.promise


    }

  }

})