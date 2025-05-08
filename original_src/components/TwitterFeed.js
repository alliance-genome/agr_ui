import React from 'react';

import { Timeline } from 'react-twitter-widgets';

const TwitterFeed = () => {
  return (
    <Timeline
      dataSource={{
        sourceType: 'profile',
        screenName: 'alliancegenome'
      }}
      options={{
        chrome: 'nofooter',
        height: '600',
        username: 'alliancegenome'
      }}
    />
  );
};

export default TwitterFeed;
