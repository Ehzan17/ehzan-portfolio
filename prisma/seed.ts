import {PrismaClient,ProjectStatus} from "@prisma/client";
import argon2 from "argon2";
const prisma=new PrismaClient();
const projects=[
 ["Taksha '25","taksha-2k25","Web development","A public event web experience. Details are ready for editorial review.",["HTML","CSS","JavaScript"],"https://github.com/Ehzan17/Taksha-2K25"],
 ["Campus Navigator","campus-nav","Academic project","A campus navigation project, maintained across GitHub and GitLab.",["HTML","CSS","JavaScript"],"https://github.com/Ehzan17/Campus-Nav"],
 ["Leave Management","leaveapp","Full stack","A TypeScript-based leave-management application. Add case-study details in the CMS.",["TypeScript"],"https://github.com/Ehzan17/LeaveApp"],
 ["Student Demo Registration","studentdemoreg","Web development","A registration interface for student demonstrations.",["HTML","CSS","JavaScript"],"https://github.com/Ehzan17/Studentdemoreg"]
] as const;
async function main(){const {ADMIN_EMAIL,ADMIN_PASSWORD}=process.env;if(!ADMIN_EMAIL||!ADMIN_PASSWORD||ADMIN_PASSWORD==="change-this-before-first-deploy")throw new Error("Set ADMIN_EMAIL and a non-placeholder ADMIN_PASSWORD in .env before seeding.");await prisma.adminUser.upsert({where:{email:ADMIN_EMAIL},update:{passwordHash:await argon2.hash(ADMIN_PASSWORD,{type:argon2.argon2id})},create:{email:ADMIN_EMAIL,passwordHash:await argon2.hash(ADMIN_PASSWORD,{type:argon2.argon2id})}});for(const [title,slug,category,shortDescription,stack,repositoryUrl] of projects){await prisma.project.upsert({where:{slug},update:{},create:{title,slug,category,shortDescription,repositoryUrl,status:ProjectStatus.PUBLISHED,displayOrder:projects.findIndex(x=>x[1]===slug),technologies:{create:await Promise.all(stack.map(async name=>({technology:{connectOrCreate:{where:{name},create:{name}}}})))}}})}}
main().finally(()=>prisma.$disconnect());
