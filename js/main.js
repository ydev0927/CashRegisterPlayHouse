(function(){
  'use strict'

  const opts = {
    resultFunction: function(res) {
      setMessage(res.format + ": " + res.code);
    },
    cameraSuccess: function(stream) {
      console.log('cameraSuccess');
    },
    canPlayFunction: function() {
      console.log('canPlayFunction');
    },
    getDevicesError: function(error) {
      setMessage(error);;
    },
    getUserMediaError: function(error) {
      setMessage(error);
    },
    cameraError: function(error) {
      setMessage(error);
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
        const item = new itemCls(Math.ceil(Math.random() * 100));
        this.history.push(item);
      }
    }
  });

  function setMessage(message){
    console.log(message);
    controller.message = message;
  }

})();