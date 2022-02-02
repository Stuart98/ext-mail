/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('ExtMail.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    requires: [
        'ExtMail.enums.Labels',
        'ExtMail.store.Contacts',
        'ExtMail.store.Messages',
        'ExtMail.store.Labels'
    ],

    data: {
        // holds the ExtMail.model.Label instance of the selected label in the tree
        selectedLabel: null,

        // holds the ExtMail.model.Message instance that has been selected from the grid.
        // this will trigger the MessageReader to show - see `messageCardIndex` formula
        selectedMessage: null,

        searchTerm: ''
    },

    formulas: {
        // the index of the Message Reader card layout to show. 0 = MessageGrid; 1 = MessageReader
        messageCardIndex: function(get) {
            return get('selectedMessage') ? 1 : 0;
        },

        // an object defining what MessageToolbar buttons should be visible depending on the state
        visibleMessageButtons: function(get) {
            var messageRecord = get('selectedMessage');
            var messageSelected = !!messageRecord;
            var isOutgoing = messageSelected ? messageRecord.get('outgoing') : false;

            return {
                // message list actions
                refresh: !messageSelected,
                messageCount: !messageSelected,

                // message reader actions
                back: messageSelected,
                spacer: messageSelected && !isOutgoing,
                delete: messageSelected && !isOutgoing,
                markUnread: messageSelected && !isOutgoing,
                archive: messageSelected && !isOutgoing
            };
        }
    },

    stores: {
        messages: {
            type: 'Messages'
        },
        contacts: {
            type: 'Contacts'
        },
        labels: {
            type: 'Labels'
        }
    },

    constructor: function() {
        this.callParent(arguments);

        // filter the Messages store when the selectedLabel changes
        this.bind('{selectedLabel}', this.onSelectedLabelChange, this);

        // select the first label (Inbox) on load
        this.bind('{labels.first}', this.onFirstLabelRecordChange, this);

        // when the selected message changes we update it's unread flag
        this.bind('{selectedMessage}', this.onSelectedMessageChange, this);

        // recalculate the unread count on each label after the Messages store changes
        this.getStore('messages').on('datachanged', this.calculateUnreadCounts, this);
    },

    /**
     * When first item in the `labels` store changes (i.e. it is loaded) then we select it
     * @param {ExtMail.model.Label} firstLabelRecord 
     */
    onFirstLabelRecordChange: function(firstLabelRecord) {
        this.set('selectedLabel', firstLabelRecord);
    },

    /**
     * Handler for when the `selectedLabel` property changes. This will filter the `messages`
     * store to show the correct messages in the grid.
     * @param {ExtMail.model.Label} labelRecord 
     */
    onSelectedLabelChange: function(labelRecord) {
        this.getStore('messages').clearFilter();

        this.getStore('messages').filterBy(function(messageRecord) {
            return labelRecord ? messageRecord.hasLabel(labelRecord.getId()) : false;
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
    },

    /**
     * We calculate the number of UNREAD messages under each Label type.
     * We also count the number of DRAFT messages so the Draft folder has a count too
     */
    calculateUnreadCounts: function() {
        this.getStore('labels').each(function(labelRecord) {
            // count the unread messages in each Label, OR the number of messages in DRAFT status
            var count = this.getStore('messages').queryBy(function(messageRecord) {
                return (messageRecord.hasLabel(labelRecord.getId()) && messageRecord.get('unread')) || (messageRecord.hasLabel(labelRecord.getId()) && messageRecord.get('draft'));
            }).getCount();

            labelRecord.set('unreadCount', count);
        }, this);
    }
});
