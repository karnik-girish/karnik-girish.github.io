var user =  JSON.parse(sessionStorage.getItem("loggedInUser"));

window.onload = function loadUserData() {                  
        if(user != null)
        {  
            document.getElementById("userInfo").innerText =   user.firstName + " " + user.lastName;              
            document.getElementById("fname").value =   user.firstName; 
            document.getElementById("lname").value =   user.lastName;
            document.getElementById("address").value =   user.address;
            //document.getElementById("gender").selectedValue = user.gender;   
            if(user.gender==="male"){               
                document.getElementById("male").checked = true
             }
             else{
                document.getElementById("female").checked = true
             }     
            document.getElementById("profileImage").src = user.image;
        }
        else{
             alert("Session expired ,Please login to load data");
             window.location.href = "SignIn.html";
        }
}


function userLogout(){
    sessionStorage.clear();
    localStorage.removeItem("currentUser")
}

window.onunload = function clearLocalStorage(){
    localStorage.removeItem("currentUser")
}

loadImage = function() {
    var input = document.getElementById("profileImage");
    var imagereader = new FileReader();
    imagereader.readAsDataURL(input.files[0]);
    imagereader.onloadend = function(event) {
        var profileImage = document.getElementById("profileImage");
        var output = document.getElementById("output");
        output.src = URL.createObjectURL(input.files[0]);
        profileImage.src = event.target.result;       
    }    
}

function updateUser(){   
    try {        
        if(user !=null) 
        {     
            let users =  JSON.parse(localStorage.getItem("RegisteredUsers"));
            var  userIndex =  users.findIndex(a => a.email == (JSON.parse(sessionStorage.getItem("loggedInUser")).email));  
                for (keys in users[userIndex]) {
                    if(keys == "firstName") {
                        var updatedName = document.getElementById("fname").value
                         users[userIndex].firstName =  document.getElementById("fname").value ;
                         continue;
                    }
                    if(keys == "lastName" ) {
                          users[userIndex].lastName =  document.getElementById("lname").value; 
                          continue;
                    }
                    if (keys == "gender") {
                        var gender;
                        if(document.getElementById("male").checked){
                            gender = "male";
                        }else{
                            gender="female";}  


                        users[userIndex].gender =  gender;  
                        continue;
                    }
                    if(keys == "address") {
                        users[userIndex].address =  document.getElementById("address").value; 
                        continue; 
                    }
                    if(keys == "image") {

                        users[userIndex].image =  document.getElementById("output").src; 
                        continue; 
                    }
                }              
                localStorage.setItem("RegisteredUsers", JSON.stringify(users));
                sessionStorage.setItem("loggedInUser", JSON.stringify(users[userIndex]));
                result =  true;
        } else 
        {
              alert("Profile Update failed");
             
        }
        

      } catch (error) {
         result = false;
         console.log(error);
     }


}