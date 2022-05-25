import React from "react";
import {useSelector} from "react-redux";

export default function CourtCostsSummaryCard(props) {
    const {withoutVat, withVat} = useSelector(state => state.courtCosts.sum)

    return (
        <div className={'bg-white drop-shadow-lg px-[1.5rem] py-[1rem] rounded-lg mt-[2rem] flex items-center'}>
            <h1 className={'text-[3rem]'}>Celková suma</h1>
            <div className={'ml-auto w-[40%] flex items-center justify-between text-[2rem]'}>
                <div>
                    <h4 className={'text-[0.85rem]'}>Sadzba s DPH</h4>
                    <p>{withVat ? (withVat).toFixed(2) + ' €': 0}</p>
                </div>
                <div>
                    <h4 className={'text-[0.85rem]'}>Sadzba bez DPH</h4>
                    <p>{withoutVat ? withoutVat + ' €' : 0 + ' €'}</p>
                </div>
            </div>
        </div>
    )
}
