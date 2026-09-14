export const TODO_TITLE_MAX = 120;

export function isValidTodoTitle(title) {
  const trimmed = title.trim();
  return trimmed.length > 0 && trimmed.length <= TODO_TITLE_MAX;
}