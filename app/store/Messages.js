Ext.define('ExtMail.store.Messages', {
    extend: 'Ext.data.Store',

    alias: 'store.Messages',

    model: 'ExtMail.model.Message',

    autoLoad: true,

    sorters: [
        {
            property: 'date',
            direction: 'DESC'
        }
    ],

    proxy: {
        type: 'ajax',
        url: 'data/messages.json',
        reader: {
            type: 'json',
            rootProperty: 'rows',
            transform: function(data) {
                if (Ext.isArray(data)) {
                    // turn simple array of labelIds into MessageLabel object
                    Ext.each(data, function(row) {
                        row.labels = Ext.Array.map(row.labels || [], function(labelId) {
                            return {
                                messageId: row.id,
                                labelId: labelId
                            };
                        });
                    });
                }

                return data;
            }
        }
    }
});
