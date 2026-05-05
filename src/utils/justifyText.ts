/**
 * Justifie un texte.
 * @param text - La chaîne de caractères
 * @param lineWidth- La taille de la justification
 * @returns Le texte justifié
 */
export function justifyText(text: string, lineWidth: number = 80): string {
  const words = text.split(/\s+/);
  const lines: string[][] = [];
  let currentLine: string[] = [];

  for (const word of words) {
    const lineLength = currentLine.join(" ").length;

    if (lineLength + word.length + currentLine.length > lineWidth) {
      lines.push(currentLine);
      currentLine = [];
    }

    currentLine.push(word);
  }

  if (currentLine.length) {
    lines.push(currentLine);
  }

  return lines
    .map((line, index) => {
      if (index === lines.length - 1 || line.length === 1) {
        return line.join(" ");
      }

      const totalChars = line.join("").length;
      const spacesNeeded = lineWidth - totalChars;
      const gaps = line.length - 1;
      const spaceWidth = Math.floor(spacesNeeded / gaps);
      const extraSpaces = spacesNeeded % gaps;

      return line
        .map((word, i) => {
          if (i === line.length - 1) return word;
          const spaces = spaceWidth + (i < extraSpaces ? 1 : 0);
          return word + " ".repeat(spaces);
        })
        .join("");
    })
    .join("\n");
}