Ext.define('ExtMail.view.main.MainController', {
    extend: 'ExtMail.view.main.MainControllerBase',

    alias: 'controller.main',

    onMessageClick: function(grid, messageRecord, rowEl, index, e) {
        // don't do the row action if we've clicked on the action column
        if (e.getTarget('.x-action-col-icon')) {
            return;
        }

        this.handleMessageClick(messageRecord);
    },

    /**
     * Opens the ComposeWindow using the ComposeWindowMgr to position it correctly.
     * @param {ExtMail.model.Message} messageRecord
     */
     showDraftWindow: function(messageRecord) {
        var win = ExtMail.view.compose.ComposeWindowMgr.show(messageRecord);

        // use Ext.bind to append `win` reference to handler so we can close the window after send/discard
        win.on({
            send: Ext.bind(this.onSendMessage, this, [win], true),
            discarddraft: Ext.bind(this.onDiscardDraftMessage, this, [win], true),
            close: function() {
                this.redirectTo({
                    draft: null
                });
            },
            scope: this
        });
    },

    /**
     * Handler for the `send` event from the ComposeForm.
     * Sets the Message to SENT status. Closes the ComposeWindow
     * @param {ExtMail.model.Message} messageRecord
     * @param {Ext.Event} e
     * @param {ExtMail.view.compose.ComposeWindow} composeWindow Injected parameter by the Ext.bind call - the ComposeWindow that was used to compose the message.
     */
    onSendMessage: function(messageRecord, e, composeWindow) {
      this.callParent(arguments);

      composeWindow.close();
    },

    /**
     * Handler for the `discarddraft` event from the ComposeForm.
     * Removes the message from the `messages` store, and closes the ComposeWindow
     * @param {ExtMail.model.Message} messageRecord
     * @param {Ext.Event} e
     * @param {ExtMail.view.compose.ComposeWindow} composeWindow Injected parameter by the Ext.bind call - the ComposeWindow that was used to compose the message.
     */
    onDiscardDraftMessage: function(messageRecord, e, composeWindow) {
        this.callParent(arguments);

        composeWindow.close();
    }
});
