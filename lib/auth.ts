import "server-only";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {randomBytes,createHash} from "crypto";
import {prisma} from "./prisma";
export const sessionCookie="ehzan_session";
const digest=(token:string)=>createHash("sha256").update(token).digest("hex");
export async function createSession(userId:string){const token=randomBytes(32).toString("base64url");const expiresAt=new Date(Date.now()+1000*60*60*8);await prisma.session.create({data:{userId,token:digest(token),expiresAt}});return {token,expiresAt}}
export async function getAdmin(){const token=(await cookies()).get(sessionCookie)?.value;if(!token)return null;const session=await prisma.session.findUnique({where:{token:digest(token)},include:{user:true}});if(!session||session.expiresAt<new Date()){if(session)await prisma.session.delete({where:{id:session.id}});return null}return session.user}
export async function requireAdmin(){const user=await getAdmin();if(!user)redirect("/admin/login");return user}
export async function requireAdminApi(){const user=await getAdmin();if(!user)throw new Error("UNAUTHORIZED");return user}
