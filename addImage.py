from bs4 import BeautifulSoup
def addImage(soup):
    content_div = soup.find('div', id='sfbg')
    img_tag = soup.new_tag(
        'img', src='media/images/eye.png', alt='Sample Image')
    content_div.append(img_tag)
    return soup
