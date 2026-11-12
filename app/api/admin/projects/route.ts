
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/auth";
import { projectInclude } from "@/lib/project";

const input = z.object({
  title: z.string().min(2).max(140),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  shortDescription: z.string().min(10).max(600),
  fullDescription: z.string().max(20000).optional().nullable(),
  category: z.string().max(100).optional().nullable(),
  repositoryUrl: z.string().url().optional().nullable(),
  demoUrl: z.string().url().optional().nullable(),
  featured: z.boolean().default(false),
  displayOrder: z.number().int().min(0).default(0),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  technologies: z.array(z.string().min(1).max(60)).max(30).default([]),
});

// Used when creating a new project
const createMap = (x: z.infer<typeof input>) => ({
  title: x.title,
  slug: x.slug,
  shortDescription: x.shortDescription,
  fullDescription: x.fullDescription || null,
  category: x.category || null,
  repositoryUrl: x.repositoryUrl || null,
  demoUrl: x.demoUrl || null,
  featured: x.featured,
  displayOrder: x.displayOrder,
  status: x.status,
  technologies: {
    create: x.technologies.map((name) => ({
      technology: {
        connectOrCreate: {
          where: { name },
          create: { name },
        },
      },
    })),
  },
});

export async function GET() {
  try {
    await requireAdminApi();

    const projects = await prisma.project.findMany({
      include: projectInclude,
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(projects);
  } catch {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await requireAdminApi();

    const value = input.safeParse(await req.json());

    if (!value.success) {
      return NextResponse.json(
        { error: value.error.flatten() },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: createMap(value.data),
      include: projectInclude,
    });

    return NextResponse.json(project, { status: 201 });

  } catch (error) {
    console.error("PROJECT CREATE ERROR:", error);

    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const code = (error as { code?: string }).code;

    return NextResponse.json(
      {
        error:
          code === "P2002"
            ? "Slug already exists"
            : "Unable to create project",
      },
      { status: code === "P2002" ? 409 : 500 }
    );
  }
}
