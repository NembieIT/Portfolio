import { Schema, model } from 'mongoose';

const contactMessageDocSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, maxlength: 254 },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
  },
  { timestamps: true, versionKey: false },
);

contactMessageDocSchema.index({ createdAt: -1 });

export type ContactMessageDocument = InstanceType<typeof ContactMessageModel>;

export const ContactMessageModel = model('ContactMessage', contactMessageDocSchema);
