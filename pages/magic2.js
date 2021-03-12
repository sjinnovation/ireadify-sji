import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Head from "next/head";
var oauth = require("oauth-sign");

const test = () => {

  const [ showBook , setBook] = useState(true)

  useEffect(() => {
    // var oauth = require('oauth-sign');
    // var action = 'https://lti.tools/saltire/tp';
    var action = "https://magicbox.magicsw.com/ltigateway.htm";
    var method = "POST";
    var timestamp = Math.round(Date.now() / 1000);

    var params = {
      // LTI Required Parameters
      context_type: "Course Section",
      launch_presentation_css_url: "http://ltiapps.net/test/css/tc.css",
      launch_presentation_document_target: "frame",
      launch_presentation_locale: "en-GB",
      lis_course_offering_sourcedid: "DD-ST101",
      lis_course_section_sourcedid: "DD-ST101:C1",
      lis_person_name_given: "rishi",
      lis_person_sourcedid: "sis:942a8dd9",
      lti_message_type: "basic-lti-launch-request",
      lti_version: "LTI-1p0",
      resource_link_id: "resourceLinkId",
      context_id: "S3294476",
      //oauth_consumer_key: 'jisc.ac.uk',
      oauth_consumer_key: "ff454783ce75440af0d6c8b048af8c09",
      oauth_nonce: btoa(timestamp),
      oauth_signature_method: "HMAC-SHA1",
      oauth_timestamp: timestamp,
      oauth_version: "1.0",

      launch_presentation_return_url: "",
      lis_person_name_full: "rishi",
      lis_person_name_family: "ger",
      lis_person_contact_email_primary: "rgera@ymail.com",
      resource_link_description:
        "Will ET phone home, or not; click to discover more.",
      resource_link_id: "429785226",
      resource_link_title: "Phone home",
    //   roles: "Student,urn:lti:instrole:ims/lis/Alumni",
      tool_consumer_instance_description:
        "A Higher Education establishment in a land far, far away.",
      tool_consumer_instance_url: "https://vle.uni.ac.uk/",
      user_id: "29123e",
      user_image: "http://ltiapps.net/test/images/lti.gif",
      launch_id: "product",
      product_code: "1223443",
    };

    //    var signature = oauth.hmacsign(method, action, params, 'secret');
    var signature = oauth.hmacsign(
      method,
      action,
      params,
      "a51dcf0ec8274dfff20c65d162f6c2f0"
    );
    params.oauth_signature = signature;

    var form = document.querySelector("#ltiForm");
    form.action = action;
    form.method = method;
    for (var name in params) {
      var node = document.createElement("input");
      node.name = name;
      node.type = "hidden";
      node.value = params[name];
      form.appendChild(node);
    }

    // var output = document.querySelector("code");
    // output.textContent = JSON.stringify(params, null, 2);
    // console.log(form);

    var meta = document.querySelector("body > script");
    
    //console.log(meta);
  }, []);

  let submitIFrame = (e) => {
      e.preventDefault()
      var MyIFrame = document.getElementById("myframe");
        var MyIFrameDoc = (MyIFrame.contentWindow || MyIFrame.contentDocument);
        console.log(MyIFrameDoc.document)
        if (MyIFrameDoc.document) {
            MyIFrameDoc = MyIFrameDoc.document;
            MyIFrameDoc.getElementById("ltiForm").submit()
        }
       
  }

  return (
    <>
      <Head>{/* <script src="/bundle.js"></script> */}</Head>
      {/* <pre>
        <code className="language-json"></code>
      </pre> */}

<div>

      {
        showBook ? 
        <div className="modal-content">

        <iframe name="my-iframe" style={{width: "100%"}} height="600" width="100%"></iframe>
          
        </div> 

        : null
      }

    <form id="ltiForm"  target='my-iframe'>
      
      </form>
       <button  className="rounded w-full my-4 inline-flex justify-center border-2 shadow-sm px-11 py-2 bg-gradient-to-r from-purple-bright to-purple-brigh text-base font-semibold text-white hover:from-purple-light hover:to-blue-bright focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-100 sm:ml-3 sm:w-auto sm:text-sm font-sans" type="submit" form="ltiForm" >
        Show Book
      </button>
      
      </div>
     
      <style jsx>{`
             body {
                margin: 0;
                background: #fafafa;
                font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                color: #333;
              
                position: absolute;
                height: 100%;
                width: 100%;
                min-height: 800px;
              }
              .modal {
                display: block; /* Hidden by default */
                position: fixed; /* Stay in place */
                z-index: 1; /* Sit on top */
                padding-top: 0px; /* Location of the box */
                left: 0;
                top: 0;
                width: 100%; /* Full width */
                height: 100%; /* Full height */
                overflow: auto; /* Enable scroll if needed */
                background-color: rgb(0,0,0); /* Fallback color */
                background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
              }
              
              /* Modal Content */
              .modal-content {
                background-color: #fefefe;
                margin: auto;
                padding: 5px;
                border: 1px solid #888;
                // width: 100%;
                // height: 100%
              }
              
              .close {
                color: #aaaaaa;
                float: right;
                font-size: 28px;
                font-weight: bold;
              }
              
              .close:hover,
              .close:focus {
                color: #000;
                text-decoration: none;
                cursor: pointer;
              }
              #title {
                width: 900px;
                min-height: 18px;
                margin: 10px auto;
                text-align: center;
                font-size: 16px;
                color: #E2E2E2;
                font-weight: 400;
              }
              
              #title:hover {
                color: #777;
              }
              
              #viewer.spreads {
                width: 100%;
                height: 600px;
                box-shadow: 0 0 4px #ccc;
                border-radius: 5px;
                padding: 0;
                position: relative;
                margin: 10px auto;
                /* top: calc(50vh - 400px); */
              }
              
              #viewer.spreads .epub-view > iframe {
                  background: white;
              }
              
              #viewer.scrolled {
                overflow: hidden;
                width: 800px;
                margin: 0 auto;
                position: relative;
                background: url('ajax-loader.gif') center center no-repeat;
                box-shadow: 0 0 4px #ccc;
                padding: 20px;
                background: white;
              }
              
              #viewer.scrolled .epub-view > iframe {
                  background: white;
              }
              
              #prev {
                left: 0;
              }
              
              #next {
                right: 0;
              }
              
              #toc {
                display: block;
                margin: 10px auto;
              }
              
              @media (min-width: 1000px) {
                #viewer.spreads:after {
                  position: absolute;
                  width: 1px;
                  border-right: 1px #000 solid;
                  height: 90%;
                  z-index: 1;
                  left: 50%;
                  margin-left: -1px;
                  top: 5%;
                  opacity: .15;
                  box-shadow: -2px 0 15px rgba(0, 0, 0, 1);
                  content:  "";
                }
              
                #viewer.spreads.single:after {
                  display: none;
                }
              
                #prev {
                  left: 10px;
                }
              
                #next {
                  right: 10px;
                }
              }
              
              .arrow {
                position: fixed;
                top: 50%;
                margin-top: -32px;
                font-size: 64px;
                color: #E2E2E2;
                font-family: arial, sans-serif;
                font-weight: bold;
                cursor: pointer;
                -webkit-user-select: none;
                -moz-user-select: none;
                user-select: none;
                text-decoration: none;
              }
              
              .navlink {
                margin: 14px;
                display: block;
                text-align: center;
                text-decoration: none;
                color: #ccc;
              }
              
              .arrow:hover, .navlink:hover {
                color: #777;
              }
              
              .arrow:active, .navlink:hover {
                color: #000;
              }
              
              #book-wrapper {
                width: 480px;
                height: 640px;
                overflow: hidden;
                border: 1px solid #ccc;
                margin: 28px auto;
                background: #fff;
                border-radius: 0 5px 5px 0;
                position: absolute;
              }
              
              #book-viewer {
                width: 480px;
                height: 660px;
                margin: -30px auto;
                -moz-box-shadow:      inset 10px 0 20px rgba(0,0,0,.1);
                -webkit-box-shadow:   inset 10px 0 20px rgba(0,0,0,.1);
                box-shadow:           inset 10px 0 20px rgba(0,0,0,.1);
              }
              
              #book-viewer iframe {
                padding: 40px 40px;
              }
              
              #controls {
                position: absolute;
                bottom: 16px;
                left: 50%;
                width: 400px;
                margin-left: -200px;
                text-align: center;
                display: none;
              }
              
              #controls > input[type=range] {
                  width: 400px;
              }
              
              #navigation {
                width: 400px;
                height: 100vh;
                position: absolute;
                overflow: auto;
                top: 0;
                left: 0;
                background: #777;
                -webkit-transition: -webkit-transform .25s ease-out;
                -moz-transition: -moz-transform .25s ease-out;
                -ms-transition: -moz-transform .25s ease-out;
                transition: transform .25s ease-out;
              
              }
              
              #navigation.fixed {
                position: fixed;
              }
              
              #navigation h1 {
                width: 200px;
                font-size: 16px;
                font-weight: normal;
                color: #fff;
                margin-bottom: 10px;
              }
              
              #navigation h2 {
                font-size: 14px;
                font-weight: normal;
                color: #B0B0B0;
                margin-bottom: 20px;
              }
              
              #navigation ul {
                padding-left: 36px;
                margin-left: 0;
                margin-top: 12px;
                margin-bottom: 12px;
                width: 340px;
              }
              
              #navigation ul li {
                list-style: decimal;
                margin-bottom: 10px;
                color: #cccddd;
                font-size: 12px;
                padding-left: 0;
                margin-left: 0;
              }
              
              #navigation ul li a {
                color: #ccc;
                text-decoration: none;
              }
              
              #navigation ul li a:hover {
                color: #fff;
                text-decoration: underline;
              }
              
              #navigation ul li a.active {
                color: #fff;
              }
              
              #navigation #cover {
                display: block;
                margin: 24px auto;
              }
              
              #navigation #closer {
                position: absolute;
                top: 0;
                right: 0;
                padding: 12px;
                color: #cccddd;
                width: 24px;
              }
              
              #navigation.closed {
                -webkit-transform: translate(-400px, 0);
                -moz-transform: translate(-400px, 0);
                -ms-transform: translate(-400px, 0);
                transform: translate(-400px, 0);
              }
              
              svg {
                display: block;
              }
              
              .close-x {
                stroke: #cccddd;
                fill: transparent;
                stroke-linecap: round;
                stroke-width: 5;
              }
              
              .close-x:hover {
                stroke: #fff;
              }
              
              #opener {
                position: absolute;
                top: 0;
                left: 0;
                padding: 10px;
                stroke: #E2E2E2;
                fill: #E2E2E2;
              
              }
              
              #opener:hover {
                stroke: #777;
                fill: #777;
              }

              .loader {
                border: 16px solid #f3f3f3; /* Light grey */
                border-top: 16px solid #3498db; /* Blue */
                border-radius: 50%;
                width: 120px;
                height: 120px;
                animation: spin 2s linear infinite;
                position: absolute;
                top:0;
                bottom: 0;
                left: 0;
                right: 0;
                
                margin: auto
              }

              @media all and (max-width: 600px){
                select {
                   width: 100%; max-width: 100%;
                }
              }
              
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              
            `}</style>
      
    </>
  );
};

export default test;
