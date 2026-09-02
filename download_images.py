import urllib.request
import json

images = {
    'minimoog.jpg': 'File:Minimoog model D (early 1970s), MIM PHX.jpg',
    'juno106.jpg': 'File:Roland Juno-106 synthesizer.jpg',
    'ms20.jpg': 'File:Korg MS-20.jpg',
    'tr808.jpg': 'File:Roland TR-808.png',
    'tr909.jpg': 'File:Roland TR-909 drum machine.jpg',
    'linndrum.jpg': 'File:LinnDrum.jpg'
}

base_url = "https://en.wikipedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url&format=json&titles="

opener = urllib.request.build_opener()
opener.addheaders = [('User-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)')]
urllib.request.install_opener(opener)

for filename, title in images.items():
    req_url = base_url + urllib.parse.quote(title)
    try:
        response = urllib.request.urlopen(req_url)
        data = json.loads(response.read())
        pages = data['query']['pages']
        page_id = list(pages.keys())[0]
        image_url = pages[page_id]['imageinfo'][0]['url']
        
        print(f"Downloading {image_url} to {filename}")
        urllib.request.urlretrieve(image_url, filename)
    except Exception as e:
        print(f"Failed for {filename}: {e}")

