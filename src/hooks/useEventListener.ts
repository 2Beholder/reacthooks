import { useEffect, useRef } from 'react';

/**
 * useEventListener - Add an event listener to a target element
 * 
 * @param eventName - The name of the event (e.g., 'keydown', 'click')
 * @param handler - The event handler function
 * @param element - The target element (defaults to window)
 */
export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element: Window | HTMLElement = window
): void {
  // Create a ref that stores handler
  const savedHandler = useRef<(event: WindowEventMap[K]) => void>();

  // Update ref.current value if handler changes
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // Make sure element supports addEventListener
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    // Create event listener that calls handler function stored in ref
    const eventListener = (event: Event) => {
      savedHandler.current?.(event as WindowEventMap[K]);
    };

    // Add event listener
    element.addEventListener(eventName, eventListener);

    // Remove event listener on cleanup
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}
