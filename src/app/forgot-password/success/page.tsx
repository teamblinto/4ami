"use client";

import Image from "next/image";
import Link from "next/link";

export default function ResetSuccessPage() {
    return (
        <div className="min-h-screen flex flex-col items-center pt-2 bg-gray-100">
            <div className="w-full max-w-[1200px] mx-auto ">
                <header className="px-12 py-4">
                    <Image src="/AMILogo.svg" alt="AMI Logo" width={230} height={35} />
                </header>

                <main className="flex-grow flex items-center justify-center py-12">
                    <div className="bg-white rounded-lg  w-full max-w-[900px] mx-auto text-center py-16">
                        <div className="flex justify-center items-center">
                            <Image src="/success.svg" alt="Check" width={75} height={75} />
                        </div>
                        <h1 className="text-[32px] font-semibold text-[#080607]">Password Updated Successfully!</h1>
                        <p className="text-sm text-gray-500 mt-2">Return to log in and log in with your new password</p>
                        <div className="mt-6">
                            <Link href="/login" className="inline-block bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded">
                                Back to Log In
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}


