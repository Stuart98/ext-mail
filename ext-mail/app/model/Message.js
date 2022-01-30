Ext.define('ExtMail.model.Message', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'firstName'
        },
        {
            name: 'lastName'
        },
        {
            name: 'fullName',
            calculate: function(data) {
                return data.firstName + ' ' + data.lastName;
            }
        },
        {
            name: 'email'
        },
        {
            name: 'date',
            type: 'date',
            dateFormat: 'c'
        },
        {
            name: 'subject'
        },
        {
            name: 'message'
        },
        {
            name: 'unread',
            type: 'boolean'
        }
    ]
});
