



import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgFor],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  medicalTech = ['Angular', 'Node.js', 'MongoDB', 'JWT', 'Tailwind CSS'];
  spotifyTech = ['Angular 17', 'Spotify API', 'TypeScript', 'RxJS'];
  voiceTech = ['Python', 'SpeechRecognition', 'gTTS', 'PyAudio'];

  @ViewChild('medicalVisual') medicalVisual!: ElementRef;
  @ViewChild('spotifyVisual') spotifyVisual!: ElementRef;
  @ViewChild('voiceVisual') voiceVisual!: ElementRef;
  createAudioWaves: any;

  ngOnInit() {
    gsap.registerPlugin(ScrollTrigger);
    this.initThreeJS();
    this.setupAnimations();
  }

  private initThreeJS() {
    // Medical Project - 3D Pill
    const medicalScene = new THREE.Scene();
    const pillGeometry = new THREE.CapsuleGeometry(0.5, 1, 4, 8);
    const pillMaterial = new THREE.MeshPhongMaterial({ color: 0x3b82f6 });
    const pill = new THREE.Mesh(pillGeometry, pillMaterial);
    medicalScene.add(pill);

    // Spotify Project - Audio Waves
    const spotifyScene = new THREE.Scene();
    const waves = this.createAudioWaves();
    spotifyScene.add(waves);

    // Renderers setup (similar for all projects)
    this.setupRenderer(this.medicalVisual, medicalScene);
    this.setupRenderer(this.spotifyVisual, spotifyScene);
  }
  setupRenderer(spotifyVisual: ElementRef<any>, spotifyScene: THREE.Scene) {
    throw new Error('Method not implemented.');
  }

  private setupAnimations() {
    // GSAP Scroll Triggers
    gsap.from(".project-card", {
      scrollTrigger: {
        trigger: ".project-card",
        start: "top 80%",
        toggleActions: "play none none none"
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.3
    });

    // Hover effects
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { scale: 1.02, boxShadow: '0 15px 40px rgba(0,0,0,0.2)' });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { scale: 1, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' });
      });
    });
  }
  getTechIcon(tech: string): string {
    const icons: {[key: string]: string} = {
      'Angular': '⚡', 
      'Node.js': '🟢',
      'MongoDB': '🍃',
      'TypeScript': '🔵',
      'Python': '🐍',
      'Spotify API': '🎧'
    };
    return icons[tech] || '▹';
  }
}
