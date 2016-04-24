/* global io, window, FileReader, moment */
'use strict';

angular
  .module('dashboard.businesses')
  .controller('BusinessDetailModalController', BusinessDetailModalController)
  .directive('fileread', [function () {
    return {
      scope: {
          fileread: '='
      },
      link: function (scope, element) {
        element.bind('change', function (changeEvent) {
          scope.$apply(function () {
            scope.fileread = changeEvent.target.files[0];
          });
        });
      }
    };
}]);

/* @ngInject */
function BusinessDetailModalController($modalInstance, business, $rootScope) {
  /* jshint validthis: true */
  var vm = this,
      socket,
      FReader,
      uuid,
      ext,
      fileName,
      selectedFile;

  vm.api = {
    activate: activate,
    ok: ok,
    cancel: cancel,
    remove: remove,
    startUpload: startUpload
  };

  activate();

  ////////////////

  function activate() {
    vm.business = business;
    vm.uploaded = false;
    vm.uploading = false;
    vm.mBDone = 0;
    setSocketIO();
  }

  function ok(business) {
    $modalInstance.close(business);
  }

  function cancel() {
    $modalInstance.dismiss(false);
  }

  function remove() {
    $modalInstance.dismiss(true);
  }

  function setSocketIO() {
    socket = io('http://192.168.99.100:8080');

    socket.on('MoreData', function(data) {
      updateBar(data.Percent);
      var Place = data.Place * 524288;
      var NewFile;

      NewFile = selectedFile.slice(Place, Place + Math.min(524288, (selectedFile.size - Place)));
      FReader.readAsBinaryString(NewFile);
    });

    socket.on('Done', function() {
      vm.uploaded = true;
      vm.uploading = false;
      $rootScope.$apply();
    });
  }

  function updateBar(percent) {
    vm.progress = Math.round(percent * 100) / 100;
    vm.mBDone = Math.round(((percent / 100.0) * selectedFile.size) / 1048576);
    $rootScope.$apply();
  }

  function startUpload(file) {
    if (file.value !== '') {
      selectedFile = file;
      FReader = new FileReader();
      ext = file.name.split('.')[1];
      fileName = vm.business.id + '_' + moment().format('DD-MM-YY_HH:mm:ss');
      uuid = guid();

      FReader.onload = function(evnt) {
        socket.emit('Upload', { uuid: uuid, Data: evnt.target.result });
      };

      vm.progress = 0;
      vm.fileSize = Math.round(file.size / 1048576);
      vm.uploading = true;
      socket.emit('Start', { uuid: uuid, name: fileName, Size: file.size });
    } else {
      window.alert('Please Select A File');
    }
  }

  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
}
