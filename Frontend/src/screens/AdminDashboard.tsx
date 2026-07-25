import axios from "axios";
import { useEffect, useState } from "react";
import { adminSignout, changeStatus, getLead } from "../apiEndpoints";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AdminDashoboard() {
    const [leadData, setLeadData] = useState<any>(null);
    const [showLeadData, setShowLeadData] = useState<any>(null);
    const [newLeadsData, setNewLeadsData] = useState<any>(null);
    const [contactedLeadsData, setContactedLeadsData] = useState<any>(null);
    const [closedLeadsData, SetClosedLeadData] = useState<any>(null);

    const [loading, setLoading] = useState<boolean>(true);

    const navigate = useNavigate();

    async function getAllLead() {
        try {
            const response = await axios.get(getLead, { withCredentials: true });
            if (!response) {
                toast.error("Failed to fetch details");
                return;
            }
            if (!response.data.success) {
                toast.error(response.data.message);
                return;
            }
            setLeadData(response.data.allLeads);
            setShowLeadData(response.data.allLeads);
        } 
        catch (error) {
            toast.error("Failed to fetch the data");
        } 
        finally {
            setLoading(false);
        }
    }

    const handleChangeStatus = async(lead : any) => {
        try{
            setLoading(true);
            if(lead.status === "Closed"){
                toast.error("Lead is already closed");
                return;
            }
            const newStatus = lead.status === "New" ? "Contacted" : "Closed";
            const response = await axios.put(`${changeStatus}/${lead.id}`, {
                newStatus,
            }, {withCredentials : true});
            if(response?.data?.success){
                toast.success("Lead updated successfully");
                getAllLead();
            }
            else if(!response?.data?.success){
                toast.error(response.data.message);
            }
        }
        catch(error){
            toast.error("Updation failed");
        }
        finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllLead();
    }, []);


    function allLeads(){
        setShowLeadData(leadData);
    }

    function newLeads(){
        if(newLeadsData !== null){
            setShowLeadData(newLeadsData);
            return;
        }
        const data = leadData.filter((lead : any) => lead.status === "New");
        setNewLeadsData(data);
        setShowLeadData(data);
    }

    function contactedLeads(){
        if(contactedLeadsData !== null){
            setShowLeadData(contactedLeadsData);
            return;
        }
        const data = leadData.filter((lead : any) => lead.status === "Contacted");
        setContactedLeadsData(data);
        setShowLeadData(data);
    }

    function closedLeads(){
        if(closedLeadsData !== null){
            setShowLeadData(closedLeadsData);
            return;
        }
        const data = leadData.filter((lead : any) => lead.status === "Closed");
        SetClosedLeadData(data);
        setShowLeadData(data);
    }

    if (loading) {
        return (
            <div className="w-screen h-screen flex items-center justify-center text-black font-bold">
            Loading...
            </div>
        );
    }

    async function signoutHandler(){
        try{
            await axios.get(adminSignout, {withCredentials : true});
            toast.success("Signout successfull");
            navigate("/", {replace : true})
        }
        catch(err){
            toast.error("Request failed");
        }
    }

    return (
    <div className="min-h-screen bg-amber-100 px-4 py-8 w-full">
        
        <div className="flex justify-evenly w-full">
            <div className="w-full flex justify-center items-center gap-2">
                <button onClick={() => allLeads()} 
                    className={`border border-amber-700 p-2 rounded-md ${showLeadData === leadData && "bg-amber-300"}`}>All Leads</button>
                <button onClick={() => newLeads()} 
                    className={`border border-amber-700 p-2 rounded-md ${showLeadData === newLeadsData && "bg-amber-300"}`}>New Leads</button>
                <button onClick={() => contactedLeads()} 
                    className={`border border-amber-700 p-2 rounded-md ${showLeadData === contactedLeadsData && "bg-amber-300"}`}>Contacted Leads</button>
                <button onClick={() => closedLeads()}
                    className={`border border-amber-700 p-2 rounded-md ${showLeadData === closedLeadsData && "bg-amber-300"}`}>Closed Leads</button>
            </div>
            <div>
                <button onClick={() => signoutHandler()} className="bg-red-500 text-white p-2 border border-black hover:bg-red-700 rounded-md font-bold">Signout</button>
            </div>
        </div>

        <h1 className="text-xl font-semibold text-gray-900 mb-4">Leads</h1>
        
        <div className="mx-auto">

            <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            S.No.
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Budget From
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Budget To
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Message
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Edit
                        </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {showLeadData?.map((lead: any, index: number) => (
                        <tr key={lead.id ?? index}>
                            <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{index + 1}</td>
                            <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{lead.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{lead.email}</td>
                            <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{lead.budgetFrom}</td>
                            <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{lead.budgetTo}</td>
                            <td className="px-4 py-3 text-sm text-gray-900 max-w-xs truncate">{lead.message}</td>
                            <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{lead.status}</td>
                            <td className="px-4 py-3 text-sm whitespace-nowrap">
                            <button
                                onClick={() => handleChangeStatus(lead)}
                                className="bg-blue-600 text-white text-sm font-medium px-3 py-1.5 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Change Status
                            </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
}
