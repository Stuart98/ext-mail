Ext.define('ExtMail.store.Contacts', {
    extend: 'Ext.data.Store',

    requires: [
        'ExtMail.util.Object'
    ],

    alias: 'store.Contacts',

    model: 'ExtMail.model.Contact',

    autoLoad: true,
    pageSize: 9999,

    proxy: {
        type: 'rest',
        url: 'data/contacts/',
        reader: {
            type: 'json',
            transform: function(data) {
                return Ext.Array.map(data.result, ExtMail.util.Object.snakeCaseToCamelCase);
            }
        }
    }
});
