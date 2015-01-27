angular
.module('twerk', [])
.service('twerk', function ($q) {

  var worker = new Worker('../src/twerk-worker.js')

  return {

    get: function () {

      var deferred = $q.defer()

      worker.postMessage(['GET'].concat([].slice.call(arguments)))
      worker.onmessage = function onMessage (e) {
        deferred.resolve(e.data)
      }

      return deferred.promise


    }

  }

})