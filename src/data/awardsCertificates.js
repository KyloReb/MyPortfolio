// awardsCertificates.js - Updated data file
const isProduction = process.env.NODE_ENV === 'production';
const BASE_URL = isProduction 
  ? 'https://kyloreb.github.io/MyPortfolio' 
  : '';

export const awardsCertificates = [
  {
    id: 1,
    title: "JavaScript Essentials 1",
    issuer: "Cisco Networking Academy",
    date: "August 2025",
    expirationDate: "No Expiration",
    type: "certificate",
    image: `${BASE_URL}/assets/certificates/javascript-essentials-1.png`,
    pdf: `${BASE_URL}/assets/certificates/JavaScriptEssentials1.pdf`,
    verifyUrl: "https://www.credly.com/badges/b9d92382-9fa1-4830-b6d3-49bfd3f6ea0a/public_url",
    credentialId: "b9d92382-9fa1-4830-b6d3-49bfd3f6ea0a",
    description: "Completed the JavaScript Essentials 1 course covering fundamental JavaScript concepts, syntax, variables, data types, operators, control flow, functions, and basic programming techniques.",
    tags: ["JavaScript", "Programming", "Cisco", "Web Development", "Fundamentals"]
  },
  {
    id: 2,
    title: "JavaScript Essentials 2",
    issuer: "Cisco Networking Academy",
    date: "September 2025",
    expirationDate: "No Expiration", 
    type: "certificate",
    image: `${BASE_URL}/assets/certificates/javascript-essentials-2.png`,
    pdf: `${BASE_URL}/assets/certificates/JavaScriptEssentials2.pdf`,
    verifyUrl: "https://www.credly.com/badges/63ce2b62-55bd-46b5-986b-783b43d384cc/public_url",
    credentialId: "63ce2b62-55bd-46b5-986b-783b43d384cc",
    description: "Advanced JavaScript concepts including object-oriented programming, DOM manipulation, events, form validation, APIs, asynchronous programming, and modern ES6+ features.",
    tags: ["JavaScript", "Advanced", "DOM", "APIs", "Async Programming", "ES6+"]
  },
  {
    id: 3,
    title: "C++ Essentials 1",
    issuer: "Cisco Networking Academy",
    date: "August 2025",
    expirationDate: "No Expiration",
    type: "certificate",
    image: `${BASE_URL}/assets/certificates/c-essentials-1.png`,
    pdf: `${BASE_URL}/assets/certificates/CEssentials1.pdf`,
    verifyUrl: "https://www.credly.com/badges/8824242b-6c8e-4e4c-9ff0-188e5f49ec50/public_url",
    credentialId: "8824242b-6c8e-4e4c-9ff0-188e5f49ec50",
    description: "Fundamental C++ programming concepts including variables, data types, operators, control structures, functions, arrays, and basic input/output operations.",
    tags: ["C++", "Programming", "Fundamentals", "Cisco", "Software Development"]
  },
  {
    id: 4,
    title: "C++ Essentials 2",
    issuer: "Cisco Networking Academy",
    date: "August 2025",
    expirationDate: "No Expiration",
    type: "certificate",
    image: `${BASE_URL}/assets/certificates/c-essentials-2.png`,
    pdf: `${BASE_URL}/assets/certificates/CEssentials2.pdf`,
    verifyUrl: "https://www.credly.com/badges/ecc98814-778f-4145-a24a-8e43a397eb17/public_url",
    credentialId: "ecc98814-778f-4145-a24a-8e43a397eb17",
    description: "Advanced C++ programming covering object-oriented programming, classes, inheritance, polymorphism, templates, exception handling, and standard template library (STL).",
    tags: ["C++", "OOP", "Advanced", "STL", "Templates", "Software Engineering"]
  },
  {
    id: 5,
    title: "Python Essentials 1",
    issuer: "Cisco Networking Academy",
    date: "November 2025",
    expirationDate: "No Expiration",
    type: "certificate",
    image: `${BASE_URL}/assets/certificates/python-essentials-1.1.png`,
    pdf: `${BASE_URL}/assets/certificates/PythonEssentials1.pdf`,
    verifyUrl: "https://www.credly.com/badges/57741027-32d1-4881-b31f-2150d3774ea6/public_url",
    credentialId: "57741027-32d1-4881-b31f-2150d3774ea6",
    description: "Fundamental Python programming including syntax, data types, control structures, functions, modules, file handling, and basic problem-solving with Python.",
    tags: ["Python", "Programming", "Fundamentals", "Cisco", "Scripting"]
  },
  {
    id: 6,
    title: "Python Essentials 2",
    issuer: "Cisco Networking Academy",
    date: "November 2025",
    expirationDate: "No Expiration",
    type: "certificate",
    image: `${BASE_URL}/assets/certificates/python-essentials-2.png`,
    pdf: `${BASE_URL}/assets/certificates/PythonEssentials2.pdf`,
    verifyUrl: "https://www.credly.com/badges/5765a0df-57b1-40a4-8a39-ebe62297e9b8/public_url",
    credentialId: "57741027-32d1-4881-b31f-2150d3774ea6",
    description: "Advanced Python programming covering object-oriented programming, data structures, exception handling, file operations, and modular programming. Builds upon Python Essentials 1 with intermediate concepts and practical applications.",
    tags: ["Python", "Object-Oriented Programming", "Data Structures", "Exception Handling", "File Operations", "Cisco", "Advanced Python"]
  },
  {
    id: 7,
    title: "AML/CTF Fundamentals",
    issuer: "Anti-Money Laundering Council of the Philippines",
    date: "July 2024",
    expirationDate: "No Expiration",
    type: "certificate",
    image: `${BASE_URL}/assets/certificates/AmlCtfFundamentals.png`,
    pdf: `${BASE_URL}/assets/certificates/AmlCtfFundamentals.pdf`,
    verifyUrl: "https://amlctftrainings.thinkific.com/certificates/w4ow90yo9f",
    credentialId: "w4ow90yo9f",
    description: "Certification covering fundamental principles of Anti-Money Laundering and Counter-Terrorist Financing, including regulatory frameworks, risk assessment, and compliance requirements.",
    tags: ["AML", "CTF", "Compliance", "Financial Crime", "Regulatory", "Risk Assessment"]
  },
  {
    id: 8,
    title: "AMLC Registration and Reporting Guidelines (ARRG)",
    issuer: "Anti-Money Laundering Council of the Philippines",
    date: "July 2024",
    expirationDate: "No Expiration",
    type: "certificate",
    image: `${BASE_URL}/assets/certificates/ARRG.png`,
    pdf: `${BASE_URL}/assets/certificates/ARRG.pdf`,
    verifyUrl: "https://amlctftrainings.thinkific.com/certificates/3czjfaquis",
    credentialId: "3czjfaquis",
    description: "Certification covering AMLC registration requirements and reporting obligations for covered institutions, including transaction reporting, suspicious transaction reporting, and compliance procedures.",
    tags: ["AML", "Reporting", "Compliance", "Registration", "Financial Regulation", "Transaction Monitoring"]
  }
];