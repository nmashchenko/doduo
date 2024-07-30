import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import axios from 'axios';

export type MakePostDTO = {
  title: string;
  body: string;
  userId: number;
};

export const makePost = (dto: MakePostDTO): Promise<void> => {
  return axios.post('https://jsonplaceholder.typicode.com/posts', dto);
};

export const useMakePost = () => {
  return useMutation({
    onError: (error, variables, context) => {
      toast.error('Sorry, we were unable to make post at the moment', {
        description: error.message,
      });
    },

    onSuccess: (data) => {
      toast.success('Post created. Tolya loh.');
    },
    mutationFn: (dto: MakePostDTO) => makePost(dto),
  });
};
