import React from 'react';

import { Timeline } from 'react-twitter-widgets';

/* onLoad={() => console.log('Timeline is loaded!')} */
const AgrTweets = function(){
  return (
    <Timeline
      dataSource={{
        sourceType: 'profile',
        screenName: 'alliancegenome'
      }}
      options={{
        chrome: 'noheader, noborders,nofooter,transparent',
        height: '450',
        linkColor: '#eeeeee',
        theme: 'dark',
        username: 'alliancegenome'
      }}
    />
  );
};
export default AgrTweets;
