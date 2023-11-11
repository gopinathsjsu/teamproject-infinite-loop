"use client";

import { LoginUserInput, LoginUserSchema } from "@/src/lib/validations/user.schema";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiLoginUser } from "@/src/lib/auth-api";
import React, { useEffect, useState } from 'react';
import useStore from "@/src/store";
import { handleApiError } from "@/src/lib/helpers";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import './../styles/home.module.css'
import FormInput from "../components/formComponents/formInput";
import { LoadingButton } from "../components/formComponents/loadingButton";

export default function Home() {
    const store = useStore();
    const router = useRouter();

    const methods = useForm<LoginUserInput>({
        resolver: zodResolver(LoginUserSchema),
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitSuccessful },
    } = methods;

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);

    useEffect(() => {
        store.reset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function LoginUserFunction(credentials: LoginUserInput) {
        store.setRequestLoading(true);
        try {
            // await apiLoginUser(JSON.stringify(credentials));

            // toast.success("Logged in successfully");
            return router.push("/");
        } catch (error: any) {
            console.log(error);
            if (error instanceof Error) {
                handleApiError(error);
            } else {
                toast.error(error.message);
                console.log("Error message:", error.message);
            }
        } finally {
            store.setRequestLoading(false);
        }
    }

    const onSubmitHandler: SubmitHandler<LoginUserInput> = (values) => {
        LoginUserFunction(values);
    };

    return (
        <div className="relative flex flex-col justify-center overflow-hidden h-screen">
            <div className="w-full p-6 mx-auto my-10 rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-xl">
                <h1 className="text-xl font-semibold text-center">Login</h1>
                <FormProvider {...methods}>
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmitHandler)}>
                        <FormInput label="Email" name="email" type="email" />
                        <FormInput label="Password" name="password" type="password" />
                        <LoadingButton loading={store.requestLoading} >
                            Log In
                        </LoadingButton>
                        <span>New User?
                            <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline"> Sign Up</a></span>
                    </form>
                </FormProvider>
            </div>
        </div>
    )
}