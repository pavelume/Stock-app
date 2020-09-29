const ejs = require ('ejs');
const express = require ('express');
const mongoose = require('mongoose');
const app = express();
const si = require('stock-info');
//const fs = require ('fs');
mongoose.connect('mongodb://localhost:27017/Stock', {useNewUrlParser: true, useUnifiedTopology: true});
app.use (express.urlencoded());

const Info = mongoose.model('Info',{

  Cname:{
    type: String,
    require:true
  },
//   Quantity:{
//     type:Number,
//     require:true
//   },
//   Bprice:{
//     type:Number,
//     require:true
//   }
  
});
app.set('view engine','ejs')

app.get('/',function(req,res){
    res.render('data');
})

app.post('/',function(req,res){
    var a=req.body.name;
    console.log(req.body.name);
    var b=req.body.quantity;
    console.log(req.body.quantity);
    var c=req.body.price;
    console.log(req.body.price);

    si.getSingleStockInfo(a).then (function(stock){

        stock=JSON.stringify(stock);
    const t=new Info({
        Cname:stock


    })

    t.save().then((data)=> console.log(data));
        // var x,y;
        // x=(b*c);
        // y=(b*stock.regularMarketPrice);
        // console.log("Total buying price " + x);
        // console.log("Total current price " + y);
        // var p=y-x;
        // var q=x-y;
        // if(y>x){
        // console.log("profit: "+p);
        // }
        // else{
        // console.log("loss: "+q);
        // }

    })
})

app.listen(3000);



