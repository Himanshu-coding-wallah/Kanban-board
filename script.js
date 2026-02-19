const addTask = document.getElementById("add-task")
const taskList1 = document.getElementById("task-list1")
let taskList2 = document.getElementById("task-list2")
let taskList3 = document.getElementById("task-list3")
let textInput = document.getElementById("text-input")

let allTask = []
let editingId = null
let selected = null

addTask.addEventListener("click", (e)=>{
    e.preventDefault()
    if(editingId === null){
        const task = textInput.value.trim()
        if(task !==""){
            let taskItem={
                id: Date.now(),
                text:task,
            }
            allTask.push(taskItem)
        }
        taskList1.innerHTML=""
        displayTask()
    }else{
        let editingText = textInput.value.trim()
        editingTask(editingText,editingId)        
    }
})

// rendering tasks
function displayTask(){
    allTask.forEach((task)=>{
        const listItem = document.createElement("li")
        listItem.setAttribute("draggable", "true")
        listItem.innerHTML=
        `<span>${task.text}</span>
        <button id="${task.id}">edit</button> 
        <button id="${task.id}">delete</button>`
        taskList1.append(listItem)
        textInput.value=""

        // drag start
        listItem.addEventListener("dragstart",(e)=>{
            selected = listItem
            console.log(selected);
            
        })
    })
}

// deleting and editing tasks
taskList1.addEventListener("click", (e)=>{
    if(e.target.tagName === "BUTTON" && e.target.textContent === "delete"){
        const taskId = parseInt(e.target.id)
        let items = allTask.filter((task) =>(task.id !== taskId))
        allTask.length=0
        allTask=[...items]
        taskList1.innerHTML=""
        displayTask()    
    }else if(e.target.tagName === "BUTTON" && e.target.textContent === "edit"){
        const taskId = parseInt(e.target.id)
        editingId=taskId

        allTask.forEach(task =>{
            if(task.id === taskId){
                let editingText = task.text
                textInput.value = editingText
            }
        })
    }
})

function editingTask(editingText,editId){
    allTask.forEach(task =>{
    if(task.id === editId){
        task.text = editingText
    }
    })
    editingId=null
    taskList1.innerHTML = ""
    displayTask()
}


taskList2.addEventListener("dragover",(e)=>{
    e.preventDefault()
})
taskList2.addEventListener("drop",(e)=>{
    e.preventDefault()
    if(selected){
        taskList2.appendChild(selected)
        selected = null
    }
})
taskList1.addEventListener("dragover",(e)=>{
    e.preventDefault()
})
taskList1.addEventListener("drop",(e)=>{
    e.preventDefault()
    if(selected){
        taskList1.appendChild(selected)
        selected = null
    }
})
taskList3.addEventListener("dragover",(e)=>{
    e.preventDefault()
})
taskList3.addEventListener("drop",(e)=>{
    e.preventDefault()
    if(selected){
        taskList3.appendChild(selected)
        selected = null
    }
})
