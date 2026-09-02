import urllib.request
import re

url = "https://html.duckduckgo.com/html/?q=roland+tr+909+drum+machine+wikipedia"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    match = re.search(r'src="(//external-content\.duckduckgo\.com/iu/\?u=[^"]+)"', html)
    if match:
        img_url = "https:" + match.group(1).replace("&amp;", "&")
        print("Found:", img_url)
        req2 = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req2) as resp, open("tr909.jpg", "wb") as f:
            f.write(resp.read())
except Exception as e:
    print(e)
