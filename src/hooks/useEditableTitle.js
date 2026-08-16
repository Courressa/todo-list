import { useState, useRef, useEffect } from 'react';

export function useEditableTitle(initialTitle) {
  const inputRef = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(initialTitle);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const startEditing = () => {
    setWorkingTitle(initialTitle);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setWorkingTitle(initialTitle);
    setIsEditing(false);
  };

  const updateTitle = (newTitle) => {
    setWorkingTitle(newTitle);
  };

  const finishEdit = () => {
    setIsEditing(false);
    return workingTitle;
  };

  return {
    isEditing,
    workingTitle,
    startEditing,
    cancelEdit,
    updateTitle,
    finishEdit,
    inputRef
  };
}