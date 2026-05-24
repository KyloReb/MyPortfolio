export const projectFilters = [
  { id: 'all', label: 'All' },
  { id: 'mobile', label: 'Mobile', color: '#ec4899' },
  { id: 'web', label: 'Web', color: '#6366f1' },
  { id: 'desktop', label: 'Desktop', color: '#06b6d4' },
  { id: 'game', label: 'Game', color: '#f59e0b' },
  { id: 'ar', label: 'AR/3D', color: '#10b981' },
  { id: 'api', label: 'API', color: '#8b5cf6' },
];

export const projects = [
  {
    id: 'finance-mgmt',
    title: 'Finance Management Console',
    description: 'A lightning-fast, highly secure .NET 10 financial tracker combining a beautiful MudBlazor UI with enterprise-level Google Cloud data integration and automated reporting.',
    image: 'FinanceManagement.png',
    screenshots: ['FinanceManagement.png'],
    github: 'https://github.com/KyloReb/FinanceManagementConsole',
    categories: ['web'],
    tags: ['C#', '.NET 10', 'MudBlazor', 'Google Cloud', 'Blazor']
  },
  {
    id: 'kinderpal',
    title: 'KinderPal',
    description: 'A mobile-based learning application designed for the Barangay 740 Day care Center. Uses Augmented Reality, 3D-Rendered Objects, Lessons and Game-like Assessment to create a comprehensive platform that fosters holistic growth.',
    image: 'KinderPal.png',
    screenshots: ['KinderPal.png'],
    github: 'https://github.com/KyloReb/KinderPal',
    categories: ['mobile', 'ar', 'game'],
    tags: ['C#', 'Unity', 'Blender', 'AR', '3D Rendering']
  },
  {
    id: 'inventory-mgmt',
    title: 'Inventory Management System',
    description: 'A comprehensive Windows Forms application for managing supplies and assets inventory. Provides a complete interface for viewing, editing, searching, and exporting inventory data with user roles, activity logging, and SQL Server connectivity.',
    image: 'InventoryManagementSys.png',
    screenshots: ['InventoryManagementSys.png'],
    github: 'https://github.com/KyloReb/InventorySystem',
    categories: ['desktop'],
    tags: ['C#', '.NET Framework', 'Windows Forms', 'SQL Server', 'Entity Framework']
  },
  {
    id: 'report-generator',
    title: 'Report Generator System',
    description: 'A Windows Forms application for generating and viewing transactional reports. Integrates Crystal Reports for rendering and supports multiple report types such as QR, POS, and ATM with dynamic zoom controls and user session management.',
    image: 'ReportGeneratingSystem.png',
    screenshots: ['ReportGeneratingSystem.png'],
    github: 'https://github.com/KyloReb/ReportGen',
    categories: ['desktop'],
    tags: ['C#', '.NET Framework', 'Windows Forms', 'MSSQL', 'Crystal Report']
  },
  {
    id: 'sla-api',
    title: 'SLA Management API',
    description: 'A web API built with ASP.NET Framework 4.7.2 for managing Service Level Agreements. Features user authentication, complete CRUD operations, graphical transaction displays, and customizable SLA parameters.',
    image: 'SlaApi.png',
    screenshots: ['SlaApi.png'],
    github: 'https://github.com/KyloReb/SlaApi',
    categories: ['web', 'api'],
    tags: ['ASP.NET', 'Web API', 'C#', 'MSSQL', 'Entity Framework', 'Chart.js']
  },
  {
    id: 'sla-mgmt',
    title: 'SLA Management System',
    description: 'A web application for managing Service Level Agreements with user authentication, complete CRUD operations, graphical transaction displays, and customizable SLA parameters for comprehensive service agreement management.',
    image: 'Sla.png',
    screenshots: ['Sla.png'],
    github: 'https://github.com/KyloReb/SlaMonitoring',
    categories: ['web'],
    tags: ['ASP.NET', 'C#', 'MSSQL', 'Entity Framework', 'JavaScript', 'Bootstrap']
  },
  {
    id: 'ictowers',
    title: 'ICTowers',
    description: 'A mobile running-based platform arcade game that merges entertainment with specialized learning in computer technology. The core objective is to boost the player\'s knowledge through an engaging typing experience.',
    image: 'ICTowers.jpg',
    screenshots: ['ICTowers.jpg'],
    github: 'https://github.com/yourusername/task-app',
    categories: ['mobile', 'game'],
    tags: ['C#', 'Unity', 'Adobe Photoshop']
  },
  {
    id: 'visitor-tracker',
    title: 'UDM Visitor Tracker & Feedback System',
    description: 'A desktop application tailored for Universidad De Manila. Records essential visitor data like name, role, date/time, address, and concerns in a centralized database, with a feedback feature for continuous improvement.',
    image: 'VisitorTracker.jpg',
    screenshots: ['VisitorTracker.jpg'],
    github: 'https://github.com/yourusername/task-app',
    categories: ['desktop'],
    tags: ['C#', 'Adobe Photoshop', 'Unity']
  },
  {
    id: 'e-pocket',
    title: 'E-Pocket',
    description: 'A secure desktop application for managing online wallets, simplifying financial management with a user-friendly interface and robust features for both individuals and businesses.',
    image: 'EPocket.png',
    screenshots: ['EPocket.png'],
    github: 'https://github.com/yourusername/weather-app',
    categories: ['desktop'],
    tags: ['C#', 'Visual Studio', 'Windows Form', 'MSSQL']
  },
  {
    id: 'space-attack',
    title: 'Space Attack',
    description: 'An Android mobile game featuring a spaceship navigating through meteor storms, integrating a health system and strategic shooting mechanics for an engaging gameplay experience.',
    image: 'SpaceAttack.png',
    screenshots: ['SpaceAttack.png'],
    github: 'https://github.com/yourusername/task-app',
    categories: ['mobile', 'game'],
    tags: ['C#', 'Unity', 'Adobe Photoshop']
  },
  {
    id: 'pos-udm',
    title: 'POS for UDM Canteen',
    description: 'A desktop point-of-sale system tailored for the Universidad De Manila Canteen. Organizes sales and payment transactions, rings up items by department, tracks sales, adds taxes, and creates receipts for a hassle-free transaction experience.',
    image: 'PointOfSales.jpg',
    screenshots: ['PointOfSales.jpg'],
    github: 'https://github.com/yourusername/task-app',
    categories: ['desktop'],
    tags: ['C#', 'Adobe Photoshop', 'Unity']
  }
];
