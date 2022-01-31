/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('ExtMail.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    onRefreshMessages: function() {
        this.getViewModel().getStore('messages').reload();
    },

    onBackToMessagesGrid: function() {
        this.getViewModel().set('selectedMessage', null);
    },

    onDeleteMessage: function() {
        var vm = this.getViewModel();

        vm.getStore('messages').remove(vm.get('selectedMessage'));

        this.onBackToMessagesGrid();
    },

    onArchiveMessage: function() {
        var vm = this.getViewModel();

        var labels = vm.get('selectedMessage').get('labels') || [];

        labels = Ext.Array.remove(labels, 1); // 1 is magic ID to INBOX

        vm.get('selectedMessage').set('labels', Ext.clone(labels)); // clone so it triggers an update on the record

        this.onBackToMessagesGrid();
    },

    onMarkMessageUnread: function() {
        this.getViewModel().get('selectedMessage').set('unread', true);

        this.onBackToMessagesGrid();
    }
});
