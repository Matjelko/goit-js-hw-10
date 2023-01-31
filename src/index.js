"use strict"

import './css/styles.css';
import _ from 'lodash';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const listCountry = document.querySelector('.country-list');
const infoCountry = document.querySelector('.country-info');

function handleInput(){
    let name = input.value.trim();

    listCountry.innerHTML = '';
    infoCountry.innerHTML = '';

    if (name === '') {
        listCountry.classList.add('is-hidden');
        return;
    }

    fetchCountries(name);
}

input.addEventListener('input', _.debounce(handleInput, DEBOUNCE_DELAY));