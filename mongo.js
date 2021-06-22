const mongodb = require('mongodb');

const uri = "mongodb+srv://usuario_luau:luau123@cluster0.duzoj.mongodb.net/test";
mongodb.MongoClient.connect(uri, function(err,client){
if(err){
    console.log("hubo un error",err);
} else{
    console.log(client);
}

});   