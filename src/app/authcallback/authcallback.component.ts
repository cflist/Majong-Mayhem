import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-authcallback',
  templateUrl: './authcallback.component.html',
  styleUrls: ['./authcallback.component.css']
})
export class AuthcallbackComponent implements OnInit {
  private sub: any;

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      console.log(params)
      localStorage.setItem('username', params['username']);
      localStorage.setItem('token', params['token']);

      this.router.navigate(['/']);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
