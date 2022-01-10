const TIMEOUT = 30000;

export default async function fetchData(url, options = {}, fetchTimeout=TIMEOUT) {
    if (!url) {
      return Promise.resolve();
    }
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
}
