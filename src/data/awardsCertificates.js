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
    date: "August 2024",
    type: "certificate",
    image: `${BASE_URL}/assets/certificates/javascript-essentials-2.png`,
    pdf: `${BASE_URL}/assets/certificates/JavaScriptEssentials1.pdf`,
    verifyUrl: "https://www.credly.com/badges/b9d92382-9fa1-4830-b6d3-49bfd3f6ea0a/public_url",
    credentialId: "63ce2b62-55bd-46b5-986b-783b43d384cc",
    description: "Completed the JavaScript Essentials 1 course covering fundamental JavaScript concepts, syntax, and programming techniques.",
    tags: ["JavaScript", "Programming", "Cisco", "Web Development"]
  },
  {
    id: 2,
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "October 2023",
    type: "certificate",
    image: "https://placehold.co/600x400/667eea/white?text=AWS+Solutions+Architect",
    pdf: `${BASE_URL}/assets/certificates/aws-solutions-architect.pdf`,
    verifyUrl: "https://aws.amazon.com/verification",
    credentialId: "ASC-789012-XYZ",
    description: "Professional certification demonstrating expertise in designing distributed systems on AWS.",
    tags: ["Cloud", "AWS", "Architecture"]
  },
  {
    id: 3,
    title: "React Advanced Certification",
    issuer: "Meta",
    date: "August 2023",
    type: "certificate",
    image: "https://placehold.co/600x400/667eea/white?text=React+Advanced",
    pdf: `${BASE_URL}/assets/certificates/react-advanced.pdf`,
    verifyUrl: "https://credentials.meta.com",
    credentialId: "REACT-ADV-45678",
    description: "Advanced React concepts including hooks, context API, and performance optimization.",
    tags: ["React", "Frontend", "JavaScript"]
  },
  {
    id: 4,
    title: "Innovation Excellence Award",
    issuer: "Digital Creators Guild",
    date: "June 2023",
    type: "award",
    image: "https://placehold.co/600x400/764ba2/white?text=Innovation+Award",
    pdf: `${BASE_URL}/assets/awards/innovation-excellence.pdf`,
    verifyUrl: "https://digitalcreatorsguild.org/awards",
    credentialId: "INNOV-2023-987",
    description: "Recognized for innovative approach to solving complex problems in digital solutions.",
    tags: ["Innovation", "Problem Solving", "Technology"]
  },
  {
    id: 5,
    title: "Node.js Backend Certification",
    issuer: "OpenJS Foundation",
    date: "April 2023",
    type: "certificate",
    image: "https://placehold.co/600x400/667eea/white?text=Node.js+Backend",
    pdf: `${BASE_URL}/assets/certificates/nodejs-backend.pdf`,
    verifyUrl: "https://openjsf.org/certification",
    credentialId: "NODE-BE-321654",
    description: "Certification in building scalable backend systems with Node.js and Express.",
    tags: ["Node.js", "Backend", "API"]
  },
  {
    id: 6,
    title: "UI/UX Design Excellence",
    issuer: "Design Masters Association",
    date: "February 2023",
    type: "award",
    image: "https://placehold.co/600x400/764ba2/white?text=UI%2FUX+Excellence",
    pdf: `${BASE_URL}/assets/awards/ui-ux-excellence.pdf`,
    verifyUrl: "https://designmasters.org/awards",
    credentialId: "UIUX-2023-654",
    description: "Award for exceptional user interface and experience design in web applications.",
    tags: ["UI/UX", "Design", "User Experience"]
  },
  {
    id: 7,
    title: "Google Cloud Professional Developer",
    issuer: "Google Cloud",
    date: "January 2024",
    type: "certificate",
    image: "https://placehold.co/600x400/667eea/white?text=Google+Cloud",
    pdf: `${BASE_URL}/assets/certificates/google-cloud-developer.pdf`,
    verifyUrl: "https://googlecloud.certential.com",
    credentialId: "GC-PD-789123",
    description: "Professional certification for Google Cloud developers demonstrating cloud architecture skills.",
    tags: ["Google Cloud", "Cloud", "Development"]
  }
];