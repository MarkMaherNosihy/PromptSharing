"use client";
import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const UpdatePrompt = (props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const promptId = searchParams.get('id');
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const editPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try{

      const response = await fetch(`/api/prompt/${promptId}`,{
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      });
      if(response.ok){
          router.push('/profile');
      }
    }catch(error){
      console.log(error);
    }finally{
      setSubmitting(false);
    }
  };

  useEffect(()=>{
    const getPrompt = async ()=>{
         const response = await fetch(`api/prompt/${promptId}`);
         const data = await response.json();

         setPost({
            prompt: data.prompt,
            tag: data.tags
         })
    }
    if(promptId){
        getPrompt();
    }
  }, [promptId])

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={editPrompt}
    ></Form>
  );
};

export default UpdatePrompt;
