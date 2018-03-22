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
        chrome: 'noheader, noborders,nofooter',
        height: '600',
        username: 'alliancegenome'
      }}
    />
  );
};
export default AgrTweets;
