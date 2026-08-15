import type { Types, FlattenMaps, InferSchemaType } from 'mongoose';
import { ProjectModel } from '../models/project.model.js';
import type { projectSchema } from '../models/project.model.js';
import { projectDtoSchema, type ProjectDto } from '@shared/index';

type LeanProject = FlattenMaps<InferSchemaType<typeof projectSchema>> & { _id: Types.ObjectId };

function toProjectDto(doc: LeanProject): ProjectDto {
  return projectDtoSchema.parse({
    id: doc._id.toString(),
    title: doc.title,
    titleVi: doc.titleVi ?? undefined,
    category: doc.category,
    description: doc.description,
    descriptionVi: doc.descriptionVi ?? undefined,
    tech: doc.tech,
    imageUrl: doc.imageUrl,
    alt: doc.alt,
    url: doc.url,
    accent: doc.accent,
  });
}

export async function listProjects(): Promise<ProjectDto[]> {
  const docs = await ProjectModel.find().sort({ createdAt: 1 }).lean<LeanProject[]>();
  return docs.map(toProjectDto);
}
