import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
  NgZone,
  OnDestroy,
} from '@angular/core';
import { gsap } from 'gsap';
import { Application } from '@splinetool/runtime';
import { NgFor, NgIf } from '@angular/common';
import * as THREE from 'three';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';
import { ContactComponent } from '../../pages/contact/contact.component';
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [HeaderComponent, NgFor],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  // taglineWords: any;
  // floatingTech: any;

  // typedText = 'Hi, I’m a';
  // title = 'Developer';
  typedText = 'Turning ideas into';
  title = 'Digital Experiences';
  taglineWords = ['Fullstack', '||', 'Web', '||', 'Frontend', 'Developer'];
  floatingTech = [
    { name: '🎨 Tailwind CSS', left: 250, top: 170, delay: 0.7 },
    { name: '⚡ Node.js', left: 180, top: 130, delay: 0.6 },

    { name: '🅰️ Angular', left: 100, top: 90, delay: 0.4 },
    { name: '🌐 HTML & CSS', left: 300, top: 110, delay: 0.8 },
    { name: '🧠 TypeScript', left: 150, top: 200, delay: 0.5 },
  ];

  @ViewChild('heroText') heroText!: ElementRef;
  @ViewChild('scrollArrow') scrollArrow!: ElementRef;
  @ViewChild('splineContainer', { static: true }) splineContainer!: ElementRef;

  name = 'Nitanshi Agarwal';
  splineUrl = 'https://prod.spline.design/your-spline-scene-url';

  private splineApp: Application | null = null;
  isMobile = false;
  private resizeObserver: ResizeObserver | null = null;
  threejsContainer: any;

  constructor(private ngZone: NgZone, private router: Router) {}

  ngOnInit() {
    this.checkMobile();
    this.initializeSpline();
  }

  ngAfterViewInit() {
    this.animateText();
    this.animateScrollArrow();
    this.setupResizeObserver();
  }

  ngOnDestroy() {
    this.cleanUpSpline();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private checkMobile() {
    this.isMobile = window.innerWidth < 768;
  }

  private initializeSpline(): void {
    if (this.isMobile || !this.splineContainer) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      const canvas = this.splineContainer.nativeElement;

      try {
        this.splineApp = new Application(canvas);

        this.splineApp
          .load(this.splineUrl)
          .then(() => {
            console.log('Spline scene loaded successfully');
            this.handleSplineLoad();
          })
          .catch((err) => console.error('Error loading Spline scene:', err));
      } catch (err) {
        console.error('Error initializing Spline:', err);
      }
    });
  }
  private handleSplineLoad() {
    if (!this.splineApp) return;
  }

  private cleanUpSpline() {
    if (this.splineApp) {
      this.splineApp.dispose();
      this.splineApp = null;
    }
  }

  private setupResizeObserver() {
    if (!this.splineContainer?.nativeElement) return;

    this.resizeObserver = new ResizeObserver(() => {
      if (this.splineApp) {
        const { offsetWidth, offsetHeight } =
          this.splineContainer.nativeElement;
        this.splineApp.setSize(offsetWidth, offsetHeight);
      }
    });

    this.resizeObserver.observe(this.splineContainer.nativeElement);
  }

  private animateText() {
    if (!this.heroText?.nativeElement) return;

    gsap.from(this.heroText.nativeElement.children, {
      duration: 1,
      opacity: 0,
      y: 50,
      stagger: 0.2,
      ease: 'power3.out',
    });
  }

  private animateScrollArrow() {
    if (!this.scrollArrow?.nativeElement) return;

    gsap.to(this.scrollArrow.nativeElement, {
      y: 10,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }

  scrollToNextSection() {
    const nextSection = document.getElementById('skills');
    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  scrollToContact(): void {
    this.router.navigateByUrl('/contact');
  }
}
