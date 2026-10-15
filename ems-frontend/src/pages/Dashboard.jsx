import { useEffect } from "react";
import api from "../services/api";
function Dashboard(){
    useEffect(()=>{
        //test whether the backend server is reachable
        api.get("departments/")
        .then(response=>{
            console.log("Backend connected");
            console.log(response.data);
        })
        .catch(error=>{
            console.log(error);
        });
    },[]);
    return(
        <div className="container mt-5">
            <h2>Dashboard</h2>
            <p>Checking Backend Connection......</p>
        </div>
    );
}
export default Dashboard;