const User = require('./users');
const Page = require('./page');

Page.belongsTo(User, { as: 'author' });


module.exports = {
    Page, 
    User
};