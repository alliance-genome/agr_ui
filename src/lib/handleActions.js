export const forObjectRequestAction = (type, path) => {
  const splitPath = path ? path.split('.') : [];
  return {
    [type + '_REQUEST']: (state) => {
      return state
        .setIn(splitPath.concat('loading'), true);
    },
    [type + '_SUCCESS']: (state, action) => {
      return state
        .setIn(splitPath.concat('loading'), false)
        .setIn(splitPath.concat('data'), action.payload)
        .setIn(splitPath.concat('error'), null);
    },
    [type + '_FAILURE']: (state, action) => {
      return state
        .setIn(splitPath.concat('loading'), false)
        .setIn(splitPath.concat('data'), null)
        .setIn(splitPath.concat('error'), action.payload);
    }
  };
};

export const forCollectionRequestAction = (type, path) => {
  const splitPath = path ? path.split('.') : [];
  return {
    [type + '_REQUEST']: state => {
      return state.setIn(splitPath.concat('loading'), true);
    },
    [type + '_SUCCESS']: (state, action) => {
      return state
        .setIn(splitPath.concat('loading'), false)
        .setIn(splitPath.concat('data'), action.payload.results)
        .setIn(
          splitPath.concat('supplementalData'),
          action.payload.supplementalData
        )
        .setIn(splitPath.concat('total'), action.payload.total)
        .setIn(splitPath.concat('error'), null);
    },
    [type + '_FAILURE']: (state, action) => {
      return state
        .setIn(splitPath.concat('loading'), false)
        .setIn(splitPath.concat('data'), [])
        .setIn(splitPath.concat('supplementalData'), {})
        .setIn(splitPath.concat('total'), 0)
        .setIn(splitPath.concat('error'), action.payload);
    }
  };
};

export const handleActions = (defaultState, ...handlers) => {
  const handlerMap = handlers.reduce((a, b) => Object.assign(a, b), {});
  return (state = defaultState, action) => {
    const handler = handlerMap[action.type];
    if (typeof handler !== 'function') {
      return state;
    }
    return handler(state, action);
  };
};
