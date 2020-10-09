const path = require('path');
const express = require('express');
const hbs = require('hbs');

const {geocode} = require('../utilis/geocode')
const {forecast} = require('../utilis/forecast')

const app = express()
const port = process.env.PORT || 3000
//Define paths for Express configuration
const dirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(dirPath))

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather app',
        name: 'Sachin Vashisht'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Example Message',
        title: 'Help',
        name: 'Sachin Vashisht'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sachin Vashisht'
    });
});

app.get('/weather', (req, res) => {
    // console.log(req.query.address);
    
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (err, {latitude, longitude, location} = {}) => {
        if(err) {
            res.send({
                error: err
            })
        } else {
            forecast(latitude, longitude, (err, data)=> {
                if(err) {
                    res.send({
                        error: err
                    })
                } else {
                    // res.header('Content-Security-Policy', 'img-src', 'self');
                    res.send({
                        location: req.query.address,
                        forecast: data
                    })
                }
            })
        }
    })

    // res.send({
    //     forecast: 'It is Snowing',
    //     location: 'Shimla',
    //     address: req.query.address
    // });
});



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sachin Vashisht',
        errorMessage : 'Help article not found'
    })    
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sachin Vashisht',
        errorMessage: 'Page not found'
    })
})


app.listen(port, ()=> {
    console.log('Server is up and running');
});