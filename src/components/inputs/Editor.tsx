import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { SetStateAction } from 'react';

interface Props {
  content: string;
  setContent: React.Dispatch<SetStateAction<string>>;
}

export default function Editor({ content, setContent }: Props) {
  return (
    <CKEditor
      editor={ClassicEditor}
      config={{ language: 'ar' }}
      data={content}
      onChange={(event, editor) => {
        const data = editor.getData();
        setContent(data);
      }}
    />
  );
}
