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
import { UserInput, userSchema } from "@/lib/schemes/auth.schema";
import { useEditProfile } from "@/app/(dashboard)/(account-settings)/profile/_hooks/use-edit-profile";
import toast from "react-hot-toast";
import { useDeleteMe } from "@/app/(dashboard)/(account-settings)/profile/_hooks/use-delete-acount";
import { signOut } from "next-auth/react";
import { DeleteAccountButton } from "@/app/(dashboard)/(account-settings)/profile/_component/DeleteAccountButton";
import { useRegister } from "@/app/(auth)/register/_hooks/use-register";
import { PhoneInput } from "./phone-input";

export function FormComponent({ isProfile, isEdit }: { isProfile?: boolean; isEdit?: boolean }) {
    const router = useRouter();
    const form = useForm<UserInput>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: undefined,
            rePassword: undefined,
        }
    });

    const deleteMutation = useDeleteMe();

    const handleDelete = () => {
        deleteMutation.mutate(undefined, {
            onSuccess: async () => {
                toast.success("Account deleted successfully!");
                await signOut({ callbackUrl: "/login" });
            },
            onError: (err: any) => {
                toast.error(err.message || "Failed to delete account.");
            },
        });
    };



    const registerMutation = useRegister();
    const editProfileMutation = useEditProfile();

    const onSubmit = (data: UserInput) => {
        let phone = data.phone || "";
        phone = phone.replace(/^(\+2|002)/, "");
        const payload = { ...data, phone };

        if (!data.password) {
            delete payload.password;
            delete payload.rePassword;
        }

        if (isProfile && isEdit) {
            editProfileMutation.mutate(payload, {
                onSuccess: () => {
                    toast.success("Profile updated successfully!");
                    router.push("/profile");
                },
                onError: (err) => {
                    console.error("Profile update error:", err);
                    toast.error("Failed to update profile.");
                },
            });
        } else {
            registerMutation.mutate(payload, {
                onSuccess: () => {
                    toast.success(isProfile ? "Profile updated successfully!" : "Registration successful!");
                    router.push(isProfile ? "/profile" : "/login");
                },
                onError: (err) => {
                    console.error(isProfile ? "Profile update error:" : "Register error:", err);
                    toast.error(isProfile
                        ? "Failed to update profile."
                        : "Registration failed.");
                },
            });
        }
    };



    return (
        <div className="flex flex-col justify-center gap-10 font-sans">
            {!isProfile && <h1 className="font-sans font-bold text-[30px] leading-[1] pb-6">
                Create Account
            </h1>}


            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className={`space-y-4 ${!isProfile && "w-[452px]"} `}
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

                    {!isProfile && <>
                        {/* Password */}
                        < FormField
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
                    </>
                    }

                    <div className={`flex flex-col gap-9 ${isProfile ? "pt-2" : "pt-6"} `}>
                        {/* Error Alert */}
                        {(registerMutation.isError || editProfileMutation.isError) && (
                            <div className="relative w-full bg-red-50 border border-red-300 text-red-600 rounded-md p-3 h-fit">
                                <XCircle className="h-5 w-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-red-600" />
                                <p className="text-center font-mono text-[14px] leading-[100%] tracking-[0px] align-middle">
                                    {isProfile
                                        ? editProfileMutation.error instanceof Error
                                            ? editProfileMutation.error.message
                                            : "Something went wrong"
                                        : registerMutation.error instanceof Error
                                            ? registerMutation.error.message
                                            : "Something went wrong"
                                    }
                                </p>
                            </div>
                        )}

                        {!isProfile && <Button
                            className="w-full h-12 bg-primary rounded-none"
                            type="submit"
                            disabled={registerMutation.isPending}
                        >
                            {registerMutation.isPending ? "Loading..." : "Create Account"}
                        </Button>}

                        {isProfile && (
                            <div className="flex gap-4">
                                <DeleteAccountButton
                                    isPending={deleteMutation.isPending}
                                    onDelete={handleDelete}
                                />

                                <Button
                                    className="w-full h-12 bg-primary rounded-none"
                                    type="submit"
                                    disabled={editProfileMutation.isPending}
                                >
                                    {editProfileMutation.isPending ? "Loading..." : "Save Changes"}
                                </Button>
                            </div>
                        )}

                        {!isProfile && <div className="pt-4 text-center">
                            <span className="font-mono font-medium text-[14px] text-muted-foreground">
                                Already have an account?{" "}
                            </span>
                            <Link
                                href="/login"
                                className="font-mono font-medium text-[14px] text-primary underline"
                            >
                                Login
                            </Link>
                        </div>}

                    </div>
                </form>
            </Form>
        </div>
    );
}
