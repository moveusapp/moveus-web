function displayName(
  username: string,
  firstname: string,
  lastname: string,
  currentUsername?: string,
): string {
  let formatted = "";
  if (!firstname) formatted = username;
  else formatted = firstname + (lastname ? " " + lastname : "");
  return formatted + (username === currentUsername ? " (you)" : "");
}

export { displayName };
