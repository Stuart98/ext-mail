Ext.define('ExtMail.store.Labels', {
    extend: 'Ext.data.TreeStore',

    alias: 'store.Labels',

    model: 'ExtMail.model.Label',

    proxy: {
        type: 'ajax',
        url: 'data/labels.json',
        reader: {
            type: 'json',
            rootProperty: 'rows'
        }
    }
});
