const request=require('request')
const getjiocode=(address,callback)=>
{
    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/encodeURIComponent(${address}).json?access_token=pk.eyJ1Ijoic2FtcHJpdGkxMjMiLCJhIjoiY2tkcGR0M2YzMDU1eTJ4bXlvczllemh0MCJ9.MzSFk7EtaXDrVGnSUFt2Vw&limit=1`


    request({url,json:true},(error,{body})=>
    {
        if(error)
        {
            callback('unable to connect the mapbox',undefined)
        }else if(body.features.length===0)
        {
            callback('unable to find anything',undefined)
        }
        else{
            const latitude=body.features[0].center[1]
            const longitude=body.features[0].center[0]
            const place=body.features[0].place_name
            callback(undefined,{latitude,longitude,place})
          }
})
}
module.exports=getjiocode