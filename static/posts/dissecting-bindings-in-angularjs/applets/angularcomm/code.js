
var app = angular.module("apidemo",[]);

app.controller("outercontroller", function($scope){
  $scope.outputtwoway = 5;
  $scope.ampersand = 5;
  $scope.ampersandfake = 5;
  $scope.croccount = 5;
  $scope.crocinc = function(amount){
    $scope.croccount += amount;
  }
  $scope.input1 = 'value from parent'

  $scope.twowayin = 'foo'
  $scope.changetwowayin = function(newval){
    console.log("Callback called!", newval)
    $scope.twowayin = newval;
  }
});

app.component("stringviaat", {
  bindings: { text: '@' },
  template: '<p>text: <strong>{{$ctrl.text}}</strong></p>'
});

/*
app.directive("stringviaat", function(){
  return {
    restrict: 'E',
    scope: {
      text: '@'
    },
    template: '<p>text via @: <strong>{{text}}</strong></p>'
  };
});
*/

app.component("stringfaked", {
  template: '<p>text via attrs: <strong>{{$ctrl.text}}</strong></p>',
  controller: function($element){
    this.text = $element.attr("text");
  }
});

/*
app.directive("stringfaked", function(){
  return {
    restrict: 'E',
    scope: {},
    template: '<p>text via attrs: <strong>{{text}}</strong></p>',
    link: function(scope,elem,attrs){
      scope.text = attrs.text;
    }
  };
});
*/


app.component("stringthird", {
  bindings: { text: '<' },
  template: '<p>text via &lt;: <strong>{{$ctrl.text}}</strong></p>'
});

/*
app.directive("stringthird", function(){
  return {
    restrict: 'E',
    scope: {
      text: '<'
    },
    template: '<p>text via &lt;: <strong>{{text}}</strong></p>'
  };
});
*/


app.component("inputfirst",{
  bindings: { in: '<' },
  template: '<p>dynamic input: <strong>{{$ctrl.in}}</strong></p>'
});

/*
app.directive("inputfirst", function(){
  return {
    restrict: 'E',
    scope: {
      in: '<'
    },
    template: '<p>input via &lt;: <strong>{{in}}</strong></p>'
  };
});
*/

app.component("inputsecond",{
  bindings: { in: '=' },
  template: '<p>input via =: <strong>{{$ctrl.in}}</strong></p>'
});

/*
app.directive("inputsecond", function(){
  return {
    restrict: 'E',
    scope: {
      in: '='
    },
    template: '<p>input via =: <strong>{{in}}</strong></p>'
  };
});
*/

app.component("inputfaked",{
  controller: ($scope,$element) => {
    let attr = $element.attr("in");
    $scope.$parent.$watch(attr, newVal => $scope.in = newVal);
  },
  template: '<p>input faked: <strong>{{in}}</strong></p>'
});

/*
app.directive("inputfaked", function(){
  return {
    restrict: 'E',
    scope: {},
    link: function(scope,elem,attrs){
      scope.$parent.$watch(attrs.in,function(newVal,oldVal){
        scope.in = newVal;
      });
    },
    template: '<p>input faked: <strong>{{in}}</strong></p>'
  };
});
*/

app.component("outputfirst",{
  bindings: { out: '=' },
  template: `<div>
    <button ng-click="$ctrl.out=$ctrl.out+1;">buy one</button>
    <button ng-click="$ctrl.out=$ctrl.out+5;">buy many</button>
  </div>`
});

/*
app.directive("outputfirst", function(){
  return {
    restrict: 'E',
    scope: {
      out: '='
    },
    template: `
      <button ng-click="out=out+1;">buy one</button>
      <button ng-click="out=out+5;">buy many</button>
    `
  };
});
*/


app.component("outputsecond",{
    bindings: { out: '&' },
    template: `
      <button ng-click="$ctrl.out({amount: 1})">buy one</button>
      <button ng-click="$ctrl.out({amount: 5})">buy many</button> `
});

/*
app.directive("outputsecond", function(){
  return {
    restrict: 'E',
    scope: {
      out: '&'
    },
    template: `
      <button ng-click="out({amount: 1})">buy one</button>
      <button ng-click="out({amount: 5})">buy many</button>
    `
  };
});
*/

app.component("outputthird",{
  bindings: { out: '<' },
  template: `
    <button ng-click="$ctrl.out(1)">buy one</button>
    <button ng-click="$ctrl.out(5)">buy many</button>`
});

/*
app.directive("outputthird", function(){
  return {
    restrict: 'E',
    scope: {
      out: '<'
    },
    template: `
      <button ng-click="out(1)">buy one</button>
      <button ng-click="out(5)">buy many</button>
    `
  };
});
*/

app.component("outputfakeamp",{
  controller: ($scope,$element,$timeout) => {
    let attr = $element.attr("out");
    $scope.increaseBy = by => {
      $timeout(function(){
        $scope.$parent.$apply(`amount = ${by}; ${attr}`);
      });
    }
  },
  template: `
    <button ng-click="increaseBy(1)">buy one</button>
    <button ng-click="increaseBy(5)">buy many</button>`
});

/*
app.directive("outputfakeamp", function($timeout){
  return {
    restrict: 'E',
    scope: {},
    link: function(scope,elem,attrs){
      scope.increaseBy = function(by){
        $timeout(function(){
          scope.$parent.$apply( 'amount = '+by+'; '+attrs.out );
        });
      }
    },
    template: `
      <button ng-click="increaseBy(1)">buy one</button>
      <button ng-click="increaseBy(5)">buy many</button>
    `
  };
});
*/

app.component("twowayeq",{
  bindings: {
    connection: '='
  },
  template: `
    <br>inner: <input ng-model="$ctrl.connection">
  `
});
/*
app.directive("twowayeq", function(){
  return {
    restrict: 'E',
    scope: {
      connection: '='
    },
    template: `
      inner: <input ng-model="connection">
    `
  };
});
*/

app.component("twowayin",{
  bindings: {
    value: '<',
    callback: '<'
  },
  template: `
     <input ng-model="$ctrl.value" ng-change="$ctrl.callback($ctrl.value)">
  `
});

app.component("twowayfaked",{
  controller: ($scope,$element,$timeout) => {
    let attr = $element.attr("connection");
    $scope.$parent.$watch('twowayfakedvar', newVal => {
      $scope.inner = newVal;
    });
    $scope.$watch('inner', (newVal='') => $timeout( () => {
      $scope.$parent.$apply(`${attr} = "${newVal}";`);
    }));
  },
  template: `inner: <input ng-model="inner">`
});

/*
app.directive("twowayfaked", function($timeout){
  return {
    restrict: 'E',
    scope: {},
    link: function(scope,elem,attrs){
      var nocascade;
      scope.$parent.$watch('twowayfakedvar',function(newVal){
        if (!nocascade){
          nocascade = true;
          scope.inner = newVal;
        } else {
          nocascade = false;
        }
      });
      scope.$watch('inner', function(newVal){
        $timeout(function(){
          if (!nocascade){
            nocascade = true;
            scope.$parent.$apply(attrs.connection + ' = "' + (newVal||'') + '";');
          } else {
            nocascade = false;
          }
        });
      });
    },
    template: `
      inner: <input ng-model="inner">
    `
  };
});
*/