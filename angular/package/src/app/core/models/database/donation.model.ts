import { JsonObject, JsonProperty } from 'json2typescript';
import {
  NumberConverter,
  StringConverter,
  BooleanConverter,
  DateTimeConverter
} from './db.model';
import { Users } from './db.model'; 
import { Campaign } from './campaign.model';
import { Transaction } from './transaction.model'; 

@JsonObject('Donation')
export class Donation {
  @JsonProperty('id', NumberConverter, true)
  Id: number = undefined as any;

  @JsonProperty('amount', NumberConverter, true)
  Amount: number = 0; 

  @JsonProperty('date', DateTimeConverter, true)
  Date: Date = new Date();

  @JsonProperty('message', StringConverter, true)
  Message: string | null = null;

  @JsonProperty('isAnonymous', BooleanConverter, true)
  IsAnonymous: boolean = false;

  @JsonProperty('userId', NumberConverter, true)
  UserId: number | null = null;

  @JsonProperty('user', Users, true)
  User: Users | null = null;

  @JsonProperty('campaignId', NumberConverter, true)
  CampaignId: number = undefined as any;

  @JsonProperty('campaign', Campaign, true)
  Campaign: Campaign | null = null;

  @JsonProperty('transactionId', NumberConverter, true)
  TransactionId: number | null = null;

  @JsonProperty('transaction', Transaction, true)
  Transaction: Transaction | null = null;
}