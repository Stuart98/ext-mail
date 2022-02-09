Ext.define('ExtMail.view.main.MainController', {
    extend: 'ExtMail.view.main.MainControllerBase',

    alias: 'controller.main',
    
    /**
     * Opens the ComposeWindow using the ComposeWindowMgr to position it correctly.
     * @param {ExtMail.model.Message} messageRecord 
     */
     showComposeWindow: function(messageRecord) {
        var win = ExtMail.view.compose.ComposeWindowMgr.show(messageRecord);

        // use Ext.bind to append `win` reference to handler so we can close the window after send/discard
        win.on({
            send: Ext.bind(this.onSendMessage, this, [win], true),
            discarddraft: Ext.bind(this.onDiscardDraftMessage, this, [win], true),
            scope: this
        });
    }
});