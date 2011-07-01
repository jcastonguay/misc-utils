#!/usr/bin/python
# -*- coding: utf-8 -*-

# Silly little script to help pull down full sets of files from google

# Sloppy use of isfirsts to help deal with odd results from google

import time
import sys
import socket
import random
import atexit
from pprint import pprint
from xgoogle.search import GoogleSearch, SearchError
import fileinput


filetype="xlsx"
page=0
isfirst=0 #Flag to see if query gets cut off
timeout=10
socket.setdefaulttimeout(timeout)

dictionarylist="./american-english"

resultsperpage = 100
numberofpages = 10

playnicebase = 5
playnicerandom = 10

firstresult =""

try:
  for salt in fileinput.input(dictionarylist):
    sys.stderr.write("trial "+salt)
    gs = GoogleSearch("filetype:"+filetype+" "+salt.strip())
    gs.results_per_page = resultsperpage
    isfirst = 0
    for page in range(numberofpages): 
      if (isfirst == 1): # Go to next salt if first result is the same on two pages (means we ran out of results)
	break
      playnice = playnicerandom*random.random() + playnicebase
      sys.stderr.write("page "+str(page)+" sleeping for "+str(playnice)+"\n")
      time.sleep(playnice)
      results = gs.get_results()
      isfirst = 0
      for res in results:
	isfirst+=1

        if (isfirst == 1):  # If the first result of the page is the same as the first result of the next
                            # page, assume its just the same results for each page of the query and skip.
          if firstresult == res.url.encode("utf8"):
	    break
	  firstresult = res.url.encode("utf8")

	print res.url.encode("utf8")
      sys.stdout.flush()
      if (isfirst == 0):  #no results on the page, try the next query
	break

except SearchError, e:
  print "Search failed: %s" % e

@atexit.register
def goodbye():
  sys.stdout.flush()
  sys.stderr.write("Bailing out!!!")
  pprint(gs,sys.stderr)
