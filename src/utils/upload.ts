import type { ApolloClient } from "@apollo/client";
import {
  GetAvatarUploadDocument,
  GetEventImageUploadDocument,
  type UploadTicketFragment,
} from "@/graphql/graphql-types";

/**
 * Uploads a file using a backend-issued upload ticket. The ticket dictates the
 * HTTP method and the exact headers to send (e.g. cache-control / content-type
 * the backend signed into the URL); a mismatch would break the signature, so we
 * never hardcode them here.
 */
export async function uploadWithTicket(
  ticket: UploadTicketFragment,
  file: File,
): Promise<void> {
  const buffer = await file.arrayBuffer();
  const blob = new Blob([new Uint8Array(buffer)], { type: file.type });
  const headers = new Headers();
  for (const header of ticket.headers) {
    if (header) headers.set(header.name, header.value);
  }
  const res = await fetch(ticket.url, {
    method: ticket.method,
    body: blob,
    headers,
  });
  if (!res.ok) {
    throw new Error(`Upload failed with status ${res.status}`);
  }
}

export async function uploadProfilePicture(
  apollo: ApolloClient,
  file: File,
): Promise<void> {
  const { data } = await apollo.query({
    query: GetAvatarUploadDocument,
    variables: { contentType: file.type },
    fetchPolicy: "network-only",
  });
  const ticket = data?.avatarUpload;
  if (!ticket) {
    throw new Error("Could not get upload ticket for profile picture.");
  }
  await uploadWithTicket(ticket, file);
}

export async function uploadEventThumbnail(
  apollo: ApolloClient,
  eventId: number,
  file: File,
): Promise<void> {
  const { data } = await apollo.query({
    query: GetEventImageUploadDocument,
    variables: { eventId, contentType: file.type },
    fetchPolicy: "network-only",
  });
  const ticket = data?.eventImageUpload;
  if (!ticket) {
    throw new Error("Could not get upload ticket for event thumbnail.");
  }
  await uploadWithTicket(ticket, file);
}

export async function fileToBase64(file: File): Promise<string> {
  try {
    const reader = new FileReader();

    return await new Promise<string>((resolve) => {
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => resolve(""); // resolve with undefined on error
      reader.readAsDataURL(file);
    });
  } catch {
    return "";
  }
}
