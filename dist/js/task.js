


function addMainTask(nameTask){
    mainTask.push({
        nameTask: nameTask,
        childTask: []
    })
    localStorage.setItem("Data", JSON.stringify(user))
    addMainTaskToTable(mainTask.length-1, nameTask)

}

function removeMainTask(element){
    var char = element.getAttribute("id")
    var id = char.split(" ")
    console.log(id[1])
    mainTask.splice(id[1], 1)
    console.log(mainTask)
    
    user[idUser].mainTask = mainTask
    localStorage.setItem("Data", JSON.stringify(user))
    var doc = document.getElementById("table")
    doc.innerHTML= ""
    loadData()
}

function addMainTaskToTable(id, nameTask){
    //NameTask
    var div = document.createElement("div")
    div.setAttribute("class", "mt-4")
    div.setAttribute("id", "TB" + id)
    var div2 = document.createElement("div")
    div2.setAttribute("class", "w-auto flex items-center")
    var h1 = document.createElement("h1")
    h1.setAttribute("id", "M "+ id)
    h1.setAttribute("class", "text-left text-xl font-bold rounded-xl p-0 font-Fira-Sans")
    h1.innerHTML = "﴾ " + nameTask + " ﴿" 
    var img = document.createElement("img")
    img.setAttribute("class", "w-7 h-7")
    img.setAttribute("src", "../dist/img/icons8-remove-64.png")
    img.setAttribute("id", "TBRM "+ id)
    img.setAttribute("onclick", "removeMainTask(this)")

    div2.appendChild(h1)
    div2.appendChild(img)
    div.appendChild(div2)
    //Table
    var table = document.createElement("table")
    table.setAttribute("class", "border-collapse border border-slate-300 table-fixed w-full")
    var thead = document.createElement("thead")
    var td1 = document.createElement("td")
    td1.setAttribute("class", "border-collapse border border-slate-300 w-7/12 bg-slate-600 text-white")
    td1.setAttribute("id", "ClickTask " + id + " -1")
    td1.setAttribute("onclick", "changeSortTask(this)")
    var div3 = document.createElement("div")
    div3.setAttribute("class", "flex")
    var p = document.createElement("p")
    p.innerHTML = "Task"
    p.setAttribute("class", "text-center items-center m-auto")
    var img = document.createElement("img")
    img.setAttribute("src", "../dist/img/icons8-down-50.png")
    img.setAttribute("class", "w-7 h-7")
    img.setAttribute("id", "img " + id)

    
    div3.appendChild(p)
    div3.appendChild(img)
    td1.appendChild(div3)
    
    
    
    var td2 = document.createElement("td")
    td2.setAttribute("class", "border-collapse border border-slate-300 w-2/12 bg-slate-600 text-white")
    td2.innerHTML = "Status"
    
    var td3 = document.createElement("td")
    td3.setAttribute("class", "border-collapse border border-slate-300 w-1/12 bg-slate-600 text-white")
    td3.innerHTML = "Edit"

    var td4 = document.createElement("td")
    td4.setAttribute("class", "border-collapse border border-slate-300 w-2/12 bg-slate-600 text-white")
    td4.setAttribute("id", "ClickDead " + id)
    td4.setAttribute("onclick", "changeSortDead(this)")

    var div3 = document.createElement("div")
    div3.setAttribute("class", "flex")
    var p = document.createElement("p")
    p.innerHTML = "Deadline"
    p.setAttribute("class", "text-center items-center m-auto")
    var img = document.createElement("img")
    img.setAttribute("src", "../dist/img/icons8-down-50.png")
    img.setAttribute("class", "w-7 h-7 hidden")
    img.setAttribute("id","imgDead "+ id)
    
    div3.appendChild(p)
    div3.appendChild(img)

    td4.appendChild(div3)
    
    var tbody = document.createElement("tbody")
    tbody.setAttribute("id", "Body " + id)

    thead.appendChild(td1)
    thead.appendChild(td2)
    thead.appendChild(td3)
    thead.appendChild(td4)

    table.appendChild(thead)
    table.appendChild(tbody)

    div.appendChild(table)
    //Input
    var tr = document.createElement("tr")
    tr.setAttribute("class", "border-b-gray-500 w-full")
    var td1 = document.createElement("td")
    td1.setAttribute("class", "w-3/4")
    var input = document.createElement("input")
    input.setAttribute("class", "w-full border-none text-left")
    input.setAttribute("type", "text")
    input.setAttribute("placeholder", "Add Part Task")
    input.setAttribute("id", "A " + id)
    input.setAttribute("value", "")
    td1.appendChild(input)

    var td2 = document.createElement("td")
    var input2 = document.createElement("input")
    input2.setAttribute("class", "w-full text-xs")
    input2.setAttribute("type", "datetime-local")
    input2.setAttribute("id", "AD " + id)
    input2.setAttribute("value", "")
    td2.appendChild(input2)

    var td3 = document.createElement("td")
    var img = document.createElement("img")
    img.setAttribute("src", "../dist/img/icons8-add-50.png")
    img.setAttribute("class", "w-7 m-auto hoverButton")
    img.setAttribute("id", "BT " + id)
    img.setAttribute("onclick", "addChildTask(this)")
    td3.appendChild(img)

    var tbody = document.createElement("tbody")
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(document.createElement("td"))
    tbody.appendChild(tr)

    table.appendChild(tbody)
    document.getElementById("table").appendChild(div)
}

function checkNameChildTask(doc){
    var text = doc.value.trim()
    if (text == "" || text == null){
        return true
    }
    return false
}

function checkNameChildTaskNoTrim(doc){
    var text = doc.value
    if (text == "" || text == null){
        return true
    }
    return false
}


function checkDateChildTask(doc){
    var text = doc.value.trim()
    if (text == "" || text == null){
        return true
    }
    if (new Date(doc.value) < new Date()){
        return true
    }
    return false
}

function addChildTask (doc){
    var char = doc.getAttribute("id")
    var charId = char.split(" ")
    idMainTask = charId[1]
    
    

    if (checkNameChildTask(document.getElementById("A "+ charId[1])) == false && checkDateChildTask(document.getElementById("AD "+ charId[1])) == false){
        mainTask[charId[1]].childTask.push({
            name: document.getElementById("A "+charId[1]).value,
            complete: false,
            deadline: document.getElementById("AD "+charId[1]).value,
            timeCreate: new Date(),
        })

        user[idUser].mainTask = mainTask
        localStorage.setItem("Data", JSON.stringify(user))
        addToTable(charId[1], mainTask[charId[1]].childTask.length-1)
        document.getElementById("A "+charId[1]).value = ""
        document.getElementById("AD "+charId[1]).value = ""
        loadDeadLine()
    }



    // addChildTaskToTable()
}

//child

function getTimeDeadline(idMainTaskInput, idChildTaskInput){
    var timeDeadline = new Date(mainTask[idMainTaskInput].childTask[idChildTaskInput].deadline)
    var now = new Date()
    const timeleft = timeDeadline - now;
    //GOOGLE
    const msPerSecond = 1000;
    const msPerMinute = msPerSecond * 60;
    const msPerHour = msPerMinute * 60;

    const hours = Math.floor((timeleft/(1000*60*60)));
    const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / msPerMinute);
    if (timeleft >0){
        return hours + " Hours " + minutes + " Minutes"
    }
    return ""


}

function missingTask(idMainTaskInput, idChildTaskInput){
    var timeDeadline = new Date(mainTask[idMainTaskInput].childTask[idChildTaskInput].deadline)
    var now = new Date()

    if (now > timeDeadline){
        return "Missing Task"
    }
    return ""
}

function tdName(idMainTaskInput, idChildTaskInput ,name){
    let td = document.createElement("td");
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "Task "+ idMainTaskInput + " " + idChildTaskInput);
    input.setAttribute("class", "w-full border-none text-left")
    input.setAttribute("value", name)
    input.setAttribute("onchange" ,"changeTask(this)")
    td.appendChild(input)

    var div = document.createElement("div")
    div.setAttribute("class", "flex items-center")
    var img  = document.createElement("img")
    img.setAttribute("src", "../dist/img/icons8-dead-64.png")
    img.setAttribute("class", "w-5 h-5")
    var p = document.createElement("p")
    p.setAttribute("id", "DR " + idMainTaskInput + " " + idChildTaskInput);
    p.setAttribute("class", "text-xs")
    p.innerHTML = getTimeDeadline(idMainTaskInput, idChildTaskInput)

    div.appendChild(img)
    div.appendChild(p)

    var span = document.createElement("span")
    span.innerHTML = missingTask(idMainTaskInput, idChildTaskInput)
    span.setAttribute("class", "text-red-500 font-extrabold font-sans text-xs")
    div.appendChild(span)

    td.appendChild(div)
    return td
}

function tdComplete(idMainTaskInput, idChildTaskInput , complete){
    let td = document.createElement("td");
    let p = document.createElement("p")
    p.setAttribute("onclick", "changeComplete(this)")
    p.setAttribute("id", "S "+idMainTaskInput + " " + idChildTaskInput)
    if (complete == false){
        p.setAttribute("class", "notComplete")
        let text = document.createTextNode("Not Complete")
        p.appendChild(text)
        td.appendChild(p)
    }else{
        p.setAttribute("class", "Complete")
        let text = document.createTextNode("Complete")
        p.appendChild(text)
        td.appendChild(p)
    }
    return td
}

function tdEdit(idMainTaskInput, idChildTaskInput){
    let td = document.createElement("td")

    let img2 = document.createElement("img")
    img2.setAttribute("class", "w-6 h-6 p-0 hoverButton m-auto")
    img2.setAttribute("src", "../dist/img/icons8-remove-64.png")
    img2.setAttribute("id", "E "+idMainTaskInput + " " + idChildTaskInput)
    img2.setAttribute("onclick","removeTask(this)")

    td.appendChild(img2)

    return td
}

function getDeadline(value){
    var deadline = new Date(value);
    return deadline.toLocaleString('vn-VN', { hour: 'numeric', minute: 'numeric', hour12: true }) + "<Br>"  + deadline.getDate() + "-" +(deadline.getMonth()+1) + "-" + deadline.getFullYear()
}

function countDeadlineBackground(idMainTaskInput, idChildTaskInput){
    const total = Date.parse(new Date(mainTask[idMainTaskInput].childTask[idChildTaskInput].deadline)) - Date.parse(new Date());
    const hours = Math.floor((total/(1000*60*60)));
    if (0 <= hours && hours < 6){
        return "bg-red-700"
    }
    else if (6 <= hours && hours < 12){
        return "bg-red-300"
    }
    else if (12 <= hours && hours < 18){
        return "bg-red-100"
    }
    else if (18 <= hours && hours < 24){
        return "bg-red-50"
    }
    else if (hours > 24){
        return ""
    }
    else{
        return "bg-red-900" 
    }
}
//
function addTableDeadline(idMainTaskInput, idChildTaskInput){
    const total = Date.parse(new Date(mainTask[idMainTaskInput].childTask[idChildTaskInput].deadline)) - Date.parse(new Date());
    const hours = Math.floor((total/(1000*60*60)));
    if (0 <= hours && hours < 18){
        if (checkH1TableDeadLine == false){
            checkH1TableDeadLine = true
            var div = document.createElement("div")
            div.setAttribute("class", "border-t-2 border-t-slate-500")
            div.setAttribute("id", "tableDeadLine " + idMainTaskInput)
    
            var h1 = document.createElement("h1")
            h1.setAttribute("class", "text-left text-xl font-bold rounded-xl p-0 font-Fira-Sans")
            h1.innerHTML = "﴾ " + mainTask[idMainTaskInput].nameTask + " ﴿"
            div.appendChild(h1)
            
            document.getElementById("tableDeadLine").appendChild(div)
        }
    
        var div  = document.createElement("div")
        div.setAttribute("id", "tableDeadLine " + idMainTaskInput + " " + idChildTaskInput)
        div.setAttribute("class" , "border-t-2 border-t-slate-200")
    
            var p = document.createElement("p")
            p.setAttribute("class", "text-left")
            p.innerHTML = mainTask[idMainTaskInput].childTask[idChildTaskInput].name
    
            var div2 = document.createElement("div")
            div2.setAttribute("class", "flex items-center")
    
            var img  = document.createElement("img")
            img.setAttribute("src", "../dist/img/icons8-dead-64.png")
            img.setAttribute("class" , "w-5 h-5")
            var p2 = document.createElement("p")
            p2.setAttribute("class", "text-xs")
            p2.innerHTML = getTimeDeadline(idMainTaskInput, idChildTaskInput)
    
            div2.appendChild(img)
            div2.appendChild(p2)
    
            div.appendChild(p)
            div.appendChild(div2)
            document.getElementById("tableDeadLine "+ idMainTaskInput).appendChild(div)
    
            count++;
            document.getElementById("count").innerHTML = count
    }
    


}

function tdDeadline(idMainTaskInput, idChildTaskInput){
    let td = document.createElement("td")
    let br = document.createElement("br")

    td.innerHTML = getDeadline(mainTask[idMainTaskInput].childTask[idChildTaskInput].deadline)
    td.setAttribute("class", countDeadlineBackground(idMainTaskInput, idChildTaskInput))
    return td
}

function addToTable(idMainTaskInput, idChildTaskInput){
    let doc = document.getElementById("Body " + idMainTaskInput)
    let tr = document.createElement("tr")
    tr.setAttribute("id", "TR " + idMainTaskInput + " " + idChildTaskInput)
    tr.setAttribute("class", "border-b border-b-gray-200")

    tr.appendChild(tdName(idMainTaskInput, idChildTaskInput, mainTask[idMainTaskInput].childTask[idChildTaskInput].name))
    tr.appendChild(tdComplete(idMainTaskInput, idChildTaskInput, mainTask[idMainTaskInput].childTask[idChildTaskInput].complete))
    tr.appendChild(tdEdit(idMainTaskInput, idChildTaskInput))
    tr.appendChild(tdDeadline(idMainTaskInput, idChildTaskInput))
    doc.appendChild(tr)
}

//


//REMOVE
function removeTask(element){
    let char = element.getAttribute("id")
    let id = char.split(" ")
    mainTask[id[1]].childTask.splice([id[2]], 1)

    user[idUser].mainTask = mainTask
    localStorage.setItem("Data", JSON.stringify(user))
    var doc = document.getElementById("Body " + id[1])
    doc.innerHTML = ""

    for (var j = 0; j<mainTask[id[1]].childTask.length; j++){
        addToTable(id[1],j)
    }
}
//
//CHANGE
function changeComplete(element){
    let char = element.getAttribute("id")
    let id = char.split(" ") //
    if (element.textContent == "Complete"){
        element.innerHTML = "Not Complete"
        element.classList.remove("Complete")
        element.setAttribute("class", "notComplete")
        
        mainTask[id[1]].childTask[id[2]].complete = false

        user[idUser].mainTask = mainTask
        localStorage.setItem("Data", JSON.stringify(user))
    }
    else{
        element.innerHTML = "Complete"
        element.classList.remove("notComplete")
        element.setAttribute("class", "Complete")

        mainTask[id[1]].childTask[id[2]].complete = true

        user[idUser].mainTask = mainTask
        localStorage.setItem("Data", JSON.stringify(user))
    }
}

function changeTask(element){
    let char = element.getAttribute("id")
    let id = char.split(" ")

    if (checkNameChildTaskNoTrim(element) == true){
        removeTask(element)
        document.getElementById("Tr "+ id[1] +id[2]).innerHTML =""
        return
    }

    mainTask[id[1]].childTask[id[2]].name = element.value
    user[idUser].mainTask = mainTask
    localStorage.setItem("Data", JSON.stringify(user))
    loadDeadLine()
}


//
    function openDead(element){
        document.getElementById("DeadlineBoard").classList.remove("hidden")
    }

    function closeDead(element){
        document.getElementById("DeadlineBoard").classList.add("hidden")
    }
//
let checkH1TableDeadLine
let count
function loadData(){
    mainTask = user[idUser].mainTask
    for (var i = 0 ; i<mainTask.length;i++){
        addMainTaskToTable(i, mainTask[i].nameTask)
        for (var j = 0; j<mainTask[i].childTask.length; j ++){
            addToTable(i,j)
        }
    }
    loadDeadLine()
}

function loadDeadLine(){
    count = 0;
    document.getElementById("tableDeadLine").innerHTML = ""
    mainTask = user[idUser].mainTask
    for (var i = 0 ; i<mainTask.length;i++){
        checkH1TableDeadLine = false
        for (var j = 0; j<mainTask[i].childTask.length; j ++){
            addTableDeadline(i,j)
        }
    }
}


document.getElementById("addMainTask").addEventListener("keydown", function(e){
    if (e.key == "Enter"){
        if (this.value.trim() != ""){
            addMainTask(this.value)
            this.value = ""
        }
    }
})


// SORT
function changeSortTask(element){
    let char = element.getAttribute("id")
    let id = char.split(" ")

    
    if (id[2] == -1 ){
        sortTaskUpToDown(id[1])
        element.setAttribute("id", "ClickTask " + id[1] + " 1")
        var img1 = document.getElementById("img " + id[1] )
        img1.setAttribute("src", "../dist/img/icons8-up-50.png")
        img1.classList.remove("hidden")
    }else if (id[2] == 1){
        sortTaskDownToUp(id[1])
        element.setAttribute("id", "ClickTask " + id[1] + " -1")
        var img1 = document.getElementById("img " + id[1])
        img1.setAttribute("src", "../dist/img/icons8-down-50.png")
        img1.classList.remove("hidden")
    }
    else{
        sortTaskDownToUp(id[1])
        element.setAttribute("id", "ClickTask " + id[1] + " -1")
        var img1 = document.getElementById("img " + id[1])
        img1.setAttribute("src", "../dist/img/icons8-down-50.png")
        img1.classList.remove("hidden")
    }

    var deadImg = document.getElementById("imgDead " +id[1])
    deadImg.classList.add("hidden")
    var dead = document.getElementById("ClickDead " + id[1] + " -1")
    if (dead != null){
        dead.setAttribute("id", "ClickDead "+ id[1] + " 0")
    }

    var dead = document.getElementById("ClickDead " + id[1] + " 1")
    if (dead != null){
        dead.setAttribute("id", "ClickDead "+ id[1] + " 0")
    }
}

function changeSortDead(element){
    let char = element.getAttribute("id")
    let id = char.split(" ")


    if (id[2] == -1){
        sortDeadUpToDown(id[1])
        element.setAttribute("id", "ClickDead " + id[1] + " 1")
        var img1 = document.getElementById("imgDead " + id[1])
        img1.setAttribute("src", "../dist/img/icons8-up-50.png")
        img1.classList.remove("hidden")
    }else if (id[2] == 1){
        sortDeadDownToUp(id[1])
        element.setAttribute("id", "ClickDead " + id[1] + " -1")
        var img1 = document.getElementById("imgDead " + id[1])
        img1.setAttribute("src", "../dist/img/icons8-down-50.png")
        img1.classList.remove("hidden")
    }else{
        sortDeadDownToUp(id[1])
        element.setAttribute("id", "ClickDead " + id[1] + " -1")
        var img1 = document.getElementById("imgDead " + id[1])
        img1.setAttribute("src", "../dist/img/icons8-down-50.png")
        img1.classList.remove("hidden")
    }

    var deadImg = document.getElementById("img " +id[1])
    deadImg.classList.add("hidden")
    var dead = document.getElementById("ClickTask " + id[1] + " -1")
    if (dead != null){
        dead.setAttribute("id", "ClickTask "+ id[1] + " 0")
    }

    var dead = document.getElementById("ClickTask " + id[1] + " 1")
    if (dead != null){
        dead.setAttribute("id", "ClickTask "+ id[1] + " 0")
    }
}

function sortTaskUpToDown(id){
    for (var i = 0 ; i < mainTask[id].childTask.length -1; i++){
        for (var j = i + 1; j < mainTask[id].childTask.length; j++){
            if (mainTask[id].childTask[i].timeCreate > mainTask[id].childTask[j].timeCreate){
                temp = mainTask[id].childTask[i]
                mainTask[id].childTask[i] = mainTask[id].childTask[j]
                mainTask[id].childTask[j] = temp
            }
        }
    }

    user[idUser].mainTask = mainTask
    localStorage.setItem("Data", JSON.stringify(user))

    var doc = document.getElementById("Body " + id)
    doc.innerHTML = ""

    for (var j = 0; j<mainTask[id].childTask.length; j++){
        addToTable(id,j)
    }
}

function sortTaskDownToUp(id){
    for (var i = 0 ; i < mainTask[id].childTask.length -1; i++){
        for (var j = i + 1; j < mainTask[id].childTask.length; j++){
            if (mainTask[id].childTask[i].timeCreate < mainTask[id].childTask[j].timeCreate){
                temp = mainTask[id].childTask[i]
                mainTask[id].childTask[i] = mainTask[id].childTask[j]
                mainTask[id].childTask[j] = temp
            }
        }
    }

    user[idUser].mainTask = mainTask
    localStorage.setItem("Data", JSON.stringify(user))

    var doc = document.getElementById("Body " + id)
    doc.innerHTML = ""

    for (var j = 0; j<mainTask[id].childTask.length; j++){
        addToTable(id,j)
    }
}

function sortDeadUpToDown(id){
    for (var i = 0 ; i < mainTask[id].childTask.length -1; i++){
        for (var j = i + 1; j < mainTask[id].childTask.length; j++){
            if (mainTask[id].childTask[i].deadline > mainTask[id].childTask[j].deadline){
                temp = mainTask[id].childTask[i]
                mainTask[id].childTask[i] = mainTask[id].childTask[j]
                mainTask[id].childTask[j] = temp
            }
        }
    }

    user[idUser].mainTask = mainTask
    localStorage.setItem("Data", JSON.stringify(user))

    var doc = document.getElementById("Body " + id)
    doc.innerHTML = ""

    for (var j = 0; j<mainTask[id].childTask.length; j++){
        addToTable(id,j)
    }
}

function sortDeadDownToUp(id){
    for (var i = 0 ; i < mainTask[id].childTask.length -1; i++){
        for (var j = i + 1; j < mainTask[id].childTask.length; j++){
            if (mainTask[id].childTask[i].deadline < mainTask[id].childTask[j].deadline){
                temp = mainTask[id].childTask[i]
                mainTask[id].childTask[i] = mainTask[id].childTask[j]
                mainTask[id].childTask[j] = temp
            }
        }
    }

    user[idUser].mainTask = mainTask
    localStorage.setItem("Data", JSON.stringify(user))

    var doc = document.getElementById("Body " + id)
    doc.innerHTML = ""

    for (var j = 0; j<mainTask[id].childTask.length; j++){
        addToTable(id,j)
    }
}