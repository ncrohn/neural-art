
WIDTH = 400
HEIGHT = 600

DEFAULTS =
  background: [0, 0, 0]
  shape: 'square'
  shapeCountX: 10
  shapeCountY: 25
  shapeColors: [
    [255, 97, 56],
    [255, 255, 157],
    [190, 235, 159],
    [121, 189, 143],
    [0, 163, 136]
  ]

class Art

  constructor: ->
    @render()
    return @

  _draw: ->
    context = @el.getContext('2d')
    context.clearRect(0, 0, WIDTH, HEIGHT)

    @_drawBackground(context)
    @_drawShapes(context)

  _drawBackground: (context) ->
    @_setFill(context, DEFAULTS.background)
    context.fillRect(0, 0, WIDTH, HEIGHT)

  _drawShapes: (context) ->
    x = 0
    y = 0

    variance = 1

    shapeCountX = DEFAULTS.shapeCountX
    shapeCountX = Math.floor(shapeCountX + (shapeCountX * variance * Math.random()))

    shapeCountY = DEFAULTS.shapeCountY
    shapeCountY = Math.floor(shapeCountY + (shapeCountY * variance * Math.random()))

    w = WIDTH / shapeCountX
    h = HEIGHT / shapeCountY

    for j in [0...shapeCountY] by 1
      for i in [0...shapeCountX] by 1
        @_setFill(context, @_getShapeColor())
        context.fillRect(x, y, w, h)
        x += w
      x = 0
      y += h

  _setFill: (context, color) ->
    context.fillStyle = "rgb(#{color[0]}, #{color[1]}, #{color[2]})"

  _getShapeColor: ->
    colors = DEFAULTS.shapeColors
    d = colors[Math.floor(colors.length*Math.random())]
    x = []

    variance = .25

    for c in d
      v = Math.floor(c * (variance * Math.random()))
      x.push(c - v)

    return x

  render: ->
    @el = document.createElement('canvas');
    @el.height = HEIGHT
    @el.width = WIDTH
    @_draw()

module.exports = Art