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
    document.getElementById('1').innerHTML = localStorage.getItem('my_room_id')
    }

    toRoom(){
      this.router.navigate(['/tabs/tab3'])
    }

    

  

}
