import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { packageABI } from "../ABI/packageABI";
import { Result, Button, Input } from "antd";

const AddPlaceForPackage = () => {
  const [web3, setWeb3] = useState();
  const [smartContract, setSmartContract] = useState();
  const [productContractAddress, setProductContractAddress] = useState();
  const [location, setLocation] = useState();
  const [locDesc, setLocDesc] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(() => {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          //   const courseInstance = new web3Instance.eth.Contract(
          //     packageABI,
          //     contractAddress
          //   );
          //   setSmartContract(courseInstance);

          //   courseInstance.methods
          //     .productPrice()
          //     .call()
          //     .then((fee) => {
          //       setProductPrice(web3Instance.utils.fromWei(fee, "ether"));
          //     });

          //   courseInstance.methods
          //     .numberOfProduct()
          //     .call()
          //     .then((nop) => {
          //       setNumberOfProduct(nop);
          //       console.log(nop);
          //     });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      alert("Please install an another Ethereum wallet.");
    }
  }, []);

  const handleSubmit = async () => {
    setIsSubmitted(true);
    const accounts = await web3.eth.getAccounts();
    const courseInstance = await new web3.eth.Contract(
      packageABI,
      productContractAddress
    );
    setSmartContract(courseInstance);

    courseInstance.methods
      .addPlace(location, locDesc)
      .send({
        from: accounts[0],
      })
      .then(() => {
        setIsSubmitted(false);
        console.log("place added successfully!");
      });
  };

  return (
    <>
      <Result
        status="info"
        title="Add location to Package Contract tracker!"
        subTitle={`Please Fill all data`}
        extra={[
          <div className="">
            <div style={{ padding: "10px" }}>
              <Input
                placeholder="Please Enter Contract Address"
                value={productContractAddress}
                onChange={(e) => {
                  setProductContractAddress(e.target.value);
                }}
                style={{ borderRadius: "20px" }}
              />
            </div>
            <div style={{ padding: "10px" }}>
              <Input
                placeholder="Please Enter Location"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                style={{ borderRadius: "20px" }}
              />
            </div>
            <div style={{ padding: "10px" }}>
              <Input
                placeholder="Please Enter Description Location"
                value={locDesc}
                onChange={(e) => {
                  setLocDesc(e.target.value);
                }}
                style={{ borderRadius: "20px" }}
              />
            </div>
          </div>,
          <Button
            type="primary"
            key="console"
            className="p-6"
            onClick={handleSubmit}
            loading={isSubmitted}
          >
            submit
          </Button>,
        ]}
      />
    </>
  );
};

export default AddPlaceForPackage;
