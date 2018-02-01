import { Reducer } from 'redux';
import * as R from 'ramda';

import { NavState, Action } from './types';
import initialState from './state';
import Navigator, { Route } from '../../../view/navigation/navigator';
import { NavigationActions, NavigationState } from 'react-navigation';

const navReducer: Reducer<NavState> = (state = initialState, action: Action) => {
  switch (action.type) {

    case 'LOGOUT': {
      let routes = state.routes.filter(r => r.routeName === Route.LOGIN);
      let index = 0;

      return { ...state, routes, index };
    }

    case 'LOGIN': {
      let navigateAction = NavigationActions.navigate({ routeName: Route.HOME });
      let nextState = Navigator.router.getStateForAction(navigateAction, state) as NavigationState;
      let routes = R.remove(0, 1, nextState.routes);
      let index = nextState.index - 1;

      return { ...nextState, routes, index };
    }

    case 'NAV/GO_TO_WITHOUT_HISTORY': {
      let numberOfRoutesBack = 2;
      let navigateAction = NavigationActions.navigate({ routeName: action.route });
      let nextState = Navigator.router.getStateForAction(navigateAction, state) as NavigationState;
      let routes = R.remove(nextState.routes.length - numberOfRoutesBack, 1, nextState.routes);
      let index = nextState.index - 1;
      if (routes[index].routeName === routes[index - 1].routeName) {
        routes = R.remove(routes.length - 1, 1, routes);
        index = index - 1;
      }

      return { ...state, routes, index };
    }

    default: {
      const nextState = Navigator.router.getStateForAction(action, state);

      return nextState || state;
    }
  }
};

export default navReducer;
