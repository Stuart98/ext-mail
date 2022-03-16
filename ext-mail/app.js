/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'ExtMail.Application',

    name: 'ExtMail',

    requires: [
        // This will automatically load all classes in the ExtMail namespace
        // so that application classes do not need to require each other.
        'ExtMail.*'
    ],

    // The name of the initial view to create.
    mainView: 'ExtMail.view.main.Main',


    onBeforeLaunch: function() {
        ExtMail.util.BaseUrl.setBaseUrl('http://44.194.195.183:8080/');

        this.callParent(arguments);
    },
});
