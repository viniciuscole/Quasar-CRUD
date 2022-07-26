import useAPI from "src/apiUses/useAPI";

export default function postService() {
  const { list, post, put, del } = useAPI("cursos");

  return {
    list,
    post,
    put,
    del,
  };
}
