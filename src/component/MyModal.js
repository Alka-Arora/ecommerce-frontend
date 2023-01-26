import React,{useMemo,useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import { Input } from "../common/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAddItemMutation,useUpdateItemMutation } from "../api/react-user-query";
import { useFetchCategory } from "../api/react-get-query";


const schema = yup.object({
    name: yup.string().required("Name is Mandatory"),
    price: yup.number().required("Please fill the price of item"),
    category: yup.string().required("Please fill the category"),
    description: yup.string().required("Please fill the description of item"),
}).required();

const MyModal = (props) => {
    const { data} = useFetchCategory();
    const{mutate:addItem}=useAddItemMutation();
    const{mutate:updateItem}=useUpdateItemMutation();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: useMemo(() => {
            return props.editData;
        }, [props])
   
    });
    useEffect(() => {
        reset(props.editData);
    }, [props.editData]);

    const emptyInput = {
        name: "",
        price: "",
        category: "",
        description: ""
    };

    const onSubmit = (data) => {
        if (props.isEdit) {
            addItem(data);
        } else {
            updateItem({_id:props.editData._id,name:data.name,category:data.category,description:data.description,price:data.price});
        }
  
        reset(emptyInput);
        { props.onHide(); }
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
                        {props.button} Item
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                        <div className='ps-5 pe-5' >
                            <div className="mb-3">
                                <Input label="Name" error={errors.name?.message}{...register("name")} />
                            </div>
                            <div className="mb-3">
                                <Input label="Price" error={errors.price?.message}{...register("price")} />
                            </div>
              
                            <div className="mb-3">
                                <label className='mb-2'>Category</label>
                                <select className="form-select" aria-label="Default select example" error={errors.category?.message}{...register("category")}>
                                    {data?.map((curData) =>
                                        (<option key={curData._id}>{curData.name}</option>))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <Input label="Description" error={errors.description?.message}{...register("description")} />
                            </div>
                            <div className='text-end'>
                                <button className="btn me-3 text-white border-0 signUpButton" type="submit" >{props.isEdit ? "Add": "Update"}</button>
                                <button type="button" className="btn text-white border-0 signUpButton" onClick={props.onHide}>Close</button>
                            </div>

                        </div>
                    </form>
                </Modal.Body>


            </Modal>
        </>
    );
};


export default MyModal;
