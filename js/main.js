(function(){
  'use strict'

  const decoder = new WebCodeCamJS('#display');
  decoder.init();
  decoder.play();

  const itemCls = function(cost){
    this.cost = cost;
  };

  const controller = new Vue({
    el : "#v-controller",
    data : {
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

})();