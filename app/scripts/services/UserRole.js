/**
 * Created by samphal on 10/3/14.
 */
angular.module('angularApp')
    .factory('UserRole', function Users() {
        var Role="";
        var setRole=function(role){
            this.Role=role;
        }

        var getRole=function()
        {
            return Role;
        }

        return{
            setRole:setRole,
            getRole:getRole
        };
    });