Ext.define('ExtMail.model.Label', {
    extend: 'Ext.data.TreeModel',

    fields: [
        'name',
        { name: 'unreadCount', type: 'int' },

        // calculated field to build html for Labels Tree
        {
            name: 'combined',
            calculate: function(data) {
                var unreadCount = data.unreadCount;
                var hasUnread = unreadCount > 0;
                var cls = hasUnread ? 'unread' : '';

                var unreadTpl = Ext.String.format('&nbsp;({0})', unreadCount);

                var combined = Ext.String.format('<span class="{0}">{1}{2}</span>', cls, data.name, hasUnread ? unreadTpl : '');

                return combined;
            }
        }
    ]
});