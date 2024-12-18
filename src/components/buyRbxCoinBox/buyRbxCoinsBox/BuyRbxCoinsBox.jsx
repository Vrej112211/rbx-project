import { memo, useRef, useState } from "react"
import RbxCoinsChangerSlider from "../rbxCoinsChangerSlider/RbxCoinsChangerSlider";
import Input from "../input/Input";
import styles from './buyRbxCoinsBox.module.scss';
import RecommendedOptions from "../recommendedOptions/RecommendedOptions";

export const course = 0.7; // 2R$ = 0.7RUB
const minRbxCoins = 20;
const maxRbxCoins = 20000;

const BuyRbxCoinsBox = function() {
    const {buyRbxCoinsBox, toolsCont, firstText, secondTextCont, infoText, thirdTextCont, submitBtn} = styles;

    const minRubRef = useRef(parseFloat((minRbxCoins * course).toFixed(1)));
    const maxRubRef = useRef(parseFloat((maxRbxCoins * course).toFixed(1)));
    
    const [rbxCoinsQuantity, setRbxCoinsQuantity] = useState(675);
    // const rub = 

    return (
        <div className={buyRbxCoinsBox}>
            <div className={toolsCont} >
                <div className={firstText}>Ты платишь</div>

                <Input type='Rub' value={parseFloat((rbxCoinsQuantity * course).toFixed(1))} min={minRubRef.current} max={maxRubRef.current} setRbxCoinsQuantity={setRbxCoinsQuantity} />
                <RecommendedOptions setRbxCoinsQuantity={setRbxCoinsQuantity} />

                <div className={secondTextCont}>
                    <span>Ты получаешь</span>
                    <div className={infoText}>
                        +0 R$
                    </div>
                </div>

                <Input type='RbxCoin' value={rbxCoinsQuantity} min={20} max={20000} setRbxCoinsQuantity={setRbxCoinsQuantity} />

                <RbxCoinsChangerSlider min={20} max={10000} step={5} rbxCoinsQuantity={rbxCoinsQuantity} setRbxCoinsQuantity={setRbxCoinsQuantity} />

                <div className={thirdTextCont}>
                    <span>Доступно:</span>
                    <span className={infoText}>
                        292 938 R$
                    </span>
                </div>
            </div>

            <button className={submitBtn}>Купить робуксы</button>
        </div>
    )
}

export default memo(BuyRbxCoinsBox);