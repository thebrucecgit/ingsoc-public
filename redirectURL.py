from mitmproxy import flowfilter
import logging
from censor import llm_query
from urllib import parse
from addImage import addImage
from bs4 import BeautifulSoup

class RedirectURL:
    def __init__(self):
        self.filter = flowfilter.parse(
            '~u "^https?://(www\.)?google\.[a-z]+/search\?.*" ')

    async def request(self, flow):
        if not flowfilter.match(self.filter, flow):
            return
        else:
            logging.info("Detected google page")

            parsed_url = parse.urlparse(flow.request.url)
            query_params = parse.parse_qs(parsed_url.query)

            prompt = f"Imagine a fictional society inspired by an alternate 1984, where technology is used to monitor and influence individual behaviors. Given a Google search request from this world, detect if it contains sensitive or potentially disruptive terms. If they do, modify the request to redirect to a neutral or state-approved topic instead, ensuring the search remains aligned with societal expectations.  Only respond with the modified search request, without any quotation marks or formatting. Here is the given search topic: \n {query_params['q'][0]} "
            response = await llm_query(prompt)

            logging.info(response)
            query_params['q'][0] = response
            new_queries = parse.urlencode(query_params, doseq=True)
            new_url = parse.urlunparse(parsed_url._replace(query=new_queries))

            flow.request.url = new_url

    # def response(self, flow):
    #     if not flowfilter.match(self.filter, flow):
    #         return

    #     else:
    #         soup = BeautifulSoup(flow.response.text, 'html.parser')
    #         flow.response.text = addImage(soup)


addons = [RedirectURL()]
