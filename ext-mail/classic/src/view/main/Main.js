/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('ExtMail.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',

        'ExtMail.view.main.MainController',
        'ExtMail.view.main.MainModel',

        'ExtMail.view.labels.LabelsTree',
        'ExtMail.view.messages.MessageGrid',
        'ExtMail.view.reader.MessageReader',
        'ExtMail.view.messages.MessagesToolbar'
    ],

    plugins: 'viewport',

    controller: 'main',
    viewModel: 'main',

    layout: {
        type: 'border'
    },


    dockedItems: [
        {
            xtype: 'container',
            height: 50,
            padding: '10 0 0 0',
            style: 'background: white',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'component',
                    width: 300,
                    html: '<img src="resources/images/ext-mail-logo.png" style="height: 50px; margin-left: 80px;" />'
                },
                {
                    xtype: 'textfield',
                    emptyText: 'Search all mail',
                    width: 400
                }
            ]
        }        
    ],

    items: [
        {
            xtype: 'labels-LabelsTree',
            region: 'west',
            width: 300,
            bind: {
                store: '{labels}',
                selection: '{selectedLabel}'
            },
            listeners: {
                compose: 'onComposeMessage'
            }
        },
        {
            xtype: 'panel',
            region: 'center',
            layout: 'card',
            reference: 'messagesWrapper',
            bind: {
                activeItem: '{messageCardIndex}'
            },
            dockedItems: [
                {
                    xtype: 'messages-MessagesToolbar',
                    dock: 'top',
                    height: 56,
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
                        store: '{messages}'
                    },
                    listeners: {
                        itemclick: 'onMessageClick',
                        starmessage: 'onStarMessage',
                        unstarmessage: 'onUnStarMessage'
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
