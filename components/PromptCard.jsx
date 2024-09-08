"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  //  const navigator = useRouter();
  const {data: session} = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const handleCopy = ()=>{
    navigator.clipboard.writeText(post.prompt)
  }

  const handleGoToProfile = ()=>{
    router.push(`profile/${post.creator._id}?username=${post.creator.username}`);
  }
  return (
    <>
    <div className="prompt_card">
      <div className="flex flex-col justify-between items-start gap-5">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-3 cursor-pointer" onClick={()=>handleGoToProfile()}>
            <Image
              src={post.creator.image}
              alt="user_image"
              width={40}
              height={40}
              className="rounded-full object-contain"
            ></Image>
            <h3 className="font-satoshi font-semibold">
              {post.creator.username}
            </h3>
          </div>
          <div className="copy_btn" onClick={()=>{ handleCopy(); toast("Copied to clipboard")}}>
              <Image src={'/assets/icons/copy.svg'} width={12} height={12}></Image>
          </div>
        </div>
        <div>
          <p>{post.prompt}</p>
        </div>
        <div>
          <p className="font-bold cursor-pointer" onClick={()=> handleTagClick(post.tags) }>#{post.tags}</p>
        </div>
        {session?.user.id === post.creator._id && pathName === '/profile' && (
          <div className="flex-center gap-3 w-full">
            <p className="font-inter text-sm green_gradient cursor-pointer" onClick={handleEdit}>Edit</p>
            <p className="font-inter text-sm orange_gradient cursor-pointer" onClick={handleDelete}>Delete</p>
          </div>
        )}
      </div>
    </div>
    <ToastContainer position="bottom-center" autoClose={1000} hideProgressBar={true}/>
    </>
  );
};

export default PromptCard;
