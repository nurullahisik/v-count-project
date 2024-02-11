const mongoose  = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://'+process.env.DB_HOST+':'+process.env.DB_PORT+'/'+process.env.DB_NAME+'', {
        authSource: process.env.DB_AUTH_SOURCE,
        user: process.env.DB_USERNAME,
        pass: process.env.DB_PASSWORD,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoCreate: false
    });

    mongoose.connection.on('open', () => {
        console.log("mongodb connected");
    });

    mongoose.connection.on('error', (err) => {
        console.log("mongodb error ", err);
    });

    // promise kullanımı icin(then, catch yapısı)
    mongoose.Promise = global.Promise;
}