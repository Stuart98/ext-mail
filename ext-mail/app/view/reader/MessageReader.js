Ext.define('ExtMail.view.reader.MessageReader', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reader-MessageReader',

    cls: 'message-reader',
    tpl: [
        '<div class="subject">{subject}</div>',
        '<div class="info">',
        '   <div class="sender">',
        '       <span class="name">{fullName}</span> <span class="email">({email})</span>',
        '   </div>',
        '   <div class="date">{date:date("D, j M Y, H:i")}</div>',
        '</div>',
        
        '<div class="message">{message}</div>'
    ],
    data: {}
});