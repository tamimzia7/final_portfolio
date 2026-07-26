export interface Project {
  slug: string;
  title: string;
  description: string;
  shortDesc: string;
  longDescription: string;
  category: "Laravel" | "Full Stack" | "React" | "Backend" | "Frontend";
  tags: string[];
  image?: string;
  liveUrl: string;
  githubUrl: string;
  problem: string;
  solution: string;
  features: string[];
  architecture: string;
  folderStructure?: string;
  databaseSchema?: string;
  authFlow?: string;
  apiEndpoints?: string[];
  adminFeatures?: string[];
  performanceDetails?: string;
  securityDetails?: string;
  challenges: string[];
  lessons: string[];
  futureImprovements?: string[];
}

export const projects: Project[] = [
  {
    slug: "boutique-ecommerce",
    title: "Boutique E-commerce Platform",
    description: "Complete Laravel-based fashion e-commerce platform with authentication, product management, cart, wishlist, orders, reviews, and admin dashboard.",
    shortDesc: "Laravel fashion e-commerce platform",
    longDescription: "A full-featured fashion e-commerce platform built entirely with Laravel and Blade. The system includes customer-facing shopping features — product browsing, cart, wishlist, checkout, and reviews — alongside a comprehensive admin dashboard for managing products, orders, and customers.",
    category: "Laravel",
    tags: ["Laravel", "PHP", "MySQL", "Blade", "JavaScript"],
    liveUrl: "#",
    githubUrl: "#",
    problem: "Fashion retailers need a tailored e-commerce solution that handles unique product attributes (sizes, colors, styles) while providing a seamless shopping experience and robust backend management.",
    solution: "Built a complete Laravel e-commerce platform with Blade templating, covering the full shopping lifecycle — from product discovery to order fulfillment — with a powerful admin dashboard for business management.",
    features: [
      "User authentication with Laravel Breeze",
      "Product catalog with category filtering",
      "Shopping cart with session persistence",
      "Wishlist for saved items",
      "Order processing with status workflow",
      "Customer review and rating system",
      "Admin dashboard with product CRUD",
      "Order management and customer management",
    ],
    architecture: "Full Laravel monolith with Blade frontend, MySQL database with normalized schema for product variants (size, color), Laravel authentication, and service layer for business logic.",
    folderStructure: "app/Http/Controllers/, app/Models/, app/Services/, app/Http/Requests/, resources/views/, database/migrations/, routes/web.php",
    databaseSchema: "Users, Products, ProductVariants, Categories, Carts, CartItems, Wishlists, Orders, OrderItems, Reviews, Addresses",
    authFlow: "Laravel Breeze authentication with email verification, password reset, and role-based admin access via middleware.",
    apiEndpoints: [],
    adminFeatures: [
      "Product management with image upload",
      "Order management with status tracking",
      "Customer management with order history",
      "Review moderation",
      "Inventory tracking",
    ],
    performanceDetails: "Optimized with eager loading, pagination, and database indexing. Blade caching for frequently accessed views.",
    securityDetails: "Laravel's built-in CSRF protection, XSS prevention via Blade escaping, SQL injection prevention via Eloquent, input validation through Form Requests.",
    challenges: [
      "Handling product variants (sizes, colors, stock) in a normalized schema",
      "Implementing persistent cart across sessions",
      "Building a review system with validation and moderation",
    ],
    lessons: [
      "Blade components make UI reuse clean and maintainable",
      "Eloquent relationships simplify complex product variant queries",
      "Form Requests keep validation organized and reusable",
    ],
    futureImprovements: ["Payment gateway integration", "Multi-language support", "Advanced inventory management"],
  },
  {
    slug: "aura-collection",
    title: "AURA Collection",
    description: "Luxury saree e-commerce platform with premium UI, wishlist, secure checkout, and advanced admin management.",
    shortDesc: "Laravel luxury e-commerce platform",
    longDescription: "AURA Collection is a luxury saree e-commerce platform built on a robust Laravel backend with TailwindCSS frontend. The system delivers a premium shopping experience with product showcases, wishlist management, secure checkout, and a comprehensive admin dashboard for inventory and order management.",
    category: "Laravel",
    tags: ["Laravel", "PHP", "MySQL", "TailwindCSS"],
    liveUrl: "#",
    githubUrl: "#",
    problem: "Luxury saree retailers need an elegant online storefront that reflects premium brand values while handling complex product attributes unique to traditional wear.",
    solution: "Built a Laravel-powered e-commerce platform with TailwindCSS for a premium, responsive design. The backend handles product management, wishlist, secure checkout, and a full admin dashboard.",
    features: [
      "Laravel authentication with admin/user roles",
      "Product catalog with rich filtering",
      "Wishlist for personalized shopping",
      "Secure checkout process",
      "Admin dashboard for product and order management",
      "Customer management with order history",
      "Inventory tracking",
    ],
    architecture: "Laravel monolith with TailwindCSS frontend, MySQL database, service-repository pattern for business logic, and middleware-based role authorization.",
    databaseSchema: "Users, Products, Categories, Wishlists, Orders, OrderItems, Addresses",
    authFlow: "Laravel authentication with role-based authorization using middleware gates.",
    adminFeatures: [
      "Product CRUD with image gallery management",
      "Order management with status pipeline",
      "Customer management",
      "Inventory and stock tracking",
    ],
    challenges: [
      "Designing product attributes that capture saree-specific details",
      "Building a wishlist that persists across sessions",
    ],
    lessons: [
      "TailwindCSS enables rapid premium UI development",
      "Service pattern keeps e-commerce business logic organized",
    ],
  },
  {
    slug: "visicore",
    title: "VisiCore",
    description: "Smart Field Visit & Employee Management System with GPS tracking, attendance, visit evidence, meeting notes, and reporting.",
    shortDesc: "Laravel field visit management system",
    longDescription: "VisiCore is a comprehensive field visit and employee management system built on Laravel. It enables organizations to track field employees with GPS check-ins, manage visit schedules, capture visit evidence (photos/notes), and generate detailed reports for management review.",
    category: "Laravel",
    tags: ["Laravel", "PHP", "MySQL"],
    liveUrl: "#",
    githubUrl: "#",
    problem: "Organizations with field staff struggle to track visit compliance, attendance accuracy, and reporting. Manual processes lead to inconsistent data and lack of accountability.",
    solution: "Built a Laravel-based system that automates field visit tracking with GPS verification, digital attendance, evidence capture, and comprehensive reporting dashboards.",
    features: [
      "GPS-based check-in for field visits",
      "Employee attendance tracking",
      "Visit evidence capture (photos and notes)",
      "Meeting notes and follow-up management",
      "Reporting dashboard for management",
      "Role-based access (employee, manager, admin)",
      "Visit schedule management",
    ],
    architecture: "Laravel monolith with MySQL database, GPS coordinate validation, service-layer for business logic, and role-based middleware authorization.",
    databaseSchema: "Users, Roles, Visits, Attendances, VisitEvidences, MeetingNotes, Reports, Schedules",
    authFlow: "Laravel authentication with role-based middleware for employee, manager, and admin access levels.",
    adminFeatures: [
      "Visit report generation and export",
      "Employee performance tracking",
      "Attendance summary dashboard",
      "Schedule management",
    ],
    challenges: [
      "Implementing reliable GPS validation for check-in accuracy",
      "Designing a scalable visit evidence storage system",
      "Building real-time visit tracking without overwhelming the server",
    ],
    lessons: [
      "Laravel's middleware system makes role-based access clean and reusable",
      "GPS coordinate validation requires careful handling of edge cases",
    ],
  },
  {
    slug: "meal-management",
    title: "Meal Management System",
    description: "Company meal management platform with role-based authentication, meal tracking, monthly reports, and cost analysis.",
    shortDesc: "Laravel corporate meal management",
    longDescription: "A corporate meal management platform built with Laravel that helps companies manage employee meal programs. The system includes role-based access for admins and employees, daily meal tracking, monthly consumption reports, and cost analysis dashboards.",
    category: "Laravel",
    tags: ["Laravel", "PHP", "MySQL"],
    liveUrl: "#",
    githubUrl: "#",
    problem: "Companies providing meal benefits struggle to track usage, manage costs, and generate accurate reports. Manual tracking leads to billing discrepancies and inefficient resource allocation.",
    solution: "Built a Laravel platform that digitizes the entire meal management process — from employee meal selection to monthly cost analysis — with role-based dashboards for both employees and administrators.",
    features: [
      "Role-based authentication (admin, employee)",
      "Daily meal tracking and selection",
      "Monthly consumption reports",
      "Cost analysis and budget tracking",
      "Employee meal history",
      "Admin dashboard for management",
      "Meal plan configuration",
    ],
    architecture: "Laravel monolith with MySQL database, service-layer for business logic, role-based middleware, and reporting engine for monthly analytics.",
    databaseSchema: "Users, Roles, Meals, MealSelections, MonthlyReports, CostRecords",
    authFlow: "Laravel authentication with role-based access control using middleware.",
    adminFeatures: [
      "Employee meal tracking dashboard",
      "Monthly report generation",
      "Cost analysis with charts",
      "Meal plan configuration",
    ],
    challenges: [
      "Designing a meal tracking system that handles diverse meal plan types",
      "Building accurate monthly cost aggregation reports",
    ],
    lessons: [
      "Eloquent's aggregate functions simplify complex monthly reporting queries",
      "Role-based middleware keeps authorization clean",
    ],
  },
  {
    slug: "developer-portfolio",
    title: "Developer Portfolio",
    description: "Awwwards-quality portfolio built with Laravel best practices applied to React, TypeScript, and Three.js.",
    shortDesc: "Premium portfolio with Laravel architecture principles",
    longDescription: "This portfolio applies Laravel's architecture principles — clean service layer, repository pattern, and robust validation — to a React + TypeScript frontend with Three.js 3D experiences. It demonstrates how Laravel's backend philosophy translates to any stack.",
    category: "Frontend",
    tags: ["React", "TypeScript", "Three.js", "GSAP", "Laravel Philosophy"],
    liveUrl: "#",
    githubUrl: "#",
    problem: "Developer portfolios often lack both visual polish and architectural substance. They either look great but have messy code, or have clean code but look templated.",
    solution: "Built a portfolio that demonstrates Laravel-inspired clean architecture in a frontend context — with service layers, repositories (data layer abstraction), and component-based modularity — wrapped in a premium, award-worthy visual experience.",
    features: [
      "Clean architecture inspired by Laravel's service pattern",
      "Reusable component library with consistent API",
      "Performance-optimized 3D rendering",
      "Smooth page transitions and animations",
      "SEO-optimized with structured data",
      "Responsive design across all devices",
    ],
    architecture: "React + TypeScript with service layer abstraction, data repositories for API communication, component-based architecture mirroring Laravel's modular design philosophy. Vite for build tooling.",
    challenges: [
      "Translating Laravel's backend architecture patterns to a frontend context",
      "Balancing visual richness with performance budgets",
      "Creating a consistent design system with reusable components",
    ],
    lessons: [
      "Laravel's service pattern translates beautifully to frontend state management",
      "Component libraries benefit from the same modular thinking as Laravel packages",
      "Performance budgets should be set early, like database indexing in Laravel",
    ],
  },
  {
    slug: "ai-study-planner",
    title: "AI Study Planner",
    description: "Smart study scheduler with Laravel-inspired architecture, Python ML integration, and adaptive scheduling.",
    shortDesc: "Adaptive scheduling with Laravel patterns",
    longDescription: "An adaptive study scheduler that applies Laravel's queue and job architecture to ML-powered scheduling. Laravel-inspired command bus pattern handles study session generation, while a Python microservice provides spaced repetition calculations.",
    category: "Full Stack",
    tags: ["React", "Python", "Node", "MongoDB", "Laravel Patterns"],
    liveUrl: "#",
    githubUrl: "#",
    problem: "Students struggle with effective study scheduling, leading to cramming and poor retention. Most study apps lack intelligent scheduling based on learning science.",
    solution: "Built a scheduler that applies Laravel-inspired job/queue architecture to study planning, with a Python ML microservice for spaced repetition optimization.",
    features: ["Adaptive scheduling engine", "Spaced repetition algorithm", "Performance analytics", "Subject-based tracking", "Goal setting and progress tracking"],
    architecture: "Laravel-inspired service architecture with command bus for scheduling operations. Python ML service for spaced repetition calculations.",
    challenges: ["Implementing reliable spaced repetition calculations", "Building an intuitive UI for complex scheduling data"],
    lessons: ["Command bus pattern keeps scheduling logic clean and testable", "ML integration requires careful error handling and fallbacks"],
  },
  {
    slug: "event-management",
    title: "Event Management",
    description: "Full-featured event platform with Laravel admin dashboard, ticket management, and real-time attendee tracking.",
    shortDesc: "Laravel event platform",
    longDescription: "A complete event management solution built on Laravel with a comprehensive admin dashboard, ticket sales system, attendee check-in via QR codes, and real-time analytics. The system handles complex event workflows, multiple ticket tiers, and payment processing.",
    category: "Laravel",
    tags: ["Laravel", "PHP", "MySQL", "React", "Redis", "QR Code", "Stripe"],
    liveUrl: "#",
    githubUrl: "#",
    problem: "Event organizers juggle multiple tools for ticketing, scheduling, and attendee management. Most platforms charge high fees and lack customization for different event types.",
    solution: "Created an all-in-one Laravel platform handling the complete event lifecycle — from promotion and ticket sales to check-in and post-event analytics — with a powerful admin dashboard for organizers.",
    features: [
      "Multi-tier ticket management with Laravel",
      "QR code check-in system",
      "Real-time attendee counting",
      "Email campaigns via Laravel Notifications",
      "Payment processing with Stripe",
      "Admin dashboard with event analytics",
      "Schedule builder with session management",
      "Export attendee data to CSV",
    ],
    architecture: "Laravel backend with Service-Repository pattern, MySQL with optimized event queries, Redis for real-time attendee counting, QR code generation via Laravel packages, and a React admin dashboard.",
    apiEndpoints: [
      "GET /api/events — public event listing with filters",
      "POST /api/tickets/purchase — ticket buying with queue dispatch",
      "GET /api/events/{id}/attendees — organizer attendee list",
      "POST /api/checkin/{ticket} — QR code validation endpoint",
    ],
    adminFeatures: [
      "Event CRUD with rich text editor",
      "Ticket tier management with pricing",
      "Attendee management with check-in status",
      "Sales analytics and reporting",
      "Email campaign builder",
      "Schedule and session management",
    ],
    challenges: [
      "Handling concurrent ticket purchases during high-demand events",
      "Building a flexible check-in system that works offline",
      "Designing a database schema that supports diverse event types",
    ],
    lessons: [
      "Laravel's queue system is essential for reliable ticket processing under load",
      "Database transactions prevent overselling tickets",
      "QR code scanning requires both online and offline fallback strategies",
    ],
    futureImprovements: ["Live streaming integration", "Mobile check-in app with Laravel API", "AI-powered event recommendations"],
  },
];

export const categories = ["All", "Laravel", "Full Stack", "React", "Backend", "Frontend"] as const;

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
