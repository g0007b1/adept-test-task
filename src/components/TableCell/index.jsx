import {useState} from "react";

export const TableCell = ({cell, notEditable, id, patchCellFunction, editKey}) => {
    const [inputValue, setInputValue] = useState(cell)
    const onTextChange = (e) => {
        setInputValue(e.target.value)
    }
    const patchCell = () => {
        patchCellFunction(id, editKey, inputValue)
    }
    return (
        <div
            className="table__cell">
            {notEditable ? cell :
                <input
                    value={cell !== undefined ? inputValue : `loading...`}
                    onChange={onTextChange}
                    onBlur={patchCell}
                    type="text"/>
            }
        </div>
    )
}