import React, { Component } from "react";
import ReactDOM from "react-router-dom";
import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import TestCase from "./TestCase";

export default function Main() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/testcase" element={<TestCase />} />
        </Routes>
      </HashRouter>
    </div>
  );
}
