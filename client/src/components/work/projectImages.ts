import chattimeImg from '../../pics/chattime.jpg';
import smartchefImg from '../../pics/smartchef.jpg';
import taskmanageImg from '../../pics/taskmanage.jpg';

export const PROJECT_IMAGES: Readonly<Record<string, string>> = {
  ChatTime: chattimeImg,
  SmartChefAI: smartchefImg,
  'Task Manager': taskmanageImg,
};

export function resolveProjectImage(title: string, fallbackUrl: string): string {
  return PROJECT_IMAGES[title] ?? fallbackUrl;
}
