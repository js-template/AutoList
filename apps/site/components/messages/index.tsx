"use client";
import { useGlobalContext } from "@/context/store";
import { findOne, updateOne } from "@/lib/strapi";
import { userRevalidate } from "@/lib/userRevalidate";
import ImageOpt from "@/optimize/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BsInfoSquareFill } from "react-icons/bs";
import { IoIosSend } from "react-icons/io";
import { IoClose, IoMenu } from "react-icons/io5";
import safetyTipsData from "./data.json";

type activeChatProps = {
   id: number;
   attributes: {
      seller: {
         data: {
            id: number;
            attributes: {
               name: string;
               avatar: {
                  data: {
                     attributes: {
                        formats: {
                           thumbnail: {
                              url: string;
                           };
                        };
                     };
                  };
               };
            };
         };
      };
      ads: {
         data: {
            id: number;
            attributes: {
               Title: string;
            };
         };
      };
   };
};

const Messages = ({ MessagesData }: { MessagesData: any }) => {
   const [activeChat, setActiveChat] = useState<activeChatProps | null>(null);
   const [activeMessage, setActiveMessage] = useState<any[]>([]);
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);
   const [details, setDetails] = useState(false);
   const [mobileUserShow, setMobileUserShow] = useState<boolean>(false);
   const scrollRef = useRef<any>(null);
   const { direction } = useGlobalContext();
   const { data: user, status } = useSession();
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors }
   } = useForm({
      mode: "onBlur"
   });
   const [, startTransition] = useTransition();
   const pathName = usePathname();
   const avatarUrl =
      status === "authenticated"
         ? user?.user?.image ??
           `https://ui-avatars.com/api/?name=${user?.user?.name}&background=004D3F&color=fff&length=2&size=48&bold=true`
         : null;

   // *** get message by user id ***
   const handleActiveChat = async (item: activeChatProps) => {
      try {
         setLoading(true);
         setActiveChat(item);
         // call API to get messages
         const { data, error } = await findOne("messages", item?.id, {}, "no-cache", user?.user?.jwtToken);

         if (error) {
            throw new Error(error);
         }

         setActiveMessage(data?.data?.attributes?.messages || []);
      } catch (error: any) {
         setError(error.message || "Error fetching messages. Please try again.");
      } finally {
         setLoading(false);
      }
   };

   // *** scroll to bottom of the chat
   const scrollToBottom = () => {
      // @ts-ignore
      if (scrollRef?.current) {
         // @ts-ignore
         scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
   };

   // *** window focus revalidate messages
   useEffect(() => {
      const handleFocus = () => {
         if (activeChat) handleActiveChat(activeChat);
         startTransition(() => {
            // *** revalidate server data ***
            userRevalidate(pathName, "page");
         });
      };

      window.addEventListener("focus", handleFocus);

      return () => {
         window.removeEventListener("focus", handleFocus);
      };
   });

   // *** scroll to bottom when active message changes
   useEffect(() => {
      if (activeMessage.length > 0) {
         scrollToBottom();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [activeMessage]);

   // *** window resize mobile menu hide
   useEffect(() => {
      const handleResize = () => {
         setMobileUserShow(false);
      };

      window.addEventListener("resize", handleResize);

      return () => {
         window.removeEventListener("resize", handleResize);
      };
   });

   useEffect(() => {
      if (MessagesData.length <= 0 || !MessagesData) {
         setActiveChat(null);
         setActiveMessage([]);
      }
   }, [MessagesData]);

   // *** message send ***
   const sendMessage = async (data: any) => {
      const toastId = toast.loading("Sending message...");
      if (!activeChat) return;
      if (!user?.user) return;

      // *** update message body ***
      const messageBody = {
         seller: activeChat?.attributes?.seller?.data?.id,
         buyer: Number(user?.user?.id),
         ads: activeChat?.attributes?.ads?.data?.id,
         messages: [
            ...activeMessage,
            {
               userId: user?.user?.id,
               message: data?.message,
               timestamp: new Date().toISOString()
            }
         ]
      };

      // *** server side api call ***
      startTransition(() => {
         // *** call API to update message ***
         updateOne(
            "messages",
            activeChat?.id,
            {
               data: messageBody
            },
            user?.user?.jwtToken as string
         )
            .then((res) => {
               const { data, error } = res;
               if (error) {
                  toast.error("Message sending failed. Please try again.");
                  return;
               }

               toast.success("Message sent successfully.");
               if (data?.attributes?.messages) {
                  setActiveMessage(data?.attributes?.messages);
                  reset();
               }
               scrollToBottom();
            })
            .finally(() => {
               toast.dismiss(toastId);
            });
      });
   };

   return (
      <div className='mx-auto shadow-sm rounded-lg h-[calc(100vh-9rem)] bg-white overflow-hidden relative'>
         {/* Top UI */}
         <div className={`px-5 py-3 grid grid-cols-12 justify-between items-center border-b`}>
            {/* Mobile chat menu icon */}
            <div className='col-span-3 font-semibold text-2xl flex gap-4 items-center'>
               <div className='block md:hidden'>
                  <IoMenu className='w-6 h-6 text-black/70' onClick={() => setMobileUserShow(!mobileUserShow)} />
               </div>
               <span className='hidden sm:block text-lg md:text-xl'>Inbox</span>
            </div>
            <div className='col-span-6'>
               <input
                  type='text'
                  name=''
                  id=''
                  placeholder='search here...'
                  className='rounded-md bg-gray-100 py-3 px-5 w-full focus:outline-none'
               />
            </div>
            <div className='col-span-3 flex items-center justify-end'>
               {avatarUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatarUrl} alt='user-image' width={48} height={48} className='rounded-full' />
               )}
            </div>
         </div>

         {/* Bottom UI */}
         <div className='grid grid-cols-12 justify-between'>
            {/* Left Side */}
            <div
               className={`${
                  mobileUserShow
                     ? "transform max-w-64 w-full translate-x-0 z-50"
                     : `transform ${direction === "ltr" ? "-translate-x-full" : "translate-x-full"} md:translate-x-0`
               } absolute top-0 md:relative h-full bg-white md:col-span-3 overflow-y-auto md:h-[calc(100vh-13.6rem)] ${
                  direction === "ltr" ? "border-r left-0" : "border-l right-0"
               } transition-all duration-300 ease-in-out`}
            >
               {/* Close icon */}
               {mobileUserShow && (
                  <div
                     className='flex items-center justify-between px-3 pt-2 w-full cursor-pointer z-40'
                     onClick={() => setMobileUserShow(!mobileUserShow)}
                  >
                     <span className='text-base font-semibold text-black/70'>Inbox</span>
                     <IoClose className='w-7 h-7 p-1.5 rounded-md bg-gray-200 hover:bg-red-400 hover:text-white text-red-400' />
                  </div>
               )}
               <div className='border-b py-3 px-2'>
                  <input
                     type='text'
                     placeholder='search chatting'
                     className='py-2 px-2 border border-gray-200 rounded-md w-full focus:outline-none'
                  />
               </div>
               {MessagesData &&
                  MessagesData?.map((item: any, index: number) => (
                     <div
                        key={index}
                        className={`flex flex-row gap-3 p-2 justify-center items-center border-b last-of-type:border-b-0 hover:bg-gray-100 cursor-pointer ${
                           activeChat?.id === item?.id ? "bg-gray-100" : ""
                        }`}
                        onClick={() => {
                           handleActiveChat(item);
                           setMobileUserShow(false);
                        }}
                     >
                        <div className='flex-none'>
                           <ImageOpt
                              src={
                                 (item?.attributes?.seller?.data?.attributes?.avatar?.data?.attributes?.formats
                                    ?.thumbnail?.url as string) ??
                                 `https://ui-avatars.com/api/?name=${
                                    item?.attributes?.seller?.data?.attributes?.name ??
                                    item?.attributes?.seller?.data?.attributes?.username
                                 }&background=random&color=fff&length=1&size=50&bold=true`
                              }
                              className='object-cover w-8 h-8 lg:h-11 lg:w-11 rounded-full'
                              alt=''
                              width={50}
                              height={50}
                              layout={undefined}
                              noPlaceholder={true}
                           />
                        </div>
                        <div className='w-full'>
                           <div className='text-base font-medium line-clamp-1'>
                              {item?.attributes?.seller?.data?.attributes?.name ??
                                 item?.attributes?.seller?.data?.attributes?.username}
                           </div>
                           <span className='text-primary  line-clamp-1'>
                              {item?.attributes?.ads?.data?.attributes?.Title}
                           </span>
                        </div>
                     </div>
                  ))}
               {/* Empty message */}
               {!loading && MessagesData.length === 0 && (
                  <div className='flex flex-col justify-center items-center h-[calc(100%-5rem)]'>
                     <h3 className='font-semibold text-lg text-black/70'>No Users</h3>
                  </div>
               )}
            </div>
            {/* Mobile Menu overlay */}
            {mobileUserShow && (
               <div
                  className='absolute top-0 left-0 w-full h-full bg-black/5 backdrop-blur-sm z-40'
                  onClick={() => setMobileUserShow(!mobileUserShow)}
               ></div>
            )}

            {/* Middle Message */}
            <div
               className={`h-[calc(100vh-13.6rem)] p-5 pb-0 overflow-y-auto relative col-span-12 md:col-span-9`}
               ref={scrollRef}
            >
               {/* Info icon to toggle the right box */}
               <div
                  title='information'
                  className='sticky top-0 h-0 flex justify-end w-full cursor-pointer z-30'
                  onClick={() => setDetails(!details)}
               >
                  <BsInfoSquareFill className='-mr-3 -mt-3 w-5 h-5 rounded-full bg-gray-200 text-black/70' />
               </div>
               <div className='flex flex-col justify-between h-full'>
                  {activeChat && (
                     <Fragment>
                        <div className='flex flex-col gap-4'>
                           {!loading &&
                              activeMessage?.map((item: any, index: number) => (
                                 <div key={index}>
                                    {item.userId !== user?.user?.id && (
                                       <div
                                          className={`flex gap-2 items-end ${
                                             direction === "ltr" ? "justify-start" : "justify-end"
                                          }`}
                                       >
                                          {/* eslint-disable-next-line @next/next/no-img-element */}
                                          <img
                                             src={
                                                activeChat?.attributes?.seller?.data?.attributes?.avatar?.data
                                                   ?.attributes?.formats?.thumbnail?.url ??
                                                `https://ui-avatars.com/api/?name=${activeChat?.attributes?.seller?.data?.attributes?.name}&background=random&color=fff&length=1&size=50&bold=true`
                                             }
                                             className='object-cover h-8 w-8 rounded-full'
                                             alt={`user_avatar`}
                                          />
                                          <div className='py-2 px-4 bg-gray-200 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-black/70'>
                                             {item?.message}
                                          </div>
                                       </div>
                                    )}
                                    {item.userId === user?.user?.id && (
                                       <div
                                          className={`flex gap-2 items-end ${
                                             direction === "ltr" ? "justify-end" : "justify-start"
                                          }`}
                                       >
                                          <div className='py-2 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white'>
                                             {item?.message}
                                          </div>
                                          {/* eslint-disable-next-line @next/next/no-img-element */}
                                          <img
                                             src={avatarUrl ?? "https://placehold.it/48x48"}
                                             className='object-cover h-8 w-8 rounded-full'
                                             alt='user_avatar'
                                          />
                                       </div>
                                    )}
                                 </div>
                              ))}
                        </div>
                        {/* Empty message */}
                        {!loading && activeMessage.length === 0 && (
                           <div className='flex flex-col justify-center items-center h-full'>
                              <h3 className='font-semibold text-lg text-black/70'>No Messages</h3>
                              <div className='font-light text-sm text-black/70'>
                                 You can start messaging by typing in the message box below.
                              </div>
                           </div>
                        )}
                        {loading && (
                           <div className='flex flex-col justify-center items-center h-full'>
                              <div className='w-10 h-10 border-b-2 border-t-2 border-primary rounded-full animate-spin'></div>
                           </div>
                        )}
                        <form
                           className='flex sticky left-0 bottom-0 w-full mt-4 pb-3 backdrop-blur-sm'
                           onSubmit={handleSubmit(sendMessage)}
                        >
                           {/* error message */}
                           {errors.message && (
                              <div className='absolute left-0 -top-6 text-red-400 text-sm'>
                                 The message field should not be empty.
                              </div>
                           )}
                           <textarea
                              className={`w-full bg-gray-100 py-2.5 focus:outline-none pl-3 pr-11 rounded-md resize-y h-12 max-h-80 ${
                                 errors.message ? "border border-red-400" : "border border-gray-100"
                              }`}
                              placeholder='Shift + Enter to add new line or Enter to send message'
                              {...register("message", { required: true })}
                              // on press shift + enter, add new line
                              onKeyDown={(e: any) => {
                                 if (e.key === "Enter" && e.shiftKey) {
                                    e.preventDefault();
                                    e.target.value += "\n";
                                 }
                                 if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit(sendMessage)();
                                 }
                              }}
                           ></textarea>
                           <button
                              type='submit'
                              className={`${
                                 direction === "rtl" ? "left-2" : "right-2"
                              } absolute  top-2 bg-primary text-white p-2 rounded-md`}
                           >
                              <IoIosSend className='text-lg' />
                           </button>
                        </form>
                     </Fragment>
                  )}
                  {activeChat === null && (
                     <div className='flex flex-col justify-center items-center h-full'>
                        <div className='font-semibold text-2xl'>Inbox</div>
                        <div className='font-light text-lg'>Please select a chat to start messaging</div>
                     </div>
                  )}
               </div>
            </div>

            {/* Right Side */}
            <div
               className={`absolute top-0 h-full flex flex-col p-5 overflow-y-auto ${
                  direction === "ltr" ? "border-l right-0" : "border-r left-0"
               } ${
                  details
                     ? "transform translate-x-0 z-50"
                     : `transform ${direction === "ltr" ? "translate-x-full" : "-translate-x-full"}`
               } transition-all duration-300 ease-in-out bg-white w-full max-w-80`}
            >
               {/* Close icon */}
               <div
                  className='sticky top-0 h-0 flex justify-end w-full cursor-pointer z-40'
                  onClick={() => setDetails(!details)}
               >
                  <IoClose className='-mr-3 -mt-3 w-7 h-7 p-1.5 rounded-full bg-gray-200 hover:bg-red-400 hover:text-white text-red-400' />
               </div>
               <div className='font-semibold text-xl mb-4'>{safetyTipsData?.title}</div>
               <ImageOpt
                  src={safetyTipsData?.image}
                  className='object-cover rounded-xl h-64'
                  alt=''
                  width={300}
                  height={300}
                  layout={undefined}
                  noPlaceholder={false}
               />
               <div className='font-semibold py-4'>{safetyTipsData?.created_at}</div>
               <div className='font-light' dangerouslySetInnerHTML={{ __html: safetyTipsData?.description }} />
            </div>
            {/* Right side overlay */}
            {details && (
               <div
                  className='absolute top-0 left-0 w-full h-full bg-black/5 backdrop-blur-sm z-40'
                  onClick={() => setDetails(!details)}
               ></div>
            )}
         </div>
      </div>
   );
};

export default Messages;
