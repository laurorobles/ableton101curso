import urllib.request
import json
images = {'drummachine.jpg': 'File:Drum machine.jpg'}
base_url = "https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url&format=json&titles="
opener = urllib.request.build_opener()
opener.addheaders = [('User-agent', 'SoundspaceAcademy/1.0')]
urllib.request.install_opener(opener)
for filename, title in images.items():
    req_url = base_url + urllib.parse.quote(title)
    try:
        response = urllib.request.urlopen(req_url)
        data = json.loads(response.read())
        pages = data['query']['pages']
        page_id = list(pages.keys())[0]
        image_url = pages[page_id]['imageinfo'][0]['url']
        req = urllib.request.Request(image_url, headers={'User-Agent': 'SoundspaceAcademy/1.0'})
        with urllib.request.urlopen(req) as resp, open(filename, 'wb') as out:
            out.write(resp.read())
    except:
        pass
