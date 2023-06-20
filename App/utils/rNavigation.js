import {NavigationActions, StackActions} from '@react-navigation/native';
import * as React from 'react';
export const isMountedRef = React.createRef();
export const navigationRef = React.createRef();

export const navigate = (name, params = {}) => {
  if (isMountedRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  }
};

export const goBack = (key = null) => {
  navigator.dispatch(NavigationActions.back({key}));
};

export const pop = (count = null) => {
  navigationRef.current.dispatch(StackActions.pop(count));
};

export const popToTop = (options = {}) => {
  navigationRef.current?.dispatch(StackActions.popToTop(options));
};

const route: any = (nav: any) => {
  if (nav.routes) {
    return route(nav.routes[nav.index]);
  }
  return nav;
};

export const getRoute = () => {
  const {nav} = navigator.state;
  return route(nav.routes[nav.index]);
};

export const getRoot = () => {
  const {nav} = navigator.state;
  return nav.routes[nav.index];
};

export const reset = (routeName) => {
  navigationRef.current.dispatch(
    StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({
          routeName: routeName,
        }),
      ],
    }),
  );
};

export default {
  navigate,
};
