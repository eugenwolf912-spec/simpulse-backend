export function formatBoardTime(input: Date): string {
  return input.toISOString().slice(11, 16)
}
