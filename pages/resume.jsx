import { Resume } from '../components/resume/Resume';
import resumeData from '../lib/resume.json';

export default function ResumePage() {
  return <Resume {...resumeData} />;
}
