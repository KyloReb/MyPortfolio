// projectsData.js - Updated with absolute paths for production
const isProduction = process.env.NODE_ENV === 'production';
const BASE_URL = isProduction 
  ? 'https://kyloreb.github.io/MyPortfolio' 
  : '';

export const projects = [
  {
    id: 'kinderpal',
    title: 'KinderPal',
    description: 'A mobile-based learning application designed for the Barangay 740 Day care Center. KinderPal uses features like Augmented Reality, 3D-Rendered Objects, Lessons and Game like Assessment. KinderPal seeks to capitalize on the captivating power of mobile technology to create a comprehensive platform that fosters holistic growth.',
    image: `${BASE_URL}/assets/images/KinderPal.png`,
    github: 'https://github.com/KyloReb/KinderPal',
    tags: ['C#', 'Blender', '3D Rendering', 'Augmented Reality', 'Unity']
  },
  {
    id: 'ictowers',
    title: 'ICTowers',
    description: 'ICTowers is a mobile running-based platform arcade game that merges entertainment with specialized learning in the field of computer technology. The game\'s core objective is to boost the player\'s knowledge through an engaging typing experience.',
    image: `${BASE_URL}/assets/images/ICTowers.jpg`,
    github: 'https://github.com/yourusername/task-app',
    tags: ['C#', 'Adobe Photoshop', 'Unity']
  },
  {
    id: 'space-attack',
    title: 'Space Attack',
    description: 'Designed and developed an Android mobile game featuring a spaceship navigating through meteor storms, integrating a health system and strategic shooting mechanics for an engaging gameplay experience.',
    image: `${BASE_URL}/assets/images/SpaceAttack.png`,
    github: 'https://github.com/yourusername/task-app',
    tags: ['C#', 'Adobe Photoshop', 'Unity']
  },
  {
    id: 'pos-udm',
    title: 'Point of Sales (POS) for Universidad De Manila Canteen',
    description: 'A desktop application for a convenient and accessible system, specifically tailored for the Universidad De Manila Canteen. Aims to enhance the University dining organisation. Adding a useful feature in which the system organizes sales and payment transactions at the moment of purchase. "The Point of Sale System performs all of the basic cash register functions such as ringing up items by department, tracking sales, adding taxes, and creating receipts." As a result, we guarantee a less-hassle transaction, which leads to better customer service and a positive reputation.',
    image: `${BASE_URL}/assets/images/PointOfSales.jpg`,
    github: 'https://github.com/yourusername/task-app',
    tags: ['C#', 'Adobe Photoshop', 'Unity']
  },
  {
    id: 'visitor-tracker',
    title: 'UDM Visitor Tracker and Feedback Manager System',
    description: 'A desktop application tailored made for Universidad De Manila. This enhances accuracy and organization, recording essential data like name, role, date/time, address, and concerns in a centralized database. Additionally, a feedback feature allows visitors to input suggestions, aiding continuous improvement of campus conditions and regulations. This application is made for the university visitors in pandemic.',
    image: `${BASE_URL}/assets/images/VisitorTracker.jpg`,
    github: 'https://github.com/yourusername/task-app',
    tags: ['C#', 'Adobe Photoshop', 'Unity']
  },
  {
    id: 'e-pocket',
    title: 'E-Pocket',
    description: 'Developed E-Pocket, a secure desktop application for managing online wallets, simplifying financial management with a user-friendly interface and robust features for both individuals and businesses.',
    image: `${BASE_URL}/assets/images/EPocket.png`,
    github: 'https://github.com/yourusername/weather-app',
    tags: ['C#', 'Visual Studio', 'Windows Form', 'MSSQL']
  },
  {
    id: 'inventory-mgmt',
    title: 'Inventory Management System',
    description: 'A comprehensive Windows Forms application for managing supplies and assets inventory, built with C# (.NET Framework 4.7.2). Provides a complete interface for viewing, editing, searching, and exporting inventory data with user roles, activity logging, SQL Server connectivity, and advanced export capabilities.',
    image: `${BASE_URL}/assets/images/InventoryManagementSys.png`,
    github: 'https://github.com/KyloReb/InventorySystem',
    tags: ['C#', '.NET Framework 4.7.2', 'Windows Forms', 'SQL Server', 'Entity Framework']
  },
  {
    id: 'report-generator',
    title: 'Report Generator System',
    description: 'Report Generator System is a Windows Forms application built in C# using the .NET Framework 4.7.2, designed for generating and viewing transactional reports. It integrates Crystal Reports for rendering and supports multiple report types such as QR, POS, and ATM. The application features a user-friendly interface with a resizable split-panel layout (25% controls, 75% report view), dynamic zoom controls, and user session management. It connects to an MSSQL database using configuration-based connection strings and allows filtering by date range, report type, and terminal ID. The system includes progress tracking, error logging, and a streamlined menu with user options like logout and password change.',
    image: `${BASE_URL}/assets/images/ReportGeneratingSystem.png`,
    github: 'https://github.com/KyloReb/ReportGen',
    tags: ['Windows Form', 'C#', '.NET Framework 4.7.2', 'MSSQL', 'Crystal Report']
  },
  {
    id: 'sla-api',
    title: 'SLA Management Api',
    description: 'A web application built with ASP.NET Framework 4.7.2 for managing Service Level Agreements (SLAs). Features include user authentication, complete CRUD operations, graphical transaction displays, and customizable SLA parameters for comprehensive service agreement management.',
    image: `${BASE_URL}/assets/images/SlaApi.png`,
    github: 'https://github.com/KyloReb/SlaApi',
    tags: ['ASP.NET','ASP.NET Web Core Api', 'C#', '.NET Framework 4.7.2', 'MSSQL', 'Entity Framework', 'JavaScript', 'Chart.js', 'Bootstrap']
  },
  {
    id: 'sla-mgmt',
    title: 'SLA Management System',
    description: 'A web application built with ASP.NET Framework 4.7.2 for managing Service Level Agreements (SLAs). Features include user authentication, complete CRUD operations, graphical transaction displays, and customizable SLA parameters for comprehensive service agreement management.',
    image: `${BASE_URL}/assets/images/Sla.png`,
    github: 'https://github.com/KyloReb/SlaMonitoring',
    tags: ['ASP.NET','ASP.NET Web Core Api','C#', '.NET Framework 4.7.2', 'MSSQL', 'Entity Framework', 'JavaScript', 'Chart.js', 'Bootstrap']
  }
];