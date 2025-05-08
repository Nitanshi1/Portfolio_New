import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [NgFor,RouterOutlet],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  languages = [
    { name: 'HTML/CSS', icon: 'html-css', progress: 95, level: 'Advanced' },
    { name: 'JavaScript', icon: 'javascript', progress: 90, level: 'Advanced' },
    { name: 'TypeScript', icon: 'typescript', progress: 85, level: 'Advanced' },
    { name: 'Python', icon: 'python', progress: 80, level: 'Intermediate' },
    { name: 'NodeJS', icon: 'nodejs', progress: 85, level: 'Advanced' },
    { name: 'Angular', icon: 'angular', progress: 90, level: 'Advanced' },
    { name: 'ExpressJS', icon: 'express', progress: 80, level: 'Intermediate' },
    { name: 'Bootstrap', icon: 'bootstrap', progress: 85, level: 'Advanced' },
    { name: 'Tailwind CSS', icon: 'tailwind', progress: 75, level: 'Intermediate' }
  ];

  databases = [
    { name: 'MongoDB', icon: 'mongodb', progress: 85, level: 'Advanced' },
    { name: 'SQL', icon: 'sql', progress: 80, level: 'Intermediate' }
  ];

  tools = [
    { name: 'Git/GitHub', icon: 'github', progress: 90, level: 'Advanced' },
    { name: 'VS Code', icon: 'vscode', progress: 95, level: 'Expert' },
    { name: 'PyCharm', icon: 'pycharm', progress: 70, level: 'Intermediate' }
  ];
}
