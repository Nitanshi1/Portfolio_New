import { NgFor } from '@angular/common';
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgFor],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements AfterViewInit, OnDestroy {

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private animationId!: number;

  stats = [
    { value: this.experienceYears, label: 'Years Experience' },
    { value: 10, label: 'Major Projects' },
    { value: 2, label: 'Organizations Worked With' }
  ];

  // Education Data
  education = [
    {
      year: '2020 – 2024',
      degree: 'B.Tech in Computer Science & Engineering',
      institution: 'Hindustan College of Science and Technology, Mathura'
    },
    {
      year: '2017 – 2019',
      degree: 'Senior Secondary (CBSE – 80.20%)',
      institution: 'Holy Public School, Agra'
    },
    {
      year: '2015 – 2017',
      degree: 'Secondary (CBSE – 10 CGPA)',
      institution: 'Holy Public School, Agra'
    }
  ];
activeAccordion: any;

  get experienceYears(): number {
    return new Date().getFullYear() - 2023; // You began working in Feb 2024
  }

  ngAfterViewInit(): void {
    this.initThreeJS();
    this.animate();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    this.renderer?.dispose();
  }

  private initThreeJS(): void {
    const container = document.getElementById('about-3d-container');
    if (!container) return;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(this.renderer.domElement);

    this.addFloatingObjects();

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableZoom = false;
    this.controls.enablePan = false;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.5;

    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  private addFloatingObjects(): void {
    // const geometry = new THREE.IcosahedronGeometry(1, 0);
    // const geometry = new THREE.TorusKnotGeometry(0.7, 0.2, 100, 16);
    // const geometry = new THREE.SphereGeometry(1, 32, 32);
    // const geometry = new THREE.DodecahedronGeometry(1);
    // const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const geometry = new THREE.TorusKnotGeometry(0.7, 0.2, 100, 16);

    const material = new THREE.MeshPhongMaterial({
      color: 0x38bdf8,
      emissive: 0x0,
      specular: 0x111111,
      shininess: 30,
      wireframe: true
    });

    const mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);

    const ambientLight = new THREE.AmbientLight(0x404040);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x38bdf8, 1);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);
  }

  private onWindowResize(): void {
    const container = document.getElementById('about-3d-container');
    if (!container || !this.camera || !this.renderer) return;

    this.camera.aspect = container.clientWidth / container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(container.clientWidth, container.clientHeight);
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());
    this.controls?.update();
    this.renderer?.render(this.scene, this.camera);
  }

  //  activeAccordion: 'education' | 'experience' | null = null;

  toggleAccordion(panel: 'education' | 'experience'): void {
    // if the user clicks the already-open panel, close it; otherwise open the new one
    this.activeAccordion = this.activeAccordion === panel ? null : panel;
  }
}
