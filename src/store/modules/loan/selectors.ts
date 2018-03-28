import { createSelector } from 'reselect';
import { LoanEntry, StoreLoanEntry } from './types';
import { State } from '../../types';
// import { getFarmerWeeklyBalanceNoFormat as getFarmerDairyBalance } from '../milk/selectors';
// import { getFarmerTotalBalance as getFarmerBalance } from '../payment/selectors';

import * as moment from 'moment';

const getLoanEntries = (state: State) => state.loan.rows;
const getCurrentLoanEntryUUID = (state: State) => state.activeRows.activeLoanEntryUUID;
const getCurrentFarmerUUID = (state: State) => state.activeRows.activeFarmerUUID;

const decimals = 1;
// const radix = 10;

const maybeGetActiveLoanEntry = createSelector(
  getCurrentLoanEntryUUID,
  getLoanEntries,
  (uuid, getLoanEntries) => getLoanEntries.find(e => e.uuid === uuid),
);

/**
 * Selector for getting the active loan entry
 */
export const getActiveLoanEntry = createSelector(
  maybeGetActiveLoanEntry,
  (maybeLoanEntry) => {
    // TODO: Re-evaluate this
    if (!maybeLoanEntry) {
      const empty: StoreLoanEntry = {
        type: 'loan',
        datetime: '',
        toPersonUuid: '',
        fromPersonUuid: '',
        amount: 0,
        currency: '',
        status: 'clean',
        lastModified: '',
        uuid: '',
      };
      return empty;
    }
    return maybeLoanEntry;
  },
);

/************ Selectors for all farmers *********************/

/** Selector to get all loan transactions for all farmers */
export const getAllFarmersLoanTransactions = createSelector(
  [getLoanEntries],
  (loanEntries: StoreLoanEntry[]) => loanEntries);

/** Selector to get all loan transactions for all farmers with specific formatting for TransactionLog Page */
export const getAllFormattedFarmersLoanTransactions = createSelector(
  [getAllFarmersLoanTransactions],
  (loanEntries: StoreLoanEntry[]) => loanEntries.map(entry =>
    ({
      datetime: moment(entry.datetime).utc().format('MMM DD'),
      type: entry.type,
      loanValue: entry.amount.toFixed(decimals), 
      uuid: entry.uuid,
    }),
  ),
);

/************ Selectors for a specific farmer ***************/

/** Selector to get all loan transactions for a specific farmer  */
export const getFarmersTransactions = createSelector(
  [getLoanEntries, getCurrentFarmerUUID],
  (loanEntries: StoreLoanEntry[], farmerUUID: string) => loanEntries.filter(entry => !entry.toPersonUuid.localeCompare(farmerUUID)));

/**
 * Selector to get all loan transactions for a specific farmer formatted for the loans page
 * if using with the DataTable ensure that the last element in the array is the loan transaction uuid.
 */
export const getFormattedFarmersTransactions = createSelector(
  [getFarmersTransactions],
  (loanEntries: StoreLoanEntry[]) => loanEntries.map(entry =>
    ({
      datetime: moment(entry.datetime).utc().format('MMM DD'),
      loanValue:  entry.amount.toFixed(decimals), 
      uuid: entry.uuid,
    }),
  ),
);

/**
 * Selector for the farmer loan account balance
 * Note: This returns loans only from a week before the current date
 */
export const getFarmerLoanBalance = createSelector(
  [getFarmersTransactions],
  (loanEntries: LoanEntry[]) => loanEntries.reduce((sum: number, entry: LoanEntry) =>
    sum +  entry.amount, 0).toString(),
  );
