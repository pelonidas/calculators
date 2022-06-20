import React from "react";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useState} from "react";
import useInput from "../hooks/useInput";

export default function TravelCosts() {
    const [type, setType] = useState('');
    const [obdobie, setObdobie] = useState('');
    const [fuelSum, setFuelSum] = useState(null);
    const [kilometerSum, setKilometerSum] = useState(null);
    const [total, setTotal] = useState(null);


    const [kilometers, handleKilometers] = useInput();
    const [usage, handleUsage] = useInput();
    const [fuelCost, handleFuelCost] = useInput();

    const calculateFuel = () => {
        return (usage*fuelCost*(kilometers/100))
    }

    const calculateKilometers = () => {
        console.log(kilometers)
        if (obdobie === 1) {
            if (type === 1) {
                return kilometers * 0.213
            } else {
                return kilometers * 0.059
            }
        } else {
            if (type === 1) {
                return kilometers * 0.193
            } else {
                return kilometers * 0.053
            }
        }
    }

    const calculateTotal = () => {
        return calculateFuel() + calculateKilometers();
    }

    const handleCalculate = () => {
        setFuelSum(calculateFuel())
        setKilometerSum(calculateKilometers())
        setTotal(calculateTotal())
    }

    return (
        <div className={'container'}>
            <FormControl variant="standard" className={'w-[18rem]'}>
                <InputLabel id="demo-simple-select-standard-label">Druh vozidla</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    label="Age"
                >
                    <MenuItem value={1}>Osobne cestne motorove vozidlo</MenuItem>
                    <MenuItem value={2}>Jednostopove vozidlo, trojkolka</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="standard" className={'w-[8rem]'}>
                <InputLabel id="demo-simple-select-standard-label">Obdobie</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={obdobie}
                    onChange={(e) => setObdobie(e.target.value)}
                    label="Age"
                >
                    <MenuItem value={1}>Od 1.5.2022</MenuItem>
                    <MenuItem value={2}>Do 30.4.2022</MenuItem>
                </Select>
            </FormControl>
            <TextField label="Počet najazdených km" variant="standard" className={'w-[12rem]'} value={kilometers} onChange={handleKilometers}/>
            <TextField label="Spotreba (l/100km)" variant="standard" className={'w-[12rem]'} value={usage} onChange={handleUsage}/>
            <TextField label="Cena pohonnej látky (€/l)" variant="standard" className={'w-[12rem]'} value={fuelCost} onChange={handleFuelCost}/>
            <div className={'flex gap-[1rem]'}>
                <p>Základná náhrada za najazdené km</p>
                <span>{ kilometerSum ? kilometerSum.toFixed(2).replace('.', ',') : 0} EUR</span>
            </div>
            <div className={'flex gap-[1rem]'}>
                <p>Náhrada za spotrebované pohonné látky</p>
                <span>{ fuelSum ? fuelSum.toFixed(2).replace('.', ',') : 0} EUR</span>
            </div>
            <div className={'flex gap-[1rem]'}>
                <p>Cestovné náhrady za použitie súkromného vozidla spolu</p>
                <span>{ total ? total.toFixed(2).replace('.', ',') : 0 } EUR</span>
            </div>
            <Button variant="outlined" onClick={handleCalculate} className={'w-[8rem]'}>Vypocitaj</Button>
        </div>
    )
}
