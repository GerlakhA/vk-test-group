export class GetGroupsResponseDto {
  result: 1 | 0;
  data?: GroupDto[];
}

export class GroupDto {
  id: number;
  name: string;
  closed: boolean;
  avatar_color?: string;
  members_count: number;
  friends?: UserDto[];
}

export class UserDto {
  first_name: string;
  last_name: string;
}
