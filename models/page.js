const Sequelize = require('sequelize');
const db = require('../db/index')

//-- Page Model
class Page extends Sequelize.Model {}
Page.init({
  title: {
    type: Sequelize.STRING, allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING, allowNull: false
  },
  content: {
    type: Sequelize.TEXT, allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  },

}, { sequelize: db, modelName: 'page' });

Page.addHook('beforeValidate', function generateUrlTitle (page, options) {
    if (page.title) {
      // Remueve todos los caracteres no-alfanuméricos 
      // y hace a los espacios guiones bajos. 
      return page.urlTitle =  page.title.replace(/\s+/g, '_').replace(/\W/g, '');
    }
  });

module.exports = Page;