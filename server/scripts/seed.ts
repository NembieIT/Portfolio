import { connectDatabase, disconnectDatabase } from '../src/lib/database.js';
import { ProjectModel } from '../src/models/project.model.js';
import { env } from '../src/config/env.js';

const seedProjects = [
  {
    title: 'E-Commerce Platform',
    titleVi: 'Nền tảng Thương mại điện tử',
    category: 'Web App',
    description:
      'Full CRUD storefront with product management, JWT authentication, cart and order flows, built with React, Node.js and MongoDB.',
    descriptionVi:
      'Cửa hàng CRUD đầy đủ: quản lý sản phẩm, xác thực JWT, giỏ hàng và đặt hàng, xây dựng bằng React, Node.js và MongoDB.',
    tech: 'React • NodeJS • MongoDB • JWT',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBoUdzYrSsfucnS-LKgPhjKwlQHcH1WmFgr72DArXV9w9KZhQ0uV58gXZOE_6JSJaaVNXrFamPpObk_dJSX24pgV3HoZy6hfm7s6q1gZ2w2Ny4aC1HYIu4VY6SEDTcOAFCaOFpYcNTFry59177KXIJDCgjnPnc0HLzNpWJaRBNXO3PZOpTgil8cPJwRnG7dCWllCVMBGfxTVU45asiKaXWcGkvOyfcD8bg9aXAGOTAHvg0Y3m4lqMLF7w',
    alt: 'Moody architectural visualization in dark charcoal and violet tones — placeholder artwork for the e-commerce project.',
    url: 'https://github.com/NembieIT',
    accent: 'primary',
  },
  {
    title: 'AI Object Recognition',
    titleVi: 'Nhận diện vật thể bằng AI',
    category: 'Python + AI',
    description:
      'Real-time object detection pipeline in Python, wired into a web dashboard to label, log and query detections from a camera feed.',
    descriptionVi:
      'Hệ thống nhận diện vật thể thời gian thực bằng Python, kết nối với web dashboard để gắn nhãn, lưu log và truy vấn kết quả từ camera.',
    tech: 'Python • OpenCV • Flask',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBY5Q50GfrkGyEcAxgOU8A5ZYTS7rtiT7tlHNExmAKaBwRD6Ow07cqUT8A5Pm9R4NsXU50HoZAzpyVJ_ZS_VyQqSqjY269wha7UeFfPPmTj670MIpnXqXKPYLJPb4D2xYu4e5Jpaq17torGD3WxhZd2Y-QdfzhyvM-jEq2nAbu3JdwomKDc3J9GRN0YRmkt7kN3sc_OjMSRYVkHdmS9YpdWeqpE2YCINEHXPaauAIXOWZTlcGBD0N5yoA',
    alt: 'Abstract fluid dynamics in cyan and purple — placeholder artwork for the AI recognition project.',
    url: 'https://github.com/NembieIT',
    accent: 'secondary',
  },
  {
    title: 'AI Agent Workflows',
    titleVi: 'Tích hợp AI Agent',
    category: 'AI Integration',
    description:
      'Automation layer that uses AI agents to handle repetitive tasks: summarizing issues, generating reports and triaging feedback.',
    descriptionVi:
      'Tầng tự động hóa dùng AI agent xử lý các tác vụ lặp lại: tóm tắt vấn đề, tạo báo cáo và phân loại phản hồi.',
    tech: 'AI Agents • LLM API • NodeJS',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBtRO7nAPQrdHw8Uqgf2mApLwFqP04EPH2PbViIT7_sS7N3paPZPdPlEgWECBwlrzMoVXuRV3RUpsAgo0KeSEhqE6ElMSkCXTUOeACbKjyjRLbXZfnO_HtvIrvXUvaqg2EVmZZXGQru9nultWb6JkvUdKxYPYyqAhntOBtR6FXDPV47dHmPR9HNxF6G2v48uIbHREBnarP7j-_yae0_4AS7G6-3tJpic9WUeeSPZNwCB_r3JuRsxQFpug',
    alt: 'Minimalist editorial composition in monochrome with violet accent — placeholder artwork for the AI agent project.',
    url: 'https://github.com/NembieIT',
    accent: 'inverse-primary',
  },
  {
    title: 'Portfolio Website',
    titleVi: 'Website Portfolio',
    category: 'React + NodeJS',
    description:
      'This very site — a dark avant-garde portfolio stitched from WebGL shaders, Three.js, React and a MongoDB-backed API.',
    descriptionVi:
      'Chính là trang web này — portfolio dark theo phong cách avant-garde, ghép từ WebGL shader, Three.js, React và API MongoDB.',
    tech: 'React • Three.js • Express • MongoDB',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuByHpxS62mKy9FlHXg2oqSaFPV1wQVnRxM4Wh6JQDTTkMyUobDacGTmgx0TdU8elpRF2Ml2_TMLQpBmJtBdPXM0uXW5Y2H8qbHD7SDZT-X7MWZG1bDRcsrvYMkX9RVLmPw4tdgOyqWLshc0uzaSvSd5J7rlvcNRbQY1vYqpNj2GMWjWWC3kcVJAEBJ_zvWt6FQCPG-_HaAl7wEG8NAcYJr4NKtz1LFv1mNWgcK3rrkWoAVc9dCYZfXxxw',
    alt: 'Futuristic architectural space with holographic magenta and cyan light — placeholder artwork for the portfolio project.',
    url: 'https://github.com/NembieIT',
    accent: 'primary',
  },
];

async function run(): Promise<void> {
  await connectDatabase(env.MONGODB_URI);

  const seedTitles = seedProjects.map((project) => project.title);

  for (const project of seedProjects) {
    const result = await ProjectModel.updateOne(
      { title: project.title },
      { $setOnInsert: project },
      { upsert: true },
    );
    console.log(
      result.upsertedCount === 1
        ? `Inserted: ${project.title}`
        : `Already exists (skipped): ${project.title}`,
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
