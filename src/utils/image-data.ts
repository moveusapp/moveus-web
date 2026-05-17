async function fileToBase64(file: File): Promise<string> {
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

export { fileToBase64 };
