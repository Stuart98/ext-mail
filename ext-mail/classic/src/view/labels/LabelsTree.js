Ext.define('ExtMail.view.labels.LabelsTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.labels-LabelsTree',

    initComponent: function() {
        Ext.apply(this, {
            rootVisible: false,
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    weight: -1,
                    items: [
                        '->',
                        {
                            xtype: 'button',
                            scale: 'large',
                            text: 'Compose',
                            iconCls: 'x-fa fa-edit',
                            width: 150,
                            handler: function() {
                                this.fireEvent('compose');
                            },
                            scope: this
                        },
                        '->'
                    ]
                }
            ],
            columns: [
                {
                    xtype: 'treecolumn',
                    header: false,
                    text: 'Name',
                    dataIndex: 'combined',
                    flex: 1
                }
            ]
        });

        this.callParent(arguments);
    }
});