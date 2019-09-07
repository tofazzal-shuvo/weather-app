const weatherForm = document.querySelector('form');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const showingPara = document.getElementById('searchValue');
    showingPara.innerHTML='Loading...';
    const address = document.querySelector('input').value;
    fetch('/weather?address='+address).then((res)=>{
        res.json().then((jsonData)=>{
            if(jsonData.err){
                showingPara.innerHTML=jsonData.err;
            }else{
                showingPara.innerHTML=`<strong>Currently: </strong> ${jsonData.data.currently_summary} <br/> <strong>Summary: </strong> ${jsonData.data.daily_summary} <br/> <strong>Location: </strong> ${jsonData.data.place_name}`;
            }
        });
    });
});