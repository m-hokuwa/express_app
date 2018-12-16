var express = require('express');
var router = express.Router();
var multer = require('multer');

// multerの設定
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // '/public/upload_temp'に保存する
    cb(null, './public/upload_tmp')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

var upload = multer({ storage: storage });

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('./imgup/imgup', { title: '画像アップロードページ' , AppName: '画像になにかしらの処理をします'});
});

/* POSTされた時の処理 */
router.post('/upload', upload.array('image', 12), function(req, res, next) {
  
  console.log("Request検知");
  // この辺に画像に関する処理を書けばOK
  
  // クライアントにJSON形式でReceive
  res.send({recv : '送信完了'});
});

module.exports = router;
