import './style.css';
// TODO: required imports
import { Countries } from './models/Countries.enum';
import { Country } from './models/Country';
import { IResult } from './models/IResult';
import { Medals } from './models/Medals.enum';
import { Sports } from './models/Sports.enum';

const countrySelect: HTMLSelectElement = <HTMLSelectElement>(
  document.getElementById('country-slt')
);
const medalSelect: HTMLSelectElement = <HTMLSelectElement>(
  document.getElementById('medal-slt')
);
const sportSelect: HTMLSelectElement = <HTMLSelectElement>(
  document.getElementById('sport-slt')
);

const addButton: HTMLElement = document.getElementById('add-btn');
//TODO: add an eventlistener to the button to trigger addMedal
addButton.addEventListener('click', addMedal);

let countries: Array<Country> = [];

init();

// This function sets up some display elements
function init() {
  let count1 = 0;
  for (let c in Countries) {
    if (isNaN(Number(c))) {
      let newOption: HTMLOptionElement = document.createElement('option');
      newOption.innerHTML = c;
      newOption.value = count1.toString();
      count1++;
      countrySelect.add(newOption);
    }
  }

  //TODO: populate the Sport select
  let count2 = 0;
  for (let s in Sports) {
    if (isNaN(Number(s))) {
      let newOption: HTMLOptionElement = document.createElement('option');
      newOption.innerHTML = s;
      newOption.value = count2.toString();
      count2++;
      sportSelect.add(newOption);
    }
  }

  //TODO: populate the Medal select
  let medal = 0;
  for (let m in Medals) {
    if (isNaN(Number(m))) {
      let newOption: HTMLOptionElement = document.createElement('option');
      newOption.innerHTML = m;
      newOption.value = medal.toString();
      medal++;
      medalSelect.add(newOption);
    }
  }
}

// This function adds a medal to the countries tally
function addMedal() {
  //TODO: complete this function
  const countryVal: number = Number(countrySelect.value);
  const countryStr: string = Countries[countryVal];

  // Sports
  const sportVal: number = Number(sportSelect.value);
  const sportStr: string = Sports[sportVal];

  // Medals
  const medalVal: number = Number(medalSelect.value);
  const medalStr: string = Medals[medalVal];

  const newResult: IResult = {
    medal: Medals[medalStr],
    sport: Sports[sportStr]
  };

  /*
  - if array doesnt have country, create new country
  - else dont create new country, just modify the current country
  */

  let isCountryExist: boolean = false; 
  let existingCountryIndex: number;

  for (let i = 0; i < countries.length; i++) {
    if(countries[i].name === countryStr) {
      isCountryExist = true;
      existingCountryIndex = i; 
      break;
    } 
  }

  if(isCountryExist) {
    // if country exists, do stuff in here. 
    // grab the curren country. 
    countries[existingCountryIndex].results.push(newResult)

  } else {
    const newCountry: Country = new Country(countryStr);
    newCountry.results.push(newResult);
    countries.push(newCountry);
  }

  displayTable();
}

// This function refreshes the medal tally table
function displayTable() {
  const resultsBody: HTMLTableSectionElement = <HTMLTableSectionElement>(
    document.getElementById('results-body')
  );

  let newBody: HTMLTableSectionElement = <HTMLTableSectionElement>(
    document.createElement('tbody')
  );
  newBody.id = 'results-body';

  // TODO: create the rows required for the new table body element
  for (let i = 0; i < countries.length; i++) {
    const countryElem = countries[i];

    const row = document.createElement('tr');

    const countryCol = document.createElement('td');
    countryCol.innerHTML = countryElem.name;

    const goldCol = document.createElement('td');
    goldCol.innerHTML = countryElem.totalMedalType(Medals.Gold).toString(); 

    const silverCol = document.createElement('td'); 
    silverCol.innerHTML = countryElem.totalMedalType(Medals.Silver).toString(); 

    const bronzeCol = document.createElement('td'); 
    bronzeCol.innerHTML = countryElem.totalMedalType(Medals.Bronze).toString();

    const totalCol = document.createElement('td');
    totalCol.innerHTML = countryElem.totalMedals().toString(); 

    // add country to row
    row.append(countryCol);
    row.append(goldCol);
    row.append(silverCol);
    row.append(bronzeCol);
    row.append(totalCol);
    // add row to body
    newBody.append(row);
  }


  // replaces the old tbody with the new one created above
  resultsBody.parentNode.replaceChild(newBody, resultsBody);
}
