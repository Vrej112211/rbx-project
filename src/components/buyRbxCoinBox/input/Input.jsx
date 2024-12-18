import { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from './input.module.scss';
import { course } from "../buyRbxCoinsBox/BuyRbxCoinsBox";

export default memo(function Input({value, min, max, type, setRbxCoinsQuantity}) {
    const {inputCont, active, input, currency} = styles;
    const [isActive, setIsActive] = useState(false);

    const [inputValue, setInputValue] = useState(value);

    // const differentIsActive = useState(isActive);
    useLayoutEffect(() => {
        if(!isActive) setInputValue(value);
    }, [value]);  
    
    function handleChange(e) {
        let newInputValue = e.target.value;

        if(newInputValue[0] === '0') return setInputValue(min)
        else if(newInputValue.length > 1) {
            if(newInputValue[0] === '-') return setInputValue(min)
            else if(newInputValue[0] === '+') newInputValue = newInputValue.slice(1);
        }
        else if(newInputValue.length === 1 && (/[+-]/).test(newInputValue[0])) return setInputValue(newInputValue)

        if(isNaN(e.target.value)) return 


        // if((newInputValue && +newInputValue <= 0) || +newInputValue < min) newInputValue = min;
        // else 
        if(+newInputValue > max) newInputValue = max;

        setInputValue(newInputValue);
    }

    useEffect(() => {
        let newRbxCoinsQuentity;
        if(type == 'Rub') {
            newRbxCoinsQuentity = parseInt(inputValue / course);
        }else if(type === 'RbxCoin') {
            newRbxCoinsQuentity = parseInt(inputValue);
        }
        
        if(!isNaN(newRbxCoinsQuentity)) setRbxCoinsQuantity(newRbxCoinsQuentity)
    }, [inputValue]);

    function handleBlur(e) {
        setIsActive(false);

        if(isNaN(inputValue) || +inputValue < min) return setInputValue(min)

        if(type === 'Rub') {
            console.log(inputValue, parseInt(inputValue / course), parseInt(inputValue / course) * course)
            setInputValue(parseFloat((parseInt(inputValue / course) * course).toFixed(1)));
        }else if(type === 'RbxCoin') {
            setInputValue(parseInt(inputValue));
        }
    }
    const handleFocus = () => setTimeout(() => setIsActive(true), 0);

    return (
        <div className={`${inputCont} ${isActive && active}`} >
            <div className={input}>
                <input type="text" value={inputValue} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} />
                <div className={currency}>
                    {
                        type === 'Rub' ? '$' : 
                        type === 'RbxCoin' ? 'R$' : 
                        null
                    }
                </div>
            </div>
        </div>
    )
});