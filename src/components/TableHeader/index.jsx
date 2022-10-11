export const TableHeader = ({keys, setCheckBoxFunction, checkBoxValue}) => {
    const headers = keys.map((header, index) => <div key={header + index}>{header}</div>)
    // console.log(headers)
    return (
        <div className={'table__row table__headers'}>
            {/*<div>&nbsp;</div>*/}
            <input type={'checkbox'} value={checkBoxValue} onChange={() => setCheckBoxFunction(!checkBoxValue)}
                   className={'table__checkbox'}/>
            {headers}
        </div>
    )
}