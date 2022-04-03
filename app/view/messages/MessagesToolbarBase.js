Ext.define('ExtMail.view.messages.MessagesToolbarBase', {
    extend: 'Ext.Toolbar',

    buildItems: function() {
        return [
            {
                xtype: 'button',
                tooltip: 'Refresh',
                iconCls: 'x-fa fa-redo',
                handler: this.makeHandler('refresh'),
                scope: this,
                bind: {
                    hidden: '{!visibleMessageButtons.refresh}'
                }
            },
            {
                xtype: 'button',
                tooltip: 'Back',
                iconCls: 'x-fa fa-arrow-left',
                handler: this.makeHandler('back'),
                scope: this,
                hidden: true, // hide from start
                bind: {
                    hidden: '{!visibleMessageButtons.back}'
                }
            },
            {
                xtype: 'button',
                tooltip: 'Archive',
                iconCls: 'x-fa fa-archive',
                handler: this.makeHandler('archive'),
                scope: this,
                hidden: true, // hide from start
                bind: {
                    hidden: '{!visibleMessageButtons.archive}'
                }
            },
            {
                xtype: 'button',
                tooltip: 'Delete',
                iconCls: 'x-fa fa-trash',
                handler: this.makeHandler('delete'),
                scope: this,
                hidden: true, // hide from start
                bind: {
                    hidden: '{!visibleMessageButtons.delete}'
                }
            },
            {
                xtype: 'button',
                tooltip: 'Mark as Unread',
                iconCls: 'x-fa fa-envelope',
                handler: this.makeHandler('markunread'),
                scope: this,
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
        ];
    },

    makeHandler: function(event) {
        return function() {
            this.fireEvent(event);
        };
    }
});