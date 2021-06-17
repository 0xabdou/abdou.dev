import TitleWithDescription from "../../components/title-with-description";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import SocialSharePreview from "../../components/social-share-preview";

const FrontEndPractice = () => {
  const title = "Abdou Ouahib | Front End Practice";
  const description = "Front End Practice provides a collection of ten handpicked " +
    "websites that you can try to recreate. This is one of the best ways to practice " +
    "and polish your front-end development skills. Here you can find all the projects " +
    "I recreated so far.";
  return (
    <div className="relative flex flex-col w-full max-w-screen-md mb-10">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description}/>
      </Head>
      <SocialSharePreview
        image="/static/images/social-share-preview/front-end-practice.png"
        title={title}
        description={description}
      />
      <TitleWithDescription
        title="Front End Practice"
        description={<>
          {description}
          &nbsp;Visit&nbsp;
          <a
            className="font-bold hover:underline"
            href="https://www.frontendpractice.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Front End Practice
          </a>
          .
        </>}
      />
      <div className="flex flex-col w-full px-4 my-8">
        <div
          className="flex items-center flex-col sm:flex-row">
          <div className="flex flex-col text-lg w-48 items-start
            mb-8 sm:mb-0 sm:mr-auto">
            #1
            <h2 className="font-bold text-4xl">Ableton</h2>
            <h3 className="font-bold text-xl border-b pb-3 w-full
              border-black border-opacity-60 dark:border-white dark:border-opacity-60">
              About page
            </h3>
            <ul className="list-disc list-inside opacity-80">
              What will you learn?
              <li>Typography choices</li>
              <li>Spacing</li>
              <li>Unique grid layout</li>
              <li>Multi-column footer</li>
              <li>and more!</li>
            </ul>
            <Link href={"/front-end-practice/ableton"}>
              <a
                className="flex justify-center items-center mx-auto mt-4 py-3 px-4
                font-bold text-xl rounded-md
                border-2 border-black dark:border-white
                bg-transparent hover:bg-black dark:hover:bg-white
                text-black hover:text-white dark:text-white dark:hover:text-black
                transition transition-color duration-300">
                Check it out
              </a>
            </Link>
          </div>
          <div
            className="relative
            md:h-[32rem] md:w-[32rem]
            sm:w-[65vw] sm:h-[65vw]
            w-[90vw] h-[90vw]">
            <Image
              className="rounded"
              src={"/static/images/fep/ableton/banner.png"}
              layout="fill"
              objectFit="cover"
              alt="Ableton banner"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontEndPractice;