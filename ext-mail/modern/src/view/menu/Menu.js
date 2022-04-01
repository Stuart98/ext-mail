Ext.define('ExtMail.view.menu.Menu', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.menu-Menu',

    requires: [
        'ExtMail.view.labels.LabelsTree'
    ],

    defaultListenerScope: true,
    scrollable: 'vertical',
    layout: 'fit',
    items: [
        {
            xtype: 'component',
            docked: 'top',
            style: {
                textAlign: 'center'
            },
            html: '<img src="resources/images/ext-mail-logo.png" style="height: 50px; margin: 15px 0 0 0;" />'
        },
        {
            xtype: 'labels-LabelsTree',
            style: {
                background: 'white'
            },
            bind: {
                store: '{labels}'
            },
            listeners: {
                selectionchange: 'onLabelSelectionChange'
            }
        }
    ],

    // when the selected label changes then we fire the `closemenu` event
    onLabelSelectionChange: function(tree, selectedLabelRecord) {
        this.fireEvent('labelselected', tree, selectedLabelRecord);

        this.fireEvent('closemenu');
    },

    getReveal: function() {
        return true;
    },
    getCover: function() {
        return false;
    },
    getSide: function() {
        return 'left';
    }
});