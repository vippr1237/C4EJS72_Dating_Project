let name = document.getElementById('name')
let age = document.getElementById('age')
let gender = document.getElementById('gender')
let avt = document.getElementById('avatar')
let logoutBtn = document.getElementById('logout')
let nextBtn = document.getElementById('next')
let likeBtn = document.getElementById('like')
let nopeBtn = document.getElementById('nope')
let preBtn = document.getElementById('previous')
let img = document.getElementById('img')
let id = sessionStorage.getItem('id')

logoutBtn.addEventListener('click', function(){
    sessionStorage.clear()
    window.location.href = 'file:///E:/c4e72/hoangSon-c4e72/final-project/index.html'
})

async function getData(){
    const api = await fetch('https://5ecfb1de16017c00165e2e6b.mockapi.io/user')
    const data = await api.json()
    console.log(data)
    return data
}

async function showProfile() {
    let data = await getData()
    name.innerText += data[id-1]['name']
    age.innerText += data[id-1]['Age']
    if (data[id-1]['isMale']){
        gender.innerText += 'Male'
    }
    else {
        gender.innerText += 'Female'
    }
    avt.src = data[id-1]['img1']
}

showProfile()

async function render(i){
    let data = await getData()
    let newData = data.splice(id-1,1)
    let index = 1
    img.src = data[i][`img${index}`]
    nextBtn.addEventListener('click', function(){
        if(index<3){
            index++
            img.src = data[i][`img${index}`]    
        }
        else{
            img.src = data[i]['img3']
        }
    }) 
    preBtn.addEventListener('click', function(){
        if (index>1){
            index--
            img.src = data[i][`img${index}`]
        }
        else {
            img.src = data[i]['img1']
        }
    })
}

render(3)