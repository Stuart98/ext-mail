Ext.define('ExtMail.view.messages.MessagesToolbar', {
    extend: 'ExtMail.view.messages.MessagesToolbarBase',
    
    alias: 'widget.messages-MessagesToolbar',

    initComponent: function() {
        Ext.apply(this, {
            items: this.buildItems()
        });

        this.callParent(arguments);
    }
});