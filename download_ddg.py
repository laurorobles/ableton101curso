import urllib.request
import json
import re

queries = {
    'minimoog.jpg': 'Minimoog model D synthesizer',
    'juno106.jpg': 'Roland Juno 106 synthesizer',
    'ms20.jpg': 'Korg MS-20 synthesizer',
    'tr808.jpg': 'Roland TR-808 drum machine',
    'tr909.jpg': 'Roland TR-909 drum machine',
    'linndrum.jpg': 'LinnDrum drum machine'
}

opener = urllib.request.build_opener()
opener.addheaders = [('User-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)')]
urllib.request.install_opener(opener)

for filename, query in queries.items():
    try:
        url = "https://html.duckduckgo.com/html/?q=" + urllib.parse.quote(query)
        html = urllib.request.urlopen(url).read().decode('utf-8')
        img_url = None
        # duckduckgo doesn't easily expose image urls in the html version.
        # Let's use wikipedia directly but through duckduckgo? No, let's try unsplash or similar?
        pass
    except:
        pass
