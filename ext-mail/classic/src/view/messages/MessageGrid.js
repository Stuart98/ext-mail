Ext.define('ExtMail.view.messages.MessageGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.messages-MessageGrid',

    columns: [
        {
            dataIndex: 'fullName',
            header: 'Sender',
            minWidth: 200,
            header: false,
            renderer: function(value, meta, rec) {
                meta.tdStyle = 'font-weight: ' + (rec.get('unread') ? 'bold' : 'normal');

                return value;
            }
        },
        {
            dataIndex: 'subject',
            header: 'Subject',
            flex: 1,
            header: false,
            renderer: function(value, meta, rec) {
                meta.tdStyle = 'font-weight: ' + (rec.get('unread') ? 'bold' : 'normal');
                
                return value;
            }
        },
        {
            dataIndex: 'date',
            header: 'Received',
            width: 100,
            header: false,
            renderer: function(value, meta, rec) {
                meta.tdStyle = 'font-weight: ' + (rec.get('unread') ? 'bold' : 'normal');
                
                return Ext.Date.format(value, 'j M');
            }
        }
    ]
});