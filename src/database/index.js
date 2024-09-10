const mongoose = require('mongoose');

exports.initDatabase = () =>
  mongoose.connect('mongodb://localhost:27017/appexpress?authSource=admin', {
    user:'root',
    pass:'example',
  });