import {prisma} from "./prisma";
export const projectInclude={technologies:{include:{technology:true}},images:{orderBy:{sortOrder:"asc" as const}}};
export async function publishedProjects(){return prisma.project.findMany({where:{status:"PUBLISHED"},include:projectInclude,orderBy:[{featured:"desc"},{displayOrder:"asc"},{updatedAt:"desc"}]})}
export async function projectBySlug(slug:string){return prisma.project.findFirst({where:{slug,status:"PUBLISHED"},include:projectInclude})}
