import type { NextPage } from "next";
import Head from "next/head";
import Footer from "./components/footer";
import Header from "./components/header/index";
import Image from "next/image";
import background from "../public/background.jpeg";
import profilePic from "../public/pic01.jpg";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Ally Rippley | Web Developer</title>
        <meta name="description" content="React / Javascript Developer" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css"
        />
      </Head>

      <main>
        <Header />

        <div
          className="background font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover"
          style={{ backgroundImage: "url(" + background + ")" }}
        >
          <div className="flex items-center h-auto flex-wrap mx-20 my-12">
            <div
              className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg shadow-2xl bg-white opacity-75 mx-auto"
              id="profile"
            >
              <div className="p-4 md:p-12 text-center lg:text-left">
                <Image
                  alt="profile picture"
                  className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
                  height={120}
                  src={profilePic}
                  width={120}
                />

                <h1 className="text-3xl font-bold pt-8 lg:pt-0">
                  Ally Rippley
                </h1>
                <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                  <svg
                    className="h-4 fill-current text-green-700 pr-4"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                  </svg>{" "}
                  Web Engineer
                </p>
                <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
                  <svg
                    className="h-4 fill-current text-green-700 pr-4"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" />
                  </svg>{" "}
                  Dallas, TX
                </p>
                <p className="py-8 text-sm">
                  <p className="py-2">
                    Primarily focused on frontend technologies using{" "}
                    <strong>Javascript, React, React Native,</strong> and{" "}
                    <strong>TailwindCSS</strong>
                  </p>
                  <p className="py-2">
                    On the backend, I primarily use{" "}
                    <strong>Node, Express, MongoDB,</strong> and{" "}
                    <strong>PostgreSQL</strong>
                  </p>
                  <p className="py-2">
                    Passionate about testing with <strong>Cypress</strong> and{" "}
                    <strong>Jest</strong>
                  </p>
                  <p className="py-2">
                    I host on <strong>AWS, Raspberry Pi,</strong> and{" "}
                    <strong>Heroku</strong>
                  </p>
                </p>

                <Link className="pt-12 pb-8" href="/contact">
                  <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-md">
                    Get In Touch
                  </button>
                </Link>

                <div className="mt-6 pb-16 lg:pb-0 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-between">
                  <Link
                    className="link"
                    data-tippy-content="@github_handle"
                    href="https://github.com/rippley777"
                  >
                    <svg
                      className="h-6 fill-current text-gray-600 hover:text-green-700"
                      role="img"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>GitHub</title>
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Home;
