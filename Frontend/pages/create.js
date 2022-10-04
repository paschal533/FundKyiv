import { useState, useMemo, useCallback, useContext } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useTheme } from "next-themes";
import Head from "next/head";

import { FundraiserContext } from "../context/FundraiserContext";
import { Button, Input, Loader } from "../components";
import images from "../assets";

const projectId = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_SECRET;
const projectIdAndSecret = `${projectId}:${projectSecret}`;

const client = ipfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: `Basic ${Buffer.from(projectIdAndSecret).toString(
      "base64"
    )}`,
  },
});

const CreateItem = () => {
  const { createAFundraiser, isLoadingFundraiser } =
    useContext(FundraiserContext);
  const [fileUrl, setFileUrl] = useState(null);
  const { theme } = useTheme();

  const uploadToInfura = async (file) => {
    try {
      const added = await client.add({ content: file });

      const url = `https://fundmatic.infura-ipfs.io/ipfs/${added.path}`;

      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  const onDrop = useCallback(async (acceptedFile) => {
    await uploadToInfura(acceptedFile[0]);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });

  // add tailwind classes acording to the file status
  const fileStyle = useMemo(
    () =>
      `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed  
       ${isDragActive ? " border-file-active " : ""} 
       ${isDragAccept ? " border-file-accept " : ""} 
       ${isDragReject ? " border-file-reject " : ""}`,
    [isDragActive, isDragReject, isDragAccept]
  );

  const [formInput, updateFormInput] = useState({
    name: "",
    description: "",
    address: "",
    website: "",
    limit: "",
  });
  const router = useRouter();

  const createFundraiser = async () => {
    const { name, description, address, website } = formInput;
    if (!name || !description || !address || !fileUrl || !website) return;

    try {
      await createAFundraiser(name, website, fileUrl, description, address);
      router.push("/");
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  if (isLoadingFundraiser) {
    return (
      <div className="flexCenter" style={{ height: "51vh" }}>
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <Head>Create</Head>
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 mb-8 font-semibold text-2xl">
          Create new Fundraiser
        </h1>
        <Tabs size="lg" className="dark:text-white text-nft-black-1">
          <TabList>
            <Tab
              className="text-white"
              _selected={{
                color: "white",
                bg: "blue.500",
                borderRadius: "5px",
              }}
            >
              Individual
            </Tab>
            <Tab
              className="text-white"
              _selected={{
                color: "white",
                bg: "blue.500",
                borderRadius: "5px",
              }}
            >
              Organisation
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <div className="mt-16">
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                  Upload Image
                </p>
                <div className="mt-4">
                  <div {...getRootProps()} className={fileStyle}>
                    <input {...getInputProps()} />
                    <div className="flexCenter flex-col text-center">
                      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                        JPG, PNG, GIF, SVG, WEBM, MP3, MP4. Max 100mb.
                      </p>

                      <div className="my-12 w-full flex justify-center">
                        <Image
                          src={images.upload}
                          width={100}
                          height={100}
                          objectFit="contain"
                          alt="file upload"
                          className={
                            theme === "light" ? "filter invert" : undefined
                          }
                        />
                      </div>

                      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">
                        Drag and Drop File
                      </p>
                      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm mt-2">
                        Or browse media on your device
                      </p>
                    </div>
                  </div>
                  {fileUrl && (
                    <aside>
                      <div>
                        <img src={fileUrl} alt="Asset_file" />
                      </div>
                    </aside>
                  )}
                </div>
              </div>

              <Input
                inputType="input"
                title="Name"
                placeholder="Fundraiser Name"
                handleClick={(e) =>
                  updateFormInput({ ...formInput, name: e.target.value })
                }
              />

              <Input
                inputType="textarea"
                title="Description"
                placeholder="Fundraiser Description"
                handleClick={(e) =>
                  updateFormInput({ ...formInput, description: e.target.value })
                }
              />

              <Input
                inputType="input"
                title="Website"
                placeholder="Fundraiser Website"
                handleClick={(e) =>
                  updateFormInput({ ...formInput, website: e.target.value })
                }
              />

              <Input
                inputType="Amount in USD"
                title="Limit"
                placeholder="Limit Amount in USD"
                handleClick={(e) =>
                  updateFormInput({ ...formInput, limit: e.target.value })
                }
              />

              <Input
                inputType="input"
                title="Address"
                placeholder="Fundraiser CELO Address"
                handleClick={(e) =>
                  updateFormInput({ ...formInput, address: e.target.value })
                }
              />

              <div className="mt-7 w-full flex justify-end">
                <Button
                  btnName="Create Fundraiser"
                  btnType="primary"
                  classStyles="rounded-xl"
                  handleClick={createFundraiser}
                />
              </div>
            </TabPanel>

            <TabPanel>
              <div className="mt-16">
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                  Upload Image
                </p>
                <div className="mt-4">
                  <div {...getRootProps()} className={fileStyle}>
                    <input {...getInputProps()} />
                    <div className="flexCenter flex-col text-center">
                      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                        JPG, PNG, GIF, SVG, WEBM, MP3, MP4. Max 100mb.
                      </p>

                      <div className="my-12 w-full flex justify-center">
                        <Image
                          src={images.upload}
                          width={100}
                          height={100}
                          objectFit="contain"
                          alt="file upload"
                          className={
                            theme === "light" ? "filter invert" : undefined
                          }
                        />
                      </div>

                      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">
                        Drag and Drop File
                      </p>
                      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm mt-2">
                        Or browse media on your device
                      </p>
                    </div>
                  </div>
                  {fileUrl && (
                    <aside>
                      <div>
                        <img src={fileUrl} alt="Asset_file" />
                      </div>
                    </aside>
                  )}
                </div>
              </div>

              <Input
                inputType="input"
                title="Name"
                placeholder="Fundraiser Name"
                handleClick={(e) =>
                  updateFormInput({ ...formInput, name: e.target.value })
                }
              />

              <Input
                inputType="textarea"
                title="Description"
                placeholder="Fundraiser Description"
                handleClick={(e) =>
                  updateFormInput({ ...formInput, description: e.target.value })
                }
              />

              <Input
                inputType="input"
                title="Website"
                placeholder="Fundraiser Website"
                handleClick={(e) =>
                  updateFormInput({ ...formInput, website: e.target.value })
                }
              />

              <Input
                inputType="input"
                title="Address"
                placeholder="Fundraiser CELO Address"
                handleClick={(e) =>
                  updateFormInput({ ...formInput, address: e.target.value })
                }
              />

              <div className="mt-7 w-full flex justify-end">
                <Button
                  btnName="Create Fundraiser"
                  btnType="primary"
                  classStyles="rounded-xl"
                  handleClick={createFundraiser}
                />
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default CreateItem;
