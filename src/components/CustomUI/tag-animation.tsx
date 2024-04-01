import { useState, useEffect } from 'react';

type Props = {
    text?: string;
    className?: string;
    stepNumber?: number;
};

export default function TagAnimate({ stepNumber }: Props) {

    return (
        <div className={`flex relative flex-auto rounded-full bg-amber-500 p-1 overflow-hidden`}>
            <div className={`flex rounded-full h-10 items-center justify-center bg-white ${stepNumber === 3 ? 'animate-progress-extend' : ''}`}></div>
            {/* <span className=" top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-1 text-sm text-gray-800"></span> */}
        </div>
    )
}


// import React, { useState, useEffect } from 'react';

// export default function TagAnimate() {
//     const [isClicked, setIsClicked] = useState(false);

//     useEffect(() => {
//         if (isClicked) {
//             setIsClicked(false);
//         } else {
//             setIsClicked(true);
//         }
//     }, [isClicked]);

//     return (
//         <div className={`flex relative flex-auto rounded-full bg-amber-500 p-1 overflow-hidden`} onClick={() => setIsClicked(!isClicked)}>
//             <div
//                 className={`flex rounded-full h-10 items-center justify-center bg-white ${isClicked ? 'animate-progress-extend' : ''}`}

//             ></div>
//         </div>
//     );
// }