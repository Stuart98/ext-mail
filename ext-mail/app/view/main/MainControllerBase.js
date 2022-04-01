/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('ExtMail.view.main.MainControllerBase', {
    extend: 'Ext.app.ViewController',

    requires: [
        'ExtMail.enums.Labels'
    ],

    routes: {
        'label/:label': {
            name: 'label',
            before: 'onBeforeViewLabel',
            action: 'onViewLabel'
        },

        'view/:messageId': {
            name: 'message',
            before: 'onBeforeViewMessage',
            action: 'onViewMessage'
        },

        'draft/:messageId': {
            name: 'draft',
            action: 'onDraftMessage'
        }
    },

    /**
     * Handles the selectionchange event of the LabelsTree component.
     * @param {ExtMail.view.labels.LabelsTree} labelTree 
     * @param {ExtMail.model.Label[]} selectedLabelRecords 
     */
    onLabelSelectionChange: function(labelTree, selectedLabelRecords) {
        var selectedLabelRecord = selectedLabelRecords[0]; // always use the first one
        var slug = '';

        // grab the 'slug' for the label
        if (selectedLabelRecord) {
            slug = selectedLabelRecord.get('slug');
        }

        this.redirectTo({
            label: Ext.String.format('label/{0}', slug), // redirect to the found label
            message: null // navigate away from a Message View route if we have one, so we go back to the list view
        });
    },

    /**
     * Guard for the View Message route, this checks the messages store is loaded and waits for it to load if it hasn't
     * @param {string|integer} messageId 
     * @param {Ext.route.Action} action 
     */
    onBeforeViewMessage: function(messageId, action) {
        var store = this.getViewModel().getStore('messages');

        if (store.loadCount > 0) {
            action.resume();
        } else {
            store.on('load', function() {
                action.resume();
            }, this, { single: true });
        }
    },

    /**
     * Handler for the View Message route.
     * Finds the message record based on the route's param and sets it as the selectedMessage.
     * If the id isn't found then we reset the `message` route and the `selectedMessage` property.
     * @param {string|integer} messageId 
     */
    onViewMessage: function(messageId) {
        var store = this.getViewModel().getStore('messages');
        var messageRecord = store.getById(messageId);

        // if messageRecord is null then we reset it anyway
        this.getViewModel().set('selectedMessage', messageRecord);

        // if we didn't find a message record we reset the route
        if (!messageRecord) {
            this.redirectTo({
                message: null
            });
        }
    },

    /**
     * Guard for the View Label route, this checks the labels store is loaded and waits for it to load if it hasn't
     * @param {string} label
     * @param {Ext.route.Action} action 
     */
    onBeforeViewLabel: function(label, action) {
        var labelsStore = this.getViewModel().getStore('labels');

        if (labelsStore.loadCount > 0) {
            action.resume();
        } else {
            labelsStore.on('load', function() {
                action.resume();
            }, this, { single: true });
        }
    },

    /**
     * Handler for the View Label route.
     * Finds the label record based on the route's param, if it isn't found we default to the first record, and sets it as the selectedLabel.
     * @param {string|integer} messageId 
     */
    onViewLabel: function(label) {
        var labelsStore = this.getViewModel().getStore('labels');
        var labelRecord = labelsStore.findRecord('slug', label);

        if (!labelRecord) {
            labelRecord = labelsStore.first();
        }

        this.getViewModel().set('selectedMessage', null);
        this.getViewModel().set('selectedLabel', labelRecord);
    },

    /**
     * This will either navigate the user to the `draft` or `view message` route
     */
    handleMessageClick: function(messageRecord) {
        var destination = {};

        if (messageRecord.get('draft')) {
            destination = {
                draft: Ext.String.format('draft/{0}', messageRecord.getId())
            };
        } else {
            destination = {
                message: Ext.String.format('view/{0}', messageRecord.getId())
            };
        }

        this.redirectTo(destination);
    },

    /**
     * Create a new draft and navigate to the `draft` route.
     */
    onCompose: function() {
        var messageRecord = Ext.create('ExtMail.model.Message', {
            labels: [ ExtMail.enums.Labels.DRAFTS ],
            outgoing: true,
            draft: true
        });

        messageRecord.addLabel(ExtMail.enums.Labels.DRAFTS);

        this.getViewModel().getStore('messages').add(messageRecord);
        this.getViewModel().getStore('messages').commitChanges(); // commit changes immediately since we aren't persisting to backend

        this.redirectTo({
            draft: Ext.String.format('draft/{0}', messageRecord.getId())
        });
    },

    /**
     * Handler for the Compose button click. This creates a new Message record
     * and adds it to the store, opening the ComposeWindow.
     */
    onDraftMessage: function(messageId) {
        var messageRecord = this.getViewModel().getStore('messages').getById(messageId);

        if (!messageRecord) {
            this.redirectTo({
                draft: null
            });
        } else {
            this.showDraftWindow(messageRecord);
        }
    },

    showDraftWindow: function() {
        console.log('Implement in sub-class');
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
     */
    onSendMessage: function (messageRecord, e) {
        messageRecord.removeLabel(ExtMail.enums.Labels.DRAFTS);
        messageRecord.addLabel(ExtMail.enums.Labels.SENT);

        messageRecord.set({
            draft: false,
            sent: true,
            date: new Date()
        });

        messageRecord.commit();
    },

    /**
     * Handler for the `discarddraft` event from the ComposeForm.
     * Removes the message from the `messages` store, and closes the ComposeWindow
     * @param {ExtMail.model.Message} messageRecord
     * @param {Ext.Event} e
     */
    onDiscardDraftMessage: function(messageRecord, e) {
        this.getViewModel().getStore('messages').remove(messageRecord);
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
        this.redirectTo({
            message: null
        });

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
