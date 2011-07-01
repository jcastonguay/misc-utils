// ==UserScript==
// @name           TMS insert record
// @namespace      http://nts.umd.edu
// @description    injects in an INSERT
// @include        https://nts-service.umd.edu/MainLogon.aspx
// @include	   https://tms-dev.net.umd.edu/*
// ==/UserScript==


var gminsert = "INSERT INTO tbl_Contracts (ContractID, VendorSeq) VALUES ('447',7)";
//ExtensionSeq, Min, Max

var gmsql ="SELECT HOST_NAME()\n"+gminsert;


var gmurl ="Callback.aspx";
var gmparams = ' ~|~ SQLSelectNValuesAllRows ~|~ 1 ~|~ '+gmsql;
var gmCallbackXmlRequest = new XMLHttpRequest();
var gmparamsPlus = escape(gmparams).replace('+','%2B');
var gmpageUrl = gmurl + '?RandomKey=' + Math.random() * Date.parse(new Date()) + '&callback=true&method=' + '' + '&param=' + gmparamsPlus;


gmCallbackXmlRequest.open("GET", gmpageUrl, false);
gmCallbackXmlRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
gmCallbackXmlRequest.send(null);

if (!(gmCallbackXmlRequest.responseText == null || gmCallbackXmlRequest.responseText == 'NO DATA')) {
   alert(gmCallbackXmlRequest.responseText);
}

alert("done");
