import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useFetchCategory } from "../api/react-get-query";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { addCategoryId } from "../features/itemSlice";
const Sidebar = () => {
    const dispatch = useDispatch();
    const { data} = useFetchCategory();
    const categoryId = useSelector((state) => state.item.value);
    const category = data?.filter((elem) => elem._id === categoryId);

    return (
        <>
            <div className='col-3 col-md-2 sideBar addButton shadow p-3 mt-5'>
                <ul className='list-unstyled sideBarText sideBarList fw-bold fs-6'>
                    <li><Link href="/" className='mb-2 fw-bold fs-6 ms-3'>Home</Link></li>
                    <Dropdown>
                        <Dropdown.Toggle className=" fw-bold fs-6 ms-1 sideBarText border-0" id="dropdown-basic">
                            {category?.length > 0 ? `${category?.map((elem) => elem.name)}` : "All"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {data?.map((curData) =>
                                <Dropdown.Item key={curData._id}className='dropdown-item' onClick={() => dispatch(addCategoryId(curData._id))} active={curData._id === categoryId}>{curData.name}</Dropdown.Item>)}
                            <Dropdown.Item onClick={() => dispatch(addCategoryId("all"))}active={"all" === categoryId}>All</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <li><Link href="/" className='mb-2 fw-bold fs-6 ms-3'>Contact Us</Link></li>
                </ul>

            </div>
        </>

    );
};

export default Sidebar;



