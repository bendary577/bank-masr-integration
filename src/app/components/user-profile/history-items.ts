import {History} from './history'

export const HistoryItems: History[] = [
    {         
        transactionDate: '2021-05-23',
        totalPayment: 10,
        afterDiscount: 9,
        revenueCenter: 'Rest',
        creator: "Ali",
        update:'refund',
        modifier:'Emad'
    },
    {
        transactionDate: '2021-04-01',
        totalPayment: 65,
        afterDiscount: 43,
        revenueCenter: 'Take Away',
        creator: 'Eslam',
        update:'',
        modifier:'',
    },
    {
        transactionDate: '2021-02-18',
        totalPayment: 10,
        afterDiscount: 9,
        revenueCenter: 'Dine In',
        creator: 'Khaled',
        update:'void',
        modifier:'Khaled'
    }
];
