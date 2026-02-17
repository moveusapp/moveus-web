export function firstnameValidator(firstname: string): string | undefined {
  if (firstname.length < 2)
    return "Firstname must be at least 2 characters long.";
  if (firstname.length > 24)
    return "Firstname cannot be longer than 24 characters.";
  if (/[0-9]/.test(firstname)) return "Firstname can only contain letters.";
}

export function lastnameValidator(lastname: string): string | undefined {
  const problem = firstnameValidator(lastname);
  if (problem) return problem.replace("First", "Last");
}

export function bioValidator(bio: string): string | undefined {
  if (bio.length > 512) return "Bio cannot be longer than 512 characters.";
}
