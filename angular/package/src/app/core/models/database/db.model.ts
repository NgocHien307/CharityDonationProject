import { J } from '@angular/cdk/keycodes';
import {
  JsonObject,
  JsonProperty,
  JsonConverter,
  JsonConvert,
  JsonCustomConvert,
} from 'json2typescript';

@JsonConverter
export class NumberConverter implements JsonCustomConvert<number> {
  serialize(data: any): number {
    if (Number.isNaN(data)) {
      return data;
    } else {
      return Number(data);
    }
  }
  deserialize(data: any): number {
    if (typeof data === 'undefined' || data === null) {
      return data;
    }
    if (Number.isNaN(data)) {
      return data;
    } else {
      return Number(data);
    }
  }
}
@JsonConverter
export class StringConverter implements JsonCustomConvert<string> {
  serialize(data: any): string {
    if (data) {
      return data.toString();
    } else {
      return data;
    }
  }
  deserialize(data: any): string {
    if (data) {
      return data.toString();
    } else {
      return data;
    }
  }
}
@JsonConverter
export class BooleanConverter implements JsonCustomConvert<boolean> {
  serialize(data: any): boolean {
    if (typeof data === 'boolean') {
      return data;
    } else {
      return data;
    }
  }
  deserialize(data: any): boolean {
    if (typeof data === 'boolean') {
      return data;
    } else {
      return data;
    }
  }
}
@JsonConverter
export class DateTimeConverter implements JsonCustomConvert<Date> {
  serialize(date: Date): any {
    function pad(number: any) {
      if (number < 10) {
        return '0' + number;
      }
      return number;
    }
    return (
      date.getFullYear() +
      '-' +
      pad(date.getMonth() + 1) +
      '-' +
      pad(date.getDate()) +
      'T' +
      pad(date.getHours()) +
      ':' +
      pad(date.getMinutes()) +
      ':' +
      pad(date.getSeconds()) +
      '.' +
      (date.getMilliseconds() / 1000).toFixed(3).slice(2, 5) +
      'Z'
    );
  }
  deserialize(date: any): Date {
    const dReturn = new Date(date);
    if (
      dReturn.getFullYear() === 1970 &&
      dReturn.getMonth() === 0 &&
      dReturn.getDate() === 1
    ) {
      return null as any;
    } else {
      return dReturn;
    }
  }
}
@JsonConverter
export class StaffConverter implements JsonCustomConvert<Users> {
  serialize(data: Users): any {
    const jsonConvert = new JsonConvert();
    return jsonConvert.serialize(data);
  }
  deserialize(data: any): Users {
    const jsonConvert = new JsonConvert();
    return jsonConvert.deserializeObject(data, Users);
  }
}
@JsonConverter
export class MenuConverter implements JsonCustomConvert<Menu> {
  serialize(data: Menu): any {
    const jsonConvert = new JsonConvert();
    return jsonConvert.serialize(data);
  }
  deserialize(data: any): Menu {
    const jsonConvert = new JsonConvert();
    return jsonConvert.deserializeObject(data, Menu);
  }
}
@JsonConverter
export class UserMenuPermissionConverter
  implements JsonCustomConvert<UserMenuPermission>
{
  serialize(data: UserMenuPermission): any {
    const jsonConvert = new JsonConvert();
    return jsonConvert.serialize(data);
  }
  deserialize(data: any): UserMenuPermission {
    const jsonConvert = new JsonConvert();
    return jsonConvert.deserializeObject(data, UserMenuPermission);
  }
}
@JsonConverter
export class UsersArrayConverter implements JsonCustomConvert<Users[]> {
  serialize(data: Users[]): any {
    const jsonConvert = new JsonConvert();
    return jsonConvert.serializeArray(data);
  }
  deserialize(data: any): Users[] {
    const jsonConvert = new JsonConvert();
    return jsonConvert.deserializeArray(data, Users);
  }
}
@JsonConverter
export class MenuArrayConverter implements JsonCustomConvert<Menu[]> {
  serialize(data: Menu[]): any {
    const jsonConvert = new JsonConvert();
    return jsonConvert.serializeArray(data);
  }
  deserialize(data: any): Menu[] {
    const jsonConvert = new JsonConvert();
    return jsonConvert.deserializeArray(data, Menu);
  }
}
@JsonConverter
export class UserMenuPermissionArrayConverter
  implements JsonCustomConvert<UserMenuPermission[]>
{
  serialize(data: UserMenuPermission[]): any {
    const jsonConvert = new JsonConvert();
    return jsonConvert.serializeArray(data);
  }
  deserialize(data: any): UserMenuPermission[] {
    const jsonConvert = new JsonConvert();
    return jsonConvert.deserializeArray(data, UserMenuPermission);
  }
}
@JsonObject('Menu')
export class Menu {
  @JsonProperty('menuId', NumberConverter, true)
  MenuId: number = '' as any;
  @JsonProperty('menuName', StringConverter, true)
  MenuName: string = '' as any;
  @JsonProperty('url', StringConverter, true)
  MenuUrl: string = '' as any;
}

@JsonObject('UserMenuPermission')
export class UserMenuPermission {
  @JsonProperty('menuId', NumberConverter, true)
  MenuId: number = '' as any;
  @JsonProperty('userId', NumberConverter, true)
  UserId: number = '' as any;
  @JsonProperty('menuName', StringConverter, true)
  MenuName: string = '' as any;
  @JsonProperty('isDelete', BooleanConverter, true)
  IsDelete: boolean = '' as any;
  @JsonProperty('isUpdate', BooleanConverter, true)
  IsUpdate: boolean = '' as any;
  @JsonProperty('isView', BooleanConverter, true)
  isView: boolean = '' as any;
}
@JsonObject('Users')
export class Users {
  @JsonProperty('id', NumberConverter, true)
  UserId: number = '' as any;

  @JsonProperty('email', StringConverter, true)
  Email: string = '' as any;
  @JsonProperty('fullName', StringConverter, true)
  FullName: string = '' as any;

  @JsonProperty('passwordHash', StringConverter, true)
  PassWord: string = '' as any;

  @JsonProperty('phoneNumber', StringConverter, true)
  PhoneNumber: string = '' as any;

  @JsonProperty('isActive', BooleanConverter, true)
  Status: boolean = '' as any;
  @JsonProperty('roleId', NumberConverter, true)
  RoleId: number = '' as any;
  @JsonProperty('registerDate', DateTimeConverter, true)
  RegisterDate: Date = undefined as any;
}
