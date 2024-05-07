import React, { useState } from "react";
import { Input } from "antd";
import Title from "antd/es/typography/Title";
import { Result, Button } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";

const domain = "https://nice-sea-03217110f.5.azurestaticapps.net/?caddr=";

const DeployPackageTracker = () => {
  const [productBlockAddress, setProductBlockAddress] = useState();
  const [blockAddress, setBlockAddress] = useState();
  const [productName, setProductName] = useState();
  const [isAddressEntered, setIsAddressEntered] = useState(false);
  const [isProductNameEntered, setIsProductNameEntered] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = async () => {
    try {
      setIsSubmitted(true);
      const res = await axios.post(
        "http://localhost:5000/deploy-package-tracker",
        {
          contractAddress: productBlockAddress,
          productName: productName,
        }
      );
      console.log(res.data);
      setBlockAddress(res.data.address);
      setIsAddressEntered(true);
      setIsProductNameEntered(true);
      setIsSubmitted(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isAddressEntered && isProductNameEntered ? (
        <Result
          status="success"
          title="Successfully deployed contract"
          subTitle={`contract has been deployed in etherum please copy below block address `}
          extra={[
            <div>Address: {blockAddress}</div>,
            <div>
              <Title level={5}>
                Generated QR code for{" "}
                <Link to={domain + blockAddress}>{domain + blockAddress}</Link>
              </Title>
              <div
                style={{
                  height: "auto",
                  margin: "0 auto",
                  maxWidth: 200,
                  width: "100%",
                }}
              >
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={`${domain}${blockAddress}`}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </div>,
          ]}
        />
      ) : (
        <Result
          status="info"
          title="Delpoy Package Tracker"
          subTitle={`Once a package tracker is deployed in blockchain it cannot be reversed`}
          extra={[
            <div className="">
              <div style={{ padding: "10px" }}>
                <Input
                  placeholder="Please Enter Your  Product Block address"
                  value={productBlockAddress}
                  onChange={(e) => {
                    setProductBlockAddress(e.target.value);
                  }}
                  style={{ borderRadius: "20px" }}
                />
              </div>
              <div style={{ padding: "10px" }}>
                <Input
                  placeholder="Please Enter Product Name"
                  value={productName}
                  onChange={(e) => {
                    setProductName(e.target.value);
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
      )}
    </>
  );
};

export default DeployPackageTracker;
