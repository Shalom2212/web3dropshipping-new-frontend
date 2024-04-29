import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table } from "antd";
import { BookOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [supplierData, setSupplierData] = useState();
  const nav = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/supplier-details")
      .then((res) => {
        setSupplierData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Price for each product",
      dataIndex: "productPrice",
      key: "productPrice",
    },
    {
      title: "Supplier Name",
      dataIndex: "supplierName",
      key: "supplierName",
    },
    {
      title: "Supplier Wallet Address",
      dataIndex: "supplierWalletAddress",
      key: "supplierWalletAddress",
    },
    {
      title: "Contract Days",
      dataIndex: "maxContractPeriod",
      key: "maxContractPeriod",
    },
    {
      title: "Supplier Percentage",
      dataIndex: "supplierPercentage",
      key: "supplierPercentage",
    },
    {
      title: "Total Number Of Products",
      dataIndex: "totalNumberOfProduct",
      key: "totalNumberOfProduct",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          onClick={() => {
            nav("/order", { state: record });
          }}
        >
          <BookOutlined />
        </Button>
      ),
    },
  ];

  console.log(supplierData);

  return <Table dataSource={supplierData} columns={columns} rowKey="id" />;
};

export default Home;
