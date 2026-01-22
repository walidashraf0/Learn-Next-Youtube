interface ICreatePostDTO {
  title: string;
  content: string;
}

interface IUpdatePostDTO {
  title?: string;
  content?: string;
}


export type { ICreatePostDTO, IUpdatePostDTO };
