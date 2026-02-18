function displayName(
  username: string,
  firstname: string,
  lastname: string,
  isSelf: boolean = false,
): string {
  let formatted = "";
  if (!firstname) formatted = username;
  else formatted = firstname + (lastname ? " " + lastname : "");
  return formatted + (isSelf ? " (you)" : "");
}

export { displayName };
