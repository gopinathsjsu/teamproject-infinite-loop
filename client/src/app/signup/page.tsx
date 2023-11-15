"use client";
import { RegisterUserInput, RegisterUserSchema } from "@/src/lib/validations/user.schema";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRegisterUser } from "@/src/lib/auth-api";
import useStore from "@/src/store";
import FormInput from "@/src/app/components/formComponents/formInput";
import { LoadingButton } from "@/src/app/components/formComponents/loadingButton";
import React, { useEffect, useState } from 'react';
import { handleApiError } from "@/src/lib/helpers";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Home() {

    const store = useStore();
    const router = useRouter();

    const methods = useForm<RegisterUserInput>({
        resolver: zodResolver(RegisterUserSchema),
    });

    const { reset, handleSubmit, formState: { isSubmitSuccessful }, } = methods;

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);

    async function RegisterUserFunction(credentials: RegisterUserInput) {
        store.setRequestLoading(true);
        try {
            const user = await apiRegisterUser(JSON.stringify(credentials));
            return router.push("/login");
        } catch (error: any) {
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

    const onSubmitHandler: SubmitHandler<RegisterUserInput> = (values) => {
        RegisterUserFunction(values);
    };

    return (
        <div className="relative flex flex-col justify-center overflow-hidden h-screen">
            <div className="w-full p-6 mx-auto my-2 rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-xl">
                <h1 className="text-xl font-semibold text-center">Register</h1>
                <FormProvider {...methods}>
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmitHandler)}>
                        <FormInput label="Full Name" name="name" type="text" />
                        <FormInput label="Email" name="email" type="email" />
                        <FormInput label="Password" name="password" type="password" />
                        <FormInput
                            label="Confirm Password"
                            name="passwordConfirm"
                            type="password"
                        />
                        <LoadingButton
                            loading={store.requestLoading}
                        >
                            Register
                        </LoadingButton>
                        <span>Already have an account ?
                            <a href="/login" className="text-blue-600 hover:text-blue-800 hover:underline">Login</a></span>
                    </form>
                </FormProvider>
                <div className="flex items-center w-full my-4">
                    <hr className="w-full" />
                    <p className="px-3 ">OR</p>
                    <hr className="w-full" />
                </div>
                <div className="my-6 space-y-2">
                    <button aria-label="Login with Google" type="button"
                        className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                            <path
                                d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z">
                            </path>
                        </svg>
                        <p>Login with Google</p>
                    </button>
                </div>
            </div>
        </div>
    )
}