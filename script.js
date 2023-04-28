window.onload = function(){

    let logo = document.getElementById("logo");

    logo.onclick = function(){
        //
        if(logo.style.color === "firebrick")
            logo.style.color =  "darkorange";
        else if(logo.style.color === "darkorange")
            logo.style.color =  "yellow";
        else if(logo.style.color === "yellow")
            logo.style.color = "green";
        else if(logo.style.color === "green")
            logo.style.color = "blue";
        else if(logo.style.color === "blue")
            logo.style.color = "magenta";
        else
            logo.style.color = "firebrick";
    }


}

