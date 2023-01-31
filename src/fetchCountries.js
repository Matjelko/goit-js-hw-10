"use strict"

import Notiflix from "notiflix";

export function fetchCountries(name){
    fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`)
        .then((response) => response.json())
        .then((response) => {console.log(response);

            if (response.status === 404){
                Notiflix.Notify.failure('Oops, there is no country with that name');
                return;
            }

            if(response.length > 10){
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
                return;
            }

            else if(response.length > 1){
                const listCountry = document.querySelector('.country-list');
                listCountry.classList.remove('is-hidden');

                response.forEach((el) => {
                    const li = document.createElement('li');
                    li.textContent = el.name;

                    const flag = document.createElement('img');
                    flag.src = el.flags.svg;

                    li.insertAdjacentElement('afterbegin', flag);
                    listCountry.insertAdjacentElement('beforeend', li);
                });
            }

            else if (response.length === 1){
                const listCountry = document.querySelector('.country-list');
                const infoCountry = document.querySelector('.country-info');
                listCountry.classList.add('is-hidden');

                const languages = [];

                response[0].languages.forEach((el) => {
                    if(el.iso639_1){
                        languages.push(el.name);
                    }
                });

                const h3 = document.createElement('h3');
                h3.textContent = response[0].name;

                const flag = document.createElement('img');
                flag.src = response[0].flags.svg;

                const data = `
                <p><b>Capital:</b> ${response[0].capital}</p>
                <p><b>Population:</b> ${response[0].population}</p>
                <p><b>Languages:</b> ${languages.join(', ')}</p>
                `;

                h3.insertAdjacentElement('afterbegin', flag);
                infoCountry.insertAdjacentElement('beforeend', h3);
                infoCountry.insertAdjacentHTML('beforeend', data);
            }

            return response;
        });
}