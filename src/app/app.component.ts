import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isScrolled = false;

  ngOnInit() {
    this.checkScrollPosition();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.checkScrollPosition();
  }

  checkScrollPosition() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;

    this.isScrolled = scrollPosition > windowHeight * 0.2; // Adjust the threshold as needed
  }
  

}
