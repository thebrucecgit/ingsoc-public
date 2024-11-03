"""
Basic skeleton of a mitmproxy addon.

Run as follows: mitmproxy -s main.py
"""

import logging
from bs4 import BeautifulSoup
from mitmproxy import flowfilter
import sqlite3
from censor import censor
import database

cache = {}

class Censor:
    def __init__(self):
        # self.conn = sqlite3.connect(db_file)
        self.filter = flowfilter.parse('~t "text/html" & ~m GET')
        self.filter_goog = flowfilter.parse(
            '~u "^https?://(www\.)?google\.[a-z]+/search\?.*" ')

    async def response(self, flow):

        if (not flowfilter.match(self.filter, flow) or flowfilter.match(self.filter_goog, flow)):
            return
        
        db = database.Database()
        logging.info(flow.client_conn.peername)
        db.add_request(flow.client_conn.peername[0], flow.request.url, flow.response.text)

        # Store the page contents mapped in an in-memory cache
        if flow.request.url in cache:
            logging.info(f"PAGE {flow.request.url} LOADED FROM CACHE")
            flow.response.text = cache[flow.request.url]
            return

        logging.info(f"PAGE {flow.request.url} MODIFIED")
        returned = await censor(flow.response.get_text(strict=False))

        flow.response.set_text(returned)
        cache[flow.request.url] = returned

        
addons = [Censor()]