Ext.define('ExtMail.model.MessageLabel', {
    extend: 'Ext.data.Model',

    requires: [
        'ExtMail.util.Object'
    ],

    fields: [
        'messageId',
        'labelId'
    ],
    
    proxy: {
        type: 'ajax',
        noCache: false,
        url: 'labels/',
        actionMethods: {
            create: 'POST',
            destroy: 'DELETE'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            transform: function(data) {
                if (data) {
                    data = ExtMail.util.Object.camelCaseToSnakeCase(data);
                }

                return data;
            }
        }
    },

    constructor: function() {
        this.callParent(arguments)

        this.getProxy().setUrl(Ext.String.format('labels/{0}/{1}', this.get('messageId'), this.get('labelId')));
    }
});