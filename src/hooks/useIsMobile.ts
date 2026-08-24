import { useEffect, useState } from 'react';

const MOBILE_MAX_WIDTH = 768;

const getIsMobile = () =>
    window.matchMedia('(pointer: coarse)').matches &&
    window.innerWidth <= MOBILE_MAX_WIDTH;

/**
 * Reactive mobile detection (touch pointer + narrow viewport), re-evaluated on
 * resize/orientation change. Unlike the master site, there is no heavy engine
 * to tear down here, so reacting live (e.g. on phone rotation) is cheap.
 */
export default function useIsMobile(): boolean {
    const [isMobile, setIsMobile] = useState(getIsMobile());

    useEffect(() => {
        const onResize = () => setIsMobile(getIsMobile());
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return isMobile;
}
