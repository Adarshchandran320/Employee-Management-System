import { useState,useEffect, useCallback } from "react";
import { getEmployees, deleteEmployee } from "../services/employeeService";
import EmployeeForm from "./EmployeeForm";

function EmployeeList(){
    // store employee data
    const[employees,setEmployees]=useState([]);
    // store loading status
    const[loading,setLoading]=useState(true);
    // store error message
    const[error,setError]=useState("");

    const [employeeToEdit, setEmployeeToEdit] = useState(null);

    // load employees from the backend
    const loadEmployees=useCallback(async()=>{
        try{
            const response = await getEmployees();
            setError("");
            setEmployees(response.data);
        }catch(err){
            console.error("Error fetching employees:",err);
            setError("Unable to load employees. Please try again.")
        }finally{
            setLoading(false);
        }
    },[]);

    // run once when the page opens
    useEffect(()=>{
        loadEmployees();
    },[loadEmployees]);

    // delete an employee after confirmation
    const handleDelete=async(id)=>{
        const confirmed=window.confirm(
            "Are you sure you want to delete this employee?"
        );
        if(!confirmed){
            return;
        }
        try{
            await deleteEmployee(id);
            // refresh the employee list
            await loadEmployees();
        }catch(err){
            console.error("Error deleting employee:",err);
            alert("Unable to delete employee.");
        }
    };

    return(
        <div className="container mt-4">
            <h2 className="mb-3">Employee List</h2>
            {loading&&(
                <div className="alert alert-info">
                    Loading employees...
                    </div>
            )}

            {error&&(
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {!loading && !error && (
                <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Department</th>
                            <th>Projects</th>
                            <th>Date of Joining</th>
                            <th>Contact</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length>0?(
                            employees.map((employee)=>(
                                <tr key={employee.EmployeeId}>
                                    <td>{employee.EmployeeId}</td>
                                    <td>{employee.EmployeeName}</td>
                                    <td>{employee.Designation}</td>
                                    {/* Department comes nested from the serializer */}
                                    <td>{employee.Department?.DepartmentName ||"not assigned"}</td>
                                    <td>
                                        {employee.project_details?.join(",") || "No projects"}
                                    </td>
                                    <td>{employee.DateOfJoining}</td>
                                    <td>{employee.Contact}</td>
                                    <td>{employee.IsActive?"Active":"Inactive"}</td>
                                    <td>
                                        <button className="btn btn-warning btn-sm me-2" onClick={()=>setEmployeeToEdit(employee)}>Edit</button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={()=>handleDelete(employee.EmployeeId)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ):(
                            <tr>
                                <td colSpan="9" className="text-center">
                                    No employees found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}

            
            {/* form to add a new employee; refreshes the list after saving */}
            <EmployeeForm
                key={employeeToEdit?.EmployeeId ?? "new"}
                loadEmployees={loadEmployees}
                employeeToEdit={employeeToEdit}
                onCancelEdit={()=>setEmployeeToEdit(null)}
            />
        </div>
    )
}

export default EmployeeList;