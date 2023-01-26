import React from "react";

const Button = ({type,name, isLoading,}) => {
    return (
        <>
            <button className=' btn text-white signUpButton'type={type}>{isLoading ? "Loading..." : name}</button>
        </>
    );
};

export default Button;
