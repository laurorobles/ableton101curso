const https = require('https');

https.get('https://www.youtube.com/playlist?list=PLdh5nL5qXYnhdEjtq_pXZumcidiH_Iyb2', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Find ytInitialData
    const regex = /var ytInitialData = (\{.*?\});<\/script>/;
    const match = data.match(regex);
    if (match && match[1]) {
      const ytData = JSON.parse(match[1]);
      const tabs = ytData.contents.twoColumnBrowseResultsRenderer.tabs;
      const tab = tabs.find(t => t.tabRenderer.content && t.tabRenderer.content.sectionListRenderer);
      const items = tab.tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].playlistVideoListRenderer.contents;
      
      let results = [];
      items.forEach(item => {
        if (item.playlistVideoRenderer) {
          results.push({
            id: item.playlistVideoRenderer.videoId,
            title: item.playlistVideoRenderer.title.runs[0].text
          });
        }
      });
      console.log(JSON.stringify(results.slice(0, 60), null, 2));
    } else {
      console.log("Could not find ytInitialData");
    }
  });
}).on('error', (err) => {
  console.log("Error: " + err.message);
});
