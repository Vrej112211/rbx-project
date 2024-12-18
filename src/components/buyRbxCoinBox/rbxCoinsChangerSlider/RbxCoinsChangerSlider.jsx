import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './rbxCoinsChangerSlider.module.scss';
import useResizeWindow from '../../../hooks/useResizeWindow';

export default function RbxCoinsChangerSlider ({min=0, max, step=1, rbxCoinsQuantity, setRbxCoinsQuantity}) {
    const {sliderCont, slider, sliderTrack, sliderTumb} = styles;
    useResizeWindow();

    const fixedSliderTumbWidth = 100; //px --  set by css
    // const [sliderTumbLeftDistance, setSliderTumbLeftDistance] = useState(0); // in percent
    
    const sliderRef = useRef();
     
    const [isMounted, setIsMounted] = useState(false);
    // const [rbxCoinsQuantity, setRbxCoinsQuantity] = useState(defaultValue);
  
    const rbxCoinsQuantityInPercent = Math.min(100 * rbxCoinsQuantity / max, 100); 
    const sliderTumbLeftDistanceInPercent = isMounted ? Math.min(getSliderTumbLeftDistanceInPercent(sliderRef.current.offsetWidth, rbxCoinsQuantityInPercent, fixedSliderTumbWidth), 100) : 0;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className={sliderCont}>
            <div 
                className={sliderTumb} 
                style={{left: `${sliderTumbLeftDistanceInPercent}%`, transform: `translate(${sliderTumbLeftDistanceInPercent}, -50%)`}}
                onMouseDown={handleMouseDown}
            >
                <span>{rbxCoinsQuantity}</span>
            </div>

            <div ref={sliderRef} className={slider} onMouseDown={handleMouseDown} >
                <div className={sliderTrack} style={{width: `${rbxCoinsQuantityInPercent}%`}}></div>
            </div>
        </div>
    );

    function handleMouseDown(mouseDownEvent) {
        const { left: sliderLeft, right: sliderRight } = sliderRef.current.getBoundingClientRect();
        const sliderWidth = sliderRight - sliderLeft - fixedSliderTumbWidth;
    
        // Հաշվարկել տոկոսային արժեքը
        const calculatePercent = clientX =>
            ((clientX - sliderLeft - fixedSliderTumbWidth / 2) * 100) / sliderWidth;
    
        // Ֆորմատավորել արժեքը
        const formatValue = num => {
            const clampedNum = Math.min(Math.max(min, num), max);
            return Math.round(clampedNum / step) * step;
        };
    
        // Սկզբնական արժեքը
        const initialPercent = calculatePercent(mouseDownEvent.clientX);
        setRbxCoinsQuantity(formatValue((initialPercent * max) / 100));
    
        // Mouse move event
        const handleMouseMove = mouseMoveEvent => {
            const percent = calculatePercent(mouseMoveEvent.clientX);
            setRbxCoinsQuantity(formatValue((percent * max) / 100));
        };
    
        // Mouse up event
        const handleMouseUp = () => {
            document.body.classList.remove('cursor-grabbing');
            document.onmousemove = null;
            document.onmouseup = null;
        };
    
        // Սահմանել mousemove և mouseup
        document.onmousemove = handleMouseMove;
        document.onmouseup = handleMouseUp;
    
        // Set grabbing style
        document.body.classList.add('cursor-grabbing');
    }
}


function getSliderTumbLeftDistanceInPercent(sliderWidth, rbxCoinsQuantityInPercent, fixedSliderTumbWidth) {
    const sliderTumbLeftMaxDistance = sliderWidth - fixedSliderTumbWidth;
    const sliderTumbLeftDistanceWithTumbLeftMaxDistance = rbxCoinsQuantityInPercent * sliderTumbLeftMaxDistance / 100;

    return 100 * sliderTumbLeftDistanceWithTumbLeftMaxDistance / sliderWidth;
}


// function handleMouseDown(mouseDownEvent) {
//     const {left: sliderLeftDistance, right: slideRightDistance} = sliderRef.current.getBoundingClientRect();
//     const rbxCoinsNewQuantityInPercent = 100 * (mouseDownEvent.clientX - sliderLeftDistance - fixedSliderTumbWidth / 2) / (slideRightDistance - sliderLeftDistance - fixedSliderTumbWidth); // ... -248% ...  180% ...
//     setRbxCoinsQuantity(formatNum(rbxCoinsNewQuantityInPercent * max / 100, step, min, max));
//     console.log(rbxCoinsNewQuantityInPercent)
//     document.onmousemove = mouseMoveEvent => {
//         const rbxCoinsNewQuantityInPercent = 100 * (mouseMoveEvent.clientX - sliderLeftDistance - fixedSliderTumbWidth / 2) / (slideRightDistance - sliderLeftDistance - fixedSliderTumbWidth); // ... -248% ...  180% ...
//         setRbxCoinsQuantity(formatNum(rbxCoinsNewQuantityInPercent * max / 100, step, min, max));
//     }

//     document.body.classList.add('cursor-grabbing');
//     document.onmouseup = () => {
//         document.body.classList.remove('cursor-grabbing');
//         document.onmousemove = null;
//         document.onmouseup = null;
//     }

//     function formatNum(num, step, minRbxCoins, maxRbxCoins) {
//         let formatedNum = Math.min(Math.max(minRbxCoins, num), maxRbxCoins);
//         return Math.round(formatedNum / step) * step; // round to step
//     }
// }