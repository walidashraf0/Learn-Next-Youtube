interface ICreatePostDTO {
  title: string;
  content: string;
}

interface IUpdatePostDTO {
  title?: string;
  body?: string;
}


export type { ICreatePostDTO, IUpdatePostDTO };
