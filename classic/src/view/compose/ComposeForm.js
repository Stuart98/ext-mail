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
            xtype: 'textareafield',
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
    ]
});
