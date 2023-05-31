let randomBeer;
window.onload = function(){

    for (var i = 0; i < localStorage.length; i++){
        console.log(localStorage.key(i), localStorage.getItem(localStorage.key(i)));
    }
    // localStorage.clear();

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
    if(about){
        document.addEventListener("keypress", function(event){
        console.log(event.code);
        if(event.code === "KeyD")
            about.remove();
    })
    }
    

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

    let contact = document.getElementById("contact");
    if(contact){

        if(!localStorage.getItem('rezervareCnt')){
            localStorage.setItem('rezervareCnt', 0);
        }

        let submitButton = document.getElementById('submit');
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            const nume = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const date = document.getElementById('date').value;
            const nrpers = document.getElementById('nrpers').value;
            addReservation(nume, email, date, nrpers);

            const form = document.getElementById('form');
            form.reset();

        });

        // LOAD REZERVATIONS
        let cnt = parseInt(localStorage.getItem('rezervareCnt'));
        for(let i=0; i<cnt; i++){
            const rezervare = localStorage.getItem('rezervare' + i);
            console.log(rezervare);
        }

        function addReservation(name, email, dateStr, noSeats){
            // Div-ul fiecarei rezervari
            const newReservation = document.createElement('div');
            newReservation.classList.add("reservation");
            contact.appendChild(newReservation);

            const nameReservation = document.createElement('h2');
            nameReservation.innerText = "Nume: " + name; // TODO: schmimba cu localStorage            
            newReservation.appendChild(nameReservation);

            const emailReservation = document.createElement('h2');
            emailReservation.innerText = "Email: " + email; // TODO: schmimba cu localStorage
            newReservation.appendChild(emailReservation);

            const dateReservation = document.createElement('h2');
            dateReservation.innerText = "Date: " + dateStr; // TODO: schmimba cu localStorage
            newReservation.appendChild(dateReservation);

            const seatsReservation = document.createElement('h2');
            seatsReservation.innerText = "No. Seats: " + noSeats; // TODO: schmimba cu localStorage
            newReservation.appendChild(seatsReservation);

            const deleteReservation = document.createElement('button');
            deleteReservation.addEventListener('click', () => {
                // TODO: hide info and show countdown + cancel button
                const cntdown = setInterval(() => {
                }, 1000);
                
                const elemente = newReservation.children;
                while(elemente[0]){
                    // console.log("removed: ", elemente[0]);
                    newReservation.removeChild(elemente[0]);
                }

                const infoDelete = document.createElement("h3");
                infoDelete.innerText = "Rezervarea va fi stearsa in 3 secunde!";
                newReservation.appendChild(infoDelete);

                setTimeout(() => {
                    clearInterval(cntdown);
                    contact.removeChild(newReservation);
                }, 3000);
            })
            deleteReservation.innerText="delete";
            newReservation.appendChild(deleteReservation);

            localStorage.setItem('rezervare' + parseInt(localStorage.getItem('rezervareCnt')) + 1, [name, email, dateStr, noSeats]);
            localStorage.setItem('rezervareCnt', parseInt(localStorage.getItem('rezervareCnt'))+1);

        }

        // validari de inputs cu regex - cica minim 3 conditii?
        // "Rezervari" cu taote rezervarile facute (localStorage + creere Block + Math, Date, String API)
        // Anulare rezervari (setTimeout + delete block)
    }
    

    // TODO:
    // setTimeout, setInterval
    // 3 tipuri de inputs
    // validari la inputs - minim 3 contidii de regex
    // stocarea si folosirea datelor din inputs
    // sessionStorage/localStorage
    // minim 4 interogari din API Math, Date, String, etc
    // consola clean - fara log-uri
}