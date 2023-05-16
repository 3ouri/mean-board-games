const mongoose = require("mongoose");

const {log} = require('console');
const { env } = require("process");

require("./games-model");

mongoose.connect(env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on("connected", function(){
    log("Mongoose connected to", env.DB_NAME);
});

mongoose.connection.on("disconnected", function(){
    log("Mongoose disconnected");
});

mongoose.connection.on("error", function(err){
    log("Mongoose connection error", err);
});

process.on("SIGINT", function(){
    mongoose.connection.close(function(){
        log(env.SIGINT_MSG);
        process.exit(0);
    });
});

process.on("SIGTERM", function(){
    mongoose.connection.close(function(){
        log(env.SIGTERM_MSG);
        process.exit(0);
    });
});

process.once("SIGUSR2", function(){
    mongoose.connection.close(function(){
        log(env.SIGUSR2_MSG);
        process.kill(process.pid, "SIGUSR2");
    });
});


