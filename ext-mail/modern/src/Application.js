/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
 Ext.define('ExtMail.Application', {
    extend: 'Ext.app.Application',

    name: 'ExtMail',

    requires: [
        'ExtMail.view.menu.Menu',
        'ExtMail.view.compose.ComposeButton'
    ],

    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },

    launch: function() {
        this.setupMenu();
        this.setupComposeButton();
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    },

    setupMenu: function() {
        Ext.Viewport.setMenu(Ext.create('ExtMail.view.menu.Menu', {
            width: 250,
            viewModel: this.getMainView().getViewModel(),
            listeners: {
                // close the menu when instructed
                closemenu: function() {
                    Ext.Viewport.hideMenu('left');
                }
            }
        }));
    },

    setupComposeButton: function() {
      this.composeButton = Ext.create('ExtMail.view.compose.ComposeButton', {
        hidden: false,
        handler: function() {
          this.getMainView().getController().onComposeMessage();
        },
        scope: this
      });

      // hide the composeButton when viewing/composing a message, show when viewing
      // message list
      this.getMainView().getViewModel().bind('{selectedMessage}', function(selectedMessage) {
        // if we're animating to a message view screen then do composeButton hide immediately,
        // otherwise we wait for the animation to complete and then toggle it.
        var setDelay = selectedMessage ? 0 : this.getMainView().getLayout().getAnimation().getDuration();

        setTimeout(Ext.bind(function() {
          this.composeButton.setHidden(selectedMessage);
        }, this), setDelay);
      }, this);
    }
});
