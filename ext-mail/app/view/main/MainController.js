/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('ExtMail.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    requires: [
        'ExtMail.enums.Labels',
        'ExtMail.view.compose.ComposeWindowMgr'
    ],

    /**
     * Handler for the `itemclick` event of the MessageGrid.
     * This will either show the MessageReader of ComposeWindow for the clicked Message
     * @param {Ext.panel.grid} grid 
     * @param {ExtMail.model.Message} messageRecord 
     * @param {Ext.dom.Element} rowEl 
     * @param {Number} index 
     * @param {Ext.Event} e 
     * @returns 
     */
    onMessageClick: function(grid, messageRecord, rowEl, index, e) {
        // don't do the row action if we've clicked on the action column
        if (e.getTarget('.x-action-col-icon')) {
            return;
        }

        // if it's a draft then we show the compose window, otherwise we show the message reader
        if (messageRecord.get('draft')) {
            this.showComposeWindow(messageRecord);
        } else {
            this.getViewModel().set('selectedMessage', messageRecord);
        }
    },

    /**
     * Handler for the Compose button click. This creates a new Message record
     * and adds it to the store, opening the ComposeWindow.
     */
    onComposeMessage: function() {
        var messageRecord = Ext.create('ExtMail.model.Message', {
            labels: [ ExtMail.enums.Labels.DRAFTS ],
            outgoing: true,
            draft: true
        });

        this.getViewModel().getStore('messages').add(messageRecord);
        this.getViewModel().getStore('messages').commitChanges(); // commit changes immediately since we aren't persisting to backend

        this.showComposeWindow(messageRecord);
    },

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
    },

    /**
     * Handler for clicking the `star` button on the MessageGrid.
     * Toggles the `starred` flag and adds STARRED label.
     * @param {ExtMail.model.Message} messageRecord 
     */
    onStarMessage: function(messageRecord) {
        messageRecord.addLabel(ExtMail.enums.Labels.STARRED);

        messageRecord.set('starred', true);
        messageRecord.commit();
    },

    /**
     * Handler for clicking the `un-star` button on the MessageGrid.
     * Toggles the `starred` flag and adds STARRED label.
     * @param {ExtMail.model.Message} messageRecord 
     */
    onUnStarMessage: function(messageRecord) {
        messageRecord.removeLabel(ExtMail.enums.Labels.STARRED);

        messageRecord.set('starred', false);
        messageRecord.commit();
    },

    /**
     * Handler for the `send` event from the ComposeForm.
     * Sets the Message to SENT status. Closes the ComposeWindow
     * @param {ExtMail.model.Message} messageRecord 
     * @param {Ext.Event} e
     * @param {ExtMail.view.compose.ComposeWIndow} composeWindow Injected parameter by the Ext.bind call - the ComposeWindow that was used to compose the message.
     */
    onSendMessage: function (messageRecord, e, composeWindow) {
        messageRecord.removeLabel(ExtMail.enums.Labels.DRAFTS);
        messageRecord.addLabel(ExtMail.enums.Labels.SENT);

        messageRecord.set({
            draft: false,
            sent: true,
            date: new Date()
        });

        messageRecord.commit();

        composeWindow.close();
    },

    /**
     * Handler for the `discarddraft` event from the ComposeForm.
     * Removes the message from the `messages` store, and closes the ComposeWindow
     * @param {ExtMail.model.Message} messageRecord 
     * @param {Ext.Event} e
     * @param {ExtMail.view.compose.ComposeWIndow} composeWindow Injected parameter by the Ext.bind call - the ComposeWindow that was used to compose the message.
     */
    onDiscardDraftMessage: function(messageRecord, e, composeWindow) {
        this.getViewModel().getStore('messages').remove(messageRecord);

        composeWindow.close();
    },

    /**
     * Handler for click on the `refresh` button.
     * Reloads the `messages` store.
     */
    onRefreshMessages: function() {
        this.getViewModel().getStore('messages').reload();
    },

    /**
     * Handler for click on the `back to messages` button.
     * Sets the `selectedMessage` viewmodel prop to null triggering the card switch
     */
    onBackToMessagesGrid: function() {
        this.getViewModel().set('selectedMessage', null);
    },

    /**
     * Handler for click on the `delete message` button.
     * Removes the `selectedMessage` record from the `messages` store, and moves
     * back to the MessageGrid
     */
     onDeleteMessage: function() {
        var vm = this.getViewModel();

        this.getViewModel().getStore('messages').remove(vm.get('selectedMessage'));

        this.onBackToMessagesGrid();
    },

    /**
     * Handler for click on the `archive` button.
     * Removes the INBOX label from the `selectedMessage` record, and moves
     * back to the MessageGrid
     */
    onArchiveMessage: function() {
        this.getViewModel().get('selectedMessage').removeLabel(ExtMail.enums.Labels.INBOX);

        this.onBackToMessagesGrid();
    },

    /**
     * Handler for click on the `mark unread` button.
     * Sets the `unread` flag back to true, and moves
     * back to the MessageGrid
     */
    onMarkMessageUnread: function() {
        this.getViewModel().get('selectedMessage').set('unread', true);

        this.onBackToMessagesGrid();
    }
});
