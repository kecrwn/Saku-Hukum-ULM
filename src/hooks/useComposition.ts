import * as React from "react"

export function useComposition<T = HTMLInputElement>({
  onKeyDown,
  onCompositionStart,
  onCompositionEnd,
}: {
  onKeyDown?: (e: React.KeyboardEvent<T>) => void;
  onCompositionStart?: (e: React.CompositionEvent<T>) => void;
  onCompositionEnd?: (e: React.CompositionEvent<T>) => void;
} = {}) {
  const [isComposing, setComposing] = React.useState(false);

  const handleCompositionStart = React.useCallback((e: React.CompositionEvent<T>) => {
    setComposing(true);
    onCompositionStart?.(e);
  }, [onCompositionStart]);

  const handleCompositionEnd = React.useCallback((e: React.CompositionEvent<T>) => {
    setComposing(false);
    onCompositionEnd?.(e);
  }, [onCompositionEnd]);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<T>) => {
    if (isComposing) {
      return;
    }
    onKeyDown?.(e);
  }, [isComposing, onKeyDown]);

  return {
    isComposing,
    onCompositionStart: handleCompositionStart,
    onCompositionEnd: handleCompositionEnd,
    onKeyDown: handleKeyDown,
  };
}
