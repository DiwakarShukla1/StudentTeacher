'use strict';

angular.module('angularApp')
  .factory('Users', function Users($resource) {
        return $resource('User/:userId', {
            farmerId: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            query:{
                method:'GET', isArray:true
            }
        });
    });
