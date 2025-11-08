interface IPostProps {
  params: {
    post?: string[];
  };
}
const Post = ({params}: IPostProps) => {
  console.log(params);
  return (
    <div>
      <h1>Post Page</h1>
      <hr />
      <ul>
        {params?.post?.map((post, index) => (
          <li key={index}>{post}</li>
        ))}
      </ul>
    </div>
  );
};

export default Post;
