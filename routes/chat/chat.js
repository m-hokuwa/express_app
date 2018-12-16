var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('./chat/chat', { title: 'チャットページ' , AppName: 'チャットページ'});
});

/* POSTされた時の処理 */
router.post('/tab1', function(req, res, next) {
  
  // 
  console.log("受信メッセージ1:", req.body.msg);
  // クライアントにJSON形式でReceive
  res.send({recv : 'タブ1にSend and Receive'});
});

/* POSTされた時の処理 */
router.post('/tab2', function(req, res, next) {
  
  // 
  console.log("受信メッセージ2", req.body.msg);
  // クライアントにJSON形式でReceive
  res.send({recv : 'タブ２にSend and Receive'});
});

module.exports = router;
