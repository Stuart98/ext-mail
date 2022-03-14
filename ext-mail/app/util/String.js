Ext.define('ExtMail.util.Object', {
  singleton: true,

  /**
   * Converts an object's keys from SNAKE_CASE to camelCase
   * @param {Object} obj 
   * @returns 
   */
  snakeCaseToCamelCase: function (obj) {
    var newObj = {};

    Ext.Object.each(obj, function (key, val) {
      var newKey = key.toLowerCase().replace(/(\_\w)/g, function (k) {
        return k[1].toUpperCase();
      });

      newObj[newKey] = val;
    });

    return newObj;
  },

  /**
   * Converts an object's keys from camelCase to SNAKE_CASE
   * @param {Object} obj 
   * @returns 
   */
  camelCaseToSnakeCase: function(obj) {
    var newObj = {};

    Ext.Object.each(obj, function (key, val) {
      var newKey = key.replace(/[A-Z]/g, function(letter) {
        return '_' + letter.toLowerCase();
      });

      newObj[newKey.toUpperCase()] = val;
    });

    return newObj;
  }
});
