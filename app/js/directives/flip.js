angular.module('app').directive("flip", function(){

  function setDim(element, width, height){
    element.style.width = width;
    element.style.height = height;
  }

  var cssString =
    "<style> \
    .flip {float: left; overflow: hidden} \
    .flipBasic { \
    position: absolute; \
    -webkit-backface-visibility: hidden; \
    backface-visibility: hidden; \
    transition: -webkit-transform .5s; \
    transition: transform .5s; \
    -webkit-transform: perspective( 600px ) rotateY( 0deg ); \
    transform: perspective( 600px ) rotateY( 0deg ); \
    } \
    .flipHideBack { \
    -webkit-transform:  perspective(600px) rotateY( 180deg ); \
    transform:  perspective(600px) rotateY( 180deg ); \
    } \
    .flipHideFront { \
    -webkit-transform:  perspective(600px) rotateY( -180deg ); \
    transform:  perspective(600px) rotateY( -180deg ); \
    } \
    </style> \
    ";

  document.head.insertAdjacentHTML("beforeend", cssString);


  return {
    restrict : "E",
    controller: function($scope, $element, $attrs){

      var self = this;
      self.front = null,
      self.back = null;
      self.showBack = showBack;
      self.showFront = showFront;
      self.isBack = isBack;


      function showFront(){
        self.front.removeClass("flipHideFront");
        self.back.addClass("flipHideBack");
      }

      function isBack(){
        if(self.back.hasClass("flipHideBack"))
          return false;
        return true;
      }

      function showBack(){
        self.back.removeClass("flipHideBack");
        self.front.addClass("flipHideFront");
      }

      self.init = function(){
        self.front.addClass("flipBasic");
        self.back.addClass("flipBasic");

        showFront();
        self.front.on("click", showBack);
        self.back.on("click", showFront);
      }


    },

    link : function(scope,element,attrs, ctrl){

      var width = attrs.flipWidth || "350px",
        height =  attrs.flipHeight || "300px";

      element.addClass("flip");

      element.bind("keypress", function(event) {
        if(event.keyCode === 13) {
          if(ctrl.isBack())
            ctrl.showFront();
          else
            ctrl.showBack();
          event.preventDefault();
        }
      });

      // element.bind("blur", function(event) {
      //   ctrl.showFront();
      // });

      if(ctrl.front && ctrl.back){
        [element, ctrl.front, ctrl.back].forEach(function(el){
          setDim(el[0], width, height);
        });
        ctrl.init();
      }
      else {
        console.error("FLIP: 2 panels required.");
      }

    }
  }

});

angular.module('app').directive("flipPanel", function(){
  return {
    restrict : "E",
    require : "^flip",
    //transclusion : true,
    link: function(scope, element, attrs, flipCtr){
      if(!flipCtr.front) {flipCtr.front = element;}
      else if(!flipCtr.back) {flipCtr.back = element;}
      else {
        console.error("FLIP: Too many panels.");
      }
    }
  }
});
