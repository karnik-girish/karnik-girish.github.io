const sessionUser =  JSON.parse(sessionStorage.getItem("loggedInUser"));
//var getLst1 =document.getElementById("todoDisplay");

//const todoItemsList = document.querySelector("#todoDisplay");
let toDoLst=[]
let editToDoId ;

function userDetails(){
    try {
      
        if(sessionUser != null){
            getFromLocalStorage()
            document.getElementById("userInfo").innerText = sessionUser.firstName + " " + sessionUser.lastName ;
            //showDteCtrl.hidden= true;     
  
        }else{ 
            alert("Session expired ,Please login to load data");
             window.location.href = "SignIn.html";}
    } catch (error) {
        alert(error);
    } 
}

function userLogout(){
    sessionStorage.clear();
    localStorage.removeItem("currentUser")
}

window.onunload = function clearLocalStorage(){
    localStorage.removeItem("currentUser")
}



function validateDate(e){
     var selectedDte = document.getElementById("reminderDte").value  
    var today= new Date().toISOString().slice(0,10)
   if(selectedDte <today)
   {
       alert("You can't select passed date");
       document.getElementById("reminderDte").value=""
       document.getElementById("reminderDte").focus
   }
}

function getFromLocalStorage() {     
    const userToDoLst = localStorage.getItem('userToDoLst');   
    if (userToDoLst) {    
        toDoLst = JSON.parse(userToDoLst);
        var toDoLst1 = toDoLst.filter((e) => e.user == sessionUser.email);
      renderTodo(toDoLst1);
    }
  }
 
function showDateSelection(){    
    var showDteOptn = document.getElementById("isReminder").value;
    var showDteCtrl = document.getElementById("dateCtrl")
    if(showDteOptn=="Yes"){        
        showDteCtrl.hidden= false;
    }else
    {
        showDteCtrl.hidden= true;
    }
   
}

function renderTodo(toDoLst){ 
    try {
        const getLst = document.getElementById("todoDisplay");
        getLst.innerHTML="";
        toDoLst.forEach(function(item) {
           const chkBoxCheck = item.isDone  
           console.log(item)
            const li = document.createElement('li');
            if(item.isDone){
                li.innerHTML = ` 
                <input type="checkbox" onclick="updateState(${item.todoId})" checked ${item.isDone}>               
                  ${item.todoTask}              
                  <button id="deleteToDo"  onclick="deleteToDo(${item.todoId})">Delete</button>         
                `;
            }else{
                li.innerHTML = ` 
                <input type="checkbox" onclick="updateState(${item.todoId})" ${item.isDone}>               
                  ${item.todoTask}
                  <button id="editToDo" onclick="editTodo(${item.todoId})">Edit</button>
                  <button id="deleteToDo"  onclick="deleteToDo(${item.todoId})">Delete</button>         
                `;
            }
            getLst.append(li);
          });
    } catch (error) {
        alert(error)
    }     
}

function filterToDo(id){   
    if(toDoLst.length>0)
    {
        if (id=="Personal") {
            var filterPersonal = toDoLst.filter(e=> e.category == "Personal")
            renderTodo(filterPersonal)           
          } else if (id=="Social") {
            var filterSocial = toDoLst.filter(e=> e.category == "Social")
            renderTodo(filterSocial)
          } else if (id=="Office") {
            var filterOffice = toDoLst.filter(e=> e.category == "Office")
            renderTodo(filterOffice)
          }else{
            var filterAll = toDoLst
            renderTodo(filterAll)
          }
    }

}


function addToDo(){
    try {  
        
        const todoIp = document.getElementById("todoStr").value
        const categoryIp = document.getElementById("category").value
        const isReminderIp = document.getElementById("isReminder").value
        const reminderDteIp =  document.getElementById("reminderDte").value
        const isPublicIp = document.getElementById("isPublic").value
        const attachmentIp=  document.getElementById("profileImage").value     

        if( document.getElementById("addtodo").value == "Update"){    
           const index = toDoLst.findIndex((e) => e.todoId==editToDoId && e.user == sessionUser.email);
            let userTodo = {
                user  : sessionUser.email,
                todoId:editToDoId,       
                todoTask : todoIp,
                category : categoryIp,
                isReminder :isReminderIp,
                reminderDte :reminderDteIp,
                isPublic :isPublicIp,
                isDone:false,
                attachment :attachmentIp
            }
            toDoLst[index] = userTodo;
            document.getElementById("addtodo").value = "Add"
            localStorage.setItem("userToDoLst",JSON.stringify(toDoLst));
            renderTodo(toDoLst);
            editToDoId="";
        }
        else{ 
            let userTodo = {
                user  : sessionUser.email,
                todoId: Date.now(),       
                todoTask : todoIp,
                category : categoryIp,
                isReminder :isReminderIp,
                reminderDte :reminderDteIp,
                isPublic :isPublicIp,
                isDone:false,
                attachment :attachmentIp
            }            
            toDoLst.push(userTodo);
            localStorage.setItem("userToDoLst",JSON.stringify(toDoLst));
            renderTodo(toDoLst);            
        }       
    } catch (error) {
        alert(error);
    }    
}


// document.getElementById("todoDisplay").addEventListener('click',function(event){
//     if (event.target.type === 'checkbox') {
//         // toggle the state
//        alert("checkbox selected");
//       }  
//       // check if that is a delete-button
//       if (event.targe.type==='button') {
//        alert("delete is selected")
//       }
// });

function updateState(todoItemId){ 
    try {
        const index = toDoLst.findIndex((e) => e.todoId==todoItemId && e.user == sessionUser.email );
        const item = toDoLst.find(e=> e.todoId==todoItemId && e.user == sessionUser.email)
        if(item.isDone)
        {   
            renderTodo(toDoLst);  
            throw {toString: function() { return "once marked as done then only delete allowed"; } }; 
        }else{
            let updatedItem;        
            if(window.confirm("update status ?")){         
                updatedItem = {
                    todoId: item.todoId,       
                    todoTask : item.todoTask,
                    category : item.category,
                    isReminder :item.isReminder,
                    reminderDte :item.reminderDte,
                    isPublic : item.isPublic,
                    isDone:true,
                    attachment :item.attachment
                }       
            }else{
                updatedItem = {
                    todoId: item.todoId,       
                    todoTask : item.todoTask,
                    category : item.category,
                    isReminder :item.isReminder,
                    reminderDte :item.reminderDte,
                    isPublic : item.isPublic,
                    isDone:item.isDone,
                    attachment :item.attachment
                }      
            }
            toDoLst[index] = updatedItem;
            localStorage.setItem("userToDoLst",JSON.stringify(toDoLst));
            renderTodo(toDoLst);
        }
    } catch (error) {
        alert(error)
    }
}

function editTodo (todoItemId){
    editToDoId = todoItemId
    document.getElementById("addtodo").value = "Update"
    var todoItem = toDoLst.find(e=>e.todoId==todoItemId)
    document.getElementById("todoStr").value = todoItem.todoTask;
    document.getElementById("category").value= todoItem.category
    document.getElementById("isReminder").value=todoItem.isReminder
    document.getElementById("reminderDte").value=todoItem.reminderDte
    document.getElementById("isPublic").value=todoItem.isPublic
    document.getElementById("profileImage").value=todoItem.attachment
    document.getElementById("todoStr").focus
}

function deleteToDo (todoItemId){
    var todoItems = toDoLst.filter(e=>e.todoId !==todoItemId && e.user == sessionUser.email)
    localStorage.setItem("userToDoLst",JSON.stringify(todoItems));
    renderTodo(todoItems);
}
