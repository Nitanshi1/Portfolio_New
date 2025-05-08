import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, NgZone, OnDestroy } from '@angular/core';
import { gsap } from 'gsap';
import { Application } from '@splinetool/runtime';
import { NgFor, NgIf } from '@angular/common';
import * as THREE from 'three';
import { HeaderComponent } from "../header/header.component";
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgIf, HeaderComponent ,NgFor],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
// taglineWords: any;
// floatingTech: any;

// typedText = 'Hi, I’m a';
// title = 'Developer';
typedText = 'Turning ideas into';
title = 'Digital Experiences';
taglineWords = ['Fullstack', '||','Web', '||' ,'Frontend', 'Developer',];
floatingTech = [
  { name: '🅰️ Angular', left: 100, top: 90, delay: 0.4 },
  { name: '⚡ Node.js', left: 180, top: 130, delay: 0.6 },
  { name: '🎨 Tailwind CSS', left: 250, top: 170, delay: 0.7 },
  { name: '🌐 HTML & CSS', left: 300, top: 110, delay: 0.8 },
  { name: '🧠 TypeScript', left: 150, top: 200, delay: 0.5 },
];

scrollToContact() {
throw new Error('Method not implemented.');
}
  
    @ViewChild('heroText') heroText!: ElementRef;
    @ViewChild('scrollArrow') scrollArrow!: ElementRef;
    @ViewChild('splineContainer', { static: true }) splineContainer!: ElementRef;
  
    name = 'Nitanshi Agarwal';
    // title = 'Frontend Developer';
    splineUrl = 'https://prod.spline.design/your-spline-scene-url';
    
    private splineApp: Application | null = null;
    isMobile = false;
    private resizeObserver: ResizeObserver | null = null;
  threejsContainer: any;
// typedText: any;
  
    constructor(private ngZone: NgZone) {}
  
    ngOnInit() {
      this.checkMobile();
      this.initializeSpline();
    }
  
    ngAfterViewInit() {
      this.animateText();
      this.animateScrollArrow();
      this.setupResizeObserver();
      // if (!this.isMobile) {
      //   this.initThreeJSBackground();
      // }
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
  
    private initializeSpline() {
      if (this.isMobile) return;
  
      this.ngZone.runOutsideAngular(() => {
        try {
          const canvas = this.splineContainer.nativeElement;
          this.splineApp = new Application(canvas);
          this.splineApp.load(this.splineUrl)
            .then(() => {
              console.log('Spline scene loaded successfully');
              this.handleSplineLoad();
            })
            .catch(error => {
              console.error('Error loading Spline scene:', error);
            });
        } catch (error) {
          console.error('Error initializing Spline:', error);
        }
      });
    }
  
    private handleSplineLoad() {
      if (!this.splineApp) return;
      
      // Adjust camera or other settings after load if needed
      // this.splineApp.setZoom(0.8);
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
          const { offsetWidth, offsetHeight } = this.splineContainer.nativeElement;
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
        ease: 'power3.out'
      });
    }
  
    private animateScrollArrow() {
      if (!this.scrollArrow?.nativeElement) return;
  
      gsap.to(this.scrollArrow.nativeElement, {
        y: 10,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  
    scrollToNextSection() {
      const nextSection = document.getElementById('skills');
      if (nextSection) {
        nextSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
    

    // initThreeJSBackground() {
    //   const container = this.threejsContainer.nativeElement;
      
    //   // Setup Three.js scene
    //   const scene = new THREE.Scene();
    //   const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    //   const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    //   renderer.setSize(container.offsetWidth, container.offsetHeight);
    //   container.appendChild(renderer.domElement);
      
    //   // Add floating objects
    //   const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    //   const material = new THREE.MeshBasicMaterial({ 
    //     color: 0x4fc3f7,
    //     wireframe: true 
    //   });
    //   const knot = new THREE.Mesh(geometry, material);
    //   scene.add(knot);
      
    //   camera.position.z = 5;
      
    //   // Animation loop
    //   const animate = () => {
    //     requestAnimationFrame(animate);
    //     knot.rotation.x += 0.01;
    //     knot.rotation.y += 0.01;
    //     renderer.render(scene, camera);
    //   };
    //   animate();

    // }
  }
