import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "../src/common/input";
import Button from "../src/component/Button";
import { useLoginMutation } from "../src/api/react-user-query";
import Link from "next/link";

const schema = yup.object({
    email: yup.string().required("Email can't be empty"),
    password: yup.string().required("Password is mandatory"),
}).required();


const LogIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { mutate, isLoading } = useLoginMutation();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = data => {
        mutate(data);
        
    };
    

    return (
        <>
            <div className='w-50 signUp mx-auto mt-3 border bg-white p-3'>
                <h3 className='text-center mb-3'>LOGIN</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <Input label="Email address" error={errors.email?.message}{...register("email", {
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: "Please enter a valid email",
                            },
                        })} />

                    </div>
                    <div className="mb-5 fontAwesome ">
                        <Input type={showPassword ? "text" : "password"} className="form-control" label="Password" error={errors.password?.message}{...register("password")} />
                        {!showPassword ?
                            <i className="fa fa-eye fontIcon" onClick={() => { setShowPassword(true); }} aria-hidden="true"></i> :
                            <i className="fa fa-eye-slash fontIcon" onClick={() => { setShowPassword(false); }}></i>}
                    </div>
                    <div className="d-grid">
                        <Button type="submit" name="Login" isLoading={isLoading} />
                    </div>
                    <small>Not registered?<Link href="/signup" className='text-primary'>click here to signup</Link></small>
                </form>
            </div>

        </>
    );
};

export default LogIn;

