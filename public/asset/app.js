const m2=document.querySelector(".message-2")
const m1=document.querySelector(".message-1")
const form=document.querySelector('form')
const search=document.querySelector('input')
form.addEventListener('submit',(e)=>
{
    e.preventDefault();
    const address=search.value;
    m1.textContent="loading............"
    m2.textContent=""
     fetch(`/weather?address=${address}`).then((response)=>{
    response.json().then((data)=>
    {
        if(data.error)
        {
            m1.textContent=data.error
        }
        else{
            m1.textContent=`Location:-${data.place}`
            m2.textContent=` Forecast Details:-${data.forecast}`

        }
    })

})

})
// btn.addEventListener('click',()=>
// {
//     alert('hi')
// })

