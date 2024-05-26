import React from 'react'

function Hero() {
    return (
        <div>
            <section className="bg-gray-50 h-[500px] bg-[url('/grid.jpg')]">
                <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen">
                    <div className="mx-auto max-w-xl text-center">
                    <h1 className="text-3xl font-extrabold sm:text-5xl">
                        Create Your First Form!
                        <strong className="font-extrabold text-primary sm:block"> In Seconds, Not Hours </strong>
                    </h1>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <a
                        className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow-md hover:bg-purple-900 focus:outline-none focus:ring active:bg-primary sm:w-auto"
                        href="/dashboard">
                        + Create AI Form
                        </a>

                        <a
                        className="block w-full rounded bg-purple-50 px-12 py-3 text-sm font-medium text-primary shadow-md hover:text-purple-900 focus:outline-none focus:ring active:text-primary sm:w-auto"
                        href="#"
                        >
                        Learn More
                        </a>
                    </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hero