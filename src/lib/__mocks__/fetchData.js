const TIMEOUT = 30000;

export default async function fetchData(url, options = {}, fetchTimeout=TIMEOUT) {
  if (!url) {
    return Promise.resolve();
  }

  // ZFIN News + Meetings (have the same format)
  // zfinNewsAPI: 'https://zfin.org/action/api/wiki/news?limit=5&page=1'
  // zfinMeetingsAPI: 'https://zfin.org/action/api/wiki/meetings?limit=5&page=1'
  if (url.includes('zfin')){
    const response = {
      "results": [
        {
          "url": "https:/blah1",
          "id": "1234",
          "title": "Update on zebrafish title 1"
        },
        {
          "url": "https:/blah2",
          "id": "5678",
          "title": "Update on zebrafish title 2"
        }
      ],
   }
   return response;
  } // zfin end if

  // FlyBase News + RGD News
  // flybaseNewsAPI: 'https://flybase.org/api/news?limit=3'
  // rgdNewsAPI: 'https://rest.rgd.mcw.edu/rgdws/news/last?limit=3',
  if ((url.includes('flybase')) || (url.includes('https://rest.rgd.mcw.edu/rgdws/news/last?limit=3'))) {
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
  } // flybase news + rgd news end if

  // RGD Meetings
  // rgdMeetingsAPI: 'https://rest.rgd.mcw.edu/rgdws/news/meetings?limit=3',
  if (url.includes('https://rest.rgd.mcw.edu/rgdws/news/meetings?limit=3')) {
    const response = {
      "resultset": {
        "api_version": "1.0",
        "data_version": "FB2021_06",
        "query_url": "https://rest.rgd.mcw.edu/rgdws/news/meetings?limit=3",
        "query_time": "2022-01-11T03:13:09",
        "result": [
          {
            "meetings": [
              {
                "link": "https:/blah1",
                "excerpt": "Excerpt 1",
                "title": "Update on rat title 1"
              },
              {
                "link": "https:/blah2",
                "excerpt": "Excerpt 2",
                "title": "Update on rat title 2"
              }
            ]
          }
        ],
        "data_provider": "RGD"
      }
    } // end response
    return response;
  } // rgd meetings end if

  // WormBase News wordpress Version 2
  // wordpressNewsBaseURL: 'https://public-api.wordpress.com/wp/v2/sites/blog.wormbase.org/posts'
  if (url.includes('wormbase')) {
    const response = [
      { type: 'post',
        title: {rendered: "Update on worm title 1"},
        status: "publish",
        link: "https:/blah1",
        excerpt: {rendered: "Excerpt 1"}
      },
      { type: 'post',
        title: {rendered: "Update on worm title 2"},
        status: "publish",
        link: "https:/blah2",
        excerpt: {rendered: "Excerpt 2"}
      },
    ]
    return response;
  } // wormbase end if

  // SGD News wordpress Version 1.1
  // wordpressNewsBaseURL: 'https://public-api.wordpress.com/rest/v1.1/sites/yeastgenomeblog.wordpress.com/posts/',
  if (url.includes('yeastgenomeblog.wordpress.com')) {
    const response = {
    "found": 4,
    "posts": [
        {
            "title": "Update on sgd title 1",
            "URL": "https:/blah1",
            "excerpt": "<p>excerpt 1</p>\n",
            "status":"publish",
        },
        {
          "title": "Update on sgd title 2",
          "URL": "https:/blah2",
          "excerpt": "<p>excerpt 2</p>\n",
          "status":"publish",            
        },
        // Test NOT seen if status is not publish
        {
          "title": "Update on sgd title 3",
          "URL": "https:/blah3",
          "excerpt": "private excerpt",
          "status":"private",            
        },
        {
          "title": "Update on sgd title 4",
          "URL": "https:/blah4",
          "excerpt": "<p>excerpt 4</p>\n",
          "status":"publish",            
        },        ]
    } // end response
    return response;
  } // sgd end if

  // SGD Meetings googleapis
  // googleapisMeetingsBaseURL: 'https://www.googleapis.com/calendar/v3/calendars/mhv058nk936st3jd3qjernajdk@group.calendar.google.com/events?key=AIzaSyDXypHUsRcWWBx2UClUV_wrag8TIlNYbSc',
  if (url.includes('mhv058nk936st3jd3qjernajdk')) {
    const response = {
      "items": [
        {
          // test dates must start sometime in the future
          "start": {
            "date": "2170-01-01"
          },
          "end": {
            "date": "2170-01-03"
          },
          "summary": "1st test sgd meeting",
          "description": "https:/blah1 Update on sgd meeting 1"
        },
        {
          "start": {
            "date": "2171-01-01"
          },
          "end": {
            "date": "2171-01-03"
          },
          "summary": "2nd test sgd meeting",
          "description": "https:/blah2 Update on sgd meeting 2"
        }
      ],
    }
    return response;
  } // sgd end if
}
