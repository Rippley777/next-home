import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
import Header from "./components/header/index";
import emailjs from "@emailjs/browser";
import Banner from "./components/banner";
import { dynamoClient } from "../libs/ddbClient.js";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";

const Contact: NextPage = () => {
  const form = useRef<HTMLFormElement | null>(null);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [existingDevelopmentRequest, setExistingDevelopmentRequest] =
    useState<boolean>(false);
  const [newDevelopmentRequest, setNewDevelopmentRequest] =
    useState<boolean>(false);
  const [applicationName, setApplicationName] = useState<string>("");
  const [preferredContactMethod, setPreferredContactMethod] = useState<
    string | null
  >(null);
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [moreDetails, setMoreDetails] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showErrorBanner, setShowErrorBanner] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setExistingDevelopmentRequest(false);
    setNewDevelopmentRequest(false);
    setApplicationName("");
    setPreferredContactMethod(null);
    setEmail("");
    setPhoneNumber("");
    setMoreDetails("");
  };

  const sendEmail = useCallback(() => {
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID || "",
        form.current || "",
        process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY || ""
      )
      .then(
        (result) => {
          resetForm();
          setShowSuccessBanner(true);
          console.log(result.text);
        },
        (error) => {
          setShowErrorBanner(true);
          console.log(error.text);
        }
      );
  }, []);

  const handleSendEmail = () => {
    setIsSubmitting(true);
  };

  const checkError = (field: string, value: string) => {
    if (!value) {
      setErrors((current) =>
        current.indexOf(field) >= 0 ? current : [...current, field]
      );
    } else {
      setErrors((current) => current.filter((error) => error !== field));
    }
  };

  const handleContactSubmit = (e: any) => {
    e.preventDefault();

    checkError("firstName", firstName);
    checkError("lastName", lastName);

    handleSendEmail();
    addToDb();
  };
  const params = {
    TableName: "requests",
    // Define the attributes and values of the item to be added. Adding ' + "" ' converts a value to
    // a string.
    Item: {
      // id: { N: id + "" },
      // title: { S: title + "" },
      name: { S: firstName + " " + lastName + "" },
      // body: { S: body + "" },
    },
  };

  const addToDb = async () => {
    try {
      await dynamoClient.send(new PutItemCommand(params));
    } catch {
      console.log("test");
    }
  };
  useEffect(() => {
    if (errors.length > 0) {
      setShowErrorBanner(true);
    }
    if (errors.length === 0 && isSubmitting) {
      if (showErrorBanner) {
        setShowErrorBanner(false);
      }
      sendEmail();
      setIsSubmitting(false);
    }
    if (showSuccessBanner) {
      setTimeout(() => {
        setShowSuccessBanner(false);
      }, 5000);
    }
    if (showErrorBanner) {
      setTimeout(() => {
        setShowErrorBanner(false);
      }, 5000);
    }
  }, [errors, isSubmitting, showSuccessBanner, showErrorBanner, sendEmail]);

  return (
    <div>
      <Head>
        <title>Contact</title>
        <meta name="description" content="Contact" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>

      <main>
        <Header />
        <div>
          {showSuccessBanner && (
            <Banner
              content="Thank you! We've received your inquiry and will be contacting you shortly."
              contentSm="Thank you!"
              type="success"
            />
          )}
          {showErrorBanner && (
            <Banner
              content="There was an error submitting your contact request! Please check your information and try again"
              contentSm="Error! Please try again"
              type="error"
            />
          )}
          <div className="md:grid md:grid-cols-3 md:gap-6 px-12 py-12 text-gray-700">
            <div className="mt-5 md:col-span-3 md:mt-0">
              <form onSubmit={handleContactSubmit} ref={form}>
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className="space-y-6 bg-white opacity-75 px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <h1 className="mx-auto col-span-6 text-gray-700 text-xl">
                        Feel free to contact me using this form
                      </h1>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          First name *
                        </label>
                        <input
                          autoComplete="given-name"
                          className="mt-1 block w-full rounded-md text-gray-700 border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                          id="firstName"
                          name="firstName"
                          onChange={(e) => setFirstName(e.target.value)}
                          type="text"
                          value={firstName}
                        />
                        {errors.indexOf("firstName") >= 0 && (
                          <div className="text-red-600 text-sm">
                            First Name is required
                          </div>
                        )}
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          className="block text-sm font-medium text-gray-700"
                          htmlFor="lastName"
                        >
                          Last name *
                        </label>
                        <input
                          autoComplete="family-name"
                          className="mt-1 block w-full rounded-md text-gray-700 border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                          id="lastName"
                          name="lastName"
                          onChange={(e) => setLastName(e.target.value)}
                          type="text"
                          value={lastName}
                        />
                        {errors.indexOf("lastName") >= 0 && (
                          <div className="text-red-600 text-sm">
                            Last Name is required
                          </div>
                        )}
                      </div>
                    </div>
                    <fieldset>
                      <legend className="sr-only">Inquiry Topic</legend>
                      <div
                        aria-hidden="true"
                        className="text-base font-medium text-gray-900"
                      >
                        Inquiry Topic
                      </div>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              checked={newDevelopmentRequest}
                              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                              id="newDevelopment"
                              name="newDevelopment"
                              onChange={(e) =>
                                setNewDevelopmentRequest(e.target.checked)
                              }
                              type="checkbox"
                              value="yes"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              className="font-medium text-gray-700"
                              htmlFor="newDevelopment"
                            >
                              New Development
                            </label>
                            <p className="text-gray-500">
                              Please check if inquiring about new development
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              checked={existingDevelopmentRequest}
                              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                              id="existingDevelopment"
                              name="existingDevelopment"
                              onChange={(e) =>
                                setExistingDevelopmentRequest(e.target.checked)
                              }
                              type="checkbox"
                              value="yes"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              className="font-medium text-gray-700"
                              htmlFor="existingDevelopment"
                            >
                              Existing Site/Application
                            </label>
                            <p className="text-gray-500">
                              Please check if inquiring about modifications to
                              an existing site or application
                            </p>
                          </div>
                        </div>
                        {existingDevelopmentRequest && (
                          <>
                            <label
                              className="block text-sm font-medium text-gray-700"
                              htmlFor="applicationName"
                            >
                              Site URL/App Name
                            </label>
                            <input
                              className="mt-1 block w-full rounded-md text-gray-700 border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                              id="applicationName"
                              name="applicationName"
                              onChange={(e) =>
                                setApplicationName(e.target.value)
                              }
                              type="text"
                              value={applicationName}
                            />
                          </>
                        )}
                      </div>
                    </fieldset>

                    <fieldset>
                      <legend className="contents text-base font-medium text-gray-900">
                        Preferred contact method
                      </legend>
                      <p className="text-sm text-gray-500">
                        How would you prefer to be contacted?
                      </p>
                      <div className="my-4 space-y-4">
                        <div className="flex items-center">
                          <input
                            className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
                            id="preferredPhone"
                            name="preferredContactMethod"
                            onChange={(e) =>
                              setPreferredContactMethod(e.target.value)
                            }
                            type="radio"
                            value="phone"
                          />
                          <label
                            className="ml-3 block text-sm font-medium text-gray-700"
                            htmlFor="preferredPhone"
                          >
                            Phone
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
                            id="preferredEmail"
                            name="preferredContactMethod"
                            onChange={(e) =>
                              setPreferredContactMethod(e.target.value)
                            }
                            type="radio"
                            value="email"
                          />
                          <label
                            className="ml-3 block text-sm font-medium text-gray-700"
                            htmlFor="preferredEmail"
                          >
                            Email
                          </label>
                        </div>
                      </div>
                      {preferredContactMethod &&
                        preferredContactMethod === "email" && (
                          <>
                            <label
                              className="block text-sm font-medium text-gray-700"
                              htmlFor="emailAddress"
                            >
                              Email Address
                            </label>
                            <input
                              className="mt-1 block w-full rounded-md text-gray-700 border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                              id="emailAddress"
                              name="emailAddress"
                              onChange={(e) => setEmail(e.target.value)}
                              type="text"
                              value={email}
                            />
                          </>
                        )}
                      {preferredContactMethod &&
                        preferredContactMethod === "phone" && (
                          <>
                            <label
                              className="block text-sm font-medium text-gray-700"
                              htmlFor="phoneNumber"
                            >
                              Phone Number
                            </label>
                            <input
                              className="mt-1 block w-full rounded-md text-gray-700 border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                              id="phoneNumber"
                              name="phoneNumber"
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              type="tel"
                              value={phoneNumber}
                            />
                          </>
                        )}
                    </fieldset>
                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700"
                        htmlFor="moreDetails"
                      >
                        More details
                      </label>
                      <div className="mt-1">
                        <textarea
                          className="mt-1 block w-full rounded-md text-gray-800 border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                          id="moreDetails"
                          name="moreDetails"
                          onChange={(e) => setMoreDetails(e.target.value)}
                          placeholder="Looking for bug fixes for you@example.com"
                          rows={3}
                          value={moreDetails}
                        ></textarea>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Brief description for your inquiry
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 opacity-90 px-4 py-3 text-right sm:px-6">
                    <button
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* 
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200"></div>
          </div>
        </div>

        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Personal Information
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form action="#" method="POST">
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          First name
                        </label>
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          autoComplete="given-name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Last name
                        </label>
                        <input
                          type="text"
                          name="last-name"
                          id="last-name"
                          autoComplete="family-name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-4">
                        <label
                          htmlFor="email-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email address
                        </label>
                        <input
                          type="text"
                          name="email-address"
                          id="email-address"
                          autoComplete="email"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                        >
                          <option>United States</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                        </select>
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Street address
                        </label>
                        <input
                          type="text"
                          name="street-address"
                          id="street-address"
                          autoComplete="street-address"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          autoComplete="address-level2"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label
                          htmlFor="region"
                          className="block text-sm font-medium text-gray-700"
                        >
                          State / Province
                        </label>
                        <input
                          type="text"
                          name="region"
                          id="region"
                          autoComplete="address-level1"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label
                          htmlFor="postal-code"
                          className="block text-sm font-medium text-gray-700"
                        >
                          ZIP / Postal code
                        </label>
                        <input
                          type="text"
                          name="postal-code"
                          id="postal-code"
                          autoComplete="postal-code"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200"></div>
          </div>
        </div>

        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Notifications
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Decide which communications you'd like to receive and how.
                </p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form action="#" method="POST">
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <fieldset>
                      <legend className="sr-only">By Email</legend>
                      <div
                        className="text-base font-medium text-gray-900"
                        aria-hidden="true"
                      >
                        By Email
                      </div>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              id="comments"
                              name="comments"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="comments"
                              className="font-medium text-gray-700"
                            >
                              Comments
                            </label>
                            <p className="text-gray-500">
                              Get notified when someones posts a comment on a
                              posting.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              id="candidates"
                              name="candidates"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="candidates"
                              className="font-medium text-gray-700"
                            >
                              Candidates
                            </label>
                            <p className="text-gray-500">
                              Get notified when a candidate applies for a job.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              id="offers"
                              name="offers"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="offers"
                              className="font-medium text-gray-700"
                            >
                              Offers
                            </label>
                            <p className="text-gray-500">
                              Get notified when a candidate accepts or rejects
                              an offer.
                            </p>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                    <fieldset>
                      <legend className="contents text-base font-medium text-gray-900">
                        Push Notifications
                      </legend>
                      <p className="text-sm text-gray-500">
                        These are delivered via SMS to your mobile phone.
                      </p>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center">
                          <input
                            id="push-everything"
                            name="push-notifications"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <label
                            htmlFor="push-everything"
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            Everything
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="push-email"
                            name="push-notifications"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <label
                            htmlFor="push-email"
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            Same as email
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="push-nothing"
                            name="push-notifications"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <label
                            htmlFor="push-nothing"
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            No push notifications
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form> 
            </div>
          </div>
        </div>*/}
      </main>
    </div>
  );
};

export default Contact;
