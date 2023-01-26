import React from "react";
import { useDeleteItemMutation } from "../api/react-user-query";
const Table = ({ itemData,update }) => {
    const{mutate}=useDeleteItemMutation();

    const delItem=(itemId)=>{
        mutate({_id:itemId});
    };
    return (
        <div>
            {itemData?.length>0?
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Category</th>
                            <th scope="col">Description</th>
                            <th scope="col"colSpan="2">Actions</th>
                        </tr>
                    </thead>
        
                    < tbody >
                        { itemData.map((curData, index) =>
                            <tr key={curData._id}>
                                <td>{index + 1}</td>
                                <td>{curData.name}</td>
                                <td>{curData.price}</td>
                                <td>{curData.category}</td>
                                <td>{curData.description}</td>
                                <td><i className="fa fa-edit"onClick={()=>update(curData)}></i></td>
                                <td><i className="fa fa-trash"onClick={()=>delItem(curData._id)}></i></td>
                            </tr>)}
                    </tbody>
                </table>:<h5 className="mt-5 text-center">No records Found</h5>}
        </div >
    );
};

export default Table;
