Ext.define('ExtMail.view.compose.ComposeWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.compose-ComposeWindow',

    viewModel: {
        data: {
            messageRecord: null
        }
    },

    config: {
        messageRecord: null
    },

    minimizable: true,
    resizable: false,
    draggable: false,
    title: 'New Message',
    layout: 'fit',
    constrain: true,
    constrainHeader: true,
    items: [
        {
            xtype: 'compose-ComposeForm',
            bubbleEvents: ['send', 'discarddraft']
        }
    ],

    updateMessageRecord: function(messageRecord) {
        this.getViewModel().set('messageRecord', messageRecord);
    }
});