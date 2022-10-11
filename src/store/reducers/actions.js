import {companiesActions} from "./companies/actions";
import {employeeActions} from "./employee/actions";

export const actions = {
    ...companiesActions,
    ...employeeActions
}