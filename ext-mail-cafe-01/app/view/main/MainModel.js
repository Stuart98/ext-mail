/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('ExtMail.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    requires: [
        'ExtMail.enums.Labels',
        'ExtMail.store.Messages',
        'ExtMail.store.Labels'
    ],

    data: {
        // holds the ExtMail.model.Message instance that has been selected from the grid.
        // this will trigger the MessageReader to show - see `messageCardIndex` formula
        selectedMessage: null
    },

    formulas: {
        // the index of the Message Reader card layout to show. 0 = MessageGrid; 1 = MessageReader
        messageCardIndex: function(get) {
            return get('selectedMessage') ? 1 : 0;
        }
    },

    stores: {
        messages: {
            type: 'Messages'
        },
        labels: {
            type: 'Labels'
        }
    },

    constructor: function() {
        this.callParent(arguments);

        // when the selected message changes we update it's unread flag
        this.bind('{selectedMessage}', this.onSelectedMessageChange, this);

        this.getStore('messages').filterBy(function(messageRecord) {
            return messageRecord.hasLabel(ExtMail.enums.Labels.INBOX);
        });
    },

    /**
     * Handler for when the `selectedMessage` property changes. This will mark the message as read.
     * @param {ExtMail.model.Message} messageRecord 
     */
    onSelectedMessageChange: function(messageRecord) {
        if (messageRecord) {
            messageRecord.set('unread', false);
        }
    }
});
