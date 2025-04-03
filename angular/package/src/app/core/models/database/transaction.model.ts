import { JsonObject, JsonProperty } from 'json2typescript';
import {
  NumberConverter,
  StringConverter,
  DateTimeConverter
} from './db.model';

@JsonObject('Transaction')
export class Transaction {
  @JsonProperty('id', NumberConverter, true)
  Id: number = undefined as any;

  @JsonProperty('paymentMethod', StringConverter, true)
  PaymentMethod: string = undefined as any;

  @JsonProperty('paymentStatus', StringConverter, true)
  PaymentStatus: string = undefined as any;

  @JsonProperty('transactionDate', DateTimeConverter, true)
  TransactionDate: Date = new Date();

  @JsonProperty('amount', NumberConverter, true)
  Amount: number = 0; // decimal ở backend, ánh xạ thành number trong TypeScript

  @JsonProperty('transactionReference', StringConverter, true)
  TransactionReference: string | null = null;

  @JsonProperty('currency', StringConverter, true)
  Currency: string = undefined as any;

  @JsonProperty('paymentGateway', StringConverter, true)
  PaymentGateway: string = undefined as any;
}