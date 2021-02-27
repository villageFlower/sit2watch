import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  movies: any = [];

  constructor(
    private movieService: MovieService,
    private router : Router
    ) {
    this.movieService.getAllMovies().subscribe((data) => {
      this.movies = data;
    })
  }


  ngOnInit() {
    }

    toRoom(){
      this.router.navigate(['/tabs/tab3'])
    }

  

}
