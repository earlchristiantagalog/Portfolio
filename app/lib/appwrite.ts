import { Client, Databases } from "appwrite";

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

let client: Client | null = null;
let databases: Databases | null = null;

export function getAppwriteClient(): { databases: Databases } | null {
  if (!endpoint || !projectId) return null;

  if (!client) {
    client = new Client().setEndpoint(endpoint).setProject(projectId);
    databases = new Databases(client);
  }

  return { databases: databases! };
}
