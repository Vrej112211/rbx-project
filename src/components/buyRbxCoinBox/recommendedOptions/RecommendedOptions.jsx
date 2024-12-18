import { memo } from "react";
import styles from './recommendedOptions.module.scss';
import { course } from "../buyRbxCoinsBox/BuyRbxCoinsBox";

export default memo(function RecommendedOptions({setRbxCoinsQuantity}) {
    const {recomentedOptionsCont} = styles;

    return (
        <div className={recomentedOptionsCont} >
            <button onClick={setRbxCoinsQuantity.bind(null, parseInt(500 / course))}><span>500$</span></button>
            <button onClick={setRbxCoinsQuantity.bind(null, parseInt(1000 / course))}><span>1000$</span></button>
        </div>
    )
});