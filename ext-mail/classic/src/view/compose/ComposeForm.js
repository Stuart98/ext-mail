Ext.define('ExtMail.view.compose.ComposeForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.compose-ComposeForm',

    viewModel: {
        data: {
            selectedRecipient: null
        }
    },

    defaultListenerScope: true, // makes string method names resolve to methods on this component
    padding: 10,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'combobox',
            emptyText: 'Recipient',
            width: '100%',
            displayField: 'email',
            valueField: 'email',
            queryMode: 'local',
            allowBlank: false,
            bind: {
                store: '{contacts}',
                selection: '{selectedRecipient}',
                value: '{messageRecord.email}'
            }
        },
        {
            xtype: 'textfield',
            emptyText: 'Subject',
            bind: {
                value: '{messageRecord.subject}'
            }
        },
        {
            xtype: 'textarea',
            flex: 1,
            bind: {
                value: '{messageRecord.message}'
            }
        }
    ],

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            margin: 0,
            items: [
                {
                    xtype: 'button',
                    scale: 'medium',
                    text: 'Send',
                    formBind: true,
                    handler: 'onSendClick'
                },
                '->',
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Discard',
                    handler: 'onDiscardClick'
                }
            ]
        }
    ],

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
            firstName = selectedRecipientRecord.get('first_name');
            lastName = selectedRecipientRecord.get('last_name');
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