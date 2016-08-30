var PrintView = function(fsm) {
  this.fsm = fsm;
}

PrintView.prototype.render = function() {
  var self = this;
  console.log("printView.render");
  // init code
  this.yesButton = $('button#print-button-yes');
  this.noButton = $('button#print-button-no');
  var buttonYesX = (Config.window_width - this.yesButton.outerWidth())/2;
  var buttonNoX = (Config.window_width - this.noButton.outerWidth())/2;
  var buttonYesY = (Config.window_height / 2 - this.yesButton.outerHeight())/2;
  var buttonNoY = (Config.window_height / 2 - this.noButton.outerHeight())/2 + Config.window_height / 2;

  this.yesButton.hide();
  this.noButton.hide();

  // Position the start button in the center
  this.yesButton.css({'top': buttonYesY, 'left': buttonYesX});
  this.noButton.css({'top': buttonNoY, 'left': buttonNoX});

  var buttonTriggerEvt = Config.is_mobile ? "touchend" : "click";

  this.yesButton.bind(buttonTriggerEvt, function(e) {
    $(document).trigger('yes_button_pressed');
  });

  this.noButton.bind(buttonTriggerEvt, function(e) {
    $(document).trigger('no_button_pressed');
  });

  $(document).bind('yes_button_pressed', function() {
    console.log('yes_button_pressed evt');
    self.fsm.print_decided();
    self.socket.emit('composite_print');
  });

  $(document).bind('no_button_pressed', function() {
    console.log('no_button_pressed evt');
    self.fsm.print_decided();
    self.socket.emit('composite');
  });
}
PrintView.prototype.fadeIn = function() {
  console.log("printView.fadeIn");
  this.yesButton.fadeIn();
  this.noButton.fadeIn();
}
PrintView.prototype.fadeOut = function() {
  console.log("printView.fadeOut");
  this.yesButton.fadeOut();
  this.noButton.fadeOut();
}
