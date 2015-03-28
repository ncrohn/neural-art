
Art = require('../components/Art')

class MainView

  constructor: ->
    @render()

  render: ->
    piece1 = new Art()
    piece2 = new Art()
    piece3 = new Art()

    @el = document.createElement('div')
    @el.appendChild(piece1.el)
    @el.appendChild(piece2.el)
    @el.appendChild(piece3.el)

module.exports = MainView