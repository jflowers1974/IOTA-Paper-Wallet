// require modules
var fs = require('fs');
var archiver = require('archiver');

// create a file to stream archive data to.
var output = fs.createWriteStream('out/offline-build.zip');
var archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
});

// listen for all archive data to be written
output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

// good practice to catch warnings (ie stat failures and other non-blocking errors)
archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
      // log warning
  } else {
      // throw error
      throw err;
  }
});

// good practice to catch this error explicitly
archive.on('error', function(err) {
  throw err;
});


// append files from a sub-directory, putting its contents at the root of archive
archive.directory('img/', 'img');
archive.directory('fonts/', 'fonts');
archive.directory('css/', 'css');
archive.directory('js/', 'js');
archive.file('index.html', { name: 'index.html' });


// pipe archive data to the file
archive.pipe(output);

// finalize the archive (ie we are done appending files but streams have to finish yet)
archive.finalize();