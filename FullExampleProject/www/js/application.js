
var Application = {
    initApplication: function() {
        new ExternalStorageSdcardAccess( successHandler, errorHandler ).scanPath( "file:///" );
        function errorHandler( error ) {
            alert( error.error );
        }
        function successHandler( fileEntry ) {
            alert( fileEntry.name + " | " + fileEntry.fullPath );
        }
    }
};