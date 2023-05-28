let randomBeer;
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

    const menu = document.getElementsByClassName('menu')[0];
    if(menu){
        // RANDOM BEER API
        fetch('https://api.punkapi.com/v2/beers/random')
        .then( (response) => {
            return response.json();
        })
        .then((jsonResponse) => {
            randomBeer = jsonResponse[0];
            // console.log("Bere generata: ", randomBeer);
             // BEER BOX
            const rbTitle = document.createElement('h2');
            rbTitle.style.fontSize = '150%';
            rbTitle.innerText = 'Feeling lucky? Try this!';
            const rbImg = document.createElement('img');
            rbImg.setAttribute('src', randomBeer.image_url);
            rbImg.setAttribute('height', '300px');
            rbImg.style.padding = '40px';
            const rbName = document.createElement('h3');
            rbName.innerText = randomBeer.name + ' - ' + randomBeer.abv + '%';

            const rbDesc = document.createElement('h3');
            rbDesc.style.fontStyle = 'oblique';
            rbDesc.innerText = '-' + randomBeer.tagline;
            rbDesc.style.marginLeft = '25px';

            menu.appendChild(rbTitle);
            menu.appendChild(rbName);
            menu.appendChild(rbDesc);
            menu.appendChild(rbImg);

        })
        
    }
}