(function(){
  'use strict'

  const opts = {
    beep : false,
    resultFunction: function(res) {
      console.log(res.format + ": " + res.code);
      controller.pushRes(res);
    },
    cameraSuccess: function(stream) {
      console.log('cameraSuccess');
    },
    canPlayFunction: function() {
      console.log('canPlayFunction');
    },
    getDevicesError: function(error) {
      console.log(error);
      controller.message = error;
    },
    getUserMediaError: function(error) {
      console.log(error);
      controller.message = error;
    },
    cameraError: function(error) {
      console.log(error);
      controller.message = error;
    }
  }

  const decoder = new WebCodeCamJS('#display');
  decoder.init(opts);
  decoder.play();

  const itemCls = function(cost){
    this.cost = cost;
  };

  const controller = new Vue({
    el : "#v-controller",
    data : {
      message : "",
      history: []
    },
    computed: {
      totalcost : function(){
        return this.history.reduce((prev, item) => prev + item.cost, 0);
      },
    },
    methods: {
      onStartBtnClick : function(){
        this.history = [];
      },
      onTestBtnClick : function(){
        this.pushRes({ code : "0000000000000000000" + Math.ceil(Math.random() * 100)});
      },
      pushRes: function(res){
        //バーコードからコストを算出
        const costCode = res.code.substr(res.code.length - 5, 4);
        const cost = Number(costCode);
        //履歴に追加
        this.history.push(new itemCls(cost));
        // 音声を再生
        const uttr = new SpeechSynthesisUtterance(`${cost}えんがいってん`);
        speechSynthesis.speak(uttr)
      },
    }
  });

})();