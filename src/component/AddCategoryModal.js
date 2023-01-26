import React from "react";
import Modal from "react-bootstrap/Modal";
import { Input } from "../common/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAddCategoryMutation } from "../api/react-user-query";


const schema = yup.object({
    name: yup.string().required("Name is Mandatory"),
}).required();

const AddCategoryModal = (props) => {
    const { mutate } = useAddCategoryMutation();
    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema)
    });
    // const emptyInput = {
    //     name: "",
    //     price: "",
    //     category: "",
    //     description: ""
    // };

    const onSubmit = (data) => {
        mutate(data);
        console.log(data);
        {props.onHide();}
    
    };
    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className="sideBarText">
            Add Category
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                        <div className='ps-5 pe-5' >
                            <div className="mb-3">
                                <Input  error={errors.name?.message}{...register("name")} />
                            </div>
             
                            <div className='text-end'>
                                <button className="btn me-3 text-white border-0 signUpButton" type="submit" >Add</button>
                                <button type="button" className="btn text-white border-0 signUpButton" onClick={props.onHide}>Close</button>
                            </div>

                        </div>
                    </form>
                </Modal.Body>


            </Modal>
        </>
    );
};


export default AddCategoryModal;
