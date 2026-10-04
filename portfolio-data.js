(function (global) {
  "use strict";

  var DEFAULT_PORTFOLIO_DATA = {
    site: {
      title: "Hoang Van Thien | .NET Backend / Full-stack Developer",
      ownerName: "Hoang Van Thien"
    },
    navigation: {
      links: [
        { label: "Experience", target: "#experience" },
        { label: "Projects", target: "#projects" },
        { label: "Skills", target: "#skills" },
        { label: "Profile", target: "#about" },
        { label: "Awards", target: "#achievements" },
        { label: "Contact", target: "#contact" }
      ]
    },
    hero: {
      avatar: "Images/ProfileImage.png",
      avatarAlt: "Hoang Van Thien",
      status: "Open to Fresher / Junior .NET opportunities",
      introLabel: "Fresher Software Engineer",
      name: "Hoang Van Thien",
      role: ".NET Backend / Full-stack Developer",
      tagline: "Software Engineering student with hands-on experience building warehouse and business applications using C#/.NET, ASP.NET Core, Blazor, React, and relational databases.",
      actions: [
        { label: "View Projects", url: "#projects", style: "primary", newTab: false },
        { label: "Download CV", url: "CV_HOANGVANTHIEN.pdf", style: "secondary", newTab: false, download: true }
      ],
      stats: [
        { value: "4", label: "Selected projects" },
        { value: ".NET 8", label: "Core platform" },
        { value: "3.16/4", label: "University GPA" }
      ],
      socialLinks: [
        { icon: "github", label: "GitHub", url: "https://github.com/Alucard30Dec" },
        { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/thi%C3%AAn-ho%C3%A0ng-9427732b5/" }
      ]
    },
    about: {
      kicker: "Profile",
      title: "Profile & Education",
      image: "Images/ProfileImage1.png",
      imageAlt: "Hoang Van Thien",
      educationTitle: "B.S. in Software Engineering",
      educationSchool: "Ho Chi Minh City University of Economics and Finance (UEF)",
      educationDegree: "GPA: 3.16/4.00 | 09/2022 - Present | All coursework completed",
      paragraphs: [
        "Completed a full-stack development internship at TKSolution, working on warehouse master data, inbound and outbound transactions, Excel processing, SQL transactions, validation, caching, stored procedures, and reporting.",
        "Interested in Fresher / Junior .NET roles focused on backend engineering, database-driven systems, enterprise applications, and practical full-stack product development."
      ],
      highlights: [
        {
          title: "Professional experience",
          description: "TKSolution Full-stack Developer Intern, 04/2026 - 09/2026."
        },
        {
          title: "Core stack",
          description: "C#, .NET 8, ASP.NET Core, Blazor, EF Core, SQL Server."
        },
        {
          title: "Engineering focus",
          description: "Business workflows, transactions, validation, authorization, caching, and reporting."
        },
        {
          title: "Location",
          description: "Ho Chi Minh City, Vietnam."
        }
      ]
    },
    experience: {
      kicker: "Experience",
      title: "Professional Experience",
      items: [
        {
          role: "Full-stack Developer Intern",
          company: "TKSolution",
          project: "Warehouse Management System (WMS)",
          period: "04/2026 - 09/2026",
          location: "Ho Chi Minh City, Vietnam",
          bullets: [
            "Developed master-data, inbound, and outbound warehouse modules using C#/.NET 8, Blazor Server, Telerik UI, and SQL Server within an Entity-Controller-Cache-Razor architecture.",
            "Implemented Excel import/export workflows with cached master-data lookups, row-level validation, SQL transactions, commit/rollback handling, error reporting, action-history tracking, and cache synchronization.",
            "Implemented and customized SQL Server stored-procedure and data-access logic for duplicate documents, master-data validation, transaction-date rules, and inventory availability by warehouse, product, and transaction date.",
            "Integrated Telerik Reporting for inbound/outbound document previews and analyzed Ryobi and Interfood warehouse processes including LPN, FEFO, putaway, picking, hold, stocktaking, damaged goods, and returns."
          ]
        }
      ]
    },
    projects: {
      kicker: "Selected work",
      title: "Project Experience",
      description: "A focused selection of projects that best represents my current .NET, full-stack, warehouse, and automation experience.",
      items: [
        {
          title: "Construction Payment Request Management System",
          period: "03/2026 - 04/2026",
          summary: "Full-stack internal workflow platform for construction payment requests covering suppliers, projects, contracts, invoices, attachments, accounting confirmations, and multi-step approvals.",
          tech: [
            "React, TypeScript, Ant Design, and Vite",
            ".NET 8 Web API, Entity Framework Core, and JWT authorization",
            "Department-scope and payment-threshold approval rules",
            "Audit logging, health checks, and configurable database providers"
          ],
          image: "Images/ConstructionPaymentRequest.jpg",
          coverLabel: "Payment Workflow",
          coverTheme: "workflow",
          tags: ["React", "TypeScript", ".NET 8", "EF Core", "JWT"],
          github: "https://github.com/Alucard30Dec/Construction-Payment-Request",
          demo: "https://construction-payment-request.onrender.com"
        },
        {
          title: "Online Sales & Inventory Management System",
          period: "12/2025 - 01/2026",
          summary: "Full-stack sales and inventory system combining a public storefront with a permission-based admin dashboard and transaction-driven inventory workflows.",
          tech: [
            "C#, ASP.NET Core MVC (.NET 8), EF Core, and SQL Server",
            "ASP.NET Core Identity with role and permission policies",
            "Purchasing, invoicing, stock movement, low-stock monitoring, expenses, and reporting",
            "Database migrations, seeding, and Excel/report exports"
          ],
          image: "",
          coverLabel: "Sales & Inventory",
          coverTheme: "commerce",
          tags: ["ASP.NET Core MVC", "EF Core", "SQL Server", "Identity"],
          github: "https://github.com/Alucard30Dec/Online-Sales-Management-System",
          demo: ""
        },
        {
          title: "Warehouse Management Foundation Application",
          period: "04/2026",
          summary: "A 17-function warehouse management training application covering master data, warehouse authorization, inbound/outbound transactions, document printing, and inventory reporting.",
          tech: [
            "C#, .NET 8, Blazor, and Entity Framework Core 8",
            "PostgreSQL / Npgsql with EF Core migrations and relationships",
            "Header-detail inbound and outbound workflows with validation and uniqueness rules",
            "ClosedXML / OpenXML exports, receipt/issue printing, and stock reports"
          ],
          image: "",
          coverLabel: "17-Function WMS",
          coverTheme: "warehouse",
          tags: ["Blazor", ".NET 8", "PostgreSQL", "ClosedXML"],
          github: "",
          demo: ""
        },
        {
          title: "Facebook Group Posting Automation Tool",
          period: "2026",
          summary: "Windows automation tool for scanning and filtering Facebook groups, managing reusable post content and images, and scheduling recurring posting workflows.",
          tech: [
            "Node.js, Express, Playwright Core, and Chrome automation",
            "Concurrent worker tabs, persistent posting state, and duplicate-post safeguards",
            "Activity Log verification with checkpoint, manual-review, partial, and error outcomes",
            ".NET 8 Windows system-tray host plus automated test coverage for scheduling, concurrency, verification, state management, and browser behavior"
          ],
          image: "",
          coverLabel: "Browser Automation",
          coverTheme: "automation",
          tags: ["Node.js", "Playwright", ".NET 8", "Automation"],
          github: "",
          demo: ""
        }
      ]
    },
    skills: {
      kicker: "Capabilities",
      title: "Technical Skills",
      groups: [
        {
          title: "Programming Languages",
          items: [
            "C#",
            "SQL",
            "JavaScript",
            "TypeScript",
            "HTML/CSS"
          ]
        },
        {
          title: ".NET & Backend",
          items: [
            ".NET 8",
            "ASP.NET Core MVC",
            "ASP.NET Core Web API",
            "Blazor Server / Razor",
            "Entity Framework Core",
            "ASP.NET Core Identity",
            "JWT",
            "REST APIs"
          ]
        },
        {
          title: "Data & Business Logic",
          items: [
            "SQL Server",
            "PostgreSQL",
            "MySQL / TiDB",
            "SQLite",
            "Stored Procedures",
            "Views",
            "Relational Database Design",
            "Transactions / Commit / Rollback",
            "Caching / Cache Synchronization"
          ]
        },
        {
          title: "Frontend & Engineering Tools",
          items: [
            "React",
            "Ant Design",
            "Telerik UI for Blazor",
            "Bootstrap",
            "Git / GitHub",
            "ClosedXML / OpenXML",
            "Telerik Reporting",
            "Playwright",
            "Debugging"
          ]
        }
      ]
    },
    achievements: {
      kicker: "Recognition",
      title: "Awards",
      groups: [
        {
          title: "FIT Code Contest",
          items: [
            "Second Prize, FIT Code Contest 2025, UEF (October 2025)",
            "Third Prize, FIT Code Contest 2024, UEF (September 2024)",
            "Third Prize, FIT Code Contest 2023, UEF (September 2023)"
          ],
          links: [
            {
              label: "FIT Code Contest 2025",
              url: "https://www.uef.edu.vn/kcntt/tin-tuc-su-kien/sinh-vien-uef-toa-sang-tai-nang-lap-trinh-tai-vong-chung-ket-fit-code-contest-2025-33108"
            },
            {
              label: "FIT Code Contest 2024",
              url: "https://www.uef.edu.vn/tin-tuc-su-kien/cuoc-thi-fit-code-contest-2024-khep-lai-mo-ra-nhieu-co-hoi-moi-cho-uefers-trong-tuong-lai-27357"
            },
            {
              label: "FIT Code Contest 2023",
              url: "https://www.uef.edu.vn/tin-tuc-su-kien/vong-chung-ket-fit-code-contest-2023-khep-lai-voi-nhung-man-tranh-tai-can-nao-cua-uefers-21866"
            }
          ]
        },
        {
          title: "Mathematics",
          items: [
            "Third Prize, UEF Math Olympiad 2023 (November 2023)"
          ],
          links: [
            {
              label: "UEF Math Olympiad 2023",
              url: "https://www.uef.edu.vn/tin-tuc-su-kien/chung-ket-olympic-toan-uef-nam-2023-tim-ra-quan-quan-xuat-sac-cua-mua-dau-tien-22727"
            }
          ]
        }
      ]
    },
    contact: {
      title: "Let's Build Something Useful",
      description: "I am currently looking for a Fresher / Junior .NET Developer role focused on backend or full-stack development.",
      methods: [
        {
          type: "email",
          label: "hoangvanthien301203@gmail.com",
          url: "mailto:hoangvanthien301203@gmail.com"
        },
        {
          type: "phone",
          label: "+84 379 135 123",
          url: "tel:+84379135123"
        },
        {
          type: "github",
          label: "GitHub / Alucard30Dec",
          url: "https://github.com/Alucard30Dec"
        },
        {
          type: "linkedin",
          label: "LinkedIn / thien-hoang",
          url: "https://www.linkedin.com/in/thi%C3%AAn-ho%C3%A0ng-9427732b5/"
        }
      ]
    },
    footer: {
      copyright: "Copyright 2026 Hoang Van Thien. All Rights Reserved.",
      portfolioLabel: "Portfolio:",
      portfolioUrl: "https://alucard30dec.github.io/"
    }
  };

  function cloneData(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function getPortfolioData() {
    return cloneData(DEFAULT_PORTFOLIO_DATA);
  }

  global.PortfolioStore = {
    getPortfolioData: getPortfolioData
  };
})(window);
