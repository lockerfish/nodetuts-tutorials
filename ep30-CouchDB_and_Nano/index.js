var nano = require('nano');
var server = nano('http://username:password@episode30.iriscouch.com');

var doc1 = {
  a: 1,
  b: 2,
  c: 'abc',
  d: [1, 2, 3]
};

var db = server.use('mydb');

// create database and insert a document

server.db.create('mydb', function(err) {
  if(err) { throw err; }

  console.log('created mydb');

  db.insert(doc1, 'doc_one', function(err) {
    if(err) { throw err; }

    console.log('inserted obj1');

    db.get('doc_one', function(err, val) {
      console.log('doc_one = ', val);
    });
  });

});
//////////////////////////////////////////////////////////////////////////////
//
// getting doc_one and inserting a new revision
//
// db.get('doc_one', function(err, val) {
//  if(err) { throw err; }
//
//  console.log('got value of doc_one: ', val);
//
//  // making changes to doc_one
//  val.f = 1;
//
//  db.insert(val, function(err) {
//    if(err) { throw err; }
//    console.log('inserted obj1');
//
//    db.get('doc_one', function(err, val) {
//      console.log('doc_one = ', val);
//    });
//  });
//
// });
//////////////////////////////////////////////////////////////////////////////
//
// piping IN attachment to the database
// var fs = require('fs');
//
// var readStream = fs.createReadStream('../images/me2.jpg');
//
// readStream.pipe(db.attachment.insert('doc_two', 'my_photo', null, 'image/jpeg'));
// // or we could target specific revision
// // readStream.pipe(db.attachment.insert('doc_two', 'my_photo', null, 'image/jpeg', {rev: "1-0244b0756518cad9c6c8a1d92faa6d3a"}));
//////////////////////////////////////////////////////////////////////////////
//
// piping OUT attachment to the database
// var fs = require('fs');
//
// var writeStream = fs.createWriteStream('/tmp/me2.jpg');
//
// db.attachment.get('doc_two', 'my_photo').pipe(writeStream);
//
