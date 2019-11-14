const express= require('express');
const express_graphql= require('express-graphql');
const mongoose= require('mongoose');
var path= require('path');
require('dotenv').config();
const schema= require('./schema');
// what to use in graphql
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull,
    
}= require('graphql');
const app= express();


app.use('/graphql',express_graphql({
    schema:schema,
    graphiql: true,
    /*process.env.NODE_ENV === 'development'*/
}));
app.use(express.static(__dirname + '/homepage'));
app.get('/',(req,res)=>{
    res.render('/homepage/index.html');
});

mongoose.Promise= global.Promise;

mongoose.connect(process.env.DB_CONNECTION,{useUnifiedTopology: true,useNewUrlParser: true},(res,err)=>{
    
    console.log('Connected to MongoDB');
})
app.listen(process.env.PORT||3000,()=>{
    console.log('Listen to port 3000');
})
