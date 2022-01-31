/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('ExtMail.view.main.Main', {
    extend: 'Ext.Viewport',
    xtype: 'app-main',

    requires: [
        'ExtMail.view.main.MainController',
        'ExtMail.view.main.MainModel',

        'ExtMail.view.labels.LabelsTree',
        'ExtMail.view.messages.MessageGrid',
        'ExtMail.view.reader.MessageReader',
        'ExtMail.view.messages.MessagesToolbar'
    ],

    controller: 'main',
    viewModel: 'main',

    layout: {
        type: 'border'
    },

    items: [
        {
            xtype: 'labels-LabelsTree',
            region: 'west',
            width: 300,
            bind: {
                store: '{labels}',
                selection: '{selectedLabel}'
            }
        },
        {
            xtype: 'panel',
            region: 'center',
            layout: 'card',
            bind: {
                activeItem: '{activeMessageCard}'
            },
            dockedItems: [
                {
                    xtype: 'messages-MessagesToolbar',
                    dock: 'top',
                    listeners: {
                        refresh: 'onRefreshMessages',
                        back: 'onBackToMessagesGrid',
                        delete: 'onDeleteMessage',
                        markunread: 'onMarkMessageUnread',
                        archive: 'onArchiveMessage'
                    }
                }
            ],
            items: [
                {
                    xtype: 'messages-MessageGrid',
                    bind: {
                        store: '{messages}',
                        selection: '{selectedMessage}'
                    },
                    listeners: {
                        //itemclick: 'onMessageClick'
                    }
                },
                {
                    xtype: 'reader-MessageReader',
                    bind: {
                        data: '{selectedMessage}'
                    }
                }
            ]
        }
    ]
});
