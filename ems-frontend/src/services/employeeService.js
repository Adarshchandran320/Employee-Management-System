import api from "./api";
// Get all employees
export const getEmployees=()=>{
    return api.get("employees/");
}
// Get one employee by Id
export const getEmployee=(id)=>{
    return api.get(`employees/${id}/`);
}

// add a new employee
export const addEmployee=(employee)=>{
    return api.post("employees/",employee);
}

//update an existing employee
export const updateEmployee=(id,employee)=>{
    return api.patch(`employees/${id}/`,employee);
};

//Delete an employee
export const deleteEmployee=(id)=>{
    return api.delete(`employees/${id}/`);
};