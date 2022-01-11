const TIMEOUT = 30000;

 export default async function fetchData(url, options = {}, fetchTimeout=TIMEOUT) {
    if (!url) {
       return Promise.resolve();
    }

    // wordpressNewsBaseURL: 'https://public-api.wordpress.com/wp/v2/sites/blog.wormbase.org/posts'
    if(url.includes('wormbase')){
      const response = [
         {type: 'post',
          title: {rendered: "Update on worm title 1"},
          status: "publish",
          link: "https:/blah1",
          excerpt: {rendered: "Excerpt 1"}
         },
         {type: 'post',
          title: {rendered: "Update on worm title 2"},
          status: "publish",
          link: "https:/blah2",
          excerpt: {rendered: "Excerpt 2"}
         },
     ]
     return response;
    } // wormbase end if

    // flybaseNewsAPI: 'https://flybase.org/api/news?limit=3'
    if (url.includes('flybase')) {
      const response = {
        "resultset": {
          "api_version": "1.0",
          "data_version": "FB2021_06",
          "query_url": "http://flybase.org/api/news?limit=3",
          "query_time": "2022-01-11T03:13:09",
          "result": [
              {
                  "news": [
                      {
                          "link": "https:/blah1",
                          "excerpt": "Excerpt 1",
                          "title": "Update on fly title 1"
                      },
                      {
                          "link": "https:/blah2",
                          "excerpt": "Excerpt 2",
                          "title": "Update on fly title 2"
                      }
                  ]
              }
          ],
          "data_provider": "FlyBase"
        }
      } // end response
      return response;
    } // flybase end if
}