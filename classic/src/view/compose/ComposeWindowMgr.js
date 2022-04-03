Ext.define('ExtMail.view.compose.ComposeWindowMgr', {
    extend: 'Ext.Base',

    requires: [
        'ExtMail.view.compose.ComposeWindow'
    ],

    singleton: true,

    // Ext.util.Collection to store references to the windows we've created
    windows: null,

    // pixels space between compose windows
    windowSpacing: 30,

    constructor: function() {
        this.callParent(arguments);

        // create a collection to track the message windows that are currently open
        this.windows = Ext.create('Ext.util.Collection', {
            extraKeys: {
                byName: 'id'
            }
        });
    },

    show: function(messageRecord) {
        var id = this.getId(messageRecord.getId());
        var win = this.windows.getByKey(id);

        // if we have a window already for this message then expand it and position it
        if (win) {
            win.expand();
        } else {

            // otherwise we create it
            win = Ext.create('ExtMail.view.compose.ComposeWindow', {
                id: this.getId(messageRecord.getId()),
                messageRecord: messageRecord,
                height: 500,
                width: 500            
            });

            // add event handlers to remove it from the tracking collection on close,
            // and to reposition it on minimize
            win.on({
                close: function(win) {
                    this.remove(win);
                },
                minimize: function(win) {
                    var expanded = true;
                    if (!win.collapsed) {
                        win.collapse(false);
                        expanded = false;
                    } else {
                        win.expand(false);
                    }

                    // use apply to translate the 
                    win.setPosition(this.getWindowPosition(win, expanded));
                },
                scope: this
            })

            // add the new window to the collection so it is managed
            this.windows.add(win);
        }

        // show the window and move it to the correct position based on it's index
        win.show();
        win.setPosition(this.getWindowPosition(win, true));

        return win;
    },

    /**
     * Remove the given window and reposition all remaining
     * windows based on their new index in the collection
     * @param {Ext.window.Window} win 
     */
    remove: function(win) {
        this.windows.remove(win);

        this.windows.each(function(win) {
            win.setPosition(this.getWindowPosition(win, !win.collapsed));
        }, this);
    },

    /**
     * Gets an ID for the Window based on the given Message Record ID
     * @param {string} Record id 
     * @returns 
     */
    getId: function(id) {
        return Ext.String.format('compose-{0}', id)
    },

    /**
     * Gets the X/Y position for the given window
     * @param {Ext.window.Window} currentWin 
     * @param {Boolean} expanded True to calculate the position for an expanded compose window, false for collapsed
     * @returns {Array} An array with X and Y => [x, y]
     */
    getWindowPosition: function(currentWin, expanded) {
        var index = this.windows.getIndices()[currentWin.id];
        var width = currentWin.getWidth();

        // get the position from the right edge of the window, based on index of window, width and spacing
        var fromRightPos = ((index + 1) * (width + this.windowSpacing));

        // get the x position based on window width
        var x = window.innerWidth - fromRightPos;

        // if the window is expanded then the Y is the bottom of the window, minus the window height.
        // if not then we move it _very_ far down and the constraining config of the window will dock it to the bottom
        var y = expanded ? window.innerHeight - currentWin.getHeight() : 9999999

        return [x, y];
    }
});