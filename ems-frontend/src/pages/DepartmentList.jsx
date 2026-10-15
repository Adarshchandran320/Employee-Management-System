import { useEffect, useState, useCallback } from "react";
import { deleteDepartment, getDepartments } from "../services/departmentService";
import DepartmentForm from "./DepartmentForm";

function DepartmentList() {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    // department selected for editing (null = add mode)
    const [departmentToEdit, setDepartmentToEdit] = useState(null);

    const loadDepartments = useCallback(async () => {
        try {
            const response = await getDepartments();
            setError("");
            setDepartments(response.data);
        } catch (err) {
            console.error("Error loading departments:", err);
            setError("Unable to load departments.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadDepartments();
    }, [loadDepartments]);

    // send the selected department to the form
    const handleEdit = (department) => {
        setDepartmentToEdit(department);
        console.log(department);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this department?"
        );
        if (!confirmed) return;

        try {
            await deleteDepartment(id);
            // if the deleted row was being edited, leave edit mode
            if (departmentToEdit?.DepartmentId === id) {
                setDepartmentToEdit(null);
            }
            await loadDepartments();
        } catch (err) {
            console.error("Error deleting department:", err);
            alert("Unable to delete department.");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Departments</h2>

            {loading && <div className="alert alert-info">Loading departments...</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {!loading && !error && (
                <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Department Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.length > 0 ? (
                            departments.map((department) => (
                                <tr key={department.DepartmentId}>
                                    <td>{department.DepartmentId}</td>
                                    <td>{department.DepartmentName}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm"
                                            onClick={() => handleEdit(department)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm ms-2"
                                            onClick={() => handleDelete(department.DepartmentId)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">
                                    No departments found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}

            <DepartmentForm
                key={departmentToEdit?.DepartmentId ?? "new"}
                loadDepartments={loadDepartments}
                departmentToEdit={departmentToEdit}
                setDepartmentToEdit={setDepartmentToEdit}
            />
        </div>
    );
}

export default DepartmentList;