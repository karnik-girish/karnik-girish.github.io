var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/++[++^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}


function onRegisterUser(){   
    try {        
            const fname = document.getElementById("fname").value;        
            const lname = document.getElementById("lname").value;
            const email =  document.getElementById("email").value.toLowerCase();
            const password = Base64.encode (document.getElementById("password").value);
            var gender;
                if(document.getElementById("male").checked){
                    gender = "male";
                }else{
                    gender="female";}                      
            const address = document.getElementById("address").value;
            const image =  document.getElementById("profileImage").src;

            let user ={
                        firstName : fname,
                        lastName : lname,
                        email:email,
                        pwd:password,
                        gender: gender,
                        address: address,
                        image:image
                    }
                    
            if (!ValidateEmailFormat(user.email)){
                throw {toString: function() { return "You have entered an invalid email address!"; } }; 
            }
            if (user.firstName == "" || user.lastName =="" || user.email ==""|| user.pwd =="" || user.gender =="" || user.address =="" || user.image ==""){        
                throw {toString: function() { return "Please fill the information"; } }; 
            }else{
                    var userLst = JSON.parse(localStorage.getItem("RegisteredUsers")) || [];
                    //if(userLst.length>0){   
                        if(validateEmail(user.email,userLst)!=true){
                            userLst.push(user);
                            localStorage.setItem("RegisteredUsers",JSON.stringify(userLst));
                            alert("User registration successful"); 
                            clearFields()
                        }else{
                            throw ("User already exist");}
                    //}else{
                        //userLst.push(user);
                       // localStorage.setItem("RegisteredUsers",JSON.stringify(userLst));
                       // alert("User registration successful");}
                }   

    } catch (error) {
        alert(error)
    }
        

}
function clearFields(){
    document.getElementById("fname").value = ""        
    document.getElementById("lname").value = ""   
    document.getElementById("email").value = ""   
    document.getElementById("password").value = "" 
    document.getElementById("male").checked = false
    document.getElementById("female").checked = false          
    document.getElementById("address").value = ""   
    document.getElementById("profileImage").src = ""  

}
function validateEmail(emailId,usersData) 
{
    let result =  true;
    if(emailId != undefined) 
    {
        var user =  usersData.find( userObj => userObj.email == emailId.toLowerCase());
        if(user == undefined) {
            result = false;; 
        }      
    }    
    return result ; 
}

function ValidateEmailFormat(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }    
    return (false)
}


function nameValidation(id){
    var regex = /[a-zA-Z]$/;
    var ctrl =  document.getElementById(id).value

    if (regex.test(ctrl.value)) {
        return true;
    }
    else {
        return false;
    }
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
