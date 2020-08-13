const request=require('request')

const getforecast=(latitude,longitude,callback)=>
{
    const url=`http://api.weatherstack.com/current?access_key=7967dc7cb6c0257cc4fbeed9fc0967a4&query=${latitude},${longitude}&units=f`

    request({url:url,json:true},(error,response)=>
    {
        if(error)
        {
            callback('unable to connect the network',undefined)
        }else if(response.body.error)
        {
            callback('unable to get the forecast',undefined)
        }
        else{
        const data=response.body.current
        callback(undefined,`${data.weather_descriptions[0]}..the temp is ${data.temperature} and it feels like ${data.feelslike} and ${response.body.location.country}`)
    }})
}

module.exports=getforecast