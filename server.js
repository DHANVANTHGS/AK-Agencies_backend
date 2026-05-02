const express = require('express');
const bodyparser = require('body-parser')
require('dotenv').config();
const auth = require('./router/auth');
const product = require('./router/product');
const order = require('./router/order');
const connectdb = require('./config');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

const port = process.env.PORT;

app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    frameguard: { action: "deny" },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    noSniff: true,
    hsts: {     //need to remove while in developement
        maxAge: 31536000,
        includeSubDomains: true,
    }
}));
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

//const allowedOrigins = process.env.Allowed_origins ? process.env.Allowed_origins.split(',').map(o => o.trim()) : [];
const allowedOrigins = [
  "https://a-k-agencies.vercel.app",
  "http://localhost:5173",
  "https://ak-agencies.com",
  "https://www.ak-agencies.com"
];

app.use(require('cors')({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'], 
}
));

connectdb();

app.use((req, res, next) => {
    console.log(`Got request at ${req.url} with method ${req.method} from ${req.ip}`);
    next();
});

app.use('/api/auth', rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5, 
}));

app.use('/api/auth',auth);
app.use('/api/product',product);

app.use('/api/order', rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, 
}));
app.use('/api/order',order);

app.get('/health',(req,res)=>{
    res.status(200).send({status: 'ok',message : "Backend is running"});
});

const server = app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
});

server.on ('error',(error)=>{
        console.error('Server execution error:', error);
})
