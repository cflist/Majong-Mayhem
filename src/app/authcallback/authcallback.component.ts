import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-authcallback',
  templateUrl: './authcallback.component.html',
  styleUrls: ['./authcallback.component.css']
})
export class AuthcallbackComponent implements OnInit {
  private sub: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      console.log(params)
      localStorage.setItem('username', params['username']);
      localStorage.setItem('token', params['token']);

      location.href = '/';
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
