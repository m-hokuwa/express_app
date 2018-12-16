var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('./chat/chat', { title: 'チャットページ' , AppName: 'チャットページ'});
});

/* POSTされた時の処理 */
router.post('/send', function(req, res, next) {
  
  // この辺に画像に関する処理を書けばOK
  
  // クライアントにJSON形式でReceive
  res.send({recv : '送信完了'});
});

module.exports = router;
