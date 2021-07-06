import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-up-btn',
  templateUrl: './scroll-up-btn.component.html',
  styleUrls: ['./scroll-up-btn.component.scss']
})
export class ScrollUpBtnComponent implements OnInit {
  go_top_btn: HTMLElement;

  constructor() { }

  ngOnInit(): void {
    this.go_top_btn = document.querySelector('.go-top-btn');
    window.addEventListener('scroll', this.scrollTop, true);
  }

  scrollTop = (event) => {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300){
      this.go_top_btn.style.display = 'block';
    } else {
      this.go_top_btn.style.display = 'none';
    }
  }

  scrolling(): void{
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
