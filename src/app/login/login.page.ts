import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  signupForm: FormGroup;
  user: any = [];

  constructor(private movieService: MovieService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,) {
    this.signupForm = formBuilder.group({
      'email': '',
    });
   }

  ngOnInit() {
  }

  signup(){
    this.movieService.addUser(this.signupForm.value.email);
    console.log("login successfully")
  }

}
