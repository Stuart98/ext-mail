Ext.define('ExtMail.view.compose.ComposeForm', {
    extend: 'ExtMail.view.compose.ComposeFormBase',
    alias: 'widget.compose-ComposeForm',

    defaultListenerScope: true, // makes string method names resolve to methods on this component
    padding: 10,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'combobox',
            placeholder: 'Recipient',
            displayField: 'email',
            valueField: 'email',
            queryMode: 'local',
            required: true,
            bind: {
                store: '{contacts}',
                selection: '{selectedRecipient}',
                value: '{messageRecord.email}'
            }
        },
        {
            xtype: 'textfield',
            placeholder: 'Subject',
            bind: {
                value: '{messageRecord.subject}'
            }
        },
        {
            xtype: 'textareafield',
            placeholder: 'Compose email',
            flex: 1,
            bind: {
                value: '{messageRecord.message}'
            }
        },
        {
            xtype: 'toolbar',
            docked: 'bottom',
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

    onSendClick: function() {
      if (this.validate()) {
        this.callParent(arguments);
      }
    }
});
