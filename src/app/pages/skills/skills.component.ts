import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [NgFor],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '0.5s ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
    trigger('staggerIn', [
      transition(':enter', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateX(-20px)' }),
            stagger('0.1s', [
              animate(
                '0.4s ease-out',
                style({ opacity: 1, transform: 'translateX(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
    trigger('popIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate(
          '0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          style({ opacity: 1, transform: 'scale(1)' })
        ),
      ]),
    ]),
    trigger('progressAnimate', [
      transition(':enter', [
        style({ width: '0%' }),
        animate('1.5s ease-out', style({ width: '*' })),
      ]),
    ]),
  ],
})
export class SkillsComponent {
  languages = [
    { name: 'HTML/CSS', icon: 'assets/html.jpg' },
    { name: 'JavaScript', icon: 'assets/js.jpg' },
    { name: 'TypeScript', icon: 'assets/ts.jpg' },
    { name: 'Python', icon: 'assets/python.jpg' },
    { name: 'NodeJS', icon: 'assets/nodejs.png' },
    { name: 'Angular', icon: 'assets/angular.jpg' },
    { name: 'ExpressJS', icon: 'assets/expressjs.jpg' },
    { name: 'Bootstrap', icon: 'assets/bootstrap.jpg' },
    { name: 'Tailwind CSS', icon: 'assets/tailwindcss.jpg' },
    { name: 'Angular Material', icon: 'assets/angular mat.png' },
    
  ];

  databases = [
    { name: 'MongoDB', icon: 'assets/mongodb.png' },
    { name: 'SQL', icon: 'assets/sql.png' },
  ];

  tools = [
    { name: 'Git/GitHub', icon: 'assets/git.jpg' },
    { name: 'VS Code', icon: 'assets/vscode.jpg' },
    { name: 'PyCharm', icon: 'assets/pycharm.jpg' },
  ];

  
}
