'use strict';

/**
 * This is a temp fix while one sails 11.x
 * @see https://github.com/tjwebb/sails-swagger/issues/3
 */
module.exports.installedHooks = {
  'sails-swagger': {
    'name': 'swagger'
  }
};
