// const http = require('http')
const fs = require('fs')

const index = fs.readFileSync('index.html', 'utf-8')
const data = JSON.parse(fs.readFileSync('data.json','utf-8'));
const products = data.products;

const express = require('express')
const morgan = require('morgan')

const server = express();

// middlewares

// sequence of middlewares is important. reauest goes from top middleware to the next one in bottom


// server.use middleware is applied to all endpoints automatically
server.use((req,res,next)=>{
    console.log(req.method, req.ip, req.hostname, new Date(), req.get('User-Agent'));
    next();
})

// body parser- built in middleware-- helps express to now read the body if body has json type of data
server.use(express.json());
// server.use(express.urlencoded());

// third party middleware- made by someone else but not express which we can simple use in our code
server.use(morgan('combined'));


const auth = (req, res, next)=>{
    console.log(req.query);
    if (req.body.password === "123") {
        next()
    } else {
        res.sendStatus(401)
    }
}

// apply auth to all routes ⬇️
// server.use(auth)



// API Endpoints or routes
server.get('/',auth,(req,res)=>{ // applied auth middleware only to this route
    res.json({message:"get request sent"})
});
server.post('/',auth,(req,res)=>{
    res.json({message:"post request sent"})
});
server.put('/',(req,res)=>{
    res.json({message:"put request sent"})
});
server.delete('/',(req,res)=>{
    res.json({message:"delete request sent"})
});
server.patch('/',(req,res)=>{
    res.json({message:"patch request sent"})
});

server.get('/demo', (req,res)=>{
    console.log("server started");
    // res.send("hello from express")
    // res.status(201).send("hello from express");
    // res.sendFile('/Users/divanshugarg/Desktop/backend-stuff/index.html')
    res.json(products)
})
server.listen(8080);

// const server = http.createServer((req,res)=>{

//     if(req.url.startsWith('/product')){
//         const id = req.url.split('/')[2];
//         if(Number(id)){
//         const product = products.find(p=> p.id === Number(id));
//         // console.log("product:",products[0]);
//         res.setHeader('Content-Type', 'text/html')
//         let modifiedIndex = index
//         .replace('**title**',product.title)
//         .replace('**url**',product.url)
//         .replace('**price**',product.price)
//         .replace('**rating**',product.rating)
//         res.end(modifiedIndex);
//         return;
//         }
//     }

//     switch(req.url){
//         case '/':
//             res.setHeader('Content-Type', 'text/html');
//             res.end(index);
//             break;
//         case '/api':
//             res.setHeader('Content-Type', 'application/json');
//             res.end(JSON.stringify(data));
//             break;
//         default :
//         res.writeHead(404);
//         res.end();
//         break;

//     }

//     console.log(req.url, req.method);
//     console.log("server has been started");
//     // res.setHeader('Content-Type', 'text/html')
//     // res.end(index)
    
// })

// server.listen(8080)