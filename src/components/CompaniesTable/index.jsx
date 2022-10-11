import {TableHeader} from "../TableHeader";
import {TableRow} from "../TableRow";
import {useActions} from "../../hooks/useActions";
import {useSelector} from "react-redux";

export const CompaniesTable = ({companies, amount, checkedCompanies}) => {
    const {
        addCheckedCompany,
        removeCheckedCompany,
        addCompany,
        patchCompanyCell,
        deleteCompany,
        setIsAllCompaniesChecked
    } = useActions()
    const isAllCompaniesChecked = useSelector((state) => state.companiesReducer.isAllCompaniesChecked)
    const addNewCompany = () => {
        addCompany(amount)
    }

    const deleteCompanies = () => {
        deleteCompany(checkedCompanies, amount)
    }

    const patchNewCompanyCell = (id, cell, inputValue) => {
        console.log(id, cell, inputValue)
        patchCompanyCell(id, cell, inputValue, amount)
    }

    const rows = companies.map((company, index) => <TableRow setValues={addCheckedCompany}
                                                             removeValues={removeCheckedCompany}
                                                             key={company + index}
                                                             id={company.id}
                                                             notEditableIndex={1}
                                                             patchCellFunction={patchNewCompanyCell}
                                                             isCheckedVal={isAllCompaniesChecked}
                                                             data={{
                                                                 name: company.name,
                                                                 employeesAmount: company.employeesAmount,
                                                                 address: company.address
                                                             }}/>)
    return (
        <div className={'table'}>
            <h3>Компании</h3>
            <TableHeader checkBoxValue={isAllCompaniesChecked} setCheckBoxFunction={setIsAllCompaniesChecked}
                         keys={['Название', 'Кол-во сотрудников', 'Адрес']}/>
            {rows}
            <button onClick={addNewCompany}>+</button>
            <br/>
            {checkedCompanies.length > 0 ? <button onClick={deleteCompanies}>Удалить</button> : <></>}
        </div>
    )
}