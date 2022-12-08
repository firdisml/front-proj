import{ useEffect, useState } from 'react';
export const useInit = (callback) => {
    const [mounted, setMounted] = useState(false)

    const resetInit = () => setMounted(false)

    useEffect(() => {
        if (!mounted) {
            setMounted(true);
            callback();
        }
    }, [mounted, callback]);

    return [resetInit]
}