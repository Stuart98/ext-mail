Ext.define('ExtMail.store.Contacts', {
    extend: 'Ext.data.Store',

    alias: 'store.Contacts',

    model: 'ExtMail.model.Contact',

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: 'data/contacts.json',
        reader: {
            type: 'json',
            rootProperty: 'rows'
        }
    }
});
