Ext.define('ExtMail.store.Labels', {
    extend: 'Ext.data.TreeStore',

    alias: 'store.Labels',

    model: 'ExtMail.model.Label',

    root: {
        name: 'Test',
        expanded: true
    },

    proxy: {
        type: 'ajax',
        url: 'data/labels.json'
    }
});
