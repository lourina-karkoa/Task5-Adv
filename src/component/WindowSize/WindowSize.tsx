import { useEffect, useState } from "react";

interface WindowSize {
    width: number;
}

export default function useWindowSize() {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: 0,
    });

    useEffect(() => {
        function handleReSize() {
            setWindowSize({
                width: window.innerWidth,
            });
        }
        window.addEventListener('resize', handleReSize);
        handleReSize();

        return () => window.removeEventListener('resize', handleReSize);
    }, []);

    return windowSize;
}
// export default function WindowSize() {

//   return (
//     <div>WindowSize</div>
//   )
// }
