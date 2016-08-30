
// Everything required to set up the app.
$(window).ready(function() {
  var socketProxy = new SocketProxy();
  var appState = new AppState();

  window.io = window.io || undefined;

  window.p = new PhotoView(window.Config, appState);
  bv = new ButtonView();
  pv = new PrintView();

  var ssm = new ShmileStateMachine(window.p, socketProxy, appState, window.Config, bv, pv)

  bv.fsm = ssm.fsm
  pv.fsm = ssm.fsm
  pv.socket = socketProxy

  var layer = new SocketLayer(window.io, socketProxy)
  layer.init();
  layer.register(ssm.fsm);

  window.socketProxy = socketProxy

  bv.render();
  pv.render();
  p.render();
});
