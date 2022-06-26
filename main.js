var express = require('express')
//const async = require('hbs/lib/async')
const {ObjectId} = require('mongodb')
var app = express()

var url = 'mongodb+srv://datnt21:Trongdat21!@cluster0.l5mxtvt.mongodb.net/test'
var MongoClient = require('mongodb').MongoClient;

app.set('view engine', 'hbs')
app.use(express.urlencoded({extended: true}))

app.get('/', async (req, res)=>{
    let client = await MongoClient.connect(url)
    let dbo = client.db("ATNToys");

    let product = await dbo.collection("product").find().toArray();
    res.render('home', {'product': product})
})

app.get('/create', async (req, res)=>{
    let client = await MongoClient.connect(url)
    let dbo = client.db("ATNToys");

    let category = await dbo.collection("category").find().toArray();
    res.render('createProduct', {'category':category})
})

app.post('/createProduct', async (req,res)=>{
    let name = req.body.txtName
    let price = +req.body.txtPrice
    let category = req.body.txtCategory
    let picURL = req.body.txtPicture

    let product = {
        'name': name,
        'price': price,
        'category' : category,
        'picURL' : picURL
    }

    let client = await MongoClient.connect(url)

    let dbo = client.db("ATNToys");

    await dbo.collection("product").insertOne(product)
    res.redirect('/')
})

app.get('/ATNShop', async (req,res)=>{
    let client = await MongoClient.connect(url)
    let dbo = client.db("ATNToys");

    let product = await dbo.collection("product").find().toArray();
    res.render('ATNShop', {'product': product})
})

app.post('/search', async(req,res)=>{
   
    let nameSearch = req.body.txtName
    let client = await MongoClient.connect(url)
    let dbo = client.db("ATNToys");

    let product = await dbo.collection("product").find({'name': new RegExp(nameSearch, 'i')}).toArray()
    res.render('ATNShop', {product})
})

app.post('/sortAscending', async(req,res)=>{
    let client = await MongoClient.connect(url)
    let dbo = client.db("ATNToys");

    let product = await dbo.collection("product").find().sort({
        price : 1
    }).toArray()
    res.render('ATNShop', {product})
})

app.post('/sortDescending', async(req,res)=>{
    let client = await MongoClient.connect(url)
    let dbo = client.db("ATNToys");

    let product = await dbo.collection("product").find().sort({
        price : -1
    }).toArray()
    res.render('ATNShop', {product})
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log("Server is running")