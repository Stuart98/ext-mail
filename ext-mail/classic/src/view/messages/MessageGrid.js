Ext.define('ExtMail.view.messages.MessageGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.messages-MessageGrid',

    columns: [
        {
            dataIndex: 'fullName',
            header: 'Sender',
            minWidth: 200,
            header: false
        },
        {
            dataIndex: 'subject',
            header: 'Subject',
            flex: 1,
            header: false
        },
        {
            xtype: 'datecolumn',
            dataIndex: 'date',
            header: 'Received',
            width: 75,
            format: 'j M',
            header: false
        }
    ]
});