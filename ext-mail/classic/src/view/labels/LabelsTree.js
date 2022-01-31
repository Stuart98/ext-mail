Ext.define('ExtMail.view.labels.LabelsTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.labels-LabelsTree',

    initComponent: function() {
        Ext.apply(this, {
            title: 'Labels',
            rootVisible: false,
            columns: [
                {
                    xtype: 'treecolumn',
                    header: false,
                    text: 'Name',
                    dataIndex: 'name',
                    flex: 1,
                    renderer: function(value, meta, record) {
                        var hasUnread = record.get('unreadCount') > 0;
                        var cls = hasUnread ? 'unread' : '';

                        meta.tdStyle = 'font-weight: ' + (hasUnread ? 'bold' : 'normal');

                        var unreadTpl = Ext.String.format('<span>&nbsp;({0})</span>', record.get('unreadCount'));

                        return Ext.String.format('<span>{0}</span>{1}', value, hasUnread ? unreadTpl : '');
                    }
                }
            ]
        });

        this.callParent(arguments);
    }
});