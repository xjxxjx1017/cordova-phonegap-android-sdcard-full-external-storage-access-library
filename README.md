# Cordova/Phonegap
# Android sdcard & external storage access API

##### This is a sample API of using cordova-plugin-files to scan sdcard & external-storage in Android

### Example:
```javascript
new ExternalStorageSdcardAccess( fileHandler, null ).scanPath( "file:///storage/sdcard1/music" );
function fileHandler( fileEntry ) {
    console.log( fileEntry.name + " | " + fileEntry.toURL() );
}
```

### Installation:

* **install** cordova-plugin-files from: https://github.com/apache/cordova-plugin-file

* **.Html**
```
<meta http-equiv="Content-Security-Policy"
          content="default-src *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'">
<script src="js/exernalStorageSdcardAccess.js"></script>
```
* **config.xml**
```
<preference name="AndroidPersistentFileLocation" value="Compatibility" />
<preference name="AndroidExtraFilesystems" value="files,files-external,documents,sdcard,cache,cache-external" />

```
* make sure testing environment can access it's own external storage at the time of testing. ( e.p. if you connect it with usb, make sure it is connected as a camera )

### Things need to know before looking into the source code
DirectoryEntry  https://cordova.apache.org/docs/en/2.4.0/cordova/file/directoryentry/directoryentry.html
<br>
FileEntry   http://docs.phonegap.com/en/edge/cordova_file_file.md.html#FileEntry

### About correct path parameter
```javascript
"cdvfile://localhost/",                 // * Err 5 (wrong pattern)
"file:///",                             // * root, directoryEntry
"file:///somefile/",                    // * somefile, directoryEntry
"file:///somefile",                     // * somefile, directoryEntry
"file:///randomdumbname",               // * Err 1, (not found)
"file:///somefile/ACG/aaaaa.mp3",       // * OK, fileEntry
```
