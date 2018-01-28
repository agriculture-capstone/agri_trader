import * as React from 'react';
import { Content, List, View, ListItem, Text, Grid, Row, Col, H1, Button, Input, Item } from 'native-base';

import { Farmer } from '../../../store/modules/farmer/types';
import { Dairy as MilkEntry } from '../../../store/modules/dairy/types';
import { Route } from '../../navigation/navigator';

import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import navActions from '../../../store/modules/nav/actions';
import { InjectedFabProps } from '../../hoc/PageComposer/FabPage/index';
import Composer from '../../hoc/PageComposer/index';
import { State } from '../../../store/types';

import Styles from './style';


interface OwnPropsType {
  farmer: Farmer;
  milkEntry: MilkEntry;
}

interface DispatchPropsType {
  navigate(route: Route): void;
}

interface StorePropsType {
}

interface OwnStateType {
}

type NestedPropsType = StorePropsType & DispatchPropsType & OwnPropsType;

/** EntryDetails PropsType */
type PropsType = InjectedFabProps & NestedPropsType;

/**
 * Button color
 */
type ButtonColor = 'PRIMARY' | 'INFO';

/**
 * Page for EntryDetails
 * @requires farmer
 * @requires milkEntry
 * 
 * @example 
 *          <EntryDetails
 *          />
 */
class EntryDetails extends React.Component<PropsType, OwnStateType> {

  constructor(props: PropsType) {
    super(props);
  }

  /** Create edit button */
  private renderEditButton = () => {
    return (this.renderButton('Edit', 'PRIMARY'));
  }

  /** Handle pressing edit button */
  private onEditPress = () => this.props.navigate(Route.EDIT_MILK_ENTRY);

  /**
   * Returns a button with text specified
   */
  private renderButton(text: string, color: ButtonColor) {
    const isInfo = color === 'INFO';
    const isPrimary = color === 'PRIMARY';

    return (
      <Col style={Styles.button}>
        <Button block info={isInfo} primary={isPrimary} onPress={this.onEditPress}>
          <Text>{text}</Text>
        </Button>
      </Col>
    );
  }

  private renderHeader() {
    return (
      <Grid>
        <Row style={Styles.headerRow}>
          <H1>
            {this.props.farmer.firstName} {this.props.farmer.lastName}
          </H1>
        </Row>
        <Row style={Styles.headerRow}>
          <Text style={Styles.header}>
            {/* @TODO Change this to take date only */}
            {this.props.milkEntry.datetime}
          </Text>
        </Row>
        <Row style={Styles.headerRow}>
          <Text style={Styles.header}>
            {/* @TODO Change this to take time only */}
            {this.props.milkEntry.datetime}
          </Text>
        </Row>
      </Grid>
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
          {this.formatRow('Amount (L)', this.props.milkEntry.volume)}
        </ListItem>
        <ListItem>
          {this.formatRow('Quality', this.props.milkEntry.quality)}
        </ListItem>
        <ListItem>
          {this.formatRow('Rate (UGX)', this.props.milkEntry.costPerUnit)}
        </ListItem>
      </List>
    );
  }

  /**
   * Render method for EntryDetails
   */
  public render() {
    return(
      <Content padder style={Styles.content}>
        {this.renderHeader()}
      <Grid>
        {this.renderDetailFields()}
        <Row style={Styles.buttonRow}>
          {this.renderEditButton()}
        </Row>
      </Grid>
    </Content>
    );
  }
}

const EntryDetailsPage = new Composer<NestedPropsType>(EntryDetails).page;

const mapStateToProps: MapStateToProps<StorePropsType, OwnPropsType, State> = () => {
  return {};
};

const mapDispatchToProps: MapDispatchToProps<DispatchPropsType, OwnPropsType> = (dispatch) => {
  return {
    navigate: (route: Route) => dispatch(navActions.navigateTo(route)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EntryDetailsPage);
