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
                hidden: '{!visibleMessageButtons.refresh}'
            }
        },
        {
            tooltip: 'Back',
            iconCls: 'x-fa fa-arrow-left',
            handler: 'onBackClick',
            hidden: true, // hide from start
            bind: {
                hidden: '{!visibleMessageButtons.back}'
            }
        },
        {
            tooltip: 'Archive',
            iconCls: 'x-fa fa-archive',
            handler: 'onArchiveClick',
            hidden: true, // hide from start
            bind: {
                hidden: '{!visibleMessageButtons.archive}'
            }
        },
        {
            tooltip: 'Delete',
            iconCls: 'x-fa fa-trash',
            handler: 'onDeleteClick',
            hidden: true, // hide from start
            bind: {
                hidden: '{!visibleMessageButtons.delete}'
            }
        },
        {
            xtype: 'tbseparator',
            bind: {
                hidden: '{!visibleMessageButtons.spacer}'
            }
        },
        {
            tooltip: 'Mark as Unread',
            iconCls: 'x-fa fa-envelope',
            handler: 'onMarkUnreadClick',
            hidden: true, // hide from start
            bind: {
                hidden: '{!visibleMessageButtons.markUnread}'
            }
        },
        '->',
        {
            xtype: 'component',
            tpl: '{count} messages',
            data: {},
            bind: {
                hidden: '{!visibleMessageButtons.messageCount}',
                data: {
                    count: '{messages.count}'
                }
            }
        }
    ],

    onRefreshClick: function() {
        this.fireEvent('refresh')
    },

    onBackClick: function() {
        this.fireEvent('back')
    },

    onArchiveClick: function() {
        this.fireEvent('archive')
    },

    onDeleteClick: function() {
        this.fireEvent('delete')
    },

    onMarkUnreadClick: function() {
        this.fireEvent('markunread')
    }
});