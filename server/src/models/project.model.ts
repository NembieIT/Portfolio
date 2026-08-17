import { Schema, model } from 'mongoose';

const projectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    titleVi: { type: String, trim: true, maxlength: 120 },
    category: { type: String, required: true, trim: true, maxlength: 60 },
    description: { type: String, required: true, trim: true, maxlength: 500 },
    descriptionVi: { type: String, trim: true, maxlength: 500 },
    tech: { type: String, required: true, trim: true, maxlength: 120 },
    imageUrl: { type: String, required: true },
    alt: { type: String, required: true, maxlength: 1000 },
    githubUrl: { type: String, required: true },
    demoUrl: { type: String },
    accent: {
      type: String,
      required: true,
      enum: ['primary', 'secondary', 'inverse-primary'],
    },
  },
  { timestamps: true, versionKey: false },
);

projectSchema.index({ title: 1 }, { unique: true });

export const ProjectModel = model('Project', projectSchema);

export type ProjectDocument = InstanceType<typeof ProjectModel>;

export { projectSchema };
