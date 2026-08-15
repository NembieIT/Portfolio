import { ContactMessageModel } from '../models/contact-message.model.js';
import { contactMessageSchema, type ContactMessageInput } from '@shared/index';

export type ContactMessageResult = { id: string; createdAt: Date };

export async function submitContactMessage(
  input: ContactMessageInput,
): Promise<ContactMessageResult> {
  const parsed = contactMessageSchema.parse(input);

  const doc = await ContactMessageModel.create(parsed);

  return { id: doc.id, createdAt: doc.createdAt };
}
