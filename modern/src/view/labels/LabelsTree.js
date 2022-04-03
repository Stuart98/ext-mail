Ext.define('ExtMail.view.labels.LabelsTree', {
    extend: 'Ext.list.Tree',
    alias: 'widget.labels-LabelsTree',

    defaults: {
        xtype: 'treelistitem',
        textProperty: 'combined'
    }
});