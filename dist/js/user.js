let user= []
let temp=[{}]
let mainTask=[]
let idUser
let idMainTask
let idChildTask

// temp = []

// mainTask = {"nameMainTask": "NULL",
//             "childTask": temp}  



// user = {"mainTask": [mainTask],
//         username:"Maintaint"
//         }

function checkDataIsNull(){
    var check = localStorage.getItem("Data")
    if (check != null){
        console.log("Đã có data")
    }
    else{
        user= []
        temp=[{}]
        mainTask=[]
        console.log("Đang tạo data cho user")
        localStorage.setItem("Data", JSON.stringify(user))
        console.log("Đã tạo xong")
        console.log(localStorage.getItem("Data"))
    }
}

function checkUsernameIsNull(){
    let value = document.getElementById("username")
    if (value.value.trim() == ""){
        return false
    }
    return true
}

function addUsernameToData(){
    var value = document.getElementById("username").value
    user = JSON.parse(localStorage.getItem("Data"))
    user.push({username: value, mainTask: mainTask})
    localStorage.setItem("Data", JSON.stringify(user))
}

function changeURL(){
    var login = document.getElementById("div-login")
    login.classList.add("hidden")

    var task = document.getElementById("div-task")
    task.classList.remove("hidden")
}

function checkUsernameInDataAndGetIDUsername(){
    var doc = document.getElementById("username").value
    var flag = 0
    idUser = -1
    user = JSON.parse(localStorage.getItem("Data"))

    for (var i = 0 ; i< user.length; i++){
        if (user[i].username == doc){
            flag = 1;
            idUser = i;
            return;
         }
    }

    if (flag == 0){
        addUsernameToData()
        idUser = user.length -1
    }


}

document.getElementById("username").addEventListener("keydown", function(e){
    if (e.key == "Enter"){
        checkDataIsNull()
        if (checkUsernameIsNull() == true){
            checkUsernameInDataAndGetIDUsername()
            changeURL()
            loadHelloUser()
        }
    }
})

// IntoThePageTask

function loadHelloUser(){
    document.getElementById("div-task").classList.remove("hidden")
    var helloUser = document.getElementById("helloUser")
    var char = user[idUser].username.charAt(0).toUpperCase() + user[idUser].username.slice(1)
    document.getElementById("helloUser").innerHTML ="Wellcome Back, "+ char +""
    mainTask = user[idUser].mainTask
    loadData()
}



