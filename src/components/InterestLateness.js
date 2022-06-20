import React from "react";
import {TextField} from "@mui/material";
import {useState} from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import useInput from "../hooks/useInput";

export default function InterestLateness() {
    const [splatnost, setSplatnost] = useState(null);
    const [omeskanaSplatnost, setOmeskanaSplatnost] = useState(null);
    const [result, setResult] = useState(null);
    const [sum, handleSum] = useInput();
    const [interest, handleInterest] = useInput();

    const calculateDateDifference = (date1, date2) => {
        const diffTime = Math.abs(date2 - date1);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    }

    const calculateResult = (sum, nInterest, days) => {
        return ((sum/100 * nInterest) / 365) * days;
    }

    const handleClick = () => {
        console.log(calculateDateDifference(omeskanaSplatnost, splatnost ))
        setResult(calculateResult(sum, 5, calculateDateDifference(omeskanaSplatnost, splatnost)))
    }

    return (
        <div className={'w-[60%] flex flex-col mx-auto'}>
            <div className={'grid grid-cols-3 gap-24 mt-[2.5rem]'}>
                <TextField id="outlined-basic" label="Suma úrokov" variant="outlined" onChange={handleSum} value={sum}/>
                <TextField id="outlined-basic" label="Výška úroku(%)" variant="outlined" onChange={handleInterest} value={interest}/>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Splátnosť dlhu"
                        value={splatnost}
                        onChange={(newValue) => {
                            setSplatnost(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Očakavaná splátnosť dlhu"
                        value={omeskanaSplatnost}
                        onChange={(newValue) => {
                            setOmeskanaSplatnost(newValue)
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>
            <p className={'my-[1.5rem]'}>Vysledok: {result ? result.toFixed(2).replace('.', ',') : 0} EUR</p>
            <div
                className={'mx-auto bg-red-400 flex justify-center items-center rounded-md text-white cursor-pointer w-1/3 h-[3rem]'}
                onClick={handleClick}
            >
                Vypočítaj
            </div>
        </div>
    )
}
