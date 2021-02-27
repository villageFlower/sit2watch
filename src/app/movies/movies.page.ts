import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  movies: any = [];

  constructor(private movieService: MovieService) {
    this.movieService.getAllMovies().subscribe((data) => {
      this.movies = data;
    })
  }


  ngOnInit() {
    }

  

}
