import os
import logging
from openai import AsyncOpenAI
from bs4 import BeautifulSoup
import copy
from dotenv import load_dotenv

load_dotenv()

DEBUG = True
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

async def llm_query(prompt):
    client = AsyncOpenAI(api_key=OPENAI_API_KEY)
    completion = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )
    response = completion.choices[0].message.content
    return response


def strip(soup):
    for script in soup.find_all('script'):
        script.string = ''  # Set the contents of the script tag to an empty string

    for script in soup.find_all('style'):
        script.string = ''  # Set the contents of the script tag to an empty string

    for tag in soup.find_all(True):  # True finds all tags
        tag.attrs.clear()

    return soup


def restore(transformedSoup, originalSoup):
    transformedSoup.attrs = originalSoup.attrs
    if (transformedSoup.name == "script" or transformedSoup.name == "style") and originalSoup.string:
        transformedSoup.string = originalSoup.string

    children1, children2 = transformedSoup.find_all(
        True, recursive=False), originalSoup.find_all(True, recursive=False)

    for child1, child2 in zip(children1, children2):
        restore(child1, child2)


async def censor(input: str) -> str:
    logging.info("Begin censor process.")
    input_soup_full = BeautifulSoup(input, features="html.parser")

    if DEBUG:
        with open("0-input.html", 'w', encoding="utf8") as res:

            res.write(str(input_soup_full))

    print("Length of raw HTML:", len(str(input_soup_full)))
    input_soup = copy.copy(input_soup_full)
    strip(input_soup)
    print("Length of stripped HTML:", len(str(input_soup)))

    if DEBUG:
        with open("1-afterClear.html", 'w', encoding="utf-8") as res:
            res.write(input_soup.body.prettify())

    encoded_input_soup = str(input_soup.body)
    prompt = f"""
    
    In an uncertain year, believed to be 1984, civilisation has been ravaged by world war, civil conflict, and revolution. Airstrip One (formerly known as Great Britain) is a province of Oceania, one of the three totalitarian super-states that rule the world. It is ruled by "The Party" under the ideology of "Ingsoc" (a Newspeak shortening of "English Socialism") and the mysterious leader Big Brother, who has an intense cult of personality. The Party brutally purges out anyone who does not fully conform to their regime, using the Thought Police and constant surveillance through telescreens (two-way televisions), cameras, and hidden microphones. Those who fall out of favour with the Party become "unpersons", disappearing with all evidence of their existence destroyed.

    Preserve the HTML tag structure. DO NOT DELETE ANY TAGS, EVEN IF THEY ARE EMPTY. Please remember that. In your response only include HTML code and nothing else (not even markdown formatting). Change the text of the following page to make it clearly in the beliefs, thought and language of the Ingsoc ideology. Rewrite any beliefs contrary to the party. You can change the contents within HTML tags, but do not make any structural modifications: \n 

    
    {encoded_input_soup}
"""

    response = (await llm_query(prompt)).lstrip("```html").rstrip("```")
    # with open("2-afterLLM.html", 'r') as res:
    #     response = res.read()

    if DEBUG:
        with open("2-afterLLM.html", 'w', encoding="utf-8") as res:
            res.write(BeautifulSoup(response).prettify())

    transformed_soup = BeautifulSoup(response, features="html.parser")

    restore(transformed_soup.body, input_soup_full.body)
    transformed_soup_full = copy.copy(input_soup_full)
    transformed_soup_full.body.replace_with(transformed_soup.body)

    if DEBUG:
        with open("3-afterRestore.html", 'w', encoding="utf-8") as res:
            res.write(transformed_soup_full.prettify())

    logging.info("Finished censor process.")

    return str(transformed_soup_full)
