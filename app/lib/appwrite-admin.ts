import { Client, Databases } from "appwrite";

let client: Client | null = null;

export function getAppwriteAdmin(): Databases | null {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  const apiKey = process.env.APPWRITE_API_KEY;

  if (!endpoint || !projectId || !apiKey) return null;

  if (!client) {
    client = new Client()
      .setEndpoint(endpoint)
      .setProject(projectId)
      .setDevKey(apiKey);
  }

  return new Databases(client);
}
