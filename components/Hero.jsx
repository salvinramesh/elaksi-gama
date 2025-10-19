'use client'
import { assets } from '@/assets/assets'
import { ArrowRightIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CategoriesMarquee from './CategoriesMarquee'

const Hero = () => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '₹'

    // Smooth scroll to Best Selling section
    const scrollToBestSelling = () => {
        const section = document.getElementById('best-selling')
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    // Smooth scroll to Latest Products section
    const scrollToLatestProducts = () => {
        const section = document.getElementById('latest-products')
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    return (
        <div className='mx-6'>
            <div className='flex max-xl:flex-col gap-8 max-w-7xl mx-auto my-10'>
                {/* Main hero card */}
                <div className='relative flex-1 flex flex-col bg-green-200 rounded-3xl xl:min-h-100 group'>
                    <div className='p-5 sm:p-16'>
                        <div className='inline-flex items-center gap-3 bg-green-300 text-green-600 pr-4 p-1 rounded-full text-xs sm:text-sm'>
                            <span className='bg-green-600 px-3 py-1 max-sm:ml-1 rounded-full text-white text-xs'>
                                NEWS
                            </span>
                            Free Shipping on Orders Above ₹99!
                            <ChevronRightIcon className='group-hover:ml-2 transition-all' size={16} />
                        </div>

                        <h2 className='text-3xl sm:text-5xl leading-[1.2] my-3 font-medium bg-gradient-to-r from-slate-600 to-[#A0FF74] bg-clip-text text-transparent max-w-xs sm:max-w-md'>
                            Wear elegance, every day.
                        </h2>

                        <div className='text-slate-800 text-sm font-medium mt-4 sm:mt-8'>
                            <p>Starts from</p>
                            <p className='text-3xl'>{currency}99₹</p>
                        </div>

                        {/* SHOP NOW button */}
                        <Link
                            href="/shop"
                            className='inline-block bg-slate-800 text-white text-sm py-2.5 px-7 sm:py-5 sm:px-12 mt-4 sm:mt-10 rounded-md hover:bg-slate-900 hover:scale-103 active:scale-95 transition'
                        >
                            SHOP NOW
                        </Link>
                    </div>

                    <Image
                        className='sm:absolute bottom-0 right-0 md:right-10 w-full sm:max-w-sm'
                        src={assets.hero_model_img}
                        alt="Model wearing Elaksi jewelry"
                    />
                </div>

                {/* Right side cards */}
                <div className='flex flex-col md:flex-row xl:flex-col gap-5 w-full xl:max-w-sm text-sm text-slate-600'>
                    {/* Best products card */}
                    <div className='flex-1 flex items-center justify-between w-full bg-orange-200 rounded-3xl p-6 px-8 group'>
                        <div>
                            <p className='text-3xl font-medium bg-gradient-to-r from-slate-800 to-[#FFAD51] bg-clip-text text-transparent max-w-40'>
                                Best products
                            </p>
                            <p
                                onClick={scrollToBestSelling}
                                className='flex items-center gap-1 mt-4 cursor-pointer hover:underline select-none'
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') scrollToBestSelling() }}
                            >
                                View more <ArrowRightIcon className='group-hover:ml-2 transition-all' size={18} />
                            </p>
                        </div>
                        <Image className='w-35' src={assets.hero_product_img1} alt="Best product" />
                    </div>

                    {/* Latest products card */}
                    <div className='flex-1 flex items-center justify-between w-full bg-blue-200 rounded-3xl p-6 px-8 group'>
                        <div>
                            <p className='text-3xl font-medium bg-gradient-to-r from-slate-800 to-[#78B2FF] bg-clip-text text-transparent max-w-40'>
                                Latest Products
                            </p>
                            <p
                                onClick={scrollToLatestProducts}
                                className='flex items-center gap-1 mt-4 cursor-pointer hover:underline select-none'
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') scrollToLatestProducts() }}
                            >
                                View more <ArrowRightIcon className='group-hover:ml-2 transition-all' size={18} />
                            </p>
                        </div>
                        <Image className='w-35' src={assets.hero_product_img2} alt="Latest product" />
                    </div>
                </div>
            </div>

            <CategoriesMarquee />
        </div>
    )
}

export default Hero
