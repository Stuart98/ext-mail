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
            rootProperty: 'rows'
        }
    }
});
