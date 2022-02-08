Ext.define('ExtMail.view.messages.MessagesToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.messages-MessagesToolbar',

    defaultListenerScope: true,
    items: [
        {
            tooltip: 'Refresh',
            iconCls: 'x-fa fa-redo',
            handler: 'onRefreshClick',
            bind: {
                hidden: '{selectedMessage}'
            }
        },
        {
            tooltip: 'Back',
            iconCls: 'x-fa fa-arrow-left',
            handler: 'onBackClick',
            hidden: true, // hide from start
            bind: {
                hidden: '{!selectedMessage}'
            }
        }
    ],

    onRefreshClick: function() {
        this.fireEvent('refresh')
    },

    onBackClick: function() {
        this.fireEvent('back')
    }
});