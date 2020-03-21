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

    //SORT BTNS
    sortBtn(btnAll.children[1], btnAll.children[2], btnAll.children[3])

    //LOAD LOCAL STORAGE
    document.addEventListener('DOMContentLoad', loadTasks())
}

////////////////////
//ADD TASK FUNCTION
function addTask(e) {
    e.preventDefault();

    //CHECK DOUBLE TASK
    for (let element of taskList.children) {
        if (element.innerText.trim() === taskInput.value.trim()) {
            //taskInput.value = ''
            return alert('This task is already added')
        }
    }

    //CHECK TASK IS EMPTY
    if (taskInput.value.trim() === '') {
        taskInput.focus()
        return alert('Add a value to the task')

    } else {


        //CREATE LI
        const li = document.createElement('li')
        //ADD CLAS
        li.classList.add('collection-item')

        //CREATE CHECKBOX
        const label = document.createElement('label')
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
        removeTask(link, li, taskInput.value)

        //ADD CHECKED FUNCTION
        checkboxCheck(li, checkbox)

        //APPEND LI, LINK TO TASK LIST
        li.appendChild(link)


        label.appendChild(checkbox)
        label.appendChild(span)
        li.appendChild(label)
        taskList.append(li)

        //LOKAL STORAGE
        storeTaskLocal(taskInput.value)


        //CLEAR THE INPUT
        taskInput.value = ''
    }
}

//////////////////////////
//REMOVE ELEMENT FUNCTION
function removeTask(taskLink, removeLi, value) {
    taskLink.addEventListener('click', function (e) {
        removeLi.remove()
        delteFromStorgae(value)
        


    })
}

///////////////////////
//DELETE LOCAL STORAGE
function delteFromStorgae(value){
    
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = []

    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    //LOOP THROW THE ARRAY AND DELTE THE TASK
    tasks.forEach(function (task, index) {
        if (value === task) {
            tasks.splice(index, 1)
        }
    })

    //SET OBJECT TASK TO LOCAL STRING
    localStorage.setItem('tasks', JSON.stringify(tasks))
}


//////////////////
//FILTER FUNCTION
function filterTasks(e) {
    //LOOP FOR ALL LI
    for (let element of taskList.children) {
        //CHECK IF FILTER IS NOT -1
        if (element.innerText.toLowerCase().indexOf(e.target.value.toLowerCase()) != -1) {
            element.classList.remove('d-none')
        } else {
            element.classList.add('d-none')
        }
    }
}

///////////////////
//CHECKBOX CHECKED
function checkboxCheck(li, checkbox) {
    checkbox.addEventListener('click', function (e) {
        if (checkbox.checked == true) {
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

///////////////////
//REMOVE ALL TASKS
function removeAllTasks() {
    if (confirm('Sure delete all?')) {
        taskList.innerHTML = ''
        taskInput.focus()
        localStorage.clear()
    }

}

////////////////
//SORT BUTTONS
function sortBtn(all, active, complete) {

    //ALL BTN
    all.addEventListener('click', function (e) {
        for (let listItem of taskList.children) {
            listItem.classList.remove('d-none')
        }
    })

    //ACTIVE BTN
    active.addEventListener('click', function (e) {
        for (let listItem of taskList.children) {
            if (listItem.children[1].children[0].checked == true) {
                listItem.classList.add('d-none')
            } else {
                listItem.classList.remove('d-none')
            }
        }
    })

    //COMPLETE BTN
    complete.addEventListener('click', function (e) {
        for (let listItem of taskList.children) {
            if (listItem.children[1].children[0].checked == false) {
                listItem.classList.add('d-none')
            } else {
                listItem.classList.remove('d-none')
            }
        }
    })

}

/////////////////////////
//LOCAL STORAGE FUNCTION
function storeTaskLocal(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = []

    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))

}

////////////////////////////////
//LOAD TASKS FROM LOCAL STORAGE
function loadTasks() {

    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {

        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function (task) {

        //CREATE LI
        const li = document.createElement('li')
        //ADD CLAS
        li.classList.add('collection-item')

        //CREATE CHECKBOX
        const label = document.createElement('label')
        label.classList.add('secondary-content')
        const checkbox = document.createElement('input')
        const span = document.createElement('span')
        checkbox.className = ('checkbox filled-in')
        checkbox.setAttribute('type', 'checkbox')

        //ADD VALUE TO LI 
        li.innerHTML = task

        //CREATE LINK
        const link = document.createElement('a')
        link.className = ('delete-item secondary-content')
        link.innerHTML = '<i class="fa fa-remove"></i>'

        //ADD REMOVE FUNCTION
        removeTask(link, li, task)
        //ADD CHECKED FUNCTION
        checkboxCheck(li, checkbox)

        //APPEND LI, LINK TO TASK LIST

        li.appendChild(link)


        label.appendChild(checkbox)
        label.appendChild(span)
        li.appendChild(label)
        taskList.append(li)
    })
}