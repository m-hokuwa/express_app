$('#up-photo').submit(function(event){

    console.log('Ajax通信開始');

    // HTMLでの送信をキャンセル
    event.preventDefault();

    // 操作対象のフォーム要素を取得
    var $form = $(this);
    // formの情報を取得
    var $param = new FormData($(this)[0]);
 
    // 送信ボタンを取得
    var $button = $form.find('button');

    // 送信
    $.ajax({
        url: $form.attr('action'),
        type: $form.attr('method'),
        data: $param,
        processData: false, // jQueryがデータを処理しないよう指定
        contentType: false,  // jQueryがcontentTypeを設定しないよう指定
        timeout: 10000,  // 単位はミリ秒
        dataType : 'json',
 
        // 送信前
        beforeSend: function(xhr, settings) {
            // ボタンを無効化し、二重送信を防止
            $button.attr('disabled', true);
        },
        // 応答後
        complete: function(xhr, textStatus) {
            // ボタンを有効化し、再送信を許可
            $button.attr('disabled', false);
        },
 
    }).done(function(res){
        console.log('SUCCESS', res);
        $("#result").text(res.recv);
    }).fail(function(jqXHR, textStatus, errorThrown){
        console.log('ERROR', jqXHR, textStatus, errorThrown);
    });

});

$('#msg-send').click(function(){

    // テキストエリアの入力値を取得
    var text = $("#message").val();

    // 入力を見る
    if(text.length === 0){
        console.log("入力が空");
        return;
    }

    // 有効化されているタブを検知する
    var active_tab = document.getElementsByClassName('nav-link active show');

    // active tabの長さが0の場合タブ１
    if(active_tab.length == 0){
        console.log("送信がおされた タブ1");
        msgSendAndRecv(msgRender, "/chat/tab1", text);
    }
    else{
        if(active_tab[0].text == "タブ1"){
            console.log("送信がおされた タブ1");
            msgSendAndRecv(msgRender, "/chat/tab1", text);
        }
        else if(active_tab[0].text == "タブ2"){
            console.log("送信がおされた タブ2");
            msgSendAndRecv(msgRender, "/chat/tab2", text);
        }
        else{
            console.log("ちょっと意味わからない");
        }
    }

});

function msgSendAndRecv(callback, requrl, reqmsg){

    console.log(reqmsg);

    $.ajax({
        url: requrl,
        type: "POST",
        data: {"msg": reqmsg},
        timeout: 10000,
        dataType : 'json'
 
    }).done(function(res){
        //console.log('SUCCESS', res);
        callback(res.recv);
    }).fail(function(jqXHR, textStatus, errorThrown){
        console.log('ERROR', jqXHR, textStatus, errorThrown);
    });

}

function msgRender(msg){
    console.log("Receive", msg);
}