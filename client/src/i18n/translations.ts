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
      role: 'I build web apps end to end — from the first database schema to the last button click.',
      description:
        'Full-stack developer based in Cần Thơ. I design REST APIs that stay predictable under load, wire real-time features with WebSocket, and build responsive React interfaces that feel natural to use.',
      cta: 'See my work',
      ctaSecondary: 'Get in touch',
    },
    homeAbout: {
      kicker: 'About me',
      heading: 'Code is only half the job.',
      paragraphs: [
        'I’m a Software Engineering student at Can Tho University, and most of what I know about building software didn’t come from lectures — it came from breaking side projects and putting them back together until they actually made it to production.',
        'Today I work comfortably across the whole stack: React and TypeScript on the frontend, Express, Spring Boot, MongoDB and MySQL on the backend, Docker to make it all reproducible. The rest of my time goes to AI agents and computer vision, because that is where the next decade of products lives.',
      ],
      skillHeading: 'Tools I work with',
    },
    skills: [
      'ReactJS',
      'TypeScript',
      'NodeJS',
      'Java Spring Boot',
      'MongoDB',
      'MySQL',
      'Docker',
      'Python (AI)',
    ],
    workPage: {
      kicker: 'Selected projects',
      heading: 'Things I have built.',
      description:
        'Three projects, three different stacks — real-time chat over WebSocket, food recognition with YOLOv8, and a full-stack task manager running on Spring Boot.',
      projectCount: (count: number) => `${count} projects`,
    },
    workCard: {
      viewProject: 'View project',
      visitSite: 'Visit site',
      viewGithub: 'View GitHub',
      viewDemo: 'Live Demo',
    },
    aboutPage: {
      kicker: 'About',
      heading: 'Full-stack by habit, curious by design.',
      viewFullImage: 'View full image',
      closeImage: 'Close',
      intro:
        'Hi, I’m Mai Tiến Dũng. I study Software Engineering at Can Tho University, and I spend my free hours turning ideas into working web apps. I care about APIs that behave, interfaces that feel effortless, and code that the next person can actually read.',
      timeline: {
        title: 'My journey',
        stages: [
          {
            period: 'Foundation',
            title: 'Software Engineering @ CTU',
            text: 'I chose software engineering because I wanted to build tools people actually use. Algorithms, databases and the habit of testing — that’s where it all started.',
          },
          {
            period: 'Certification',
            title: 'Google UX / UI Design',
            text: 'I completed the Google UX/UI Design certificate to understand the people behind the screen — how they think, what they need, and how good design makes software feel obvious.',
          },
          {
            period: 'Competition',
            title: 'USE IT Competition',
            text: 'Took that design thinking to the stage at the USE company IT competition — presenting a product under pressure and learning that delivering beats perfecting.',
          },
          {
            period: 'Student projects',
            title: 'Real apps, real stacks',
            text: 'Shipped ChatTime with WebSocket and JWT, SmartChefAI with YOLOv8, and a Task Manager on Spring Boot + MySQL. Three projects, three different stacks, each one deployed.',
          },
          {
            period: 'Now',
            title: 'Full-stack + AI',
            text: 'Wiring AI agents and computer vision into everyday products — while keeping the foundation solid: clean APIs, sane schemas and calm codebases.',
          },
        ],
      },
      approach: {
        title: 'How I work',
        items: [
          'I plan before I build — API shapes and schemas first, code second.',
          'I keep the stack boring until the problem stops being boring.',
          'I test the critical paths, and I document the decisions.',
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
        title: 'Where I’m headed',
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
      linkedin: 'LinkedIn',
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
      role: 'Mình xây web app từ đầu đến cuối — từ schema đầu tiên đến nút bấm cuối cùng.',
      description:
        'Lập trình viên full-stack sống tại Cần Thơ. Mình thiết kế REST API ổn định dưới tải lớn, nối thời gian thực bằng WebSocket, và xây dựng những giao diện React responsive cảm giác tự nhiên khi dùng.',
      cta: 'Xem dự án',
      ctaSecondary: 'Liên hệ ngay',
    },
    homeAbout: {
      kicker: 'Giới thiệu',
      heading: 'Code chỉ là một nửa công việc.',
      paragraphs: [
        'Mình là sinh viên Kỹ thuật Phần mềm tại Đại học Cần Thơ, và phần lớn những gì mình biết về xây phần mềm không đến từ bài giảng — mà đến từ việc làm vỡ mấy dự án cá nhân rồi lắp lại cho đến khi chúng thật sự chạy được.',
        'Hiện tại mình thoải mái làm việc trên cả stack: React và TypeScript ở frontend, Express, Spring Boot, MongoDB và MySQL ở backend, Docker để mọi thứ lặp lại được. Thời gian còn lại mình dành cho AI agent và computer vision, vì đó là nơi sản phẩm của thập kỷ tới nằm ở đó.',
      ],
      skillHeading: 'Công nghệ mình dùng',
    },
    skills: [
      'ReactJS',
      'TypeScript',
      'NodeJS',
      'Java Spring Boot',
      'MongoDB',
      'MySQL',
      'Docker',
      'Python (AI)',
    ],
    workPage: {
      kicker: 'Dự án tiêu biểu',
      heading: 'Những thứ mình đã xây.',
      description:
        'Ba dự án, ba stack khác nhau — chat thời gian thực qua WebSocket, nhận diện thực phẩm bằng YOLOv8, và task manager full-stack chạy trên Spring Boot.',
      projectCount: (count: number) => `${count} dự án`,
    },
    workCard: {
      viewProject: 'Xem dự án',
      visitSite: 'Truy cập trang',
      viewGithub: 'Xem GitHub',
      viewDemo: 'Xem Demo',
    },
    aboutPage: {
      kicker: 'Giới thiệu',
      heading: 'Full-stack theo thói quen, tò mò theo bản chất.',
      viewFullImage: 'Xem toàn bộ hình ảnh',
      closeImage: 'Đóng',
      intro:
        'Xin chào, mình là Mai Tiến Dũng. Mình học Kỹ thuật Phần mềm tại Đại học Cần Thơ, và dành thời gian rảnh để biến ý tưởng thành những web app chạy thật. Mình quan tâm đến API hành xử đúng hẹn, giao diện cảm giác nhẹ nhàng, và code mà người kế tiếp có thể đọc được.',
      timeline: {
        title: 'Hành trình của mình',
        stages: [
          {
            period: 'Nền móng',
            title: 'Kỹ thuật Phần mềm @ ĐH Cần Thơ',
            text: 'Mình chọn Kỹ thuật Phần mềm vì muốn xây những công cụ người khác thật sự dùng. Thuật toán, database và thói quen test — mọi thứ bắt đầu từ đó.',
          },
          {
            period: 'Chứng chỉ',
            title: 'Google UX / UI Design',
            text: 'Mình hoàn thành chứng chỉ Google UX/UI Design để hiểu người dùng — họ nghĩ gì, cần gì, và thiết kế tốt làm phần mềm trở nên hiển nhiên như thế nào.',
          },
          {
            period: 'Cuộc thi',
            title: 'Cuộc thi CNTT USE',
            text: 'Mình mang tư duy thiết kế đó lên sân khấu cuộc thi CNTT của công ty USE — thuyết trình sản phẩm dưới áp lực và học được rằng hoàn thành còn hơn hoàn hảo mãi.',
          },
          {
            period: 'Dự án sinh viên',
            title: 'Ứng dụng thật, stack thật',
            text: 'Mình xây dựng ChatTime với WebSocket và JWT, SmartChefAI với YOLOv8, và Task Manager trên Spring Boot + MySQL. Ba dự án, ba stack khác nhau, mỗi cái đều chạy thật.',
          },
          {
            period: 'Hiện tại',
            title: 'Full-stack + AI',
            text: 'Mình đang nối AI agent và computer vision vào sản phẩm hằng ngày — song vẫn giữ nền tảng vững: API sạch, schema hợp lý và codebase bình tĩnh.',
          },
        ],
      },
      approach: {
        title: 'Cách mình làm việc',
        items: [
          'Mình lên kế hoạch trước khi code — hình dạng API và schema trước, code sau.',
          'Mình giữ stack đơn giản cho đến khi bài toán thật sự cần phức tạp hơn.',
          'Mình test những luồng quan trọng và ghi lại những quyết định thiết kế.',
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
      linkedin: 'LinkedIn',
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
