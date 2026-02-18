const addTask = document.getElementById("add-task")
const taskList = document.getElementById("task-list")
const textInput = document.getElementById("text-input")

let allTask = []
addTask.addEventListener("click", (e)=>{
    e.preventDefault()
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
       
        
    }
    })

