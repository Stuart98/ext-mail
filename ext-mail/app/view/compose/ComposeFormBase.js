Ext.define('ExtMail.view.compose.ComposeFormBase', {
    extend: 'Ext.form.Panel',

    viewModel: {
        data: {
            selectedRecipient: null
        }
    },

    constructor: function() {
        this.callParent(arguments);

        // when we select a recipient we need to extract the firstname, lastname and email from the record and put it into the message
        this.getViewModel().bind('{selectedRecipient}', this.onSelectedRecipientChange, this);
    },

    onSendClick: function() {
        this.fireEvent('send', this.getViewModel().get('messageRecord'));
    },

    onDiscardClick: function() {
        this.fireEvent('discarddraft', this.getViewModel().get('messageRecord'));
    },

    onSelectedRecipientChange: function(selectedRecipientRecord) {
        var firstName, lastName, email;

        // if we have a recipient record then pull the properties from it
        if (selectedRecipientRecord) {
            firstName = selectedRecipientRecord.get('firstName');
            lastName = selectedRecipientRecord.get('lastName');
            email = selectedRecipientRecord.get('email');
        }

        // assign them to the messageRecord if we have one
        if (this.getViewModel().get('messageRecord')) {
            this.getViewModel().get('messageRecord').set({
                firstName: firstName,
                lastName: lastName,
                email: email
            });
        }
    }
});
