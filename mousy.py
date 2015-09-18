import time
from Quartz.CoreGraphics import CGEventCreateMouseEvent
from Quartz.CoreGraphics import CGEventPost
from Quartz.CoreGraphics import kCGEventMouseMoved
from Quartz.CoreGraphics import kCGEventLeftMouseDown
from Quartz.CoreGraphics import kCGEventLeftMouseDown
from Quartz.CoreGraphics import kCGEventLeftMouseUp
from Quartz.CoreGraphics import kCGMouseButtonLeft
from Quartz.CoreGraphics import kCGHIDEventTap
from Quartz.CoreGraphics import CGEventCreate
from Quartz.CoreGraphics import CGEventGetLocation

def mouseEvent(type, posx, posy):
        theEvent = CGEventCreateMouseEvent(None, type, (posx,posy), kCGMouseButtonLeft)
        CGEventPost(kCGHIDEventTap, theEvent)

def mousemove(posx,posy):
        mouseEvent(kCGEventMouseMoved, posx,posy);

def mouseclick(posx,posy):
        mouseEvent(kCGEventLeftMouseDown, posx,posy);
        mouseEvent(kCGEventLeftMouseUp, posx,posy);

while True:
  time.sleep(5)
  print "move mouse"
  ourEvent = CGEventCreate(None);
  pos=CGEventGetLocation(ourEvent);
  print str(pos.x)+" "+str(pos.y)
  mousemove(pos.x -1, pos.y -1)
  mousemove(pos.x+1,pos.y+1)
  mousemove(pos.x,pos.y)

