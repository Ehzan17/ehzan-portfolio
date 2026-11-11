export type Project={slug:string;title:string;category:string;year:string;summary:string;stack:string[];repo?:string;status:"PUBLISHED"|"DRAFT"};
export const projects:Project[]=[
 {slug:"taksha-2k25",title:"Taksha '25",category:"Web development",year:"2025",summary:"A public event web experience. Details are ready for editorial review.",stack:["HTML","CSS","JavaScript"],repo:"https://github.com/Ehzan17/Taksha-2K25",status:"PUBLISHED"},
 {slug:"campus-nav",title:"Campus Navigator",category:"Academic project",year:"2025",summary:"A campus navigation project, maintained across GitHub and GitLab.",stack:["HTML","CSS","JavaScript"],repo:"https://github.com/Ehzan17/Campus-Nav",status:"PUBLISHED"},
 {slug:"leaveapp",title:"Leave Management",category:"Full stack",year:"2025",summary:"A TypeScript-based leave-management application. Add case-study details in the CMS.",stack:["TypeScript"],repo:"https://github.com/Ehzan17/LeaveApp",status:"PUBLISHED"},
 {slug:"studentdemoreg",title:"Student Demo Registration",category:"Web development",year:"2025",summary:"A registration interface for student demonstrations.",stack:["HTML","CSS","JavaScript"],repo:"https://github.com/Ehzan17/Studentdemoreg",status:"PUBLISHED"}
];
