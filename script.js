let randomBeer;
window.onload = function () {
      for (var i = 0; i < localStorage.length; i++) {
            console.log(
                  localStorage.key(i),
                  localStorage.getItem(localStorage.key(i))
            );
      }

      // ? Color changing logo - nu stiu daca mai e necesar
      let logo = document.getElementById('logo');
      logo.addEventListener(
            'click',
            function () {
                  if (logo.style.color === 'firebrick')
                        logo.style.color = 'darkorange';
                  else if (logo.style.color === 'darkorange')
                        logo.style.color = 'yellow';
                  else if (logo.style.color === 'yellow')
                        logo.style.color = 'green';
                  else if (logo.style.color === 'green')
                        logo.style.color = 'blue';
                  else if (logo.style.color === 'blue')
                        logo.style.color = 'magenta';
                  else logo.style.color = 'firebrick';
            },
            false
      );

      const menu = document.getElementsByClassName('menu')[0];
      if (menu) {
            // RANDOM BEER API
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
            if (!localStorage.getItem('rezervareCnt')) {
                  localStorage.setItem('rezervareCnt', 0);
            }

            const submitButton = document.getElementById('submit');
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

            loadReservations();
      }

      function addReservation(name, email, dateStr, noSeats) {
            addReservationDOM(name, email, dateStr, noSeats);
            addReservationToLocalStoarge(name, email, dateStr, noSeats);
      }

      // * DONE
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
                        clearInterval(cntdown);
                        contact.removeChild(newReservation);
                        removeReservationFromLocalStorage(newReservation);
                        // TODO: remove from localStorage
                  }, 3000);
            });
            deleteReservation.innerText = 'delete';
            newReservation.appendChild(deleteReservation);
      }

      // * DONE
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

      // TODO
      function removeReservationFromLocalStorage(newReservation) {
            console.log(newReservation);
      }

      // * DONE
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
      // validari la inputs - minim 3 contidii de regex
      // minim 4 interogari din API Math, Date, String, etc
      // consola clean - fara log-uri
      // validari de inputs cu regex - cica minim 3 conditii?
      // "Rezervari" cu taote rezervarile facute (localStorage + creere Block + Math, Date, String API)
      // Anulare rezervari (setTimeout + delete block)
};
