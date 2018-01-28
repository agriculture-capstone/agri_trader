import * as React from 'react';
import { Grid, Row, Content, Button, Text } from 'native-base';
import CardSummary from '../../../../components/CardSummary';
import DataTable from '../../../../components/DataTable';
import styles from './style';
import Composer from '../../../../hoc/PageComposer';
import ComingSoonOverlay, { default as createComingSoonOverlay } from '../../../../components/ComingSoon/index';
import { connect } from 'react-redux';

interface OwnPropsType {
  farmerName: string;
  totalRemainingBalance: string;
  totalWeeklyPaymentBalence: string;
  loanTransactions: any[];
}

interface DispatchPropsType {
}

interface StorePropsType {
}

type PropsType = OwnPropsType & DispatchPropsType & StorePropsType;

interface OwnStateType {
}

/**
* Buy Tab Component
*/
class Buy extends React.Component<PropsType, OwnStateType> {
  /**
  * Render method for Buy
  */
  public render() {
    const testData = [{
      label: 'Total Balance',
      value: this.props.totalRemainingBalance,
      units: 'UGX',
    },                {
      label: 'Total Weekly Payment',
      value: this.props.totalWeeklyPaymentBalence,
      units: 'UGX',
    },
    ];
    return (
      <Content style={styles.container}>
        <Grid style={styles.content}>
          <Row>
            <CardSummary
              data={testData}
            />
          </Row>
          <Row>
            <DataTable
              headers={['Date', 'Remaining Balance', 'Weekly Payment']}
              values={this.props.loanTransactions}
            />
          </Row>
        </Grid>
        <Button primary block style={{ margin: 5 }}>
          <Text style={{ color: 'white' }}> ADD LOAN </Text>
        </Button>
      </Content>
    );
  }
}

const LoanComingSoonPage = ComingSoonOverlay<PropsType>(Buy);
createComingSoonOverlay(Buy);

export default connect(
)(LoanComingSoonPage);


// export default new Composer<PropsType>(Buy)
//   .page;
