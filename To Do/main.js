
let input = document.getElementById("input");
let list = document.getElementById("list");
let AddBtn = document.getElementById("addBtn");
let error = document.getElementById("error");
let time = (new Date()).toString().split(' ').splice(1, 3).join(' ');
let mood = 'create';
let tmp;

// This is the array that will hold the todo list items
let ListItems;

if (localStorage.task != null) {
    ListItems = JSON.parse(localStorage.task)

} else {
    ListItems = [];
}


document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    let newTask = {
        text: input.value,
        checked: "unchecked",
        id: Date.now(),
    }

    if (mood === 'create') {
        if (input.value == "") {
            error.innerHTML = 'No task added!';

        } else {
            ListItems.push(newTask);
            localStorage.setItem('task', JSON.stringify(ListItems))
            console.log(ListItems)
        }
    } else {
        ListItems[tmp] = newTask;
        localStorage.setItem('task', JSON.stringify(ListItems))
        input.value = " ";
        mood = 'create'
        AddBtn.innerHTML = "Add";
    }
    showData();

});
showData();


$('body').on('click', '.checkbox', function (e) {
    let taskId = (e.target.id);
    ListItems.forEach((element, index) => {

        if (element.id == taskId) {
            if ($(`#${taskId}`).is(':checked')) {
                ListItems[index].checked = "checked";
            } else {
                ListItems[index].checked = "unchecked";
            }
        }
    })
    localStorage.setItem('task', JSON.stringify(ListItems))
});


function showData() {

    let list = '';
    for (let i = 0; i < ListItems.length; i++) {

        list += `
         <div class="row d-flex  h-100 list-group-item  justify-content-between  border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
            <div class="col col-l-2 ">
                <input id="${ListItems[i].id}" ${ListItems[i].checked} class=" checkbox form-check-input me-2" type="checkbox" value="" aria-label="..." />
    
                <div >${ListItems[i].text}</div>
            </div>
          <div class="col col-l-2">${time}</div>

          <div class="col col-l-1">
	        <button onclick="updateTask(${i})" class="button" id="update"> <img src="https://i.postimg.cc/bYQL0s4V/edit.png" width="26px" hieght="26px"  ></button>
          </div>
          <div class="col col-l-1">
            <button onclick="deleteTask(${i})" class="button" id="del"> <img src="https://cdn-icons-png.flaticon.com/16/1345/1345823.png"  align-items="end"> </button>
          </div>


         </div>
    `;

    }
    //#Delete All button
    if (ListItems.length > 0) {
        document.getElementById('deleteAll').innerHTML = `
            <button onclick="deleteAll()" class="btn btn-primary btn-lg ms-2"> Delete All </button>
            `;

    } else {
        document.getElementById('deleteAll').innerHTML = '';
    }

    document.getElementById('list').innerHTML = list;
    document.getElementById('input').value = "";
    console.log(localStorage);
}

//#Delete tasks
function deleteTask(i) {
    ListItems.splice(i, 1);
    localStorage.task = JSON.stringify(ListItems);
    showData();
}

//#Delete All tasks
function deleteAll() {
    ListItems.splice(0);
    localStorage.clear();
    showData();
}

//Edit task
function updateTask(i) { 
    AddBtn.innerHTML = "Edit";
    input.value = ListItems[i].text;
    mood = 'update';
    tmp = i;
}
