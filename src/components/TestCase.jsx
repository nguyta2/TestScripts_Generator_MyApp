import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload, Input } from "antd";
import { Select } from "antd";
const { Option } = Select;
const { Generate_TestSpec } = require("../utils/Gen_TestSpec");
const { read, readFile, utils } = require("xlsx");
const fs = require("fs-extra");

const currentWorkingDirectory = process.cwd();

fs.readdir(currentWorkingDirectory, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log("Current Working Directory:", currentWorkingDirectory);
  console.log("Files in the Current Working Directory:", files);
});

export default function TestCase() {
  let [requirementPath, setRequirementPath] = useState("");
  let [testCaseTemplatePath, setTestCaseTemplatePath] = useState("");
  let [reqWb, setReqWb] = useState([]);
  let [testCaseTemplateWb, setTestCaseTemplateWb] = useState([]);

  const checkErr = () => {
    let isValid = false;
    console.log("checkErr", requirementPath);
    if (requirementPath == "") {
      document.querySelector("#reqErr").innerHTML = "Please select Req File!!!";
      isValid = true;
    } else {
      document.querySelector("#reqErr").innerHTML = "";
    }

    if (testCaseTemplatePath == "") {
      document.querySelector("#testSpecErr").innerHTML =
        "Please select TestCase Template File!!!";
      isValid = true;
    } else {
      document.querySelector("#testSpecErr").innerHTML = "";
    }
    return isValid;
  };

  const generateTestCase = () => {
    let errValid = checkErr();
    if (!errValid) {
      let testSpecPath = document.querySelector("#testSpecDir").value;
      Generate_TestSpec(testCaseTemplateWb, reqWb, testSpecPath);
    }
  };

  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },

    beforeUpload(file) {
      if (file.path !== "") {
        const reader = new FileReader();
        reader.onload = (e) => {
          const { result } = e.target;
          const workbook = read(result, { type: "binary" });
          let data = utils.sheet_to_json(
            workbook.Sheets[workbook.SheetNames[0]]
          );
          if (file.path.toLowerCase().includes("requirement")) {
            setRequirementPath(file.path);
            // setReqWb(data);
          } else {
            setTestCaseTemplatePath(file.path);
            // setTestCaseTemplateWb(data);
          }
        };
        reader.readAsBinaryString(file);
        message.success(`${file.name} file uploaded successfully`);
      }
      return false;
    },
    onChange(info) {
      // check which file was removed
      console.log(Object.keys(info.fileList));
      console.log(info.file.name);

      if (Object.keys(info.fileList).length === 0) {
        if (info.file.name.toLowerCase().includes("requirement")) {
          setRequirementPath("");
        } else {
          setTestCaseTemplatePath("");
        }
      } else {
        // check which file was added
        if (info.file.name.toLowerCase().includes("requirement")) {
          setRequirementPath("");
        } else {
          setTestCaseTemplatePath("");
        }
      }
      checkErr();
    },
  };

  return (
    <div className="container mx-auto">
      <header className="flex">
        <div className="logo flex-none p-2">
          <Link to={"/"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-14 h-14"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </Link>
        </div>
        <div className="header__content flex-initial w-full text-center">
          <h1 className=" text-5xl font-bold mt-0 mb-6 bg-gradient-to-r from-cyan-500 to-blue-500 py-6">
            Test Case Generator
          </h1>
        </div>
      </header>
      <section>
        <div id="levelSelection" className="flex justify-center mt-10">
          <span className="text-2xl font-bold text-orange-400">
            Choose Test Level:{" "}
          </span>
          <Select
            defaultValue="ENG7"
            style={{
              width: 240,
            }}
            // onChange={handleChange}
          >
            <Option value="ENG7">ENG7</Option>
            <Option value="ENG8">ENG8</Option>
          </Select>
        </div>

        <div className="flex flex-col mt-10">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <tbody>
                    <tr
                      id=""
                      className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                      <td className="text-xl text-left text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                        Requirement:
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <Upload {...props}>
                          <Button icon={<UploadOutlined />}>
                            Click to Upload (Ex: Requirement.xlsx)
                          </Button>
                        </Upload>
                        <p id="reqErr" className="text-rose-700 font-bold"></p>
                      </td>
                    </tr>
                    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                      <td className="text-xl text-left text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                        Test specification template:
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <Upload {...props}>
                          <Button icon={<UploadOutlined />}>
                            Click to Upload (Ex: Testcase_Template.xlsx)
                          </Button>
                        </Upload>
                        <p
                          id="testSpecErr"
                          className="text-rose-700 font-bold"
                        ></p>
                      </td>
                    </tr>
                    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                      <td className="text-xl text-left text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                        Test specification output:
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <Input
                          id="testSpecDir"
                          placeholder="N:\my-app\src\assets"
                        />
                        <p className="text-rose-700 font-bold"></p>
                      </td>
                    </tr>
                    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                      <td className="text-xl text-left text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                        Link module:
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <Input placeholder="Link module here" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="flex justify-center">
          <Button
            onClick={() => {
              generateTestCase();
            }}
            type="primary"
            shape="round"
            size={"large"}
          >
            Generate Test Cases
          </Button>
        </div>
      </section>
    </div>
  );
}
