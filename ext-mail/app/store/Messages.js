// latest

Ext.define('ExtMail.store.Messages', {
    extend: 'Ext.data.Store',

    alias: 'store.Messages',

    model: 'ExtMail.model.Message',

    autoLoad: true,
    autoSync: true,

    sorters: [
        {
            property: 'date',
            direction: 'DESC'
        }
    ],

    proxy: {
        type: 'rest',
        noCache: false,
        api: {
            read: 'data/messagesfull',
            create: 'data/messages/',
            update: 'data/messages/',
            destroy: 'data/messages/'
        },
        reader: {
            type: 'json',
            transform: function(data) {
                if (data) {
                    if (Ext.isArray(data)) {
                        data = Ext.Array.map(data, ExtMail.util.Object.snakeCaseToCamelCase);

                        // turn simple array of labelIds into MessageLabel object
                        Ext.each(data, function(row) {
                            row.labels = Ext.Array.map(row.labels || [], function(labelId) {
                                return {
                                    messageId: row.id,
                                    labelId: labelId
                                };
                            });
                        });
                    } else {
                        data = ExtMail.util.Object.snakeCaseToCamelCase(data);
                    }
                }

                return data;
            }
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            transform: function(data) {
                if (data) {
                    data = ExtMail.util.Object.camelCaseToSnakeCase(data);

                    delete data.ID;
       
                    // format date as server expects
                    data.DATE = Ext.Date.format(Ext.Date.parse(data.DATE, 'c'), 'm/d/Y H:i:s');
                }

                return data;
            }
        }
    },

    constructor: function() {
        this.callParent(arguments);

        // buffer sync operations so it doesn't happen too many times in quick succession
        this.sync = Ext.Function.createBuffered(this.sync, 500, this);
    }
});
