import React, { useState } from "react";
import QRCode from "react-qr-code";
import { Result, Input, Button } from "antd";
import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";

const domain = "https://nice-sea-03217110f.5.azurestaticapps.net/?caddr=";

const GenerateQRCode = () => {
  const [addressValue, setAddressValue] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  return (
    <>
      {!isSubmitted ? (
        <Result
          status="info"
          title="Generate QR Code for Your Packages"
          subTitle={`default domain is ${domain}deployed-package-address`}
          extra={[
            <div>
              <Input
                placeholder="Please Enter Your Deployed package Address"
                value={addressValue}
                onChange={(e) => {
                  setAddressValue(e.target.value);
                }}
                style={{ borderRadius: "20px" }}
              />
            </div>,
            <Button
              type="primary"
              key="console"
              className="p-6"
              onClick={() => {
                setIsSubmitted(true);
              }}
            >
              Generate
            </Button>,
          ]}
        />
      ) : (
        <div>
          <Title level={5}>
            Generated QR code for{" "}
            <Link to={domain + addressValue}>{domain + addressValue}</Link>
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
              value={`${domain}${addressValue}`}
              viewBox={`0 0 256 256`}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default GenerateQRCode;
