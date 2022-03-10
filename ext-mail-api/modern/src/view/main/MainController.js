Ext.define('ExtMail.view.main.MainController', {
    extend: 'ExtMail.view.main.MainControllerBase',

    alias: 'controller.main',

    requires: [
        'ExtMail.view.reader.MessageReader',
        'ExtMail.view.compose.ComposeForm'
    ],

    init: function() {
        this.getViewModel().bind('{selectedMessage}', this.onSelectedMessageChange, this);
    },

    onSelectedMessageChange: function(selectedMessage) {
        if (selectedMessage && !selectedMessage.get('draft')) {
            this.getView().push(this.getMessageDetailsConfig(selectedMessage));
        } else if(selectedMessage && selectedMessage.get('draft')) {
          this.getView().push(this.getComposeMessageConfig(selectedMessage));
        } else {
            this.getView().pop();
        }
    },

    onMessageTap: function(grid, location) {
        this.handleMessageClick(location.record);
    },

    showComposeWindow: function(messageRecord) {
      this.getViewModel().set('selectedMessage', messageRecord);
    },

    /**
     * Handler for the `send` event from the ComposeForm.
     * Sets the Message to SENT status. Closes the ComposeWindow
     * @param {ExtMail.model.Message} messageRecord
     * @param {Ext.Event} e
     */
    onSendMessage: function(messageRecord, e) {
      this.callParent(arguments);

      this.onBackToMessagesGrid();
    },

    /**
     * Handler for the `discarddraft` event from the ComposeForm.
     * Removes the message from the `messages` store, and closes the ComposeWindow
     * @param {ExtMail.model.Message} messageRecord
     * @param {Ext.Event} e
     */
    onDiscardDraftMessage: function(messageRecord, e) {
        this.callParent(arguments);

        this.onBackToMessagesGrid();
    },

    getMessageDetailsConfig: function(messageRecord) {
        return {
            xtype: 'reader-MessageReader',
            data: messageRecord.data,
            header: false,
            bind: {
                title: '{selectedMessage.subject}'
            }
        };
    },

    getComposeMessageConfig: function(messageRecord) {
      return {
        xtype: 'compose-ComposeForm',
        viewModel: {
          data: {
            messageRecord: messageRecord
          }
        },
        listeners: {
          send: this.onSendMessage,
          discarddraft: this.onDiscardDraftMessage,
          scope: this
        }
      };
    }
});
