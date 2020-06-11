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
let objName = document.getElementById('objName')

logoutBtn.addEventListener('click', function(){
    sessionStorage.clear()
    window.location.href = 'index.html'
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
    let index = 1
    sessionStorage.setItem('objectID',i+1)
    img.src = data[i][`img${index}`]
    objName.innerText += data[i]['name']
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
    // nopeBtn.addEventListener('click', function(){
    //     if (i+1<data.length){
    //         i++
    //         render(i)
    //     }
    //     else {
    //         render(data.length)
    //     }
    // })

}

//render(10)
//render(3)

async function dislike(){
    let i=0
    const data = await getData()
    if (sessionStorage.getItem('id') !== 1){
        render(i)
        nopeBtn.addEventListener('click', function(){
            objName.innerText = 'Name: '
            img.src = ''
            if (i+1<data.length){
                i++
                render(i)
            }
            else {
                render(data.length)
            }
        })
    }
}

dislike()

async function like(){
    const data = await getData()
    let matchedID = []
    likeBtn.addEventListener('click', function(){
        matchedID.push(sessionStorage.getItem('objectID'))
        fetch(`https://5ecfb1de16017c00165e2e6b.mockapi.io/user/${sessionStorage.getItem('id')}`,{
        method: 'PUT',
        body: JSON.stringify({
            'matchedID' : matchedID
        }),
        headers: {
            'Content-type': 'application/json'
        }
        })
        let objID = sessionStorage.getItem('objectID')
        objID++
        objName.innerText = 'Name: '
        img.src = ''
        sessionStorage.setItem('objectID',objID)
        render(objID-1)
    })
    
}

like()