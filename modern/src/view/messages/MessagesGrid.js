Ext.define('ExtMail.view.messages.MessagesGrid', {
    extend: 'Ext.grid.Grid',
    alias: 'widget.messages-MessagesGrid',

    cls: 'messages-grid',

    // needed so cell tools can use binding
    itemConfig: {
        viewModel: true  
    },

    // needed to resolve handler method strings to this component
    defaultListenerScope: true,
    
    columns: [
        {
            dataIndex: 'firstName',
            width: 60,
            cell: {
                encodeHtml: false
            },
            tpl: [
                [
                    '<div class="avatar" style="background-color: {[this.getAvatarColour(values.firstName)]};">',
                    '   <span>{[(values.firstName || "").substring(0, 1).toUpperCase()]}</span>',
                    '</div>',
                ].join(''),
                {
                    getAvatarColour: function(name) {
                        name = name || '?';
                        var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
                        var colours = ['#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabed4', '#469990', '#dcbeff', '#9A6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#a9a9a9', '#ffffff', '#000000'];
                        var initial = name.substring(0, 1).toUpperCase();

                        return colours[alphabet.indexOf(initial)] || '#e6194B';
                    }
                }
            ]
        },
        {
            dataIndex: 'subject',
            flex: 1,
            cell: {
                cls: 'subject-cell',
                encodeHtml: false,
                tools: {
                    star: {
                        handler: 'onUnStarMessage',
                        iconCls: 'x-fa fa-star',
                        zone: 'end',
                        bind: {
                            hidden: '{!record.starred}'
                        }
                    },
                    unstar: {
                        handler: 'onStarMessage',
                        iconCls: 'x-fa fa-star-half-alt',
                        zone: 'end',
                        bind: {
                            hidden: '{record.starred}'
                        }
                    }
                }
            },
            tpl: [
                [
                    '<div class="{[values.unread ? \"unread\" : ""]}">',
                    '   <div class="top-line">',
                    '      <span class="name">{fullName}</span>',
                    '      <span class="date">{date:date("j M \'y")}</span>',
                    '   </div>',
                    '   <div class="subject">',
                    '       <tpl if="!Ext.isEmpty(values.subject)">{subject}<tpl else>(no subject)</tpl>',
                    '   </div>',
                    '   <div class="message">{message}</div>',
                    '</div>'
                ].join('')
            ]
        }
    ],

    onStarMessage: function(grid, info) {
        this.fireEvent('starmessage', info.record);
    },

    onUnStarMessage: function(grid, info) {
        this.fireEvent('unstarmessage', info.record);
    }    
});