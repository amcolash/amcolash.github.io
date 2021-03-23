import resumeData from '../lib/resume.json';
import { Resume } from '../components/resume/Resume';

export default function ResumePage() {
  return <Resume {...resumeData} />;
}
