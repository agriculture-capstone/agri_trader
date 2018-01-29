import * as React from 'react';
import { H1, Content, Grid, Row, Col, Button, Text, List, ListItem } from 'native-base';

import Composer from '../../../../hoc/PageComposer';
import { StoreRow, State } from '../../../../../store/types';
import { Farmer } from '../../../../../store/modules/farmer/types';
import { Route } from '../../../../navigation/navigator';
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import navActions from '../../../../../store/modules/nav/actions';

import styles from '../../styles';



interface OwnPropsType {
}

interface DispatchPropsType {
  navigate(route: Route): void;
}

interface StorePropsType {
  farmer: StoreRow<Farmer>;
}

type PropsType = OwnPropsType & DispatchPropsType & StorePropsType;

interface OwnStateType {
}

/**
 * Button color
 */
type ButtonColor = 'PRIMARY' | 'INFO';

/**
 * Container for application
 */
class Info extends React.Component<PropsType, OwnStateType> {

  constructor(props: PropsType) {
    super(props);
  }

  /** Create edit button */
  private renderEditButton = () => {
    return (this.renderButton('Edit', 'PRIMARY'));
  }

  /** Handle pressing edit button */
  private onEditPress = () => this.props.navigate(Route.EDIT_FARMER);

  /**
   * Returns a button with text specified
   */
  private renderButton(text: string, color: ButtonColor) {
    const isInfo = color === 'INFO';
    const isPrimary = color === 'PRIMARY';

    return (
      <Col style={styles.button}>
        <Button block info={isInfo} primary={isPrimary} onPress={this.onEditPress}>
          <Text>{text}</Text>
        </Button>
      </Col>
    );
  }

  private formatRow(label: string, value: string) {
    return (
      <Grid>
        <Row>
          <Col>
            <Text>{label}</Text>
          </Col>
          <Col>
            <Text>{value}</Text>
          </Col>
        </Row>
      </Grid>
    );
  }

  private renderDetailFields() {
    return (
      <List>
        <ListItem>
          {this.formatRow('Phone Number', this.props.farmer.phoneNumber)}
        </ListItem>
        <ListItem>
          {this.formatRow('Notes', this.props.farmer.notes)}
        </ListItem>
      </List>
    );
  }

  /**
   * Render method for Farmer Information
   */
  public render() {
    return(
      <Content padder style={styles.content}>
      <Grid>
        <Row style={styles.farmerName}>
          <H1>{this.props.farmer.firstName} {this.props.farmer.lastName}</H1>
        </Row>
        {this.renderDetailFields()}
        <Row style={styles.buttonRow}>
          {this.renderEditButton()}
        </Row>
      </Grid>
    </Content>
    );
  }
}

const FarmerInfoPage = new Composer<PropsType>(Info)
.page;

/************************* Redux ************************/

const mapStateToProps: MapStateToProps<StorePropsType, OwnPropsType, State> = (state) => {
  // @TODO replace 'fakeFarmerUUID' with the active farmer uuid
  const farmerRow = state.farmer.rows.find(r => r.uuid === 'fakeFarmerUUID');
  if (farmerRow === undefined) {
    throw new Error('Error: could not locate farmer: ' + 'fakeFarmerUUID');
  }
  return {
    farmer: farmerRow,
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchPropsType, OwnPropsType> = (dispatch) => {
  return {
    navigate: (route: Route) => dispatch(navActions.navigateTo(route)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FarmerInfoPage);
