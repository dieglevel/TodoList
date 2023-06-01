//STRUCT
let temp=[]
//?? lS + i (ex: LS1, LS2)

//EX

//SETTER

function checkDataIsNull(){
    temp = localStorage.getItem("test")
    if (temp == null){
        localStorage.setItem("test", temp)
        return false
    }
    return true
}
// function add(name){
//     temp.name = name
//     temp.complete = false
// }
//ADD TO TABLE
function tdInput (i){
    let td = document.createElement("td");
    td.setAttribute("class", "border-collapse border-r border-slate-300 w-1/12 text-center")
    let input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", "LSC"+i);
    td.appendChild(input)
    return td
}

function tdName(i,name){
    let td = document.createElement("td");
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "LSN"+i);
    input.setAttribute("class", "w-full border-none")
    input.setAttribute("value", name)
    input.setAttribute("onchange" ,"changeTask(this)")
    td.appendChild(input)
    return td
}

function tdComplete(i,complete){
    let td = document.createElement("td");
    let p = document.createElement("p")
    p.setAttribute("onclick", "changeComplete(this)")
    p.setAttribute("id", "LSCom"+i)
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

function tdEdit(i){
    let td = document.createElement("td")
    td.setAttribute("class", "flex m-auto mt-2 nonePadding w-fit")

    let img2 = document.createElement("img")
    img2.setAttribute("class", "w-6 h-6 ml-2 mr-2 nonePadding hoverButton")
    img2.setAttribute("src", "../dist/img/icons8-remove-64.png")
    img2.setAttribute("id", "LSR"+i)
    img2.setAttribute("onclick","removeTask(this)")

    td.appendChild(img2)

    return td
}

function addToTable(i, name, complete){
    let doc = document.querySelector("tbody")
    let tr = document.createElement("tr")
   
    tr.appendChild(tdInput(i))
    tr.appendChild(tdName(i,name))
    tr.appendChild(tdComplete(i,complete))
    tr.appendChild(tdEdit(i))
    doc.appendChild(tr)

}
//READ
function loadData (){
    let bbb = JSON.parse(localStorage.getItem("test"))
    for (var i = 0; i <JSON.parse(localStorage.getItem("test")).length; i++){
        if (bbb != null){
            addToTable(i, bbb[i].name, bbb[i].complete)
        }
    }
}
//CHANGE COMPLETE

function changeComplete(element){
    let char = element.getAttribute("id")
    let id = char.split("LSCom")
    if (element.textContent == "Complete"){
        element.innerHTML = "Not Complete"
        element.classList.remove("Complete")
        element.setAttribute("class", "notComplete")
        temp = JSON.parse(localStorage.getItem("test"))
        temp[id[1]].complete = false
        localStorage.setItem("test", JSON.stringify(temp))
    }
    else{
        element.innerHTML = "Complete"
        element.classList.remove("notComplete")
        element.setAttribute("class", "Complete")
        temp = JSON.parse(localStorage.getItem("test"))
        temp[id[1]].complete = true
        localStorage.setItem("test", JSON.stringify(temp))
    }
//CHANGE TASK
}
function changeTask(element){
    let char = element.getAttribute("id")
    let id = char.split("LSN")
    temp = JSON.parse(localStorage.getItem("test"))
    if (checkValueAdd(element.value) == false){
        console.log(element.value)
        removeTask(document.getElementById("LSR"+id[1]))
        return
    }
    temp[id[1]].name = element.value
    localStorage.setItem("test", JSON.stringify(temp))
    clearTable()
}

//ADD TASK
function addTask (){
    let add = document.getElementById("add")
    if (checkValueAdd(add.value) == false){
        return
    }
    let addTemp = {
        name: add.value,
        complete:false
    }

    let  tempCanChange = []
    temp = JSON.parse(localStorage.getItem("test"))
    if (temp == null){
        tempCanChange.push(addTemp)
        localStorage.setItem("test", JSON.stringify(tempCanChange))
        temp = JSON.parse(localStorage.getItem("test"))
    }
    else{
        temp.push(addTemp)
        localStorage.setItem("test", JSON.stringify(temp))
    }
    clearTable()
    add.value = ""
    
}
//REMOVE
function removeTask(element){
    let char = element.getAttribute("id")
    let id = char.split("LSR")
    temp = JSON.parse(localStorage.getItem("test"))
    
    let index = id[1]
    
    temp.splice(index,index+1)

    localStorage.setItem("test", JSON.stringify(temp))
    clearTable()
}

function removeAll(){
    temp = JSON.parse(localStorage.getItem("test"))
    temp.splice(0,temp.length)

    localStorage.setItem("test", JSON.stringify(temp))
    clearTable()   
    let checkbox = document.getElementById("all")
    let removeAll = document.getElementById("removeAll")
    removeAll.classList.add("hidden")
    checkbox.checked = false
}


//LoadTable
function clearTable(){
    let doc = document.querySelector("tbody")
    while(doc.hasChildNodes()){
        doc.removeChild(doc.firstChild)
    }
    loadData()
}
//SELECT ALL CHECKBOX
function selectAll (){
    let all = document.getElementById("all")
    let removeAll = document.getElementById("removeAll")
    if (all.checked == true){
        for (var i = 0 ; i<JSON.parse(localStorage.getItem("test")).length; i++){
            let doc = document.getElementById("LSC" + i)
            doc.checked = true
            removeAll.classList.remove("hidden")
        }
    }else{
        for (var i = 0 ; i<JSON.parse(localStorage.getItem("test")).length; i++){
            let doc = document.getElementById("LSC" + i)
            doc.checked = false
            removeAll.classList.add("hidden")
        }
    }
}

//checkValueAdd
function checkValueAdd(name){
    if (name == "" || name == null){
        return false
    }
    return true
}

// MAIN 
if (checkDataIsNull() == true){

    if (localStorage.getItem("test") != null){
        loadData()
    }

}