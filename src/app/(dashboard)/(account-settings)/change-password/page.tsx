import React from "react"
import { ChangePasswordForm } from "./_components/change-password-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Change Password",
  description: "Update your account password securely.",
  keywords: ["change password"],
  openGraph: {
    title: "Change Password",
    description: "Update your account password securely.",
    type: "website",
    url: "http://localhost:3000/change-password",
    images: [
      {
        url: "https://via.placeholder.com/1200x630.png?text=Change+Password",
        width: 1200,
        height: 630,
        alt: "Change Password",
      },
    ],
  },
};


export default function Page() {
  return <ChangePasswordForm />
}
