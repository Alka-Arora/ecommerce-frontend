import React, { useState,useEffect } from "react";
import { useFetchItem ,useFetchCartItem} from "../api/react-get-query";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useAddCartMutation} from "../api/react-user-query";

const Menu = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const { mutate } = useAddCartMutation();
    const { data: cartItem } = useFetchCartItem();
    const categoryId = useSelector((state) => state.item.value);
    const { data: item, isLoading } = useFetchItem(categoryId);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const login = JSON.parse(localStorage.getItem("login"));
            if (login?.role === "admin") {
                setIsAdmin(true);
            }
        }
    },[]);

    const handleSubmit = (id) => {
        const cartExist = cartItem.some((cart) => cart.itemId == id);
        if (cartExist) {
            alert("Already added to cart");
        } else {
            mutate({ id: id });

        }
    };
    return (
        isLoading ? <h3 className="text-center mt-5">Loading...</h3> :
            <>
                {item?.length === 0 ?
                    <h3 className='text-center mt-5'>No Item Found</h3> :
                    <div className="container  ">
                        <div className='row '>
                            {item?.map((elem) => {
                                const cart = cartItem?.findIndex((cart) => cart.itemId == elem._id);
                                const { name, description, category } = elem;
                                return (
                                    <>
                                        <div className='col-md-4 col-12 mt-5 card-height'>
                                            <div className="card bg-white">
                                                <div className="card-body">
                                                    <p className='text-success text-sm'>{category}</p>
                                                    <h5 className="card-title">{name}</h5>
                                                    <p className="card-text">{description}</p>
                                                    <Image src="/assets/maggi.jpg" className="card-img-top img-fluid img pb-3" width={250} height={200} alt="..." objectFit="cover" />
                                                    {cart > -1 ||isAdmin? <div className="btn text-white" /> :
                                                        <button className="btn signUpButton text-white" onClick={() => { handleSubmit(elem._id); }}>Order Now</button>}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                );
                            }
                            )}
                        </div>
                    </div>}
            </>
    );
};
export default Menu;
