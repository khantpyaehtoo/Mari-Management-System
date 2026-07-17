import { useEffect, useRef } from "react";
import { debounce } from "lodash";

export const useDebounceCallback = (callback, delay = 300) => {
    const callbackRef = useRef(callback);
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    const debouncedRef = useRef(null);

    useEffect(() => {
        const currentCallback = (...args) => {
            callbackRef.current(...args);
        };

        const handler = debounce(currentCallback, delay);

        debouncedRef.current = handler;

        // Cleanup
        return () => {
            handler.cancel();
        };
    }, [delay]);

    return (...args) => {
        if (debouncedRef.current) {
            debouncedRef.current(...args);
        }
    };
};
