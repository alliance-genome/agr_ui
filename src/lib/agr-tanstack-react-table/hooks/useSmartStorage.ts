import { useCallback, useEffect, useReducer, useState } from 'react';
import getByPath from '../helpers/getByPath';

/*
 * TODO: This hook currently uses state changes to trigger changes to local storage
 *  I.E. if updateStorage is called, it updates the hooks state, useEffect sees the change, and changes localStorage
 *  Ideally, this should be reversed:
 *     updateStorage is called, it updates localStorage, listeners see that localStorage has changed, the state is updated
 *  This would help prevent loops when different instances of the hook update localStorage because the hook would no
 *  longer care how localStorage was updated. It just needs to make sure its state matches the current value of
 *  localStorage.
 *  Also, primitive values give some trouble, and should be looked into.
 *  Furthermore, reading deep paths within arrays is not supported. It would be nice to have an option that returns
 *  all at the specified path.
 *  Another item: support cross-tab updates
 * */

// get initial state. If any of the rootPath doesn't exist, create it
const initializeReducer = (rootPath: string) => {
  const localStorageKey = rootPath.substring(0, rootPath.indexOf('.')) || rootPath;

  let fullValue: any = window.localStorage.getItem(localStorageKey);
  fullValue = fullValue === null ? {} : JSON.parse(fullValue);

  const childValue = getByPath(fullValue, rootPath.substring(localStorageKey.length), true);

  if (JSON.stringify(fullValue) !== window.localStorage.getItem(localStorageKey)) {
    window.localStorage.setItem(localStorageKey, JSON.stringify(fullValue || {}));
  }

  return childValue;
};

//update the state based on a new value
const reducer = (state: any, action: { rootPath: string; newValue: any; replaceAll?: boolean }) => {
  if (JSON.stringify(state) === JSON.stringify(action.newValue)) return state;

  const localStorageKey = action.rootPath.substring(0, action.rootPath.indexOf('.')) || action.rootPath;

  let fullValue: any = window.localStorage.getItem(localStorageKey);
  fullValue = fullValue === null ? {} : JSON.parse(fullValue);

  const parentPath =
    action.rootPath.substring(localStorageKey.length + 1, action.rootPath.lastIndexOf('.')) || action.rootPath;
  const keyToUpdate = action.rootPath.substring(action.rootPath.lastIndexOf('.') + 1);
  let childPathObject: any = getByPath(fullValue, parentPath);

  if (action.replaceAll) {
    // replaces all the localStorage value, not just at a subpath
    return parentPath === keyToUpdate ? action.newValue : childPathObject[keyToUpdate];
  } else {
    if (parentPath === keyToUpdate) {
      fullValue = action.newValue;
    } else {
      if (action.newValue === undefined) {
        delete childPathObject[keyToUpdate];
      } else {
        childPathObject[keyToUpdate] = action.newValue;
      }
    }
  }

  return action.newValue;
};
/**
 * A hook for handling localStorage like a variable.
 *
 * @remarks
 * useSmartStorage allows for several useful features when working with localStorage, especially when storing objects
 * or arrays. LocalStorage only stores strings under a specific key. This hook automatically converts objects to strings
 * and vise versa.
 * This hook also allows you to look only at child of something stored in localStorage. For example, if
 * at key "foo" this object is stored { bar: 1, example: [1,2,3], lastOne: { child: 1 }}, you can look only at the object
 * under "lastOne" simply: `const [lastOneObject] = useSmartStorage("foo.lastOne")`.
 * This hook will automatically create values if a path given is undefined.
 * This hook will also keep in sync with any other hook on the page using the same key.
 * NOTE: this hook does NOT currently update if localStorage is changed in a different tab.
 *
 * @param rootPath - A js path to the child item within localStorage, where the first key is the same key used by localStage to store values.
 * @returns An array containing: the value in localStorage at the specified path, a function to update localStorage at a
 * specified path, and a function to delete from localStorage at a specified path. NOTE: the path passed to the update
 * and delete functions is based on the initial root path automatically.
 *
 * @beta
 */
const useSmartStorage = <TData = any>(
  rootPath: string
): [TData, (path: string, newValue: any) => void, (path: string) => void] => {
  //TODO: support cross tab updates as an option
  const [value, setValue] = useReducer(reducer, rootPath, initializeReducer);
  const [isSelfUpdating, setIsSelfUpdating] = useState(false);

  const localStorageKey = rootPath.substring(0, rootPath.indexOf('.')) || rootPath;

  //Updates localStorage when the state changes. useEffect required in order to ensure state is fully updated before
  //calling dispatchEvent
  //listener below, and thus this useEffect?
  useEffect(() => {
    if (isSelfUpdating) {
      return;
    }
    let fullValue: any = window.localStorage.getItem(localStorageKey);
    fullValue = fullValue === null ? {} : JSON.parse(fullValue);
    const parentPath = rootPath.substring(localStorageKey.length + 1, rootPath.lastIndexOf('.')) || rootPath;
    const keyToUpdate = rootPath.substring(rootPath.lastIndexOf('.') + 1);

    if (parentPath !== keyToUpdate) {
      const childPathObject: any = getByPath(fullValue, parentPath);
      childPathObject[keyToUpdate] = value;
    } else {
      fullValue = value;
    }

    const realValue = getByPath(
      JSON.parse(window.localStorage.getItem(localStorageKey)!),
      rootPath.substring(localStorageKey.length) || rootPath
    );

    if (JSON.stringify(realValue) === JSON.stringify(value)) {
      return;
    }

    window.localStorage.setItem(localStorageKey, JSON.stringify(fullValue));
    window.dispatchEvent(new CustomEvent('localStorage'));
  }, [isSelfUpdating, localStorageKey, rootPath, value]);

  //Used to update state when another instance of the hook saves info to localStorage (only for hooks on the same tab)
  const updateValue = useCallback(
    (_event: Event) => {
      setIsSelfUpdating(true);
      let realValue;
      if (rootPath === localStorageKey) {
        realValue = JSON.parse(window.localStorage.getItem(localStorageKey)!);
      } else {
        realValue = getByPath(
          JSON.parse(window.localStorage.getItem(localStorageKey)!),
          rootPath.substring(localStorageKey.length) || rootPath
        );
      }

      //Only refresh state if the new value is different. (prevents infinite loops)
      if (JSON.stringify(realValue) !== JSON.stringify(value)) {
        setValue({
          rootPath,
          newValue: JSON.parse(window.localStorage.getItem(localStorageKey)!),
          replaceAll: true,
        });
      }

      setIsSelfUpdating(false);
    },
    [value, rootPath, localStorageKey]
  );

  //If another hook in the same tab updates localStorage, update the state to match
  useEffect(() => {
    // "localStorage" is a custom event. The "storage" event does exist, but only fires when localStorage
    // updates in another tab
    window.addEventListener('localStorage', updateValue);
    return () => window.removeEventListener('localStorage', updateValue);
  }, [setValue, rootPath, localStorageKey, updateValue]);

  // TODO: having to pass "" for the default path is annoying, but so is having path as the second argument
  const updateStorage = (path: string, newValue: any) => {
    let newObject = JSON.parse(JSON.stringify(value));

    //Access the value 1 key away from what we want to update. This prevents trying to directly update the value
    //which does not work when the value is a primitive, since all primitives are pass by value (instead of references).
    const parentPath = path.substring(0, path.lastIndexOf('.')) || path;
    const keyToUpdate = path.substring(path.lastIndexOf('.') + 1);

    //Handles when path is a single key, or an empty string
    let pathObject = parentPath === keyToUpdate ? newObject : getByPath(newObject, parentPath, true);

    const match = /(.*)\[(\d*)]$/.exec(keyToUpdate);
    if (match) {
      // if it's an array
      const [, arrayKey, arrayIndex] = match;
      if (arrayKey !== '' && pathObject[arrayKey] === undefined) {
        pathObject[arrayKey] = [];
      }
      if (arrayIndex) {
        pathObject[arrayKey][arrayIndex] = newValue;
      } else {
        pathObject[arrayKey].push(newValue);
      }
    } else {
      // if it's an object
      if (keyToUpdate === '') {
        newObject = newValue;
      } else {
        pathObject[keyToUpdate] = newValue;
      }
    }

    setValue({ rootPath, newValue: newObject });
  };

  const deleteStorage = (path = '') => {
    let newObject = JSON.parse(JSON.stringify(value));

    //See comments above in updateStorage
    const parentPath = path.substring(0, path.lastIndexOf('.')) || path;
    const keyToUpdate = path.substring(path.lastIndexOf('.') + 1);

    let pathObject = parentPath === keyToUpdate ? newObject : getByPath(newObject, parentPath);

    const match = /(.*)\[(\d*)]$/.exec(keyToUpdate);
    if (match) {
      const [, arrayKey, arrayIndex] = match;
      pathObject = pathObject[arrayKey];
      if (arrayIndex) {
        pathObject.splice(arrayIndex, 1);
      } else {
        throw new Error('An array index must be provided to delete.');
      }
    } else {
      if (keyToUpdate === '') {
        newObject = undefined;
      } else {
        delete pathObject[keyToUpdate];
      }
    }

    setValue({ rootPath, newValue: newObject });
  };

  return [value, updateStorage, deleteStorage];
};

export default useSmartStorage;
