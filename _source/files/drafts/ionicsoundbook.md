So here's my cool app! Here's what it all looks like omg omg omg! :)

<iframe src='http://blog.krawaller.se/ionic-sound-book/www/' style="height:400px;width:100%" />

Go to [git repo](https://github.com/krawaller/ionic-sound-book/).

Lololol html code from [index.html](https://github.com/krawaller/ionic-sound-book/blob/master/www/index.html):

```html
<body ng-app="starter">
    <ion-pane ng-controller="SlideBox">
      <ion-slide-box does-continue="true" show-pager="false" active-slide="activeSlide" on-slide-changed="slideChanged(index)">
        <ion-slide ng-repeat="slide in slides">
          <div class="listz row" ng-class="(slideIndex == slide.index) ? 'active' : ''">
            <div class="col item animated"
                 ng-repeat="item in slide.items"
                 style="background-color: {{item.background}};"
                 ng-click="playSound(item, $event)">

              <div class="item-image" style="background-image: url('items/{{item.image}}');">
                <div class="label animated">{{ item.label }}</div>
              </div>
            </div>
          </div>
        </ion-slide>
      </ion-slide-box>
    </ion-pane>
    <script src="js/game.js"></script>
  </body>
```

Mooo moo [controllers.js](https://raw.githubusercontent.com/krawaller/ionic-sound-book/master/www/js/controllers.js):

```javascript
var items = [{
  image: 'banan.JPG',
  label: 'banan',
  sound: 'banan.m4a',
  background: '#DFA954'
},
{
  image: 'bil.JPG',
  label: 'bil',
  sound: 'bil.m4a',
  background: '#0083EA'
},
{
  image: 'flaska.JPG',
  label: 'flaska',
  sound: 'flaska.m4a',
  background: '#DDEBF3'
},
{
  image: 'klocka.JPG',
  label: 'klocka',
  sound: 'klocka.m4a',
  background: '#BF9D7C'
},
{
  image: 'kopp.JPG',
  label: 'kopp',
  sound: 'kopp.m4a',
  background: '#E00931'
},
{
  image: 'napp.JPG',
  label: 'napp',
  sound: 'napp.m4a',
  background: '#FE0D45'
},
{
  image: 'sked.JPG',
  label: 'sked',
  sound: 'sked.m4a',
  background: '#FF4433'
},
{
  image: 'skor.JPG',
  label: 'skor',
  sound: 'skor.m4a',
  background: '#A40F29'
}]

angular.module('IlonPlayer.controllers', [])

.controller('SlideBox', function($scope, $state, $ionicNavBarDelegate) {

  items.forEach(function(item) {
    if (item.sound) {
      createjs.Sound.registerSound('items/' + item.sound, item.label);
    }
  });

  var slides = [];
  for (var i = 0; i < items.length; i += 2) {
    slides.push({ items: [items[i], items[i + 1]], index: i / 2 })
  };
  $scope.slides = slides;

  $scope.playSound = function(item, $event) {
    createjs.Sound.play(item.label);

    $event.target.classList.add('tapped');
    setTimeout(function() {
      $event.target.classList.remove('tapped');
    }, 300)

  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
  //start at 0
  $scope.slideIndex = 0;


  var timeout = setTimeout(animateIdle, 5000);;
  ionic.on('tap', function(event) {
    clearTimeout(timeout)
    timeout = setTimeout(animateIdle, 5000);
  }, document.body);

  function animateIdle() {
    var labels = document.querySelectorAll('.listz.active .label');
    var label = labels[Math.floor(Math.random() * labels.length)];
    var animations = ['swing', 'wobble', 'tada', 'shake', 'rubberBand']
    var animation = animations[Math.floor(Math.random() * animations.length)];
    label.style.animationName = label.style.webkitAnimationName = animation;

    timeout = setTimeout(animateIdle, 4000);
  }
})
```


BLa bla stars using Phaser omg omg! It's in [game.js](https://github.com/krawaller/ionic-sound-book/blob/master/www/js/game.js)

```javascript
var game = new Phaser.Game(innerWidth, innerHeight, Phaser.CANVAS, 'canvas', { preload: preload, create: create, update: update, render: render }, true);

function preload() {
  game.load.spritesheet('stars', 'img/stars.png', 50, 49);
}

var emitter;

function create() {

  game.stage.backgroundColor = '#ffffff';

  emitter = game.add.emitter(0, 0, 100);

  emitter.makeParticles('stars', [0, 2]);
  emitter.gravity = 0;

  emitter.setYSpeed(-400, 400);
  emitter.setXSpeed(-400, 400);

}

ionic.on('tap', function(event) {

  emitter.x = event.gesture.center.pageX;
  emitter.y = event.gesture.center.pageY;

  //  The first parameter sets the effect to "explode" which means all particles are emitted at once
  //  The second gives each particle a 2000ms lifespan
  //  The third is ignored when using burst/explode mode
  //  The final parameter (10) is how many particles will be emitted in this single burst
  emitter.start(true, 1000, null, 10);
}, document.body)

function update() {

}

function render() {

}
```

