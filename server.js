const ejs= require ('ejs');
const express= require ('express');
const app= express();
app.use(express.urlencoded());
console.log("Server is Running....")
app.set('view engine','ejs');
const si = require('stock-info');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/web', {useNewUrlParser: true, useUnifiedTopology: true});

const FullData = mongoose.model('FullData',{
  alldata : String
});


app.get('/',function(req,res){
 res.render('datashow');
})


app.post('/',async function(req,res) 
{
  si.getSingleStockInfo(req.body.coname).then(function(data){
    data= JSON.stringify(data);
    var fullInfo = new FullData({alldata:data})
    fullInfo.save().then((data) =>  console.log("hello"));
  } );
  fullInfo.find( function(err,data){
    console.log(data[data.length-1].alldata.regularMarketPrice);
    var currentPrice =data[data.length-1].alldata.regularMarketPrice; 
    console.log(currentPrice);
    var quantity=req.body.quantity;
    console.log(quantity);
    var price =req.body.price;
    console.log(price);
   var store1=quantity*price;
   var store2 =quantity*currentPrice;


  })


} )


app.listen(3000);