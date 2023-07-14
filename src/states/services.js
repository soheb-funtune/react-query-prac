import { useQuery, useMutation, useQueryClient } from "react-query";
import HttpClient from "./HttpClient.js";

export const getTodos = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: () => HttpClient(`/posts`, { method: "GET" }),
  });

  if (data?.data) {
    return data.data;
  }
  if (isLoading) {
  }
  if (isError) {
  }
};
export const deleteTodos = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (payload) =>
      HttpClient(`/posts/${payload.id}`, {
        method: "PUT",
        data: payload,
      }),
    {
      onSuccess: ({ data }) => {
        console.log("onSuccess called", data);
        // queryClient.invalidateQueries(["todos"]);

        // queryClient.setQueryData("todos", (oldEntry) => {
        //   const res = oldEntry?.data?.map((item) =>
        //     item?.id === data?.id ? data : item
        //   );
        //   console.log({ res });
        //   return res;
        // });
      },
      onSettled: (data) => {
        console.log("onSettled called", data);
        queryClient.invalidateQueries("todos");
      },
    }
  );

  return { mutate };
};
