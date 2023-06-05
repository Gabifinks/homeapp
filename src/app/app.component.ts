import { Component, HostListener, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { enableProdMode } from '@angular/core';
import * as $ from 'jquery';


enableProdMode();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isScrolled = false;
  footerVisible = false;


  ngOnInit() {
    $(window).on('beforeunload', function(){
      $(window).scrollTop(0);
    });

    this.checkScrollPosition();
    this.initializeHorizontalScroll();
    this.addScrollListener();
    this.checkFooterVisibility();
    this.hideFooterInitially();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.checkScrollPosition();

  }

  checkScrollPosition() {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    const windowHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight ||
      0;

    this.isScrolled = scrollPosition > windowHeight * 0.2;
  }

  initializeHorizontalScroll() {
    gsap.registerPlugin(ScrollTrigger);

    const sections: HTMLElement[] = gsap.utils.toArray('section');
    let maxWidth: number = 0;

    const getMaxWidth = () => {
      maxWidth = 0;
      sections.forEach((section: HTMLElement) => {
        maxWidth += section.offsetWidth;
      });
    };
    getMaxWidth();
    ScrollTrigger.addEventListener('refreshInit', getMaxWidth);

    gsap.to(sections, {
      x: () => `-${maxWidth - window.innerWidth}`,
      ease: 'none',
      scrollTrigger: {
        trigger: '.wrapper',
        pin: true,
        scrub: true,
        end: `+=${maxWidth}`,
        invalidateOnRefresh: true
      }
    });

    sections.forEach((sct: HTMLElement, i: number) => {
      ScrollTrigger.create({
        trigger: sct,
        start: () =>
          `top top-=${(sct.offsetLeft - window.innerWidth / 2) *
            (maxWidth / (maxWidth - window.innerWidth))}`,
        end: `+=${sct.offsetWidth *
          (maxWidth / (maxWidth - window.innerWidth))}`,
        toggleClass: { targets: sct, className: 'active' }
      });
    });
  }

  addScrollListener() {
    const observer = new IntersectionObserver((entries) => {
      const clientDiv = document.querySelector('.client') as HTMLElement;
      const footer = document.querySelector('.footer') as HTMLElement;

      if (entries[0].isIntersecting) {
        // The client div is fully visible, show the footer
        this.footerVisible = true;
      } else {
        // The client div is not fully visible, hide the footer
        this.footerVisible = false;
      }

      this.checkFooterVisibility();
    });

    const clientDiv = document.querySelector('.client') as HTMLElement;
    observer.observe(clientDiv);

    window.addEventListener('scroll', () => {
      const scroll =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      const myVideo = document.getElementById('myVideo') as HTMLVideoElement;
      const zoom = 1 + scroll / 1000;
      myVideo.style.transform = `scale(${zoom})`;
      myVideo.style.transformOrigin = 'center';
    });
  }

  hideFooterInitially() {
    const footer = document.querySelector('.footer') as HTMLElement;
    footer.style.display = 'none';
  }

  checkFooterVisibility() {
    const footer = document.querySelector('.footer') as HTMLElement;
    const fadeInDuration = 0.2; // Adjust the duration as needed
    const fadeOutDuration = 1; // Adjust the duration as needed

    if (this.footerVisible) {
      footer.style.opacity = '0';
      footer.style.display = 'block';
      gsap.to(footer, { opacity: 1, duration: fadeInDuration });
    } else {
      gsap.to(footer, {
        opacity: 0,
        duration: fadeOutDuration,
        onComplete: () => {
          footer.style.display = 'none';
        }
      });
    }
  }
}
