const path=require('path')
const express=require('express')
 const app=express()
 const hbs=require('hbs')
 const getforecast=require('./reuse/forecast.js')
 const getjiocode=require('./reuse/utils.js')
const { request } = require('http')
 const partialpath=path.join(__dirname,'../view/partial')
const pathdirect=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../view/views')
//app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');
app.set('views',viewpath)
app.use(express.static(pathdirect))
hbs.registerPartials(partialpath)
app.get('',(req,res)=>
{
    res.render('index',{
        title:' Weather Data',
        name:'Sampriti Das',
        dream:'Sky Diving'
    })
})
app.get('/about',(req,res)=>
{
    res.render('about',{
        title:'About Page',
        name:'Sampriti Das',
        age:21
    })
})
app.get('/help',(req,res)=>
{
    res.render('help',{
        title:'Help Page',
        name:'Sampriti Das',
        contact:9090909099
    })
})
 app.get('/weather',(req,res)=>
 {
    if(!req.query.address)
    {
       return res.send({
            error:'address must be provided'
        })
    }
    getjiocode(req.query.address,(error,{latitude,longitude,place}={})=>
    {
        if(error)
        {
         return res.send({
             error
         })
        }
     getforecast(latitude,longitude,(error,forecastdata)=>
    {
        if(error)
        {
         return res.send({error })
        }
         res.send(
                {
                    forecast:forecastdata,
                    place:place,
                    address:req.query.address
                }
            )
        }
    )
})
 })





 app.get('/help/*',(req,res)=>
 {
     res.render('404',{
         title:'404 Page',
         name:'Sampriti Das',
         errormessage:'Help Page Not Found'
     })
 })
 
 app.get('*',(req,res)=>
{
    res.render('404',{
        title:'404 Page',
        name:'Sampriti Das',
        errormessage:'Page Not Found'
    })
})


 app.listen(3000,()=>
 {
     console.log('Server is up')
 })