export const translations = {
  en: {
    nav: {
      home: 'Home',
      work: 'Work',
      about: 'About',
      contact: 'Contact',
    },
    hero: {
      kicker: 'Full-Stack Developer — Cần Thơ, Vietnam',
      greeting: 'Hi, I’m',
      name: 'Mai Tiến Dũng',
      role: 'I build scalable web apps and put AI agents to work.',
      description:
        'Aspiring Full-Stack Developer focused on building scalable web applications and leveraging AI agents to enhance development efficiency, automation, and problem-solving.',
      cta: 'See my work',
      ctaSecondary: 'Get in touch',
    },
    homeAbout: {
      kicker: 'About me',
      heading: 'Code, design and AI — one workflow.',
      paragraphs: [
        'I am a Software Engineering student at Can Tho University. I care about clean architecture, honest UI and APIs that do not break.',
        'I spend most of my time building web apps with React and Node.js, wiring AI agents into real workflows, and turning Figma screens into pixel-faithful interfaces.',
      ],
      skillHeading: 'Tools I work with',
    },
    skills: ['ReactJS', 'NodeJS', 'Java Spring Boot', 'TailwindCSS', 'Python (AI)'],
    workPage: {
      kicker: 'Selected projects',
      heading: 'Things I have built.',
      description:
        'Each tile is a real product: from CRUD web apps and JWT-secured APIs to AI recognition pipelines and agent workflows.',
      projectCount: (count: number) => `${count} projects`,
    },
    workCard: {
      viewProject: 'View project',
      visitSite: 'Visit site',
    },
    aboutPage: {
      kicker: 'About',
      heading: 'A developer who ships and communicates.',
      intro:
        'I’m Mai Tiến Dũng, a Software Engineering student at Can Tho University with a passion for full-stack web development and AI-powered workflows.',
      approach: {
        title: 'How I work',
        items: [
          'Plan before you build — APIs, schemas and wireframes first.',
          'Keep the stack boring and small until it stops being boring.',
          'Test the critical paths, never the implementation.',
        ],
      },
      toolkit: {
        title: 'My toolkit',
        frontend: 'Frontend',
        backend: 'Backend',
        ai: 'AI & Design',
      },
      education: {
        title: 'Education',
        school: 'Can Tho University (CTU)',
        degree: 'Software Engineering',
      },
      certificates: {
        title: 'Certificates',
        ux: 'Google UX / UI Design',
        use: 'USE Company — IT Competition',
      },
      languages: {
        title: 'Languages',
        vietnamese: { name: 'Vietnamese', level: 'Native' },
        english: { name: 'English', level: 'TOEIC 900+' },
        japanese: { name: 'Japanese', level: 'JLPT N3' },
      },
      vision: {
        title: 'What I am aiming at',
        text: 'To become a full-stack engineer who makes AI genuinely useful inside products — faster delivery, smarter automation and calmer codebases.',
      },
    },
    contact: {
      kicker: 'Contact',
      heading: 'Say hello.',
      description:
        'My inbox is always open — a project, an internship, or just a hello. I usually reply within a day.',
      nameLabel: 'Your name',
      emailLabel: 'Your email',
      messageLabel: 'Message',
      namePlaceholder: 'How should I call you?',
      emailPlaceholder: 'you@example.com',
      messagePlaceholder: 'Tell me about your idea or opportunity…',
      submit: 'Send message',
      sending: 'Sending…',
      success: 'Thanks! Your message has been sent.',
      openGmail: 'Open Gmail Compose',
      gmailConfirmTitle: 'Send via Gmail?',
      gmailConfirmText:
        'Your message is ready. Gmail will open a compose window with your content below, addressed to me.',
      confirmOpen: 'Open Gmail',
      cancel: 'Cancel',
      gmailSubject: (name: string) => `Portfolio contact from ${name}`,
      error: 'Something went wrong. Please try again.',
      direct: 'Prefer to reach out directly?',
      localTime: 'My local time (HCM)',
      github: 'GitHub',
      zalo: 'Zalo',
      email: 'Email',
    },
    footer: {
      heading: 'Let’s build something',
      headingAccent: 'useful.',
      location: 'Based in Cần Thơ, Vietnam — working globally.',
      tagline: 'Built with React, Node.js and MongoDB.',
      rights: 'All rights reserved.',
    },
    pageNotFound: {
      heading: 'Page not found',
      text: 'This page drifted into the void.',
      back: 'Back to home',
    },
  },
  vi: {
    nav: {
      home: 'Trang chủ',
      work: 'Dự án',
      about: 'Giới thiệu',
      contact: 'Liên hệ',
    },
    hero: {
      kicker: 'Full-Stack Developer — Cần Thơ, Việt Nam',
      greeting: 'Xin chào, mình là',
      name: 'Mai Tiến Dũng',
      role: 'Mình xây web app có khả năng mở rộng và đưa AI agent vào làm việc thật sự.',
      description:
        'Lập trình viên Full-Stack đang phát triển, tập trung xây dựng các ứng dụng web có khả năng mở rộng và dùng AI agent để tăng hiệu suất phát triển, tự động hóa và giải quyết vấn đề.',
      cta: 'Xem dự án',
      ctaSecondary: 'Liên hệ ngay',
    },
    homeAbout: {
      kicker: 'Giới thiệu',
      heading: 'Code, thiết kế và AI — trong một quy trình.',
      paragraphs: [
        'Mình là sinh viên ngành Kỹ thuật Phần mềm tại Đại học Cần Thơ. Mình quan tâm đến kiến trúc sạch, giao diện trung thực và những API không bao giờ gây hỏng.',
        'Mình dành phần lớn thời gian xây web app với React và Node.js, nối AI agent vào các quy trình thực tế, và chuyển bản thiết kế Figma thành giao diện đúng từng pixel.',
      ],
      skillHeading: 'Công nghệ mình dùng',
    },
    skills: ['ReactJS', 'NodeJS', 'Java Spring Boot', 'TailwindCSS', 'Python (AI)'],
    workPage: {
      kicker: 'Dự án tiêu biểu',
      heading: 'Những thứ mình đã xây.',
      description:
        'Mỗi ô là một sản phẩm thật: từ web app CRUD và API bảo mật JWT đến pipeline nhận diện AI và quy trình AI agent.',
      projectCount: (count: number) => `${count} dự án`,
    },
    workCard: {
      viewProject: 'Xem dự án',
      visitSite: 'Truy cập trang',
    },
    aboutPage: {
      kicker: 'Giới thiệu',
      heading: 'Một developer biết ship và biết giao tiếp.',
      intro:
        'Mình là Mai Tiến Dũng, sinh viên ngành Kỹ thuật Phần mềm tại Đại học Cần Thơ, đam mê phát triển web full-stack và các quy trình ứng dụng AI.',
      approach: {
        title: 'Cách mình làm việc',
        items: [
          'Lên kế hoạch trước khi code — API, schema và wireframe trước tiên.',
          'Giữ stack đơn giản và gọn cho đến khi nó không còn phù hợp.',
          'Test những luồng quan trọng, không test cách triển khai.',
        ],
      },
      toolkit: {
        title: 'Bộ công cụ của mình',
        frontend: 'Frontend',
        backend: 'Backend',
        ai: 'AI & Thiết kế',
      },
      education: {
        title: 'Học vấn',
        school: 'Đại học Cần Thơ (CTU)',
        degree: 'Kỹ thuật Phần mềm',
      },
      certificates: {
        title: 'Chứng chỉ',
        ux: 'Google UX / UI Design',
        use: 'Cuộc thi CNTT — Công ty USE',
      },
      languages: {
        title: 'Ngôn ngữ',
        vietnamese: { name: 'Tiếng Việt', level: 'Bản ngữ' },
        english: { name: 'Tiếng Anh', level: 'TOEIC 900+' },
        japanese: { name: 'Tiếng Nhật', level: 'JLPT N3' },
      },
      vision: {
        title: 'Mục tiêu của mình',
        text: 'Trở thành kỹ sư full-stack giúp AI thực sự hữu ích trong sản phẩm — giao hàng nhanh hơn, tự động hóa thông minh hơn và codebase bình tĩnh hơn.',
      },
    },
    contact: {
      kicker: 'Liên hệ',
      heading: 'Nói xin chào nhé.',
      description:
        'Hòm thư của mình luôn mở — một dự án, một cơ hội thực tập, hay chỉ là một lời chào. Mình thường trả lời trong vòng một ngày.',
      nameLabel: 'Tên của bạn',
      emailLabel: 'Email của bạn',
      messageLabel: 'Nội dung',
      namePlaceholder: 'Mình nên gọi bạn là gì?',
      emailPlaceholder: 'ban@example.com',
      messagePlaceholder: 'Kể cho mình về ý tưởng hoặc cơ hội của bạn…',
      submit: 'Gửi tin nhắn',
      sending: 'Đang gửi…',
      success: 'Cảm ơn bạn! Tin nhắn đã được gửi.',
      openGmail: 'Mở Gmail để soạn thư',
      gmailConfirmTitle: 'Gửi qua Gmail nhé?',
      gmailConfirmText:
        'Nội dung của bạn đã sẵn sàng. Gmail sẽ mở cửa sổ soạn thư với nội dung bên dưới, gửi tới mình.',
      confirmOpen: 'Mở Gmail',
      cancel: 'Hủy',
      gmailSubject: (name: string) => `Liên hệ portfolio từ ${name}`,
      error: 'Có lỗi xảy ra. Vui lòng thử lại.',
      direct: 'Muốn liên hệ trực tiếp?',
      localTime: 'Giờ địa phương (TP. HCM)',
      github: 'GitHub',
      zalo: 'Zalo',
      email: 'Email',
    },
    footer: {
      heading: 'Cùng xây thứ gì đó',
      headingAccent: 'hữu ích.',
      location: 'Sống tại Cần Thơ, Việt Nam — làm việc toàn cầu.',
      tagline: 'Xây dựng với React, Node.js và MongoDB.',
      rights: 'Bảo lưu mọi quyền.',
    },
    pageNotFound: {
      heading: 'Không tìm thấy trang',
      text: 'Trang này đã trôi vào hư không.',
      back: 'Về trang chủ',
    },
  },
} satisfies Record<string, unknown>;

export type Messages = (typeof translations)['en'];

export type Locale = keyof typeof translations;
