"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";

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
import { XCircle } from "lucide-react";
import { LoginInput, loginSchema } from "@/lib/schemes/auth.schema";
import { useLogin } from "../_hooks/use-login";

export function LoginForm() {
    const router = useRouter();
    const form = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const loginMutation = useLogin();

    const onSubmit = (data: LoginInput) => {
        loginMutation.mutate(data, {
            onSuccess: () => {
                router.push("/");
            },
            onError: (err) => {
                console.error("Login error:", err);
            },
        });
    };

    return (
        <div className="flex flex-col justify-center gap-10 font-sans">
            <h1 className="font-sans font-bold text-[30px] leading-[1] pb-6">
                Login
            </h1>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 w-[452px] h-[406px]"
                >
                    {/* Email Field */}
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

                    {/* Password Field */}
                    <div>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Your password"
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
                        <div className="pt-2 flex items-center justify-end">
                            <Link
                                href="/forgot-password"
                                className="font-mono font-medium text-[14px] text-primary"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                    </div>

                    {/* Submit + Register */}
                    <div className="flex flex-col gap-9 pt-6">

                        {/* Login Error Alert */}
                        {loginMutation.isError && (
                            <div className="relative w-full bg-red-50 border border-red-300 text-red-600 rounded-md p-3 h-9">
                                <XCircle className="h-5 w-5 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-red-600" />

                                {/* Message */}
                                <p
                                    className="text-center font-mono text-[14px] leading-[100%] tracking-[0px] align-middle"
                                >
                                    {loginMutation.error instanceof Error
                                        ? loginMutation.error.message
                                        : "Something went wrong"}
                                </p>

                            </div>
                        )}

                        <Button
                            className="w-full h-12 bg-primary"
                            type="submit"
                            disabled={loginMutation.isPending}
                        >
                            {loginMutation.isPending ? "Loading..." : "Login"}
                        </Button>

                        <div className="pt-4 text-center">
                            <span className="font-mono font-medium text-[14px] text-muted-foreground">
                                Don’t have an account?{" "}
                            </span>
                            <Link
                                href="/register"
                                className="font-mono font-medium text-[14px] text-primary underline"
                            >
                                Create yours
                            </Link>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
}
