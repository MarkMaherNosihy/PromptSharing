import Link from 'next/link';

const Form = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit
}) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'><span className='blue_gradient'>{type} Post</span></h1>
      <p className='desc text-left max-w-md'>
        Create & Share <span className='orange_gradient'> prompts</span> for people to see, they will really appreciate it !
      </p>
      <form
       onSubmit={handleSubmit}
       className='mt-10 w-full max-w-2xl flex flex-col gap-2 glassmorphism'>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your Prompt
          </span>
        </label>
        <textarea 
        value={post.prompt}
        onChange={(e)=>setPost({...post, prompt: e.target.value})}
         placeholder='Write your prompt here...'
         className='form_textarea'/>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Tag
          </span>
        </label>
        <input type="text"
          value={post.tag}
          onChange={(e)=>setPost({...post, tag: e.target.value})}
          placeholder='Write your tag here...'
          className='form_input' />

          <div className='flex-end mx-3 my-5 gap-4'>
              <Link href="/" className='text-gray-500 text-sm'>Cancel</Link>
              <button className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white' type='submit' disabled={submitting}>
                {submitting ? `${type}...` : type}
              </button>
          </div>
      </form>
    </section>
  )
};

export default Form;
