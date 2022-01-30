/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('ExtMail.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    requires: [
        'ExtMail.store.Contacts',
        'ExtMail.store.Messages'
    ],

    data: {
    },

    stores: {
        messages: {
            type: 'Messages'
        },
        contacts: {
            type: 'Contacts'
        }
    }
});
