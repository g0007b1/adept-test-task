import {useActions} from "../../hooks/useActions";
import {TableHeader} from "../TableHeader";
import {useSelector} from "react-redux";
import {TableRow} from "../TableRow";
import {useEffect} from "react";

export const EmployeesTable = ({checkedEmployees, checkedCompanies, companies, amount}) => {
    const {
        getEmployee,
        addEmployee,
        patchEmployeeCell,
        addCheckedEmployee,
        removeCheckedEmployee,
        deleteEmployee,
        setIsAllEmployeesChecked
    } = useActions()
    const isAllChecked = useSelector((state) => state.employeeReducer.IsAllEmployeesChecked)
    let employeesAmount = companies.filter(company => company.id === checkedCompanies[0])[0].employeesAmount
    const addNewEmployee = () => {
        addEmployee(checkedCompanies[0], employeesAmount, amount)
    }
    const patchNewEmployeeCell = (id, cell, inputValue) => {
        patchEmployeeCell(id, cell, inputValue, checkedCompanies[0])
    }
    const deleteEmployees = () => {
        deleteEmployee(checkedEmployees, checkedCompanies[0], employeesAmount, checkedEmployees.length, amount)
    }

    const employees = useSelector((state) => state.employeeReducer.employees)
    if (isAllChecked) {
        checkedEmployees = employees.map(emp => emp.id)
    }
    const rows = employees.map((employee, index) => <TableRow setValues={addCheckedEmployee}
                                                              removeValues={removeCheckedEmployee}
                                                              key={employee + index}
                                                              id={employee.id}
                                                              patchCellFunction={patchNewEmployeeCell}
                                                              isCheckedVal={isAllChecked}
                                                              data={{
                                                                  secondName: employee.secondName,
                                                                  name: employee.name,
                                                                  jobTitle: employee.jobTitle
                                                              }}/>)
    useEffect(() => {
        getEmployee(checkedCompanies[0])
    }, [checkedCompanies])


    return (
        <div className={'table'}>
            <h3>Сотрудники</h3>
            <TableHeader checkBoxValue={isAllChecked} setCheckBoxFunction={setIsAllEmployeesChecked}
                         keys={['Фамилия', 'Имя', 'Должность']}/>
            {rows}
            <button onClick={addNewEmployee}>+</button>
            {checkedEmployees.length > 0 ? <button onClick={deleteEmployees}>Удалить</button> : <></>}
        </div>
    )
}