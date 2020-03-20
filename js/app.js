////////////////////
//GET HTML ELEMENTS
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

///////////////////
//LOAD ALL EVENTS
loadEventListeners()

//LOAD ALL EVENTS
function loadEventListeners() {
    //ADD TASK EVENT
    form.addEventListener('submit', addTask)

    //CLEAR ALL TASKS
    clearBtn.addEventListener('click', removeAllTasks)
    filter.addEventListener('keyup', filterTasks)
}

////////////////////
//ADD TASK FUNCTION
function addTask(e) {
    e.preventDefault();

    //CHECK TASK IS EMPTY
    if (taskInput.value.trim() === '') {
        return alert('Add a value to the task')

    } else {
        //CHECK DOUBLE
        taskDouble()
        
        //CREATE LI
        const li = document.createElement('li')
        //ADD CLAS
        li.classList.add('collection-item')
        //ADD VALUE TO LI
        li.innerText = taskInput.value

        //CREATE LINK
        const link = document.createElement('a')
        link.className = ('delete-item secondary-content')
        link.innerHTML = '<i class="fa fa-remove"></i>'

        //ADD REMOVE FUNCTION
        removeTask(link, li)

        //APPEND LI, LINK TO TASK LIST
        li.appendChild(link)
        taskList.append(li)
        //CLEAR THE INPUT
        taskInput.value = ''
    }
}

//////////////////////////
//REMOVE ELEMENT FUNCTION
function removeTask(taskLink, removeLi) {
    taskLink.addEventListener('click', function (e) {
        if(confirm('Are you sure?')){
            removeLi.remove()
        }
        
    })
}

//////////////////////
//CHECK IS TASK DOUBLE
function taskDouble () {
    for (let element of taskList.children) {
        if (element.innerText.trim() === taskInput.value.trim()) {
            taskInput.value = ''
           return alert('This task is already added')
        }

    }
}

///////////////////
//REMOVE ALL TASKS
function removeAllTasks () {
    taskList.innerHTML = ''
    taskInput.focus()
}

//////////////////
//FILTER FUNCTION

function filterTasks (e){
    //LOOP FOR ALL LI
    for (let element of taskList.children) {
        //CHECK IF FILTER IS NOT -1
       if(element.innerText.toLowerCase().indexOf(e.target.value.toLowerCase())  != -1){
        element.classList.remove('d-none')
       } else {
        element.classList.add('d-none') 
       }
    }
}