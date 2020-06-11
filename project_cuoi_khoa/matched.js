const matchedList= document.querySelector(".matched-list ul")
const detailInfo= document.getElementsByClassName("detail-info");
console.log(matchedList);
async function fetchData(){
    const data= await fetch("https://5ecfb1de16017c00165e2e6b.mockapi.io/user?fbclid=IwAR3UH2Phtd8b2c4ZEGb2BFlPjMKehvlCrjjbh3x5VPdgKYFJQ8MxsJ9dMis");
    const realData= await data.json();

    return realData;

}
async function render(){
    const data= await fetchData();
    const id= sessionStorage.getItem('id');
    console.log(detailInfo);
    const index=Number(id)-1;
    data[0]["matchedID"].forEach( (item) =>{
        console.log(item);
        let matchIndex=data.findIndex( function(x) {
            return x.id==item;
        })
        console.log(matchIndex);
        matchedList.insertAdjacentHTML(
            
            'beforeend',`<li style="display: flex;margin: 10px;cursor: pointer;" matchindex=${matchIndex} ><div style="width: 100px ;height: 100px;"><img style="width: 100px;height: 100px;" src="${data[matchIndex].img1}" alt=""></div><div>${data[matchIndex].name}</div></li>`
            
        )
  
    })
    const matchedPpl=document.querySelectorAll(".matched-list ul li");
    matchedPpl.forEach((item)=>{
        console.log(item.getAttribute("matchindex"));
      item.addEventListener("click",()=>{

          change(data[item.getAttribute("matchindex")]);
      })
    })
}

render();

function change(data){
    detailInfo[0].innerHTML="";
    let html=`
    <div style="height: 35%;margin-top: 5% ;">
    <div style="margin: auto; height: 300px; width: 300px;">
        <img style="margin:auto; width: 300px;height:300px;" src="${data.img1}" alt="">
    </div>
    </div>
    <!--info here-->
    <div>
    Tuong hop roi, noi chuyen ngay nao!
    <br>
    Facebook: ${data.facebook}
    <br>
    Instagram: ${data.instagram}
    </div>
    `;
    detailInfo[0].innerHTML=html;
}