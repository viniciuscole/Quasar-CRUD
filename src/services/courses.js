import useAPI from "src/apiUses/useAPI";

export default function postService() {
  const { list, getById, post, put, del } = useAPI("cursos");

  return {
    list,
    getById,
    post,
    put,
    del,
  };
}
