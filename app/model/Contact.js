Ext.define('ExtMail.model.Contact', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'name',
            calculate: function(data) {
                var firstName = data.firstName || '';
                var lastName = data.lastName || '';

                return Ext.String.trim(firstName + ' ' + lastName);
            }
        },
        'firstName',
        'lastName',
        'email',
        'phone'
    ]
});
