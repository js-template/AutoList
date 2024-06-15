import ContactForm from "@/components/contact-form";
import type { Metadata } from "next";
import Script from "next/script";
import { Fragment } from "react";
import { RiPhoneLine } from "react-icons/ri";

export const metadata: Metadata = {
   title: "Contact Us | AutoLister",
   description: "Contact Us page for AutoLister"
};

const ContactUsPage = () => {
   return (
      <Fragment>
         <section className='bg-success-content '>
            <div className='container mx-auto'>
               <div className='py-20 px-6 sm:px-0'>
                  <div className='grid grid-cols-2 md:grid-cols-5 gap-7 lg:w-10/12 mx-auto'>
                     <div className='col-span-2 md:col-span-2 bg-primary rounded-2xl shadow p-12 w-full space-y-7'>
                        <div>
                           <h1 className='text-3xl font-bold text-white'>Get in Touch</h1>
                           <p className='text-lg font-normal text-white pt-2'>
                              We&acute; love to hear from you. Our friendly team is always here to chat.
                           </p>
                        </div>
                        <div className='flex gap-5'>
                           <svg
                              width='32'
                              height='33'
                              viewBox='0 0 32 33'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                           >
                              <path
                                 d='M3 8.63184V26.55H29V8.63184H3ZM7.3125 10.6227H24.6875L16 16.3777L7.3125 10.6227ZM5 11.4938L15.4375 18.4308L16 18.773L16.5625 18.4308L27 11.4938V24.5591H5V11.4938Z'
                                 fill='white'
                              />
                           </svg>
                           <div>
                              <h3 className='text-xl text-white font-normal'>Mail To Us</h3>
                              <p className='text-base font-normal text-neutral-content'>info@example.com</p>
                           </div>
                        </div>
                        <div className='flex gap-5'>
                           <RiPhoneLine className='text-3xl text-white' />
                           <div>
                              <h3 className='text-xl text-white font-normal'>Call Us</h3>
                              <p className='text-base font-normal text-neutral-content'>+1 123 456 789</p>
                           </div>
                        </div>
                        <div className='flex gap-5'>
                           <svg
                              width='32'
                              height='32'
                              viewBox='0 0 32 32'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                           >
                              <path
                                 d='M16 3C11.043 3 7 7.04297 7 12C7 13.4062 7.57031 15.0195 8.34375 16.7812C9.11719 18.543 10.1133 20.4141 11.125 22.1562C13.1484 25.6445 15.1875 28.5625 15.1875 28.5625L16 29.75L16.8125 28.5625C16.8125 28.5625 18.8516 25.6445 20.875 22.1562C21.8867 20.4141 22.8828 18.543 23.6562 16.7812C24.4297 15.0195 25 13.4062 25 12C25 7.04297 20.957 3 16 3ZM16 5C19.8789 5 23 8.12109 23 12C23 12.8008 22.5703 14.3164 21.8438 15.9688C21.1172 17.6211 20.1133 19.4531 19.125 21.1562C17.5547 23.8672 16.5781 25.3008 16 26.1562C15.4219 25.3008 14.4453 23.8672 12.875 21.1562C11.8867 19.4531 10.8828 17.6211 10.1562 15.9688C9.42969 14.3164 9 12.8008 9 12C9 8.12109 12.1211 5 16 5ZM16 10C14.8945 10 14 10.8945 14 12C14 13.1055 14.8945 14 16 14C17.1055 14 18 13.1055 18 12C18 10.8945 17.1055 10 16 10Z'
                                 fill='white'
                              />
                           </svg>
                           <div>
                              <h3 className='text-xl text-white font-normal'>Office Location</h3>
                              <p className='text-base font-normal text-neutral-content lg:w-8/12'>
                                 1294 Longview Avenue, Forest Hills, New York
                              </p>
                           </div>
                        </div>
                     </div>

                     <div className='col-span-2 md:col-span-3 bg-white rounded-2xl shadow px-12 md:px-24 2xl:px-36  py-12 w-full text-center'>
                        <h1 className='text-2xl font-bold text-neutral m-0'>Level Up Your Work</h1>
                        <p className='text-base font-normal text-neutral pt-2'>You can reach us any time via</p>
                        <strong className='text-neutral'>info@example.com</strong>
                        <div className='pt-6'>
                           <ContactForm />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         {/* JSON_LD for SEO */}
         <Script
            id='json-ld-structured-data'
            type='application/ld+json'
            dangerouslySetInnerHTML={{
               __html: JSON.stringify({
                  url: "https://metaads.vercel.app/contact-us",
                  logo: "https://res.cloudinary.com/js-template/image/upload/v1703083421/metaads_logo_96b5194561.svg",
                  name: "Contact Us | Autolister",
                  "@type": "Organization",
                  sameAs: [
                     "https://www.facebook.com/autolister",
                     "https://twitter.com/autolister",
                     "https://www.linkedin.com/company/autolister"
                  ],
                  "@context": "https://schema.org",
                  description: "Contact Us page for AutoLister",
                  contactPoint: {
                     "@type": "ContactPoint",
                     telephone: "+1-123-456-7890",
                     contactType: "Customer Service"
                  }
               })
            }}
         />
      </Fragment>
   );
};

export default ContactUsPage;
