import { useParams } from 'react-router-dom';
import { useGetBloDetail } from './hooks/useGetBlogDetail';

const LearnLesson = () => {
    const { id } = useParams<{ id: string }>();
    const {data} = useGetBloDetail(id ?? '')
  return (
    <div dangerouslySetInnerHTML={{ __html: data?.content ?? '' }} />
  )
}

export default LearnLesson
