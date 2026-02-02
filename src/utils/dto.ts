interface ICreatePostDTO {
  title: string;
  content: string;
}

interface IUpdatePostDTO {
  title?: string;
  content?: string;
}

interface IRegisterUserDto {
  username: string,
  email: string,
  password: string,
}

interface ILoginUserDto {
  email: string,
  password: string,
}


export type { ICreatePostDTO, IUpdatePostDTO, IRegisterUserDto, ILoginUserDto };
