import React, { useState } from "react";
import { Input } from "antd";
import { useLocation } from "react-router-dom";
import { Result, Button, message } from "antd";
import axios from "axios";
import { abiinput } from "../ABI/abiinput";

const Order = () => {
  const location = useLocation();
  const data = location.state;
  console.log(data);
  const [walletAddress, setWalletAddress] = useState("");
  const [addressEntered, setAddressEntered] = useState(false);
  const [numberOfProduct, setNumberOfProduct] = useState();
  const [isNumberOfProductEntered, setIsNumberOfProductEntered] =
    useState(false);

  const [blockAddress, setBlockAddress] = useState();

  const handleWalletChange = (e) => {
    setWalletAddress(e.target.value);
  };

  const handlenoProduct = (e) => {
    setNumberOfProduct(e.target.value);
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(abiinput)
      .then(() => {
        message.success("Copied to clipboard");
      })
      .catch((error) => {
        console.error("Error copying to clipboard: ", error);
        message.error("Failed to copy to clipboard");
      });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/deploy-in-blockchain",
        {
          vendor: walletAddress,
          supplier: data.supplierWalletAddress,
          vendorsharepercentage: 100 - data.supplierPercentage,
          suppliersharepercentage: data.supplierPercentage,
          productprice: data.productPrice,
          productname: data.productName,
          numberofproducts: numberOfProduct,
          contractdays: data.maxContractPeriod,
        }
        // const res = await axios.post(
        //   "http://localhost:5000/deploy-package-tracker",
        //   {
        //     contractAddress: walletAddress,
        //     productName: numberOfProduct,
        //   }
      );
      console.log(res.data);
      setBlockAddress(res.data.address);
      setIsNumberOfProductEntered(true);
      setAddressEntered(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {addressEntered && isNumberOfProductEntered ? (
        <Result
          status="success"
          title="Successfully deployed contract"
          subTitle={`contract has been deployed in etherum please copy below block address and abi inputs use it in your website`}
          extra={[
            <div>Address: {blockAddress}</div>,
            <Button type="primary" key="copy" onClick={handleCopy}>
              Copy ABI Inputs
            </Button>,
          ]}
        />
      ) : (
        <Result
          status="info"
          title="Enter your wallet address!"
          subTitle={`You are going to purchase ${data.productName} with share percentage ${data.supplierPercentage}% for contract period of ${data.maxContractPeriod} days`}
          extra={[
            <div className="">
              <Input
                placeholder="Please Enter your wallet address"
                value={walletAddress}
                onChange={handleWalletChange}
                style={{ borderRadius: "20px" }}
              />
              <Input
                placeholder="Please Enter Number of Product"
                value={numberOfProduct}
                onChange={handlenoProduct}
                style={{ borderRadius: "20px" }}
              />
            </div>,
            <Button
              type="primary"
              key="console"
              className="p-6"
              onClick={handleSubmit}
            >
              submit
            </Button>,
          ]}
        />
      )}
    </>
  );
};

export default Order;
