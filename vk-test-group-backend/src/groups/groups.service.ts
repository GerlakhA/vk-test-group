import { Injectable } from '@nestjs/common';

import { groupsData } from 'src/data';

@Injectable()
export class GroupsService {
  constructor() {}

  getGroups = () => {
    return { result: 0, data: groupsData };
  };

  filtredClosedGroups(closed: boolean) {
    return {
      result: 0,
      data: groupsData?.filter((item) => item.closed === closed),
    };
  }

  filtredColorGroups(avatar_color: string) {
    if (avatar_color === 'no_color') {
      return {
        result: 0,
        data: groupsData?.filter((item) => !item.avatar_color),
      };
    } else {
      return {
        result: 0,
        data: groupsData?.filter((item) => item.avatar_color === avatar_color),
      };
    }
  }

  groupsHaveFriends() {
    return {
      result: 0,
      data: groupsData?.filter((item) => item.friends?.length),
    };
  }

  groupsDontHaveFriends() {
    return {
      result: 0,
      data: groupsData?.filter((item) => !item.friends?.length),
    };
  }
}
