let randomBeer;
window.onload = function () {
      const menu = document.getElementsByClassName('menu')[0];
      if (menu) {
            // RANDOM BEER API
            // TODO error handling
            fetch('https://api.punkapi.com/v2/beers/random')
                  .then((response) => {
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
                        rbName.innerText =
                              randomBeer.name + ' - ' + randomBeer.abv + '%';

                        const rbDesc = document.createElement('h3');
                        rbDesc.style.fontStyle = 'oblique';
                        rbDesc.innerText = '-' + randomBeer.tagline;
                        rbDesc.style.marginLeft = '25px';

                        menu.appendChild(rbTitle);
                        menu.appendChild(rbName);
                        menu.appendChild(rbDesc);
                        menu.appendChild(rbImg);
                  });
      }
      // localStorage.clear();
      let contact = document.getElementById('contact');
      if (contact) {
            // TODO Show date somewhere
            let date = new Date(Date.now());
            let year = date.getFullYear();
            let mon = date.getMonth();
            let day = date.getDate();
            console.log(date);
            console.log(day + '-' + mon + '-' + year);

            const form = document.getElementById('form');
            const submitButton = document.getElementById('submit');
            form.addEventListener('submit', (e) => {
                  e.preventDefault();
                  const nume = document.getElementById('name').value;
                  const email = document.getElementById('email').value;
                  const date = document.getElementById('date').value;
                  const nrpers = document.getElementById('nrpers').value;
                  addReservation(nume, email, date, nrpers);

                  form.reset();
            });

            loadReservations();
      }

      function addReservation(name, email, dateStr, noSeats) {
            addReservationDOM(name, email, dateStr, noSeats);
            addReservationToLocalStoarge(name, email, dateStr, noSeats);
      }

      function addReservationDOM(name, email, dateStr, noSeats) {
            const newReservation = document.createElement('div');
            newReservation.classList.add('reservation');
            contact.appendChild(newReservation);

            const nameReservation = document.createElement('h2');
            nameReservation.innerText = 'Nume: ' + name;
            newReservation.appendChild(nameReservation);

            const emailReservation = document.createElement('h2');
            emailReservation.innerText = 'Email: ' + email;
            newReservation.appendChild(emailReservation);

            const dateReservation = document.createElement('h2');
            dateReservation.innerText = 'Date: ' + dateStr;
            newReservation.appendChild(dateReservation);

            const seatsReservation = document.createElement('h2');
            seatsReservation.innerText = 'No. Seats: ' + noSeats;
            newReservation.appendChild(seatsReservation);

            const deleteReservation = document.createElement('button');
            deleteReservation.addEventListener('click', () => {
                  const cntdown = setInterval(() => {}, 1000);

                  const elemente = newReservation.children;
                  while (elemente[0]) {
                        newReservation.removeChild(elemente[0]);
                  }

                  const infoDelete = document.createElement('h3');
                  infoDelete.innerText =
                        'Rezervarea va fi stearsa in 3 secunde!';
                  newReservation.appendChild(infoDelete);

                  setTimeout(() => {
                        removeReservationFromLocalStorage(
                              name,
                              email,
                              dateStr,
                              noSeats
                        );
                        clearInterval(cntdown);
                        contact.removeChild(newReservation);
                        // TODO: remove from localStorage
                  }, 3000);
            });
            deleteReservation.innerText = 'delete';
            newReservation.appendChild(deleteReservation);
      }

      function addReservationToLocalStoarge(nume, email, dateStr, noSeats) {
            // ? mai trebuie check pt rezervariStr? e verificat/creat deja in loadReservations()
            let rezervariStr = localStorage.getItem('rezervari');
            let rezervariArray = '';
            if (!rezervariStr) {
                  localStorage.setItem('rezervari', '');
                  rezervariArray = [];
            } else {
                  rezervariArray = JSON.parse(rezervariStr);
            }
            console.log(rezervariStr, rezervariArray);

            const date = [nume, email, dateStr, noSeats];
            rezervariArray.push(date);
            localStorage.setItem('rezervari', JSON.stringify(rezervariArray));
      }

      function removeReservationFromLocalStorage(name, email, date, nrpers) {
            console.log(name, email, date, nrpers);
            let rezervariStr = localStorage.getItem('rezervari');
            let rezervariArray = JSON.parse(rezervariStr);
            console.log(rezervariArray);
            for (let i = 0; i < rezervariArray.length; i++) {
                  if (
                        rezervariArray[i][0].toUpperCase() ===
                              name.toUpperCase() &&
                        rezervariArray[i][1].toUpperCase() ===
                              email.toUpperCase() &&
                        rezervariArray[i][2] === date &&
                        parseInt(rezervariArray[i][3]) === Number(nrpers)
                  ) {
                        console.log('AM GASIT. STERGEM');
                        rezervariArray.splice(i, 1);
                  }
            }
            rezervariStr = JSON.stringify(rezervariArray);
            localStorage.setItem('rezervari', rezervariStr);
      }

      function loadReservations() {
            const rezervariStr = localStorage.getItem('rezervari');
            let rezervariArray = '';
            if (!rezervariStr) {
                  localStorage.setItem('rezervari', '');
                  rezervariArray = [];
            } else {
                  rezervariArray = JSON.parse(rezervariStr);
            }
            for (let i = 0; i < rezervariArray.length; i++) {
                  addReservationDOM(
                        rezervariArray[i][0], // nume
                        rezervariArray[i][1], // email
                        rezervariArray[i][2], // data
                        rezervariArray[i][3] // nrPers
                  );
            }
      }

      // TODO:
      // minim 4 interogari din API Math, Date, String, etc
      // - am folosit toUpperCase, (JSON.parse, JSON.stringify),
      //
      // consola clean - fara log-uri
};
