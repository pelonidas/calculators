import React, {useState} from "react";
import {TextField} from "@mui/material";

export default function CourtCostsCard({label, amount, isLegalHelp, result, inputName, values, setValues, calculateTotal}) {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        console.log(name)
        setInputValue(value)
        const newValues = {
            ...values,
            [name]: value
        }
        setValues(newValues)
        calculateTotal(newValues)
    }


    const containerStyles = 'rounded px-[1.5rem] py-[1rem] drop-shadow-lg bg-white'

    const renderRate = () => {
        return (result * inputValue);
    }
    const renderVat = () => {
        return isLegalHelp
            ? renderRate() + ' €'
            : ((amount * inputValue) + ' €').replace('.', ',')
    }

    return (
        <div className={containerStyles}>
            <h2 className={'text-center font-semibold text-[1.2rem] mb-[1rem]'}>{label}</h2>
            <TextField value={inputValue} onChange={handleChange} name={isLegalHelp ? 'legalHelp' :inputName} fullWidth label={"Pocet ukonov"}/>
            <div className={'mt-[1rem] flex'}>
                <p><strong>Sadzba bez DPH:</strong></p>
                <p className={'ml-[0.5rem]'}>{renderVat()}</p>
            </div>
            {isLegalHelp ? (
                <>
                    <div className={'mt-[1rem] flex'}>
                        <p><strong>Sadzba s DPH:</strong></p>
                        <p className={'ml-[0.5rem]'}>{(renderRate() * 1.19).toFixed(2) + ' €'}</p>
                    </div>
                    <div className={'mt-[1rem] flex'}>
                        <p><strong>DPH:</strong></p>
                        <p className={'ml-[0.5rem]'}>{(renderRate() * 0.19).toFixed(2) + ' €'}</p>
                    </div>
                </>
            ) : undefined}
        </div>
    )
}
