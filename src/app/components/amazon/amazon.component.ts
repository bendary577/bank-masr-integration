import { Component, OnInit } from '@angular/core';
import { PaymentPayfort } from 'src/app/models/payment-payfort';

@Component({
  selector: 'app-amazon',
  templateUrl: './amazon.component.html',
  styleUrls: ['./amazon.component.scss']
})
export class AmazonComponent implements OnInit {

  paymentSchema = new PaymentPayfort();

  constructor() { }

  ngOnInit(): void {

    this.paymentSchema.service_command = 'TOKENIZATION';
    this.paymentSchema.access_code = 'Y6lL5f0wvaKSxdM8jsjr';
    this.paymentSchema.merchant_identifier = 'f0db228a';
    this.paymentSchema.merchant_reference = 'or10222';
    this.paymentSchema.expiry_date = 2105;
    this.paymentSchema.card_number = '4005550000000001';
    this.paymentSchema.language = 'en';
    this.paymentSchema.card_security_code = '123';

    // const hash = `TESTSHAINaccess_code=${this.paymentSchema.access_code}amount=${this.paymentSchema.amount}command=${this.PaymentSchema.command}currency=${this.PaymentSchema.currency}customer_email=${this.PaymentSchema.customer_email}language=${this.PaymentSchema.language}merchant_identifier=${this.PaymentSchema.merchant_identifier}merchant_reference=${this.PaymentSchema.merchant_reference}order_description=${this.PaymentSchema.order_description}return_url=${this.PaymentSchema.return_url}TESTSHAIN`;
    const sign = "6BA83163FEA3455DC270473F6CD00450DE86CD76A3B7358EE8E66C6785E3A6EE";
    this.paymentSchema.signature = sign;

  }


    

}
