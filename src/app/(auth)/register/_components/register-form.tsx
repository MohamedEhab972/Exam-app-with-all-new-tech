"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { registerSchema, RegisterInput } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useRegister } from "@/app/(auth)/_hooks/use-register";
import { XCircle } from "lucide-react";
import { PhoneInput } from "./phone-input";

export function RegisterForm() {
    const router = useRouter();
    const form = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
        },
    });

    const registerMutation = useRegister();

    const onSubmit = (data: RegisterInput) => {
        let phone = data.phone || "";
        phone = phone.replace(/^(\+2|002)/, "");

        const payload = {
            ...data,
            phone,
        };

        registerMutation.mutate(payload, {
            onSuccess: () => {
                router.push("/login");
            },
            onError: (err) => {
                console.error("Register error:", err);
            },
        });
    };


    return (
        <div className="flex flex-col justify-center gap-10 font-sans">
            <h1 className="font-sans font-bold text-[30px] leading-[1] pb-6">
                Create Account
            </h1>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 w-[452px]"
                >

                    <div className="grid grid-cols-2 gap-4">

                        {/* First Name */}
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="First Name"
                                            {...field}
                                            className={
                                                form.formState.errors.firstName
                                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                    : ""
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Last Name */}
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Last Name"
                                            {...field}
                                            className={
                                                form.formState.errors.lastName
                                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                    : ""
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Username */}
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Your Username"
                                        {...field}
                                        className={
                                            form.formState.errors.username
                                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                : ""
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Email */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Your Email"
                                        {...field}
                                        className={
                                            form.formState.errors.email
                                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                : ""
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Phone Number */}
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <PhoneInput
                                        {...field}
                                        defaultCountry="EG"
                                        international
                                        countryCallingCodeEditable={false}
                                        className={`w-full rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
                                             ${form.formState.errors.phone
                                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                : ""
                                            }`}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Password */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        {...field}
                                        className={
                                            form.formState.errors.password
                                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                : ""
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Confirm Password */}
                    <FormField
                        control={form.control}
                        name="rePassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Confirm Password"
                                        {...field}
                                        className={
                                            form.formState.errors.rePassword
                                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                                : ""
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <div className="flex flex-col gap-9 pt-6">
                        {/* Error Alert */}
                        {registerMutation.isError && (
                            <div className="relative w-full bg-red-50 border border-red-300 text-red-600 rounded-md p-3 h-fit">
                                <XCircle className="h-5 w-5 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-red-600" />
                                <p className="text-center font-mono text-[14px] leading-[100%] tracking-[0px] align-middle">
                                    {registerMutation.error instanceof Error
                                        ? registerMutation.error.message
                                        : "Something went wrong"}
                                </p>
                            </div>
                        )}

                        <Button
                            className="w-full h-12 bg-primary"
                            type="submit"
                            disabled={registerMutation.isPending}
                        >
                            {registerMutation.isPending ? "Loading..." : "Create Account"}
                        </Button>

                        <div className="pt-4 text-center">
                            <span className="font-mono font-medium text-[14px] text-muted-foreground">
                                Already have an account?{" "}
                            </span>
                            <Link
                                href="/login"
                                className="font-mono font-medium text-[14px] text-primary underline"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
}
