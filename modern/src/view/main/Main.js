/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 */
Ext.define('ExtMail.view.main.Main', {
    extend: 'Ext.NavigationView',
    xtype: 'app-main',
    fullscreen: true,

    requires: [
        'ExtMail.view.main.MainController',
        'ExtMail.view.main.MainModel',

        'ExtMail.view.messages.MessagesGrid',
        'ExtMail.view.messages.MessagesToolbar'
    ],

    controller: 'main',
    viewModel: 'main',

    defaultBackButtonText: 'Back',
    useTitleForBackButtonText: false,
    navigationBar: false,
    items: [
        {
            xtype: 'messages-MessagesToolbar',
            docked: 'top',
            listeners: {
                refresh: 'onRefreshMessages',
                back: 'onBackToMessagesGrid',
                delete: 'onDeleteMessage',
                markunread: 'onMarkMessageUnread',
                archive: 'onArchiveMessage'
            }
        },
        {
            xtype: 'messages-MessagesGrid',
            hideHeaders: true,
            titleBar: false,
            bind: {
                store: '{messages}'
            },
            listeners: {
                childtap: 'onMessageTap',
                starmessage: 'onStarMessage',
                unstarmessage: 'onUnStarMessage'
            }
        }
    ]
});
