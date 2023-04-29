window.onload = function(){
    
// Color changing logo
let logo = document.getElementById("logo");
logo.addEventListener("click",
     function(){
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
    },   
    false);

    // Delete about-us using Q
    let about = document.getElementById("about-us");
    console.log(about);

    document.addEventListener("keypress", function(event){
        console.log(event.code);
        if(event.code === "KeyD")
            about.remove();
    })
}