import {TableCell} from "../TableCell";
import {useState} from "react";

export const TableRow = ({setValues, removeValues, data, id, notEditableIndex, patchCellFunction, isCheckedVal}) => {
    const [isChecked, setIsChecked] = useState(false);
    const keys = Object.keys(data)
    const cells = Object.values(data).map((cell, index) => <TableCell patchCellFunction={patchCellFunction}
                                                                      id={id}
                                                                      editKey={keys[index]}
                                                                      notEditable={index === notEditableIndex}
                                                                      key={cell + index} cell={cell}/>)

    const setNewValues = () => {
        if (!isChecked) {
            setValues(id)
        } else {
            removeValues(id)
        }
        setIsChecked(!isChecked)
    }

    return (
        <div className="table__row">
            {isCheckedVal ?
                <input type={'checkbox'} value={isChecked} onChange={setNewValues} checked={isCheckedVal}/> :
                <input type={'checkbox'} value={isChecked} onChange={setNewValues}/>
            }
            {cells}
        </div>
    )
}