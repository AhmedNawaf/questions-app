import dynamic from 'next/dynamic';
import TagsInput from './TagsInput';
import TextInput from './TextInput';

export const Editor = dynamic(() => import('./Editor'), { ssr: false });
export { TagsInput, TextInput };
