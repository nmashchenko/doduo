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
import { MainCard } from '@/components/ui/MainCard';
import { mockItems } from '@/mocks/mockItems';

export default function Home() {
  const { data, error, isLoading } = usePosts();
  const { mutate, isPending } = useMakePost();
  return (
    <main className="flex min-h-screen flex-col justify-between p-6">
      <div className="flex flex-col items-center gap-4 mb-6">
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
        <div className="w-full h-full flex flex-col p-4">
          <div className="h-screen grid gap-6 p-4">
            <MainCard
              label="Backlog"
              initialItems={mockItems}
              taskCard={true}
            />
          </div>
        </div>
      </div>
      {isLoading && <Loading />}
      {error && <TypographyBlockquote>{error.message}</TypographyBlockquote>}
      {data && (
        <TypographyInlineCode>{JSON.stringify(data)}</TypographyInlineCode>
      )}
    </main>
  );
}
