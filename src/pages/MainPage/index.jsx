import {useActions} from "../../hooks/useActions";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {CompaniesTable} from "../../components/CompaniesTable";
import {EmployeesTable} from "../../components/EmployeesTable";

export const MainPage = () => {
    const {getCompanies} = useActions()
    const companies = useSelector((state) => state.companiesReducer.companies)
    const checkedCompanies = useSelector((state) => state.companiesReducer.checkedCompanies)
    const checkedEmployees = useSelector((state) => state.employeeReducer.checkedEmployees)
    const [amount, setAmount] = useState(20)

    const handleScroll = (e) => {
        const scrollHeight = e.target.documentElement.scrollHeight;
        const currentHeight = Math.ceil(
            e.target.documentElement.scrollTop + window.innerHeight
        );
        if (currentHeight + 1 >= scrollHeight) {
            setAmount((prevState) => prevState + 20);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        getCompanies(amount)
    }, [amount])
    return (
        <div className={'page'}>
            <CompaniesTable amount={amount} checkedCompanies={checkedCompanies} companies={companies}/>
            {checkedCompanies.length === 1 ?
                <EmployeesTable checkedEmployees={checkedEmployees} amount={amount} companies={companies}
                                checkedCompanies={checkedCompanies}/> : <></>}
        </div>
    )
}