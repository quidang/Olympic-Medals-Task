import { IResult } from './IResult';
import { Medals } from './Medals.enum';

export class Country {
  // TO(DONE)DO: Country requires a name attribute and a results attribute.
  // name is a string, results is an array of Result
  name: string; 
  results: IResult[];
  // TO(DONE)DO: receives a name and initialises the results array to an empty array
  constructor(name: string) {
    this.name = name;
    this.results = [];
  }

  // return the total number of medals
  totalMedals(): number {
    //TO(DONE)DO: complete
    // let count = 0;
    // for (let i = 0; i < this.results.length; i++)
    //   count++;
    // return count;
    return this.results.length;
  }


  // given a medal type, return the amount of that type of medal
  totalMedalType(medal: Medals): number {
    // TO(DONE)DO:
    let medalCount = 0; 
        for (let i = 0; i < this.results.length; i++) {
      if(this.results[i].medal === medal)
      medalCount++
    }
    return medalCount;
  }
}