const express = require('express');
const path = require('path');
const request = require('request');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

const app = express();
const port = process.env.PORT || 3000;

//setup all the paths
const publicDirPath = path.join(__dirname,'..','public');
const viewsPth = path.join(__dirname,'..','templates','views');
const partialsDirPath = path.join(__dirname,'..','templates','partials');

//setup the static file to serve
app.use(express.static(publicDirPath));

//setup hbs
app.set('view engine', 'hbs');
app.set('views', viewsPth);
hbs.registerPartials(partialsDirPath);


app.get('/', (req, res)=>{
    res.render('index',{
        title:'Weather App',
        pageTitle: 'weather app',
        name: 'Md Tofazzal Haque'
    });
});
app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'About me',
        pageTitle: 'About app',
        name: 'Md Tofazzal Haque'
    });
});
app.get('/help', (req, res)=>{
    res.render('help',{
        title: 'Help',
        pageTitle: 'Help',
        name: 'Md Tofazzal Haque'
    });
});
app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({err: 'You must need to provide an address!'});
    }else{
        geocode(req.query.address, (err, data)=>{
            if(err){
                return res.send({err, data: null});
            }
            weather(data.place_name, data.center, (err, data, address)=>{
                if(err){
                    return res.send({err, data: null});
                }else return res.send(
                    {err,
                    data:{
                        place_name: address,
                        daily_summary: data.daily.summary,
                        currently_summary: data.currently.summary
                    }
                });
            });
        });
    }
    
});
app.get('*',(req,res)=>{
    res.render('notFound',{
        errMassege: 'Page not initialized!',
        name: 'Md Tofazzal Haque'
    });
});

app.listen(port, ()=>{
    console.log('app is running on '+port);
})