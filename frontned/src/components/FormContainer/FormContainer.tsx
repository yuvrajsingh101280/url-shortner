import axios from "axios";
import React, { useState } from "react";

type Props = {
  updateReloadState: () => void;
};

const FormContainer = (props: Props) => {
  const { updateReloadState } = props;

  const [fullUrl, setFullUrl] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const url = await axios.post(
        "https://url-shortner-ruptbackend.vercel.app/api/shortUrl",
        {
          fullUrl: fullUrl,
        }
      );
      console.log(fullUrl);
      console.log(url);
      setFullUrl("");
      updateReloadState();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mx-auto bg-blue-500 p-2">
      <div className=" my-8 rounded-xl bg-cover bg-center bg-no-repeat">
        <h2 className=" text-4xl text-white text-center pb-4">Url shortner</h2>
        <p className="text-center text-white font-extralight pb-2 text-xl">
          Paste your untidy link at the bottom
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex">
            <div className="w-full relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none text-slate-800">
                urlshortner.link
              </div>

              <input
                type="text"
                placeholder="add your link"
                required
                className="block w-full p-4 text-sm text-gray-900 border ps-32 border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 "
                value={fullUrl}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFullUrl(e.target.value)
                }
              />

              <button
                type="submit"
                className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full bg-blue-700 text-white rounded-lg border border-blue-700 focus:outline-none  focus:ring-blue-300"
              >
                Shorten URL
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormContainer;
