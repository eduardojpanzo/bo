export const buildInitials = (fullName: string) => {
  const first = fullName.split(" ").shift()?.charAt(0);
  const last = fullName.split(" ").pop()?.charAt(0);
  let sigla = " ";

  if (first && last) {
    sigla = first + last;
  }

  return sigla.toUpperCase();
};
