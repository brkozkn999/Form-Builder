import { Edit, FormInputIcon, Share } from 'lucide-react'
import React from 'react'

export default function Sections() {
  return (
    <div>
        <div>
        <section className="bg-gray-900 text-white">
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                <div className="mx-auto max-w-lg text-center">
                <h2 className="text-3xl font-bold sm:text-4xl">How it Works?</h2>

                <p className="mt-4 text-gray-300">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur aliquam doloribus
                    nesciunt eos fugiat. Vitae aperiam fugit consequuntur saepe laborum.
                </p>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <a
                    className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-purple-500/10 hover:shadow-purple-500/10"
                    href="/dashboard">
                    <FormInputIcon className="size-10 text-primary" />

                    <h2 className="mt-4 text-xl font-bold text-white">Enter a Prompt for Your Form</h2>

                    <p className="mt-1 text-sm text-gray-300">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci
                    distinctio alias voluptatum blanditiis laudantium.
                    </p>
                </a>

                <a
                    className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-purple-500/10 hover:shadow-purple-500/10"
                    href="/dashboard"
                >
                    <Edit className="size-10 text-primary" />

                    <h2 className="mt-4 text-xl font-bold text-white">Edit Your Forms</h2>

                    <p className="mt-1 text-sm text-gray-300">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci
                    distinctio alias voluptatum blanditiis laudantium.
                    </p>
                </a>

                <a
                    className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-purple-500/10 hover:shadow-purple-500/10"
                    href="/dashboard"
                >
                    <Share className="size-10 text-primary" />

                    <h2 className="mt-4 text-xl font-bold text-white">Share to Start Getting Responses</h2>

                    <p className="mt-1 text-sm text-gray-300">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci
                    distinctio alias voluptatum blanditiis laudantium.
                    </p>
                </a>

                </div>
                <div className="mt-12 text-center">
                <a
                    href="/dashboard"
                    className="inline-block rounded bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-purple-900 focus:outline-none focus:ring focus:ring-yellow-400"
                >
                    Get Started Today
                </a>
                </div>
            </div>
        </section>
        </div>
    </div>
  )
}
