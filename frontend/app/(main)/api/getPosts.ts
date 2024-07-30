import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

interface Post {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const getPosts = async () => {
  const response = await axios.get<Post>(
    'https://jsonplaceholder.typicode.com/todos/1',
  );

  return response.data;
};

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
  });
};
