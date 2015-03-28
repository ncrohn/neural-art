
MainView = require('./views/MainView')

class App

  constructor: ->
    @_mainView = new MainView()
    document.body.appendChild(@_mainView.el)

app = new App()
