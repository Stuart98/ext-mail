Ext.define('ExtMail.store.Labels', {
    extend: 'Ext.data.TreeStore',

    alias: 'store.Labels',

    model: 'ExtMail.model.Label',

    root: {
        id: -1,
        name: 'Test',
        expanded: true
    },

    proxy: {
        type: 'ajax',
        url: 'data/labelsnested',
        reader: {
            type: 'json',
            transform: function(data) {
                var transformRow = function(row) {
                    row = ExtMail.util.Object.snakeCaseToCamelCase(row);

                    if (row.children && Ext.isArray(row.children)) {
                        row.children = Ext.Array.map(row.children, transformRow);
                    }

                    return row;
                }

                return Ext.Array.map(data, transformRow);
            }
        }
    }
});
