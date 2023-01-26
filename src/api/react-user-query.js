import { useMutation,useQueryClient  } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";

const register = async (data) => {
    const requestOptions = {
        method: "POST",
        url: "http://localhost:8000/register",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(data),
    };
    console.log(data);
    const res = await axios(requestOptions);
    console.log(res);
    return res;
};

export const useRegisterMutation = () => {
    const router = useRouter();
    return useMutation((data) => register(data), {
        onSuccess: (res) => {
            if (res?.data.status === true) {
                alert(res?.data.message);
                router.push("/login");
            }
            else {
                alert(res?.data?.message, { appearance: "error" });
            }
        },
        onError: (error) => {
            alert(error?.response?.data?.message);
        },
    });
};

const login = async (data) => {
    const requestOptions = {
        method: "POST",
        url: "http://localhost:8000/login",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(data),
    };
    const res = await axios(requestOptions);
    return res;
};

export const useLoginMutation = () => {
    const router = useRouter();
    return useMutation((data) => login(data), {
        onSuccess: (res) => {
            if (res?.data.status === true) {
                alert(res?.data.message);
                router.push("/");
                console.log(res.data);
                const login={email:res.data.email,role:res.data.role};
                console.log(login);
                localStorage.setItem("login", JSON. stringify(login));
            }
            else {
                alert(res?.data?.message);
            }
        },
        onError: (error) => {
            alert(error?.response?.data?.message);
        },
    });
};

const addCategory = async (data) => {
    const requestOptions = {
        method: "POST",
        url: "http://localhost:8000/category",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(data),
    };
    const res = await axios(requestOptions);
    return res;
};

export const useAddCategoryMutation = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation((data) => addCategory(data), {
        onSuccess: (res) => {
            if (res?.data.status === true) {
                queryClient.invalidateQueries("category");
                alert(res?.data.message);
                router.push("/");
            }
            else {
                alert(res?.data?.message);
            }
        },
        onError: (error) => {
            alert(error?.response?.data?.message);
        },
    });
};



const addItem = async (data) => {
    const requestOptions = {
        method: "POST",
        url: "http://localhost:8000/items",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(data),
    };
    const res = await axios(requestOptions);
    return res;
};

export const useAddItemMutation = () => {
    const queryClient = useQueryClient();
    return useMutation((data) => addItem(data), {
        onSuccess: (res) => {
            if (res?.data.status === true) {
                alert(res?.data.message);
                queryClient.invalidateQueries("item");
            }
            else {
                alert(res?.data?.message);
            }
        },
        onError: (error) => {
            alert(error?.response?.data?.message);
        },
    });
};


const deleteItem = async (data) => {
    const requestOptions = {
        method: "DELETE",
        url: "http://localhost:8000/items",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(data),
    };
    const res = await axios(requestOptions);
    console.log(res);
    return res;
};

export const useDeleteItemMutation = () => {
    const queryClient = useQueryClient();
    return useMutation((data) => deleteItem(data), {
        onSuccess: (res) => {
            if (res?.data.status === true) {
                alert(res?.data.message);
                queryClient.invalidateQueries("item");
            }
            else {
                alert(res?.data?.message);
            }
        },
        onError: (error) => {
            alert(error?.response?.data?.message);
        },
    });
};

const updateItem = async (data) => {
    const requestOptions = {
        method: "PUT",
        url: "http://localhost:8000/items",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(data),
    };
    const res = await axios(requestOptions);
    console.log(res);
    return res;
};

export const useUpdateItemMutation = () => {
    const queryClient = useQueryClient();
    return useMutation((data) => updateItem(data), {
        onSuccess: (res) => {
            if (res?.data.status === true) {
                alert(res?.data.message);
                queryClient.invalidateQueries("item");
            }
            else {
                alert(res?.data?.message);
            }
        },
        onError: (error) => {
            alert(error?.response?.data?.message);
        },
    });
};

const addCart = async (data) => {
    const requestOptions = {
        method: "POST",
        url: "http://localhost:8000/cart",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(data),
    };
    const res = await axios(requestOptions);
    return res;
};

export const useAddCartMutation = () => {
    return useMutation((data) => addCart(data), {
        onSuccess: (res) => {
            if (res?.data.success === true) {
                alert(res?.data.message);
            }
            else {
                alert(res?.data?.message);
            }
        },
        onError: (error) => {
            alert(error?.response?.data?.message);
        },
    });
};


const updateCart = async (data) => {
    const requestOptions = {
        method: "PUT",
        url: "http://localhost:8000/cart",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(data),
    };
    const res = await axios(requestOptions);
    console.log(res);
    return res;
};

export const useUpdateCartMutation = () => {
    const queryClient = useQueryClient();
    return useMutation((data) => updateCart(data), {
        onSuccess: (res) => {
            if (res?.data.success === true) {

                queryClient.invalidateQueries("cart");
            }
            else {
                alert(res?.data?.message);
            }
        },
        onError: (error) => {
            alert(error?.response?.data?.message);
        },
    });
};


const deleteCart = async (data) => {
    const requestOptions = {
        method: "DELETE",
        url: "http://localhost:8000/cart",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(data),
    };
    const res = await axios(requestOptions);
    console.log(res);
    return res;
};

export const useDeleteCartMutation = () => {
    const queryClient = useQueryClient();
    return useMutation((data) => deleteCart(data), {
        onSuccess: (res) => {
            if (res?.data.success === true) {

                queryClient.invalidateQueries("cart");
            }
            else {
                alert(res?.data?.message);
            }
        },
        onError: (error) => {
            alert(error?.response?.data?.message);
        },
    });
};
