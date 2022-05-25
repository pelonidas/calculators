import {useState} from "react";

export default (initValue = '') => {
    const [val, setVal] = useState(initValue)
    const handleChange = (e) => {
        setVal(e.target.value)
    }
    return [val, handleChange]
 }
