var targz = require('targz');
const zlib = require('zlib')
// compress files into tar.gz archive
const gzipme = require('gzipme');

const fg = require('fast-glob');
var fs = require('fs');
// var zlib = require('zlib');
let compress = function (e) {
  return new Promise((resolve, reject) => {
    targz.decompress({
      src: `${e}.gz`,
      dest: `${e}.d.gz`
    }, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Done!");
      }
      resolve();
    });
  });
};


compress = function(filePath){
  var output = fs.createWriteStream(`${filePath}.gz`);
  var compress = zlib.createGzip();
  compress.pipe(output);
  compress.write('Hello, World!');
}

fg(['../../dist/**/*.js', '!../../dist/**/*.spec.json']).then((entries) =>{
  console.log(entries)
 const fl = entries.map((e)=>{
      //return compress(e)
   gzipme(e,`${e}.gz`,'best');
  });

  Promise.all(fl).then(_=>console.log('done'));

} );
