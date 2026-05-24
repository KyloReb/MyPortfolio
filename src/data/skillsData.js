export const skillCategories = [
  {
    id: 'frontend',
    label: 'Frontend',
    color: '#6366f1',
    skills: [
      { name: 'JavaScript', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'React.js', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'HTML/CSS', level: 95, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'Flutter', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
    ]
  },
  {
    id: 'backend',
    label: 'Backend',
    color: '#06b6d4',
    skills: [
      { name: 'Node.js', level: 75, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Python', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'Java', level: 95, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'Django', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
      { name: 'PHP', level: 70, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
    ]
  },
  {
    id: 'dotnet',
    label: '.NET',
    color: '#8b5cf6',
    skills: [
      { name: 'C#', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
      { name: 'ASP.NET', level: 75, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg' },
      { name: 'ASP.NET MVC', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg' },
      { name: 'ASP.NET WEB API', level: 70, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg' },
      { name: 'Windows Form', level: 70, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg' },
      { name: 'Crystal Report', level: 70, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/crystal/crystal-original.svg' },
    ]
  },
  {
    id: 'database',
    label: 'Databases',
    color: '#10b981',
    skills: [
      { name: 'MSSQL', level: 70, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg' },
      { name: 'MySQL', level: 70, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    ]
  },
  {
    id: 'gamedev',
    label: 'Game Dev & AR',
    color: '#ef4444',
    skills: [
      { name: 'Unity', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg' },
      { name: 'Game Development', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg' },
      { name: 'Augmented Reality', level: 70, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/augmentedreality/augmentedreality-original.svg' },
    ]
  },
  {
    id: 'design',
    label: 'Design & 3D',
    color: '#ec4899',
    skills: [
      { name: 'UI/UX Design', level: 70, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
      { name: 'Figma', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
      { name: 'Adobe Photoshop', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg' },
      { name: 'Blender', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg' },
      { name: '3D Rendering', level: 70, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg' },
    ]
  },
  {
    id: 'tools',
    label: 'Tools',
    color: '#14b8a6',
    skills: [
      { name: 'GIT', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    ]
  },
];

export const skills = skillCategories.flatMap(cat => cat.skills);
