import { Edit, Eye, FormInputIcon, MessageCircleReplyIcon } from 'lucide-react'
import React from 'react'

function BlogCard() {
  return (
    <div>
        <div className='grid grid-cols-3 gap-5 scale-90'>
        <article className="overflow-hidden rounded-lg shadow-xl transition hover:shadow-2xl">
            <img
                alt=""
                src="/card1.png"
                className="h-56 w-full object-cover"
            />

            <div className="bg-white p-4 sm:p-6">
                <time datetime="2022-10-10" className="block text-xs text-gray-500"> 10th Oct 2022 </time>

                <a href="#">
                <h3 className="mt-0.5 text-lg text-gray-900">
                    View All Forms You Have Created
                    <Eye className='text-blue-500'/>    
                </h3>
                </a>

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dolores, possimus
                pariatur animi temporibus nesciunt praesentium dolore sed nulla ipsum eveniet corporis quidem,
                mollitia itaque minus soluta, voluptates neque explicabo tempora nisi culpa eius atque
                dignissimos. Molestias explicabo corporis voluptatem?
                </p>
            </div>
        </article>
        <article className="overflow-hidden rounded-lg shadow-xl transition hover:shadow-2xl">
            <img
                alt=""
                src="/card2.png"
                className="h-56 w-full object-cover"
            />

            <div className="bg-white p-4 sm:p-6">
                <time datetime="2022-10-10" className="block text-xs text-gray-500"> 10th Oct 2022 </time>

                <a href="#">
                <h3 className="mt-0.5 text-lg text-gray-900">
                    Edit Your Forms and Even Your Themes
                    <Edit className='text-primary'/>
                </h3>
                </a>

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dolores, possimus
                pariatur animi temporibus nesciunt praesentium dolore sed nulla ipsum eveniet corporis quidem,
                mollitia itaque minus soluta, voluptates neque explicabo tempora nisi culpa eius atque
                dignissimos. Molestias explicabo corporis voluptatem?
                </p>
            </div>
        </article>
        <article className="overflow-hidden rounded-lg shadow-xl transition hover:shadow-2xl">
            <img
                alt=""
                src="/card3.png"
                className="h-56 w-full object-cover"
            />

            <div className="bg-white p-4 sm:p-6">
                <time datetime="2022-10-10" className="block text-xs text-gray-500"> 10th Oct 2022 </time>

                <a href="#">
                <h3 className="mt-0.5 text-lg font-semibold text-gray-900">
                    You Can Analyze the Answers by Downloading
                    <MessageCircleReplyIcon className='text-green-500'/>
                </h3>
                </a>

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dolores, possimus
                pariatur animi temporibus nesciunt praesentium dolore sed nulla ipsum eveniet corporis quidem,
                mollitia itaque minus soluta, voluptates neque explicabo tempora nisi culpa eius atque
                dignissimos. Molestias explicabo corporis voluptatem?
                </p>
            </div>
        </article>
        </div>
    </div>
  )
}

export default BlogCard