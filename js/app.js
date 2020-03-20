////////////////////
//GET HTML ELEMENTS
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const btnAll = document.querySelector('.btn-container')
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
    btnAll.children[0].addEventListener('click', removeAllTasks)

    //FILTER FUNCTION
    filter.addEventListener('keyup', filterTasks)

    sortBtn(btnAll.children[1], btnAll.children[2], btnAll.children[3])
}

////////////////////
//ADD TASK FUNCTION
function addTask(e) {
    e.preventDefault();

    //CHECK TASK IS EMPTY
    if (taskInput.value.trim() === '') {
        taskInput.focus()
        return alert('Add a value to the task')

    } else {
        //CHECK DOUBLE
        taskDouble()
        
        //CREATE LI
        const li = document.createElement('li')
        //ADD CLAS
        li.classList.add('collection-item')

        //CREATE CHECKBOX
        const label =document.createElement('label')
        label.classList.add('secondary-content')
        const checkbox = document.createElement('input')
        const span = document.createElement('span')
        checkbox.className = ('checkbox filled-in')
        checkbox.setAttribute('type', 'checkbox')
        
        //ADD VALUE TO LI
        li.innerHTML = taskInput.value

        //CREATE LINK
        const link = document.createElement('a')
        link.className = ('delete-item secondary-content')
        link.innerHTML = '<i class="fa fa-remove"></i>'

        //ADD REMOVE FUNCTION
        removeTask(link, li)
        //ADD CHECKED FUNCTION
        checkboxCheck(li, checkbox)

        //APPEND LI, LINK TO TASK LIST
        
        li.appendChild(link)


        label.appendChild(checkbox)
        label.appendChild(span)
        li.appendChild(label)
        taskList.append(li)
        //CLEAR THE INPUT
        taskInput.value = ''
    }
}

//////////////////////////
//REMOVE ELEMENT FUNCTION
function removeTask(taskLink, removeLi) {
    taskLink.addEventListener('click', function (e) {
            removeLi.remove()
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
    if(confirm('Sure delete all?')){
        taskList.innerHTML = ''
    taskInput.focus()
    }
    
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

///////////////////
//CHECKBOX CHECKED
function checkboxCheck (li, checkbox) {
    checkbox.addEventListener('click', function(e){
        if(checkbox.checked == true){
        li.style.transition = '0.5s'
        li.style.backgroundColor = '#c3f9f4'
        li.style.textDecoration = 'line-through'
        li.style.color = '#9e9e9e'
        
        console.log(true)
    } else {
        li.style.backgroundColor = '#FFFF'
        li.style.textDecoration = 'none'
        li.style.color = '#000'
        li.style.transition = '0.5s'
        console.log(false)
    }
    })
    
}

////////////////
//SORT BUTTONS
function sortBtn (all, active, complete){

    //ALL BTN
    all.addEventListener('click' ,function(e) {
        for (let listItem of taskList.children){
            listItem.classList.remove('d-none')
        }
    })

    //ACTIVE BTN
    active.addEventListener('click' ,function(e){
        for (let listItem of taskList.children){
            if(listItem.children[1].children[0].checked == true) {
                listItem.classList.add('d-none')
            } else {
                listItem.classList.remove('d-none') 
            }
        }
    })

    //COMPLETE BTN
    complete.addEventListener('click' ,function(e){
        for (let listItem of taskList.children){
            if(listItem.children[1].children[0].checked == false) {
                listItem.classList.add('d-none')
            } else {
                listItem.classList.remove('d-none') 
            }
        }
    })

}