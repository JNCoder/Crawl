#!/usr/bin/python
#coding=utf-8

from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
import time
import os
from biplist import *

class BumpDog:
	_driver = None
	_cookies = None
	_plist = None

	def setupChrome(self):
		chrome_driver = os.path.abspath(r"/Users/cdsb/Codes/pythonDriver/chromeDriver/chromedriver")
		os.environ["webdriver.chrome.driver"] = chrome_driver
		self._driver = webdriver.Chrome(chrome_driver)
		
	def getElement(self, xpath):
		while(True):
			element = self._driver.find_element_by_xpath(xpath)
			if(element != None):
				return element
			time.sleep(3)

	def postLogin(self):
		url = self._plist['Login']['Url']
		userName = 'nwyfss@gmail.com'
		password = 'NWYFSSnwyfss123'
		
		self._driver.get(url)
		
		actions = self._plist['Login']['Actions']
		for action in actions:
			if(action['Type'] == 0):
				self.getElement(action['Element']).click()
			elif (action['Type'] == 1):
				self.getElement(action['Element']).send_keys(action['Value'])
				
		self._cookies = "; ".join([item["name"] + "=" + item["value"] for item in self._driver.get_cookies()])
		print(self._cookies)
		
	def postDetails(self):
		details = self._plist['Details']
		for detail in details:
			self._driver.get(detail['Url'])
			actions = detail['Actions']
			for action in actions:
				if(action['Type'] == 0):
					self.getElement(action['Element']).click()
				elif (action['Type'] == 1):
					self.getElement(action['Element']).send_keys(action['Value'])
			time.sleep(3)
			self.postSubmit()
		
	def postSubmit(self):
		sreach_window=self._driver.current_window_handle
		if(self._plist['Submit']['Type'] == 0):
			self.getElement(self._plist['Submit']['Element']).click()
		elif (self._plist['Submit']['Type'] == 1):
			self.getElement(self._plist['Submit']['Element']).send_keys(action['Value'])
			
	def loadPlist(self):
		self._plist = readPlist("BumpDog.plist")
		
	def main(self):
		self.loadPlist()
		self.setupChrome()
		self.postLogin()
		time.sleep(3)
		self.postDetails()
		
		time.sleep(200)
				
BumpDog().main()



#	购物车
#	def postOrder(self):
#		self._driver.get(self._plist['Order']['Url'])
#		actions = self._plist['Order']['Actions']
#		for action in actions:
#			if(action['Type'] == 0):
#				self.getElement(action['Element']).click()
#			elif (action['Type'] == 1):
#				self.getElement(action['Element']).send_keys(action['Value'])
#		time.sleep(3)
#		self.postSubmit()



