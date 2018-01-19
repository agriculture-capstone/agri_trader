import * as React from 'react';
import { Drawer as BaseDrawer } from 'native-base';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';

import { State } from '../../../store/types';
import drawerActions from '../../../store/modules/drawer/actions';
import navActions from '../../../store/modules/nav/actions';
import headerActions from '../../../store/modules/header/actions';
import DrawerContents from './DrawerContents';
import { Route } from '../../navigation/navigator';

/** Drawer OwnProps */
export interface OwnProps {}

/** Drawer State */
export interface OwnState {}

interface StoreProps {
  open: boolean;
  locked: boolean;
}

interface DispatchProps {
  closeDrawer(): void;
  openDrawer(): void;
  navigate(route: Route): void;
  showHeader(): void;
}

/** Drawer props */
type Props = OwnProps & StoreProps & DispatchProps;

/** Drawer component for navigation */
class Drawer extends React.Component<Props, OwnState> {

  /************************* Member Variables ************************/

  private PAN_OPEN_MASK = .10;

  /************************* Member Functions ************************/

  public constructor(props: Props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  private onPress(route: Route) {
    this.props.navigate(route);
    this.props.showHeader();
    this.props.closeDrawer();
  }

  /****************************** React ******************************/

  /** React render method */
  public render(): JSX.Element {
    return (
      <BaseDrawer
        open={this.props.open}
        onClose={this.props.closeDrawer}
        onOpen={this.props.openDrawer}
        content={<DrawerContents onPress={this.onPress} />}
        type="overlay"
        panOpenMask={this.PAN_OPEN_MASK}
        disabled={this.props.locked}
        acceptPan
      >
      {this.props.children}
      </BaseDrawer>
    );
  }
}

/****************************** Redux ******************************/

const mapStateToProps: MapStateToProps<StoreProps, OwnProps, State> = (state, ownProps) => {
  return {
    open: state.drawer.drawerShown,
    locked: state.drawer.drawerLocked,
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (dispatch) => {
  return {
    closeDrawer: () => dispatch(drawerActions.setDrawerShown(false)),
    openDrawer: () => dispatch(drawerActions.setDrawerShown(true)),
    navigate: (route: Route) => dispatch(navActions.navigateTo(route)),
    showHeader: () => dispatch(headerActions.setHeaderShown(true)),
  };
};

const DrawerContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Drawer);


export default DrawerContainer;
