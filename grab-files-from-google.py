#!/usr/bin/python
# -*- coding: utf-8 -*-

# Silly little script to help pull down full sets of files from google

# Sloppy use of flags to help deal with odd results from google

import time
import sys
import socket
import random
import atexit
from pprint import pprint
from xgoogle.search import GoogleSearch, SearchError
import fileinput


filetype="xlsx"
directory="/tmp/allofthe"+filetype+"/"
i=0
flag=0
timeout=10
socket.setdefaulttimeout(timeout)

dictionarylist="./american-english"


checkres =""

try:
  for salt in fileinput.input(dictionarylist):
    sys.stderr.write("trial "+salt)
#    salt = str( int(random.random()*26) +ord("A") ) + str( int(random.random()*26) +ord("A") )
    gs = GoogleSearch("filetype:"+filetype+" "+salt.strip())
    gs.results_per_page = 100
    flag = 0
    for i in range(10):
      if (flag == 1):
	break
      r = 10*random.random() + 5
      sys.stderr.write("loop "+str(i)+" sleeping for "+str(r)+"\n")
      time.sleep(i)
      results = gs.get_results()
      flag = 0
      for res in results:
	flag+=1
        if (flag == 1):
          if checkres == res.url.encode("utf8"):
	    break
	  checkres = res.url.encode("utf8")
	print res.url.encode("utf8")
      sys.stderr.write("flag: "+str(flag)+"\n")
      sys.stdout.flush()
      if (flag == 0):
	break

except SearchError, e:
  print "Search failed: %s" % e

@atexit.register
def goodbye():
  sys.stdout.flush()
  sys.stderr.write("Bailing out!!!")
  pprint(gs,sys.stderr)
