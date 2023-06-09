import {
  createReactNavigationReduxMiddleware,
  createReduxContainer,
} from 'react-navigation-redux-helpers';
import {connect} from 'react-redux';
import AppNavigation from './routes';

const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);

const AppWithNavigationState = createReduxContainer(AppNavigation, 'root');

const mapStateToProps = state => ({
  state: state.nav,
});

const ReduxNavigation = connect(mapStateToProps)(AppWithNavigationState);

export {AppNavigation, ReduxNavigation, middleware};
