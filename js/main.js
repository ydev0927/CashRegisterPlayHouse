(function(){
  'use strict'

  const opts = {
    beep : false,
    resultFunction: function(res) {
      console.log(res.format + ": " + res.code);

      //バーコードからコストを算出
      const costCode = res.code.substr(res.code.length - 5, 4);
      const cost = Number(costCode);
      const item = new itemCls(cost);
      //履歴に追加
      store.pushHistory(item);
      // 音声を再生
      const uttr = new SpeechSynthesisUtterance(`${cost}えんがいってん`);
      speechSynthesis.speak(uttr)
    },
    cameraSuccess: function(stream) {
      console.log('cameraSuccess');
    },
    canPlayFunction: function() {
      console.log('canPlayFunction');
    },
    getDevicesError: function(error) {
      console.log(error);
      vmController.message = error;
    },
    getUserMediaError: function(error) {
      console.log(error);
      vmController.message = error;
    },
    cameraError: function(error) {
      console.log(error);
      vmController.message = error;
    }
  }

  const decoder = new WebCodeCamJS('#display');
  decoder.init(opts);
  decoder.play();

  const itemCls = function(cost){
    this.cost = cost;
  };

  const store = window.store = {
    state : {
      history : []
    },
    pushHistory : function(item){
      this.state.history.push(item);
    },
    removeHistory: function(index){
      this.state.history.splice(index, 1);
    },
    clearHistory: function(){
      this.state.history = [];
    }
  };

  const MODE = {
    Newest : 0x00,
    History : 0x01,
  }

  const vmController = new Vue({
    el : "#v-controller",
    data : {
      appState : store.state,
      message : "",
      mode : MODE.Newest
    },
    computed: {
      totalcost : function(){
        return this.appState.history.reduce((prev, item) => prev + item.cost, 0);
      },
      lastItem : function(){
        return this.appState.history.length ? this.appState.history[this.appState.history.length - 1] : {};
      },
      visibleNewest : function(){
        return this.mode === MODE.Newest;
      },
      visibleHistory : function(){
        return this.mode === MODE.History;
      }
    },
    methods: {
      onStartBtnClick : function(){
        store.clearHistory();
      },
      onHistoryBtnClick : function(){
        if(this.mode === MODE.Newest){
          this.mode = MODE.History;
        }else{
          this.mode = MODE.Newest
        };
      },
      onTestBtnClick : function(){
        opts.resultFunction({ code : "0000000000000000000" + Math.ceil(Math.random() * 100)});
      },
      removeHistory : function(index){
        store.removeHistory(index);
      },
      getTotalFormula : function(index){
        console.log(index);
        const prevCost = this.appState.history
                        .filter((item, _index) => _index < index)
                        .reduce((prev, current) => prev + current.cost, 0);
        const cost = this.appState.history[index].cost;
        return `${prevCost} + ${cost} = ${prevCost + cost}`;
      }
    }
  });

})();