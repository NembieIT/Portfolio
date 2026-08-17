import { connectDatabase, disconnectDatabase } from '../src/lib/database.js';
import { ProjectModel } from '../src/models/project.model.js';
import { env } from '../src/config/env.js';

type SeedProject = {
  title: string;
  titleVi?: string;
  category: string;
  description: string;
  descriptionVi: string;
  tech: string;
  imageUrl: string;
  alt: string;
  githubUrl: string;
  demoUrl?: string;
  accent: 'primary' | 'secondary' | 'inverse-primary';
};

const seedProjects: SeedProject[] = [
  {
    title: 'ChatTime',
    category: 'Web App',
    description:
      'Real-time messaging platform delivering instant chat over WebSocket with JWT-secured authentication. Clean ExpressJS REST API and MongoDB persistence paired with a responsive ReactJS interface built from reusable components.',
    descriptionVi:
      'Ứng dụng nhắn tin thời gian thực: chat tức thì qua WebSocket với xác thực JWT an toàn. API ExpressJS sạch sẽ và MongoDB persistence cấu trúc tốt, giao diện ReactJS responsive từ các component tái sử dụng.',
    tech: 'ReactJS • ExpressJS • MongoDB',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBoUdzYrSsfucnS-LKgPhjKwlQHcH1WmFgr72DArXV9w9KZhQ0uV58gXZOE_6JSJaaVNXrFamPpObk_dJSX24pgV3HoZy6hfm7s6q1gZ2w2Ny4aC1HYIu4VY6SEDTcOAFCaOFpYcNTFry59177KXIJDCgjnPnc0HLzNpWJaRBNXO3PZOpTgil8cPJwRnG7dCWllCVMBGfxTVU45asiKaXWcGkvOyfcD8bg9aXAGOTAHvg0Y3m4lqMLF7w',
    alt: 'ChatTime — giao diện ứng dụng nhắn tin thời gian thực.',
    githubUrl: 'https://github.com/NembieIT/ChatTime',
    accent: 'primary',
  },
  {
    title: 'SmartChefAI',
    category: 'Python + AI',
    description:
      'AI-powered kitchen assistant that identifies food ingredients from images using YOLOv8 and suggests matching recipes in seconds. ReactJS frontend wired to a Python computer-vision pipeline — practical, end-to-end AI application.',
    descriptionVi:
      'Trợ lý bếp thông minh: nhận diện nguyên liệu thực phẩm từ ảnh bằng YOLOv8 và gợi ý món ăn phù hợp trong vài giây. Frontend ReactJS kết nối pipeline computer vision bằng Python — ứng dụng AI thực tế từ đầu đến cuối.',
    tech: 'ReactJS • Python • YOLOv8',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBY5Q50GfrkGyEcAxgOU8A5ZYTS7rtiT7tlHNExmAKaBwRD6Ow07cqUT8A5Pm9R4NsXU50HoZAzpyVJ_ZS_VyQqSqjY269wha7UeFfPPmTj670MIpnXqXKPYLJPb4D2xYu4e5Jpaq17torGD3WxhZd2Y-QdfzhyvM-jEq2nAbu3JdwomKDc3J9GRN0YRmkt7kN3sc_OjMSRYVkHdmS9YpdWeqpE2YCINEHXPaauAIXOWZTlcGBD0N5yoA',
    alt: 'SmartChefAI — giao diện nhận diện nguyên liệu và gợi ý món ăn.',
    githubUrl: 'https://github.com/NembieIT/CT239E---Smart-Chef-AI',
    accent: 'secondary',
  },
  {
    title: 'Task Manager',
    titleVi: 'Quản lý công việc',
    category: 'Web App CRUD · JWT',
    description:
      'Task management app with role-based boards, complete CRUD flows and a JWT-secured REST API. ReactJS + Zustand frontend with predictable state, Java Spring Boot + MySQL backend, and a fully containerized Docker workflow.',
    descriptionVi:
      'Ứng dụng quản lý công việc với bảng nhiệm vụ theo vai trò, đầy đủ luồng CRUD và API REST bảo mật JWT. Frontend ReactJS + Zustand quản lý state dự đoán được, backend Java Spring Boot + MySQL, toàn bộ đóng gói bằng Docker.',
    tech: 'ReactJS • Zustand • Spring Boot • MySQL • Docker',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBtRO7nAPQrdHw8Uqgf2mApLwFqP04EPH2PbViIT7_sS7N3paPZPdPlEgWECBwlrzMoVXuRV3RUpsAgo0KeSEhqE6ElMSkCXTUOeACbKjyjRLbXZfnO_HtvIrvXUvaqg2EVmZZXGQru9nultWb6JkvUdKxYPYyqAhntOBtR6FXDPV47dHmPR9HNxF6G2v48uIbHREBnarP7j-_yae0_4AS7G6-3tJpic9WUeeSPZNwCB_r3JuRsxQFpug',
    alt: 'Task Manager — giao diện bảng quản lý công việc.',
    githubUrl: 'https://github.com/NembieIT/TaskManager_CT240',
    accent: 'inverse-primary',
  },
];

async function run(): Promise<void> {
  await connectDatabase(env.MONGODB_URI);

  const seedTitles = seedProjects.map((project) => project.title);

  for (const project of seedProjects) {
    const update: Record<string, unknown> = {
      title: project.title,
      titleVi: project.titleVi,
      category: project.category,
      description: project.description,
      descriptionVi: project.descriptionVi,
      tech: project.tech,
      imageUrl: project.imageUrl,
      alt: project.alt,
      githubUrl: project.githubUrl,
      accent: project.accent,
    };
    if (project.demoUrl) {
      update.demoUrl = project.demoUrl;
    }

    const result = await ProjectModel.updateOne(
      { title: project.title },
      { $set: update, $unset: { url: '' } },
      { upsert: true },
    );
    console.log(
      result.upsertedCount === 1
        ? `Inserted: ${project.title}`
        : `Updated: ${project.title}`,
    );
  }

  const removed = await ProjectModel.deleteMany({ title: { $nin: seedTitles } });
  console.log(`Removed stale projects: ${removed.deletedCount}`);

  const count = await ProjectModel.countDocuments();
  console.log(`Total projects in database: ${count}`);

  await disconnectDatabase();
}

run().catch((err: unknown) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
