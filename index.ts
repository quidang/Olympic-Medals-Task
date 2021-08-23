import { Countries } from './models/Countries.enum';
import './style.css';
// TODO: required imports
import { Country } from './models/Country';
import { IResult } from './models/IResult';
import { Sports } from './models/Sports.enum';
import { Medals } from './models/Medals.enum';


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
addEventListener('click', addMedal);

let countries: Array<Countries> = [];

init();

// This function sets up some display elements
function init() {
  // const testPtag = document.getElementById('test'); 
  // testPtag.innerHTML = 'Something Else';

  let count = 0;
  for (let c in Countries) {
    if (isNaN(Number(c))) {
      let newOption: HTMLOptionElement = document.createElement('option');
      newOption.innerHTML = c;
      newOption.value = count.toString();
      count++;
      countrySelect.add(newOption);
    }
  }

  //TODO: populate the Sport select
  let count_sport = 0; 
  for (let s in Sports) {
    if (isNaN(Number(s))) {
      let newOption: HTMLOptionElement = document.createElement('option');
      newOption.innerHTML = s; 
      newOption.value = count_sport.toString(); 
      count_sport++
      sportSelect.add(newOption);
    }
  }
  //TODO: populate the Medal select
  let count_medal = 0; 
  for (let m in Medals) {        
    if (isNaN(Number(m))) {
      let newOption: HTMLOptionElement = document.createElement('option');
      newOption.innerHTML = m; 
      newOption.value = count_medal.toString();
      count_medal++
      medalSelect.add(newOption);
    }
  }
}


// This function adds a medal to the countries tally
function addMedal() {
  //TODO: complete this function
  const countryVal: number = Number(countrySelect.value);
  const countryStr: string = Countries[countryVal];
  const newCountry: Country = new Country(countryStr); 

  //Spoprts
  const sportVal: number = Number(sportSelect.value); 
  const sportStr: string = Sports[sportVal];
  //Medals
  const medalVal: number = Number(medalSelect.value); 
  const medalStr: string = Medals[medalVal];


  const newResult: IResult = {
  medal: Medals[medalStr],
  sport: Sports[sportStr]
}
  newCountry.results.push(newResult);
  
 
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

  // replaces the old tbody with the new one created above
  resultsBody.parentNode.replaceChild(newBody, resultsBody);
}
