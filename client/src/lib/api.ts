import {
  apiErrorSchema,
  contactMessageSchema,
  projectsResponseSchema,
  type ApiError,
  type ContactMessageInput,
  type ProjectsResponse,
} from '@shared/index';

export class ApiClientError extends Error {
  readonly code: string;

  constructor(error: ApiError['error']) {
    super(error.message);
    this.code = error.code;
    this.name = 'ApiClientError';
  }
}

async function readResponse(response: Response): Promise<unknown> {
  const body: unknown = await response.json();

  if (!response.ok) {
    const parsedError = apiErrorSchema.parse(body);
    throw new ApiClientError(parsedError.error);
  }

  return body;
}

export async function getProjects(): Promise<ProjectsResponse> {
  const response = await fetch('/api/v1/projects');
  const body = await readResponse(response);
  return projectsResponseSchema.parse(body);
}

export async function submitContact(input: ContactMessageInput): Promise<void> {
  const response = await fetch('/api/v1/messages/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contactMessageSchema.parse(input)),
  });
  await readResponse(response);
}
