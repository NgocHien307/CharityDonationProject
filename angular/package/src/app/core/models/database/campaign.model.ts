import { JsonObject, JsonProperty } from 'json2typescript';
import {
  NumberConverter,
  StringConverter,
  BooleanConverter,
  DateTimeConverter
} from './db.model';

@JsonObject('Campaign')
export class Campaign {
  @JsonProperty('id', NumberConverter, true)
  Id: number = undefined as any;

  @JsonProperty('title', StringConverter, true)
  Title: string = undefined as any;

  @JsonProperty('description', StringConverter, true)
  Description: string = undefined as any;
  
  @JsonProperty('subDescription', StringConverter, true) 
  SubDescription: string = '';

  @JsonProperty('goalAmount', NumberConverter, true)
  GoalAmount: number = 0;

  @JsonProperty('collectedAmount', NumberConverter, true)
  CollectedAmount: number = 0;

  @JsonProperty('isActive', BooleanConverter, true)
  IsActive: boolean = true;

  @JsonProperty('startDate', DateTimeConverter, true)
  StartDate: Date = new Date();

  @JsonProperty('endDate', DateTimeConverter, true)
  EndDate: Date | null = null;

  @JsonProperty('featuredImageUrl', StringConverter, true)
  FeaturedImageUrl: string = '';

  @JsonProperty('creatorId', NumberConverter, true)
  CreatorId: number = undefined as any;

  @JsonProperty('creatorName', StringConverter, true)
  CreatorName: string = '';

  @JsonProperty('categoryId', NumberConverter, true)
  CategoryId: number | null = null;

  @JsonProperty('categoryName', StringConverter, true)
  CategoryName: string = '';

  @JsonProperty('status', StringConverter, true)
  Status: string = '';
}
