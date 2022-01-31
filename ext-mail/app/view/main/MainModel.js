/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('ExtMail.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    requires: [
        'ExtMail.store.Contacts',
        'ExtMail.store.Messages',
        'ExtMail.store.Labels'
    ],

    data: {
        selectedLabel: null,
        selectedMessage: null
    },

    formulas: {
        messageSelected: function(get) {
            return !Ext.isEmpty(get('selectedMessage'));
        },

        activeMessageCard: function(get) {
            return get('messageSelected') ? 1 : 0;
        },

        visibleMessageButtons: function(get) {
            var messageSelected = get('messageSelected');

            return {
                refresh: !messageSelected,
                back: messageSelected,
                spacer: messageSelected,
                delete: messageSelected,
                markUnread: messageSelected,
                archive: messageSelected,
                messageCount: !messageSelected
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

    onFirstLabelRecordChange: function(firstLabelRecord) {
        this.set('selectedLabel', firstLabelRecord);
    },

    onSelectedLabelChange: function(labelRecord) {
        this.getStore('messages').clearFilter();

        this.getStore('messages').filterBy(function(messageRecord) {
            var labels = messageRecord.get('labels') || [];

            return labelRecord ? labels.indexOf(labelRecord.getId()) >= 0 : false;
        });
    },

    onSelectedMessageChange: function(messageRecord) {
        if (messageRecord) {
            messageRecord.set('unread', false);
        }
    },

    calculateUnreadCounts: function() {
        this.getStore('labels').each(function(labelRecord) {
            var count = this.getStore('messages').queryBy(function(messageRecord) {
                var labels = messageRecord.get('labels') || [];

                return labels.indexOf(labelRecord.getId()) >= 0 && messageRecord.get('unread');
            }).getCount();

            labelRecord.set('unreadCount', count);
        }, this);
    }
});
