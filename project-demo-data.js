window.projectDemoCatalog = {
  "online-sales-management-system": {
    title: "Online Sales & Inventory Management System",
    eyebrow: "Interactive online walkthrough",
    subtitle: "A portfolio-friendly demo page for the full ASP.NET Core MVC project stored inside this repository.",
    description: "This project combines a public storefront, a role-aware admin dashboard, inventory workflows, invoicing, expenses, reports, and database seeding. Because GitHub Pages cannot execute ASP.NET Core and SQL Server, this page acts as the online demo hub and surfaces the real source files, architecture, modules, and live UI assets directly from the project folder.",
    period: "12/2025 - 01/2026",
    stackLabel: ".NET 8, EF Core, SQL Server",
    status: "Source-ready demo",
    image: "projects/Online Sales Management System/wwwroot/assets/images/hero/slider-bg1.jpg",
    imageAlt: "Online Sales Management System storefront hero banner",
    visualNoteTitle: "Why this demo is online",
    visualNote: "The full source is public in this site repository, while the backend runtime still needs a real ASP.NET Core host and SQL Server.",
    repoUrl: "https://github.com/Alucard30Dec/Online-Sales-Management-System",
    siteRepoUrl: "https://github.com/Alucard30Dec/Alucard30Dec.github.io/tree/main/projects/Online%20Sales%20Management%20System",
    backUrl: "index.html#projects",
    primaryCta: { label: "Open GitHub Repository", url: "https://github.com/Alucard30Dec/Online-Sales-Management-System" },
    secondaryCta: { label: "Back To Portfolio", url: "index.html#projects" },
    tags: [
      "Public storefront",
      "Admin dashboard",
      "Permission system",
      "Inventory + stock movement",
      "Invoices + purchases",
      "Reporting + exports"
    ],
    stats: [
      { value: "17", label: "Permission modules", note: "Dashboard, products, stock, purchases, invoices, reports, settings, and more." },
      { value: "18", label: "Admin controllers", note: "The admin area is split into focused controllers for each workflow module." },
      { value: "3", label: "Seeded staff roles", note: "Super Admin, Warehouse Staff, and Sales Staff are provisioned in the seeder." },
      { value: "1", label: "Unified MVC app", note: "Storefront and back office live in one codebase with shared domain models." }
    ],
    highlights: [
      {
        title: "Storefront + back office in one solution",
        text: "The same application serves the public shopping interface and the permission-based admin area, keeping the business entities, services, and data access consistent across both sides."
      },
      {
        title: "Operational workflows are modeled end to end",
        text: "Products, units, brands, categories, suppliers, purchases, invoices, customers, expenses, employees, attendance, stock movement, and reporting are wired together as one business system."
      },
      {
        title: "Permission policies are code-driven",
        text: "Authorization is built around a module.action permission model with a custom policy provider, transformation layer, and UI feature matrix support."
      },
      {
        title: "Demo data is reproducible",
        text: "Migrations and seeders bootstrap the database, default users, and sample business data so the project can be tested locally without manual setup."
      }
    ],
    gallery: [
      {
        src: "projects/Online Sales Management System/wwwroot/assets/images/hero/slider-bg1.jpg",
        alt: "Storefront hero banner",
        caption: "Public storefront hero section pulled from the real MVC project assets."
      },
      {
        src: "projects/Online Sales Management System/wwwroot/assets/images/products/product-1.jpg",
        alt: "Product showcase",
        caption: "Product catalog visuals used by the storefront browsing experience."
      },
      {
        src: "projects/Online Sales Management System/wwwroot/uploads/products/20260114095344_e4a80494831c45e081a1382e3cee2bbf.webp",
        alt: "Uploaded product",
        caption: "Uploaded product media from the app's persisted demo content."
      }
    ],
    modules: [
      {
        title: "Application startup and database bootstrap",
        text: "The pipeline configures MVC, EF Core, Identity, permission-based authorization, auto migration, and seed execution before serving the app.",
        files: [
          { label: "Program.cs", url: "projects/Online Sales Management System/Program.cs" },
          { label: "appsettings.json", url: "projects/Online Sales Management System/appsettings.json" },
          { label: "ApplicationDbContext.cs", url: "projects/Online Sales Management System/Data/ApplicationDbContext.cs" }
        ]
      },
      {
        title: "Seeded roles, users, and business data",
        text: "The data layer creates units, categories, brands, admin groups, permissions, default users, suppliers, customers, and other operational data for a repeatable demo environment.",
        files: [
          { label: "DbSeeder.cs", url: "projects/Online Sales Management System/Data/DbSeeder.cs" },
          { label: "DbInitializer.cs", url: "projects/Online Sales Management System/Data/DbInitializer.cs" },
          { label: "DemoDataSeeder.cs", url: "projects/Online Sales Management System/Data/DemoDataSeeder.cs" }
        ]
      },
      {
        title: "Custom permission and role management",
        text: "Authorization is represented as module.action permissions and enforced through a custom policy provider, authorization handler, permission service, and claims transformation.",
        files: [
          { label: "PermissionConstants.cs", url: "projects/Online Sales Management System/Services/Security/PermissionConstants.cs" },
          { label: "PermissionPolicyProvider.cs", url: "projects/Online Sales Management System/Services/Security/PermissionPolicyProvider.cs" },
          { label: "PermissionClaimsTransformation.cs", url: "projects/Online Sales Management System/Security/PermissionClaimsTransformation.cs" }
        ]
      },
      {
        title: "Storefront experience",
        text: "The public side exposes a homepage with trending products and categories plus a product list and detail flow built with Razor views.",
        files: [
          { label: "HomeController.cs", url: "projects/Online Sales Management System/Controllers/HomeController.cs" },
          { label: "Views/Home/Index.cshtml", url: "projects/Online Sales Management System/Views/Home/Index.cshtml" },
          { label: "Views/Product/Index.cshtml", url: "projects/Online Sales Management System/Views/Product/Index.cshtml" }
        ]
      },
      {
        title: "Admin dashboard and daily operations",
        text: "The admin area includes dashboard summaries, quick actions, product management, purchases, invoices, expenses, customers, suppliers, employees, attendance, and settings.",
        files: [
          { label: "DashboardController.cs", url: "projects/Online Sales Management System/Areas/Admin/Controllers/DashboardController.cs" },
          { label: "Dashboard view", url: "projects/Online Sales Management System/Areas/Admin/Views/Dashboard/Index.cshtml" },
          { label: "Admin layout", url: "projects/Online Sales Management System/Areas/Admin/Views/Shared/_Layout.cshtml" }
        ]
      },
      {
        title: "Business services and reporting",
        text: "Stock updates and invoice totals are encapsulated in dedicated services, while reports and exports build on the domain and persistence layers.",
        files: [
          { label: "StockService.cs", url: "projects/Online Sales Management System/Services/Inventory/StockService.cs" },
          { label: "InvoiceTotalsService.cs", url: "projects/Online Sales Management System/Services/Sales/InvoiceTotalsService.cs" },
          { label: "ReportsController.cs", url: "projects/Online Sales Management System/Areas/Admin/Controllers/ReportsController.cs" }
        ]
      }
    ],
    architecture: [
      {
        badge: "01",
        title: "Presentation layer",
        text: "Razor views and controllers are split between the public area and the admin area, so the recruiter can inspect the UI flow separately from the business logic."
      },
      {
        badge: "02",
        title: "Application and domain logic",
        text: "Services coordinate invoice totals, stock movement, permissions, and workflow rules while domain entities keep the data model explicit and reusable."
      },
      {
        badge: "03",
        title: "Persistence and migration",
        text: "Entity Framework Core handles SQL Server access, migrations, and seeding, which makes the project reproducible for local testing and future deployment."
      },
      {
        badge: "04",
        title: "Security model",
        text: "ASP.NET Core Identity authenticates staff users and custom authorization policies gate module access in the admin area."
      }
    ],
    credentials: [
      {
        title: "Seeded admin roles",
        text: "The source code seeds Super Admin, Warehouse Staff, and Sales Staff accounts for local testing. The public demo page does not expose the passwords, but the account creation logic is visible in the seeder."
      },
      {
        title: "Database expectation",
        text: "The current configuration targets SQL Server and runs migrations automatically at startup, so a real live deployment needs a database plus ASP.NET Core hosting."
      },
      {
        title: "Portfolio-friendly delivery",
        text: "This online page gives recruiters a working destination behind the Demo button while keeping the real implementation files one click away."
      }
    ],
    sourceIntro: "Important source entry points from the local `projects/Online Sales Management System` folder.",
    sourceFiles: [
      {
        type: "Bootstrapping",
        title: "Program.cs",
        text: "Configures MVC, EF Core, Identity, permission services, migrations, and route mapping.",
        links: [
          { label: "Open local file", url: "projects/Online Sales Management System/Program.cs" },
          { label: "Open folder on GitHub", url: "https://github.com/Alucard30Dec/Alucard30Dec.github.io/tree/main/projects/Online%20Sales%20Management%20System" }
        ]
      },
      {
        type: "Data and seeding",
        title: "DbSeeder.cs",
        text: "Seeds roles, users, categories, brands, and sample business records to make the project demo-ready.",
        links: [
          { label: "Open local file", url: "projects/Online Sales Management System/Data/DbSeeder.cs" },
          { label: "Open migrations", url: "projects/Online Sales Management System/Migrations/20260114090005_Init.cs" }
        ]
      },
      {
        type: "Authorization",
        title: "Permission constants and policies",
        text: "Defines the module.action permission model and the security primitives used across the admin area.",
        links: [
          { label: "PermissionConstants.cs", url: "projects/Online Sales Management System/Services/Security/PermissionConstants.cs" },
          { label: "Policy provider", url: "projects/Online Sales Management System/Services/Security/PermissionPolicyProvider.cs" }
        ]
      },
      {
        type: "UI flow",
        title: "Dashboard and storefront views",
        text: "Shows how the public storefront and admin dashboard are rendered with Razor and connected to controller data.",
        links: [
          { label: "Home view", url: "projects/Online Sales Management System/Views/Home/Index.cshtml" },
          { label: "Dashboard view", url: "projects/Online Sales Management System/Areas/Admin/Views/Dashboard/Index.cshtml" }
        ]
      }
    ],
    deliveryNote: {
      title: "Hosting note",
      body: "GitHub Pages can host this walkthrough page and the raw source files, but it cannot execute the actual ASP.NET Core runtime. To make the full application live, the next deployment step would be Azure App Service, Render, a VPS, or Docker hosting paired with SQL Server."
    }
  },
  "private-clinic-management-system": {
    title: "Private Clinic Management System",
    eyebrow: "Online project summary",
    subtitle: "A recruiter-facing demo page for the clinic management project referenced in the portfolio.",
    description: "This project is presented here as an online summary page because the full source is maintained in a separate repository, not inside the current portfolio site's `projects` folder. The demo page still gives a complete overview of the system's roles, workflows, scheduling constraints, and technical scope so the Demo button leads somewhere meaningful.",
    period: "09/2025 - 10/2025",
    stackLabel: "ASP.NET MVC 5, EF6, SQL Server",
    status: "Summary demo",
    image: "Images/PrivateClinicManagementSystem.jpg",
    imageAlt: "Private Clinic Management System",
    visualNoteTitle: "Source location",
    visualNote: "The main source code lives in its own repository, so this page focuses on the architecture and workflow story.",
    repoUrl: "https://github.com/Alucard30Dec/Private-Clinic",
    siteRepoUrl: "https://github.com/Alucard30Dec/Private-Clinic",
    backUrl: "index.html#projects",
    primaryCta: { label: "Open GitHub Repository", url: "https://github.com/Alucard30Dec/Private-Clinic" },
    secondaryCta: { label: "Back To Portfolio", url: "index.html#projects" },
    tags: [
      "Admin",
      "Receptionist",
      "Doctor",
      "Patient",
      "Booking rules",
      "Schedule validation"
    ],
    stats: [
      { value: "4", label: "User roles", note: "Admin, Receptionist, Doctor, and Patient workflows are separated clearly." },
      { value: "1", label: "Booking per day rule", note: "Validation prevents duplicate appointments for the same patient in one day." },
      { value: "24/7", label: "Time-aware scheduling", note: "The project handles time-slot availability and overlapping appointment validation." },
      { value: "100%", label: "Workflow focused", note: "The system centers on appointment orchestration and clinic operations." }
    ],
    highlights: [
      {
        title: "Validation-heavy appointment engine",
        text: "Scheduling logic checks overlap, slot availability, and one-booking-per-day rules before confirming appointments."
      },
      {
        title: "Role-based clinic operations",
        text: "Each user type sees different workflows, from booking and reception handling to doctor schedules and admin maintenance."
      },
      {
        title: "Patient experience support",
        text: "Patients can review booking history, cancellations, and service information in a more organized flow."
      },
      {
        title: "Operational data quality",
        text: "The system uses validation rules, soft delete logic, and UTC/local time handling to reduce scheduling inconsistencies."
      }
    ],
    gallery: [
      {
        src: "Images/PrivateClinicManagementSystem.jpg",
        alt: "Clinic management system preview",
        caption: "Portfolio preview image for the clinic management project."
      }
    ],
    modules: [
      {
        title: "Appointment booking",
        text: "Patients can request appointments while the system validates date, time-slot, and duplicate-booking constraints.",
        files: [
          { label: "Open project repo", url: "https://github.com/Alucard30Dec/Private-Clinic" }
        ]
      },
      {
        title: "Reception and doctor scheduling",
        text: "Receptionists coordinate bookings while doctors operate inside controlled schedule windows and service assignments.",
        files: [
          { label: "View source repository", url: "https://github.com/Alucard30Dec/Private-Clinic" }
        ]
      },
      {
        title: "Admin configuration",
        text: "Admins manage doctors, services, work shifts, and supporting clinic metadata for the rest of the workflow.",
        files: [
          { label: "View source repository", url: "https://github.com/Alucard30Dec/Private-Clinic" }
        ]
      }
    ],
    architecture: [
      {
        badge: "01",
        title: "ASP.NET MVC 5 foundation",
        text: "The project uses the classic MVC architecture with server-rendered views and a familiar .NET stack for structured business applications."
      },
      {
        badge: "02",
        title: "Role-aware workflows",
        text: "User journeys are shaped by role, which keeps booking, approval, and schedule actions separated by responsibility."
      },
      {
        badge: "03",
        title: "Validation-first scheduling",
        text: "Scheduling rules are central to the app and help prevent collisions, invalid slots, and duplicate patient bookings."
      },
      {
        badge: "04",
        title: "Operational consistency",
        text: "Soft delete and time conversion logic protect data integrity for appointment and availability management."
      }
    ],
    credentials: [
      {
        title: "Source scope",
        text: "This portfolio repository does not contain the clinic source folder, so the demo page points back to the dedicated GitHub repository."
      },
      {
        title: "Recruiter-ready context",
        text: "The page still captures the responsibilities, key validations, and technical decisions behind the application."
      },
      {
        title: "Easy extension later",
        text: "If you later add the clinic project into this portfolio repository, this same demo page can be upgraded with local file links just like the sales system."
      }
    ],
    sourceIntro: "The clinic project source is hosted externally, so the key links below point to the dedicated repository.",
    sourceFiles: [
      {
        type: "Repository",
        title: "Private Clinic GitHub repository",
        text: "Use the main repository as the source of truth for controllers, views, models, and scheduling logic.",
        links: [
          { label: "Open repository", url: "https://github.com/Alucard30Dec/Private-Clinic" }
        ]
      }
    ],
    deliveryNote: {
      title: "Repository note",
      body: "If you want this Demo button to expose raw local source files too, add the clinic project folder into this portfolio repository's `projects` directory and reuse the same data structure used for the sales system above."
    }
  }
};
