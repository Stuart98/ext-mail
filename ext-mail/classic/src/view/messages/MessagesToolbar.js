Ext.define('ExtMail.view.messages.MessagesToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.messages-MessagesToolbar',

    initComponent: function() {
        Ext.apply(this, {
            items: [
                {
                    tooltip: 'Refresh',
                    iconCls: 'x-fa fa-redo',
                    handler: this.makeHandler('refresh'),
                    scope: this,
                    bind: {
                        hidden: '{!visibleMessageButtons.refresh}'
                    }
                },
                {
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
                    xtype: 'tbseparator',
                    bind: {
                        hidden: '{!visibleMessageButtons.spacer}'
                    }
                },
                {
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
            ]
        });

        this.callParent(arguments);
    },

    makeHandler: function(event) {
        return function() {
            this.fireEvent(event);
        };
    }
});