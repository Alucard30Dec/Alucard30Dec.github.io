(function (global) {
  "use strict";

  var STORAGE_KEY = "portfolio.admin.data.v3";

  var DEFAULT_PORTFOLIO_DATA = {
    site: {
      title: "Hoang Van Thien - Portfolio",
      ownerName: "Hoang Van Thien",
      portfolioUrl: "https://alucard30dec.github.io/",
      resumeUrl: "CV_HOANGVANTHIEN.pdf"
    },
    navigation: {
      links: [
        { label: "Summary", target: "#about" },
        { label: "Skills", target: "#skills" },
        { label: "Awards", target: "#achievements" },
        { label: "Projects", target: "#projects" },
        { label: "Contact", target: "#contact" }
      ]
    },
    hero: {
      avatar: "Images/ProfileImage.png",
      avatarAlt: "Hoang Van Thien",
      introLabel: "Software Engineer Intern",
      name: "Hoang Van Thien",
      role: "Backend / Fullstack Web Developer",
      tagline: "Final-year Software Engineering student with hands-on experience building database-driven web applications using C#, ASP.NET MVC/Core, Web API, and SQL Server.",
      actions: [
        { label: "Contact Me", url: "#contact", style: "dark", newTab: false },
        { label: "View Resume", url: "CV_HOANGVANTHIEN.pdf", style: "light", newTab: true },
        { label: "Public CV", url: "cv.html", style: "light", newTab: true }
      ],
      socialLinks: [
        { icon: "github", label: "GitHub", url: "https://github.com/Alucard30Dec" },
        { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/thi%C3%AAn-ho%C3%A0ng-9427732b5/" }
      ]
    },
    about: {
      kicker: "",
      title: "Summary & Education",
      image: "Images/ProfileImage1.png",
      imageAlt: "Hoang Van Thien profile image",
      educationTitle: "Education",
      educationSchool: "Ho Chi Minh City University of Economics and Finance (UEF)",
      educationDegree: "B.S. in Software Engineering | GPA: 3.16/4 | 09/2022 - Present",
      paragraphs: [
        "Final-year Software Engineering student with hands-on experience building database-driven web applications using C#, ASP.NET MVC/Core, Web API, and SQL Server. Strong foundation in backend development, system logic, and maintainable code.",
        "Seeking a Software Engineer Intern or Backend / Fullstack role to contribute to real-world product development while continuing to strengthen practical engineering skills."
      ],
      highlights: [
        {
          title: "Target role",
          description: "Software Engineer Intern, Backend, or Fullstack Web role."
        },
        {
          title: "Core stack",
          description: "C#, ASP.NET Core MVC, ASP.NET MVC 5, Web API, SQL Server."
        },
        {
          title: "Strengths",
          description: "Backend logic, CRUD workflow design, and maintainable code."
        },
        {
          title: "Location",
          description: "Ho Chi Minh City, Vietnam."
        }
      ]
    },
    skills: {
      kicker: "",
      title: "Skills",
      groups: [
        {
          title: "Programming Languages",
          items: [
            "C#",
            "Java",
            "SQL"
          ]
        },
        {
          title: "Backend & Frameworks",
          items: [
            "ASP.NET Core MVC (.NET 8)",
            "ASP.NET MVC 5",
            "Web API",
            "Entity Framework Core",
            "Entity Framework",
            "ASP.NET Core Identity",
            "ASP.NET Identity"
          ]
        },
        {
          title: "Databases & Front-End Basics",
          items: [
            "MS SQL Server",
            "MySQL",
            "T-SQL",
            "Stored Procedures",
            "Relational Database Design",
            "HTML",
            "CSS",
            "JavaScript",
            "Bootstrap",
            "jQuery"
          ]
        },
        {
          title: "Engineering Fundamentals & Tools",
          items: [
            "OOP",
            "Data Structures & Algorithms",
            "Layered Architecture",
            "Dependency Injection",
            "Authentication & Authorization",
            "CRUD Workflow Design",
            "RESTful API",
            "Git",
            "GitHub",
            "Visual Studio"
          ]
        }
      ]
    },
    achievements: {
      kicker: "",
      title: "Awards & Activities",
      groups: [
        {
          title: "Academic Awards",
          items: [
            "Second Prize, FIT Code Contest 2025, UEF (October 2025)",
            "Third Prize, FIT Code Contest 2024, UEF (September 2024)",
            "Third Prize, FIT Code Contest 2023, UEF (September 2023)",
            "Third Prize, UEF Math Olympiad 2023 (November 2023)"
          ],
          links: [
            {
              label: "FIT Code Contest 2025",
              url: "https://www.uef.edu.vn/kcntt/tin-tuc-su-kien/sinh-vien-uef-toa-sang-tai-nang-lap-trinh-tai-vong-chung-ket-fit-code-contest-2025-33108?fbclid=IwY2xjawN1VrJleHRuA2FlbQIxMABicmlkETE1c3NscjhzWjduUHBWSThFAR7FGBLxBRv-XfKKaEVTpappGHB8y-RVOJ8gLONWjXQUbrxJTDW0cilk63lroQ_aem_x3yfTSRIbbM7KQLAhfBAlg"
            },
            {
              label: "FIT Code Contest 2024",
              url: "https://www.uef.edu.vn/tin-tuc-su-kien/cuoc-thi-fit-code-contest-2024-khep-lai-mo-ra-nhieu-co-hoi-moi-cho-uefers-trong-tuong-lai-27357?fbclid=IwY2xjawN1VodleHRuA2FlbQIxMABicmlkETE1c3NscjhzWjduUHBWSThFAR7JdBHwQwx6Q9cROOKdrZQ2MscSbW37N4zPdEEp23YXT4bg3A3ygx8mcLObKQ_aem_XnvZWrMI0RCcX2M-8NFczQ"
            },
            {
              label: "FIT Code Contest 2023",
              url: "https://www.uef.edu.vn/tin-tuc-su-kien/vong-chung-ket-fit-code-contest-2023-khep-lai-voi-nhung-man-tranh-tai-can-nao-cua-uefers-21866?fbclid=IwY2xjawN1VrlleHRuA2FlbQIxMABicmlkETE1c3NscjhzWjduUHBWSThFAR7FGBLxBRv-XfKKaEVTpappGHB8y-RVOJ8gLONWjXQUbrxJTDW0cilk63lroQ_aem_x3yfTSRIbbM7KQLAhfBAlg"
            },
            {
              label: "UEF Math Olympiad 2023",
              url: "https://www.uef.edu.vn/tin-tuc-su-kien/chung-ket-olympic-toan-uef-nam-2023-tim-ra-quan-quan-xuat-sac-cua-mua-dau-tien-22727"
            }
          ]
        },
        {
          title: "Professional Activities",
          items: [
            "Built and maintained a public portfolio and CV website to showcase projects, technical skills, and career profile.",
            "Published academic and personal web application projects on GitHub with source code and project references.",
            "Continuously strengthened backend and fullstack development skills through hands-on projects focused on business workflows, database design, and maintainable web applications."
          ],
          links: [
            { label: "Portfolio Website", url: "https://alucard30dec.github.io/" },
            { label: "GitHub Projects", url: "https://github.com/Alucard30Dec" },
            { label: "LinkedIn", url: "https://www.linkedin.com/in/thi%C3%AAn-ho%C3%A0ng-9427732b5/" }
          ]
        }
      ]
    },
    projects: {
      kicker: "",
      title: "Project Experience",
      description: "",
      items: [
        {
          title: "Construction Payment Request Management System",
          image: "Projects/Construction-Payment-Request/z7683936752479_7f1acc6eb29361b6692d6f1c21f4d6f7.jpg",
          github: "https://github.com/Alucard30Dec/Construction-Payment-Request",
          demo: "https://construction-payment-request.onrender.com",
          report: "#",
          score: "",
          period: "03/2026 - 04/2026",
          summary: "Full-stack internal workflow platform for construction payment approval. The system manages suppliers, projects, contracts, invoices, attachments, and accounting confirmations through a multi-step approval process driven by business rules and payment thresholds.",
          tech: [
            "Tech Stack: React, TypeScript, Ant Design, .NET 8 Web API, Entity Framework Core",
            "Authentication & Authorization: JWT authentication with role-based permissions",
            "Workflow Logic: Multi-step approval based on business rules, department scope, and payment thresholds",
            "Data Scope: Suppliers, projects, contracts, invoices, attachments, accounting confirmations",
            "Infrastructure: SQLite, MySQL, TiDB, health checks, Docker, Render deployment",
            "Engineering Practice: Audit logging, debugging, documentation, AI-assisted implementation with manual business-rule validation"
          ]
        },
        {
          title: "Online Sales & Inventory Management System",
          image: "https://placehold.co/600x600/e2e8f0/0f172a?text=Sales+%26+Inventory",
          github: "https://github.com/Alucard30Dec/Online-Sales-Management-System",
          demo: "Projects/Online-Sales-Management-System/Online-Sales-Management-System-Demo.mp4",
          report: "Projects/Online-Sales-Management-System/Online-Sales-Management-System-Report.pdf",
          score: "",
          period: "12/2025 - 01/2026",
          summary: "Full-stack ASP.NET Core MVC web application for sales, purchasing, inventory, and reporting. It combines a public storefront with a permission-based admin dashboard and supports complex business operations for stock and sales management.",
          tech: [
            "Tech Stack: C#, ASP.NET Core MVC (.NET 8), Entity Framework Core, SQL Server",
            "Identity & Auth: ASP.NET Core Identity with module-based authorization",
            "Reporting: ClosedXML export, stock movement export, sales-purchase-profit reports",
            "Features: Public storefront, admin dashboard, purchasing, invoices, inventory, expenses, attendance",
            "Business Logic: Automatic stock updates, stock movement tracking, low-stock monitoring",
            "Front-End & Tools: HTML, CSS, JavaScript, Git"
          ]
        },
        {
          title: "Private Clinic Management System",
          image: "Images/PrivateClinicManagementSystem.jpg",
          github: "https://github.com/Alucard30Dec/Private-Clinic",
          demo: "#",
          report: "Projects/Private-Clinic/Private-Clinic-Report.pdf",
          score: "",
          period: "09/2025 - 10/2025",
          summary: "Role-based clinic management web application with appointment booking, scheduling, and patient workflow support. The system covers Admin, Receptionist, Doctor, and Patient workflows with validation-heavy scheduling rules.",
          tech: [
            "Tech Stack: C#, ASP.NET MVC 5, Entity Framework 6, SQL Server",
            "Identity & UI: ASP.NET Identity, Bootstrap, jQuery, Visual Studio",
            "Role Workflows: Admin, Receptionist, Doctor, Patient",
            "Appointment Logic: Dynamic time-slot availability, overlapping validation, one-booking-per-day rules",
            "Data Quality: UTC/local time conversion, validation rules, soft-delete logic",
            "Features: Booking history, cancellations, schedule views, doctor/service/work shift management"
          ]
        }
      ]
    },
    contact: {
      title: "Contact",
      description: "Currently seeking a Software Engineer Intern / Backend / Fullstack opportunity. The fastest way to reach me is by email, phone, or LinkedIn.",
      methods: [
        {
          type: "email",
          label: "hoangvanthien301203@gmail.com",
          url: "https://mail.google.com/mail/?view=cm&fs=1&to=hoangvanthien301203@gmail.com"
        },
        {
          type: "phone",
          label: "+84 379 135 123",
          url: "tel:+84379135123"
        },
        {
          type: "link",
          label: "GitHub / Alucard30Dec",
          url: "https://github.com/Alucard30Dec"
        },
        {
          type: "link",
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

  function asString(value, fallback) {
    return typeof value === "string" ? value : fallback;
  }

  function asBoolean(value, fallback) {
    return typeof value === "boolean" ? value : fallback;
  }

  function hasUsableUrl(url) {
    return typeof url === "string" && url.trim() !== "" && url.trim() !== "#";
  }

  function isLegacyProjectDemoUrl(url) {
    return /^project-demo\.html\?project=/i.test(String(url || "").trim());
  }

  function normalizeArray(value, fallback, normalizer) {
    var source = Array.isArray(value) ? value : fallback;
    return source.map(function (item, index) {
      var fallbackItem = fallback[index] || fallback[0] || {};
      return normalizer(item, fallbackItem);
    });
  }

  function normalizeNavLink(item, fallback) {
    var source = item && typeof item === "object" ? item : {};
    return {
      label: asString(source.label, fallback.label || ""),
      target: asString(source.target, fallback.target || "#")
    };
  }

  function normalizeAction(item, fallback) {
    var source = item && typeof item === "object" ? item : {};
    return {
      label: asString(source.label, fallback.label || ""),
      url: asString(source.url, fallback.url || "#"),
      style: asString(source.style, fallback.style || "light"),
      newTab: asBoolean(source.newTab, fallback.newTab || false)
    };
  }

  function normalizeSocialLink(item, fallback) {
    var source = item && typeof item === "object" ? item : {};
    return {
      icon: asString(source.icon, fallback.icon || "link").toLowerCase(),
      label: asString(source.label, fallback.label || ""),
      url: asString(source.url, fallback.url || "#")
    };
  }

  function normalizeHighlight(item, fallback) {
    var source = item && typeof item === "object" ? item : {};
    return {
      title: asString(source.title, fallback.title || ""),
      description: asString(source.description, fallback.description || "")
    };
  }

  function normalizeSkillGroup(item, fallback) {
    var source = item && typeof item === "object" ? item : {};
    return {
      title: asString(source.title, fallback.title || ""),
      items: (Array.isArray(source.items) ? source.items : fallback.items || []).map(function (skill) {
        return String(skill || "");
      })
    };
  }

  function normalizeSimpleLink(item, fallback) {
    var source = item && typeof item === "object" ? item : {};
    return {
      label: asString(source.label, fallback.label || ""),
      url: asString(source.url, fallback.url || "#")
    };
  }

  function normalizeAchievementGroup(item, fallback) {
    var source = item && typeof item === "object" ? item : {};
    return {
      title: asString(source.title, fallback.title || ""),
      items: (Array.isArray(source.items) ? source.items : fallback.items || []).map(function (entry) {
        return String(entry || "");
      }),
      links: normalizeArray(source.links, fallback.links || [], normalizeSimpleLink)
    };
  }

  function normalizeProject(item, fallback) {
    var source = item && typeof item === "object" ? item : {};
    var sourceGithub = asString(source.github, fallback.github || "#");
    var sourceDemo = asString(source.demo, fallback.demo || "#");
    var sourceReport = asString(source.report, fallback.report || "#");
    var sourceDemoDisabled = typeof source.demoDisabled === "boolean"
      ? source.demoDisabled
      : !!(fallback && fallback.demoDisabled);

    if ((sourceGithub === "#" || sourceGithub === "") && fallback.github && fallback.github !== "#") {
      sourceGithub = fallback.github;
    }

    if ((sourceDemo === "#" || sourceDemo === "") && fallback.demo && fallback.demo !== "#") {
      sourceDemo = fallback.demo;
    }

    if ((sourceReport === "#" || sourceReport === "") && fallback.report && fallback.report !== "#") {
      sourceReport = fallback.report;
    }

    if (isLegacyProjectDemoUrl(sourceDemo) && asString(source.title, "") === asString(fallback.title, "")) {
      sourceDemo = asString(fallback.demo, "#");
    }

    if (hasUsableUrl(sourceDemo)) {
      sourceDemoDisabled = false;
    }

    return {
      title: asString(source.title, fallback.title || ""),
      image: asString(source.image, fallback.image || ""),
      github: sourceGithub,
      demo: sourceDemo,
      report: sourceReport,
      demoDisabled: sourceDemoDisabled,
      score: asString(source.score, fallback.score || ""),
      period: asString(source.period, fallback.period || ""),
      summary: asString(source.summary, fallback.summary || ""),
      tech: (Array.isArray(source.tech) ? source.tech : fallback.tech || []).map(function (entry) {
        return String(entry || "");
      })
    };
  }

  function getProjectIdentity(project) {
    var source = project && typeof project === "object" ? project : {};
    var title = asString(source.title, "").trim().toLowerCase();
    var github = asString(source.github, "").trim().toLowerCase();
    return github || title;
  }

  function normalizeProjectsCollection(sourceItems, defaultItems) {
    var sourceList = Array.isArray(sourceItems) ? sourceItems : [];
    var defaultList = Array.isArray(defaultItems) ? defaultItems : [];
    var matchedSourceIndexes = {};
    var merged = [];

    defaultList.forEach(function (defaultProject) {
      var defaultId = getProjectIdentity(defaultProject);
      var matchedIndex = -1;

      sourceList.some(function (sourceProject, index) {
        if (matchedSourceIndexes[index]) {
          return false;
        }

        if (getProjectIdentity(sourceProject) === defaultId) {
          matchedIndex = index;
          return true;
        }

        return false;
      });

      if (matchedIndex >= 0) {
        matchedSourceIndexes[matchedIndex] = true;
        merged.push(normalizeProject(sourceList[matchedIndex], defaultProject));
        return;
      }

      merged.push(normalizeProject(defaultProject, defaultProject));
    });

    sourceList.forEach(function (sourceProject, index) {
      if (!matchedSourceIndexes[index]) {
        merged.push(normalizeProject(sourceProject, {}));
      }
    });

    return merged;
  }

  function normalizeContactMethod(item, fallback) {
    var source = item && typeof item === "object" ? item : {};
    return {
      type: asString(source.type, fallback.type || "link").toLowerCase(),
      label: asString(source.label, fallback.label || ""),
      url: asString(source.url, fallback.url || "#")
    };
  }

  function normalizePortfolioData(input) {
    var source = input && typeof input === "object" ? input : {};
    var defaults = DEFAULT_PORTFOLIO_DATA;

    return {
      site: {
        title: asString(source.site && source.site.title, defaults.site.title),
        ownerName: asString(source.site && source.site.ownerName, defaults.site.ownerName),
        portfolioUrl: asString(source.site && source.site.portfolioUrl, defaults.site.portfolioUrl),
        resumeUrl: asString(source.site && source.site.resumeUrl, defaults.site.resumeUrl)
      },
      navigation: {
        links: normalizeArray(source.navigation && source.navigation.links, defaults.navigation.links, normalizeNavLink)
      },
      hero: {
        avatar: asString(source.hero && source.hero.avatar, defaults.hero.avatar),
        avatarAlt: asString(source.hero && source.hero.avatarAlt, defaults.hero.avatarAlt),
        introLabel: asString(source.hero && source.hero.introLabel, defaults.hero.introLabel),
        name: asString(source.hero && source.hero.name, defaults.hero.name),
        role: asString(source.hero && source.hero.role, defaults.hero.role),
        tagline: asString(source.hero && source.hero.tagline, defaults.hero.tagline),
        actions: normalizeArray(source.hero && source.hero.actions, defaults.hero.actions, normalizeAction),
        socialLinks: normalizeArray(source.hero && source.hero.socialLinks, defaults.hero.socialLinks, normalizeSocialLink)
      },
      about: {
        kicker: asString(source.about && source.about.kicker, defaults.about.kicker),
        title: asString(source.about && source.about.title, defaults.about.title),
        image: asString(source.about && source.about.image, defaults.about.image),
        imageAlt: asString(source.about && source.about.imageAlt, defaults.about.imageAlt),
        educationTitle: asString(source.about && source.about.educationTitle, defaults.about.educationTitle),
        educationSchool: asString(source.about && source.about.educationSchool, defaults.about.educationSchool),
        educationDegree: asString(source.about && source.about.educationDegree, defaults.about.educationDegree),
        paragraphs: (Array.isArray(source.about && source.about.paragraphs) ? source.about.paragraphs : defaults.about.paragraphs).map(function (entry) {
          return String(entry || "");
        }),
        highlights: normalizeArray(source.about && source.about.highlights, defaults.about.highlights, normalizeHighlight)
      },
      skills: {
        kicker: asString(source.skills && source.skills.kicker, defaults.skills.kicker),
        title: asString(source.skills && source.skills.title, defaults.skills.title),
        groups: normalizeArray(source.skills && source.skills.groups, defaults.skills.groups, normalizeSkillGroup)
      },
      achievements: {
        kicker: asString(source.achievements && source.achievements.kicker, defaults.achievements.kicker),
        title: asString(source.achievements && source.achievements.title, defaults.achievements.title),
        groups: normalizeArray(source.achievements && source.achievements.groups, defaults.achievements.groups, normalizeAchievementGroup)
      },
      projects: {
        kicker: asString(source.projects && source.projects.kicker, defaults.projects.kicker),
        title: asString(source.projects && source.projects.title, defaults.projects.title),
        description: asString(source.projects && source.projects.description, defaults.projects.description),
        items: normalizeProjectsCollection(source.projects && source.projects.items, defaults.projects.items)
      },
      contact: {
        title: asString(source.contact && source.contact.title, defaults.contact.title),
        description: asString(source.contact && source.contact.description, defaults.contact.description),
        methods: normalizeArray(source.contact && source.contact.methods, defaults.contact.methods, normalizeContactMethod)
      },
      footer: {
        copyright: asString(source.footer && source.footer.copyright, defaults.footer.copyright),
        portfolioLabel: asString(source.footer && source.footer.portfolioLabel, defaults.footer.portfolioLabel),
        portfolioUrl: asString(source.footer && source.footer.portfolioUrl, defaults.footer.portfolioUrl)
      }
    };
  }

  function loadSavedData() {
    if (!global.localStorage) {
      return null;
    }

    try {
      var raw = global.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return null;
      }

      var normalized = normalizePortfolioData(JSON.parse(raw));

      if (normalized.about && normalized.about.image === "Images/ProfileImage.png") {
        normalized.about.image = "Images/ProfileImage1.png";
      }

      return normalized;
    } catch (error) {
      console.error("Failed to read saved portfolio data.", error);
      return null;
    }
  }

  function getPortfolioData() {
    return loadSavedData() || cloneData(DEFAULT_PORTFOLIO_DATA);
  }

  function savePortfolioData(data) {
    if (!global.localStorage) {
      throw new Error("localStorage is not available in this browser.");
    }

    var normalized = normalizePortfolioData(data);
    global.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return cloneData(normalized);
  }

  function resetPortfolioData() {
    if (!global.localStorage) {
      throw new Error("localStorage is not available in this browser.");
    }

    global.localStorage.removeItem(STORAGE_KEY);
    return cloneData(DEFAULT_PORTFOLIO_DATA);
  }

  global.PortfolioStore = {
    STORAGE_KEY: STORAGE_KEY,
    getDefaultPortfolioData: function () {
      return cloneData(DEFAULT_PORTFOLIO_DATA);
    },
    cloneData: cloneData,
    normalizePortfolioData: normalizePortfolioData,
    getPortfolioData: getPortfolioData,
    savePortfolioData: savePortfolioData,
    resetPortfolioData: resetPortfolioData
  };
})(window);
