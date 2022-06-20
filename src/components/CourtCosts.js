import React, {useState} from "react";
import {
    Button,
    FormControl,
    MenuItem,
    TextField
} from "@mui/material";
import '../CourtCosts.css'
import useInput from "../hooks/useInput";
import CourtCostsCard from "./CourtCostsCard";
import {useDispatch, useSelector} from "react-redux";
import {setResult, setSumWithoutVat, setSumWithVat} from "../redux/courtCosts";
import CourtCostsSummaryCard from "./CourtCostsSummaryCard";

export default function CourtCosts() {
    const result = useSelector(state => state.courtCosts.result)
    const dispatch = useDispatch()


    const [sum, setSum] = useState('');

    // const [amount, handleAmountChange] = useInput();
    const [discount, handleDiscount] = useInput();

    const [values, setValues] = useState({
        legalHelp: '',
        oneThreeSix: '',
        oneFiveZero: '',
        oneSixFour: '',
        oneSevenEight: '',
        oneNineZero: '',
        sixNineFive: ''
    })
    const handleSumChange = (e) => {
        setSum(e.target.value)
        calculate(sum)
    }
    const calculateTotal = (newValues) => {
        const {oneThreeSix, oneFiveZero, oneSixFour, oneSevenEight, oneNineZero, sixNineFive, legalHelp} = newValues
        const newTotal =
            ((parseInt(oneThreeSix) * 4.51) || 0) +
            ((parseInt(oneFiveZero) * 4.98) || 0) +
            ((parseInt(oneSixFour) * 5.44) || 0) +
            ((parseInt(oneSevenEight) * 5.91) || 0) +
            ((parseInt(oneNineZero) * 6.31) || 0) +
            ((parseInt(sixNineFive) * 6.95) || 0)
            // ((parseInt(legalHelp) * result) || 0)
        const newTotalWithVat = newTotal + ((parseInt(legalHelp) * result * 1.19) || 0)
        const newTotalWithoutVat = newTotal + ((parseInt(legalHelp) * result) || 0)
        dispatch(setSumWithoutVat(newTotalWithoutVat))
        dispatch(setSumWithVat(newTotalWithVat))
    }

    const ukony = [
        {
            label: 'Režijný paušál á 136 Sk (4,51 €)',
            amount: 4.51,
            inputName: 'oneThreeSix'
        },
        {
            label: 'Režijný paušál á 150 Sk (4,98 €)',
            amount: 4.98,
            inputName: 'oneFiveZero'
        },
        {
            label: 'Režijný paušál á 164 Sk (5,44 €)',
            amount: 5.44,
            inputName: 'oneSixFour'
        },
        {
            label: 'Režijný paušál á 178 Sk (5,91 €)',
            amount: 5.91,
            inputName: 'oneSevenEight',
        },
        {
            label: 'Režijný paušál á 190 Sk (6,31 €)',
            amount: 6.31,
            inputName: 'oneNineZero'
        },
        {
            label: 'Režijný paušál á 6,95 €',
            amount: 6.95,
            inputName: 'sixNineFive'
        }
    ]
    const calculate = (input) => {
        const ceiling = (number, significance) => {
            return Math.ceil(number / significance) * significance;
        }
        if (input <= 6638.78) {
            dispatch(setResult(41.49 + ceiling((input - 663.88), 331.94) / 331.94 * 9.96));
            if (input < 165.97) {
                dispatch(setResult(result + 16))
            }
            if (input > 165.97 && input <= 663.88) {
                dispatch(setResult(result + 16.6 + ceiling((input - 165.97), 33.19) / 33.19 * 1.66))
            }
        }
        if (input > 6638.78 && input <= 33193.92) {
            dispatch(setResult(220.74 + ceiling((input - 6638.78), 1659.7) / 1659.7 * 16.6))
        }
        if (input > 33193.92) {
            dispatch(setResult(486.29 + ceiling((input - 33193.92), 3319.39) / 3319.39 * 6.64))
        } else {
            return 0;
        }

    }

    const calculateDiscount = () => {
        if (result) {
            return (result - result * (discount / 100))
        } else {
            return result;
        }
    }

    const renderPravneUkony = (calculateBy = 1, label = 'Náklady na jeden právny úkon:') => {
        return (
            <>
                <p className={'border'}>{label}</p>
                <p className={'text-center'}>{result ? (result * calculateBy).toFixed(2) : 0}</p>
                <p className={'text-center'}>{(calculateDiscount() * calculateBy).toFixed(2)}</p>
            </>
        )
    }
    return (
        <div className={'w-[60%] flex flex-col mx-auto'}>
            <FormControl sx={{m: 1, width: '33%'}}>
                <TextField id="standard-basic" label="Zadaj sumu" variant="standard" value={sum} type={"number"}
                           onChange={handleSumChange}/>
            </FormControl>
            <FormControl sx={{mt: 5, ml: 1, width: '15%'}}>
                <TextField
                    value={discount}
                    label="Zadajte zlavu"
                    select
                    onChange={handleDiscount}
                >
                    <MenuItem value={5}>5%</MenuItem>
                    <MenuItem value={10}>10%</MenuItem>
                    <MenuItem value={15}>15%</MenuItem>
                    <MenuItem value={20}>20%</MenuItem>
                    <MenuItem value={25}>25%</MenuItem>
                    <MenuItem value={30}>35%</MenuItem>
                </TextField>
            </FormControl>
            <div className={'mt-[1rem]'}>
                <div className={'ml-auto w-2/3 grid grid-cols-2'}>
                    <p className={'border'}>Ceník bez zľavy</p>
                    <p className={'border'}>Ceník zo zľavou</p>
                </div>
                <div className={'grid grid-cols-3'}>
                    {renderPravneUkony()}
                    {renderPravneUkony(2, 'Náklady na dva právne úkony:')}
                    {renderPravneUkony(3, 'Náklady na tri právne úkony:')}
                    {renderPravneUkony(4, 'Náklady na štyri právne úkony:')}
                    {renderPravneUkony(5, 'Náklady na päť právnych úkonov:')}
                </div>
            </div>
            <div className={'grid grid-cols-3 gap-7 mt-[3rem]'}>
                <CourtCostsCard result={result} setValues={setValues} calculateTotal={calculateTotal} values={values} isLegalHelp={true} label={"Úkon právnej pomoci"}/>
                {ukony.map((ukon, index) => (
                    <CourtCostsCard key={index} values={values} setValues={setValues} inputName={ukon.inputName}
                                    isLegalHelp={false} label={ukon.label} amount={ukon.amount}
                                    calculateTotal={calculateTotal}/>
                ))}
            </div>
            <div>
                <CourtCostsSummaryCard/>
            </div>
            {/*<Button sx={{width: '20%', mt: '2rem'}} variant={"contained"}*/}
            {/*        onClick={() => calculate(amount)}>Calculate</Button>*/}
        </div>
    )
}
