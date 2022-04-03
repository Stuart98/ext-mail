Ext.define('ExtMail.view.messages.MessagesToolbar', {
    extend: 'ExtMail.view.messages.MessagesToolbarBase',
    alias: 'widget.messages-MessagesToolbar',

    initialize: function() {
        this.setItems(this.buildItems());

        this.callParent(arguments);
    },

    buildItems: function() {
        var items = this.callParent(arguments);

        // add menu button to start of toolbar
        items.unshift({
            xtype: 'button',
            iconCls: 'x-fa fa-list',
            bind: {
                hidden: '{selectedMessage}'
            },
            handler: this.onMenuButtonTap,
            scope: this
        });

        return items;
    },

    onMenuButtonTap: function() {
        if(Ext.Viewport.getMenus().left.isHidden()){
            Ext.Viewport.showMenu('left');
        } else {
            Ext.Viewport.hideMenu('left');
        }
    }
});