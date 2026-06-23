/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { PrismaClient, Role, EventType, EventStatus, ResourceType, ResourceVisibility, PartnerType, MediaType, TeamRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding ESIC STEM LAB database...');

  // Admin user
  const adminHash = await bcrypt.hash('Admin@123!', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@esic.chuka.ac.ke' },
    update: {},
    create: {
      email: 'admin@esic.chuka.ac.ke',
      passwordHash: adminHash,
      firstName: 'ESIC',
      lastName: 'Admin',
      role: Role.ADMIN,
    },
  });
  console.log(`✅ Admin user: ${admin.email}`);

  // Programs
  const programs = [
    { slug: 'early-stem', title: 'Early STEM', level: 'Early STEM', overview: 'Introduction to STEM concepts for young learners ages 6-12.', objectives: ['Spark curiosity in science and technology', 'Develop problem-solving skills through play', 'Introduce basic coding concepts'], activities: ['Robotics kits', 'Science experiments', 'Creative coding with Scratch'], sortOrder: 1 },
    { slug: 'junior-stem', title: 'Junior STEM', level: 'Junior STEM', overview: 'Intermediate STEM education for secondary school students.', objectives: ['Build foundational engineering skills', 'Apply mathematics to real problems', 'Develop team collaboration'], activities: ['Electronics projects', 'Arduino programming', 'Peer project presentations'], sortOrder: 2 },
    { slug: 'advanced-engineering', title: 'Advanced Engineering Education', level: 'Advanced', overview: 'University-level advanced engineering courses and workshops.', objectives: ['Master core engineering principles', 'Develop industry-ready technical skills', 'Conduct independent research'], activities: ['Industry mentorship', 'Capstone projects', 'Lab practicals'], sortOrder: 3 },
    { slug: 'lab-industrial-training', title: 'Laboratory & Industrial Training', level: 'Professional', overview: 'Hands-on laboratory and industrial training programs.', objectives: ['Gain real-world technical experience', 'Operate professional lab equipment', 'Bridge academia and industry'], activities: ['Lab practicals', 'Industry attachments', 'Technical certification'], sortOrder: 4 },
  ];

  for (const p of programs) {
    await prisma.program.upsert({ where: { slug: p.slug }, update: {}, create: { ...p, isPublished: true } });
  }
  console.log(`✅ ${programs.length} programs seeded`);

  // Team members
  const team = [
    { name: 'Dr. Alice Mwangi', role: TeamRole.DIRECTOR, title: 'Director, ESIC STEM LAB', bio: 'PhD in Computer Science, 15 years in STEM education.', sortOrder: 1 },
    { name: 'Eng. Brian Kamau', role: TeamRole.COORDINATOR, title: 'Program Coordinator', bio: 'Electronics engineer with passion for youth STEM mentorship.', sortOrder: 2 },
    { name: 'Ms. Carol Njeri', role: TeamRole.INSTRUCTOR, title: 'Lead STEM Instructor', bio: 'Specialist in robotics and embedded systems education.', sortOrder: 3 },
  ];
  for (const m of team) {
    await prisma.teamMember.create({ data: m }).catch(() => {});
  }
  console.log(`✅ ${team.length} team members seeded`);

  // Partners
  const partners = [
    { name: 'Chuka University', type: PartnerType.ACADEMIC, website: 'https://www.chuka.ac.ke', description: 'Host institution and primary academic partner.', sortOrder: 1 },
    { name: 'Kenya ICT Authority', type: PartnerType.INDUSTRY, website: 'https://www.ict.go.ke', description: 'Government body supporting ICT development.', sortOrder: 2 },
    { name: 'Safaricom PLC', type: PartnerType.SPONSOR, website: 'https://www.safaricom.co.ke', description: 'Corporate sponsor supporting STEM initiatives.', sortOrder: 3 },
  ];
  for (const p of partners) {
    await prisma.partner.create({ data: { ...p, isActive: true } }).catch(() => {});
  }
  console.log(`✅ ${partners.length} partners seeded`);

  // Events
  const futureDate = (days: number) => new Date(Date.now() + days * 86400000);
  await prisma.event.upsert({
    where: { slug: 'arduino-bootcamp-2025' },
    update: {},
    create: {
      slug: 'arduino-bootcamp-2025',
      title: 'Arduino & IoT Bootcamp 2025',
      description: 'A 3-day intensive bootcamp covering Arduino programming, sensors, and IoT fundamentals.',
      type: EventType.BOOTCAMP,
      status: EventStatus.PUBLISHED,
      location: 'ESIC STEM LAB, Chuka University',
      startDate: futureDate(30),
      endDate: futureDate(33),
      registrationDeadline: futureDate(25),
      maxCapacity: 50,
      isFeatured: true,
    },
  });
  console.log('✅ Events seeded');

  // Announcements
  await prisma.announcement.upsert({
    where: { slug: 'esic-platform-launch' },
    update: {},
    create: {
      slug: 'esic-platform-launch',
      title: 'ESIC STEM LAB Digital Platform Now Live!',
      content: 'We are thrilled to announce the launch of the ESIC STEM LAB digital platform. This platform will serve as a hub for all our STEM education, research, and innovation activities.',
      excerpt: 'The ESIC STEM LAB digital platform is now live, connecting students, educators, and innovators.',
      isFeatured: true,
      isPublished: true,
      publishedAt: new Date(),
    },
  });
  console.log('✅ Announcements seeded');

  console.log('\n🎉 Seeding complete!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Admin credentials:');
  console.log('  Email:    admin@esic.chuka.ac.ke');
  console.log('  Password: Admin@123!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });