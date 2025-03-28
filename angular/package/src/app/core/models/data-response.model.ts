import {
  JsonObject,
  JsonProperty,
  Any,
  ValueCheckingMode,
} from 'json2typescript';

@JsonObject('DataResponse')
export class DataResponse {
  @JsonProperty('statusCode',Number,true)
  statusCode : Number = undefined as any;
  @JsonProperty('code',Number,true)
  code : Number = undefined as any;
  @JsonProperty('message',String,true)
  message : string = undefined as any;
  @JsonProperty('data', Any, true)
  data: any = undefined;



}
