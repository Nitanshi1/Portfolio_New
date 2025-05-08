import { NgFor, NgClass } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, NgClass, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  mobileMenuOpen: boolean = false;
  isScrolled: boolean = false;
 
  name = 'Nitanshi Agarwal';
  navItems = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
  ];
 
  activeSection: string = '';

  constructor(private router: Router) {}
  
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
    
    // Update active section based on scroll position
    this.updateActiveSection();
  }
  
  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
  
  scrollToSection(sectionId: string) {
    // Update URL without reloading
    this.router.navigate([], {
      fragment: sectionId,
      queryParamsHandling: 'preserve'
    });
    
    // Scroll to the section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.activeSection = sectionId;
    }
    
    // Close mobile menu if open
    if (this.mobileMenuOpen) {
      this.mobileMenuOpen = false;
    }
  }
  
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.router.navigate(['/']);
    this.activeSection = '';
  }
  
  private updateActiveSection() {
    // Logic to determine which section is currently in view
    // and update activeSection accordingly
    const sections = this.navItems.map(item => item.id);
    
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        // If element is visible in viewport
        if (rect.top <= 150 && rect.bottom >= 150) {
          this.activeSection = section;
          break;
        }
      }
    }
  }
}