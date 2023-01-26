import Layout from "../src/component/Layout";
import Sidebar from "../src/component/Sidebar";
import MyModal from "../src/component/MyModal";
import Table from "../src/component/Table";
import React, { useState } from "react";
import { useFetchItem } from "../src/api/react-get-query";
import AddCategoryModal from "../src/component/AddCategoryModal";
import { useSelector } from "react-redux";
import { admin } from "../src/common/utils";

function Admin() {
    const categoryId = useSelector((state) => state.item.value);
    const { data, isLoading } = useFetchItem(categoryId);
    const [modalShow, setModalShow] = React.useState(false);
    const [categoryShow, setCategoryShow] = React.useState(false);
    const [isUpdate, setIsUpdate] = React.useState(false);
    const [editData, setEditData] = useState({});

    const showModal = () => {
        setModalShow(true);
        setIsUpdate(true);
    };
    const editModal = (data) => {

        setEditData(data);
        setModalShow(true);
        setIsUpdate(false);
    };
    console.log(editData);
    const showCategory = () => {
        setCategoryShow(true);
    };

    return (
        isLoading ? <h3 className="text-center mt-5">Loading...</h3> :
            <>
                <Layout>
                    <AddCategoryModal show={categoryShow} onHide={() => setCategoryShow(false)} />
                    <MyModal show={modalShow}
                        onHide={() => setModalShow(false)} editData={editData} isEdit={isUpdate} button={isUpdate ? "Add" : "Update"} />
                    <div className="row">
                        <div className="col-md-3">
                            <Sidebar />
                        </div>
                        <div className="col-md-8 mt-5">
                            <div className="mt-5">
                                <button className='btn signUpButton text-white text ms-3' onClick={showModal}>Add Item</button>
                                <button className='btn signUpButton text-white text ms-3' onClick={showCategory}>Add Categoty</button>
                                <Table itemData={data} update={editModal} />
                            </div>
                        </div>
                    </div>
                </Layout>
            </>
    );
}
export default admin(Admin);