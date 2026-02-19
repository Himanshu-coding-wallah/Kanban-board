const addTask = document.getElementById("add-task")
const taskList = document.getElementById("task-list")
let textInput = document.getElementById("text-input")

let allTask = []
let editingId = null

addTask.addEventListener("click", (e)=>{
    e.preventDefault()
    if(editingId === null){
        const task = textInput.value.trim()
        if(task !==""){
            let taskItem = document.createElement("object")
            taskItem={
                id: Date.now(),
                text:task,
            }
            allTask.push(taskItem)
        }
        taskList.innerHTML=""
        displayTask()
    }else{
        let editingText = textInput.value.trim()
        editingTask(editingText,editingId)
        console.log(editingText);
        
    }
})

// rendering tasks
function displayTask(){
    allTask.forEach((task)=>{
        const listItem = document.createElement("li")
        listItem.innerHTML=`<span>${task.text}</span>
 <button id="${task.id}">edit</button> <button id="${task.id}">delete</button>`
        taskList.append(listItem)
        textInput.value=""
    })
}

// deleting and editing tasks
taskList.addEventListener("click", (e)=>{
    if(e.target.tagName === "BUTTON" && e.target.textContent === "delete"){
        const taskId = parseInt(e.target.id)
        let items = allTask.filter((task) =>(task.id !== taskId))
        allTask.length=0
        allTask=[...items]
        taskList.innerHTML=""
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
    taskList.innerHTML = ""

    displayTask()
}
