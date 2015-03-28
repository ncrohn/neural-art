(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var App, MainView, app;

MainView = require('./views/MainView');

App = (function() {
  function App() {
    this._mainView = new MainView();
    document.body.appendChild(this._mainView.el);
  }

  return App;

})();

app = new App();



},{"./views/MainView":3}],2:[function(require,module,exports){
var Art, DEFAULTS, HEIGHT, WIDTH;

WIDTH = 400;

HEIGHT = 600;

DEFAULTS = {
  background: [0, 0, 0],
  shape: 'square',
  shapeCountX: 10,
  shapeCountY: 25,
  shapeColors: [[255, 97, 56], [255, 255, 157], [190, 235, 159], [121, 189, 143], [0, 163, 136]]
};

Art = (function() {
  function Art() {
    this.render();
    return this;
  }

  Art.prototype._draw = function() {
    var context;
    context = this.el.getContext('2d');
    context.clearRect(0, 0, WIDTH, HEIGHT);
    this._drawBackground(context);
    return this._drawShapes(context);
  };

  Art.prototype._drawBackground = function(context) {
    this._setFill(context, DEFAULTS.background);
    return context.fillRect(0, 0, WIDTH, HEIGHT);
  };

  Art.prototype._drawShapes = function(context) {
    var h, i, j, k, l, ref, ref1, results, shapeCountX, shapeCountY, variance, w, x, y;
    x = 0;
    y = 0;
    variance = 1;
    shapeCountX = DEFAULTS.shapeCountX;
    shapeCountX = Math.floor(shapeCountX + (shapeCountX * variance * Math.random()));
    shapeCountY = DEFAULTS.shapeCountY;
    shapeCountY = Math.floor(shapeCountY + (shapeCountY * variance * Math.random()));
    w = WIDTH / shapeCountX;
    h = HEIGHT / shapeCountY;
    results = [];
    for (j = k = 0, ref = shapeCountY; k < ref; j = k += 1) {
      for (i = l = 0, ref1 = shapeCountX; l < ref1; i = l += 1) {
        this._setFill(context, this._getShapeColor());
        context.fillRect(x, y, w, h);
        x += w;
      }
      x = 0;
      results.push(y += h);
    }
    return results;
  };

  Art.prototype._setFill = function(context, color) {
    return context.fillStyle = "rgb(" + color[0] + ", " + color[1] + ", " + color[2] + ")";
  };

  Art.prototype._getShapeColor = function() {
    var c, colors, d, k, len, v, variance, x;
    colors = DEFAULTS.shapeColors;
    d = colors[Math.floor(colors.length * Math.random())];
    x = [];
    variance = .25;
    for (k = 0, len = d.length; k < len; k++) {
      c = d[k];
      v = Math.floor(c * (variance * Math.random()));
      x.push(c - v);
    }
    return x;
  };

  Art.prototype.render = function() {
    this.el = document.createElement('canvas');
    this.el.height = HEIGHT;
    this.el.width = WIDTH;
    return this._draw();
  };

  return Art;

})();

module.exports = Art;



},{}],3:[function(require,module,exports){
var Art, MainView;

Art = require('../components/Art');

MainView = (function() {
  function MainView() {
    this.render();
  }

  MainView.prototype.render = function() {
    var piece1, piece2, piece3;
    piece1 = new Art();
    piece2 = new Art();
    piece3 = new Art();
    this.el = document.createElement('div');
    this.el.appendChild(piece1.el);
    this.el.appendChild(piece2.el);
    return this.el.appendChild(piece3.el);
  };

  return MainView;

})();

module.exports = MainView;



},{"../components/Art":2}]},{},[1]);

//# sourceMappingURL=app.js.map