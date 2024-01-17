import { useState } from 'react';
import useAuth from '@/src/hooks/useAuth';
import MainLayout from '@/src/layouts/Main';
import { Box, Button, Grid } from '@mui/material';
import { TextInput, TagsInput, Editor } from '@/src/components/inputs';
import { FormattedMessage } from 'react-intl';
import { useTags } from '@/src/hooks/useTag';
import { ask as askApi } from '@/src/hooks/usePost';
import { useRouter } from 'next/router';
import { Option } from '@/src/components/inputs/TagsInput';

export default function Ask() {
  const router = useRouter();

  const { user } = useAuth({
    redirectTo: '/login',
    redirectIfFound: false,
  });

  const { data: tagsList } = useTags();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<Option[]>([]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      title,
      content,
      tags: tags.map((e) => e.value),
    };
    const id = await askApi(data);
    router.push(`/question/${id}`);
  };

  return (
    <MainLayout title='title.ask'>
      <Box p={2}>
        <form onSubmit={onSubmit}>
          <TextInput
            variant='outlined'
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label='input.title'
            required
            inputProps={{
              autoComplete: 'off',
            }}
          />
          <TagsInput
            label='input.tags'
            onChange={setTags}
            value={tags}
            options={tagsList.map((e) => ({ label: e.name, value: e.id }))}
          />
          <Box marginBottom={2}>
            {user && (
              <Editor
                content={content}
                setContent={setContent}
              />
            )}
          </Box>
          <Grid
            item
            xs={12}
          >
            <Button
              type='submit'
              variant='contained'
              color='primary'
            >
              <FormattedMessage id='btn.continue' />
            </Button>
          </Grid>
        </form>
      </Box>
    </MainLayout>
  );
}
