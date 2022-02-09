/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('ExtMail.view.main.MainControllerBase', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    requires: [
        'ExtMail.enums.Labels'
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

        this.getViewModel().set('selectedMessage', messageRecord);
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
