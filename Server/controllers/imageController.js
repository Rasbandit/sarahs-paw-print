var app = require('./../index');
var db = app.get('db');

module.exports = {

   getPortraits: function(req, res) {
      db.get_portraits(function(err, products) {
            res.status(200).send(products);
      })
    },

    getOthers: function(req, res) {
       db.get_other(function(err, products) {
             res.status(200).send(products);
       });
    },

   upload: function(req, res) {
      var file = req.files.file;
      var stream = fs.createReadStream(file.path);
      return s3fsimp.writeFile(file.origninalFilename, stream).then(function() {
         fs.unlink(file.path, function(err){
            if(err) {
               console.log(err);
            }
         })
         res.redirect('/profile')
      })
   }

}
