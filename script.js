const addTask = document.getElementById("add-task")
const taskList1 = document.getElementById("task-list1")
let taskList2 = document.getElementById("task-list2")
let taskList3 = document.getElementById("task-list3")
let textInput = document.getElementById("text-input")
let container = document.getElementById("container")
let clearAll = document.getElementById("clear-all")


let allTask = JSON.parse(localStorage.getItem("task")) || []
displayTask()


let editingId = null
let selected = null

clearAll.addEventListener("click", ()=>{

    if(allTask.length ===0){
        window.alert("List is empty")
    }else{
        const ans = window.confirm("do you really want to delete all")
    
        if(ans){
            allTask.length =0
            taskList1.innerHTML=""
            taskList2.innerHTML=""
            taskList3.innerHTML=""
            localStorage.clear()
        }
    }
})


addTask.addEventListener("click", (e)=>{
    e.preventDefault()
    if(editingId === null){
        const task = textInput.value.trim()
        if(task !==""){
            let taskItem = {
                id: Date.now(),
                text: task,
                column: "task-list1"   // store which column it belongs to
            }
            allTask.push(taskItem)
            addLocal()
        }
        taskList1.innerHTML=""
        displayTask()
    }else{
        let editingText = textInput.value.trim()
        editingTask(editingText,editingId)        
    }
})

function displayTask() {

    // Clear all lists first
    taskList1.innerHTML = ""
    taskList2.innerHTML = ""
    taskList3.innerHTML = ""

    allTask.forEach((task) => {

        const listItem = document.createElement("li")
        listItem.setAttribute("draggable", "true")
        listItem.dataset.id = task.id

        listItem.innerHTML = `
            <span>${task.text}</span>
            <button data-action="edit" data-id="${task.id}">Edit</button>
            <button data-action="delete" data-id="${task.id}">Delete</button>
        `

        // Append to correct column
        document.getElementById(task.column).appendChild(listItem)

        listItem.addEventListener("dragstart", () => {
            selected = listItem
        })
    })

    textInput.value = ""
}

        
const taskLists = [taskList1, taskList2, taskList3]

taskLists.forEach(list => {

    // Edit & Delete
    list.addEventListener("click", (e) => {

        const action = e.target.dataset.action
        const taskId = parseInt(e.target.dataset.id)

        if (!action) return

        if (action === "delete") {
            allTask = allTask.filter(task => task.id !== taskId)
            localStorage.clear()
            addLocal()
            displayTask()
        }

        if (action === "edit") {
            editingId = taskId
            const task = allTask.find(task => task.id === taskId)
            if (task) textInput.value = task.text
            
        }
    })

    // Drag over
    list.addEventListener("dragover", (e) => {
        e.preventDefault()
    })

    // Drop
    list.addEventListener("drop", (e) => {
        e.preventDefault()

        if (selected) {
            const taskId = parseInt(selected.dataset.id)

            // Update column in array
            allTask.forEach(task => {
                if (task.id === taskId) {
                    task.column = list.id
                }
            })

            selected = null
            addLocal()        
            displayTask()
        }
    })
})


function editingTask(editingText,editId){
    allTask.forEach(task =>{
    if(task.id === editId){
        task.text = editingText
    }
    })
    editingId=null
    taskList1.innerHTML = ""
    localStorage.clear()
    addLocal()
    displayTask()
}

function addLocal(){
    localStorage.setItem("task", JSON.stringify(allTask))
}
