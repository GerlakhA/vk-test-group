import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @HttpCode(200)
  @Get()
  async getGroups(@Query() query: { [key: string]: any }) {
    console.log(`Query: ${Object.keys(query)}\n`);
    console.log(`Test1: ${Object.keys(query).length}\n`);
    console.log(
      `has_friends: ${query?.has_friends}, ${typeof query?.has_friends}\n`,
    );
    if (Object.keys(query)?.length > 0) {
      if (query?.closed === 'true') {
        return this.groupsService.filtredClosedGroups(true);
      } else if (query?.closed === 'false') {
        return this.groupsService.filtredClosedGroups(false);
      } else if (query?.has_friends === 'true') {
        console.log(`has_friends is true`);
        return this.groupsService.groupsHaveFriends();
      } else if (query?.has_friends === 'false') {
        console.log(`has_friends is false`);
        return this.groupsService.groupsDontHaveFriends();
      } else if (query?.avatar_color) {
        return this.groupsService.filtredColorGroups(query?.avatar_color);
      }
    } else if (Object.keys(query)?.length === 0) {
      return this.groupsService.getGroups();
    }
  }
}
