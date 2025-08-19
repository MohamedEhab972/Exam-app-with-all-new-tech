"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
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
import { XCircle } from "lucide-react";
import {
    useForgotPassword,
    useVerifyResetCode,
    useResetPassword,
} from "@/app/hooks/useForgotPassword";
import { ForgotPasswordInput, forgotPasswordSchema, ResetPasswordInput, resetPasswordSchema, VerifyCodeInput, verifyCodeSchema } from "@/lib/validations/auth";
import Image from "next/image";
import Link from "next/link";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import CountdownTimer from "./CountdownTimer";


export function ForgotPasswordForm() {
    const [step, setStep] = useState<1 | 2 | 3>(2);
    const [email, setEmail] = useState("");

    // Hooks
    const forgotPasswordMutation = useForgotPassword();
    const verifyResetCodeMutation = useVerifyResetCode();
    const resetPasswordMutation = useResetPassword();

    // Forms
    const emailForm = useForm<ForgotPasswordInput>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: "" },
    });

    const codeForm = useForm<VerifyCodeInput>({
        resolver: zodResolver(verifyCodeSchema),
        defaultValues: { resetCode: "" },
    });

    const resetForm = useForm<ResetPasswordInput>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: { email: "", newPassword: "" },
    });

    // sync email from step 1 into resetForm
    useEffect(() => {
        if (email) {
            resetForm.setValue("email", email);
        }
    }, [email, resetForm]);

    // Handlers
    const handleEmailSubmit = (data: ForgotPasswordInput) => {
        forgotPasswordMutation.mutate(data.email, {
            onSuccess: () => {
                setEmail(data.email);
                setStep(2);
            },
        });
    };

    const handleCodeSubmit = (data: VerifyCodeInput) => {
        verifyResetCodeMutation.mutate(data.resetCode, {
            onSuccess: () => {
                setStep(3);
            },
        });
    };

    const handleResetSubmit = (data: ResetPasswordInput) => {
        resetPasswordMutation.mutate(data, {
            onSuccess: () => {
                alert("Password reset successfully!");
            },
        });
    };

    return (
        <div className="flex flex-col justify-center gap-10 font-sans">

            {/* Step 1 - Email */}
            {step === 1 && (
                <Form {...emailForm}>
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-3">
                            <h1 className="font-bold text-[30px] leading-[1] ">
                                Forgot Password
                            </h1>
                            <h2 className="font-mono font-normal not-italic text-[16px] leading-[100%] tracking-[0px] align-middle text-[#6B7280]">
                                Don’t worry, we will help you recover your <br /> account.
                            </h2>
                        </div>

                        <form
                            onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
                            className="space-y-10 w-[452px]"
                        >
                            {/* <XCircle onClick={() => setStep(1)} className="h-5 w-5  text-red-600" /> */}
                            <FormField
                                control={emailForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="font-mono font-medium text-base leading-none tracking-normal">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="user@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {forgotPasswordMutation.isError && (
                                <ErrorMessage error={forgotPasswordMutation.error} />
                            )}

                            <Button
                                type="submit"
                                className="w-full h-12 bg-primary flex items-center justify-center gap-2 font-mono"
                                disabled={forgotPasswordMutation.isPending}
                            >
                                {forgotPasswordMutation.isPending ? (
                                    "Loading..."
                                ) : (
                                    <>
                                        <span>Continue</span>
                                        <Image
                                            src="/images/move-right.png"
                                            alt="Continue Icon"
                                            width={18}
                                            height={18}
                                        />
                                    </>
                                )}
                            </Button>

                            <div className="text-center !mt-9">
                                <span className="font-mono font-medium text-[14px] text-muted-foreground">
                                    Don’t have an account?{" "}
                                </span>
                                <Link
                                    href="/register"
                                    className="font-mono font-medium text-[14px] text-primary"
                                >
                                    Create yours
                                </Link>
                            </div>
                        </form>
                    </div>
                </Form>
            )
            }

            {/* Step 2 - Verify Code */}
            {
                step === 2 && (
                    <Form {...codeForm}>
                        <div className="flex flex-col gap-10">
                            <span onClick={() => setStep(1)} className="border boder-[1.5px] w-fit p-2 cursor-pointer">
                                <Image
                                    src="/images/move-left.png"
                                    alt="Previous Icon"
                                    width={24}
                                    height={24}
                                />
                            </span>

                            <div className="flex flex-col gap-3">
                                <h1 className="font-bold text-[30px] leading-[1] ">
                                    Forgot Password
                                </h1>
                                <h2 className="font-mono font-normal not-italic text-[16px] leading-[100%] tracking-[0px] align-middle text-[#6B7280]">
                                    Please enter the 6-digits code we have sent to:
                                </h2>
                                <p className="font-mono font-normal text-[16px] leading-[100%] tracking-[0px] align-middle text-gray-600">
                                    user@example.com.{" "}
                                    <span className="font-mono font-medium text-[16px] leading-[100%] tracking-[0px] align-middle underline underline-offset-0 decoration-solid decoration-[0.5px] text-primary">
                                        Edit
                                    </span>
                                </p>
                            </div>

                            <form
                                onSubmit={codeForm.handleSubmit(handleCodeSubmit)}
                                className="space-y-10 w-[452px]"
                            >

                                <div className="flex flex-col gap-6">
                                    <FormField
                                        control={codeForm.control}
                                        name="resetCode"
                                        render={({ field }) => (
                                            <FormItem className="font-mono font-medium text-base leading-none tracking-normal">
                                                <FormLabel></FormLabel>
                                                <FormControl>
                                                    <InputOTP
                                                        maxLength={6}
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        className="w-full flex gap-2"
                                                    >
                                                        <InputOTPGroup className="w-full flex justify-center gap-[10px]">
                                                            {[...Array(6)].map((_, index) => (
                                                                <InputOTPSlot
                                                                    key={index}
                                                                    index={index}
                                                                    className="
                                                                                w-10 h-10 
                                                                                border border-gray-300 
                                                                                rounded-none 
                                                                                text-center text-lg font-mono 
                                                                                focus:outline-primary 
                                                                                focus:border-primary 
                                                                                focus:ring-2 focus:ring-primary
                                                                            "/>
                                                            ))}
                                                        </InputOTPGroup>

                                                    </InputOTP>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Countdown Timer */}
                                    <CountdownTimer />
                                </div>


                                {verifyResetCodeMutation.isError && (
                                    <ErrorMessage error={verifyResetCodeMutation.error} />
                                )}

                                <Button
                                    type="submit"
                                    className="w-full h-12 bg-primary flex items-center justify-center gap-2 font-mono"
                                    disabled={verifyResetCodeMutation.isPending}
                                >
                                    {verifyResetCodeMutation.isPending ? (
                                        "Loading..."
                                    ) : (
                                        "Verify Code"
                                    )}
                                </Button>

                                <div className="text-center !mt-9">
                                    <span className="font-mono font-medium text-[14px] text-muted-foreground">
                                        Don’t have an account?{" "}
                                    </span>
                                    <Link
                                        href="/register"
                                        className="font-mono font-medium text-[14px] text-primary"
                                    >
                                        Create yours
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </Form>
                )
            }

            {/* Step 3 - Reset Password */}
            {
                step === 3 && (
                    <Form {...resetForm}>
                        <h1 className="font-bold text-[30px] leading-[1] pb-6">
                            Forgot Password
                        </h1>
                        <form
                            onSubmit={resetForm.handleSubmit(handleResetSubmit)}
                            className="space-y-4 w-[452px]"
                        >
                            <XCircle onClick={() => setStep(2)} className="h-5 w-5  text-red-600" />
                            {/* Email (read-only) */}
                            <FormField
                                control={resetForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* New password */}
                            <FormField
                                control={resetForm.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="New password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {resetPasswordMutation.isError && (
                                <ErrorMessage error={resetPasswordMutation.error} />
                            )}

                            <Button
                                type="submit"
                                className="w-full h-12 bg-primary"
                                disabled={resetPasswordMutation.isPending}
                            >
                                {resetPasswordMutation.isPending ? "Loading..." : "Reset Password"}
                            </Button>
                        </form>
                    </Form>
                )
            }
        </div >
    );
}

// Small reusable error component
function ErrorMessage({ error }: { error: unknown }) {
    return (
        <div className="relative w-full bg-red-50 border border-red-300 text-red-600 rounded-md p-3 h-9">
            <XCircle className="h-5 w-5 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-red-600" />
            <p className="text-center text-sm font-medium">
                {error instanceof Error ? error.message : "Something went wrong"}
            </p>
        </div>
    );
}
