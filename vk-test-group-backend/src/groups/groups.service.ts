import { Injectable } from '@nestjs/common';

import { groupsData } from 'src/data';

@Injectable()
export class GroupsService {
  constructor() {}

  getGroups = () => {
    return groupsData.data;
  };

  filtredClosedGroups(closed: boolean) {
    return groupsData?.data?.filter((item) => item.closed === closed);
  }

  filtredColorGroups(avatar_color: string) {
    if (!groupsData.data) {
      console.log((groupsData.result = 1));
    }
    return groupsData?.data?.filter(
      (item) => item.avatar_color === avatar_color,
    );
  }

  groupsHaveFriends() {
    if (!groupsData.data) {
      console.log((groupsData.result = 1));
    }
    return groupsData?.data?.filter((item) => item.friends?.length);
  }

  groupsDontHaveFriends() {
    if (!groupsData.data) {
      console.log((groupsData.result = 1));
    }
    return groupsData?.data?.filter((item) => !item.friends?.length);
  }
}
