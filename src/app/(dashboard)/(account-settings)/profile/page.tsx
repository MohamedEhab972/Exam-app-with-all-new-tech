import { FormComponent } from '@/components/ui/form-component'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Edit Profile",
    description: "Update your profile information and settings.",
    keywords: ["profile", "edit profile", "user settings"],
    openGraph: {
        title: "Edit Profile",
        description: "Update your profile information and settings.",
        type: "website",
        url: "https://yourdomain.com/profile/edit",
        images: [
            {
                url: "https://yourdomain.com/images/profile-og.png",
                width: 1200,
                height: 630,
                alt: "Edit Profile",
            },
        ],
    },
}

export default function Page() {
    return (
        <FormComponent isProfile={true} isEdit={true} />
    )
}
