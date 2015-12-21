

var ExternalStorageSdcardAccess = function ( _fileHandler, _errorHandler ) {

    var errorHandler = _errorHandler || _defultErrorHandler;
    var fileHandler = _fileHandler || _defultFileHandler;
    var root = "file:///";

    return {
        scanRoot:scanRoot,
        scanPathList:scanPathList,
        scanPath:scanPath
    };

    function scanPath( path ) {
        window.resolveLocalFileSystemURL(path, _gotFiles, errorHandler );
    }

    function scanRoot() {
        scanPath( root );
    }

    function scanPathList( arrayOfPath ) {
        arrayOfPath.forEach( function ( p ) {
            scanPath( p );
        } );
    }

    function _gotFiles(entry) {
    // ? Check whether the entry is a file or a directory
    if (entry.isFile) {
        // * Handle file
        fileHandler( entry );
    }
    else {
        // * Scan directory and add media
        var dirReader = entry.createReader();
        dirReader.readEntries( function(entryList) {
            entryList.forEach( function ( entr ) {
                _gotFiles( entr );
            } );
        }, errorHandler );
    }
}

    function _defultFileHandler(fileEntry){
        console.log( "FileEntry: " + fileEntry.name + " | " + fileEntry.fullPath );
    }
    function _defultErrorHandler(error){
        console.log( 'File System Error: ' + error.code );
    }
};


/*
var SAMPLE_PATH_LIST= [
     "cdvfile://localhost/",                 // * Err 5
     "file:///",                             // * root
    "file:///storage/",                         // * storage
    "file:///storage/sdcard1/music",            // * Err 1
    "file:///storage/sdcard1/music/",           // * acg
    "file:///storage/sdcard1/music/ACG/aaaaa.mp3",  // * OK
];

// Test:

 new ExternalStorageSdcardAccess( fileHandler, null ).scanPath( "file:///storage/sdcard1/music" );

 function fileHandler( fileEntry ) {
     console.log( fileEntry.name + " | " + fileEntry.toURL() );
 }
*/
