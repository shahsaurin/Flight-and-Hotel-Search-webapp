module.exports = function () {
    var mongoose = require('mongoose');
    var connectionString = 'mongodb://127.0.0.1:27017/test';

    if(process.env.MLAB_UNAME) {
        connectionString = process.env.MLAB_UNAME + ":" +
            process.env.MLAB_PWD + "@" +
            process.env.MLAB_HOST2 + ':' +
            process.env.MLAB_PORT2 + '/' +
            process.env.MLAB_APP_NAME_2;
        //mongodb://admin:admin@ds143980.mlab.com:43980/heroku_bjfvlp12
    }

    mongoose.connect(connectionString);

    var userModel = require("./user/user.model.server.js")();
    var messageModel = require("./message/message.model.server.js")();
    var hotelModel = require("./hotel/hotel.model.server.js")();

    var model = {
        userModel : userModel,
        messageModel : messageModel,
        hotelModel : hotelModel
    };

    userModel.setModel(model);
    messageModel.setModel(model);
    hotelModel.setModel(model);

    return model;
};