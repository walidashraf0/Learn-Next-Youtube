interface ICreatePostDTO {
  title: string;
  body: string;
}

interface IUpdatePostDTO {
  title?: string;
  body?: string;
}


export type { ICreatePostDTO, IUpdatePostDTO };
