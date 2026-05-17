import type { ApolloClient } from "@apollo/client";
import { GetProfilePictureUploadUrlDocument } from "@/graphql/graphql-types";

export async function putFileToSignedUrl(
  url: string,
  file: File,
): Promise<void> {
  const buffer = await file.arrayBuffer();
  const blob = new Blob([new Uint8Array(buffer)], { type: file.type });
  const res = await fetch(url, {
    method: "PUT",
    body: blob,
    headers: { "cache-control": "must-revalidate" },
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
    query: GetProfilePictureUploadUrlDocument,
    fetchPolicy: "network-only",
  });
  const uploadUrl = data?.profilePictureUrl;
  if (!uploadUrl) {
    throw new Error("Could not get upload URL for profile picture.");
  }
  await putFileToSignedUrl(uploadUrl, file);
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
