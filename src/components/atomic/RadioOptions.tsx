import React, { PropsWithChildren } from "react";
import { radioStyles, typography } from "../../lib/styles";
import { SortByT } from "../../lib/types";

type RadioOptionsProps = {
    groupName: string
    options: { [key: string]: string }
    selection: string
    setSelection: React.Dispatch<React.SetStateAction<any>>
}

export default function RadioOptions({ groupName, options, selection, setSelection }: PropsWithChildren<RadioOptionsProps>) {

    const fragments: JSX.Element[] = []
    Object.keys(options).forEach(criterion => {
        fragments.push(
            <label key={criterion} className={radioStyles.label}>
                <input
                    name={groupName}
                    className='form-radio'
                    type='radio'
                    value={criterion}
                    checked={selection === criterion}
                    onChange={e => { setSelection(criterion) }}
                />
                <span className='ml-2'>{options[criterion]}</span>
            </label>
        )
    })

    return (
        <fieldset className={radioStyles.fieldSet} >
            <legend className={`${typography.body} mb-2`}>{groupName}</legend>
            <div className='flex justify-between'>
                <div className='flex justify-end gap-3'>
                    {fragments}
                </div>
            </div>
        </fieldset>
    )
}