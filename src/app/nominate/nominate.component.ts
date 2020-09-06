import { Component, OnInit } from '@angular/core';
import { OmdbService } from "../omdb.service";
import { Subject } from "rxjs";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {isEqual} from 'lodash-es';

@Component({
  selector: 'app-nominate',
  templateUrl: './nominate.component.html',
  styleUrls: ['./nominate.component.css']
})
export class NominateComponent implements OnInit {
  readonly maxNominations = 5;
  movies: object;
  response: any;
  nominated: object[] = new Array(this.maxNominations);
  moviesFound: boolean;
  searchTerm = new Subject<string>();
  nominationDone: boolean;
  faSearch = faSearch;

  constructor(private omdbService: OmdbService) {
    this.nominated = [];
    this.searchTerm.subscribe(inputData => {
      //console.log('=> searchTerm inputData: ', inputData);
    });

    this.omdbService.search(this.searchTerm).subscribe(result => {
      this.response = result;
      //console.log('%c NominateComponent', 'color: green; font-weight: bold');
      //console.log('=> response: ', this.response);

      this.moviesFound = (this.response.Response == "True");
      this.movies = this.moviesFound ? this.response.Search : undefined;
    });
  }

  onNominate(movie: object) {
    this.nominationDone = this.nominated.length == this.maxNominations;
    if (!this.nominationDone) {
      this.nominated.push(movie);
    }
  }

  onRemove(movie: object) {
    var index = this.nominated.indexOf(movie);
    if (index != -1) {
      this.nominated.splice(index, 1);
    }
  }

  alreadyNominated(movie: object){
    for(var n of this.nominated) {
      if (isEqual(movie, n)) {
        return true;
      }
    }
    return false;
  }

  ngOnInit(): void {
  }
}
