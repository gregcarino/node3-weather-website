const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
//console.log(__filename)
const app = express()
const port = process.env.PORT || 3000
//Define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsDirectory = path.join(__dirname, '../templates/views')
const partialsDirectory = path.join(__dirname, '../templates/partials')

//Setup handlebar settings - engine and views location
app.set('view engine', 'hbs')//set a setting
app.set('views', viewsDirectory)//set view directory path
hbs.registerPartials(partialsDirectory)

//Setup static directory to service
app.use(express.static(publicDirectory))

//app.com
//app.com/help
//app.com/about
// app.get('', (req, res)=>{
//     res.send('<h1>Root</h1>')
// })

//hbs
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Greg Carino'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Greg Carino'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Greg Carino'
    })
})

app.get('/products', (req, res) => {
    console.log(req.query) //return an object of query key-value pairs
    if (!req.query.search) {
        //no 'search' query
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/weather', (req,res)=>{
    const address = req.query.address
    if(!address){
        return res.send({
            error: 'address query is required'
        })
    }
    //destructure object argument: = {}
    geocode.getGeocode(address, (error, {lat, long, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(lat, long, (error, {summary}) => {
            if(error){
                return res.send({
                    error
                })
            }
            // console.log('Location', location)
            // console.log('Forecast', summary)
            res.send({
                forecast: summary,
                location: location,
                address
            })
        })
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('notfound', {
        title: '404',
        errormessage: 'Help Article Not Found',
        name: 'Greg Carino'
    })
})

app.get('*', (req, res) => {
    res.render('notfound', {
        title: '404',
        errormessage: 'Page Not Found',
        name: 'Greg Carino'
    })
})

// app.get('/about', (req, res)=>{
//     res.send('<h1>About</h1>')
// })
// app.get('/help', (req, res)=>{
//     res.send('<h1>Help</h1>')
// })

// app.get('/weather', (req, res)=>{
//     res.send({
//         lat: 232,
//         long: 200,
//         summary: 'cloudy with a chance of meatballs'
//     })
// })

app.listen(port, () => {
    //call back when server is up and running
    console.log('server is up on port ' + port)
})