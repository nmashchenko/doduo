'use client';

import {
  TypographyBlockquote,
  TypographyH1,
  TypographyInlineCode,
} from '@/components/ui/typography';
import { usePosts } from '@/app/(main)/api/getPosts';
import { Loading } from '@/components/ui/loading';
import { useMakePost } from '@/app/(main)/api/makePost';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { data, error, isLoading } = usePosts();
  const { mutate, isPending } = useMakePost();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center gap-3">
        <TypographyH1>tolya loh</TypographyH1>
        <Button
          onClick={() =>
            mutate({
              title: 'loh',
              body: 'loh',
              userId: 1,
            })
          }
        >
          {isPending ? <Loading /> : 'Make post'}
        </Button>
      </div>
      {isLoading && <Loading />}
      {error && <TypographyBlockquote>{error.message}</TypographyBlockquote>}
      {data && (
        <TypographyInlineCode>{JSON.stringify(data)}</TypographyInlineCode>
      )}
    </main>
  );
}
