Ext.define('ExtMail.model.Message', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.identifier.Uuid'
    ],
    
    identifier: 'uuid',

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
                var firstName = data.firstName || '';
                var lastName = data.lastName || '';

                return Ext.String.trim(firstName + ' ' + lastName);
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
            name: 'labels', // an array of ExtMail.enums.Labels
            type: 'auto',
            defaultValue: []
        },
        {
            name: 'unread',
            type: 'boolean'
        },
        {
            name: 'draft',
            type: 'boolean'
        },
        {
            name: 'outgoing',
            type: 'boolean'
        },
        {
            name: 'sent',
            type: 'boolean'
        }
    ],

    /**
     * Returns true if the Message has the given label Id
     * @param {ExtMail.enums.Label} labelId 
     * @returns 
     */
    hasLabel: function(labelId) {
        var labels = this.get('labels') || [];

        return labels.indexOf(labelId) >= 0
    },

    /**
     * Adds the given label Id to the Message
     * @param {ExtMail.enums.Label} labelId 
     * @returns 
     */
    addLabel: function(labelId) {
        var labels = this.get('labels') || [];

        labels.push(labelId);

        this.set('labels', Ext.clone(labels)); // clone so it triggers an update on the record
    },

    /**
     * Removes the given label Id to the Message
     * @param {ExtMail.enums.Label} labelId 
     * @returns 
     */
    removeLabel: function(labelId) {
        var labels = this.get('labels') || [];

        labels = Ext.Array.remove(labels, labelId);

        this.set('labels', Ext.clone(labels)); // clone so it triggers an update on the record
    }
});
