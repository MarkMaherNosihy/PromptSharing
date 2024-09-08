"use client";
import Form from "@components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import { Bars } from "react-loader-spinner";

const UpdatePrompt = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const promptId = searchParams.get("id");

  const editPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const getPrompt = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();

        setPost({
          prompt: data.prompt,
          tag: data.tags,
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (promptId) {
      getPrompt();
    }
  }, [promptId]);

  if (loading) {
    return (
      <div className="spinner-layout">
        <Bars
          height="80"
          width="80"
          color="#ea580c"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass="spinner"
          visible={loading}
        />
      </div>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={editPrompt}
      />
    </Suspense>
  );
};

export default UpdatePrompt;
