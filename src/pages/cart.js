import React, {useMemo} from "react";
import { useFetchCartItem } from "../src/api/react-get-query";
import { useUpdateCartMutation, useDeleteCartMutation } from "../src/api/react-user-query";
import Layout from "../src/component/Layout";
import { user } from "../src/common/utils";

const cart = () => {
    const { data, isLoading } = useFetchCartItem();
    console.log(data?.length, "lenghth");
    const { mutate: updateCart } = useUpdateCartMutation();
    const { mutate: deleteCart } = useDeleteCartMutation();

    const handleIncrease = (item) => {
        updateCart({ id: item._id, quantity: item.quantity + 1 });
    };

    const handleDecrease = (item) => {
        if (item.quantity > 1) {
            updateCart({ id: item._id, quantity: item.quantity - 1 });

        }
    };

    const handleDelete = (id) => {
        deleteCart({ id });
    };

    const total = useMemo(() => {
        if (!data) return 0;
        let totalSum = 0;
        data.map(item => {
            totalSum += item.price * item.quantity;
        });
        return totalSum;
    }, [data]);

    return (
        isLoading ? <h3 className="text-center mt-5">Loading...</h3> :
            <>
                <Layout>

                    {data?.length === 0 ? <h2 className='text-center mt-5'>No item added to cart</h2> :
                        <div>
                            {data?.map((elem) =>
                                <div key={elem._id} className='mt-5'>
                                    <h1>Name:{elem.name}</h1>
                                    <h2>Price:{elem.price}</h2>
                                    <h3>Category:{elem.category}</h3>
                                    <h4>Description:{elem.description}</h4>
                                    <h3>total:{elem.price * elem.quantity}</h3>
                                    <div className='d-flex'><button className='btn signUpButton' onClick={() => handleDecrease(elem)}>-</button>
                                        <h4 className="border border-dark"> {elem.quantity} </h4>

                                        <button className='btn signUpButton' onClick={() => handleIncrease(elem)}>+</button>
                                    </div>
                                    <button className='btn signUpButton' onClick={() => handleDelete(elem._id)}>Delete</button>
                                </div>
                            )}
                            <div>All Total: {total}</div>
                        </div>}

                </Layout>
            </>
    );
};

export default user(cart);
