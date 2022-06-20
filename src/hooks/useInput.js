import {useState} from "react";

const useInput = (initValue = '') => {
    const [val, setVal] = useState(initValue)
    const handleChange = (e) => {
        setVal(e.target.value)
    }
    return [val, handleChange]
 }

 export default useInput;
