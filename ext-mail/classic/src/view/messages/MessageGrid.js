Ext.define('ExtMail.view.messages.MessageGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.messages-MessageGrid',

    cls: 'message-grid',

    viewConfig: {
        markDirty: false,
        emptyText: 'No Messages Found',
        getRowClass: function(messageRecord) {
            var cls = [];

            if (messageRecord.get('unread')) {
                cls.push('unread');
            }

            if (messageRecord.get('draft')) {
                cls.push('draft');
            }
            return cls.join(' ');
        }
    },

    listeners: {
        beforeselect: function() {
            return false;
        }
    },

    columns: [
        {
            xtype: 'actioncolumn',
            width: 25,
            items: [
                {
                    glyph: '☆',
                    tooltip: 'Star',
                    handler: function(view, rowIndex, colIndex, item, e, rec) {
                        view.grid.fireEvent('starmessage', rec);
                    },                                                          
                    getClass: function(v, meta, rec) {   
                        if(rec.get('starred')) {                                                                      
                            return 'x-hidden-display';
                        }
                    }
                },
                {
                    glyph: '★',
                    tooltip: 'Un-star',
                    handler: function(view, rowIndex, colIndex, item, e, rec) {
                        view.grid.fireEvent('unstarmessage', rec);
                    },                                                          
                    getClass: function(v, meta, rec) {          
                        if(!rec.get('starred')) {                                                                      
                            return 'x-hidden-display';
                        }
                    }
                }
            ]
        },
        {
            dataIndex: 'fullName',
            minWidth: 250,
            header: false,
            tdCls: 'full-name',
            renderer: function(value, meta, rec) {

                if (rec.get('draft')) {
                    meta.tdStyle += 'color: red;'
                    return 'Draft';
                }

                if (rec.get('outgoing') && rec.get('sent')) {
                    return 'To: ' + value;
                }

                return value;
            }
        },
        {
            dataIndex: 'subject',
            flex: 1,
            header: false,
            renderer: function(value) {               
                return Ext.isEmpty(value) ? '(no subject)' : value;
            }
        },
        {
            xtype: 'datecolumn',
            dataIndex: 'date',
            header: 'Received',
            width: 100,
            header: false,
            align: 'end',
            format: 'j M \'y'
        }
    ]
});