import Feed from "@components/Feed";

const Home = (props) => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Share & Discover Prompts
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">
          Enhance your AI Prompting capabilities
        </span>
      </h1>
      <p className="desc text-center">
        SharePrompts is a AI Prompt sharing platform that enables the users to
        share, discover and enhance their prompting skills.
      </p>
      <Feed/>
    </section>
  );
};

export default Home;
